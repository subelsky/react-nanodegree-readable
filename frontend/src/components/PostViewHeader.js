import React, { Component } from 'react'
import Timestamp from 'react-timestamp'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postUpdateScore } from '../actions/posts'
import FaChevronCircleUp from 'react-icons/lib/fa/chevron-circle-up'
import FaChevronCircleDown from 'react-icons/lib/fa/chevron-circle-down'

class PostViewHeader extends Component {
  static PropTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    voteScore: PropTypes.number.isRequired,
  }

  render() {
    const { title, author, timestamp, voteScore, commentCount } = this.props

    return (
    <div className='row'>
      <div className='col-md'>
        <table className='table table-bordered'>
          <tbody>
            <tr><th scope='row'>Title</th><td>{title}</td></tr>
            <tr><th scope='row'>Author</th><td>{author}</td></tr>
            <tr><th scope='row'>Timestamp</th><td><Timestamp time={timestamp/1000} /></td></tr>
            <tr>
              <th scope='row'>Vote Score</th>
              <td>
                <button onClick={() => this.props.upVote()}>
                  <FaChevronCircleUp />
                </button>
                <button onClick={() => this.props.downVote()}>
                  <FaChevronCircleDown />
                </button>
                <span className="badge badge-pill badge-primary">{voteScore}</span> points
              </td>
            </tr>
            <tr><th scope='row'># Comments</th><td>{commentCount}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  const { id } = ownProps

  return {
    upVote:   () => dispatch(postUpdateScore(id,'upVote')),
    downVote: () => dispatch(postUpdateScore(id,'downVote'))
  }
}
  
export default connect(() => ({}),mapDispatchToProps)(PostViewHeader)
