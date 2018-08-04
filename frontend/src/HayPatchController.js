class HayPatchController {
  static renderHayPatches(maze) {
    maze.hayPatches.forEach((hayPatch) => {
      const hayPatchObj = new HayPatch(hayPatch)
      const hayPatchDivEl = maze.getElementAt(hayPatchObj.currentCoordinateRow, hayPatchObj.currentCoordinateCol)
      hayPatchObj.appendHayPatch(hayPatchDivEl)
    })
    maze.setToFinishedRendering()
  }
}
