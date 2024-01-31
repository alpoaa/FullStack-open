const bcrypt = require('bcrypt')
const Blog   = require('../models/blog')
const User   = require('../models/user')

//always setup to tests some blogs to database
const initialBlogs = [
    {
        title:"Testblog",
        author: "Test Name",
        url:"https://google.com",
        likes: 3
    },
    {
        title:"Testblog2",
        author: "Test Name2",
        url:"https://google.com",
        likes: 6
    }
]

const testUser = {
    username: 'testUser',
    name: 'test user',
    password: 'salasana'
}

const testUserInvalidUsername = {
    username: 'te',
    name: 'invalid test user',
    password: 'salasana'
}

const testUserInvalidPassword = {
    username: 'testUser2',
    name: 'test user 2',
    password: 'sa'
}

const testBlog = {
    title:"ValidBlog",
    author: "Valid blog",
    url:"https://google.com",
    likes: 10
}

const testBlogNoLikes = {
    title:"Testblog with no likes",
    author: "Test blog",
    url:"https://google.com",
}

const testBlogInvalid = {
    url:"https://google.com",
    likes: 10
}

const blogsInDb = async() => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async() => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, testBlog, testBlogNoLikes, testBlogInvalid, blogsInDb, usersInDb, testUser, testUserInvalidPassword, testUserInvalidUsername
}