import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Timestamp from 'react-timestamp'
import { commentUpdateScore, commentDelete } from '../actions/comments'
import FaChevronCircleUp from 'react-icons/lib/fa/chevron-circle-up'
import FaChevronCircleDown from 'react-icons/lib/fa/chevron-circle-down'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class CommentDetailRow extends Component {
  static PropTypes = {
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.string.isRequired,
    deleted: PropTypes.bool.isRequired
  }

  render() {
    const { id, timestamp, body, author, voteScore, deleted } = this.props

    return (
      <li className='list-group-item'>
        <p>{body}</p>
        <footer className="blockquote-footer">
          {author} at <Timestamp time={timestamp/1000} />.
          {deleted ? (<span className='text-danger'>DELETED</span>) : '' }

        </footer>
        <div>
          <button onClick={() => this.props.upVote()}>
            <FaChevronCircleUp />
          </button>
          <button onClick={() => this.props.downVote()}>
            <FaChevronCircleDown />
          </button>
          <span className="badge badge-pill badge-primary">{voteScore}</span> points
          <div className="btn-group" role="group">
            <NavLink key={'edit' + id} to={`/comments/${id}/edit`} className={'btn btn-info' + (deleted ? ' disabled' : '')}>
              Edit
            </NavLink>
            <button disabled={!!deleted} onClick={() => this.props.delete()} className='btn btn-danger'>
              Delete
            </button>
          </div>
        </div>
      </li>
    )
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  const { id } = ownProps

  return {
    upVote:   () => dispatch(commentUpdateScore(id,'upVote')),
    downVote: () => dispatch(commentUpdateScore(id,'downVote')),
    delete:   () => dispatch(commentDelete(id))
  }
}

  
export default connect(() => ({}),mapDispatchToProps)(CommentDetailRow)
