import { combineReducers } from 'redux';

import byId, * as fromById from './byId';
import createFilteredListReducerFor, * as fromCreateFilteredListReducerFor from './createFilteredListReducerFor';

// const isNotEmpty = (text) => text.replace(/\s/g,'').length > 0;
// const delegateToTodoReducer = (state, action) => ({...state, [action.id]: todo(state[action.id], action)});

const idsByFilter = combineReducers({
  all: createFilteredListReducerFor('all'),
  completed: createFilteredListReducerFor('completed'),
  incompleted: createFilteredListReducerFor('incompleted')
});

// While the Todo reducer manages a single Todo, this reducer is responsible for the collection of Todos.
// The state is 'normalized'.
// byId's state is an object with all todos indexed by its id.
// allIds' state is an Array containing all Todos' ids.
export default combineReducers({ byId, idsByFilter });

// This function works as a selector. Filtering todos by the selected filter and
// mapping to an array of Todos.
export const getVisibleTodos = (state, filter) => {
  const ids = fromCreateFilteredListReducerFor.getIds(state.idsByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, filter) =>
  fromCreateFilteredListReducerFor.getIsFetching(state.idsByFilter[filter]);
