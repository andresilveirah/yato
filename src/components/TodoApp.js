import React from 'react';

import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodosList from '../containers/VisibleTodosList';
import './TodoApp.css';

const TodoApp = () => (
  <div className='TodoApp'>
    <AddTodo />
    <VisibleTodosList />
    <Footer />
  </div>
);

export default TodoApp;
