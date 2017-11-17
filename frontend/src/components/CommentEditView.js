import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { commentUpdate } from '../actions/comments'
import CommentForm from './CommentForm'

class CommentEditView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fireRedirect: false,
      comment: props.comment
    }
  }

  handleChange(event) {
    const field = event.target.id
    const comment = this.state.comment
    const value = event.target.value

    comment[field] = value
    this.setState({ comment })
  }

  handleSave(event) {
    this.props.update(this.props.comment)
    this.setState({ fireRedirect: true })
    event.preventDefault()
  }

  render() {
    const { fireRedirect } = this.state

    if (fireRedirect) {
      return <Redirect to={`/posts/${this.state.comment.parentId}`} />
    }

    return (
      <CommentForm 
        onChange={(e) => this.handleChange(e)}
        onSave={(e) => this.handleSave(e)} 
        { ...this.state.comment } />
    )
  }
}

const mapStateToProps = (state,ownProps) => {
  const { editCommentId } = ownProps.match.params
  const comment = state.comments[editCommentId]

  return { comment }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  const { editCommentId } = ownProps.match.params

  return {
    update: (commentData) => dispatch(commentUpdate(editCommentId,commentData))
  }
}
  
export default connect(mapStateToProps,mapDispatchToProps)(CommentEditView)
