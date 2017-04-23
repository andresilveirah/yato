/**
 * @module actions
 */

// uuid is a function tha returns a unique string everytime it's called
import { uuid } from '../services/uuid';
import * as api from '../services/api';

export const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter
});

const receiveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response
});

export const fetchTodos = (filter) => (dispatch) => {
  dispatch(requestTodos(filter));

  return api.fetchTodos(filter).then(response => {
    dispatch(receiveTodos(filter, response));
  });
};

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO', id
});

export const addTodo = (text) => ({
  type: 'ADD_TODO', text, id: uuid()
});
