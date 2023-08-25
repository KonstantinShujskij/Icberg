import React, { useState } from 'react'
import useInput from '../Hooks/input.hook'
import useArcleApi from '../API/arcle.api'
import useUser from '../Hooks/user.hook'
import { useNavigate } from 'react-router-dom'
import useImage from '../Hooks/image.hook'
import { FRONT_URL } from '../const'
import styles from '../styles/create.page.module.css'


function Create() {
    const navigate = useNavigate()
    const { createArcle } = useArcleApi()
    const { refreshUser } = useUser()

    const title = useInput('', (value) => (value.length <= 64), (value) => {
        return (value.length >= 6 && value.length <= 64)
    })
    const description = useInput('', (value) => (value.length <= 500), (value) => {
        return (value.length >= 100 && value.length <= 500)
    })
    const text = useInput('', (value) => (value.length <= 50000), (value) => {
        return (value.length >= 2000 && value.length <= 50000)
    })

    const [isRequest, setIsRequest] = useState(false)
    

    const photo = useImage()

    const createHandler = async () => {
        setIsRequest(true)

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

        setIsRequest(false)
    }

    const imageSourse = photo.image.src? photo.image.src : `${FRONT_URL}/images/defaultImage.jpg`

    return (
        <div className={styles.main}>
            <div className={styles.top}>
                <div className={styles.prew}>
                    {photo.element}
                    <img src={imageSourse} alt="ArcleImage" />
                </div>
                <div className={styles.info}>
                    <input className={styles.title} {...title.bind} placeholder="title" />
                    {!title.valid && <p>Title not valide. in range 6 - 64</p>}
                    <textarea className={styles.description} {...description.bind}  placeholder="description"/>
                    {!description.valid && <p>Description not valide. in range 150 - 500</p>}
                    <button className={styles.load} onClick={photo.trigger}>Load Photo</button>
                </div>
            </div>            
            
            {(photo.image.src && 
                <div className={styles.image}>
                    <img src={imageSourse} alt="ArcleImage" />
                </div>
            )}
            <h2 className={styles.header}>{title.value? title.value : 'Title'}</h2>
            <textarea className={styles.text} {...text.bind} placeholder="text" />
            {!text.valid && <p>Text not valide. in range 2000 - 50000</p>}

            <div className={styles.buttons}>
                <button className={styles.button} onClick={() => createHandler()} disabled={isRequest}>Post</button>
            </div>
        </div>
    )
}

export default Create