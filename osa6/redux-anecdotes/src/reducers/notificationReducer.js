const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "ON":
      return action.data
    case "OFF":
      return null
    default:
      return state
  }
};

export const notificationOn = (message) => {
  return {
    type: "ON",
    data: message,
  }
}

export const notificationOff = () => {
  return {
    type: "OFF",
  }
}

export default notificationReducer