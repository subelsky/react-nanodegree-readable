import React from 'react'
import PropTypes from 'prop-types'

const PostViewBody = ({ body }) => (
  <div className='row'>
    <div className='col-md'>
      {body}
    </div>
  </div>
)

PostViewBody.PropTypes = {
  body: PropTypes.string.isRequired
}

export default PostViewBody
