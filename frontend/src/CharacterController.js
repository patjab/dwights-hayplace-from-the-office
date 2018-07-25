class CharacterController {
  static renderKevin(maze) {
    const kevin = new Kevin({name: "kevin", maze: maze})
    kevin.moveAround(100)
    const chiliInterval = setInterval( () => {
      kevin.spillChili.call(kevin)
      setTimeout(kevin.cleanupChili, 5000 )
    }, 10000 )
    setTimeout( () => {
      clearInterval(chiliInterval)
    }, 31000)
  }
}
