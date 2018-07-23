class UserController {
  constructor(gridContainerEl) {
    this.gridContainerEl = gridContainerEl
  }

  setupVideoSignin() {
    const videoEl = document.createElement("video")
    videoEl.setAttribute("width", "auto")
    videoEl.setAttribute("height", "auto")
    videoEl.setAttribute("id", "themeVideo")
    videoEl.setAttribute("autoplay", "true")

    const sourceEl = document.createElement("source")
    sourceEl.setAttribute("src", "media/hayPlaceTheme.mp4")
    sourceEl.setAttribute("id", "themeVideoSrc")
    sourceEl.setAttribute("type", "video/mp4")
    videoEl.appendChild(sourceEl)
    this.gridContainerEl.appendChild(videoEl)

    !!window.chrome && !!window.chrome.webstore ? videoEl.muted = true : null
  }

  renderSignInForm() {
    const signageEl = document.createElement("div")
    signageEl.setAttribute("class", "signage")
    const signageTextEl1 = document.createTextNode("DWIGHT'S")
    const signageTextEl2 = document.createTextNode("HAY PLACE")
    signageEl.appendChild(signageTextEl1)
    signageEl.appendChild(document.createElement("BR"))
    signageEl.appendChild(signageTextEl2)
    signageEl.appendChild(document.createElement("BR"))

    const lineControllerEl = document.createElement("div")
    const lastBREl = document.createElement("BR")
    lineControllerEl.setAttribute("id", "lineControl")
    lineControllerEl.appendChild(lastBREl)

    signageEl.appendChild(lineControllerEl)

    const signInFormEl = document.createElement("form")
    signInFormEl.setAttribute("id", "login")

    const usernameTextfieldEl = document.createElement("input")
    usernameTextfieldEl.setAttribute("autocomplete", "off")
    usernameTextfieldEl.setAttribute("type", "text")
    usernameTextfieldEl.setAttribute("id", "username")
    usernameTextfieldEl.setAttribute("placeholder", "username")

    signInFormEl.appendChild(usernameTextfieldEl)
    signInFormEl.appendChild(document.createElement("BR"))
    signInFormEl.appendChild(document.createElement("BR"))

    const usernameValidationDivEl = document.createElement("DIV")
    usernameValidationDivEl.setAttribute("id", "usernameValidationMessage")
    usernameValidationDivEl.innerHTML = "Please Enter a Username"
    signInFormEl.appendChild(usernameValidationDivEl)

    usernameTextfieldEl.addEventListener('keyup', (e) => {
      if (e.target.value !== "") {
        usernameValidationDivEl.innerHTML = "Press Enter to Play"
      } else {
        usernameValidationDivEl.innerHTML = "Please Enter a Username"
      }
    })

    this.gridContainerEl.appendChild(signageEl)
    this.gridContainerEl.appendChild(signInFormEl)

    return signInFormEl
  }
}
