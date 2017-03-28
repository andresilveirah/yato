// This function is the reducer for a single todo.
export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      return action.id === state.id ? { ...state, completed: !state.completed } : state;
    default:
      return state;
  }
};
