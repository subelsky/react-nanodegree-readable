import { apiPost } from '../utils/api'

export const COMMENT_UPDATE_SCORE_SUCCESS = 'COMMENT_UPDATE_SCORE_SUCCESS'

export function commentUpdateScoreSuccess(comment) {
  return {
    type: COMMENT_UPDATE_SCORE_SUCCESS,
    comment
  }
}

export function commentUpdateScore(commentId,option) {
  return (dispatch) => {
    const url = `/comments/${commentId}/`
    const body = JSON.stringify({ option })

    apiPost(url,body)
      .then((comment) => {
        dispatch(commentUpdateScoreSuccess(comment))
      })
  }
}
