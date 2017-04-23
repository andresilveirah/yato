import createFilteredListReducerFor, { getIds } from './createFilteredListReducerFor';

describe('createFilteredListReducerFor', () => {
  const filter = 'filter';
  const type = 'RECEIVE_TODOS';
  const response = [{ id: 1 }, { id: 2 }, { id: 3 }];

  const reducer = createFilteredListReducerFor(filter);
  let action;

  describe('when the action filter does not match the reduers filter', () => {
    beforeEach(() => { action = { filter: 'another filter' }; });

    it('simply returns its state', () => {
      expect(reducer('some state', action)).toEqual('some state');
    });
  });

  describe('when the action type is not known', () => {
    beforeEach(() => { action = { type: 'SOMETHING_UNKNOWN', filter }; });

    it('simply returns its state', () => {
      expect(reducer('some state', action)).toEqual('some state');
    });
  });

  describe('when the action type RECEIVE_TODOS and the filter matches', () => {
    beforeEach(() => { action = { type, filter, response }; });

    it('simply returns its state', () => {
      expect(reducer('some state', action)).toEqual([1, 2, 3]);
    });
  });

  describe('getIds', () => {
    it('returns its own argument for now', () => {
      expect(getIds('hello world')).toEqual('hello world');
    });
  });
});
