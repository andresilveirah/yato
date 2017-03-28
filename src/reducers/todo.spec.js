import todo from './todo';
import { addTodo, toggleTodo } from '../actions';

describe('todo reducer', () => {
  describe('when receiving a ADD_TODO action', () => {
    it('returns a new todo', () => {
      const state = undefined;
      const addAction = addTodo('Hello world');

      expect(todo(state, addAction)).toEqual(
        { id: addAction.id, text: 'Hello world', completed: false }
      );
    });
  });

  describe('when receiving a TOGGLE_TODO action', () => {
    describe('and the current todo id correspond to the id on the toggle action', () => {
      it('toggles the completed attribute of the todo', () => {
        const state = { id: 1, completed: false };
        const toggleAction = toggleTodo(1);

        expect(todo(state, toggleAction)).toEqual({ id: state.id, completed: true });
      });
    });
    describe('and the current todo id does not correspond to the id on the toggle action', () => {
      it('returns the state', () => {
        const state = { id: 1, completed: false };
        const toggleAction = toggleTodo('another id');

        expect(todo(state, toggleAction)).toEqual({ id: state.id, completed: false });
      });
    });
  });
});
