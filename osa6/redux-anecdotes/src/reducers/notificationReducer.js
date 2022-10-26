const initialState = 'Just another notification!'

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export const editNotification = (content) => {
  return {
    type: 'EDIT_NOTIFICATION',
    data: content,
  }
}

export default reducer