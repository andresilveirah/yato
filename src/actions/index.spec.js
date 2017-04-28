import configStore from '../services/configStore';
import * as actions from  './index';

describe('action', () => {
  let store;

  beforeEach(() => store = configStore({ todos: [] }));

  it('toggleTodo should create a TOGGLE_TODO action', () => {
    const todoText = 'text';

    return store.dispatch(actions.addTodo(todoText)).then((action) => {
      expect(action).toMatchObject(
        {
          type: 'ADD_TODO_SUCCESS',
          response: { completed: false, text: 'text' }
        }
      );
      expect(action.response.id).toBeDefined();
    });
  });
});
