const listHelper = require('../utils/list_helper')
const blogs = require('../tests/blog_list')


describe('most blogs', () => {
  test('author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs.blogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})