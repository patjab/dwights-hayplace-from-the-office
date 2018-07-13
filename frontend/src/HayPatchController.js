class HayPatchController {
  static renderHayPatches(maze) {

    const adapter = new Adapter()
    adapter.getMaze(maze.id).then((data) => {
      const mazeObj = new Maze(data)
      console.log(mazeObj)

      data.hay_patches.forEach((hayPatch) => {
        const hayPatchObj = new HayPatch(hayPatch)
        const hayPatchDivEl = mazeObj.getElementAt(hayPatchObj.currentCoordinateRow, hayPatchObj.currentCoordinateCol)
        hayPatchObj.renderHayPatch(hayPatchDivEl)
      })
    })

  }
}
