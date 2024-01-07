const blogsRouter = require('express').Router()
const Blog        = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.get('/:id', (request, response) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
})

blogsRouter.post('/', (request, response) => {
    const body = request.body

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    newBlog.save()
        .then(savedNewBlog => {
            response.send(savedNewBlog)
        })
})

module.exports = blogsRouter