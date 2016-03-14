/**
 * @module containers/FilterLink
 */

import { connect } from 'react-redux';

import Link from '../components/Link';
import { setVisibilityFilter } from '../actions/index';

const mapVisibilityStateToProps = (state, props) => ({
    active: props.filter === state.visibilityFilter
});

const mapVisibilityDispatchToProps = (dispatch, props) => ({
    onClick: () => { dispatch(setVisibilityFilter(props.filter)); }
});

/**
 * Generates a container component called FilterLink using the presentation
 * component {@link module:components/Link}
 * @param  {Object} mapVisibilityStateToProps a map between the Container own
 * state to the presentation props.
 * @param  {Object} mapVisibilityDispatchToProps a map between the store
 * dispatch state to the presentation props.
 * @return {Object} the FilterLink container component
 */
const FilterLink = connect(
  mapVisibilityStateToProps,
  mapVisibilityDispatchToProps
)(Link);

export default FilterLink;
