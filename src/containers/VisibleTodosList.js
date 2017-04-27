import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TodosList from '../components/TodosList';
import ErrorMessage from '../components/ErrorMessage';
import * as actions from '../actions/index';
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers';

class VisibleTodosList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.filter !== this.props.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, isFetching, errorMessage, todos } = this.props;

    if(isFetching && !todos.length) { return <p>Loading...</p>; }
    if(errorMessage) {
      return <ErrorMessage message={errorMessage} onRetry={() => this.fetchData()} />;
    }

    return <TodosList todos={todos} onTodoClick={ toggleTodo }/>;
  }
}

VisibleTodosList.propTypes = {
  todos: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  filter: PropTypes.oneOf(['all', 'completed', 'incompleted']).isRequired,
  fetchTodos: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

const mapTodosStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    errorMessage: getErrorMessage(state, filter),
    filter
  };
};

VisibleTodosList = withRouter(connect(
  mapTodosStateToProps,
  actions
)(VisibleTodosList));

export default VisibleTodosList;
