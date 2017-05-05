import * as externalApi from './firebase';
import * as fromUuid from './firebase/uuid';
import { fetchTodos, addTodo, toggleTodo } from './api';

const mockTodosList = ['a', 'b'];
const text = 'To be done';
let aTodo = {};

beforeEach(() => {
  aTodo = {id: fromUuid.uuid(), text, completed: false};

  fromUuid.uuid = jest.fn().mockReturnValue('123');
});

describe('fetchTodos', () => {
  beforeEach(() => {
    externalApi.fetchTodos = jest.fn().mockReturnValueOnce(
      new Promise(resolve => resolve(mockTodosList))
    );
  });

  it('returns an array', () => {
    return fetchTodos('a filter').then(
      response => expect(response).toEqual(mockTodosList)
    );
  });
});

describe('addTodo', () => {
  beforeEach(() => {
    externalApi.addTodo = jest.fn().mockImplementation(
      () => new Promise(resolve => resolve(aTodo))
    );
  });

  it('returns a Todo', () => {
    return addTodo('some text').then(
      response => expect(response).toEqual(aTodo)
    );
  });
});

describe('toggleTodo', () => {
  beforeEach(() => {
    externalApi.toggleTodo = jest.fn().mockImplementation(
      () => new Promise(resolve => resolve({...aTodo, completed: !aTodo.completed}))
    );
  });

  it('returns a Todo', () => {
    return toggleTodo('123').then(
      response => expect(response).toEqual({...aTodo, completed: !aTodo.completed})
    );
  });
});
