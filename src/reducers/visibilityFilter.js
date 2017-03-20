/**
 * @module reducers/visibilityFilter
 */

/**
 * @param  {String} state  by default is equal to 'SHOW_ALL'
 * @param  {Object} action the object containing the filter to be set
 * @return {String} the filter set
 */
const visibilityFilter = (state = 'all', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return state = action.filter;
    default:
      return state;
  }
};

export default visibilityFilter;
