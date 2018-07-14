class Maze {
  constructor(maze) {
    this.id = maze.id
    this.characters = maze.characters // from the has_many relationships that Maze has
    this.hayPatches = maze.hay_patches // from the has_many relationships that Maze has
    this.size = maze.size
    this.initialRow = maze.initial_row
    this.initialCol = maze.initial_col
    this.finishRow = maze.maze_finish_row
    this.finishCol = maze.maze_finish_col
  }

  getElementAt(row, col) {
    return document.querySelector(`[data-row='${row}'][data-col='${col}']`)
  }

  randomEmptyPosition() {
    let potentialRow
    let potentialCol
    do {
      potentialRow = Math.floor(Math.random()*this.size)
      potentialCol = Math.floor(Math.random()*this.size)
    }
    while ( this.getElementAt(potentialRow, potentialCol).children.length !== 0 )
    return {row: potentialRow, col: potentialCol}
  }

  getElementAt(row, col) {
    return document.querySelector(`[data-row='${row}'][data-col='${col}']`)
  }

  nothingExistsAt(inputCoordinate) {
    try {
      return (this.getElementAt(inputCoordinate.row, inputCoordinate.col).children.length === 0) || (inputCoordinate.row === this.finishRow && inputCoordinate.col === this.finishCol)
    } catch(err) {
    }
  }

  staysInMaze(inputCoordinate) {
    return ((inputCoordinate.row >= 0) && (inputCoordinate.row < this.size)
    && (inputCoordinate.col >= 0) && (inputCoordinate.col < this.size))
  }
}
