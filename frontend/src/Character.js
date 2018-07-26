const Character = (function() {

  let id = 0

  return class {
    constructor(character, maze) {
      this.name = character.name
      this.maze = character.maze

      const randomPosition = this.maze.randomEmptyPosition()
      this.currentCoordinateRow = randomPosition.row
      this.currentCoordinateCol = randomPosition.col

      this.kevinImg = document.createElement("IMG")
      this.kevinImg.src = `./media/${this.name}.jpg`
      this.kevinImg.style.width = "50%"
      this.kevinImg.style.height = "50%"

      this.moveAroundInterval
      this.abilitiesInterval = []

      this.maze.addCharacter(this)

      this.id = ++id
    }

    moveAround(speed) {
      this.moveAroundInterval = setInterval(() => {
        this.decideWhereToMove()
        this.removeCharacterFromOldSpot()
        this.reappearInNewSpot(this.moveAroundInterval)
      }, speed)
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

      !this.maze.isGameOver() ? divEl.appendChild(this.kevinImg) : null
      !this.maze.isGameOver() ? kevinPositionEl.appendChild(divEl) : null
    }

    getAllIntervals() {
      return [this.moveAroundInterval, ...this.abilitiesInterval]
    }

    cleanUpAllIntervals() {
      this.getAllIntervals().forEach(interval => clearInterval(interval))
      this.moveAroundInterval = undefined
      this.abilitiesInterval = []
    }
  }
})()
