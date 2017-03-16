import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers/';
import TodoApp from './components/TodoApp';

import { loadState, persistState } from './localStorage';

import throttle from 'lodash/throttle';

const PERSIST_STATE_INTERVAL = 1000;

// creates the store with the reducers (result of combineReducers)
// the second parameter is simply an object containing the pre-state of the app
const store = createStore(reducers, loadState());

// on every store change we persist the state, at most once a second (throtle function)
store.subscribe(throttle(() => {
  persistState(store.getState());
}, PERSIST_STATE_INTERVAL));

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
);
