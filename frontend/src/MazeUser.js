class MazeUser {
  constructor(mazeUser) {
    this.id = mazeUser.id
    this.playersCurrentRow = mazeUser.players_current_row
    this.playersCurrentCol = mazeUser.players_current_col
    this.finished_time = mazeUser.finished_time
    this.user = mazeUser.user
    this.maze = mazeUser.maze
    this.startTime = Date.now()
  }

  completedMaze() {
    return this.finished_time !== null
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
    } catch(err) {}
  }

  staysInMaze(inputCoordinate) {
    return ((inputCoordinate.row >= 0) && (inputCoordinate.row < this.maze.size)
    && (inputCoordinate.col >= 0) && (inputCoordinate.col < this.maze.size))
  }

  finishedPosition() {
    return (this.playersCurrentRow===this.maze.maze_finish_row) && (this.playersCurrentCol===this.maze.maze_finish_col)
  }

  stopTheClock() {
    this.finished_time = Math.floor((Date.now() - this.startTime)/1000)
    const adapter = new Adapter()
    adapter.createTime(this.id, this.finished_time)
  }

  renderWinningScreen() {
    document.body.style['background-image'] = 'url("./media/dwightPortrait.jpg")'
    document.body.style['background-repeat'] = 'no-repeat'
    document.body.style['background-size'] = 'cover'
    const timerEl = document.querySelector('.timer')
    timerEl.parentNode.removeChild(timerEl)

    document.querySelector('.grid-container').innerHTML = `<h1 class='winner-font'>I am your Hay King. Accomplished in ${this.finished_time}s</h1>`
    const grid = document.querySelector('.grid-container')
    grid.classList.toggle('grid-container')
  }

  renderWinningAudio() {
    const audioEl = document.querySelector('audio')
    audioEl.parentNode.removeChild(audioEl)
    const soundEl = document.createElement("audio")
    soundEl.src = "./media/hayking.mp3"
    document.body.appendChild(soundEl)
    soundEl.play()
  }

  playerFinish() {
    if (this.finishedPosition()) {
      this.stopTheClock()
      this.renderWinningScreen()
      this.renderWinningAudio()
      const mazeController = new MazeController(document.querySelector('.grid-container'))
      mazeController.renderHighScore(this.maze)
    }
  }

  translateKeyEventIntoCoordinate(e) {
    e.preventDefault()
    let coordinate;
    if ( e.key === "ArrowLeft" ) {
      coordinate = {row: this.playersCurrentRow, col: this.playersCurrentCol-1}
    } else if ( e.key === "ArrowRight" ) {
      coordinate = {row: this.playersCurrentRow, col: this.playersCurrentCol+1}
    } else if ( e.key === "ArrowUp" ) {
      coordinate = {row: this.playersCurrentRow-1, col: this.playersCurrentCol}
    } else if ( e.key === "ArrowDown" ) {
      coordinate = {row: this.playersCurrentRow+1, col: this.playersCurrentCol}
    }
    return coordinate
  }

  attemptMove(coordinate) {
    if (this.nothingExistsAt(coordinate) && this.staysInMaze(coordinate)) {
      const oldPlayerPositionDivEl = document.querySelector("#player")
      oldPlayerPositionDivEl.parentNode.removeChild(oldPlayerPositionDivEl)

      this.playersCurrentRow = coordinate.row
      this.playersCurrentCol = coordinate.col

      this.renderPlayer()
      this.playerFinish()
    } else {
      if ( !!document.querySelector("#idiotSoundEl") ) {
        const prevIdiotSoundEl = document.querySelector("#idiotSoundEl")
        prevIdiotSoundEl.parentNode.removeChild(prevIdiotSoundEl)
      }
      const idiotSoundEl = document.createElement("audio")
      idiotSoundEl.setAttribute("id", "idiotSoundEl")
      idiotSoundEl.src = "./media/idiot.mp3"
      document.body.appendChild(idiotSoundEl)
      idiotSoundEl.play()
    }
  }

  move(e) {
    let newCoordinate = this.translateKeyEventIntoCoordinate(e)
    this.attemptMove(newCoordinate)
  }

  asyncCheckLoser(timeAllowed) {
    setTimeout(() => {
      if (!this.completedMaze()) {
        const mazeController = new MazeController(document.querySelector('.grid-container'))
        mazeController.renderLoserScreen()
      }
    }, timeAllowed)
  }

  asyncTimer(timeAllowed) {
    const timerEl = document.querySelector(".timer")
    const timerRefreshInterval = 500
    setInterval(() => {
      if (Math.floor((timeAllowed-(Date.now()-this.startTime))/1000) >= 0) {
        timerEl.innerHTML = `<h1 class='time-font'>${Math.floor((timeAllowed-(Date.now()-this.startTime))/1000)} second remain</h1>`
      }
    }, timerRefreshInterval)
  }
}
