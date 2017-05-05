import * as firebase from './firebase';

const fetchTodos = (filter) => firebase.fetchTodos(filter);

const addTodo = (text) => firebase.addTodo(text);

const toggleTodo = (id) => firebase.toggleTodo(id);

export { fetchTodos, addTodo, toggleTodo };
