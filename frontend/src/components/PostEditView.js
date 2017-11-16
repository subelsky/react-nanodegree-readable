import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postUpdate } from '../actions/posts'
import PostForm from './PostForm'

class PostEditView extends Component {
  static PropTypes = {
    post: PropTypes.object.isRequired
  }

  static defaultProps = {
    post: {}
  }

  handleFieldChange(event) {
    const field = event.target.id
    const post = this.props.post
    const value = event.target.value

    post[field] = value
    this.setState({ post })
  }

  handleSave(event) {
    this.props.update(this.props.post)
    event.preventDefault()
  }

  render() {
    return (
      <PostForm 
        handleFieldChange={(e) => this.handleFieldChange(e)} 
        handleSave={(e) => this.handleSave(e)} 
        {...this.props.post} />
    )
  }
}

const mapStateToProps = (state,ownProps) => {
  const { viewPostId } = ownProps.match.params
  const post = state.posts[viewPostId]

  return { post }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  const { viewPostId } = ownProps.match.params

  return {
    update: (postData) => dispatch(postUpdate(viewPostId,postData))
  }
}
  
export default connect(mapStateToProps,mapDispatchToProps)(PostEditView)
