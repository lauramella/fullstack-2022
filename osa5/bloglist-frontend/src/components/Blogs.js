import Blog from './Blog'

const Blogs = ({ blogs, user }) => (
  <div>
    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user}/>
      )}
  </div>
)

export default Blogs