import todos, { getVisibleTodos } from './todos';
import todo from './todo';
import { addTodo, toggleTodo } from '../actions';

describe('todos reducer', () => {
  let state = undefined;

  describe('when receiving an ADD_TODO action', () => {
    describe('and the todos text is not empty', () => {
      let action = addTodo('Hello world');

      it('adds the todos id to its allIds attribute', () => {
        expect(todos(state, action).allIds).toEqual([action.id]);
      });

      it('adds the todo to its byId attribute', () => {
        expect(todos(state, action).byId).toEqual({
          [action.id]: todo(state, action)
        });
      });
    });
    describe('and the todos text is empty', () => {
      let action = addTodo('');

      it('doesn\'t add the todo id to its allIds attribute', () => {
        expect(todos(state, action).allIds).toEqual([]);
      });

      it('doesn\'t add the todo to its byId attribute', () => {
        expect(todos(state, action).byId).toEqual({});
      });
    });
  });

  describe('when receiving a TOGGLE_TODO action', () => {
    let action = toggleTodo(1);

    it('allIds attribute should not change', () => {
      let state = { allIds: [1,2,3] };

      expect(todos(state, action).allIds).toEqual(state.allIds);
    });

    it('byId should delegate the TOGGLE_TODO action to the todo reducer', () => {
      let state = {
        byId: {
          "1": { id: 1, text: 'to be toggled', completed: false },
          "2": { id: 2, text: 'hello world', completed: false }
        }
      };

      expect(todos(state, action).byId).toEqual({
        "1": { id: 1, text: 'to be toggled', completed: true },
        "2": { id: 2, text: 'hello world', completed: false }
      })
    });
  });
});
