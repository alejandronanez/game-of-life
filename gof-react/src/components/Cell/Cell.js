import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Cell extends Component {
  render() {
    return (
      <div
        className={this.props.isAlive ? 'cell cell--alive' : 'cell cell--dead'}
      />
    );
  }
}

Cell.propTypes = { isAlive: PropTypes.bool };
