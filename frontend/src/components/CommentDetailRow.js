import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Timestamp from 'react-timestamp'
import { commentUpdateScore } from '../actions/comments'
import FaChevronCircleUp from 'react-icons/lib/fa/chevron-circle-up'
import FaChevronCircleDown from 'react-icons/lib/fa/chevron-circle-down'
import { connect } from 'react-redux'

class CommentDetailRow extends Component {
  static PropTypes = {
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.string.isRequired
  }

  render() {
    const { timestamp, body, author, voteScore } = this.props

    return (
      <li className='list-group-item'>
        <p>{body}</p>
        <footer className="blockquote-footer">
          {author} at <Timestamp time={timestamp/1000} />.
        </footer>
        <div>
          <button onClick={() => this.props.upVote()}>
            <FaChevronCircleUp />
          </button>
          <button onClick={() => this.props.downVote()}>
            <FaChevronCircleDown />
          </button>
          <span className="badge badge-pill badge-primary">{voteScore}</span> points
        </div>
      </li>
    )
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  const { id } = ownProps

  return {
    upVote:   () => dispatch(commentUpdateScore(id,'upVote')),
    downVote: () => dispatch(commentUpdateScore(id,'downVote'))
  }
}

  
export default connect(() => ({}),mapDispatchToProps)(CommentDetailRow)
