import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TodosList from '../components/TodosList';
import * as actions from '../actions/index';
import { getVisibleTodos, getIsFetching } from '../reducers';

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
    const { filter, fetchTodos, requestTodos } = this.props;
    requestTodos(filter);
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, isFetching, todos } = this.props;

    if(isFetching && !todos.length) { return <p>Loading...</p>; }

    return <TodosList todos={todos} onTodoClick={ toggleTodo }/>;
  }
}

VisibleTodosList.propTypes = {
  todos: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  filter: PropTypes.oneOf(['all', 'completed', 'incompleted']).isRequired,
  requestTodos: PropTypes.func.isRequired,
  fetchTodos: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired
};

const mapTodosStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter
  };
};

VisibleTodosList = withRouter(connect(
  mapTodosStateToProps,
  actions
)(VisibleTodosList));

export default VisibleTodosList;
