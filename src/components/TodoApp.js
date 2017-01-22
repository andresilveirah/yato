/**
 * @module components/TodoApp
 */

import React from 'react';

// import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import TodosList from './TodosList';

/**
 * Presentation component for the TodoApp
 * @see {@link module:containers/AddTodo},
 * {@link module:containers/VisibleTodosList} and
 * {@link module:components/Footer}
 * @return {Object} the TodoApp presentation component.
 */
const TodoApp = (props) => (
  <div>
    <AddTodo onAddTodo={ props.onAddTodo } />
    <TodosList todos={ props.todos } onTodoClick={ props.onToggleTodo } />
  </div>
);

export default TodoApp;
