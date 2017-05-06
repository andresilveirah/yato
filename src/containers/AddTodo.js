import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addTodo } from '../actions/index';
import './AddTodo.css';

const validate = async (text) => {
  if(text.replace(/\s/g,'').length === 0){ throw new Error("Can't be blank"); }
};


class AddTodo extends React.PureComponent {
  constructor() {
    super();
    this.input = '';
    this.state = { error: undefined };
  }

  render () {
    const { dispatch } = this.props;
    return (
      <form
        className='AddTodo'
        onSubmit={(e) => {
          e.preventDefault();
          validate(this.input.value).then(
            () => {
              dispatch(addTodo(this.input.value));
              this.setState({error: undefined});
            },
            error => this.setState({error: error.message})
          );
          this.input.value = '';
        }}
      >
        <input
          className='AddTodo_Input'
          ref={node => { this.input = node; }}
          placeholder={this.state.error === undefined ? 'Type here...' : this.state.error}
        />
        <input className='AddTodo_Button' type='submit' value='Add Todo' />
      </form>
    );
  }
}

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
