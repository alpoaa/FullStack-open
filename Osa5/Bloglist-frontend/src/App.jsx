/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import './App.css'

import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  return (
    <div>
      <h4>Blogeja</h4>
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
