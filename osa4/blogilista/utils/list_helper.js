const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favouriteBlog = (blogs) =>
  blogs.reduce((previous, current) => {
    let previousLikes = previous?.likes || 0
    let currentLikes = current?.likes || 0
    return previousLikes > currentLikes ? previous : current
  }, undefined)

const mostBlogs = (blogs) => {
  const authorList = blogs.map((blog) => blog.author)
  const MostBlogsPerAuthor = _.maxBy(
    Object.entries(_.countBy(authorList, (author) => author)).map((pair) => {
      const [author, blogs] = pair
      return { author, blogs }
    }), (object) => object.blogs)
  return MostBlogsPerAuthor
}


const mostLikes = (blogs) => {
  const pairs = []
  const authorGroups = _.groupBy(blogs, (blog) => blog.author)
  for (const author in authorGroups) {
    pairs.push({ author, likes: _.sum(authorGroups[author].map((blog) => blog.likes)), })
  }
  const authorWithMostLikes = _.maxBy(pairs, (object) => object.likes)
  return authorWithMostLikes
}


module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}