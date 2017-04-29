/**
 * @module actions
 */

import { normalize } from 'normalizr';

import * as schema from './schema';
import * as api from '../services/api';
import { getIsFetching } from '../reducers';
import types from './types';

export const fetchTodos = (filter) => (dispatch, getState) => {
  // to avoid uncessary network calls and race conditions we
  // abort the action if the app is fetching todos
  if(getIsFetching(getState(), filter)) {
    // we don't necessarily need to return a promise but we do for consistency
    return Promise.resolve();
  }

  dispatch({ type: types.FETCH_TODOS_REQUEST, filter });

  return api.fetchTodos(filter).then(
    response => {
      dispatch({ type: types.FETCH_TODOS_SUCCESS, filter, response: normalize(response, schema.todosList) });
    },
    error => {
      dispatch({ type: types.FETCH_TODOS_FAILURE, filter, message: error.message });
    }
  );
};

export const toggleTodo = (id) => (dispatch) =>
  api.toggleTodo(id).then(
    response => dispatch({ type: types.TOGGLE_TODO_SUCCESS, response: normalize(response, schema.todos) }),
    error => dispatch({ type: types.TOGGLE_TODO_FAILURE, message: error.message })
  );

export const addTodo = (text) => (dispatch) =>
  api.addTodo(text).then(response => dispatch({ type: types.ADD_TODO_SUCCESS, response: normalize(response, schema.todos) }));
