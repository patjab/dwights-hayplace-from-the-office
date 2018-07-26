class MazeController {
  constructor(gridContainerEl) {
    this.gridContainerEl = gridContainerEl
    this.adapter = new Adapter()
  }

  renderMaze(size) {
    const idiotSoundEl = document.createElement("audio")
    idiotSoundEl.setAttribute("id", "idiotSoundEl")
    idiotSoundEl.src = "./media/idiot.mp3"
    document.head.appendChild(idiotSoundEl)

    const kevinsChiliSoundEl = document.createElement("audio")
    kevinsChiliSoundEl.setAttribute("id", "famousChiliSoundEl")
    kevinsChiliSoundEl.src = "./media/kevinsFamousChili.mp3"
    document.head.appendChild(kevinsChiliSoundEl)

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

  renderHighScore(currentMaze) {
    // Before installing event removers
    let inHighScore = false

    const mazeId = currentMaze.id
    const mazeName = currentMaze.difficulty

    const resultsContainerEl = document.createElement('DIV')
    document.body.appendChild(resultsContainerEl)
    resultsContainerEl.setAttribute("id", "letterheadContainerDiv")

    const winnerDivEl = document.querySelector("#winnerDiv")

    winnerDivEl.appendChild(document.createElement("BR"))

    document.addEventListener('keydown', (e) => {
      if ( e.key === 'Enter' && !inHighScore) {
        inHighScore = true
        document.body.style['background-image'] = 'url("./media/hayBackground.jpg")'

        // THIS IS NOT DYNAMIC
        winnerDivEl.parentNode.removeChild(winnerDivEl)

        this.adapter.getMazeUsers().then(data => {
          return data.filter(mazeUser => {
            return (mazeUser.finished_time !== null) && (mazeUser.maze.id === mazeId)
          }).sort((x, y) => {
            return x.finished_time - y.finished_time
          })
        })
        .then(mazeUsers => {
          while ( resultsContainerEl.firstChild ) { resultsContainerEl.removeChild(resultsContainerEl.firstChild) }
          const currentDate = new Date()
          const formattedDate = currentDate.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

          const dunderMifflinLogoDivEl = document.createElement("DIV")
          dunderMifflinLogoDivEl.setAttribute("id", "dunderMifflinLogoDiv")

          const dunderMifflinLogoImgEl = document.createElement("IMG")
          dunderMifflinLogoImgEl.setAttribute("id", "dunderMifflinLogo")
          dunderMifflinLogoImgEl.setAttribute("src", "./media/dunderMifflinLogo.jpg")

          const letterheadHeaderDivEl = document.createElement("DIV")
          letterheadHeaderDivEl.setAttribute("id", "letterheadHeader")

          const letterheadGreetingDivEl = document.createElement("DIV")
          letterheadGreetingDivEl.setAttribute("id", "letterheadGreeting")

          const roasterOfHighScoresDivEl = document.createElement("DIV")
          roasterOfHighScoresDivEl.setAttribute("id", "highScoreRoaster")

          const letterheadEndingDivEl = document.createElement("DIV")
          letterheadEndingDivEl.setAttribute("id", "letterheadEnding")

          const mazeNameEl = document.createElement("SPAN")
          mazeNameEl.style['font-weight'] = "bold"
          mazeNameEl.appendChild(document.createTextNode(mazeName))

          const toTheEl = document.createElement("SPAN")
          toTheEl.style['text-decoration'] = "line-through"
          toTheEl.appendChild(document.createTextNode("to the"))

          const toTheEl2 = document.createElement("SPAN")
          toTheEl2.style['text-decoration'] = "line-through"
          toTheEl2.appendChild(document.createTextNode("to the"))

          dunderMifflinLogoDivEl.appendChild(document.createElement("BR"))
          dunderMifflinLogoDivEl.appendChild(dunderMifflinLogoImgEl)

          letterheadHeaderDivEl.appendChild(document.createElement("BR"))
          letterheadHeaderDivEl.appendChild(document.createTextNode("Dwight K. Schrute"))
          letterheadHeaderDivEl.appendChild(document.createElement("BR"))
          letterheadHeaderDivEl.appendChild(document.createTextNode("Assistant "))
          letterheadHeaderDivEl.appendChild(toTheEl)
          letterheadHeaderDivEl.appendChild(document.createTextNode((" Regional Manager")))
          letterheadHeaderDivEl.appendChild(document.createElement("BR"))
          letterheadHeaderDivEl.appendChild(document.createTextNode("1725 Slough Avenue"))
          letterheadHeaderDivEl.appendChild(document.createElement("BR"))
          letterheadHeaderDivEl.appendChild(document.createTextNode("Scranton, PA 18505-7427"))
          letterheadHeaderDivEl.appendChild(document.createElement("BR"))
          letterheadHeaderDivEl.appendChild(document.createElement("BR"))
          letterheadHeaderDivEl.appendChild(document.createTextNode(formattedDate))
          letterheadHeaderDivEl.appendChild(document.createElement("BR"))

          letterheadGreetingDivEl.appendChild(document.createElement("BR"))
          letterheadGreetingDivEl.appendChild(document.createElement("BR"))
          letterheadGreetingDivEl.appendChild(document.createElement("BR"))
          letterheadGreetingDivEl.appendChild(document.createTextNode("To Whom It May Concern: "))
          letterheadGreetingDivEl.appendChild(document.createElement("BR"))
          letterheadGreetingDivEl.appendChild(document.createElement("BR"))
          letterheadGreetingDivEl.appendChild(document.createTextNode("I am pleased to announce that the following people have completed "))
          letterheadGreetingDivEl.appendChild(mazeNameEl)
          letterheadGreetingDivEl.appendChild(document.createTextNode(" in record time:"))
          letterheadGreetingDivEl.appendChild(document.createElement("BR"))
          letterheadGreetingDivEl.appendChild(document.createElement("BR"))

          mazeUsers.forEach((mazeUser, index) => {
            if (index < 7) {
              const userScoreText = document.createTextNode(`${mazeUser.user.username} (${mazeUser.finished_time} seconds)`)
              roasterOfHighScoresDivEl.appendChild(userScoreText)
              roasterOfHighScoresDivEl.appendChild(document.createElement("BR"))
            }
          })

          letterheadEndingDivEl.appendChild(document.createElement("BR"))
          letterheadEndingDivEl.appendChild(document.createElement("BR"))
          letterheadEndingDivEl.appendChild(document.createElement("BR"))
          letterheadEndingDivEl.appendChild(document.createTextNode("Sincerely,"))
          letterheadEndingDivEl.appendChild(document.createElement("BR"))
          letterheadEndingDivEl.appendChild(document.createElement("BR"))
          letterheadEndingDivEl.appendChild(document.createElement("BR"))
          letterheadEndingDivEl.appendChild(document.createTextNode("Dwight K. Schrute"))
          letterheadEndingDivEl.appendChild(document.createElement("BR"))
          letterheadEndingDivEl.appendChild(document.createTextNode("Assistant "))
          letterheadEndingDivEl.appendChild(toTheEl2)
          letterheadEndingDivEl.appendChild(document.createTextNode((" Regional Manager")))
          letterheadEndingDivEl.appendChild(document.createElement("BR"))
          letterheadEndingDivEl.appendChild(document.createElement("BR"))
          letterheadEndingDivEl.appendChild(document.createElement("BR"))

          resultsContainerEl.appendChild(dunderMifflinLogoDivEl)
          resultsContainerEl.appendChild(letterheadHeaderDivEl)
          resultsContainerEl.appendChild(letterheadGreetingDivEl)
          resultsContainerEl.appendChild(roasterOfHighScoresDivEl)
          resultsContainerEl.appendChild(letterheadEndingDivEl)
        })
      }
    })
  }

  renderLoserScreen() {
    while (document.body.firstChild) { document.body.removeChild(document.body.firstChild) }

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
    document.body.appendChild(videoEl)
  }

  renderMazesForm(data) {
    const mazeListDivEl = document.createElement("div")
    mazeListDivEl.setAttribute("id", "mazeListDiv")

    const instructionsTextDiv = document.createElement("div")
    const instructionsText = document.createTextNode("Select a level using ← and → keys")
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
