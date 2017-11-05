// originally based on https://codepen.io/stowball/post/a-dummy-s-guide-to-redux-and-thunk-in-react

import { 
  CATEGORIES_HAS_ERRORED, 
  CATEGORIES_IS_LOADING, 
  CATEGORIES_FETCH_DATA_SUCCESS 
} from '../actions/categories'

export function categoriesHasErrored(state = false,action) {
  switch (action.type) {
    case CATEGORIES_HAS_ERRORED:
      return action.hasErrored
    default:
      return state
  }
}

export function categoriesIsLoading(state = false,action) {
  switch (action.type) {
    case CATEGORIES_IS_LOADING:
      return action.isLoading
    default:
      return state
  }
}

export function categories(state = [],action) {
  switch (action.type) {
    case CATEGORIES_FETCH_DATA_SUCCESS:
      return action.categories
    default:
      return state
  }
}
