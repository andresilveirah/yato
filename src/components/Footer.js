/**
 * @module components/Footer
 */

import React from 'react';
import { version } from '../../package.json';
import FilterLink from './FilterLink';

import './Footer.css';

/**
 * Presentation component for a Footer containing three
 * {@link module:containers/FilterLink}
 * @return {Object} the Footer presentation component.
 */
const Footer = () => (
  <footer className='Footer'>
    <ul className='Footer_List'>
      <li className='Footer_ListItem'>
        <FilterLink filter='all'>All</FilterLink>
      </li>
      <li className='Footer_ListItem'>
        <FilterLink filter='completed'>Completed</FilterLink>
      </li>
      <li className='Footer_ListItem'>
        <FilterLink filter='incompleted'>Incompleted</FilterLink>
      </li>
    </ul>
    <p className='Footer_Version'>
      <small>v{ version }</small>
    </p>
  </footer>
);

export default Footer;
