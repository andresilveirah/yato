import { ReduceStore } from 'flux/utils';
import TodoDispatcher from '../dispatchers/TodoDispatcher';
import ActionTypes from '../actions/TodoActionTypes';

class VisibilityStore extends ReduceStore {
  constructor(){ super(TodoDispatcher); }

  getInitialState() { return 'SHOW_ALL'; }

  reduce(state = 'SHOW_ALL', action) {
    switch (action.type) {
      case ActionTypes.SET_VISIBILITY_FILTER:
        return state = action.filter;
      default:
        return state;
    }
  }
}

export default new VisibilityStore();
