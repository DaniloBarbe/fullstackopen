const blog = require("../models/blog")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce(( acumulador, blog ) => acumulador + blog.likes, 0 )
    return total
}

const favoriteBlog = (blogs) => {
    const maior = blogs.reduce((acumulador, blog) => acumulador.likes > blog.likes ? acumulador : blog, blogs[0])
    return maior
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}