import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { commentUpdate } from '../actions/comments'

class commentEditView extends Component {
  static PropTypes = {
    comment: PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired
    }).isRequired
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
    const { body = '' } = this.props.comment

    return (
      <div className="form-group">
        <form className="container" onSubmit={(e) => this.handleSave(e)}>
          <label htmlFor='body'>Comment Text</label>
          <textarea id='body' className='form-control' value={body} onChange={(e) => this.handleChange(e)} />

          <br/>

          <input type='submit' value='Save' className='btn btn-primary' />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state,ownProps) => {
  const { editCommentId } = ownProps.match.params
  const comment = state.comments[editCommentId]

  console.info("CONSOLEDEBUG",editCommentId,state.comments);
  return { comment }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  const { viewCommentId } = ownProps.match.params

  return {
    update: (commentData) => dispatch(commentUpdate(viewCommentId,commentData))
  }
}
  
export default connect(mapStateToProps,mapDispatchToProps)(commentEditView)
