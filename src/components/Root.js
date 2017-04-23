import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TodoApp from './TodoApp';

const Root = ({ store }) => (
  <div>
    <header>
      <h1>Yet another TODO app</h1>
    </header>
    <Provider store={store}>
      <Router basename='/yato'>
        <Route exact path='/:filter?' component={TodoApp} />
      </Router>
    </Provider>
  </div>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

export default Root;
