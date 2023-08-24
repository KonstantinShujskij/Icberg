import { LOAD, CLEAR } from '../types/user.types'
import { FRONT_URL } from '../../const'

export function load(user) {
    let avatarSourse = `${FRONT_URL}/images/defaultAvatar.jpg`
    if(user.avatar) { avatarSourse = `${FRONT_URL}/store/images/${user.id}/${user.avatar}` }

    return {
        type: LOAD,
        payload: {
            ...user,
            arclesCount: user.arcles.length,
            avatarSourse: avatarSourse
        }
    }
}

export function clear() {
    return {
        type: CLEAR
    }
}
