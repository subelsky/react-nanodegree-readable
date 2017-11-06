// originally based on https://codepen.io/stowball/post/a-dummy-s-guide-to-redux-and-thunk-in-react
import { apiFetch } from '../utils/api'

export const POSTS_HAS_ERRORED = 'POSTS_HAS_ERRORED'
export const POSTS_IS_LOADING = 'POSTS_IS_LOADING'
export const POSTS_FETCH_DATA_SUCCESS = 'POSTS_FETCH_DATA_SUCCESS'

export function postsHasErrored(bool) {
  return {
    type: POSTS_HAS_ERRORED,
    hasErrored: bool
  }
}

export function postsIsLoading(bool) {
  return {
    type: POSTS_IS_LOADING,
    isLoading: bool
  }
}

export function postsFetchDataSuccess(posts) {
  return {
    type: POSTS_FETCH_DATA_SUCCESS,
    posts
  }
}

export function postsFetchData(category) {
  return (dispatch) => {
    dispatch(postsIsLoading(true));

    const url = (category ? `/${category}/posts/` : '/posts')

    apiFetch(url)
      .then((posts) => {
        dispatch(postsIsLoading(false));
        dispatch(postsFetchDataSuccess(posts))
      })
      .catch(() => dispatch(postsHasErrored(true)));
  }
}
