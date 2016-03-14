/**
 * @module components/Footer
 */

import React from 'react';

import FilterLink from '../containers/FilterLink';

/**
 * Presentation component for a Footer containing three
 * {@link module:containers/FilterLink}
 * @return {Object} the Footer presentation component.
 */
const Footer = () => (
  <p>
    Show:
    <FilterLink filter='SHOW_ALL' >All</FilterLink>,
    <FilterLink filter='SHOW_COMPLETED' >Completed</FilterLink>,
    <FilterLink filter='SHOW_INCOMPLETED' >Incompleted</FilterLink>
  </p>
);

export default Footer;
