/**
 * @module reducers/todosApp
 */

import { combineReducers } from 'redux';
import todos, * as todosReducer from './todos';

const todosApp = combineReducers({ todos });

export default todosApp;

export const getVisibleTodos = (state, filter) =>
  todosReducer.getVisibleTodos(state.todos, filter);
