class CharacterController {
  static addKevin(currentMazeUser) {
    const kevin = new Kevin({name: "kevin", mazeUser: currentMazeUser})
    kevin.moveAround(100)

    const chiliInterval = kevin.chiliCycle()
    setTimeout( () => {
      clearInterval(chiliInterval)
    }, 31000)

    return kevin
  }

  static addGeneric(currentMazeUser) {
    const generic = new Character({name: "link", mazeUser: currentMazeUser})
    generic.moveAround(100)
    return generic
  }

  static addJim(currentMazeUser) {
    const jim = new Jim({name: "jim", mazeUser: currentMazeUser})
    jim.moveAround(100)
    return jim
  }

  static addCreed(currentMazeUser) {
    const creed = new Creed({name: creed, mazeUser: currentMazeUser})
    creed.moveAround(100)
    return creed
  }
}
