import { useState } from 'react'
import '../styles/blog.css'

const Blog = ({ user, blog, likeBlog, deleteBlog }) => {
  const [viewAll, setViewAll] = useState(false)

  const setShowAllVisibility = () => setViewAll(!viewAll)

  const handleLikeClick = () => {
    const updateBlogObj = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    likeBlog(updateBlogObj, blog.id)
  }

  const handleDeleteClick = () => deleteBlog(blog)


  const showDeleteButton = { display: blog.user.username === user.username ? '' : 'none' }

  return (
    <li className="blogmain">
      <div className="blogtitle">
        <p>{blog.title}</p>
        <button id="btnblogvisibility" onClick={setShowAllVisibility}>{ viewAll ? 'Hide' : 'View' }</button>
      </div>
      {viewAll &&  <div className="blog blogdetails">
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>Likes: {blog.likes}</p>
        <p>{blog.user.name}</p>
        <button id="btnbloglike" onClick={handleLikeClick}>Like</button>
        <button style={showDeleteButton} id="btnblogdelete" onClick={handleDeleteClick}>Delete</button>
      </div>
      }
    </li>
  )
}

export default Blog