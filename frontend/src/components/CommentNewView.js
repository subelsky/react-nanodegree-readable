import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { commentCreate } from '../actions/comments'
import CommentForm from './CommentForm'

class CommentNewView extends Component {
  state = {
    fireRedirect: false,
    comment: {}
  }

  static PropTypes = {
    postId: PropTypes.string
  }

  handleFieldChange(event) {
    const field = event.target.id
    const comment = this.state.comment
    const value = event.target.value

    comment[field] = value
    this.setState({ comment })
  }

  handleSave(event) {
    this.props.create(this.props.postId,this.state.comment)
    this.setState({ 
      fireRedirect: true
    })
    event.preventDefault()
  }
  
  render() {
    const { fireRedirect } = this.state

    if (fireRedirect) {
      const path = `/posts/${this.props.postId}`
      return <Redirect to={path} />
    }

    return (
      <CommentForm 
        onChange={(e) => this.handleFieldChange(e)} 
        onSave={(e) => this.handleSave(e)} 
        {...this.state.comment} />
    )
  }
}

const mapStateToProps = (state,ownProps) => {
  const { postId } = ownProps.match.params
  return { postId }
}

const mapDispatchToProps = (dispatch) => {
  return {
    create: (postId,commentData) => dispatch(commentCreate(postId,commentData))
  }
}
  
export default connect(mapStateToProps,mapDispatchToProps)(CommentNewView)
