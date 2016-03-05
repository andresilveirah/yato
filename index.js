import ReactDOM from 'react-dom';
import React from 'react';
import { store , TodoApp } from './src/app';

const render = () => {
  ReactDOM.render(
    <TodoApp todos={store.getState().todos} />,
    document.getElementById('app')
  );
};
store.subscribe(render);
render();
