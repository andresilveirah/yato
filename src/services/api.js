import { uuid } from './uuid';

// fake delay from the "server"
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fakeDB = [
  { id:  uuid(), text: 'hey', completed: false },
  { id:  uuid(), text: 'ho', completed: false },
  { id:  uuid(), text: 'lets go', completed: true }
];

const fetchTodos = (filter) => delay(750).then(() => {
  switch (filter) {
    case 'all':
      return fakeDB;
    case 'completed':
      return fakeDB.filter(t => t.completed);
    case 'incompleted':
      return fakeDB.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter ${filter}`);
  }
});

const addTodo = (text) => delay(500).then(() => {
  const todo = {id: uuid(), text, completed: false};
  fakeDB.push(todo);
  return todo;
});

const toggleTodo = (id) => delay(500).then(() => {
  const todo = fakeDB.find(t => t.id === id);
  if(undefined !== todo) {
    todo.completed = !todo.completed;
    return todo;
  } else {
    throw new Error(`Could not find todo with the id: ${id}`);
  }
});

export { fetchTodos, addTodo, toggleTodo };
