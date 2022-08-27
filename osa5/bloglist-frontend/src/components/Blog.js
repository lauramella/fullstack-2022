import React from 'react'
import { useState } from "react"

const Blog = ({blog, user}) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
          <div>likes {blog.likes} <button>like</button></div>
          <div>{user.name}</div>
        </div>
      )}
    </div>
  )
}

export default Blog

