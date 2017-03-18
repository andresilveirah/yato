import * as actions from  './index';

describe('action', () => {
  it('setVisibilityFilter should create a SET_VISIBILITY_FILTER action', () => {
    expect(actions.setVisibilityFilter('filter')).toEqual({
      type: 'SET_VISIBILITY_FILTER', filter: 'filter'
    });
  });

  it('toggleTodo should create a TOGGLE_TODO action', () => {
    expect(actions.toggleTodo(1)).toMatchObject({
      type: 'TOGGLE_TODO', id: 1
    });
  });

  describe('addTodo should', () => {
    it('create a ADD_TODO action', () => {
      expect(actions.addTodo('text')).toMatchObject({
        type: 'ADD_TODO', text: 'text'
      });
    });

    it('and should provide a unique id', () => {
      const firstId = actions.addTodo('text').id;
      const secondId = actions.addTodo('text').id;

      expect(firstId).not.toEqual(secondId);
    });
  });
});
