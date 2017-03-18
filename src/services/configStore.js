import React from 'react';
import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import reducers from '../reducers/';
import { loadState, persistState } from './localStorage';

const PERSIST_STATE_INTERVAL = 1000;

const configStore = () => {
  // creates the store with the reducers (result of combineReducers)
  // the second parameter is simply an object containing the pre-state of the app
  const store = createStore(reducers, loadState());

  // on every store change we persist the state, at most once a second (throtle function)
  store.subscribe(throttle(() => {
    persistState(store.getState());
  }, PERSIST_STATE_INTERVAL));

  return store;
}

export default configStore;
