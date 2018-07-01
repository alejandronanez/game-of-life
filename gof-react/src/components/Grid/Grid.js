import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from 'components/Cell';

export class Grid extends Component {
  renderCells = () => {
    return this.props.grid.map((row, rowIndex) => {
      const columns = row.map((rowItem, rowIndex) => (
        <td key={rowIndex}>
          <Cell isAlive={rowItem} />
        </td>
      ));

      return <tr key={rowIndex}>{columns}</tr>;
    });
  };

  render() {
    return (
      <table>
        <tbody>{this.renderCells()}</tbody>
      </table>
    );
  }
}

Grid.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)).isRequired,
};
