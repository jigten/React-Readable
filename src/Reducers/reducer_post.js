import { FETCH_POST, FETCH_POSTS, FETCH_CATEGORY_POSTS } from '../Actions/index'

export default function(state = [], action) {

  switch (action.type) {

    case FETCH_POST:
      return [ action.payload.data ]

    case FETCH_POSTS:
      return [ ...action.payload.data ]

    case FETCH_CATEGORY_POSTS:
      return [...action.payload.data]

    default:
      return state
  }
}
