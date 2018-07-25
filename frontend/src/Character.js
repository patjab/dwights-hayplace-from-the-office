const Character = (function() {

  let id = 0

  return class {
    constructor(character) {
      this.name = character.name
      this.maze = character.maze

      const randomPosition = this.maze.randomEmptyPosition()
      this.currentCoordinateRow = randomPosition.row
      this.currentCoordinateCol = randomPosition.col

      this.kevinImg = document.createElement("IMG")
      this.kevinImg.src = `./media/${this.name}.jpg`
      this.kevinImg.style.width = "50%"
      this.kevinImg.style.height = "50%"

      this.id = ++id
    }

    decideWhereToMove() {
      let coordinate = this.getPossibleSpot()
      if (this.maze.nothingExistsAt(coordinate) && this.maze.staysInMaze(coordinate)) {
        this.currentCoordinateRow = coordinate.row
        this.currentCoordinateCol = coordinate.col
      }
    }

    getPossibleSpot() {
      let coordinate;
      if ( Math.floor(Math.random()*2) == 0 ) {
        coordinate = {
          row: this.currentCoordinateRow + Math.floor(Math.random()*3)-1,
          col: this.currentCoordinateCol }
        } else {
          coordinate = {
            row: this.currentCoordinateRow,
            col: this.currentCoordinateCol + Math.floor(Math.random()*3)-1 }
          }
          return coordinate
    }

    removeCharacterFromOldSpot() {
      const oldPlayerPositionDivEl = document.querySelector(`#${this.name}${this.id}`)
      oldPlayerPositionDivEl ? oldPlayerPositionDivEl.parentNode.removeChild(oldPlayerPositionDivEl) : null
    }

    reappearInNewSpot(interval) {
      const kevinPositionEl = this.maze.getElementAt(this.currentCoordinateRow, this.currentCoordinateCol)
      const divEl = document.createElement("div")
      divEl.id = `${this.name}${this.id}`

      !this.maze.isGameOver() ? divEl.appendChild(this.kevinImg) : clearInterval(interval)
      !this.maze.isGameOver() ? kevinPositionEl.appendChild(divEl) : clearInterval(interval)
    }

    moveAround(speed) {
      const interval = setInterval(() => {
        this.decideWhereToMove()
        this.removeCharacterFromOldSpot()
        this.reappearInNewSpot(interval)
      }, speed)
    }

  }


})()
