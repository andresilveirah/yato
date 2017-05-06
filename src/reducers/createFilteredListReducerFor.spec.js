import { normalize } from 'normalizr';

import createFilteredListReducerFor, { getIds, getIsFetching } from './createFilteredListReducerFor';
import types from '../actions/types';
import { todos, todosList } from '../actions/schema';

describe('createFilteredListReducerFor', () => {
  let filter = 'filter';
  let type, response;

  let reducer = createFilteredListReducerFor(filter);
  let state = { ids: [], isFetching: false, errorMessage: null };
  let action;

  describe('when the action filter does not match the reducers filter', () => {
    beforeEach(() => { action = { filter: 'another filter' }; });

    it('simply returns its state', () => {
      expect(reducer(state, action)).toEqual(state);
    });
  });

  describe('when the action type is not known', () => {
    beforeEach(() => { action = { type: 'SOMETHING_UNKNOWN', filter }; });

    it('simply returns its state', () => {
      expect(reducer(state, action)).toEqual(state);
    });
  });

  describe('when receiving a REMOVE_TODO_SUCCESS action', () => {
    beforeEach(() => {
      type = types.REMOVE_TODO_SUCCESS;
      action = { type, id: '123' };
    });

    it('removes the id from its state', () => {
      expect(reducer({...state, ids: ['123', 'abc']}, action).ids).toEqual(['abc']);
    });
  });

  describe('when the action type ADD_TODO_SUCCESS and the filter matches', () => {
    beforeEach(() => {
      type = types.ADD_TODO_SUCCESS;
      response = normalize({ id: 1 }, todos);
    });

    describe('and the filter is not "completed"', () => {
      beforeEach(() => {
        action = { type, filter, response };
      });

      it('adds the response id to its state.ids', () => {
        expect(reducer(state, action).ids).toEqual([1]);
      });
    });

    describe('and the filter is "completed"', () => {
      beforeEach(() => {
        filter = 'completed';
        action = { type, filter, response };
        reducer = createFilteredListReducerFor(filter);
       });

      it('doesnt add the todo to its state.ids', () => {
        expect(reducer(state, action).ids).toEqual([]);
      });
    });
  });

  describe('when the action type FETCH_TODOS_SUCCESS and the filter matches', () => {
    beforeEach(() => {
      type = types.FETCH_TODOS_SUCCESS;
      response = normalize([{ id: 1 }, { id: 2 }, { id: 3 }], todosList);
      action = { type, filter, response };
    });

    it('maps the ids from the response to its state.ids', () => {
      expect(reducer(state, action).ids).toEqual([1, 2, 3]);
    });

    it('sets the isFetching attribute to false', () => {
      expect(reducer({...state, isFetching: true}, action).isFetching).toEqual(false);
    });

    describe('when the action type FETCH_TODOS_REQUEST and the filter matches', () => {
      beforeEach(() => {
        type = types.FETCH_TODOS_REQUEST;
        action = {type, filter, response };
      });

      it('sets the isFetching attribute to true', () => {
        expect(reducer({...state, isFetching: false}, action).isFetching).toEqual(true);
      });
    });
  });

  describe('when the action type TOGGLE_TODO_SUCCESS and the filter matches', () => {
    beforeEach(() => { type = types.TOGGLE_TODO_SUCCESS; });

    ['completed', 'incompleted'].forEach((f) => {
      describe(`and the filter is ${f}`, () => {
        beforeEach(() => {
          filter = f;
          reducer = createFilteredListReducerFor(filter);
        });

        describe(`and the toggled todo is also ${f}`, () => {
          beforeEach(() => {
            response = normalize({ id: 1, completed: f === 'completed' }, todos);
            action = { type, filter, response };
          });

          it('does not remove the todo id from its state.ids', () => {
            expect(reducer({...state, ids: [1]}, action).ids).toEqual([1]);
          });
        });

        describe(`but the toggled todo is not ${f}`, () => {
          beforeEach(() => {
            response = normalize({ id: 1, completed: f !== 'completed' }, todos);
            action = { type, filter, response };
          });

          it('removes the todo id from its state.ids', () => {
            expect(reducer({...state, ids: [1]}, action).ids).toEqual([]);
          });
        });
      });
    });

    describe('and the filter is not completed nor incompleted', () => {
      it('it returns its own state', () => {
        expect(reducer({...state, ids: ['hello']}, action).ids).toEqual(['hello']);
      });
    });
  });

  describe('getIds', () => {
    it('returns the value of state.ids', () => {
      expect(getIds(state)).toEqual([]);
    });
  });

  describe('getIsFetching', () => {
    it('returns the value of state.isFetching', () => {
      expect(getIsFetching(state)).toEqual(false);
    });
  });
});
