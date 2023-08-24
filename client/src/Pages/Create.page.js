import React from 'react'
import useInput from '../Hooks/input.hook'
import useArcleApi from '../API/arcle.api'
import useUser from '../Hooks/user.hook'
import { useNavigate } from 'react-router-dom'
import useImage from '../Hooks/image.hook'
import styles from '../styles/create.page.module.css'
import { FRONT_URL } from '../const'


function Create() {
    const navigate = useNavigate()
    const { createArcle } = useArcleApi()
    const { refreshUser } = useUser()

    const title = useInput('')
    const description = useInput('')
    const text = useInput('')

    const photo = useImage()

    const createHandler = async () => {
        const form = new FormData()

        form.append('title', title.value)
        form.append('description', description.value)
        form.append('text', text.value)
        form.append('image', photo.image.file)

        const create = await createArcle(form)

        if(create) {
            refreshUser()
            navigate('/profile')
        }
    }

    const imageSourse = photo.image.src? photo.image.src : `${FRONT_URL}/images/defaultImage.jpg`

    return (
        <div className={styles.main}>
            <div className={styles.top}>
                <div className={styles.prew}>
                    {photo.element}
                    <img src={imageSourse} />
                </div>
                <div className={styles.info}>
                    <input className={styles.title} {...title.bind} placeholder='title' />
                    <textarea className={styles.description} {...description.bind}  placeholder='description'/>
                    <button className={styles.load} onClick={photo.trigger}>Load Photo</button>
                </div>
            </div>            
            
            {(photo.image.src && 
                <div className={styles.image}>
                    <img src={imageSourse} />
                </div>
            )}
            <h2 className={styles.header}>{title.value? title.value : 'Title'}</h2>
            <textarea className={styles.text} {...text.bind} placeholder='text' />

            <div className={styles.buttons}>
                <button className={styles.button} onClick={() => createHandler()} >Post</button>
            </div>
        </div>
    )
}

export default Create