import React, { Component } from 'react'
import Loading from 'react-loading'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { categoriesFetchData } from '../actions/categories'


class CategoryList extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
  }

  static defaultProps = {
    categories: []
  }

  componentDidMount() {
    this.props.fetchData()
  }

  // structure based on https://github.com/stowball/dummys-guide-to-redux-and-thunk-react/blob/master/src/components/ItemList.js
  render() {
    if (this.props.hasErrored) { 
      return (
        <div className="alert alert-danger" role="alert">
          Sorry! There was an error loading the categories
        </div>
      )
    }

    if (this.props.isLoading) {
      return <Loading delay={200} type='spin' color='#222' className='loading' />
    }

    const { categories } = this.props

    console.info('PPROPS',this.props)
    return (
      <div className="row">
        <div className="col-md">
          <ul className="list-group">

          {categories.map((category) => (
            <li className="list-group-item">
              <a key={category.name} href={category.path}>{category.name}</a>
            </li>
          ))
          }

          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    hasErrored: state.categoriesHasErrored,
    isLoading: state.categoriesIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(categoriesFetchData())
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);
