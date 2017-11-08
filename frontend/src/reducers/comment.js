import { 
  COMMENT_UPDATE_SCORE_SUCCESS
} from '../actions/comment'

export function comment(state = [],action) {
  switch (action.type) {
    case COMMENT_UPDATE_SCORE_SUCCESS:
      return action.comment
    default:
      return state
  }
}
