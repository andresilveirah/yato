import types from '../actions/types';
import byId, { getTodo } from './byId';

describe('createFilteredListReducerFor', () => {
  const reducer = byId;
  let type, response, state, action;

  describe('when the action type is not known', () => {
    beforeEach(() => { action = { type: 'SOMETHING_UNKNOWN' }; });

    it('simply returns its state', () => {
      expect(reducer('some state', action)).toEqual('some state');
    });
  });

  describe('when the action type is not known', () => {
    beforeEach(() => { action = { type: 'SOMETHING_UNKNOWN' }; });

    it('simply returns its state', () => {
      expect(reducer('some state', action)).toEqual('some state');
    });
  });

  describe('when the action type is ADD_TODO_SUCCESS', () => {
    beforeEach(() => {
      type = types.ADD_TODO_SUCCESS;
      response = { id: 1, text: 'hey' };
      action = { type, response };
    });

    it('adds the todo to its state', () => {
      expect(reducer({}, action)).toEqual({ 1: response });
    });
  });

  describe('when the action type is TOGGLE_TODO_SUCCESS', () => {
    beforeEach(() => {
      type = types.TOGGLE_TODO_SUCCESS;
      response = { id: 1, text: 'hey', completed: true };
      action = { type, response };
    });

    it('updates the toggled todo', () => {
      expect(reducer({ 1: { id: 1, text: 'hey', completed: false } }, action)).toEqual({ 1: response });
    });
  });

  describe('when the action type is FETCH_TODOS_SUCCESS', () => {
    beforeEach(() => {
      type = types.FETCH_TODOS_SUCCESS;
      response = [{ id: 1, text: 'hey' }, { id: 2, text: 'ho' }];
      action = { type, response };
    });

    describe('and the state doesnt contain the todos in the response', () => {
      it('adds the todo to its state', () => {
        expect(reducer({}, action)).toEqual({ 1: response[0], 2: response[1] });
      });
    });

    describe('and the state already contain one of the todos in the response', () => {
      const updatedTodo = { id: 1, text: 'hoho' };

      beforeEach(() => {
        state = { 1: response[0], 2: response[1] };
        response[0] = updatedTodo;
        action = { type, response };
      });

      it('returns a new state object with the updated todo', () => {
        expect(reducer(state, action)).toEqual({ 1: updatedTodo, 2: response[1] });
      });
    });

    describe('getTodo', () => {
      it('returns the value of a key in a list', () => {
        expect(getTodo({ 1: 'hey', 2: 'ho' }, 1)).toEqual('hey');
      });
    });
  });
});
