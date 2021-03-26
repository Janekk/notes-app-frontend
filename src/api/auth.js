import axios from "./axios"

export function login(email, password) {
  return axios.post(`/auth/login`, {email, password})
}

export function register(name, email, password) {
  return axios.post(`/auth/register`, {name, email, password})
}
