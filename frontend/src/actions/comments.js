import { apiFetch } from '../utils/api'

export const COMMENTS_HAS_ERRORED = 'COMMENTS_HAS_ERRORED'
export const COMMENTS_IS_LOADING = 'COMMENTS_IS_LOADING'
export const COMMENTS_FETCH_DATA_SUCCESS = 'COMMENTS_FETCH_DATA_SUCCESS'

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
