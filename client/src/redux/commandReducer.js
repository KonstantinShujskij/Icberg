import { SET, CLEAR } from './types/command.types'

const initialState = {
    current: null
}

export default function commandReducer(state=initialState, action) {
    switch(action.type) {
    case SET:
        return {current: action.payload}
    case CLEAR:
        return {...initialState}
    default:
        return state
    }
}