/**
 * @module containers/VisibleTodosList
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TodosList from '../components/TodosList';
import { toggleTodo } from '../actions/index';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'completed':
      return todos.filter(t => t.completed);
    case 'incompleted':
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
};

const mapTodosStateToProps = (state, { match }) => ({
  todos: getVisibleTodos(state.todos, match.params.filter || 'all')
});

/**
 * Generates a container component called VisibleTodosList using the presentation
 * component {@link module:components/TodosList}
 * @param  {Object} mapTodosStateToProps a map between the Container own
 * state to the presentation props.
 * @param  {Object} mapTodosDispatchToProps a map between the store
 * dispatch state to the presentation props.
 * @return {Object} the VisibleTodosList container component
 */
const VisibleTodosList = withRouter(connect(
  mapTodosStateToProps,
  { onTodoClick: toggleTodo }
)(TodosList));

export default VisibleTodosList;
