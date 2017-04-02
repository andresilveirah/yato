// fake delay from the "server"
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fakeDB = [
  { id:  '1', text: 'hey', completed: false },
  { id:  '2', text: 'ho', completed: false },
  { id:  '3', text: 'lets go', completed: true }
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


export { fetchTodos };
