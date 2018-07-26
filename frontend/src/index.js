document.addEventListener('DOMContentLoaded', () => {
  const gridContainerEl = document.querySelector(".grid-container")
  const adapter = new Adapter()
  const userController = new UserController(gridContainerEl)
  const mazeController = new MazeController(gridContainerEl)
  const timeAllowed = 40000
  let currentUser, currentMaze, currentMazeUser

  // Until event removers are installed
  let finishedSelecting = false

  userController.setupVideoSignin()
  const signInFormEl = userController.renderSignInForm()

  signInFormEl.addEventListener('submit', (e) => {
    e.preventDefault()
    const username = e.target.username.value

    if (username !== "") {
      gridContainerEl.removeChild(signInFormEl)

      adapter.createUser({user: {username: username}}).then(data => {
        currentUser = new User(data)

        adapter.getMazes().then(data => {
          const numberOfMazes = mazeController.renderMazesForm(data)

          let currentSelection = 0
          let previousSelection

          const firstImg = document.querySelector(`[data-img-index='${0}']`)
          firstImg.src = firstImg.src.substring(0, firstImg.src.length-6) + 'Color.jpg'

          allImages = document.querySelectorAll(`.selectionImage`)

          document.addEventListener('keydown', (e) => {

            if ( e.key === "ArrowRight" && !finishedSelecting) {
              previousSelection = currentSelection
              currentSelection++
            }
            if ( e.key === "ArrowLeft" && !finishedSelecting) {
              previousSelection = currentSelection
              currentSelection--
            }

            if ( (e.key === "ArrowRight" || e.key === "ArrowLeft") && !finishedSelecting) {
              if ( previousSelection < 0 ) {previousSelection = numberOfMazes}
              if ( previousSelection > numberOfMazes-1 ) {previousSelection = 0}

              if ( currentSelection < 0 ) {currentSelection = numberOfMazes-1}
              if ( currentSelection > numberOfMazes-1 ) {currentSelection = 0}

              let previousImg = document.querySelector(`[data-img-index='${previousSelection}']`)
              previousImg.src = previousImg.src.substring(0, previousImg.src.length-9) + 'BW.jpg'
              let previousImgText = document.querySelector(`[data-text-index='${previousSelection}']`)
              previousImgText.style.color = '#666666'

              let currentImg = document.querySelector(`[data-img-index='${currentSelection}']`)
              currentImg.src = currentImg.src.substring(0, currentImg.src.length-6) + 'Color.jpg'
              let currentImgText = document.querySelector(`[data-text-index='${currentSelection}']`)
              currentImgText.style.color = '#FFFFFF'
            }

            document.addEventListener('keydown', (e) => {
              e.preventDefault()

              if (e.key === 'Enter' && !finishedSelecting) {
                finishedSelecting = true
                let choosenLevelEl = document.querySelector(`[data-img-index='${currentSelection}']`)
                const id = choosenLevelEl.dataset.mazeId // SUCH A CHEAP FIX, FIX THIS LATER
                while (gridContainerEl.firstChild) {gridContainerEl.removeChild(gridContainerEl.firstChild)}

                adapter.getMaze(id)
                .then((data) => {
                  currentMaze = new Maze(data)
                  mazeController.renderMaze(currentMaze.size)
                  adapter.createMazeUser({maze_user: {user_id: currentUser.id, maze_id: currentMaze.id}})
                  .then(mazeUser => {
                    currentMazeUser = new MazeUser(mazeUser, currentMaze)
                    currentMazeUser.renderMaze()

                    CharacterController.addGeneric(currentMaze)
                    CharacterController.addKevin(currentMaze)

                    currentMazeUser.asyncCheckLoser(timeAllowed)
                    currentMazeUser.asyncTimer(timeAllowed)
                    document.addEventListener('keydown', currentMazeUser.move.bind(currentMazeUser))})
                  })
                }

              })
          })

        })
      })
    }

  })
})
