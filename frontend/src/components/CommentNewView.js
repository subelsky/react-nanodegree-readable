import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { commentCreate } from '../actions/comments'
import CommentForm from './CommentForm'

class CommentNewView extends Component {
  static PropTypes = {
    comment: PropTypes.object.isRequired
  }

  static defaultProps = {
    comment: {}
  }

  handleFieldChange(event) {
    const field = event.target.id
    const comment = this.props.comment
    const value = event.target.value

    comment[field] = value
    this.setState({ comment })
  }

  handleSave(event) {
    this.props.create(this.props.comment)
    event.preventDefault()
  }
  
  render() {
    return (
      <CommentForm 
        onChange={(e) => this.handleFieldChange(e)} 
        onSave={(e) => this.handleSave(e)} 
        {...this.props.comment} />
    )
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  const { postId } = ownProps.match.params
  return {
    create: (commentData) => dispatch(commentCreate(postId,commentData))
  }
}
  
export default connect(() => {},mapDispatchToProps)(CommentNewView)
