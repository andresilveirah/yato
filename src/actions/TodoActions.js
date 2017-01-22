import ActionType from './TodoActionTypes';
import TodoDispatcher from '../dispatchers/TodoDispatcher';
let TODO_ID = 0; // a lame auto increment id for TODOs

const Actions = {
  addTodo(text) {
    TodoDispatcher.dispatch({
      type: ActionType.ADD_TODO,
      id: TODO_ID++,
      text: text
    });
  },

  toggleTodo(id) {
    TodoDispatcher.dispatch({
      type: ActionType.TOGGLE_TODO,
      id: id
    });
  }
};

export default Actions;
