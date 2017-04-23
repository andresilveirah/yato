import createFilteredListReducerFor, { getIds } from './createFilteredListReducerFor';

describe('createFilteredListReducerFor', () => {
  const filter = 'filter';
  const type = 'RECEIVE_TODOS';
  const response = [{ id: 1 }, { id: 2 }, { id: 3 }];

  const reducer = createFilteredListReducerFor(filter);
  let state = { ids: [], isFetching: false };
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

  describe('when the action type RECEIVE_TODOS and the filter matches', () => {
    beforeEach(() => { action = { type, filter, response }; });

    it('maps the ids from the response to its state.ids', () => {
      expect(reducer(state, action).ids).toEqual([1, 2, 3]);
    });

    });
  });

  describe('getIds', () => {
    it('returns the value of state.ids', () => {
      expect(getIds(state)).toEqual([]);
    });
  });
    });
  });
});
