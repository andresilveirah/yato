import { createStore } from 'redux';
import reducers from '../reducers/';

const logger = (store) => (next) => {
  if (!console.group) return next;

  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: grey', store.getState());
    console.log('%c action', 'color: blue', action);
    const rawValue = next(action);
    console.log('%c current state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return rawValue;
  };
};

const promise = (store) => (next) => (action) => {
  if(typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
};

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware => {
    store.dispatch = middleware(store)(store.dispatch);
  });
};

const configStore = () => {
  const middlewares = [ promise ];
  const store = createStore(reducers);

  // CATCHA: create-react-app only exposes env variables which are prefixed with REACT_APP_
  // this is to avoid security issues e.g. exposing sensible env variables in the front end
  if(process.env.REACT_APP_DEBUG === 'true') {
    middlewares.push(logger);
  }

  wrapDispatchWithMiddlewares(store, middlewares);

  return store;
};

export default configStore;
