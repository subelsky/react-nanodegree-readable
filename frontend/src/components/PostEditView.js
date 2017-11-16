import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postUpdate } from '../actions/posts'

class PostEditView extends Component {
  static PropTypes = {
    post: PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired
    }).isRequired
  }

  static defaultProps = {
    post: {}
  }

  handleChange(event) {
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
    const { title = '', body = '' } = this.props.post

    return (
      <div className="form-group">
        <form className="container" onSubmit={(e) => this.handleSave(e)}>
          <label htmlFor='title'>Title</label>
          <input id='title' type='text' className='form-control' value={title} onChange={(e) => this.handleChange(e)} />

          <label htmlFor='body'>Body</label>
          <textarea id='body' className='form-control' value={body} onChange={(e) => this.handleChange(e)} />

          <br/>

          <input type='submit' value='Save' className='btn btn-primary' />
        </form>
      </div>
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
