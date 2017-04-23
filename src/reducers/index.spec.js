import { getVisibleTodos } from './';

describe('todos reducer', () => {
  let state = {};

  describe('getVisibleTodos selector', () => {
    it('filters all todos', () => {
      state = {
        idsByFilter: { all: {ids: [1, 2]} },
        byId: {
          "1": { id: 1, text: 'completed todo', completed: true },
          "2": { id: 2, text: 'incompleted todo', completed: false }
        }
      };

      expect(getVisibleTodos(state, 'all')).toEqual([
        { id: 1, text: 'completed todo', completed: true },
        { id: 2, text: 'incompleted todo', completed: false }
      ]);
    });

    it('filters completed todos', () => {
      state = {
        idsByFilter: { completed: {ids: [1]} },
        byId: {
          "1": { id: 1, text: 'completed todo', completed: true },
          "2": { id: 2, text: 'incompleted todo', completed: false }
        }
      };

      expect(getVisibleTodos(state, 'completed')).toEqual([
        { id: 1, text: 'completed todo', completed: true }
      ]);
    });

    it('filters incompleted todos', () => {
      state = {
        idsByFilter: { incompleted: {ids: [2]} },
        byId: {
          "1": { id: 1, text: 'completed todo', completed: true },
          "2": { id: 2, text: 'incompleted todo', completed: false }
        }
      };

      expect(getVisibleTodos(state, 'incompleted')).toEqual([
        { id: 2, text: 'incompleted todo', completed: false }
      ]);
    });
  });
});
