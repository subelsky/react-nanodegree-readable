import React from 'react'
import Timestamp from 'react-timestamp'
import PropTypes from 'prop-types'

const PostViewHeader = ({ title, author, timestamp, voteScore }) => (
  <div className='row'>
    <div className='col-md'>
      <table className='table table-bordered'>
        <tbody>
          <tr><th scope='row'>Title</th><td>{title}</td></tr>
          <tr><th scope='row'>Author</th><td>{author}</td></tr>
          <tr><th scope='row'>Timestamp</th><td><Timestamp time={timestamp/1000} /></td></tr>
          <tr><th scope='row'>Vote Score</th><td>{voteScore}</td></tr>
        </tbody>
      </table>
    </div>
  </div>
)

PostViewHeader.PropTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  voteScore: PropTypes.number.isRequired,
}

export default PostViewHeader
