class Jim extends Character {
  prankBackToStart() {
    this.mazeUser.disableMove()
    const prankingInterval = setInterval(()=>{
      if (this.mazeUser.getMoveHistory().length > 0) {
        this.pushDwightBackOneSpot(prankingInterval)
      } else {
        this.mazeUser.enableMove()
        this.removeCharacter()
        clearInterval(prankingInterval)
      }
    }, 100)
  }

  pushDwightBackOneSpot(prankingInterval) {
    const beforeDwightRow = this.mazeUser.playersCurrentRow
    const beforeDwightCol = this.mazeUser.playersCurrentCol

    const lastCoordinate = this.mazeUser.popFromMoveHistory()
    const success = this.mazeUser.attemptMove(lastCoordinate, false)
    if (!success) { this.mazeUser.putMoveInHistory(lastCoordinate) }

    this.currentCoordinateRow = beforeDwightRow
    this.currentCoordinateCol = beforeDwightCol
    this.removeCharacterFromOldSpot()
    this.reappearInNewSpot()
  }

  isNextToDwight() {
    const jRow = this.currentCoordinateRow
    const jCol = this.currentCoordinateCol
    const dRow = this.mazeUser.playersCurrentRow
    const dCol = this.mazeUser.playersCurrentCol
    return ((jRow-1 === dRow || jRow+1 === dRow) && jCol === dCol) || (jRow === dRow && (jCol-1 === dCol || jCol+1 === dCol))
  }

  moveAround(speed) {
    this.moveAroundInterval = setInterval(() => {
      this.decideWhereToMove()
      this.removeCharacterFromOldSpot()
      this.reappearInNewSpot(this.moveAroundInterval)

      if (this.isNextToDwight()) {
        this.prankBackToStart()
        clearInterval(this.moveAroundInterval)
      }
    }, speed)
  }
}
