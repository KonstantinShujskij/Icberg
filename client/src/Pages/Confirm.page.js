import React, { useCallback, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useUserApi from '../API/user.api'
import useAuth from '../Hooks/auth.hook'

function Confirm() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [searchParams] = useSearchParams()

    const { verifyUser } = useUserApi()

    const verify = useCallback(async () => {
        const token = searchParams.get('token')
        const data = await verifyUser(token)

        if(data) {
            const { token, userId } = data
            navigate('/') 
            login(token, userId)
        }
        else { 
            navigate('/auth') 
        }

    }, [searchParams])
    
    useEffect(() => {
        verify().catch()
    }, [verify])

    return (
        <div>Confirm</div>
    )
}

export default Confirm