/**
 * @module containers/AddTodo
 */

import React from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../actions/index';

const ENTER_KEY_CODE = 13;

let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input
        ref={node => { input = node; }}
        onKeyUp={(e) => {
          if(e.keyCode === ENTER_KEY_CODE) {
            dispatch(addTodo(input.value));
            input.value = '';
          }
        }}
      />
      <button
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = '';
        }}
        >Add</button>
    </div>
  );
};

/**
 * Generates a container component called AddTodo using the presentation
 * component. The connect method when called without parameters will, by
 * default, just forward the dispatch method from the store to the presentation
 * component.
 * @return {Object} the AddTodo container component
 */
AddTodo = connect()(AddTodo);

export default AddTodo;
