class MazeController {
  constructor(gridContainerEl) {
    this.gridContainerEl = gridContainerEl
    this.adapter = new Adapter()
  }

  renderMaze(size) {
    this.gridContainerEl.style['grid-template-columns'] = `repeat(${size}, ${100/(size+2)}vw)`
    this.gridContainerEl.style['grid-template-rows'] = `repeat(${size}, ${100/(size+2)}vh)`

    for ( let row = 0; row < size; row++ ) {
      for ( let col = 0; col < size; col++ ) {
        const divSpotEl = document.createElement("div")
        divSpotEl.setAttribute("class", "grid-item")
        divSpotEl.setAttribute("data-row", row)
        divSpotEl.setAttribute("data-col", col)
        this.gridContainerEl.appendChild(divSpotEl)
      }
    }
  }

  renderHighScore(mazeId) {
    const containerEl = document.querySelector('div')
    const highScoreButtonEl = document.createElement("button")
    highScoreButtonEl.innerHTML = "High Scores"
    containerEl.appendChild(highScoreButtonEl)

    highScoreButtonEl.addEventListener('click', () => {
      this.adapter.getMazeUsers().then(data => {
        return data.filter(mazeUser => {
          return (mazeUser.finished_time !== null) && (mazeUser.maze.id === mazeId)
        }).sort((x, y) => {
          return x.finished_time - y.finished_time
        })
      })
      .then(mazeUsers => {
        document.body.innerHTML = "<h1>High Scores</h1>"

        mazeUsers.forEach((mazeUser) => {
          document.body.innerHTML += mazeUser.user.username + " - " + mazeUser.finished_time + " seconds<br/>"
        })
      })
    })
  }

  renderLoserScreen() {
    const timerEl = document.querySelector('.timer')
    timerEl.parentNode.removeChild(timerEl)

    this.gridContainerEl.innerHTML = ""
    const videoEl = document.createElement("video")
    videoEl.setAttribute("width", "auto")
    videoEl.setAttribute("height", "auto")
    videoEl.setAttribute("id", "loserVideo")
    videoEl.setAttribute("autoplay", "true")

    const sourceEl = document.createElement("source")
    sourceEl.setAttribute("src", "media/loser.mp4")
    sourceEl.setAttribute("id", "loserVideoSrc")
    sourceEl.setAttribute("type", "video/mp4")
    videoEl.appendChild(sourceEl)
    this.gridContainerEl.appendChild(videoEl)
  }

  renderMazesForm(data) {
    const mazeListDivEl = document.createElement("div")
    mazeListDivEl.setAttribute("id", "mazeListDiv")

    const instructionsTextDiv = document.createElement("div")
    const instructionsText = document.createTextNode("Select a level using your keyboard")
    instructionsTextDiv.setAttribute("id", "instructions")
    instructionsTextDiv.appendChild(instructionsText)
    instructionsTextDiv.appendChild(document.createElement("BR"))
    instructionsTextDiv.appendChild(document.createElement("BR"))
    mazeListDivEl.appendChild(instructionsTextDiv)


    let imgIndex = 0
    let numberOfMazes = 0

    data.forEach((maze) => {
      const imgBaseURL = maze.image_url
      const difficulty = maze.difficulty

      if ( imgBaseURL !== null ) {
        let currentImgIndex = imgIndex++
        const mazeDivEl = document.createElement("div")
        mazeDivEl.classList += ' selectionDiv container'

        const imageTextDiv = document.createElement("div")
        const imageText = document.createTextNode(maze.difficulty)
        imageTextDiv.classList += ' centered'
        imageTextDiv.classList += ' startImage'
        currentImgIndex !== 0 ? imageTextDiv.style.color = '#444444' : null
        imageTextDiv.appendChild(imageText)
        imageTextDiv.setAttribute("data-text-index", currentImgIndex)

        const mazeImgDivEl = document.createElement("img")
        mazeImgDivEl.src = imgBaseURL + 'BW.jpg'
        mazeImgDivEl.classList += ' selectionImage'
        mazeImgDivEl.setAttribute("data-img-index", currentImgIndex)
        mazeImgDivEl.setAttribute("data-maze-id", maze.id)

        mazeDivEl.appendChild(mazeImgDivEl)
        mazeDivEl.appendChild(imageTextDiv)
        mazeListDivEl.appendChild(mazeDivEl)
        numberOfMazes++
      }

    })
    this.gridContainerEl.appendChild(mazeListDivEl)

    return numberOfMazes
  }
}
