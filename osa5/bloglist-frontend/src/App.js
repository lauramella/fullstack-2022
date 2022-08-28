import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const getNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      getNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const handleCreate = async (title, author, url) => {
    blogFormRef.current.toggleVisibility()
    const { token } = JSON.parse(
      window.localStorage.getItem('loggedUser')
    )
    blogService.setToken(token)
    await blogService.create({ title, author, url, user })
    blogService.getAll().then((blogs) => setBlogs(blogs))
    getNotification(`a new blog ${title} by ${author} added`)
  }

  const handleLike = async (editedBlog) => {
    await blogService.edit(editedBlog.id, editedBlog)
    setBlogs(blogs
      .map((blog) => {
        if (blog.id === editedBlog.id) { return editedBlog }
        return blog
      })
      .sort((a, b) => { return b.likes - a.likes })
    )
  }

  const handleRemove = async (blog) => {
    await blogService.remove(blog.id)
    const blogList = blogs.filter(b => !(b.id === blog.id))
    setBlogs(blogList)
  }

  const blogFormRef = useRef()

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <p>
            <h2>blogs</h2>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlog handleCreate={handleCreate} />
          </Togglable>
          <div>
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} handleRemove={handleRemove}/>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App