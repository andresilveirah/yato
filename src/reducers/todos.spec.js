import todos from './todos';

describe('todos reducer', () => {
  describe('when receiving an action of TOGGLE_TODO with a given id', () => {
    it('should toggle the completed property of the todo with the given id', () => {
      const action = { type: 'TOGGLE_TODO', id: 1 };
      let state = todos([{ text: 'Hello world', id: 1, completed: false }], action);

      expect(state).toEqual([{ text: 'Hello world', id: 1, completed: true }]);
    });

    it('toggling the same todo again will set completed to false', () => {
      const action = { type: 'TOGGLE_TODO', id: 1 };
      let state = todos([{ text: 'Hello world', id: 1, completed: false }], action);
      state = todos(state, action);

      expect(state).toEqual([{ text: 'Hello world', id: 1, completed: false }]);
    });
  });

  describe('when receiving an action of ADD_TODO', () => {
    it('should add the new todo to the state', () => {
      const action = { type: 'ADD_TODO', text: 'Hello world', id: 1 };
      const state = todos([], action);

      expect(state).toEqual([{ text: 'Hello world', id: 1, completed: false }]);
    });

    describe('and the todo\'s text is empty', () => {
      it('should not add the new todo to the state', () => {
        let action = { type: 'ADD_TODO', text: '', id: 1 };
        let state = todos([], action);
        expect(state).toEqual([]);

        action = { type: 'ADD_TODO', text: '     ', id: 1 };
        state = todos([], action);
        expect(state).toEqual([]);
      });
    });
  });

  describe('when receiving an action of REMOVE_TODO', () => {
    it('should add the new todo to the state', () => {
      const action = { type: 'REMOVE_TODO', id: 1, completed: false };
      const currentState = [{text: 'Hello world', id: 1, completed: false }];
      const nextState = todos(currentState, action);

      expect(nextState).toEqual([]);
    });
  });

  describe('when receiving an unknown action', () => {
    it('should return its current state', () => {
      const state = todos([], {});
      expect(state).toEqual([]);
    });
  });

  it('should not mutate the state object', () => {
    const previousState = [];
    const action = { type: 'ADD_TODO', text: 'Hello world', id: 1 };
    const nextState = todos(previousState, action);

    expect(nextState).not.toBe(previousState);
  });
});
