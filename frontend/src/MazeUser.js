class MazeUser {
  constructor(mazeUser) {
    this.id = mazeUser.id
    this.playersCurrentRow = mazeUser.players_current_row
    this.playersCurrentCol = mazeUser.players_current_col
    this.finished_time = mazeUser.finished_time
    this.user = mazeUser.user
    this.maze = mazeUser.maze
  }

  getElementAt(row, col) {
    return document.querySelector(`[data-row='${row}'][data-col='${col}']`)
  }

  renderPlayer() {
    const playerEl = this.getElementAt(this.playersCurrentRow, this.playersCurrentCol)
    const playerDivEl = document.createElement("div")
    playerDivEl.setAttribute("id", "player")

    const dwightPlayer = document.createElement("IMG");
    dwightPlayer.setAttribute("src", "./media/dwight.jpg");
    dwightPlayer.setAttribute("width", "70%");
    dwightPlayer.setAttribute("height", "70%");
    playerDivEl.append(dwightPlayer)
    playerEl.append(playerDivEl)
  }

  renderExit() {
    console.log("MAZE:", this.maze)

    // REFACTOR LATER
    const finishEl = this.getElementAt(this.maze.maze_finish_row, this.maze.maze_finish_col)

    const dundieImgEl = document.createElement("IMG");
    dundieImgEl.setAttribute("id", "dundie");
    dundieImgEl.setAttribute("src", "./media/dundie.jpg");
    dundieImgEl.setAttribute("width", "80%");
    dundieImgEl.setAttribute("height", "80%");
    finishEl.append(dundieImgEl)
  }

  renderMaze() {
    HayPatchController.renderHayPatches(this.maze)

    this.renderPlayer()
    this.renderExit()
  }

  nothingExistsAt(inputCoordinate) {
    try {
      return (this.getElementAt(inputCoordinate.row, inputCoordinate.col).children.length === 0) || (inputCoordinate.row === this.maze.maze_finish_row && inputCoordinate.col === this.maze.maze_finish_col)
    } catch(err) {
    }
  }

  staysInMaze(inputCoordinate) {
    return ((inputCoordinate.row >= 0) && (inputCoordinate.row < this.maze.size)
    && (inputCoordinate.col >= 0) && (inputCoordinate.col < this.maze.size))
  }

  playerFinish(startTime) {
    if ((this.playersCurrentRow===this.maze.maze_finish_row) && (this.playersCurrentCol===this.maze.maze_finish_col)) {
      const endTime = Date.now()
      const duration = Math.floor((endTime - startTime)/1000)
      const adapter = new Adapter()
      adapter.createTime(this.id, duration)

      document.body.style['background-image'] = 'url("./media/dwightPortrait.jpg")'
      document.body.style['background-repeat'] = 'no-repeat'
      document.body.style['background-size'] = 'cover'
      const timerEl = document.querySelector('.timer')
      timerEl.remove()

      document.querySelector('.grid-container').innerHTML = `<h1 class='winner-font'>I am your Hay King. Accomplished in ${duration}s</h1>`
      const grid = document.querySelector('.grid-container')
      grid.classList.toggle('grid-container')

      const audioEl = document.querySelector('audio')
      audioEl.parentNode.removeChild(audioEl)
      const soundEl = document.createElement("audio")
      soundEl.src = "./media/hayking.mp3"
      document.body.appendChild(soundEl)
      soundEl.play()

    }
  }
}
