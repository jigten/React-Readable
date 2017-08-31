import { combineReducers } from 'redux'
import CategoryReducer from './reducer_category'
import PostReducer from './reducer_post'
import CommentReducer from './reducer_comment'

const rootReducer = combineReducers({
  categories: CategoryReducer,
  posts: PostReducer,
  comments: CommentReducer
})

export default rootReducer
