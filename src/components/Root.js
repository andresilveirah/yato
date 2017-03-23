import React from 'react';
import { Provider } from 'react-redux';
import TodoApp from './TodoApp';

const Root = ({ store }) => (
  <div>
    <header>
      <h1>Yet another TODO app</h1>
    </header>
    <Provider store={store}>
      <TodoApp />
    </Provider>
  </div>
);

Root.propTypes = {
  store: React.PropTypes.object.isRequired
};

export default Root;
