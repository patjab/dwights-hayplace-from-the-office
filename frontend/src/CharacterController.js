class CharacterController {
  static addKevin(maze) {
    const kevin = new Kevin({name: "kevin", maze: maze})
    kevin.moveAround(100)

    const chiliInterval = setInterval( () => {
      kevin.spillChili.call(kevin)
      setTimeout(kevin.cleanupChili, 5000)
      // console.log("Chili Interval Still Going")
    }, 10000 )
    setTimeout( () => {
      clearInterval(chiliInterval)
    }, 31000)

    return kevin
  }

  static addGeneric(maze) {
    const generic = new Character({name: "link", maze: maze})
    generic.moveAround(100)
    return generic
  }
}
