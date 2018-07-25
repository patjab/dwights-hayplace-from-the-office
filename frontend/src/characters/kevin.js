class Kevin extends Character {
  spillChili() {
    for ( let i = -2; i <= 2; i++ ) {
      for ( let j = -2; j <= 2; j++ ) {
        if ( !(i === 0 && j === 0) ) {
          const inputCoordinate = {
            row: this.currentCoordinateRow + i,
            col: this.currentCoordinateCol + j
          }

          if (this.maze.nothingExistsAt(inputCoordinate) && !this.maze.dundieExistsAt(inputCoordinate) && this.maze.staysInMaze(inputCoordinate)) {
            const chiliImgEl = document.createElement("IMG")
            chiliImgEl.src = `./media/chili.gif`
            chiliImgEl.style.width = "60%"
            chiliImgEl.style.height = "60%"

            const chiliDivEl = document.createElement("div")
            chiliDivEl.classList += ' chili'

            chiliDivEl.appendChild(chiliImgEl)

            const spaceForChiliEl = this.maze.getElementAt(inputCoordinate.row, inputCoordinate.col)
            spaceForChiliEl.appendChild(chiliDivEl)
          }
        }
      }
    }
    document.querySelector("#famousChiliSoundEl") ? document.querySelector("#famousChiliSoundEl").play() : null
  }

  cleanupChili() {
    document.querySelectorAll('.chili').forEach(chiliEl => chiliEl.parentNode.removeChild(chiliEl))
  }

}
