import React from 'react'
import useUserApi from '../API/user.api'
import useAuth from '../Hooks/auth.hook'
import { BASE_URL } from '../const'
import { useNavigate } from 'react-router-dom'
import useCaptcha from '../Hooks/captcha.hook'
import Captcha from '../Components/Captcha'

import styles from '../styles/auth.page.module.css'
import useEmail from '../Hooks/fields/email.hook'
import usePassword from '../Hooks/fields/password.hook'


function Auth() {
    const { loginUser } = useUserApi()
    const { login } = useAuth()

    const navigate = useNavigate()

    const email = useEmail()
    const password = usePassword()

    const captcha = useCaptcha()

    const authHandler = async () => {
        if(!email.valid || !password.valid) { return }
        
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
        <div className={styles.main}>
            <div className={styles.form}>
                <div className={styles.inputs}>
                    <input {...email.bind} placeholder="Email" />
                    {!email.valid && <p>{email.tooltip}</p>}
                    <input {...password.bind} placeholder="Password" type="password"/>
                </div>

                <div className={styles.captcha}>
                    <Captcha {...captcha.bind} />
                </div>
                
                <div className={styles.buttons}>
                    <button onClick={googleHandler} className={styles.google}>
                        <i className="fa-brands fa-google"></i>
                    </button>
                    <button onClick={() => authHandler()}>Auth</button>
                </div>
            </div>
        </div>
    )
}

export default Auth