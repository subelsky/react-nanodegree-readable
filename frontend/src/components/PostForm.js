import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PostForm = ({ title = '', body = '', author = '', category = '', categories = [], handleFieldChange, handleSave }) => {
  return (
    <div className="form-group">
      <form className="container" onSubmit={handleSave}>
        <label htmlFor='title'>Title</label>
        <input id='title' type='text' className='form-control' value={title} onChange={handleFieldChange} />

        <label htmlFor='body'>Body</label>
        <textarea id='body' className='form-control' value={body} onChange={handleFieldChange} />

        <label htmlFor='author'>Author</label>
        <input id='author' type='text' className='form-control' value={author} onChange={handleFieldChange} />

        <label htmlFor='category'>Category</label>
        <select id='category' className='form-control' value={category} onChange={handleFieldChange}>
          {categories.map((c) => (
            (<option key={c.name} value={c.name}>{c.name}</option>)
          ))}
        </select>

        <br/>

        <input type='submit' value='Save' className='btn btn-primary' />
      </form>
    </div>
  )
}

PostForm.PropTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return { categories: state.categories }
}

export default connect(mapStateToProps)(PostForm)
