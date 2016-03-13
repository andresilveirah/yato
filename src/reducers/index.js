/**
 * @module reducers/todosApp
 */

import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

/**
 * uses the combineReducers from the redux package to create an object with the
 * two (todos, visibilityFilter) known reducers
 * @type {Object}
 */
const todosApp = combineReducers({ todos, visibilityFilter });

export default todosApp;
