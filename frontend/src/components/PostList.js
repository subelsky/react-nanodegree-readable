import React, { Component } from 'react'
import Loading from 'react-loading'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Timestamp from 'react-timestamp'
import { postsFetchData } from '../actions/posts'

class PostList extends Component {
  state = {
    sortValue: 'voteScore'
  }

  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    match: PropTypes.shape({
      params: PropTypes.object.isRequired
    })
  }

  static defaultProps = {
    posts: [],
    hasErrored: false,
    isLoading: false
  }

  handleSortChange(event) {
    this.setState({ sortValue: event.target.value })
  }

  componentDidMount() {
    const { category } = this.props.match.params
    this.props.fetchData(category)
  }

  componentWillReceiveProps(nextProps) {
    const { category } = nextProps.match.params

    if (category !== this.props.match.params.category) {
      this.props.fetchData(category)
    }
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
    let postIds = Object.keys(posts)
    const visiblePostIds = postIds.filter((postId) => posts[postId].deleted !== true)

    if (this.state.sortValue === 'voteScore') {
      visiblePostIds.sort((postIdA,postIdB) => posts[postIdA].voteScore <= posts[postIdB].voteScore)
    } else {
      visiblePostIds.sort((postIdA,postIdB) => posts[postIdA].timestamp <= posts[postIdB].timestamp)
    }

    const sortedPosts = visiblePostIds.map((postId) => posts[postId])

    return (
      [(
      <div key='postTableControls' className="row">
        <div className="col-md">
          <h2>Posts</h2>
        </div>

        <div className="col-md">
          <label>
            Sort By:
            <select value={this.state.sortValue} onChange={(e) => this.handleSortChange(e)}>
              <option value="voteScore">Vote Score (Descending)</option>
              <option value="timestamp">Timestamp (Ascending)</option>
            </select>
          </label>
        </div>
      </div>

      ),(

      <div key='postTable' className="row">
        <div className="col-md">

          <table className='table table-striped table-bordered'>
            <thead className='thead-dark'>
              <tr>
                <th scope='col'>Title</th>
                <th scope='col'>Created At</th>
                <th scope='col'>Vote Score</th>
              </tr>
              </thead>
              <tbody>
                {sortedPosts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <NavLink key={post.id + 'PostLink'} to={'/posts/' + post.id}>
                        {post.title}
                      </NavLink>
                    </td>
                    <td><Timestamp time={post.timestamp/1000} /></td>
                    <td>{post.voteScore}</td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
      </div>
      ),(
      <NavLink key='NewPost' to={'/posts/new'} className='btn btn-primary'>
        New Post
      </NavLink>
    )])
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
    fetchData: (category) => dispatch(postsFetchData(category))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostList)
