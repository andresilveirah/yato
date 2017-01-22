import { Container } from 'flux/utils';
import TodosStore from '../stores/TodosStore';
import Actions from  '../actions/TodoActions';
import TodoApp from '../components/TodoApp';

const getStores = () => [ TodosStore ];

const getState = (_) => ({
  todos: TodosStore.getState(),

  onAddTodo: Actions.addTodo,
  onToggleTodo: Actions.toggleTodo
});

export default Container.createFunctional(TodoApp, getStores, getState);
