import { FETCH_POST, SORT_SCORE, SORT_DATE, FETCH_POST_SHOW, FETCH_POSTS, FETCH_CATEGORY_POSTS, VOTE_POST, DELETE_POST } from '../Actions/post'

export default function(state = [], action) {

  switch (action.type) {

    case FETCH_POST:
      return [ action.payload.data ]

    case FETCH_POST_SHOW:
      return [ action.payload.data ]

    case FETCH_POSTS:
      return [...action.payload.data]

    case SORT_SCORE:
      return [...state].sort((a, b) => {
        return b.voteScore-a.voteScore
      })

    case SORT_DATE:
      return [...state].sort((a, b) => {
        return b.timestamp-a.timestamp
      })

    case FETCH_CATEGORY_POSTS:
      return [...action.payload.data]

    case VOTE_POST:
      let newPost = action.payload.data
      let newPostArr = [...state]

      newPostArr.forEach((post, i) => {
          if(post.id === newPost.id) {
              newPostArr[i] = newPost;
          }
      })

      return [...newPostArr]

    case DELETE_POST:
      let arr = [...state]
      return arr.filter(post => post.id !== action.id)

    default:
      return state
  }
}
