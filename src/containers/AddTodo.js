/**
 * @module containers/AddTodo
 */

import React from 'react';

const ENTER_KEY_CODE = 13;
let AUTO_TODO_ID = 0;

let AddTodo = (props) => {
  let input;
  return (
    <div>
      <input
        ref={node => { input = node; }}
        onKeyUp={(e) => {
          if(e.keyCode === ENTER_KEY_CODE) {
            props.onAddTodo(input.value);
            input.value = '';
          }
        }}
      />
      <button
        onClick={() => {
          props.onAddTodo(input.value);
          input.value = '';
        }}
        >Add</button>
    </div>
  );
};

export default AddTodo;
