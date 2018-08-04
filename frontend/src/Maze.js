class Maze {
  constructor(maze) {
    this.id = maze.id
    this.characters = [] //changed from maze.characters which is null NEEDS TO BE REVIEWED
    this.hayPatches = maze.hay_patches
    this.size = maze.size
    this.initialRow = maze.initial_row
    this.initialCol = maze.initial_col
    this.finishRow = maze.maze_finish_row
    this.finishCol = maze.maze_finish_col
    this.finishedRendering = false
  }

  getElementAt(row, col) {
    return document.querySelector(`[data-row='${row}'][data-col='${col}']`)
  }

  isGameOver() {
    return !this.getElementAt(0, 0)
  }

  isFinishedRendering() {
    return this.finishedRendering
  }

  setToFinishedRendering() {
    this.finishedRendering = true
  }

  addCharacter(character) {
    this.characters.push(character)
  }

  getCharacters() {
    return this.characters
  }

  randomEmptyPosition() {
    while ( !this.isFinishedRendering() ) {}

    let potentialRow, potentialCol
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
      return this.getElementAt(inputCoordinate.row, inputCoordinate.col).children.length === 0
    } catch(err) {}
  }

  dundieExistsAt(inputCoordinate) {
    return inputCoordinate.row === this.maze_finish_row && inputCoordinate.col === this.maze_finish_col
  }

  staysInMaze(inputCoordinate) {
    return ((inputCoordinate.row >= 0) && (inputCoordinate.row < this.size)
    && (inputCoordinate.col >= 0) && (inputCoordinate.col < this.size))
  }
}
