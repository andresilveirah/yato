import React from 'react';
import { Provider } from 'react-redux';
import TodoApp from './TodoApp';

const Root = ({ store }) => (
  <Provider store={store}>
    <TodoApp />
  </Provider>
);

Root.propTypes = {
  store: React.PropTypes.object.isRequired
};

export default Root;
