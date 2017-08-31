import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import CategoryReducer from './reducer_category'
import PostReducer from './reducer_post'
import CommentReducer from './reducer_comment'

const rootReducer = combineReducers({
  categories: CategoryReducer,
  posts: PostReducer,
  comments: CommentReducer,
  form: formReducer
})

export default rootReducer
