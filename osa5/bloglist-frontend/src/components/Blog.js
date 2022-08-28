import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    const blogEdited = { ...blog, likes: blog.likes + 1 }
    handleLike(blogEdited)
  }

  const removeBlog = () => {
    if (window.confirm(`delete ${blog.title} ?`)) {
      handleRemove(blog)
    }
  }

  const toggleView = () => setView(!view)

  return (
    <div style={blogStyle}>
      {view === false ? (
        <div>
          {blog.title} {blog.author} <button onClick={toggleView}>view</button>
        </div>
      ) : (
        <div>
          <div>{blog.title} {blog.author} <button onClick={toggleView}>hide</button></div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={addLike}>like</button></div>
          <div>{blog.user.name}</div>
          {blog.user.name === user.name && (
            <button onClick={removeBlog}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
}

export default Blog
