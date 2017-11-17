import React from 'react'
import FaChevronCircleUp from 'react-icons/lib/fa/chevron-circle-up'
import FaChevronCircleDown from 'react-icons/lib/fa/chevron-circle-down'
import PropTypes from 'prop-types'

const VoteScore = ({ score, upVote, downVote }) => {
  return (
    <div>
      <button onClick={upVote}>
        <FaChevronCircleUp />
      </button>
      <button onClick={downVote}>
        <FaChevronCircleDown />
      </button>
      <span className="badge badge-pill badge-primary">{score}</span> points
    </div>
  )
}


VoteScore.PropTypes = {
  score: PropTypes.number.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired
}

export default VoteScore
