/**
 * @module components/Footer
 */

import React from 'react';

import FilterLink from './FilterLink';

/**
 * Presentation component for a Footer containing three
 * {@link module:containers/FilterLink}
 * @return {Object} the Footer presentation component.
 */
const Footer = () => (
  <p>
    Show:
    <FilterLink filter='all'>All</FilterLink>,
    <FilterLink filter='completed'>Completed</FilterLink>,
    <FilterLink filter='incompleted'>Incompleted</FilterLink>
  </p>
);

export default Footer;
