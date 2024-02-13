import PropTypes from 'prop-types'
import { useState } from 'react'

import Togglable from './Togglable'

const CreateBlog = ({ user, createBlog }) => {
  const [newBlogTitle, setNewBlogTitle]         = useState('')
  const [newBlogAuthor, setNewBlogAuthor]       = useState('')
  const [newBlogUrl, setNewBlogUrl]             = useState('')

  const onNewBlogTitleChange = (event) => setNewBlogTitle(event.target.value)

  const onNewBlogAuthorChange = (event) => setNewBlogAuthor(event.target.value)

  const onNewBlogUrlChange = (event) => setNewBlogUrl(event.target.value)

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')

  }

  if (!user) {
    return null
  }

  return (
    <Togglable buttonLabel="create new">
      <form onSubmit={addBlog}>
        <h4>Create new blog</h4>
        <div>
          <input type="text" placeholder="Blog title" value={newBlogTitle} onChange={onNewBlogTitleChange}/>
        </div>
        <div>
          <input type="text" placeholder="Author" value={newBlogAuthor} onChange={onNewBlogAuthorChange}/>
        </div>
        <div>
          <input type="text" placeholder="Url" value={newBlogUrl} onChange={onNewBlogUrlChange}/>
        </div>
        <button type="submit">Create</button>
      </form>
    </Togglable>
  )
}

CreateBlog.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default CreateBlog