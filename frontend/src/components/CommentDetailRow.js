import React from 'react'
import PropTypes from 'prop-types'
import Timestamp from 'react-timestamp'

const CommentDetailRow = ({ id, timestamp, body, author, voteScore }) => {
  return ([
    <tr key={'headerRow' + id }><th scope='col'>Comment ID</th><th scope='col'>Timestamp</th><th scope='col'>Author</th><th scope='col'></th><th scope='col'>Vote Score</th></tr>,
    <tr key={'dataRow' + id }><td>#{id}</td><td><Timestamp time={timestamp/1000} /></td><td>{author}</td><td>{voteScore}</td></tr>,
    <tr key={'bodyRow' + id }><td colSpan={5}>{body}</td></tr>
  ])
}

CommentDetailRow.PropTypes = {
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  voteScore: PropTypes.string.isRequired
}

export default CommentDetailRow
