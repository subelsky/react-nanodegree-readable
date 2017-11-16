import { apiFetch, apiPost, apiDelete, apiPut } from '../utils/api'
import { commentsFetchData } from './comments'

export const POSTS_HAS_ERRORED = 'POSTS_HAS_ERRORED'
export const POSTS_IS_LOADING = 'POSTS_IS_LOADING'
export const POSTS_FETCH_DATA_SUCCESS = 'POSTS_FETCH_DATA_SUCCESS'

export const POST_HAS_ERRORED = 'POST_HAS_ERRORED'
export const POST_IS_LOADING = 'POST_IS_LOADING'
export const POST_FETCH_DATA_SUCCESS = 'POST_FETCH_DATA_SUCCESS'

export const POST_UPDATE_SUCCESS = 'POST_UPDATE_SUCCESS'
export const POST_CREATE_SUCCESS = 'POST_CREATE_SUCCESS'

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

export function postCreateSuccess(post) {
  return {
    type: POST_CREATE_SUCCESS,
    post
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
        posts.forEach((post) => { 
          dispatch(commentsFetchData(post.id))
        })
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

export function postCreate(post) {
  return (dispatch) => {
    const url = '/posts'
    const id = Math.random().toString(36).substr(2,9) // H/T https://gist.github.com/gordonbrander/2230317
    const timestamp = Date.now() / 1000 | 0
    const data = JSON.stringify({ ...post, id, timestamp })
    console.info("CONSOLEDEBUG",data);

    apiPost(url,data)
      .then((post) => {
        dispatch(postCreateSuccess(post))
      })
  }
}
