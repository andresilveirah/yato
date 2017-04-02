import { createStore } from 'redux';
import reducers from '../reducers/';

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
  const store = createStore(reducers);

  // CATCHA: create-react-app only exposes env variables which are prefixed with REACT_APP_
  // this is to avoid security issues e.g. exposing sensible env variables in the front end
  if(process.env.REACT_APP_DEBUG === 'true') {
    store.dispatch = addLogginToActions(store);
  }

  return store;
};

export default configStore;
