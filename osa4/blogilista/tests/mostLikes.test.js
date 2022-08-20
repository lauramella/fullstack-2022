const listHelper = require('../utils/list_helper')
const blogs = require('../tests/blog_list')


describe('most likes', () => {
  test('author with most likes', () => {
    const result = listHelper.mostLikes(blogs.blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})