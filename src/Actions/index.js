import axios from 'axios'
const ROOT_URL = `http://localhost:5001`

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export const FETCH_POST = 'FETCH_POST'
export const FETCH_POST_SHOW = 'FETCH_POST_SHOW'
export const FETCH_POSTS = 'FETCH_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const EDIT_POST = 'EDIT_POST'
export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS'
export const VOTE_POST = 'VOTE_POST'
export const DELETE_POST = 'DELETE_POST'
export const DELETE_SINGLE_POST = 'DELETE_SINGLE_POST'
export const FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS'
export const FETCH_COMMENT = 'FETCH_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

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

export function fetchPostShow(id) {
  const url = `${ROOT_URL}/posts/${id}`
  const request = axios.get(url, {
    headers: {'Authorization': token}
  })

  return {
    type: FETCH_POST_SHOW,
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

export function editPost(id, values, callback) {
  const request = axios.put(`${ROOT_URL}/posts/${id}`, values, {
    headers: {'Authorization': token}
  }).then(() => callback())

  return {
    type: EDIT_POST,
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

export function votePost(id, values) {
  const request = axios.post(`${ROOT_URL}/posts/${id}`, values, {
    headers: {'Authorization': token}
  })

  return {
    type: VOTE_POST,
    payload: request
  }
}

export function deletePost(id) {
  axios.delete(`${ROOT_URL}/posts/${id}`, {
    headers: {'Authorization': token}
  })

  return {
    type: DELETE_POST,
    id
  }
}

export function deleteAPost(id, callback) {
  axios.delete(`${ROOT_URL}/posts/${id}`, {
    headers: {'Authorization': token}
  }).then(() => callback())

  return {
    type: DELETE_SINGLE_POST,
    id
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

export function fetchComment(id) {
  const url = `${ROOT_URL}/comments/${id}`
  const request = axios.get(url, {
    headers: {'Authorization': token}
  })

  return {
    type: FETCH_COMMENT,
    payload: request
  }
}

export function createComment(values) {
  const url = `${ROOT_URL}/comments`

  axios.post(url, values, {
    headers: {'Authorization': token}
  })

  return {
    type: CREATE_COMMENT,
    payload: values
  }
}

export function voteComment(id, values) {
  const request = axios.post(`${ROOT_URL}/comments/${id}`, values, {
    headers: {'Authorization': token}
  })

  return {
    type: VOTE_COMMENT,
    payload: request
  }
}

export function editComment(id, values, callback) {
  const request = axios.put(`${ROOT_URL}/comments/${id}`, values, {
    headers: {'Authorization': token}
  }).then(() => callback())

  return {
    type: EDIT_COMMENT,
    payload: request
  }
}
