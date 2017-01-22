/**
 * @module containers/FilterLink
 */

import { Container } from 'flux/utils';
import React from 'react';

import Link from '../components/Link';
import Actions from '../actions/TodoActions';
import VisibilityStore from '../stores/VisibilityStore';

class FilterLink extends React.Component {
  static getStores() {
    return [VisibilityStore];
  }

  static calculateState(_, props) {
    return {
      active: props.filter === VisibilityStore.getState(),
      onClick: () => { Actions.setVisibilityFilter(props.filter); }
    };
  }

  render() {
    return <Link {...this.state}>{this.props.children}</Link>;
  }
}

export default Container.create(FilterLink, {withProps: true});
