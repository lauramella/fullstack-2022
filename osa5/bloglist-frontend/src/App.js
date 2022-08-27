import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
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
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setUser(user)
    } catch (exception) {
      getNotification(`wrong credentials`, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreate = async (title, author, url) => {
    blogService.create({ title, author, url, })
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))
      })
  }

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
          <NewBlog handleCreate={handleCreate} />
          <Blogs blogs={blogs} />
        </div>
      )}
    </div>
  )
}

export default App