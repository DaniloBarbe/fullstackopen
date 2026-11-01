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

const mostLikes = (blogs) => {
  const likesPorAutor = blogs.reduce((acumulador, blog) => {
    if (Object.hasOwn(acumulador, blog.author)) {
      acumulador[blog.author] += blog.likes
    } else {
      acumulador[blog.author] = blog.likes
    }

    return acumulador
  }, {})

  const autores = Object.entries(likesPorAutor)

  const maior = autores.reduce((acumulador, autor) =>
    autor[1] > acumulador[1] ? autor : acumulador
  )

  return {
    author: maior[0],
    likes: maior[1]
  }
}

const mostBlogs = (blogs) => {
  const blogsPorAutor = blogs.reduce((acumulador, blog) => {
    if (Object.hasOwn(acumulador, blog.author)) {
      acumulador[blog.author] += 1
    } else {
      acumulador[blog.author] = 1
    }

    return acumulador
  }, {})

  const autores = Object.entries(blogsPorAutor)

  const maior = autores.reduce((acumulador, autor) =>
    autor[1] > acumulador[1] ? autor : acumulador
  )

  return {
    author: maior[0],
    blogs: maior[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs
}