import { SET, CLEAR } from '../types/command.types'

export function setCommand(command) {
    return {
        type: SET,
        payload: command
    }
}

export function clearCommand() {
    return {
        type: CLEAR
    }
}
