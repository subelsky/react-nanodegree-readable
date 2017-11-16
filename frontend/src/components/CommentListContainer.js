import React, { Component } from 'react'
import Loading from 'react-loading'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CommentDetailRow from './CommentDetailRow'
import { commentsFetchData } from '../actions/comments' 

class CommentListContainer extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    fetchData: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    comments: [],
    hasErrored: false,
    isLoading: false
  }

  componentDidMount() {
    this.props.fetchData(this.props.postId)
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
    comments.sort((a,b) => a.voteScore >= b.voteScore)

    return (
      <div className='row'>
        <div className='col-md'>
          <ul className='list-group'>
            {comments.map((c) => <CommentDetailRow key={c.id} {...c} />)}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state,ownProps) => {
  const { postId } = ownProps
  const { comments } = state

  let commentIds = Object.keys(comments)

  commentIds = commentIds.filter((commentId) => {
    const comment = comments[commentId]
    return comment.parentId === postId
  })

  const listComments = commentIds.map((commentId) => comments[commentId])

  return {
    comments: listComments,
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
