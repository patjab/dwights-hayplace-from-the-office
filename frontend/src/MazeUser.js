class MazeUser {
  constructor(mazeUser, currentMaze) {
    this.id = mazeUser.id
    this.playersCurrentRow = mazeUser.players_current_row
    this.playersCurrentCol = mazeUser.players_current_col
    this.finished_time = mazeUser.finished_time
    this.user = mazeUser.user
    this.maze = currentMaze
    this.startTime = Date.now()
    this.ableToMove = true
    this.moveHistory = []
    this.confused = false
  }

  makeConfused() {
    this.confused = true
  }

  notConfused() {
    this.confused = false
  }

  disableMove() {
    this.ableToMove = false
  }

  enableMove() {
    this.ableToMove = true
  }

  isMoveEnabled() {
    return this.ableToMove
  }

  putMoveInHistory(coordinate) {
    const coordinateIncluded = this.moveHistory.find(coor => (coor.row === coordinate.row) && (coor.col === coordinate.col))
    if ( !coordinateIncluded ) {
      this.moveHistory.unshift(coordinate)
    } else {
      while ( this.moveHistory.find(coor => (coor.row === coordinate.row) && (coor.col === coordinate.col)) ) { this.popFromMoveHistory() }
    }
  }

  popFromMoveHistory() {
    const lastSpot = this.moveHistory[0]
    this.moveHistory.shift()
    return lastSpot
  }

  getMoveHistory() {
    return this.moveHistory
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
    const finishEl = this.getElementAt(this.maze.finishRow, this.maze.finishCol)
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
    return inputCoordinate.row === this.maze.finishRow && inputCoordinate.col === this.maze.finishCol
  }


  staysInMaze(inputCoordinate) {
    return ((inputCoordinate.row >= 0) && (inputCoordinate.row < this.maze.size)
    && (inputCoordinate.col >= 0) && (inputCoordinate.col < this.maze.size))
  }

  finishedPosition() {
    return (this.playersCurrentRow===this.maze.finishRow) && (this.playersCurrentCol===this.maze.finishCol)
  }

  timeLeft() {
    return Math.floor((Date.now() - this.startTime)/1000)
  }

  stopTheClock() {
    this.finished_time = this.timeLeft()
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
      this.cleanUpAllMazeIntervals()
      this.renderWinningScreen()
      this.renderWinningAudio()
      const mazeController = new MazeController(document.querySelector('#winnerDiv'))
      mazeController.renderHighScore(this.maze)
    }
  }

  cleanUpAllMazeIntervals() {
    this.maze.getCharacters().forEach(character => character.cleanUpAllIntervals())
    clearInterval(this.timerInterval)
  }

  translateKeyEventIntoCoordinate(e) {
    e.preventDefault()
    let coordinate = {row: this.playersCurrentRow, col: this.playersCurrentCol};

    if ( this.isMoveEnabled() ) {
      if ( (e.key === "ArrowLeft" && !this.confused) || (e.key === "ArrowRight" && this.confused) ) {
        coordinate = {row: this.playersCurrentRow, col: this.playersCurrentCol-1}
      } else if ( (e.key === "ArrowRight" && !this.confused) || (e.key === "ArrowLeft" && this.confused) ) {
        coordinate = {row: this.playersCurrentRow, col: this.playersCurrentCol+1}
      } else if ( (e.key === "ArrowUp" && !this.confused) || (e.key === "ArrowDown" && this.confused) ) {
        coordinate = {row: this.playersCurrentRow-1, col: this.playersCurrentCol}
      } else if ( (e.key === "ArrowDown" && !this.confused) || (e.key === "ArrowUp" && this.confused) ) {
        coordinate = {row: this.playersCurrentRow+1, col: this.playersCurrentCol}
      }
    }

    return coordinate
  }

  attemptMove(coordinate, log=true) {
    if ( (this.nothingExistsAt(coordinate) || this.dundieExistsAt(coordinate)) && this.staysInMaze(coordinate) && !this.maze.isGameOver() ) {
      const oldPlayerPositionDivEl = document.querySelector("#player")
      oldPlayerPositionDivEl.parentNode.removeChild(oldPlayerPositionDivEl)

      log ? this.putMoveInHistory({row: this.playersCurrentRow, col: this.playersCurrentCol}) : null

      this.playersCurrentRow = coordinate.row
      this.playersCurrentCol = coordinate.col

      this.renderPlayer()
      this.playerFinish()
      return true
    } else if (!this.maze.isGameOver()) {
      document.querySelector("#idiotSoundEl").play()
      return false
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
        this.cleanUpAllMazeIntervals()
        mazeController.renderLoserScreen()
      }
    }, timeAllowed)
  }

  asyncTimer(timeAllowed) {
    const timerEl = document.querySelector(".timer")
    const timerRefreshInterval = 250
    const beginFlashingTime = 11000
    let flashingInterval

    this.timerInterval = setInterval(() => {
      const currentTimeLeft = Math.floor((timeAllowed-(Date.now()-this.startTime))/1000)
      if (currentTimeLeft < beginFlashingTime/1000) {
        timerEl.classList += ' shake'
        let i = 0
        flashingInterval = setInterval(() => {
          timerEl.style['background-color'] = (++i % 2 === 0 ? '#FFD700' : 'red')
        }, 100)
      }
      if (currentTimeLeft >= 2) {
        timerEl.innerHTML = `<h1 class='time-font'>${currentTimeLeft} seconds remain</h1>`
      } else if (currentTimeLeft === 1 ){
        timerEl.innerHTML = `<h1 class='time-font'>${currentTimeLeft} second remains</h1>`
      }
    }, timerRefreshInterval)
    setTimeout(()=>clearInterval(flashingInterval), timeAllowed)
  }
}
