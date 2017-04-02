/**
 * @module components/Footer
 */

import React from 'react';
import { version } from '../../package.json';
import FilterLink from './FilterLink';

/**
 * Presentation component for a Footer containing three
 * {@link module:containers/FilterLink}
 * @return {Object} the Footer presentation component.
 */
const Footer = () => (
  <footer>
    <p>
      Show:
      <FilterLink filter='all'>All</FilterLink>,
      <FilterLink filter='completed'>Completed</FilterLink>,
      <FilterLink filter='incompleted'>Incompleted</FilterLink>
    </p>
    <p>
      <small>v{ version }</small>
    </p>
  </footer>
);

export default Footer;
