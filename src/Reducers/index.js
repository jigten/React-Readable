import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import CategoryReducer from './reducer_category'
import PostReducer from './reducer_post'
import CommentReducer from './reducer_comment'
import { FETCH_POST, FETCH_COMMENT } from '../Actions/index'

const rootReducer = combineReducers({
  categories: CategoryReducer,
  posts: PostReducer,
  comments: CommentReducer,
  form: formReducer.plugin({
    PostsEditForm: (state, action) => {
      switch(action.type) {
        case FETCH_POST:
          return {
            ...state,
            values: {
              ...state.values,
              title: action.payload.data.title,
              body: action.payload.data.body
            }
          }
          default:
            return state
      }
    },
    EditCommentForm: (state, action) => {
      switch(action.type) {
        case FETCH_COMMENT:
          return {
            ...state,
            values: {
              ...state.values,
              body: action.payload.data.body
            }
          }
          default:
            return state
      }
    }
  })
})

export default rootReducer
