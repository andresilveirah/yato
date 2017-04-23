import { createStore, applyMiddleware } from 'redux';
// import promise from 'redux-promise';
import logger from 'redux-logger';
import reducers from '../reducers/';

const thunk = (store) => (next) => (action) =>
  typeof action === 'function' ?
    action(store.dispatch) :
    next(action);

const configStore = () => {
  const middlewares = [ thunk ];

  // GOTCHA: create-react-app only exposes env variables which are prefixed with REACT_APP_
  // this is to avoid security issues e.g. exposing sensible env variables in the front end
  if(process.env.REACT_APP_DEBUG === 'true') {
    middlewares.push(logger);
  }

  return createStore(
    reducers,
    applyMiddleware(...middlewares)
  );
};

export default configStore;
