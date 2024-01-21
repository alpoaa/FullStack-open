const blogsRouter = require('express').Router()
const Blog        = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async(request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    }
    catch (exception){
        next(exception)
    }
})

blogsRouter.post('/', async(request, response, next) => {
    const body = request.body

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    try {
        const savedBlog = await newBlog.save()
        response.json(201).json(savedBlog)
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter