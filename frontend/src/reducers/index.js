import { combineReducers } from 'redux'
import { categories, categoriesHasErrored, categoriesIsLoading } from './categories'
import { posts, postsHasErrored, postsIsLoading } from './posts'

export default combineReducers({
  categories,
  categoriesHasErrored,
  categoriesIsLoading,
  posts,
  postsHasErrored,
  postsIsLoading
})
