import byId, { getTodo } from './byId';

describe('createFilteredListReducerFor', () => {
  const type = 'RECEIVE_TODOS';
  const response = [{ id: 1, text: 'hey' }, { id: 2, text: 'ho' }];

  const reducer = byId;
  let state;
  let action;

  describe('when the action type is not known', () => {
    beforeEach(() => { action = { type: 'SOMETHING_UNKNOWN' }; });

    it('simply returns its state', () => {
      expect(reducer('some state', action)).toEqual('some state');
    });
  });

  describe('when the action type is RECEIVE_TODOS', () => {
    beforeEach(() => { action = { type, response }; });

    describe('and the state doesnt contain the todos in the response', () => {
      it('adds the todo to its state', () => {
        expect(reducer([], action)).toEqual({ 1: response[0], 2: response[1] });
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
