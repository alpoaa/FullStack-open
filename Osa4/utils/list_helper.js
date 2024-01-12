const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, {likes}) => sum + likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((prevBlog, blog) => prevBlog.likes > blog.likes ? prevBlog : blog)
}

const mostBlogs = (blogs) => {
    const authorGroups        = lodash.groupBy(blogs, 'author')
    const orderedAuthorGroups = lodash.orderBy(authorGroups, [(author) => author.length], ['desc']) 
    
    return {author: orderedAuthorGroups[0][0].author, blogCount: orderedAuthorGroups[0].length}
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs}