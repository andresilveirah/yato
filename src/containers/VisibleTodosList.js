/**
 * @module containers/VisibleTodosList
 */

import { connect } from 'react-redux';

import TodosList from '../components/TodosList';
import { toggleTodo } from '../actions/index';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_INCOMPLETED':
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
};

const mapTodosStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});
const mapTodosDispatchToProps = (dispatch) => ({
  onTodoClick: (id) => { dispatch(toggleTodo(id)); }
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
const VisibleTodosList = connect(
  mapTodosStateToProps,
  mapTodosDispatchToProps
)(TodosList);

export default VisibleTodosList;
