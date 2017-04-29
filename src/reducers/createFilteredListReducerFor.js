import { combineReducers } from 'redux';
import types from '../actions/types';

const createFilteredListReducerFor = (filter) => {
  const handleToggleTodo = (state, todo) => {
    const { id, completed } = todo;
    const shouldRemove = (
      (completed && 'incompleted' === filter) ||
      (!completed && 'completed' === filter)
    );

    switch (filter) {
      case 'completed':
      case 'incompleted':
        return shouldRemove ? state.filter(i => i !== id) : state;
      default:
        return state;
    }
  };

  const ids = (state = [], action) => {
    switch (action.type) {
     case types.FETCH_TODOS_SUCCESS:
       return filter === action.filter ? action.response.map(todo => todo.id) : state;
     case types.ADD_TODO_SUCCESS:
       return filter !== 'completed' ? [...state, action.response.id] : state;
     case types.TOGGLE_TODO_SUCCESS:
       return handleToggleTodo(state, action.response);
     default:
       return state;
    }
  };

  const isFetching = (state = false, action) => {
    if(action.filter !== filter) { return state; }

    switch (action.type) {
      case types.FETCH_TODOS_SUCCESS:
      case types.FETCH_TODOS_FAILURE:
        return false;
      case types.FETCH_TODOS_REQUEST:
        return true;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if(action.filter !== filter) { return state; }

    switch (action.type) {
      case types.FETCH_TODOS_FAILURE:
        return action.message;
      case types.FETCH_TODOS_SUCCESS:
      case types.FETCH_TODOS_REQUEST:
        return null;
      default:
        return state;
    }
  };

  return combineReducers({ ids, isFetching, errorMessage });
};

export default createFilteredListReducerFor;

export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;
