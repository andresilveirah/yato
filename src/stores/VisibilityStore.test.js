import VisibilityStore from './VisibilityStore';
import ActionTypes from '../actions/TodoActionTypes';

test('the initial state should be SHOW_ALL', () => {
  expect(VisibilityStore.getInitialState()).toBe('SHOW_ALL');
});

test('the initial state should be SHOW_ALL', () => {
  expect(VisibilityStore.getInitialState()).toBe('SHOW_ALL');
});

test('should change the state if it receives an SET_VISIBILITY_FILTER action', () => {
  const action = { type: ActionTypes.SET_VISIBILITY_FILTER, filter: 'foo' };
  const state = undefined;
  expect(VisibilityStore.reduce(state, action)).toBe('foo');
});

test('when the action is unknown it should return the state', () => {
  const action = { type: 'UNKNOWN_ACTION' };
  const state = 'foo';
  expect(VisibilityStore.reduce(state, action)).toBe('foo');
});

test('when the action is unknown and the state is undefined it should return SHOW_ALL', () => {
  const action = { type: 'UNKNOWN_ACTION' };
  const state = undefined;
  expect(VisibilityStore.reduce(state, action)).toBe('SHOW_ALL');
});
