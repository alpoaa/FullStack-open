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

describe('API tests relating to GET- method', () => {
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
})

describe('API tests relating to POST- method', () => {
    test('Add blog to list', async() => {
        await api
            .post('/api/blogs')
            .send(testHelper.testBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const testBlogs = await testHelper.blogsInDb()
        expect(testBlogs).toHaveLength(testHelper.initialBlogs.length + 1)
    })
    
    test('Add blog with no likes and check default value', async() => {
        await api
            .post('/api/blogs')
            .send(testHelper.testBlogNoLikes)
            .expect(201)
    
        const testBlogs   = await testHelper.blogsInDb()
        const blogNoLikes = testBlogs.find(testBlog => testBlog.title === testHelper.testBlogNoLikes.title && testBlog.author === testHelper.testBlogNoLikes.author)
        expect(blogNoLikes.likes).toBe(0)
    })
    
    test('Blog without title or author is not added to database', async() => {
        await api
            .post('/api/blogs')
            .send(testHelper.testBlogInvalid)
            .expect(400)
    
        const testBlogs = await testHelper.blogsInDb()
        expect(testBlogs).toHaveLength(testHelper.initialBlogs.length)
    
    })
    
})

describe('API tests relating to DELETE- method', () => {
    test('Deleting the blog', async() => {
        const testBlogs      = await testHelper.blogsInDb()
        const testBlogDelete = testBlogs[0]

        await api
            .delete(`/api/blogs/${testBlogDelete.id}`)
            .expect(204)

        const testBlogsDelete = await testHelper.blogsInDb()
        expect(testBlogsDelete).toHaveLength(testHelper.initialBlogs.length -1)

        const testBlogIds = testBlogsDelete.map(blog => blog.id)
        expect(testBlogIds).not.toContain(testBlogDelete.id)

    })
})

describe('API tests relating to PUT- method', () => {
    test('Updating the blog', async() => {
        const testBlogs = await testHelper.blogsInDb()

        let testBlogUpdate   = testBlogs[0]
        testBlogUpdate.likes = 20

        await api
            .put(`/api/blogs/${testBlogUpdate.id}`)
            .send(testBlogUpdate)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const testBlogsUpdated = await testHelper.blogsInDb()
        const updatedBlog      = testBlogsUpdated.find(blog => blog.id === testBlogUpdate.id)
        expect(updatedBlog.likes).not.toEqual(testHelper.initialBlogs[0].likes)
    })
})

//after all tests has been performed, close the connection to database
afterAll(async() => {
    await mongoose.connection.close()
})