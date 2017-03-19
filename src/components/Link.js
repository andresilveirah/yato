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
      href="#/filter"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  children: React.PropTypes.node.isRequired,
  active: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default Link;
