import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/';

const configStore = () => {
  const middlewares = [ thunk ];

  return createStore(
    reducers,
    applyMiddleware(...middlewares)
  );
};

export default configStore;
