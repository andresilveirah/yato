import { uuid } from './uuid';

// fake delay from the "server"
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fakeDB = [
  { id:  uuid(), text: 'hey', completed: false },
  { id:  uuid(), text: 'ho', completed: false },
  { id:  uuid(), text: 'lets go', completed: true }
];

const fetchTodos = (filter) => delay(1000).then(() => {
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

const addTodo = (text) => delay(1000).then(() => {
  const todo = {id: uuid(), text, completed: false};
  fakeDB.push(todo);
  return todo;
});


export { fetchTodos, addTodo };
