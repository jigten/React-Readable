import { FETCH_POST_COMMENTS, VOTE_COMMENT } from '../Actions/index'

export default function(state = [], action) {

  switch (action.type) {

    case FETCH_POST_COMMENTS:
      return [ ...action.payload.data ]

    case VOTE_COMMENT:
      let newComment = action.payload.data
      let newCommentArr = [...state]

      newCommentArr.forEach((comment, i) => {
        if(comment.id === newComment.id) {
          newCommentArr[i] = newComment
        }
      })

      return newCommentArr

    default:
      return state
  }
}
