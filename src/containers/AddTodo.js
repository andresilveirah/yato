import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addTodo } from '../actions/index';
import './AddTodo.css';

let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <form
      className='AddTodo'
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(addTodo(input.value));
        input.value = '';
      }}
    >
      <input className='AddTodo_Input' ref={node => { input = node; }} placeholder='Type here...'/>
      <input className='AddTodo_Button' type='submit' value='Add Todo' />
    </form>
  );
};

AddTodo.propTypes = {
  dispatch: PropTypes.func.isRequired
};

/**
 * Generates a container component called AddTodo using the presentation
 * component. The connect method when called without parameters will, by
 * default, just forward the dispatch method from the store to the presentation
 * component.
 */
AddTodo = connect()(AddTodo);

export default AddTodo;
