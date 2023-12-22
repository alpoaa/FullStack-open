import '../styles/notification.css'

const Notification = ({message, type}) => {
    if (!message) {
        return null
    }

    if (type === 'error') {
        return (
            <div className="error">
                <p>{message}</p>
            </div>
        )
    }

    return (
        <div className="info">
            <p>{message}</p>
        </div>
    )
}
export default Notification