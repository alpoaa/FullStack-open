/* eslint-disable react/prop-types */
const Logout = ({ user, logoutClick }) => {
    if (!user) {
        return null
    }

    return (
        <div>
            <p>Logged in: {user.username}</p>
            <button onClick={logoutClick}>logout</button>
        </div>
    )
}

export default Logout