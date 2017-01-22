import { ReduceStore } from 'flux/utils';
import TodoDispatcher from '../dispatchers/TodoDispatcher';
import Todo from '../data/Todo';
import ActionType from '../actions/TodoActionTypes';

class TodosStore extends ReduceStore {
  constructor() { super(TodoDispatcher); }

  getInitialState() { return []; }

  reduce(state = [], action) {
    switch (action.type) {
      case ActionType.ADD_TODO:
        const isCompleted = false;
        return [
          ...state,
          new Todo(action.id, action.text, isCompleted)
        ];

      case ActionType.TOGGLE_TODO:
        return state.map((todo) => {
          if(todo.id != action.id) { return todo; }
          else { return new Todo(todo.id, todo.text, !todo.completed); }
        });

      default:
        return state;
    }
  }
}

export default new TodosStore();
