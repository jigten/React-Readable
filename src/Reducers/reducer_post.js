import { FETCH_POSTS, FETCH_CATEGORY_POSTS } from '../Actions/index'

export default function(state = [], action) {
  console.log(action)
  switch (action.type) {

    case FETCH_POSTS:
      return [ ...action.payload.data ]

    case FETCH_CATEGORY_POSTS:
      return [...action.payload.data]

    default:
      return state
  }
}
