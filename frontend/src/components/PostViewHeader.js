import React, { Component } from 'react'
import Timestamp from 'react-timestamp'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { postUpdateScore, postDelete } from '../actions/posts'
import { NavLink } from 'react-router-dom'
import FaChevronCircleUp from 'react-icons/lib/fa/chevron-circle-up'
import FaChevronCircleDown from 'react-icons/lib/fa/chevron-circle-down'
import { Redirect } from 'react-router-dom'

class PostViewHeader extends Component {
  static PropTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    voteScore: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired
  }

  state = {
    fireRedirect: false
  }

  onDelete() {
    this.props.delete()
    this.setState({ fireRedirect: true })
  }

  render() {
    const { id, title, author, timestamp, voteScore, commentCount, deleted } = this.props

    if (this.state.fireRedirect) {
      return <Redirect to={'/'} />
    }

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
            <tr>
              <th scope='row'>Deleted</th>
              <td>
                <span className={deleted ? 'alert alert-danger' : ''}>
                  {deleted ? 'Yes' : 'No'}
                </span>
              </td>
            </tr>
            <tr>
              <th scope='row'>Actions</th>
              <td>
                <div className="btn-group" role="group">
                  <NavLink key={'edit' + id} to={`/posts/${id}/edit`} className={'btn btn-info' + (deleted ? ' disabled' : '')}>
                    Edit
                  </NavLink>
                  <button disabled={!!deleted} onClick={() => this.onDelete()} className='btn btn-danger'>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
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
    downVote: () => dispatch(postUpdateScore(id,'downVote')),
    delete:   () => dispatch(postDelete(id))
  }
}
  
export default connect(() => ({}),mapDispatchToProps)(PostViewHeader)
