
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const { get } = require('node:http')
const api = supertest(app)

const initialBlogs = [
  {
    title: 'Aprendendo Node.js',
    author: 'João',
    url: 'https://exemplo.com/node',
    likes: 5
  },
  {
    title: 'Estudando React',
    author: 'Maria',
    url: 'https://exemplo.com/react',
    likes: 10
  }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const result = await api.get('/api/blogs')

    assert.strictEqual(result.body.length, initialBlogs.length)
})

test('all blogs have an id property', async () => {
  const result = await api.get('/api/blogs')

  assert.strictEqual(result.body.every(blog => Object.hasOwn(blog, 'id')),true)
})

test('a valid blog can be created', async () => {
  const newBlog = {
    title: 'Aprendendo Testes',
    author: 'João',
    url: 'https://exemplo.com/testes',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const resultTamanho = await api.get('/api/blogs')

  assert.strictEqual(
    resultTamanho.body.length,
    initialBlogs.length + 1
  )

  const titles = resultTamanho.body.map(blog => blog.title)

  assert.strictEqual(titles.includes(newBlog.title), true)
})

test('likes defaults to zero when omitted', async () => {
const newBlog = {
  title: 'Testando likes',
  author: 'João',
  url: 'https://exemplo.com/likes'
}
const result = await api
.post('/api/blogs')
.send(newBlog)
.expect(201) 

assert.deepEqual(result.body.likes, 0)
})

test('returns 400 when title is missing', async () => {
  const newBlog = {
    author: 'João',
    url: 'https://exemplo.com/testes',
    likes: 5
  }
  
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)

})

test('returns 400 when URL is missing', async () => {
  const newBlog = {
    title: 'Testando url',
    author: 'João',
    likes: 5
  }
  
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)

})


test('returns 400 when title and URL are missing', async () => {
  const newBlog = {
    author: 'João',
    likes: 5
  }
  
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)

})

test('deletes a blog successfully', async () => {

  const blogs = await api
  .get('/api/blogs')
  .expect(200)

  await api
  .delete(`/api/blogs/${blogs.body[0].id}`)
  .expect(204)
})

test('updates the likes of a blog successfully', async () => {
  const blogs = await api
  .get('/api/blogs')
  .expect(200)

  const updatedBlog = await api
  .put(`/api/blogs/${blogs.body[0].id}`)
  .send({likes: 100})
  .expect(200)

  assert.strictEqual(updatedBlog.body.likes, 100)

})

after(async ( ) => {
    await mongoose.connection.close()
})