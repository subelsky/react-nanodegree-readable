// originally based on https://codepen.io/stowball/post/a-dummy-s-guide-to-redux-and-thunk-in-react

import { 
  POSTS_HAS_ERRORED, 
  POSTS_IS_LOADING, 
  POSTS_FETCH_DATA_SUCCESS ,
  POST_HAS_ERRORED, 
  POST_IS_LOADING, 
  POST_UPDATE_SUCCESS,
  POST_CREATE_SUCCESS
} from '../actions/posts'

export function postHasErrored(state = false,action) {
  switch (action.type) {
    case POST_HAS_ERRORED:
      return action.hasErrored
    default:
      return state
  }
}

export function postIsLoading(state = false,action) {
  switch (action.type) {
    case POST_IS_LOADING:
      return action.isLoading
    default:
      return state
  }
}

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

export function posts(state = {},action) {
  switch (action.type) {
    case POST_CREATE_SUCCESS:
      return {
        ...state,
          [action.post.id]: action.post
      }
    case POSTS_FETCH_DATA_SUCCESS:
      const posts = action.posts.reduce((map,p) => {
        map[p.id] = p
        return map
      },{})

      return posts
    case POST_UPDATE_SUCCESS:
      const post = action.post

      return {
        ...state, 
          [post.id]: post
      }

    default:
      return state
  }
}
