import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TodosList from '../components/TodosList';
import { toggleTodo } from '../actions/index';
import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../services/api';

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
    fetchTodos(this.props.filter).then((todos) => console.log(todos));
  }

  render() {
    return <TodosList {...this.props} />;
  }
}

const mapTodosStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter
  };
};

VisibleTodosList = withRouter(connect(
  mapTodosStateToProps,
  { onTodoClick: toggleTodo }
)(VisibleTodosList));

export default VisibleTodosList;
