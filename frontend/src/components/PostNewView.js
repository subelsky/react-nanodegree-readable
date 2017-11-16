import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { postCreate } from '../actions/posts'
import PostForm from './PostForm'

class PostNewView extends Component {
  state = {
    fireRedirect: false,
    post: {}
  }

  handleFieldChange(event) {
    const field = event.target.id
    const post = this.state.post
    const value = event.target.value

    post[field] = value
    this.setState({ post })
  }

  handleSave(event) {
    this.props.create(this.state.post)
    this.setState({ 
      fireRedirect: true
    })
    event.preventDefault()
  }
  
  render() {
    const { fireRedirect } = this.state

    if (fireRedirect) {
      return <Redirect to={'/'} />
    }

    return (
      <PostForm 
        handleFieldChange={(e) => this.handleFieldChange(e)} 
        handleSave={(e) => this.handleSave(e)} 
        {...this.state.post} />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    create: (postData) => dispatch(postCreate(postData))
  }
}
  
export default connect(() => { return {} },mapDispatchToProps)(PostNewView)
