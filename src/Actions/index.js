import axios from 'axios'
const ROOT_URL = `http://localhost:5001`

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_POST = 'FETCH_POST'
export const FETCH_POSTS = 'FETCH_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS'

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

export function createPost(values, callback) {
  const request = axios.post(`${ROOT_URL}/posts`, values, {
    headers: {'Authorization': token}
  }).then(() => callback())

  return {
    type: CREATE_POST,
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

export function votePost(id, values, callback) {
  const request = axios.post(`${ROOT_URL}/posts/${id}`, values, {
    headers: {'Authorization': token}
  }).then(() => callback())

  return {
    type: VOTE_POST,
    payload: request
  }
}

export function fetchComments(id) {
  const url = `${ROOT_URL}/posts/${id}/comments`
  const request = axios.get(url, {
    headers: {'Authorization': token}
  })

  return {
    type: FETCH_POST_COMMENTS,
    payload: request
  }
}
