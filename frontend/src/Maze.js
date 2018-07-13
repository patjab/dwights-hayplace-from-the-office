class Maze {
  constructor(maze) {
    this.id = maze.id
    this.characters = maze.characters // from the has_many relationships that Maze has
    this.hayPatches = maze.hay_patches // from the has_many relationships that Maze has
    this.size = maze.size
    this.initialRow = maze.initial_row
    this.initialCol = maze.initial_col
    // this.playersCurrentRow = maze.players_current_row
    // this.playersCurrentCol = maze.players_current_col
    this.finishRow = maze.maze_finish_row
    this.finishCol = maze.maze_finish_col
    // this.finished_time = maze.finished_time
  }

  getElementAt(row, col) {
    return document.querySelector(`[data-row='${row}'][data-col='${col}']`)
  }

  // renderMaze() {
  //   HayPatchController.renderHayPatches(this)
  //   this.renderPlayer()
  //   this.renderExit()
  // }

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

  // renderPlayer() {
  //   const playerEl = this.getElementAt(this.initialRow, this.initialCol)
  //   const playerDivEl = document.createElement("div")
  //   playerDivEl.setAttribute("id", "player")
  //
  //   const dwightPlayer = document.createElement("IMG");
  //   dwightPlayer.setAttribute("src", "./media/dwight.jpg");
  //   dwightPlayer.setAttribute("width", "70");
  //   dwightPlayer.setAttribute("height", "70");
  //   playerDivEl.append(dwightPlayer)
  //   console.log(playerEl)
  //   playerEl.append(playerDivEl)
  // }

  // renderExit() {
  //   const finishEl = this.getElementAt(this.finishRow, this.finishCol)
  //
  //   const dundieImgEl = document.createElement("IMG");
  //   dundieImgEl.setAttribute("id", "dundie");
  //   dundieImgEl.setAttribute("src", "./media/dundie.jpg");
  //   dundieImgEl.setAttribute("width", "100");
  //   dundieImgEl.setAttribute("height", "100");
  //   finishEl.append(dundieImgEl)
  // }

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
  //
  // playerFinish(startTime) {
  //   if ((this.playersCurrentRow===this.finishRow) && (this.playersCurrentCol===this.finishCol)) {
  //     const endTime = Date.now()
  //     const duration = Math.floor((endTime - startTime)/1000)
  //
  //     adapter.createTime(this.id, duration)
  //
  //     document.body.style['background-image'] = 'url("./media/dwightPortrait.jpg")'
  //     document.body.style['background-repeat'] = 'no-repeat'
  //     document.body.style['background-size'] = 'cover'
  //     const timerEl = document.querySelector('.timer')
  //     timerEl.remove()
  //     document.querySelector('.grid-container').innerHTML = `<h1>Hay King in ${duration} seconds</h1>`
  //
  //     const audioEl = document.querySelector('audio')
  //     audioEl.parentNode.removeChild(audioEl)
  //     const soundEl = document.createElement("audio")
  //     soundEl.src = "./media/hayking.mp3"
  //     document.body.appendChild(soundEl)
  //     soundEl.play()
  //
  //   }
  // }
}
