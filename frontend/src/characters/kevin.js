class Kevin extends Character {
  spillChili() {
    for ( let i = -2; i <= 2; i++ ) {
      for ( let j = -2; j <= 2; j++ ) {
        if ( !(i === 0 && j === 0) ) {
          const inputCoordinate = {
            row: this.currentCoordinateRow + i,
            col: this.currentCoordinateCol + j
          }

          if (this.mazeUser.maze.nothingExistsAt(inputCoordinate) && !this.mazeUser.maze.dundieExistsAt(inputCoordinate) && this.mazeUser.maze.staysInMaze(inputCoordinate)) {
            const chiliImgEl = document.createElement("IMG")
            chiliImgEl.src = `./media/chili.gif`
            chiliImgEl.style.width = "60%"
            chiliImgEl.style.height = "60%"

            const chiliDivEl = document.createElement("div")
            chiliDivEl.classList += ' chili'

            chiliDivEl.appendChild(chiliImgEl)

            const spaceForChiliEl = this.mazeUser.maze.getElementAt(inputCoordinate.row, inputCoordinate.col)
            spaceForChiliEl.appendChild(chiliDivEl)
          }
        }
      }
    }
    // add 3 sec warning here
    document.querySelector("#famousChiliSoundEl").play()
  }


  cleanupChili() {
    document.querySelectorAll('.chili').forEach(chiliEl => chiliEl.parentNode.removeChild(chiliEl))
  }

  chiliCycle() {
    this.abilitiesInterval.push(setInterval( () => {
      this.spillChili()
      setTimeout(this.cleanupChili, 5000)
    }, 10000 ))
  }
}
