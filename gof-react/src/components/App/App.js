import React, { Component, Fragment } from 'react';
import Grid from 'components/Grid';
import { createGrid, cloneArray } from 'helpers';

export class App extends Component {
  rows = 10;
  timeout = 500;

  state = {
    isisPlaying: false,
    simulationComplete: false,
    generationCount: 0,
    intervalId: 0,
    grid: createGrid(this.rows),
    aliveCells: [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 3],
      [2, 1],
      [2, 2],
      // New data
    ],
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

  getNeighbors = (x, y) => [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ];

  validateNeighbors = neighbors =>
    neighbors.filter(
      coord => !(coord.includes(-1) || coord.includes(this.rows))
    );

  countAliveCells = neighbors =>
    neighbors.filter(([x, y]) => this.state.grid[x][y]).length;

  shouldToggleCell = ({ totalAliveNeighbors, x, y }) => {
    const cell = this.state.grid[x][y];

    if (
      (cell && (totalAliveNeighbors < 2 || totalAliveNeighbors > 3)) ||
      (!cell && totalAliveNeighbors === 3)
    ) {
      return true;
    }

    return false;
  };

  scanGrid = () => {
    const newGrid = cloneArray(this.state.grid);
    let shouldGridChange = false;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.rows; j++) {
        const neighbors = this.getNeighbors(i, j);
        const validNeighbors = this.validateNeighbors(neighbors);
        const totalAliveNeighbors = this.countAliveCells(validNeighbors);

        if (this.shouldToggleCell({ totalAliveNeighbors, x: i, y: j })) {
          shouldGridChange = true;
          newGrid[i][j] = !newGrid[i][j];
        }
      }
    }

    // Should we continue playing?
    if (shouldGridChange) {
      this.updateGrid(newGrid);
    } else {
      this.endGame(this.state.intervalId);
    }
  };

  startGame = () => {
    const intervalId = setInterval(this.scanGrid, this.timeout);

    this.setState({
      intervalId,
      isPlaying: true,
    });
  };

  endGame = intervalId => {
    clearInterval(intervalId);
    this.setState({
      isPlaying: false,
      simulationComplete: true,
    });
  };

  updateGrid = newGrid => {
    this.setState(prevState => ({
      generationCount: prevState.generationCount + 1,
      grid: newGrid,
    }));
  };

  render() {
    /* eslint-disable indent */
    const { isPlaying, simulationComplete } = this.state;

    return (
      <div className="wrapper">
        <h1>Generations: {this.state.generationCount}</h1>
        <Grid grid={this.state.grid} />
        <button
          className="btn"
          disabled={isPlaying || simulationComplete}
          onClick={isPlaying ? () => {} : this.startGame}
        >
          {simulationComplete && <Fragment>Simulation completed</Fragment>}
          {!simulationComplete && isPlaying && <Fragment>Simulating</Fragment>}
          {!simulationComplete &&
            !isPlaying && <Fragment>Start simulation</Fragment>}
        </button>
      </div>
    );
  }
}
