import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { commentUpdate } from '../actions/comments'
import CommentForm from './CommentForm'

class commentEditView extends Component {
  static PropTypes = {
    comment: PropTypes.object.isRequired
  }

  static defaultProps = {
    comment: {}
  }

  handleChange(event) {
    const field = event.target.id
    const comment = this.props.comment
    const value = event.target.value

    comment[field] = value
    this.setState({ comment })
  }

  handleSave(event) {
    this.props.update(this.props.comment)
    event.preventDefault()
  }

  render() {
    return (
      <CommentForm 
        onChange={(e) => this.handleChange(e)}
        onSave={(e) => this.handleSave(e)} 
        { ...this.props.comment } />
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
  
export default connect(mapStateToProps,mapDispatchToProps)(commentEditView)
