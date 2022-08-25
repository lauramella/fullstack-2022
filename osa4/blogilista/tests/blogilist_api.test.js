const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  await User.deleteMany({})
  const password = await bcrypt.hash('salainen', 10)
  await new User({ username: 'newuser', name: 'Aku Ankka', password }).save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog identifier defined as id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach((blog) => expect(blog.id).toBeDefined())
})

test('a valid blog can be added', async () => {
  const users = await helper.usersInDb()
  const user = users[0]
  const tokenUser = { username: user.username, id: user.id }
  const token = jwt.sign(tokenUser, process.env.SECRET)

  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Test Author',
    url: 'https://reactpatterns.com/',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).toContain(
    'async/await simplifies making async calls'
  )
})

test('a valid blog cannot be added by unauthorized user', async () => {
  const newBlog = {
    title: 'no authorization',
    author: 'Test Author',
    url: 'https://reactpatterns.com/',
    likes: 4
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${null}`)
    .send(newBlog)
    .expect(401)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog gets 0 likes if there is no value', async () => {
  const users = await helper.usersInDb()
  const user = users[0]
  const tokenUser = { username: user.username, id: user.id }
  const token = jwt.sign(tokenUser, process.env.SECRET)

  const newBlog = {
    title: 'Field likes is not defined',
    author: 'New Author',
    url: 'https://newauthorwithnolikes.com/'
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toEqual(0)

})

test('blog does not contain title or url', async () => {
  const users = await helper.usersInDb()
  const user = users[0]
  const tokenUser = { username: user.username, id: user.id }
  const token = jwt.sign(tokenUser, process.env.SECRET)

  const blogWithoutTitle = {
    author: 'New Author',
    url: 'https://blogwithouttitle.com/'
  }

  const blogWithoutUrl = {
    title: 'Blog without url',
    author: 'New Author',
    likes: 9
  }

  await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(blogWithoutTitle).expect(400)
  await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(blogWithoutUrl).expect(400)
})

test('a blog can be deleted', async () => {
  const users = await helper.usersInDb()
  const user = users[0]
  const tokenUser = { username: user.username, id: user.id }
  const token = jwt.sign(tokenUser, process.env.SECRET)

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send({ 'title': 'Deleting this blog', 'url': 'deletethisblog.com' })
    .expect(201)

  const blogs = await helper.blogsInDb()
  const deleteThis = blogs[blogs.length - 1]

  await api
    .delete(`/api/blogs/${deleteThis.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength( helper.initialBlogs.length )

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).not.toContain(deleteThis.title)
})

test('blog edited succesfully', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToEdit = blogsAtStart[0]
  const editedBlog = {
    'title': blogToEdit.title,
    'author': blogToEdit.author,
    'likes': 22,
    'url': blogToEdit.url
  }

  await api
    .put(`/api/blogs/${blogToEdit.id}`)
    .send(editedBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  const likes = blogsAtEnd.map(r => r.likes)
  expect(likes).toContain(editedBlog.likes)

})

afterAll(() => {
  mongoose.connection.close()
})