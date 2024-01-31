const jsonWebToken = require('jsonwebtoken')
const blogsRouter  = require('express').Router()
const Blog         = require('../models/blog')
const User         = require('../models/user')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async(request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
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
    const decodedToken = jsonWebToken.verify(request.token, process.env.SECRET)
   
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'Invalid token' })
    }

    const user = await User.findById(decodedToken.id)

    if (!user) {
        return response.status(401).json({ error: 'User not exists' })
    }

    const newBlog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
        user: user._id
    })

    try {
        const savedBlog = await newBlog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async(request, response, next) => {
    const body = request.body
    const decodedToken = jsonWebToken.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'Invalid token' })
    }
    try {
        const blog = await Blog.findById(request.params.id)
    
        if (blog.user.toString() === decodedToken.id.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            return response.status(401).json({ error: 'Deleting the blog is only allowed by the user who has created it' })
        }
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter