import {createStore, combineReducers} from 'redux';
import React from 'react';

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

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: action.completed
      };
    case 'TOGGLE_TODO':
      if(state.id !== action.id){
        return state;
      }
      return Object.assign({}, state, {completed: !state.completed });
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  const isNotEmpty = (text) => text.replace(/\s/g,'').length > 0;

  switch (action.type) {
    case 'ADD_TODO':
      return isNotEmpty(action.text) ? [...state, todo(undefined, action)] : state;
    case 'REMOVE_TODO':
      return state.filter( t => t.id !== action.id );
    case 'TOGGLE_TODO':
      return state.map( t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return state = action.filter;
    default:
      return state;
  }
};

const FilterLink = ({filter, children, currentFilter, onClick}) => {
  if (currentFilter === filter) {
    return <span>{children}</span>;
  }
  return (
    <a href="#" onClick={e => {
      e.preventDefault();
      onClick(filter);
    }}>{children}</a>
  );
};

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

const AddTodo = ({addTodoHandler}) => {
  let input;
  return (
    <div>
      <input
        ref={node => { input = node; }}
        onKeyUp={(e) => {
          if(e.keyCode === ENTER_KEY_CODE) {
            addTodoHandler(input.value);
            input.value = '';
          }
        }}
      />
      <button
        onClick={() => {
          addTodoHandler(input.value);
          input.value = '';
        }}
        >Add</button>
    </div>
  );
};

const Footer = ({visibilityFilter, onFilterClick}) => (
  <p>
    Show:
    <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter} onClick={onFilterClick}>All</FilterLink>,
    <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter} onClick={onFilterClick}>Completed</FilterLink>,
    <FilterLink filter='SHOW_INCOMPLETED' currentFilter={visibilityFilter} onClick={onFilterClick}>Incompleted</FilterLink>
  </p>
);

const todosApp = combineReducers({ todos, visibilityFilter });

let nextTodoId = 0;
const TodoApp = ({todos, visibilityFilter}) => (
  <div>
    <AddTodo addTodoHandler={(text) => {
      store.dispatch({type: 'ADD_TODO', text, id: nextTodoId++});
    }}/>
    <TodoList
      todos={getVisibleTodos(todos, visibilityFilter)}
      onTodoClick={(id) => {
        store.dispatch({type: 'TOGGLE_TODO', id: id});
      }} />
    <Footer visibilityFilter={visibilityFilter} onFilterClick={filter =>
      store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter })
    } />
  </div>
);

const store = createStore(todosApp);

export { todos, store, TodoApp };
