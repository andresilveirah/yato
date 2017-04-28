import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/';

const configStore = () => {
  const middlewares = [ thunk ];
  const enableReduxDevTools = () =>
      typeof window !== 'undefined'
        && window.__REDUX_DEVTOOLS_EXTENSION__
        && window.__REDUX_DEVTOOLS_EXTENSION__();

  return createStore(
    reducers,
    enableReduxDevTools(),
    applyMiddleware(...middlewares)
  );
};

export default configStore;
