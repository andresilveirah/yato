/**
 * @module components/TodosList
 */

import React from 'react';
import Todo from './Todo';

/**
 * Presentation component for a TodosList
 * @param  {Object} Properties contains the collection of todos and the onClick
 * handler.
 * @see {@link module:components/Todo}
 * @return {Object} the TodosList presentation component.
 */
const TodosList = ({todos, onTodoClick}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        text={todo.text}
        completed={todo.completed}
        onClick={() => { onTodoClick(todo.id); }} />
    )}
  </ul>
);

TodosList.propTypes = {
  todos: React.PropTypes.array.isRequired,
  onTodoClick: React.PropTypes.func.isRequired
};

export default TodosList;
