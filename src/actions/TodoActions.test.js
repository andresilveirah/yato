import TodoDispatcher from '../dispatchers/TodoDispatcher';
import ActionType from './TodoActionTypes';
import TodoActions from './TodoActions';

jest.mock('../dispatchers/TodoDispatcher');
TodoDispatcher.dispatch.mockImplementation((_) => true);

// auto increment the call number of the mocked function
const calledWithGenerator = (callNumber) => (mockedFunction) => mockedFunction.mock.calls[callNumber++][0];
// starting at call number 0
const calledWith = calledWithGenerator(0);

test('setVisibilityFilter should dispatch a SET_VISIBILITY_FILTER action', () => {
  TodoActions.setVisibilityFilter('filter');
  const wasCalledWith = calledWith(TodoDispatcher.dispatch);

  expect(wasCalledWith).toEqual({
    type: 'SET_VISIBILITY_FILTER', filter: 'filter'
  });
});

test('toggleTodo should dispatch a TOGGLE_TODO action', () => {
  TodoActions.toggleTodo(1);
  const wasCalledWith = calledWith(TodoDispatcher.dispatch);

  expect(wasCalledWith).toEqual({ type: 'TOGGLE_TODO', id: 1 });
});

describe('addTodo should', () => {
  test('dispatch an ADD_TODO action', () => {
    TodoActions.addTodo('text');
    const wasCalledWith = calledWith(TodoDispatcher.dispatch);

    expect(wasCalledWith).toEqual({
      type: 'ADD_TODO', text: 'text', id: 0
    });
  });

  test('and should provide a sequential id', () => {
    TodoActions.addTodo('text');
    let wasCalledWith = calledWith(TodoDispatcher.dispatch);
    expect(wasCalledWith.id).toEqual(1);

    TodoActions.addTodo('text');
    wasCalledWith = calledWith(TodoDispatcher.dispatch);
    expect(wasCalledWith.id).toEqual(2);
  });
});
