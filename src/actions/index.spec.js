import * as actions from  './index';

describe('action', () => {
  it('setVisibilityFilter should create a SET_VISIBILITY_FILTER action', () => {
    expect(actions.setVisibilityFilter('filter')).toEqual({
      type: 'SET_VISIBILITY_FILTER', filter: 'filter'
    });
  });

  it('toggleTodo should create a TOGGLE_TODO action', () => {
    expect(actions.toggleTodo(1)).toEqual({
      type: 'TOGGLE_TODO', id: 1
    });
  });

  describe('addTodo should', () => {
    it('create a ADD_TODO action', () => {
      expect(actions.addTodo('text')).toEqual({
        type: 'ADD_TODO', text: 'text', id: 0
      });
    });

    it('and should provide a sequential id', () => {
      expect(actions.addTodo('text').id).toEqual(1);
      expect(actions.addTodo('text').id).toEqual(2);
    });
  });
});
