import { 
  COMMENTS_HAS_ERRORED, 
  COMMENTS_IS_LOADING, 
  COMMENTS_FETCH_DATA_SUCCESS,
  COMMENT_UPDATE_SCORE_SUCCESS,
  COMMENT_CREATE_SUCCESS
} from '../actions/comments'

export function commentsHasErrored(state = false,action) {
  switch (action.type) {
    case COMMENTS_HAS_ERRORED:
      return action.hasErrored
    default:
      return state
  }
}

export function commentsIsLoading(state = false,action) {
  switch (action.type) {
    case COMMENTS_IS_LOADING:
      return action.isLoading
    default:
      return state
  }
}

export function comments(state = {},action) {
  switch (action.type) {
    case COMMENT_CREATE_SUCCESS:
      const comment = action.comment
      comment.parentId = action.parentId

      return {
        ...state,
          [comment.id]: comment
      }
    case COMMENTS_FETCH_DATA_SUCCESS:
      const comments = action.comments.reduce((map,c) => {
        map[c.id] = c
        return map
      },{})

      return comments
    case COMMENT_UPDATE_SCORE_SUCCESS:
      return {
        ...state, 
          [action.comment.id]: action.comment
      }
    default:
      return state
  }
}
