import { combineReducers } from 'redux'
import { categories, categoriesHasErrored, categoriesIsLoading } from './categories'

export default combineReducers({
  categories,
  categoriesHasErrored,
  categoriesIsLoading
})
