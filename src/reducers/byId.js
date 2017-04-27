const byId = (state = {}, action) => {
  let nextState;
  switch (action.type) {
    case 'FETCH_TODOS_SUCCESS':
      nextState = { ...state };
      action.response.forEach(todo => { nextState[todo.id] = todo; });
      return nextState;
    default:
      return state;
  }
};

export const getTodo = (state, id) => state[id];

export default byId;
