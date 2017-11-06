// originally based on https://codepen.io/stowball/post/a-dummy-s-guide-to-redux-and-thunk-in-react

import { 
  POSTS_HAS_ERRORED, 
  POSTS_IS_LOADING, 
  POSTS_FETCH_DATA_SUCCESS 
} from '../actions/posts'

export function postsHasErrored(state = false,action) {
  switch (action.type) {
    case POSTS_HAS_ERRORED:
      return action.hasErrored
    default:
      return state
  }
}

export function postsIsLoading(state = false,action) {
  switch (action.type) {
    case POSTS_IS_LOADING:
      return action.isLoading
    default:
      return state
  }
}

export function posts(state = [],action) {
  switch (action.type) {
    case POSTS_FETCH_DATA_SUCCESS:
      return action.posts
    default:
      return state
  }
}
