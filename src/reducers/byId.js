import types from '../actions/types';

const byId = (state = {}, action) => {
  let nextState;
  switch (action.type) {
    case types.FETCH_TODOS_SUCCESS:
      nextState = { ...state };
      action.response.forEach(todo => { nextState[todo.id] = todo; });
      return nextState;
    case types.ADD_TODO_SUCCESS:
    case types.TOGGLE_TODO_SUCCESS:
      return { ...state, [action.response.id]: action.response };
    default:
      return state;
  }
};

export const getTodo = (state, id) => state[id];

export default byId;
