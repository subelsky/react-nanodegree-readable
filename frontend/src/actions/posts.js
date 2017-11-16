import { apiFetch, apiPost, apiDelete, apiPut } from '../utils/api'

export const POSTS_HAS_ERRORED = 'POSTS_HAS_ERRORED'
export const POSTS_IS_LOADING = 'POSTS_IS_LOADING'
export const POSTS_FETCH_DATA_SUCCESS = 'POSTS_FETCH_DATA_SUCCESS'

export const POST_HAS_ERRORED = 'POST_HAS_ERRORED'
export const POST_IS_LOADING = 'POST_IS_LOADING'
export const POST_FETCH_DATA_SUCCESS = 'POST_FETCH_DATA_SUCCESS'

export const POST_UPDATE_SUCCESS = 'POST_UPDATE_SUCCESS'

export function postHasErrored(bool) {
  return {
    type: POST_HAS_ERRORED,
    hasErrored: bool
  }
}

export function postIsLoading(bool) {
  return {
    type: POST_IS_LOADING,
    isLoading: bool
  }
}

export function postFetchDataSuccess(post) {
  return {
    type: POST_FETCH_DATA_SUCCESS,
    post
  }
}

export function postFetchData(viewPostId) {
  return (dispatch) => {
    dispatch(postIsLoading(true));

    const url = `/posts/${viewPostId}`

    apiFetch(url)
      .then((post) => {
        dispatch(postIsLoading(false));
        dispatch(postFetchDataSuccess(post))
      })
      .catch(() => dispatch(postHasErrored(true)));
  }
}

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

export function postUpdateSuccess(post) {
  return {
    type: POST_UPDATE_SUCCESS,
    post
  }
}

export function postsFetchData(category = null) {
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

export function postUpdateScore(postId,option) {
  return (dispatch) => {
    const url = `/posts/${postId}/`
    const body = JSON.stringify({ option })

    apiPost(url,body)
      .then((post) => {
        dispatch(postUpdateSuccess(post))
      })
  }
}

export function postDelete(postId) {
  return (dispatch) => {
    const url = `/posts/${postId}/`

    apiDelete(url)
      .then((post) => {
        dispatch(postUpdateSuccess(post))
      })
  }
}

export function postUpdate(postId,post) {
  return (dispatch) => {
    const url = `/posts/${postId}/`
    const { title, body } = post
    const data = JSON.stringify({ title, body })

    apiPut(url,data)
      .then((post) => {
        dispatch(postUpdateSuccess(post))
      })
  }
}
