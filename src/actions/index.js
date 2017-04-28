/**
 * @module actions
 */

// uuid is a function tha returns a unique string everytime it's called
import * as api from '../services/api';
import { getIsFetching } from '../reducers';

export const fetchTodos = (filter) => (dispatch, getState) => {
  // to avoid uncessary network calls and race conditions we
  // abort the action if the app is fetching todos
  if(getIsFetching(getState(), filter)) {
    // we don't necessarily need to return a promise but we do for consistency
    return Promise.resolve();
  }

  dispatch({ type: 'FETCH_TODOS_REQUEST', filter });

  return api.fetchTodos(filter).then(
    response => {
      dispatch({ type: 'FETCH_TODOS_SUCCESS', filter, response });
    },
    error => {
      dispatch({ type: 'FETCH_TODOS_FAILURE', filter, message: error.message });
    }
  );
};

export const toggleTodo = (id) => (dispatch) =>
  api.toggleTodo(id).then(
    response => dispatch({ type: 'TOGGLE_TODO_SUCCESS', response }),
    error => dispatch({ type: 'TOGGLE_TODO_FAILURE', response: error.message })
  );

export const addTodo = (text) => (dispatch) =>
  api.addTodo(text).then(response => dispatch({ type: 'ADD_TODO_SUCCESS', response }));
