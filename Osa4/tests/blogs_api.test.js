const mongoose   = require('mongoose')
const supertest  = require('supertest')
const testHelper = require('../tests/test_helper')
const app        = require('../app')
const api        = supertest(app)
const Blog       = require('../models/blog')

//before any test, delete the blogs from test database & initialize new ones
beforeEach(async() => {
    await Blog.deleteMany({})
    await Blog.insertMany(testHelper.initialBlogs)
})

test('Blogs returned are json objects', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('All the blogs are found', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(testHelper.initialBlogs.length)
})

test('Id value has been defined to all blogs', async() => {
    const response = await api.get('/api/blogs')
    const blogs    = response.body

    blogs.forEach(blog =>{
        expect(blog).toHaveProperty('id')
        expect(blog.id).toBeDefined()
    })
})

test('Add blog to list', async() => {
    await api
        .post('/api/blogs')
        .send(testHelper.testBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const testBlogs = await testHelper.blogsInDb()
    expect(testBlogs).toHaveLength(testHelper.initialBlogs.length + 1)
})

//after all tests has been performed, close the connection to database
afterAll(async() => {
    await mongoose.connection.close()
})