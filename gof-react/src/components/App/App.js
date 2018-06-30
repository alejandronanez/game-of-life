import React, { Component } from 'react';
import Grid from 'components/Grid';
import { createGrid, cloneArray } from 'helpers';

export class App extends Component {
  rows = 4;

  state = {
    generationCount: 0,
    intervalId: 0,
    grid: createGrid(this.rows, this.rows),
    aliveCells: [[0, 0], [0, 1], [1, 0], [1, 3], [2, 1], [2, 2], [3, 1]],
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

  getNeighbors = (x, y) => {
    return [
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x, y - 1],
      [x, y + 1],
      [x + 1, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
    ];
  };

  validateNeighbors = neighbors => {
    return neighbors.filter(coord => {
      return !(coord.includes(-1) || coord.includes(this.rows));
    });
  };

  countAliveCells = neighbors => {
    return neighbors.filter(([x, y]) => {
      return this.state.grid[x][y];
    }).length;
  };

  shouldToggleCell = (totalAliveNeighbors, x, y) => {
    const cell = this.state.grid[x][y];

    if (cell && (totalAliveNeighbors < 2 || totalAliveNeighbors > 3)) {
      return true;
    }

    if (!cell && totalAliveNeighbors === 3) {
      return true;
    }
  };

  scanGrid = () => {
    const newGrid = cloneArray(this.state.grid);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.rows; j++) {
        const neighbors = this.getNeighbors(i, j);
        const validNeighbors = this.validateNeighbors(neighbors);
        const totalAliveNeighbors = this.countAliveCells(validNeighbors);
        if (this.shouldToggleCell(totalAliveNeighbors, i, j)) {
          newGrid[i][j] = !newGrid[i][j];
        }
      }
    }

    this.setState(prevState => ({
      generationCount: prevState.generationCount + 1,
      grid: newGrid,
    }));
  };

  startGame = () => {
    const intervalId = setInterval(() => this.scanGrid(), 1000);

    this.setState({ intervalId });
  };

  pauseGame = () => {
    clearInterval(this.state.intervalId);
  };

  render() {
    return (
      <div className="wrapper">
        <h1>{this.state.generationCount} Generations</h1>
        <Grid grid={this.state.grid} />
        <button onClick={this.startGame}>Play</button>
        <button onClick={this.pauseGame}>Pause</button>
      </div>
    );
  }
}
