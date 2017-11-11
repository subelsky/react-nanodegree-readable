import React, { Component } from 'react'
import Loading from 'react-loading'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PostViewHeader from './PostViewHeader'
import PostViewBody from './PostViewBody'
import CommentListContainer from './CommentListContainer'

//should list all of the comments for that post, ordered by voteScore (highest first)
//should have controls to edit or delete the post
//should have a control to add a new comment.
//implement comment form however you want (inline, modal, etc.)
//comments should also have controls for editing or deleting

class PostViewDetail extends Component {
  static PropTypes = {
    match: PropTypes.shape({
      params: PropTypes.object.isRequired
    }).isRequired,

    post: PropTypes.object.isRequired,
  }

  static defaultProps = {
    post: {},
    hasErrored: false,
    isLoading: false
  }

  render() {
    if (this.props.hasErrored) { 
      return (
        <div className="alert alert-danger" role="alert">
          Sorry! There was an error loading this post. Please try again.
        </div>
      )
    }

    if (this.props.isLoading) {
      return <Loading delay={200} type='spin' color='#222' className='loading' />
    }

    const { id, body, ...headerProps } = this.props.post

    return ([
      <PostViewHeader key={'PostViewHeader' + id} {...headerProps} />,
      <PostViewBody key={'PostViewBody' + id} body={body} />,
      <CommentListContainer key={'CommentListContainer' + id} postId={id} />
    ])
  }
}

const mapStateToProps = (state,ownProps) => {
  const { viewPostId } = ownProps.match.params
  const post = state.posts[viewPostId]

  return {
    post,
    hasErrored: state.hasErrored,
    isLoading: state.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(PostViewDetail)
