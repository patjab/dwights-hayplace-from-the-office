class Character {
  constructor(character) {
    this.maze = character.maze // from the belongs_to relationship Character has

    // Initialized randomly, not from database
    const randomPosition = this.maze.randomEmptyPosition()
    this.currentCoordinateRow = randomPosition.row
    this.currentCoordinateCol = randomPosition.col
  }

  move() {

    let coordinate;
    if ( Math.floor(Math.random()*2) == 0 ) {
      coordinate = {row: this.currentCoordinateRow + Math.floor(Math.random()*3)-1,
        col: this.currentCoordinateCol}
    } else {
      coordinate = {row: this.currentCoordinateRow,
        col: this.currentCoordinateCol + Math.floor(Math.random()*3)-1}
    }

    if (this.maze.nothingExistsAt(coordinate) && this.maze.staysInMaze(coordinate)) {
        const oldPlayerPositionDivEl = document.querySelector("#kevin")
        oldPlayerPositionDivEl.parentNode.removeChild(oldPlayerPositionDivEl)

        this.currentCoordinateRow = coordinate.row
        this.currentCoordinateCol = coordinate.col

        this.rerenderCharacter()
      }
  }

  rerenderCharacter() {
    const kevinPositionEl = this.maze.getElementAt(this.currentCoordinateRow, this.currentCoordinateCol)

    const divEl = document.createElement("div")
    divEl.setAttribute("id", "kevin")

    const kevinImg = document.createElement("IMG");
    kevinImg.setAttribute("src", "./media/kevin.jpg");
    kevinImg.setAttribute("width", "60%");
    kevinImg.setAttribute("height", "60%");

    divEl.appendChild(kevinImg)
    kevinPositionEl.appendChild(divEl)
  }
}
