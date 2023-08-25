import React, { useState } from 'react'

import useName from '../Hooks/fields/name.hook'
import useLastname from '../Hooks/fields/lastname.hook'
import useWebsite from '../Hooks/fields/website.hook'

import useUserApi from '../API/user.api'
import useUser from '../Hooks/user.hook'
import * as selectors from '../redux/selectors/user.selectors'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useImage from '../Hooks/image.hook'

import styles from '../styles/update-profile.page.module.css'


function UpdateProfile() {
    const navigate = useNavigate()

    const { updateUser } = useUserApi()
    const { refreshUser } = useUser()

    const user = useSelector(selectors.user)

    const name = useName()
    const lastname = useLastname()
    const website = useWebsite()
    const avatar = useImage()

    const [isRequest, setIsRequest] = useState(false)

    const compliteHandler = async () => {
        if(!name.valid || !lastname.valid || !website.valid) { return }

        setIsRequest(true)

        const form = new FormData()

        form.append('name', name.value)
        form.append('lastname', lastname.value)
        form.append('website', website.value)
        form.append('avatar', avatar.image.file)

        const update = await updateUser(form)

        if(update) { 
            refreshUser() 
            navigate('/profile')
        }

        setIsRequest(false)
    }

    const avatarSourse = avatar.image.src? avatar.image.src : user.avatarSourse

    return (
        <div className={styles.main}>
            <div className={styles.image}>
                {avatar.element}
                <img src={avatarSourse} alt="Avatar" />
            </div>
            <div className={styles.form}>
                <div className={styles.info}>
                    <input {...name.bind} placeholder="name"/>
                    {!name.valid && <p>{name.tooltip}</p>}
                    <input {...lastname.bind} placeholder="lastname"/>
                    {!lastname.valid && <p>{lastname.tooltip}</p>}
                    <input {...website.bind} placeholder="web-site"/>
                    {!website.valid && <p>{website.tooltip}</p>}
                </div>
                <div className={styles.buttons}>
                    <button onClick={avatar.trigger}>Load Photo</button>
                    <button onClick={() => compliteHandler()} disabled={isRequest}>Complite</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile