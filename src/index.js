import ReactDOM from 'react-dom';
import React from 'react';

import configStore from './services/configStore';
import Root from './components/Root';

ReactDOM.render(
  <Root store={configStore()} />,
  document.getElementById('app')
);
