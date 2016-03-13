import { createStore } from 'redux';
import { connect } from 'react-redux';
import React from 'react';

import { setVisibilityFilter, toggleTodo, addTodo } from './actions';
import todosApp from './reducers/index';

const ENTER_KEY_CODE = 13;

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_INCOMPLETED':
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
};

const Link = ({children, active, onClick}) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a href="#" onClick={e => {
      e.preventDefault();
      onClick();
    }}>{children}</a>
  );
};

const mapVisibilityStateToProps = (state, props) => ({
    active: props.filter === state.visibilityFilter
});
const mapVisibilityDispatchToProps = (dispatch, props) => ({
    onClick: () => { dispatch(setVisibilityFilter(props.filter)); }
});
const FilterLink = connect(mapVisibilityStateToProps, mapVisibilityDispatchToProps)(Link);

const Todo = ({text, completed, onClick}) => (
  <li onClick={onClick} style={{textDecoration: completed ? 'line-through' : ''}}>
    {text}
  </li>
);

const TodoList = ({todos, onTodoClick}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        text={todo.text}
        completed={todo.completed}
        onClick={() => { onTodoClick(todo.id); }} />
    )}
  </ul>
);

const mapTodosStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});
const mapTodosDispatchToProps = (dispatch) => ({
  onTodoClick: (id) => { dispatch(toggleTodo(id)); }
});
const VisibleTodosList = connect(mapTodosStateToProps, mapTodosDispatchToProps)(TodoList);

let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input
        ref={node => { input = node; }}
        onKeyUp={(e) => {
          if(e.keyCode === ENTER_KEY_CODE) {
            dispatch(addTodo(input.value));
            input.value = '';
          }
        }}
      />
      <button
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = '';
        }}
        >Add</button>
    </div>
  );
};
// connect with empty params will pass by default the dispatch function to the
// presentation component, in this case, AddTodo
AddTodo = connect()(AddTodo);

const Footer = () => (
  <p>
    Show:
    <FilterLink filter='SHOW_ALL' >All</FilterLink>,
    <FilterLink filter='SHOW_COMPLETED' >Completed</FilterLink>,
    <FilterLink filter='SHOW_INCOMPLETED' >Incompleted</FilterLink>
  </p>
);

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodosList />
    <Footer />
  </div>
);

const store = createStore(todosApp);

export { store, TodoApp };
