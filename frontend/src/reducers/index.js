import { combineReducers } from 'redux'
import { categories, categoriesHasErrored, categoriesIsLoading } from './categories'
import { posts, postsHasErrored, postsIsLoading } from './posts'
import { comments, commentsHasErrored, commentsIsLoading } from './comments'

export default combineReducers({
  categories,
  categoriesHasErrored,
  categoriesIsLoading,

  posts,
  postsHasErrored,
  postsIsLoading,

  comments,
  commentsHasErrored,
  commentsIsLoading
})
