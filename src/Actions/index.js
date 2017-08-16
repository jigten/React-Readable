import axios from 'axios'
const ROOT_URL = `http://localhost:5001`

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_POST = 'FETCH_POST'
export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS'

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

export function fetchPost(id) {
  const url = `${ROOT_URL}/posts/${id}`
  const request = axios.get(url, {
    headers: {'Authorization': token}
  })

  return {
    type: FETCH_POST,
    payload: request
  }
}

export function fetchPosts() {
  const url = `${ROOT_URL}/posts`
  const request = axios.get(url, {
    headers: {'Authorization': token}
  })

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function fetchCatPosts(category) {
  const url = `${ROOT_URL}/${category}/posts`
  const request = axios.get(url, {
    headers: {'Authorization': token}
  })

  return {
    type: FETCH_CATEGORY_POSTS,
    payload: request
  }
}
