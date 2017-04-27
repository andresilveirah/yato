import createFilteredListReducerFor, { getIds, getIsFetching } from './createFilteredListReducerFor';

describe('createFilteredListReducerFor', () => {
  const filter = 'filter';
  let type = 'FETCH_TODOS_SUCCESS';
  const response = [{ id: 1 }, { id: 2 }, { id: 3 }];

  const reducer = createFilteredListReducerFor(filter);
  let state = { ids: [], isFetching: false, errorMessage: null };
  let action;

  describe('when the action filter does not match the reduers filter', () => {
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

  describe('when the action type FETCH_TODOS_SUCCESS and the filter matches', () => {
    beforeEach(() => { action = { type, filter, response }; });

    it('maps the ids from the response to its state.ids', () => {
      expect(reducer(state, action).ids).toEqual([1, 2, 3]);
    });

    it('sets the isFetching attribute to false', () => {
      expect(reducer({...state, isFetching: true}, action).isFetching).toEqual(false);
    });

    describe('when the action type FETCH_TODOS_REQUEST and the filter matches', () => {
      beforeEach(() => {
        type = 'FETCH_TODOS_REQUEST';
        action = {type, filter, response };
      });

      it('sets the isFetching attribute to true', () => {
        expect(reducer({...state, isFetching: false}, action).isFetching).toEqual(true);
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
