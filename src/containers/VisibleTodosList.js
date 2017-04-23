import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TodosList from '../components/TodosList';
import * as actions from '../actions/index';
import { getVisibleTodos } from '../reducers';

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
    const { toggleTodo, ...rest } = this.props;
    return (
      <TodosList
        {...rest}
        onTodoClick={ toggleTodo }
      />
    );
  }
}

VisibleTodosList.propTypes = {
  filter: PropTypes.oneOf(['all', 'completed', 'incompleted']).isRequired,
  requestTodos: PropTypes.func.isRequired,
  fetchTodos: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired
};

const mapTodosStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter
  };
};

VisibleTodosList = withRouter(connect(
  mapTodosStateToProps,
  actions
)(VisibleTodosList));

export default VisibleTodosList;
