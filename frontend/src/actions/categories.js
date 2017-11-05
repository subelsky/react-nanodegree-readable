// originally based on https://codepen.io/stowball/post/a-dummy-s-guide-to-redux-and-thunk-in-react
import { apiFetch } from '../utils/api'

export const CATEGORIES_HAS_ERRORED = 'CATEGORIES_HAS_ERRORED'
export const CATEGORIES_IS_LOADING = 'CATEGORIES_IS_LOADING'
export const CATEGORIES_FETCH_DATA_SUCCESS = 'CATEGORIES_FETCH_DATA_SUCCESS'

export function categoriesHasErrored(bool) {
  return {
    type: CATEGORIES_HAS_ERRORED,
    hasErrored: bool
  }
}

export function categoriesIsLoading(bool) {
  return {
    type: CATEGORIES_IS_LOADING,
    isLoading: bool
  }
}

export function categoriesFetchDataSuccess(categories) {
  return {
    type: CATEGORIES_FETCH_DATA_SUCCESS,
    categories
  }
}

export function categoriesFetchData() {
  return (dispatch) => {
    dispatch(categoriesIsLoading(true));

    apiFetch('/categories')
      .then((data) => {
        const { categories } = data
        dispatch(categoriesIsLoading(false));
        dispatch(categoriesFetchDataSuccess(categories))
      })
      .catch(() => dispatch(categoriesHasErrored(true)));
  }
}
