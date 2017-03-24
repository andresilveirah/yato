/**
 * @module reducers/todos
 */

const isNotEmpty = (text) => {
  return text.replace(/\s/g,'').length > 0;
};

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if(state.id !== action.id){
        return state;
      }
      return Object.assign({}, state, {completed: !state.completed });
    default:
      return state;
  }
};

/**
 * the todos reducer is responsible for managing the collection of todos and
 * delegates actions which concern single todos to the todo reducer
 * @param  {Array}  state by default is set to empty array and contains the collection of todos
 * @param  {Object} action contains either the id or the text of the todo to be added
 * @return {Array}  the collection of todos
 */
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return isNotEmpty(action.text) ? [...state, todo(undefined, action)] : state;
    case 'REMOVE_TODO':
      return state.filter( t => t.id !== action.id );
    case 'TOGGLE_TODO':
      return state.map( t => todo(t, action));
    default:
      return state;
  }
};

export default todos;

export const getVisibleTodos = (state, filter) => {
  switch (filter) {
    case 'all':
      return state;
    case 'completed':
      return state.filter(t => t.completed);
    case 'incompleted':
      return state.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter ${filter}`);
  }
};
