import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { postUpdate } from '../actions/posts'
import PostForm from './PostForm'

class PostEditView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fireRedirect: false,
      post: props.post
    }
  }

  handleFieldChange(event) {
    const field = event.target.id
    const post = this.state.post
    const value = event.target.value

    post[field] = value
    this.setState({ post })
  }

  handleSave(event) {
    this.props.update(this.props.post)
    this.setState({ fireRedirect: true })
    event.preventDefault()
  }

  render() {
    const { fireRedirect } = this.state

    if (fireRedirect) {
      return <Redirect to={`/posts/${this.state.post.id}`} />
    }

    return (
      <PostForm 
        handleFieldChange={(e) => this.handleFieldChange(e)} 
        handleSave={(e) => this.handleSave(e)} 
        {...this.state.post} />
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
