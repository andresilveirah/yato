import {createStore, combineReducers} from 'redux';
import React from 'react';

const ENTER_KEY_CODE = 13;

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

const todosApp = combineReducers({ todos, visibilityFilter });

let nextTodoId = 0;
class TodoApp extends React.Component {
  render() {
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
          {this.props.todos.map(todo =>
            <li key={todo.id} onClick={() => {
              store.dispatch({type: 'TOGGLE_TODO', id: todo.id});
            }} style={{textDecoration: todo.completed ? 'line-through' : ''}}>
              {todo.text}
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const store = createStore(todosApp);

export { todos, store, TodoApp };
