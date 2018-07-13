class Adapter {
  getHayPatches() {
    const baseURL = 'http://localhost:3000/hay_patches'
    return fetch(baseURL).then(r => r.json())
  }

  getMaze(id) {
    const baseURL = `http://localhost:3000/mazes/${id}`
    return fetch(baseURL).then(r => r.json())
  }

  getMazes() {
    const baseURL = `http://localhost:3000/mazes`
    return fetch(baseURL).then(r => r.json())
  }

  getUser(id) {
    const baseURL = `http://localhost:3000/users/${id}`
    return fetch(baseURL).then(r => r.json())
  }

  createUser(user) {
    const baseURL =  `http://localhost:3000/users`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }
    return fetch(baseURL, options).then(r => r.json())
  }

  getCharacters() {
    const baseURL = `http://localhost:3000/characters/`
    return fetch(baseURL).then(r => r.json())
  }

  createTime(id, duration) {
    const baseURL = `http://localhost:3000/maze_users/${id}`
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        maze: {
          finished_time: duration
        }
      })
    }
    return fetch(baseURL, options).then(r => r.json())
  }

  // {user: u, maze: m}
  createMazeUser(mazeUser) {
    const baseURL = `http://localhost:3000/maze_users`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mazeUser)
    }
    return fetch(baseURL, options).then(r => r.json())
  }

  getMazeUser(id) {
    const baseURL = `http://localhost:3000/maze_users/${id}`
    return fetch(baseURL).then(r => r.json())
  }

}
