const listHelper = require('../utils/list_helper')

describe('favourite blog', () => {
  const list1 = [
    { title: 'Blog1', likes: 500 },
    { title: 'Blog2', likes: 0 },
    { title: 'Blog3', likes: 3 },
    { title: 'Blog4', likes: 0 },
    { title: 'Blog5', likes: 3 },
    { title: 'Blog6', likes: 1 },
    { title: 'Blog7', likes: 1 }
  ]

  const list2 = [
    { title: 'Blog1', likes: 5 },
    { title: 'Blog2', likes: 8 },
    { title: 'Blog3', likes: 3 },
    { title: 'Blog4', likes: 8 }
  ]

  const list3 = [
    { title: 'Blog1', author: 'Unknown', likes: 0 }
  ]

  test('when list has many blogs', () => {
    const result = listHelper.favouriteBlog(list1)
    expect(result).toEqual(list1[0])
  })

  test('when list has two best blogs', () => {
    const result = listHelper.favouriteBlog(list2)
    expect(result).toEqual(list2[3])
  })

  test('when list has only one blog', () => {
    const result = listHelper.favouriteBlog(list3)
    expect(result).toEqual(list3[0])
  })

})