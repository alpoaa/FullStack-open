const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, {likes}) => sum + likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((prevBlog, blog) => prevBlog.likes > blog.likes ? prevBlog : blog)
}

module.exports = {dummy, totalLikes, favoriteBlog}