const Blog = require('../models/blog')

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

const blogsInDb = async() => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}