import visibilityFilter from '../../src/reducers/visibilityFilter';

describe('visibilityFilter reducer', () => {
  context('when receiving an action of SET_VISIBILITY_FILTER with a given filter', () => {
    it('should return the given filter', () => {
      const action = { type: 'SET_VISIBILITY_FILTER', filter: 'nice_filter' };
      const state = visibilityFilter(undefined, action);

      expect(state).to.eql('nice_filter');
    });
  });

  context('when receiving an unknown action', () => {
    it('should return its current state', () => {
      const state = visibilityFilter('SHOW_ALL', {});
      expect(state).to.eql('SHOW_ALL');
    });
  });
});
