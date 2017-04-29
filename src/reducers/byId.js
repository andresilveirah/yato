const byId = (state = {}, action) => {
  if(action.response !== undefined)
    return {
      ...state,
      ...action.response.entities.todos
    };

  return state;
};

export const getTodo = (state, id) => state[id];

export default byId;
