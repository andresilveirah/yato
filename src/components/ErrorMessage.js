/**
 * @module components/ErrorMessage
 */

import React from 'react';
import PropTypes from 'prop-types';

import './ErrorMessage.css';
/**
 * A wrapper for displaying error messages
 */
const ErrorMessage = ({ message, onRetry }) => (
  <div>
    <p className='ErrorMessage'>{message}</p>
    <button onClick={onRetry}>Retry</button>
  </div>
);

ErrorMessage.defaultProps = { message: 'Something went wrong :/' };

ErrorMessage.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func.isRequired
 };

export default ErrorMessage;
