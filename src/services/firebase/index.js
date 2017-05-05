import UriTemplate from 'uritemplate';
import { uuid } from './uuid';

const filterToBool = (filter) => filter === 'completed';

const baseApiURL = process.env === 'PRODUCTION'
 ? 'https://yato-97cb1.firebaseio.com/todos/{id}.json{?query*}'
 : 'https://yato-97cb1.firebaseio.com/todos/{id}.json{?query*}';

const baseTemplate = UriTemplate.parse(baseApiURL);

const todoURL = (id) => baseTemplate.expand({id});

const fetchURLByFilter = (filter) => {
  switch (filter) {
    case 'all':
      return baseTemplate.expand({});
    case 'completed':
    case 'incompleted':
      return baseTemplate.expand({
        query: { orderBy: '"completed"', equalTo: filterToBool(filter) }
      });
    default:
      throw new Error(`Unknown filter ${filter}`);
    }
};

const getTodosFromCollection = (collection) =>
  collection !== null ? Object.values(collection) : {};

const fetchAndParseJSON = (url, fetchOptions = {}) =>
  fetch(url, fetchOptions)
    .then(response => response.json());

const setTodo = (todo) =>
  fetchAndParseJSON(todoURL(todo.id), { method: 'PUT', body: JSON.stringify(todo) });

const fetchTodos = (filter) =>
  fetchAndParseJSON(fetchURLByFilter(filter))
    .then(getTodosFromCollection);

const addTodo = (text) =>
  setTodo({ id: uuid(), text, completed: false });

const toggleTodo = (id) =>
  fetchAndParseJSON(todoURL(id))
    .then(todo => setTodo({...todo, completed: !todo.completed}));

export { fetchTodos, addTodo, toggleTodo };
