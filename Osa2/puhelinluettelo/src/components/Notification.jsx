import '../styles/notification.css'

const Notification = ({message}) => {
    if (!message) {
        return null
    }

    return (
        <div className="message">
            <p>{message}</p>
        </div>
    )
}
export default Notification