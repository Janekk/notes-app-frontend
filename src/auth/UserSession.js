import Cookies from "cookies-js"

class UserSession {
  constructor() {
    this.token = null
  }

  setToken(token) {
    this.token = token

    if (token) {
      window.localStorage.setItem("token", token)
      Cookies.set("Authorization", token)
    } else {
      window.localStorage.removeItem("token")
      Cookies.expire("Authorization")
    }
  }

  setClientAuthCookie() {
    const token = window.localStorage.getItem("token")
    if (token) {
      Cookies.set("Authorization", token)
    } else {
      Cookies.expire("Authorization")
    }
  }

  getToken() {
    return window.localStorage.getItem("token") || null
  }
}

const userSession = new UserSession()
export default userSession
