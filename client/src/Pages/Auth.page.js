import React from 'react'
import useInput from '../Hooks/input.hook'
import useUserApi from '../API/user.api'
import useAuth from '../Hooks/auth.hook'
import { BASE_URL } from '../const'
import { useNavigate } from 'react-router-dom'
import useCaptcha from '../Hooks/captcha.hook'
import Captcha from '../Components/Captcha'

function Auth() {
    const { loginUser } = useUserApi()
    const { login } = useAuth()

    const navigate = useNavigate()

    const email = useInput('')
    const password = useInput('')

    const captcha = useCaptcha()

    const authHandler = async () => {
        const authData = await loginUser(email.value, password.value, captcha.data)
        if(!authData) { return await captcha.refresh() }

        const {token, userId, verify} = authData
        if(verify) { login(token, userId) }
        else { navigate('/wait') }
    }

    const googleHandler = () => {
        window.authenticateCallback = function(token, userId) { login(token, userId) }
        window.open(`${BASE_URL}/api/auth/google`)
    }

    return (
        <div>
            <div>
                <input {...email.bind} placeholder='Email' />
                <input {...password.bind} placeholder='Password' type='password'/>
            </div>

            <Captcha {...captcha.bind} />

            <div>
                <button onClick={() => authHandler()}>Auth</button>
                <button onClick={googleHandler}>Auth with Google</button>
            </div>
        </div>
    )
}

export default Auth