import React, { Component } from 'react'
import Loading from 'react-loading'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { commentsFetchData } from '../actions/comments'
import CommentDetailRow from './CommentDetailRow'

class CommentListContainer extends Component {
  static propTypes = {
    postId: PropTypes.string,
    fetchData: PropTypes.func,
    comments: PropTypes.array,
    hasErrored: PropTypes.bool,
    isLoading: PropTypes.bool
  }

  static defaultProps = {
    comments: [],
    hasErrored: false,
    isLoading: false
  }

  componentDidMount() {
    const { postId } = this.props

    if (postId) {
      this.props.fetchData(postId)
    }
  }

  render() {
    if (this.props.hasErrored) { 
      return (
        <div className="alert alert-danger" role="alert">
          Sorry! There was an error loading the comments
        </div>
      )
    }

    if (this.props.isLoading) {
      return <Loading delay={200} type='spin' color='#222' className='loading' />
    }

    const { comments } = this.props

    return (
      <div className='row'>
        <div className='col-md'>
          <table className='table table-bordered table-striped'>
            <caption>Comments for this post</caption>
            <tbody>
              {comments.map((c) => <CommentDetailRow key={c.id} {...c} />)}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    hasErrored: state.commentsHasErrored,
    isLoading: state.commentsIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (postId) => dispatch(commentsFetchData(postId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentListContainer)
