import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TodoApp from './TodoApp';

const Root = ({ store }) => (
  <div>
    <header>
      <h1>Yet another TODO app</h1>
    </header>
    <Provider store={store}>
      <Router>
        <Route path='/' component={TodoApp} />
      </Router>
    </Provider>
  </div>
);

Root.propTypes = {
  store: React.PropTypes.object.isRequired
};

export default Root;
