/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import BlogsList from './components/BlogsList'
import Login from './components/Login'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs]       = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser]         = useState(null)


  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('väärät kirjautumistunnukset')
    }
  }

  const onUsernameChange = (event) => setUsername(event.target.value)

  const onPasswordChange = (event) => setPassword(event.target.value)

  return (
    <div>
      <Login 
        user={user}
        username={username}
        password={password}
        onLogin={handleLogin}
        onUsernameChange={onUsernameChange}
        onPasswordChange={onPasswordChange}
      />
      <BlogsList user={user} blogs={blogs} />
    </div>
  )
}

export default App
