class CharacterController {
  static addKevin(maze) {
    const kevin = new Kevin({name: "kevin", maze: maze})
    kevin.moveAround(100)

    const chiliInterval = kevin.chiliCycle()
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
