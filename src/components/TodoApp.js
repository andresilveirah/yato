/**
 * @module components/TodoApp
 */

import React from 'react';

import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodosList from '../containers/VisibleTodosList';

/**
 * Presentation component for the TodoApp
 * @see {@link module:containers/AddTodo},
 * {@link module:containers/VisibleTodosList} and
 * {@link module:components/Footer}
 * @return {Object} the TodoApp presentation component.
 */
const TodoApp = ({ match }) => (
  <div>
    <AddTodo />
    <VisibleTodosList filter={match.params.filter || 'all'} />
    <Footer />
  </div>
);

export default TodoApp;
