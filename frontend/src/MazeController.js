const MazeController = (function() {
  return class {
    static renderMaze(size) {
      const gridContainerEl = document.querySelector(".grid-container")
      gridContainerEl.style['grid-template-columns'] = `repeat(${size}, ${100/(size+2)}vw)`
      gridContainerEl.style['grid-template-rows'] = `repeat(${size}, ${100/(size+2)}vh)`

      // gridContainerEl.style['grid-template-columns'] = `repeat(19, 4.6vw)`
      // gridContainerEl.style['grid-template-rows'] = `repeat(19, 4.6vh)`

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
  }
})()
