const MazeController = (function() {



  return class {
    static renderMaze(size) {
      const gridContainerEl = document.querySelector(".grid-container")
      gridContainerEl.style['grid-template-columns'] = `repeat(${size}, ${100/(size+2)}vw)`
      gridContainerEl.style['grid-template-rows'] = `repeat(${size}, ${100/(size+2)}vh)`

      for ( let row = 0; row < size; row++ ) {
        for ( let col = 0; col < size; col++ ) {
          const divSpotEl = document.createElement("div")
          divSpotEl.setAttribute("class", "grid-item")
          divSpotEl.setAttribute("data-row", row)
          divSpotEl.setAttribute("data-col", col)
          gridContainerEl.appendChild(divSpotEl)
        }
      }

    }

    static renderHighScore(mazeId) {
      const adapter = new Adapter()
      const containerEl = document.querySelector('div')
      const highScoreButtonEl = document.createElement("button")
      containerEl.appendChild(highScoreButtonEl)

      highScoreButtonEl.addEventListener('click', () => {
        adapter.getMazeUser().then(data => {
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
  }
})()
