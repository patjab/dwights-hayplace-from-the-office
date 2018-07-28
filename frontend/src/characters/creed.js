class Creed extends Character {
  moveAround(speed) {
    this.moveAroundInterval = setInterval(() => {
      this.confuseDwight()
      this.decideWhereToMove()
      this.removeCharacterFromOldSpot()
      this.reappearInNewSpot(this.moveAroundInterval)
    }, speed)
  }

  isNextToDwight() {
    const cRow = this.currentCoordinateRow
    const cCol = this.currentCoordinateCol
    const dRow = this.mazeUser.playersCurrentRow
    const dCol = this.mazeUser.playersCurrentCol
    return ((cRow-1 === dRow || cRow+1 === dRow) && cCol === dCol) || (cRow === dRow && (cCol-1 === dCol || cCol+1 === dCol))
  }

  confuseDwight() {
    if ( this.isNextToDwight() ) {
      this.mazeUser.makeConfused()
      document.querySelector('.timer').style['background-color'] = 'purple'
      setTimeout(() => {
        document.querySelector('.timer').style['background-color'] = 'orange'
        this.mazeUser.notConfused()
      }, 10000)
    }
  }
}
