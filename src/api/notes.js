import axios from "./axios"

export const list = async () => {
  return axios.get(`/notes`)
}

export const get = async (id) => {
  return axios.get(`/notes/${id}`)
}

export const edit = async (id, title, content) => {
  return axios.patch(`/notes/${id}`, {title, content})
}

export const create = async (title, content) => {
    return axios.post(`/notes`, {title, content})
}

export const share = async (id, email, validUntil) => {
  return axios.post(`/notes/${id}/share`, {email, validUntil})
}
