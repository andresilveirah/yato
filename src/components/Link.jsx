/**
 * @module components/Link
 */

import React from 'react';

/**
 * Presentation component for a Link
 * @param  {Object} Properties contains the children (component "innerHTML"
 * sort of), Boolean for active and a onClick handler.
 * @return {Object} the presentation Link component.
 */
const Link = ({ children, active, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

export default Link;
