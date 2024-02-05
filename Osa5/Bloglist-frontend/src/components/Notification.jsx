/* eslint-disable react/prop-types */
import '../styles/notification.css'

const Notification = ({ notification, notificationType }) => {
    console.log('ilmoitus tyyppi: ', notificationType)
    if (!notification) {
        return null
    }

    return (
        <div className={notificationType}>
            <p>{notification}</p>
        </div>
    )
}

export default Notification