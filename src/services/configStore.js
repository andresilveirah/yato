import { createStore } from 'redux';
import throttle from 'lodash/throttle';

import reducers from '../reducers/';
import { loadState, persistState } from './localStorage';

const PERSIST_STATE_INTERVAL = 1000;

const addLogginToActions = (store) => {
  if (!console.group) return store.dispatch;

  const rawDispatch = store.dispatch;
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: grey', store.getState());
    console.log('%c action', 'color: blue', action);
    const rawValue = rawDispatch(action);
    console.log('%c current state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return rawValue;
  };
};

const configStore = () => {
  // creates the store with the reducers (result of combineReducers)
  // the second parameter is simply an object containing the pre-state of the app
  const store = createStore(reducers, loadState());

  // CATCHA: create-react-app only exposes env variables which are prefixed with REACT_APP_
  // this is to avoid security issues e.g. exposing sensible env variables in the front end
  if(process.env.REACT_APP_DEBUG === 'true') {
    store.dispatch = addLogginToActions(store);
  }

  // on every store change we persist the state, at most once a second (throtle function)
  store.subscribe(throttle(() => {
    persistState(store.getState());
  }, PERSIST_STATE_INTERVAL));

  return store;
};

export default configStore;
