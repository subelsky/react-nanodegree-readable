import React from 'react'
import PropTypes from 'prop-types'

const CommentForm = ({ body = '', author = '', onChange, onSave }) => {
  return (
    <div className="form-group">
      <form className="container" onSubmit={onSave}>
        <label htmlFor='body'>Comment Text</label>
        <textarea id='body' className='form-control' value={body} onChange={onChange} />

        <label htmlFor='author'>Author</label>
        <input id='author' className='form-control' type='text' value={author} onChange={onChange} />

        <br/>

        <input type='submit' value='Save' className='btn btn-primary' />
      </form>
    </div>
  )
}

CommentForm.PropTypes = {
  body: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

export default CommentForm
