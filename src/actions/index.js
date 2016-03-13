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
   * @param  {string} filter  the filter to be set
   * @return {object} a SET_VISIBILITY_FILTER action
   */
  setVisibilityFilter,

  /**
   * @function
   * @param  {number} id  the id of the Todo to be toggled
   * @return {object} a TOGGLE_TODO action
   */
  toggleTodo,

  /**
   * @function
   * @param  {string} text  the text of the new Todo
   * @return {object} a ADD_TODO action
   */
  addTodo
};
