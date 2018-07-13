class CharacterController {
  static renderKevin(maze) {
    const kevin = new Character({maze: maze})
    const kevinPositionEl = maze.getElementAt(kevin.currentCoordinateRow, kevin.currentCoordinateCol)

    const divEl = document.createElement("div")
    divEl.setAttribute("id", "kevin")

    const kevinImg = document.createElement("IMG");
    kevinImg.setAttribute("src", "./media/kevin.jpg");
    kevinImg.setAttribute("width", "60%");
    kevinImg.setAttribute("height", "60%");

    divEl.appendChild(kevinImg)
    kevinPositionEl.appendChild(divEl)

    setInterval(() => {
      kevin.move()
    }, 100)
  }
}
