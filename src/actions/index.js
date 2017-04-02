/**
 * @module actions
 */

// uuid is a function tha returns a unique string everytime it's called
import { uuid } from '../services/uuid';

export const receiveTodos = (filter, todos) => ({
  type: 'RECEIVE_TODOS',
  filter,
  todos
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO', id
});

export const addTodo = (text) => ({
  type: 'ADD_TODO', text, id: uuid()
});
