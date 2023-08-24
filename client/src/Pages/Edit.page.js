import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useArcleApi from '../API/arcle.api'
import useImage from '../Hooks/image.hook'
import useInput from '../Hooks/input.hook'

import { FRONT_URL } from '../const'

import styles from '../styles/create.page.module.css'



function Edit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { getArcle, updateArcle } = useArcleApi()

    const title = useInput('')
    const description = useInput('')
    const text = useInput('')
    const [image, setImage] = useState('')

    const photo = useImage()


    const loadArcle = useCallback(async () => { 
        const arcle = await getArcle(id)

        title.changeValue(arcle?.title)
        description.changeValue(arcle?.description)
        text.changeValue(arcle?.text)

        const imagePath = `${FRONT_URL}/store/images/${arcle?.author}/arcles/${arcle?.image}` 
        setImage(imagePath)
    }, [id])

    
    const createHandler = async () => {
        const form = new FormData()

        form.append('id', id)
        form.append('title', title.value)
        form.append('description', description.value)
        form.append('text', text.value)
        form.append('image', photo.image.file)

        const edit = await updateArcle(form)

        if(edit) { navigate('/profile') }
    }

    useEffect(() => {
        loadArcle().catch()
    }, [loadArcle])


    const imageSourse = photo.image.src? photo.image.src : image

    return (
        <div className={styles.main}>
            Edit
            <div className={styles.top}>
                <div className={styles.prew}>
                    {photo.element}
                    <img src={imageSourse} alt="ArcleImage" />
                </div>
                <div className={styles.info}>
                    <input className={styles.title} {...title.bind} placeholder="title" />
                    <textarea className={styles.description} {...description.bind}  placeholder="description"/>
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

            <div className={styles.buttons}>
                <button className={styles.button} onClick={() => createHandler()} >Update</button>
            </div>
        </div>
    )
}

export default Edit