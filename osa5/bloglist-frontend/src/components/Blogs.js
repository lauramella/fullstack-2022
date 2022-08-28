import Blog from './Blog'

const Blogs = ({ setBlogs, blogs, user }) => {

  return(
  <div>
    {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} setBlogs={setBlogs} />
      )}
  </div>
  )
}

export default Blogs