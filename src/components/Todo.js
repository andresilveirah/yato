/**
 * @module components/Todo
 */

import React from 'react';

/**
 * Presentation component for a Todo
 * @param  {Object} Properties contains the text of the todo, the boolean
 * for completed and the onClick handler.
 * @return {Object} the presentation component.
 */
const Todo = ({text, completed, onClick}) => (
  <li onClick={onClick} style={{textDecoration: completed ? 'line-through' : ''}}>
    {text}
  </li>
);

export default Todo;
