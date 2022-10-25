const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      let stateGood = { ...state, good: state.good + 1 }
      return stateGood
    case 'OK':
      let stateOk = { ...state, ok: state.ok + 1 }
      return stateOk
    case 'BAD':
      let stateBad = { ...state, bad: state.bad + 1 }
      return stateBad
    case 'ZERO':
      let stateZero = { good: 0, ok: 0, bad: 0 }
      return stateZero
    default: return state
  }
  
}

export default counterReducer