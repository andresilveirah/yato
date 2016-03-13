/**
 * @module actions
 */

const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER', filter
});

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO', id
});

let nextTodoId = 0; // works as a lame sequential Id
const addTodo = (text) => ({
  type: 'ADD_TODO', text, id: nextTodoId++
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
