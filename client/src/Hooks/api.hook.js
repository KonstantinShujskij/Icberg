import { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import useHttp from "./http.hook"

import { logout } from '../redux/actions/auth.actions'
import * as selectors from "../redux/selectors/auth.selectors"


export default function useApi() {
    const { request } = useHttp()

    const dispatch = useDispatch()
    const token = useSelector(selectors.token)
    
    const publicRequest = useCallback(async (queris, data, type) => {
        try { return await request(queris, 'POST', data, {}, type) } 
        catch(error) { 
            console.log(error);
            throw error 
        } 
    }, [request])

    const protectedRequest = useCallback(async (queris, data, type) => {
        try { return await request(queris, 'POST', data, {Authorization: `Bearer ${token}`}, type) }
        catch(error) { 
            if(error.status === 401) { dispatch(logout()) } 

            throw error
        } 
    }, [request, dispatch, token])
   
    return { 
        publicRequest,
        protectedRequest
    }
}