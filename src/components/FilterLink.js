import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';

import './FilterLink.css';

/**
 * Uses Link component from react-router to specify the filter parameter
 */
const FilterLink = ({children, filter}) => (
  <Link
    exact to={`/${filter === 'all' ? '' : filter}`}
    className='FilterLink'
    activeClassName='FilterLink-Active'
  >
    {children}
  </Link>
);

FilterLink.propTypes = {
  filter: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default FilterLink;
