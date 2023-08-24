import { LOGIN, LOGOUT } from "./types/auth.types"

const initialState = {
    token: undefined,
    userId: undefined
}

export default function userReducer(state=initialState, action) {
  switch(action.type) {
      case LOGIN:
        return {...action.payload}
      case LOGOUT:
        return {...initialState}
      default:
        return state
  }
}