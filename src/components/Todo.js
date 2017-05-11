import React from 'react';
import PropTypes from 'prop-types';

import './Todo.css';

const ARCHIVE_SHORTCUT_KEY_CODE = 65; // 'a'

const onArchiveShortcutPress = (handler, event) => {
  if(event.keyCode === ARCHIVE_SHORTCUT_KEY_CODE) handler(event);
};

const Todo = ({text, completed, onClick, onDeleteClick}) => (
  <li className='TodoList_Item'>
    <div className='TodoList_Icon'>
      {completed &&
        <svg style={{fill: '#b3b3b3'}} width="20" height="20" x="0" y="0" viewBox="0 0 342 342">
          <polygon points="290 33 119 204 52 138 0 190 119 309 342 86 "/>
        </svg>
      }
    </div>
    <span
      className={completed ? 'TodoList_Text-completed' : 'TodoList_Text'}
      onClick={onClick}
      onKeyDown={onArchiveShortcutPress.bind(null, onClick)}
      role='button'
      tabIndex='0'
    >
      {text}
    </span>
    <button className='Todo_Delete' onClick={onDeleteClick} style={{color: 'red'}}>
      <svg style={{fill: '#b3b3b3'}} width="26" height="26" viewBox="0 0 1024 1024">
        <path d="M640 91H537V24C537 10 526 0 513 0c-1 0-2 0-3 1C509 0 509 0 508 0H265h-2 -2c-14 0-24 10-24 24v67H134c-30 0-53 23-53 53v38 48h46v492c0 30 23 52 52 52h416c30 0 53-23 53-52v-492h45v-48 -38C693 114 670 91 640 91zM286 48h203v43h-203V48zM599 722c0 3-1 4-4 4H179c-3 0-4-1-4-4V230h424V722zM645 182H130v-38c0-3 1-5 4-5H640c3 0 4 2 4 5V182z"/><rect x="475" y="287" width="48" height="397"/>
        <rect x="363" y="287" width="48" height="397"/>
        <rect x="252" y="287" width="48" height="397"/>
      </svg>
    </button>
  </li>
);

Todo.propTypes = {
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default Todo;
