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

const blogsInDb = async() => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, testBlog, testBlogNoLikes, blogsInDb
}