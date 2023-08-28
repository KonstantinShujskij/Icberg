import React, { useEffect, useState } from 'react'

import useName from '../Hooks/fields/name.hook'
import useLastname from '../Hooks/fields/lastname.hook'
import useWebsite from '../Hooks/fields/website.hook'

import useUserApi from '../API/user.api'
import useUser from '../Hooks/user.hook'
import * as selectors from '../redux/selectors/user.selectors'
import * as selectorsCmd from '../redux/selectors/command.selectors'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useImage from '../Hooks/image.hook'

import styles from '../styles/update-profile.page.module.css'
import Input from '../Components/UI/Input'




function UpdateProfile() {
    const navigate = useNavigate()

    const { updateUser } = useUserApi()
    const { refreshUser } = useUser()

    const user = useSelector(selectors.user)
    const cmd = useSelector(selectorsCmd.cmd)


    const name = useName(user.name)
    const lastname = useLastname(user.lastname)
    const website = useWebsite(user.website)
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

    useEffect(() => {
        if(cmd === 'load') { avatar.trigger() }
        if(cmd === 'save' && !isRequest) { compliteHandler() }
    }, [cmd])

    const avatarSourse = avatar.image.src? avatar.image.src : user.avatarSourse

    return (
        <div className={styles.main}>
            <div className={styles.image}>
                {avatar.element}
                <img src={avatarSourse} alt="Avatar" />
            </div>
            <div className={styles.form}>
                <div className={styles.info}>
                    <Input input={name} placeholder="name" />
                    <Input input={lastname} placeholder="lastname" />
                    <Input input={website} placeholder="web-site" />
                    <p className={styles.statistic}>
                        <b>Количество статей:</b> {user.arclesCount}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile