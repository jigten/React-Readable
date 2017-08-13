import { combineReducers } from 'redux'
import CategoryReducer from './reducer_category'

const rootReducer = combineReducers({
  categories: CategoryReducer
})

export default rootReducer
