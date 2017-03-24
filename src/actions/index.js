/**
 * @module actions
 */

// uuid is a function tha returns a unique string everytime it's called
import { uuid } from '../services/uuid';

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO', id
});

const addTodo = (text) => ({
  type: 'ADD_TODO', text, id: uuid()
});

export {
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
