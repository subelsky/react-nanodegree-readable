import { apiFetch, apiPost, apiPut, apiDelete } from '../utils/api'

export const COMMENTS_HAS_ERRORED = 'COMMENTS_HAS_ERRORED'
export const COMMENTS_IS_LOADING = 'COMMENTS_IS_LOADING'
export const COMMENTS_FETCH_DATA_SUCCESS = 'COMMENTS_FETCH_DATA_SUCCESS'
export const COMMENT_UPDATE_SCORE_SUCCESS = 'COMMENT_UPDATE_SCORE_SUCCESS'

export function commentsHasErrored(bool) {
  return {
    type: COMMENTS_HAS_ERRORED,
    hasErrored: bool
  }
}

export function commentsIsLoading(bool) {
  return {
    type: COMMENTS_IS_LOADING,
    isLoading: bool
  }
}

export function commentsFetchDataSuccess(comments) {
  return {
    type: COMMENTS_FETCH_DATA_SUCCESS,
    comments
  }
}

export function commentUpdateSuccess(comment) {
  return {
    type: COMMENT_UPDATE_SCORE_SUCCESS,
    comment
  }
}

export function commentsFetchData(postId) {
  return (dispatch) => {
    dispatch(commentsIsLoading(true));

    const url = `/posts/${postId}/comments/`

    apiFetch(url)
      .then((comments) => {
        dispatch(commentsIsLoading(false));
        dispatch(commentsFetchDataSuccess(comments))
      })
      .catch(() => dispatch(commentsHasErrored(true)));
  }
}

export function commentUpdateScore(commentId,option) {
  return (dispatch) => {
    const url = `/comments/${commentId}/`
    const body = JSON.stringify({ option })

    apiPost(url,body)
      .then((comment) => {
        dispatch(commentUpdateSuccess(comment))
      })
  }
}

export function commentUpdate(commentId,comment) {
  return (dispatch) => {
    const url = `/comments/${commentId}/`
    const { body } = comment
    const timestamp = Date.now() / 1000 | 0
    const data = JSON.stringify({ timestamp, body })

    apiPut(url,data)
      .then((comment) => {
        dispatch(commentUpdateSuccess(comment))
      })
  }
}
export function commentDelete(commentId) {
  return (dispatch) => {
    const url = `/comments/${commentId}/`

    apiDelete(url)
      .then((comment) => {
        dispatch(commentUpdateSuccess(comment))
      })
  }
}
