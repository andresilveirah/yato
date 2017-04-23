import { combineReducers } from 'redux';

// const isNotEmpty = (text) => text.replace(/\s/g,'').length > 0;
// const delegateToTodoReducer = (state, action) => ({...state, [action.id]: todo(state[action.id], action)});

const byId = (state = {}, action) => {
  let nextState;
  switch (action.type) {
    case 'RECEIVE_TODOS':
      nextState = { ...state };
      action.response.forEach(todo => { nextState[todo.id] = todo; });
      return nextState;
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  if(action.filter !== 'all') { return state; }

  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};

const completedIds = (state = [], action) => {
  if(action.filter !== 'completed') { return state; }

  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};

const incompletedIds = (state = [], action) => {
  if(action.filter !== 'incompleted') { return state; }

  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};

const idsByFilter = combineReducers({
  all: allIds,
  completed: completedIds,
  incompleted: incompletedIds
});

// While the Todo reducer manages a single Todo, this reducer is responsible for the collection of Todos.
// The state is 'normalized'.
// byId's state is an object with all todos indexed by its id.
// allIds' state is an Array containing all Todos' ids.
export default combineReducers({ byId, idsByFilter });

// This function works as a selector. Filtering todos by the selected filter and
// mapping to an array of Todos.
export const getVisibleTodos = (state, filter) => {
  return state.idsByFilter[filter].map(id => state.byId[id]);
};
