/**
 * @module containers/VisibleTodosList
 */

import { Container } from 'flux/utils';
import TodosStore from '../stores/TodosStore';
import VisibilityStore from '../stores/VisibilityStore';
import Actions from  '../actions/TodoActions';
import TodosList from '../components/TodosList';

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

const getStores = () => [ TodosStore, VisibilityStore ];

const getState = (_) => ({
  todos: getVisibleTodos(TodosStore.getState(), VisibilityStore.getState()),
  onTodoClick: (id) => { Actions.toggleTodo(id); }
});

export default Container.createFunctional(TodosList, getStores, getState);
