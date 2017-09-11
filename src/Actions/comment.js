import axios from 'axios'
const ROOT_URL = `http://localhost:5001`

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

export const FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS'
export const FETCH_COMMENT = 'FETCH_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

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

export function deleteComment(id) {
  axios.delete(`${ROOT_URL}/comments/${id}`, {
    headers: {'Authorization': token}
  })

  return {
    type: DELETE_COMMENT,
    id
  }
}
