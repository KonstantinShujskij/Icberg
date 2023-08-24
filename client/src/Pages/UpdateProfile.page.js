import React from 'react'
import useInput from '../Hooks/input.hook'
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

    const name = useInput(user.name)
    const lastname = useInput(user.lastname)
    const website = useInput(user.site)

    const avatar = useImage()

    const compliteHandler = async () => {
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
    }

    const avatarSourse = avatar.image.src? avatar.image.src : user.avatarSourse

    return (
        <div className={styles.main}>
            <div className={styles.image}>
                {avatar.element}
                <img src={avatarSourse} />
            </div>
            <div className={styles.form}>
                <div className={styles.info}>
                    <input {...name.bind} placeholder='name'/>
                    <input {...lastname.bind} placeholder='lastname'/>
                    <input {...website.bind} placeholder='web-site'/>
                </div>
                <div className={styles.buttons}>
                    <button onClick={avatar.trigger}>Load Photo</button>
                    <button onClick={() => compliteHandler()}>Complite</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile