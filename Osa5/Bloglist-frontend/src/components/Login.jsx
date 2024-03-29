import PropTypes from 'prop-types'
import { useState } from 'react'

import '../styles/login.css'

const Login = ( { user, login }) => {
  const [username, setUsername]                 = useState('')
  const [password, setPassword]                 = useState('')

  const onUsernameChange = (event) => setUsername(event.target.value)

  const onPasswordChange = (event) => setPassword(event.target.value)

  const userLogin = (event) => {
    event.preventDefault()
    login({
      username,
      password
    })

    setUsername('')
    setPassword('')
  }

  if (user) {
    return null
  }

  return (
    <form className="loginform" onSubmit={userLogin}>
      <h4 id='textlogintitle'>Log in to application</h4>
      <div>
          Username:<input type="text" value={username} name="Username" onChange={onUsernameChange} id='inputusername'/>
      </div>
      <div>
          Password: <input type="password" value={password} name="Password" onChange={onPasswordChange} id='inputpassword'/>
      </div>
      <button type="submit" id='btnlogin'>Login</button>
    </form>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

export default Login