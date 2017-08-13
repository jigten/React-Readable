import { FETCH_CATEGORIES } from '../Actions/index'

export default function(state = [], action) {

  switch (action.type) {

    case FETCH_CATEGORIES:
      return [ ...action.payload.data.categories, ...state ]

    default:
      return state
  }
}
