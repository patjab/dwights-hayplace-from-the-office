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
      return this.getElementAt(inputCoordinate.row, inputCoordinate.col).children.length === 0
    } catch(err) {}
  }

  dundieExistsAt(inputCoordinate) {
    return inputCoordinate.row === this.maze.maze_finish_row && inputCoordinate.col === this.maze.maze_finish_col
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
    while (document.body.firstChild) {document.body.removeChild(document.body.firstChild)}

    document.body.style['background-image'] = 'url("./media/hayBackground.jpg")'
    document.body.style['background-repeat'] = 'repeat'
    document.body.style['background-size'] = 'auto'

    const winnerDivEl = document.createElement("DIV")
    winnerDivEl.setAttribute("id", "winnerDiv")

    const dwightPortraitImgEl = document.createElement("IMG")
    dwightPortraitImgEl.src = './media/dwightPortrait.jpg'
    dwightPortraitImgEl.setAttribute("id", "dwightPortrait")

    winnerDivEl.appendChild(dwightPortraitImgEl)
    winnerDivEl.appendChild(document.createElement("BR"))
    winnerDivEl.appendChild(document.createTextNode(this.user.username))
    winnerDivEl.appendChild(document.createTextNode(" is your Hay King."))
    winnerDivEl.appendChild(document.createElement("BR"))
    winnerDivEl.appendChild(document.createTextNode("Accomplished in "))
    winnerDivEl.appendChild(document.createTextNode(this.finished_time))
    winnerDivEl.appendChild(document.createTextNode("s."))
    winnerDivEl.appendChild(document.createElement("BR"))
    winnerDivEl.appendChild(document.createElement("BR"))
    winnerDivEl.appendChild(document.createTextNode("Press [ENTER] for high scores"))

    document.body.appendChild(winnerDivEl)
  }

  renderWinningAudio() {
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
      const mazeController = new MazeController(document.querySelector('#winnerDiv'))
      mazeController.renderHighScore(this.maze)
    }
  }

  translateKeyEventIntoCoordinate(e) {
    e.preventDefault()
    let coordinate = {row: this.playersCurrentRow, col: this.playersCurrentCol};
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
    if ( (this.nothingExistsAt(coordinate) || this.dundieExistsAt(coordinate)) && this.staysInMaze(coordinate) && document.querySelector("#idiotSoundEl")) {
      const oldPlayerPositionDivEl = document.querySelector("#player")
      oldPlayerPositionDivEl.parentNode.removeChild(oldPlayerPositionDivEl)

      this.playersCurrentRow = coordinate.row
      this.playersCurrentCol = coordinate.col

      this.renderPlayer()
      this.playerFinish()
    } else if (document.querySelector("#idiotSoundEl")) {
      document.querySelector("#idiotSoundEl").play()
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
    const timerRefreshInterval = 250
    const timerInterval = setInterval(() => {
      // console.log("Timer Interval Still Going")
      const currentTimeLeft = Math.floor((timeAllowed-(Date.now()-this.startTime))/1000)
      if (currentTimeLeft >= 2) {
        timerEl.innerHTML = `<h1 class='time-font'>${currentTimeLeft} seconds remain</h1>`
      } else if (currentTimeLeft === 1 ){
        timerEl.innerHTML = `<h1 class='time-font'>${currentTimeLeft} second remains</h1>`
      }
    }, timerRefreshInterval)
    setTimeout(()=>clearInterval(timerInterval), timeAllowed+1)
  }
}
