import axios from "axios"
import UserSession from "../auth/UserSession"

export function generateAxiosInstance() {
  const instance = axios.create()
  instance.defaults.baseURL = process.env.REACT_APP_API_URL
  instance.defaults.headers.post["Content-Type"] = "application/json"
  instance.defaults.headers.patch["Content-Type"] = "application/json"

  instance.interceptors.request.use((request) => {
    const authToken = UserSession.getToken()
    if (authToken) {
      if (request.headers && !request.headers.Authorization) {
        request.headers.Authorization = `Token ${authToken}`
      }
    }
    return request
  })
  return instance
}

const defaultInstance = generateAxiosInstance()

export default defaultInstance
