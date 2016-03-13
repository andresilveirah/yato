import * as actions from  '../../src/actions/index';

describe('action', () => {
  it('setVisibilityFilter should create a SET_VISIBILITY_FILTER action', () => {
    expect(actions.setVisibilityFilter('filter')).to.eql({
      type: 'SET_VISIBILITY_FILTER', filter: 'filter'
    });
  });

  it('toggleTodo should create a TOGGLE_TODO action', () => {
    expect(actions.toggleTodo(1)).to.eql({
      type: 'TOGGLE_TODO', id: 1
    });
  });

  describe('addTodo should', () => {
    it('create a ADD_TODO action', () => {
      expect(actions.addTodo('text')).to.eql({
        type: 'ADD_TODO', text: 'text', id: 0
      });
    });

    it('and should provide a sequential id', () => {
      expect(actions.addTodo('text').id).to.eql(1);
      expect(actions.addTodo('text').id).to.eql(2);
    });
  });
});
