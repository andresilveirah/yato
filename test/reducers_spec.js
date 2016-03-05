import { todos } from '../src/app';

describe('todos reducer', () => {
  context('when receiving an action of TOGGLE_TODO with a given id', () => {
    it('should toggle the completed property of the todo with the given id', () => {
      const action = { type: 'TOGGLE_TODO', id: 1, completed: false };
      const state = todos([{ text: 'Hello world', id: 1, completed: false }], action);

      expect(state).to.eql([{ text: 'Hello world', id: 1, completed: true }]);
    });
  });

  context('when receiving an action of ADD_TODO', () => {
    it('should add the new todo to the state', () => {
      const action = { type: 'ADD_TODO', text: 'Hello world', id: 1, completed: false };
      const state = todos([], action);

      expect(state).to.eql([{ text: 'Hello world', id: 1, completed: false }]);
    });

    context('and the todo\'s text is empty', () => {
      it('should not add the new todo to the state', () => {
        let action = { type: 'ADD_TODO', text: '', id: 1, completed: false };
        let state = todos([], action);
        expect(state).to.eql([]);

        action = { type: 'ADD_TODO', text: '     ', id: 1, completed: false };
        state = todos([], action);
        expect(state).to.eql([]);
      });
    });
  });

  context('when receiving an action of REMOVE_TODO', () => {
    it('should add the new todo to the state', () => {
      const action = { type: 'REMOVE_TODO', id: 1, completed: false };
      const currentState = [{text: 'Hello world', id: 1, completed: false }];
      const nextState = todos(currentState, action);

      expect(nextState).to.be.empty();
    });
  });

  context('when receiving an unknown action', () => {
    it('should return its current state', () => {
      const state = todos([], {});
      expect(state).to.eql([]);
    });
  });

  it('should not mutate the state object', () => {
    const previousState = [];
    const action = { type: 'ADD_TODO', text: 'Hello world', id: 1, completed: false };
    const nextState = todos(previousState, action);

    expect(nextState).to.not.be(previousState);
  });
});
