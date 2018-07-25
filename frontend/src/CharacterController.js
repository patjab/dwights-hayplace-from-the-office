class CharacterController {
  static renderKevin(maze) {
    const kevin = new Character({name: "kevin", maze: maze})
    kevin.moveAround(100)
  }

  static renderLink(maze) {
    const link = new Character({name: "link", maze: maze})
    link.moveAround(100)
  }
}
