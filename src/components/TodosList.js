import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import Todo from './Todo';

import './TodosList.css';

const renderTodo = (todo, onTodoClick, onDeleteClick) =>
  <Todo
    key={todo.id}
    text={todo.text}
    completed={todo.completed}
    onClick={() => { onTodoClick(todo.id); }}
    onDeleteClick={() => { onDeleteClick(todo.id); }} />;

const TodosList = ({todos, onTodoClick, onDeleteClick}) => (
  <ul className='TodosList'>
    <CSSTransitionGroup transitionName="TodosList" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
      { todos.map(todo => renderTodo(todo, onTodoClick, onDeleteClick)) }
    </CSSTransitionGroup>
  </ul>
);

TodosList.propTypes = {
  todos: PropTypes.array.isRequired,
  onTodoClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default TodosList;
