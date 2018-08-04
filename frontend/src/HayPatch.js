const HayPatch = (function() {
  const all = []
  return class {
    constructor(hayPatch) {
      this.currentCoordinateRow = hayPatch.current_coordinate_row
      this.currentCoordinateCol = hayPatch.current_coordinate_col
      this.mazeId = hayPatch.maze_id // from the belongs_to relationship that HayPatch has
      all.push(this)
    }

    appendHayPatch(hayPatchDivEl) {
      hayPatchDivEl.className += " " + "patchStyle"
      const hayPic = document.createElement("IMG");
      hayPic.setAttribute("src", "./media/hay.png");
      hayPic.setAttribute("width", "100%");
      hayPic.setAttribute("height", "100%");
      hayPatchDivEl.append(hayPic)
    }

    static getAll() {
      return [...all]
    }
  }
})()
