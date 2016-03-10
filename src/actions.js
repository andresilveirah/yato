const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER', filter
});

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO', id
});

let nextTodoId = 0;
const addTodo = (text) => ({
  type: 'ADD_TODO', text, id: nextTodoId++
});

export { setVisibilityFilter, toggleTodo, addTodo };
