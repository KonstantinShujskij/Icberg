import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import useUserApi from '../API/user.api'

import * as User from '../redux/actions/user.actions'


export default function useUser() {
    const dispath = useDispatch()
    const { loadUser } = useUserApi()
    
    const refreshUser = useCallback(() => loadUser().then((user) => dispath(User.load(user))), [dispath, loadUser])

    const clearUser = useCallback(() => dispath(User.clear()), [dispath])

    return { 
        refreshUser,
        clearUser
    }
}