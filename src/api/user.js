import axios from "./axios"

export const getProfile = async () => {
  return axios.get(`/users/me`)
}
