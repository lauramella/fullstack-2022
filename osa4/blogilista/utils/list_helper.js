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


module.exports = {
  dummy, totalLikes, favouriteBlog
}