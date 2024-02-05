/* eslint-disable react/prop-types */
const Login = ( { user, username, passsword, onLogin, onUsernameChange, onPasswordChange }) => {
    if (user) {
        return null
    }
    return (
        <form onSubmit={onLogin}>
            <h4>Log in to application</h4>
            <div>
                Username:<input type="text" value={username} name="Username" onChange={onUsernameChange}/>
            </div>
            <div>
                Password: <input type="password" value={passsword} name="Password" onChange={onPasswordChange}/>
            </div>
            <button type="submit">Login</button>
        </form>
    )
}

export default Login