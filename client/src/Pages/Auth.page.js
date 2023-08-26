import React, { useState } from 'react'
import useUserApi from '../API/user.api'
import useAuth from '../Hooks/auth.hook'
import { BASE_URL, FRONT_URL } from '../const'
import { useNavigate } from 'react-router-dom'
import useCaptcha from '../Hooks/captcha.hook'
import Captcha from '../Components/Captcha'

import styles from '../styles/auth.page.module.css'
import useEmail from '../Hooks/fields/email.hook'
import usePassword from '../Hooks/fields/password.hook'
import Input from '../Components/UI/Input'


function Auth() {
    const { loginUser } = useUserApi()
    const { login } = useAuth()

    const navigate = useNavigate()

    const email = useEmail()
    const password = usePassword()

    const captcha = useCaptcha()

    const [showEmail, setShowEmail] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showCaptcha, setShowCaptcha] = useState(false)


    const authHandler = async () => {
        if(!email.valid || !password.valid) { return }
        
        const authData = await loginUser(email.value, password.value, captcha.data)
        if(!authData) { 
            setShowCaptcha(false)
            return await captcha.refresh() 
        }

        const {token, userId, verify} = authData
        if(verify) { login(token, userId) }
        else { navigate('/wait') }
    }

    const toCaptcha = () => {
        if(!email.valid || !password.valid) { return }
        if(email.value.length === 0 || password.value.length === 0) { return }
        setShowCaptcha(true)
    }

    const googleHandler = () => {
        window.authenticateCallback = function(token, userId) { login(token, userId) }
        window.open(`${BASE_URL}/api/auth/google`)
    }

    return (
        <div className={styles.main}>
            <div className={styles.form}>

                <div className={styles.row}>
                    {showEmail && 
                        <div className={styles.payload}>
                            <Input input={email} placeholder="E-mail" />
                        </div>
                    }

                    <div className={styles.icon} onClick={() => setShowEmail((prew) => !prew)}>
                        <img src={`${FRONT_URL}/icons/email.svg`} alt="email"/>
                    </div>
                </div>

                <div className={styles.row}>
                    {showPassword && 
                        <div className={styles.payload}>
                            <Input input={password} placeholder="Password" type="password" />
                        </div>
                    }

                    <div className={styles.icon} onClick={() => setShowPassword((prew) => !prew)}>
                        <img src={`${FRONT_URL}/icons/unlock.svg`} alt="password"/>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.payload}>
                        <div className={`${styles.captcha} ${showCaptcha? styles.active : null}`}>
                            <Captcha {...captcha.bind} verify={() => authHandler()} />
                        </div>    
                    </div>
                    {!showCaptcha &&            
                        <div className={styles.icon} onClick={toCaptcha}>
                            <img src={`${FRONT_URL}/icons/auth.svg`} alt="google"/>
                        </div>         
                    }
                </div>

                <div className={styles.row}>
                    <div className={styles.icon}>
                        <img src={`${FRONT_URL}/icons/instagram.svg`} alt="google"/>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.icon} onClick={googleHandler}>
                        <img src={`${FRONT_URL}/icons/google.svg`} alt="google"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth