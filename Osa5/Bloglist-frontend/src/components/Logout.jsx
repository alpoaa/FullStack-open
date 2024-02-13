import PropTypes from 'prop-types'
import '../styles/logout.css'

const Logout = ({ user, logoutClick }) => {
  if (!user) {
    return null
  }

  return (
    <div className='logoutmain'>
      <p>Logged in: {user.username}</p>
      <button onClick={logoutClick}>logout</button>
    </div>
  )
}

Logout.propTypes = {
  logoutClick: PropTypes.func.isRequired
}

export default Logout