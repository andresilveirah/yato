import { combineReducers } from 'redux';

const createFilteredListReducerFor = (filter) => {
  const ids = (state = [], action) => {
    if(action.filter !== filter) { return state; }

    switch (action.type) {
     case 'RECEIVE_TODOS':
       return action.response.map(todo => todo.id);
     default:
       return state;
    }
  };

  return combineReducers({ ids });
};

export default createFilteredListReducerFor;

export const getIds = (state) => state.ids;
