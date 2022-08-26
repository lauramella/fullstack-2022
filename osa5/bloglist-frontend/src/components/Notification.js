const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const notificationStyle = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  }

  return (
    <div style={notificationStyle}>
      {notification.message}
    </div>
  )
}

export default Notification