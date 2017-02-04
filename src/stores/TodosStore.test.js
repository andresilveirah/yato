import TodosStore from './TodosStore';
import ActionTypes from '../actions/TodoActionTypes';
import Todo from '../data/Todo';

test('initial state should be an empty array', () => {
  expect(TodosStore.getInitialState()).toEqual([]);
});

test('when the action is unknown it should return the state', () => {
  const action = { type: 'UNKNOWN_ACTION' };
  const state = 'foo';
  expect(TodosStore.reduce(state, action)).toBe('foo');
});

test('when the action is unknown and the state is undefined it should return SHOW_ALL', () => {
  const action = { type: 'UNKNOWN_ACTION' };
  const state = undefined;
  expect(TodosStore.reduce(state, action)).toEqual([]);
});

describe('when receiving an action of TOGGLE_TODO with a given id', () => {
  test('should toggle the completed property of the todo with the given id', () => {
    const action = { type: ActionTypes.TOGGLE_TODO, id: 1 };
    const state = [new Todo(1, 'Hello world', false)];

    expect(TodosStore.reduce(state, action)).toEqual([new Todo(1, 'Hello world', true)]);
  });

  test('toggling the same todo again will set completed to false', () => {
    const action = { type: ActionTypes.TOGGLE_TODO, id: 1 };
    let state = TodosStore.reduce([{ text: 'Hello world', id: 1, completed: false }], action);
    state = TodosStore.reduce(state, action);

    expect(state).toEqual([{ text: 'Hello world', id: 1, completed: false }]);
  });
});

describe('when receiving an action of ADD_TODO', () => {
  test('should add the new todo to the state', () => {
    const action = { type: 'ADD_TODO', text: 'Hello world', id: 1, completed: false };
    const state = [];

    expect(TodosStore.reduce(state, action)).toEqual([new Todo(1, 'Hello world', false )]);
  });

  // TODO: reject empty todos
  // describe('and the todo\'s text is empty', () => {
  //   test('should not add the new todo to the state', () => {
  //     let action = { type: 'ADD_TODO', text: '', id: 1, completed: false };
  //     let state = todos([], action);
  //     expect(state).to.eql([]);
  //
  //     action = { type: 'ADD_TODO', text: '     ', id: 1, completed: false };
  //     state = todos([], action);
  //     expect(state).to.eql([]);
  //   });
  // });
});
