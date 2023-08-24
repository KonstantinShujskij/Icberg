import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import useUser from "./user.hook"

import * as auth from "../redux/actions/auth.actions"
import * as authSelectors from '../redux/selectors/auth.selectors'
import * as userSelectors from '../redux/selectors/user.selectors'


export default function useAuth() {
    const dispath = useDispatch()
    const token = useSelector(authSelectors.token)
    const isUserLoad = useSelector(userSelectors.isUserLoad)

    const { refreshUser, clearUser } = useUser()

    useEffect(() => { 
        if(token && !isUserLoad) { refreshUser() }
        if(!token && isUserLoad) { clearUser() }
    }, [token, refreshUser, clearUser])

    const login = (userToken, userId) => { 
        dispath(auth.login(userToken, userId)) 
    }

    const logout = () => { 
        dispath(auth.logout()) 
    }

    return { login, logout }
}