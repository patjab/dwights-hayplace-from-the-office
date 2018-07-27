const Character = (function() {

  let id = 0

  return class {
    constructor(character) {
      this.name = character.name
      this.mazeUser = character.mazeUser

      const randomPosition = this.mazeUser.maze.randomEmptyPosition()
      this.currentCoordinateRow = randomPosition.row
      this.currentCoordinateCol = randomPosition.col

      this.kevinImg = document.createElement("IMG")
      this.kevinImg.src = `./media/${this.name}.jpg`
      this.kevinImg.style.width = "50%"
      this.kevinImg.style.height = "50%"

      this.moveAroundInterval
      this.abilitiesInterval = []

      this.mazeUser.maze.addCharacter(this)

      this.id = ++id
      // this.domId = `${this.name}${this.id}`
    }

    getDOMId() {
      return this.domId
    }

    removeCharacter() {
      const toBeRemoved = this.mazeUser.maze.getElementAt(this.currentCoordinateRow, this.currentCoordinateCol)
      toBeRemoved.removeChild(toBeRemoved.firstChild)
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
      if (this.mazeUser.maze.nothingExistsAt(coordinate) && this.mazeUser.maze.staysInMaze(coordinate)) {
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

    reappearInNewSpot(interval=null) {
      const kevinPositionEl = this.mazeUser.maze.getElementAt(this.currentCoordinateRow, this.currentCoordinateCol)
      const divEl = document.createElement("div")
      divEl.id = `${this.name}${this.id}`

      !this.mazeUser.maze.isGameOver() ? divEl.appendChild(this.kevinImg) : null
      !this.mazeUser.maze.isGameOver() ? kevinPositionEl.appendChild(divEl) : null
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
