import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import TodoApp from './TodoApp';

import './Root.css';

const Root = ({ store }) => (
  <div className='Root'>
    <header>
      <h1 className='Root_Title'>YATO</h1>
      <h1 className='Root_Title-Big'>Yet another TODO app</h1>
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
