import { combineReducers } from 'redux'
import { categories, categoriesHasErrored, categoriesIsLoading } from './categories'
import { post, postHasErrored, postIsLoading } from './post'
import { posts, postsHasErrored, postsIsLoading } from './posts'
import { comments, commentsHasErrored, commentsIsLoading } from './comments'
import { comment } from './comment'

export default combineReducers({
  categories,
  categoriesHasErrored,
  categoriesIsLoading,

  post,
  postHasErrored,
  postIsLoading,

  posts,
  postsHasErrored,
  postsIsLoading,

  comment,

  comments,
  commentsHasErrored,
  commentsIsLoading
})
