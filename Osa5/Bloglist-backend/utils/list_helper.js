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

const mostLikes = (blogs) => {
    let   authorLikes  = []
    const authorGroups = lodash.groupBy(blogs, 'author')

    lodash.forEach(authorGroups, (authorBlogs, authorKey) => {
        authorLikes = lodash.concat(authorLikes, {author: authorKey, totalLikes: totalLikes(authorBlogs)})
    })

    const authorMostLikes = lodash.orderBy(authorLikes, 'totalLikes', 'asc')
    return authorMostLikes[authorMostLikes.length -1]
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}