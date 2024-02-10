/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import BlogsList from './components/BlogsList'
import Login from './components/Login'
import Logout from './components/Logout'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'

import helper from './utils/helper'

const App = () => {
  const [blogs, setBlogs]                       = useState([])
  const [username, setUsername]                 = useState('')
  const [password, setPassword]                 = useState('')
  const [user, setUser]                         = useState(null)
  const [notification, setNotification]         = useState('')
  const [nofificationType, setNotificationType] = useState('')
  const [newBlogTitle, setNewBlogTitle]         = useState('')
  const [newBlogAuthor, setNewBlogAuthor]       = useState('')
  const [newBlogUrl, setNewBlogUrl]             = useState('') 

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem(helper.storageName)
 
    if (loggedUser) {
      const loginUser = JSON.parse(loggedUser)
      setUser(loginUser)
      blogService.setToken(loginUser.loginToken)
    }
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault()

    try {
      const loginUser = await loginService.login({ username, password })
      blogService.setToken(loginUser.loginToken)
      window.localStorage.setItem(helper.storageName, JSON.stringify(loginUser))
      setUser(loginUser)
      setUsername('')
      setPassword('')
      handleNotification(helper.loggedIn, helper.notificationTypeInfo)
      
    } catch (exception) {
      handleNotification(helper.errorCredentials, helper.notificationTypeError)
    }
  }

  const handleCreateBlog = async(event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      }

      const createdBlog = await blogService.createBlog(newBlog)
      const setNewBlogs = blogs.concat(createdBlog)
      setBlogs(setNewBlogs)
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      handleNotification(helper.createdNewBlog, helper.notificationTypeInfo)
    } catch (exception) {
      handleNotification(helper.errorBlogValues, helper.notificationTypeError)
    }
  }

  const onUsernameChange = (event) => setUsername(event.target.value)

  const onPasswordChange = (event) => setPassword(event.target.value)

  const onNewBlogTitleChange = (event) => setNewBlogTitle(event.target.value)

  const onNewBlogAuthorChange = (event) => setNewBlogAuthor(event.target.value)

  const onNewBlogUrlChange = (event) => setNewBlogUrl(event.target.value)

  const handleLogout = () => {
    window.localStorage.removeItem(helper.storageName)
    setUser(null)
    blogService.setToken(null)
    handleNotification(helper.loggedOut, helper.notificationTypeInfo)
  }

  const handleNotification = (notificationMessage, notificationMessageType) => {
    setNotification(notificationMessage)
    setNotificationType(notificationMessageType)

    setTimeout(() => {
      setNotification('')
      setNotificationType('')
    }, 2000)
  }

  return (
    <div>
      <Notification notification={notification} notificationType={nofificationType} />
      <Login 
        user={user}
        username={username}
        password={password}
        onLogin={handleLogin}
        onUsernameChange={onUsernameChange}
        onPasswordChange={onPasswordChange}
      />
      <Logout user={user} logoutClick={handleLogout}/>
      <Togglable buttonLabel="create new">
        <CreateBlog 
          user={user}
          onBlogCreate={handleCreateBlog}
          newBlogTitle={newBlogTitle}
          newBlogAuthor={newBlogAuthor}
          newBlogUrl={newBlogUrl}
          onNewBlogTitleChange={onNewBlogTitleChange}
          onNewBlogAuthorChange={onNewBlogAuthorChange}
          onNewBlogUrlChange={onNewBlogUrlChange}
        />
        </Togglable>
      <BlogsList user={user} blogs={blogs} />
    </div>
  )
}

export default App
