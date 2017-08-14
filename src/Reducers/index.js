import { combineReducers } from 'redux'
import CategoryReducer from './reducer_category'
import PostReducer from './reducer_post'

const rootReducer = combineReducers({
  categories: CategoryReducer,
  posts: PostReducer,
})

export default rootReducer
