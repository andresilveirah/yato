/**
 * @module components/Todo
 */

import React from 'react';

const ARCHIVE_SHORTCUT_KEY_CODE = 65; // 'a'

const onArchiveShortcutPress = (handler, event) => {
  if(event.keyCode === ARCHIVE_SHORTCUT_KEY_CODE) {
    handler(event);
  }
};

/**
 * Presentation component for a Todo
 * @param  {Object} Properties contains the text of the todo, the boolean
 * for completed and the onClick handler.
 * @return {Object} the presentation component.
 */
const Todo = ({text, completed, onClick}) => (
  <li
    onClick={onClick}
    onKeyDown={onArchiveShortcutPress.bind(null, onClick)}
    role="button"
    tabIndex="0"
    style={{textDecoration: completed ? 'line-through' : ''}}>
    {text}
  </li>
);

Todo.propTypes = {
  text: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

export default Todo;
