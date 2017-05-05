/**
 * @module components/TodosList
 */

import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';
import './TodosList.css';

const TodosList = ({todos, onTodoClick}) => (
  <ul className='TodosList'>
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
  todos: PropTypes.array.isRequired,
  onTodoClick: PropTypes.func.isRequired
};

export default TodosList;
