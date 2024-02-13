import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import BlogsList from './components/BlogsList'
import Login from './components/Login'
import Logout from './components/Logout'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'

import helper from './utils/helper'

const App = () => {
  const [blogs, setBlogs]                       = useState([])
  const [user, setUser]                         = useState(null)
  const [notification, setNotification]         = useState('')
  const [nofificationType, setNotificationType] = useState('')


  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem(helper.storageName)

    if (loggedUser) {
      const loginUser = JSON.parse(loggedUser)
      setUser(loginUser)
      blogService.setToken(loginUser.loginToken)
    }
  }, [])

  const handleLogin = async(userCredentialsObj) => {
    try {
      const loginUser = await loginService.login(userCredentialsObj)
      blogService.setToken(loginUser.loginToken)
      window.localStorage.setItem(helper.storageName, JSON.stringify(loginUser))
      setUser(loginUser)
      handleNotification(helper.loggedIn, helper.notificationTypeInfo)

    } catch (exception) {
      handleNotification(helper.errorCredentials, helper.notificationTypeError)
    }
  }

  const handleCreateBlog = async(newBlogObj) => {
    try {
      const createdBlog = await blogService.createBlog(newBlogObj)

      if (createdBlog) {
        const newBlog  = await blogService.getBlog(createdBlog.id)
        setBlogs(blogs.concat(newBlog))
      }
      handleNotification(helper.createdNewBlog, helper.notificationTypeInfo)
    } catch (exception) {
      handleNotification(helper.errorBlogValues, helper.notificationTypeError)
    }
  }

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

  const handleBlogLike = async(updatedObj, updatedBlogId) => {
    try {
      const updatedBlog = await blogService.updateBlog(updatedObj, updatedBlogId)

      if (updatedBlog) {
        const updateBlog  = await blogService.getBlog(updatedBlogId)
        const newBlogs    = blogs.map(blog => blog.id === updatedBlogId ? { ...blog, likes: updateBlog.likes } : blog)
        setBlogs(newBlogs)
      }
    } catch (exception) {
      handleNotification(helper.errorUpdateFailure, helper.notificationTypeError)
    }
  }

  const handleBlogDelete = async(deleteBlog) => {
    try {
      if (window.confirm(`Remove blog ${deleteBlog.title} by ${deleteBlog.author}`)) {
        const response = await blogService.deleteBlog(deleteBlog.id)
        if (response === 204) {
          setBlogs(blogs.filter(blog => blog.id !== deleteBlog.id))
        }
      }
    } catch (exception) {
      handleNotification(exception.message, helper.notificationTypeError)
    }
  }

  return (
    <div>
      <Notification notification={notification} notificationType={nofificationType} />
      <Login user={user} login={handleLogin}/>
      <Logout user={user} logoutClick={handleLogout}/>
      <CreateBlog user={user} createBlog={handleCreateBlog}  />
      <BlogsList user={user} blogs={blogs} likeBlog={handleBlogLike} deleteBlog={handleBlogDelete}/>
    </div>
  )
}

export default App
