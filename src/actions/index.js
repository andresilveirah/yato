/**
 * @module actions
 */

// v4 is a function tha returns a unique string everytime it's called
import { v4 } from 'node-uuid';

const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER', filter
});

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO', id
});

const addTodo = (text) => ({
  type: 'ADD_TODO', text, id: v4()
});

export {
  /**
   * @function
   * @param  {String} filter  the filter to be set
   * @return {Object} a SET_VISIBILITY_FILTER action
   */
  setVisibilityFilter,

  /**
   * @function
   * @param  {Number} id  the id of the Todo to be toggled
   * @return {Object} a TOGGLE_TODO action
   */
  toggleTodo,

  /**
   * @function
   * @param  {String} text  the text of the new Todo
   * @return {Object} a ADD_TODO action
   */
  addTodo
};
