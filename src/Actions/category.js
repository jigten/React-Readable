import axios from 'axios'
const ROOT_URL = `http://localhost:5001`

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

export function fetchCategories() {
  const url = `${ROOT_URL}/categories`
  const request = axios.get(url, {
     headers: {'Authorization': token},
  })

  return {
    type: FETCH_CATEGORIES,
    payload: request
  }
}
