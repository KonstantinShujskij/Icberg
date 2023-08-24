import { LOGIN, LOGOUT } from '../types/auth.types'

export function login(token, userId) {
    return {
        type: LOGIN,
        payload: { token, userId }
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}
