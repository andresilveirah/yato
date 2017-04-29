import configStore from '../services/configStore';
import * as actions from  './';
import types from './types';
import * as api from '../services/api';

describe('action', () => {
  let store;
  beforeEach(() => store = configStore({ todos: [] }));

  it('addTodo should create a ADD_TODO_SUCCESS action', () => {
    const todoText = 'text';
    const todo = { id: '123', text: todoText, completed: false };
    api.addTodo = jest.fn().mockReturnValueOnce(new Promise(
      resolve => resolve(todo)
    ));

    return store.dispatch(actions.addTodo(todoText)).then((action) => {
      expect(action).toEqual({
        type: types.ADD_TODO_SUCCESS,
        response: {
          entities: {
            todos: { '123': todo }
          },
          result: "123"
        }
      });
    });
  });

  it('toggleTodo should create a TOGGLE_TODO_SUCCESS action when the todo is found', () => {
    const todo = { id: '123', text: 'hello', completed: true };
    api.toggleTodo = jest.fn().mockReturnValueOnce(new Promise(
      resolve => resolve(todo)
    ));

    return store.dispatch(actions.toggleTodo(todo.id)).then((action) => {
      expect(action).toMatchObject({
        type: types.TOGGLE_TODO_SUCCESS,
        response: {
          entities: {
            todos: { '123': todo }
          },
          result: "123"
        }
      });
    });
  });

  it('toggleTodo should create a TOGGLE_TODO_FAILURE action when the todo cannot be found', () => {
    const errorMessage = 'boom';
    api.toggleTodo = jest.fn().mockReturnValueOnce(new Promise(
      () => { throw new Error(errorMessage); }
    ));

    return store.dispatch(actions.toggleTodo('123')).then((action) => {
      expect(action).toMatchObject({ type: 'TOGGLE_TODO_FAILURE', message: errorMessage });
    });
  });
});
