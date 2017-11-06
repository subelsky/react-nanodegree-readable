import React, { Component } from 'react'
import Loading from 'react-loading'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { postsFetchData } from '../actions/posts'

class PostList extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
  }

  static defaultProps = {
    posts: [],
    hasErrored: false,
    isLoading: false
  }

  componentDidMount() {
    this.props.fetchData()
  }

  // structure based on https://github.com/stowball/dummys-guide-to-redux-and-thunk-react/blob/master/src/components/ItemList.js
  render() {
    if (this.props.hasErrored) { 
      return (
        <div className="alert alert-danger" role="alert">
          Sorry! There was an error loading the posts
        </div>
      )
    }

    if (this.props.isLoading) {
      return <Loading delay={200} type='spin' color='#222' className='loading' />
    }

    const { posts } = this.props

    return (
      <div className="row">
        <div className="col-md">
          <h2>Posts</h2>
          
          <table className='table table-striped table-bordered'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>Title</th>
                <th scope='col'>Created At</th>
                <th scope='col'>Vote Score</th>
              </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} scope='row'>
                    <td>{post.title}</td>
                    <td>{post.timestamp}</td>
                    <td>&mdash;</td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    hasErrored: state.postsHasErrored,
    isLoading: state.postsIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(postsFetchData())
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(PostList);
