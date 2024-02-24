
import '../styles/notification.css'

const Notification = ({ notification, notificationType }) => {
  if (!notification) {
    return null
  }

  return (
    <div className={notificationType}>
      <p id='textnotification'>{notification}</p>
    </div>
  )
}

export default Notification