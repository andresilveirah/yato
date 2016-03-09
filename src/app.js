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

const FilterLink = ({filter, children, currentFilter}) => {
  if (currentFilter === filter) {
    return <span>{children}</span>;
  }
  return (
    <a href="#" onClick={() =>{
      store.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter
      });
    }}>{children}</a>
  );
};

const todosApp = combineReducers({ todos, visibilityFilter });

let nextTodoId = 0;
class TodoApp extends React.Component {
  render() {
    const visibilityFilter = this.props.visibilityFilter;
    const todos = getVisibleTodos(this.props.todos, visibilityFilter);
    return (
      <div>
        <input
          ref={node => { this.input = node; }}
          onKeyUp={(e) => {
            if(e.keyCode === ENTER_KEY_CODE) {
              store.dispatch({
                type: 'ADD_TODO',
                text: this.input.value,
                id: nextTodoId++
              });
              this.input.value = '';
            }
          }}
        />
        <button
          onClick={() => {
            store.dispatch({
              type: 'ADD_TODO',
              text: this.input.value,
              id: nextTodoId++
            });
            this.input.value = '';
          }}
          >Add</button>
        <ul>
          {todos.map(todo =>
            <li key={todo.id} onClick={() => {
              store.dispatch({type: 'TOGGLE_TODO', id: todo.id});
            }} style={{textDecoration: todo.completed ? 'line-through' : ''}}>
              {todo.text}
            </li>
          )}
        </ul>
        <p>
          Show:
          <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter}>All</FilterLink>,
          <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter}>Completed</FilterLink>,
          <FilterLink filter='SHOW_INCOMPLETED' currentFilter={visibilityFilter}>Incompleted</FilterLink>
        </p>
      </div>
    );
  }
}

const store = createStore(todosApp);

export { todos, store, TodoApp };
