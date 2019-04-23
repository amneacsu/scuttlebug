import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Debug extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {
    open: false,
  }

  render() {
    return this.state.open
      ? this.props.children
      : <div><button onClick={() => this.setState({ open: true })}>{'{}'}</button></div>;
  }
}

export default Debug;
