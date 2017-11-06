import React, { Component } from 'react'
import Loading from 'react-loading'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Timestamp from 'react-timestamp'
import { postsFetchData } from '../actions/posts'

class PostList extends Component {
  state = {
    sortValue: 'timestamp'
  }

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

  handleChange(sortValue) {
    this.setState({ sortValue })
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
    let sortFunc

    if (this.state.sortValue === 'voteScore') {
      sortFunc = (a,b) => {
        return a.voteScore <= b.voteScore
      }
    } else {
      sortFunc = (a,b) => {
        return a.timestamp <= b.timestamp
      }
    }

    posts.sort(sortFunc)

    return (
      [(
      <div key='postTableControls' className="row">
        <div className="col-md">
          <h2>Posts</h2>
        </div>

        <div className="col-md">
          <label>
            Sort By:
            <select value={this.state.sortValue} onChange={(event) => this.handleChange(event.target.value)}>
              <option value="voteScore">Vote Score</option>
              <option value="timestamp">Timestamp</option>
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
                {posts.map((post) => (
                  <tr key={post.id} scope='row'>
                    <td>{post.title}</td>
                    <td><Timestamp time={post.timestamp/1000} /></td>
                    <td>{post.voteScore}</td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
      </div>
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
    fetchData: () => dispatch(postsFetchData())
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(PostList);
