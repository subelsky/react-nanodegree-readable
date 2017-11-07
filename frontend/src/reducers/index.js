import { combineReducers } from 'redux'
import { categories, categoriesHasErrored, categoriesIsLoading } from './categories'
import { post, postHasErrored, postIsLoading } from './post'
import { posts, postsHasErrored, postsIsLoading } from './posts'

export default combineReducers({
  categories,
  categoriesHasErrored,
  categoriesIsLoading,

  post,
  postHasErrored,
  postIsLoading,

  posts,
  postsHasErrored,
  postsIsLoading
})
