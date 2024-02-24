import PropTypes from 'prop-types'
import { useState } from 'react'

import Blog from './Blog'

const BlogsList = ({ user, blogs, likeBlog, deleteBlog }) =>  {
  const [sortBlogBy, setSortBlogBy] = useState('')

  if (!user) {
    return null
  }

  const onSortChange = (event) => setSortBlogBy(event.target.value)

  const sortedBlogs = () => {
    if (sortBlogBy === 'Likes') {
      return blogs.sort((next, prev) => next.likes > prev.likes ? -1 : 0)
    } else if (sortBlogBy === 'Title') {
      return blogs.sort((next, prev) => next.title < prev.title ? -1 : 0)
    } else if (sortBlogBy === 'Author') {
      return blogs.sort((next, prev) => next.author < prev.author ? -1 : 0)
    }

    return blogs.sort((next, prev) => next.id < prev.id ? -1 : 0)
  }

  return (
    <div id='divbloglist'>
      <h4>Change blogs order</h4>
      <select defaultValue="No filter" onChange={onSortChange}>
        <option value="No filter">No filter</option>
        <option value="Likes">Likes</option>
        <option value="Title">Title</option>
        <option value="Author">Author</option>
      </select>
      <h4>Blogeja</h4>
      {
        sortedBlogs().map(blog =>
          <Blog key={blog.id} user={user} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog}/>
        )
      }
    </div>
  )
}

BlogsList.propTypes = {
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default BlogsList