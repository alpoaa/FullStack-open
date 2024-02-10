/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react"

import Togglable from './Togglable'

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
        <Togglable buttonLabel="Open login">
            <form onSubmit={userLogin}>
                <h4>Log in to application</h4>
                <div>
                    Username:<input type="text" value={username} name="Username" onChange={onUsernameChange}/>
                </div>
                <div>
                    Password: <input type="password" value={password} name="Password" onChange={onPasswordChange}/>
                </div>
                <button type="submit">Login</button>
            </form>
        </Togglable>
    )
}

export default Login