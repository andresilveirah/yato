import { combineReducers } from 'redux';
import todo from './todo';

const isNotEmpty = (text) => text.replace(/\s/g,'').length > 0;
const delegateToTodoReducer = (state, action) => ({...state, [action.id]: todo(state[action.id], action)});

const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return isNotEmpty(action.text) ? delegateToTodoReducer(state, action) : state;
    case 'TOGGLE_TODO':
      return delegateToTodoReducer(state, action);
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return isNotEmpty(action.text) ? [...state, action.id] : state;
    default:
      return state;
  }
};

// While the Todo reducer manages a single Todo, this reducer is responsible for the collection of Todos.
// The state is 'normalized'.
// byId's state is an object with all todos indexed by its id.
// allIds' state is an Array containing all Todos' ids.
export default combineReducers({ byId, allIds });

const getAllTodos = (state) => state.allIds.map(id => state.byId[id]);

// This function works as a selector.
export const getVisibleTodos = (state, filter) => {
  const allTodos = getAllTodos(state);

  switch (filter) {
    case 'all':
      return allTodos;
    case 'completed':
      return allTodos.filter(t => t.completed);
    case 'incompleted':
      return allTodos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter ${filter}`);
  }
};
