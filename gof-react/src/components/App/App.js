import React, { Component } from 'react';
import Grid from 'components/Grid';
import { createGrid } from 'helpers';

export class App extends Component {
  state = {
    grid: createGrid(10, 10),
    aliveCells: [[0, 0], [0, 1], [1, 0], [1, 3], [2, 1], [2, 2]],
  };

  componentDidMount() {
    // Seed the grid with data from alive cells
    this.updateInitialCells();
  }

  updateInitialCells = () => {
    this.state.aliveCells.forEach(([x, y]) => {
      this.toggleCell(x, y);
    });
  };

  toggleCell = (x, y) => {
    const grid = [...this.state.grid];
    grid[x][y] = !grid[x][y];

    this.setState({ grid });
  };

  render() {
    return (
      <div className="wrapper">
        <Grid grid={this.state.grid} />
      </div>
    );
  }
}
