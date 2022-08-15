const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const emptyList = []

  const blogZero = [
    { title: 'Zero', likes: 0 },
  ]

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithManyBlogs = [
    { title: 'Blog1', author: 'Unknown', likes: 500 },
    { title: 'Blog2', likes: 0 },
    { title: 'Blog3', likes: 3 },
    { title: 'Blog4', likes: 0 },
    { title: 'Blog5', likes: 3 },
    { title: 'Blog6', likes: 1 },
    { title: 'Blog7', likes: 1 }
  ]

  test('empty list', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('blog with zero likes', () => {
    expect(listHelper.totalLikes(blogZero)).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('total likes when there are multiple blog entries', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(508)
  })

})