import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postCreate } from '../actions/posts'
import PostForm from './PostForm'

class PostNewView extends Component {
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
    this.props.create(this.props.post)
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

const mapDispatchToProps = (dispatch,ownProps) => {
  const { viewPostId } = ownProps.match.params

  return {
    create: (postData) => dispatch(postCreate(postData))
  }
}
  
export default connect(() => { return {} },mapDispatchToProps)(PostNewView)
