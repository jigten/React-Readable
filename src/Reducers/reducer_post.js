import { FETCH_POST, FETCH_POSTS, FETCH_CATEGORY_POSTS, VOTE_POST } from '../Actions/index'

export default function(state = [], action) {

  switch (action.type) {

    case FETCH_POST:
      return [ action.payload.data ]

    case FETCH_POSTS:
      return [...action.payload.data]

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
      
    default:
      return state
  }
}
