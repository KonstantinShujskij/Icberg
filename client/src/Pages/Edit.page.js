import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useArcleApi from '../API/arcle.api'
import useImage from '../Hooks/image.hook'

import useTitle from '../Hooks/fields/title.hook'
import useDecription from '../Hooks/fields/description.hook'
import useText from '../Hooks/fields/text.hook'

import * as selectorsCmd from '../redux/selectors/command.selectors'

import { FRONT_URL } from '../const'

import styles from '../styles/create.page.module.css'
import { useSelector } from 'react-redux'



function Edit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { getArcle, updateArcle } = useArcleApi()

    const cmd = useSelector(selectorsCmd.cmd)

    const title = useTitle()
    const description = useDecription()
    const text = useText()
    const photo = useImage()

    const [image, setImage] = useState('')

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

    useEffect(() => {
        if(cmd === 'load') { photo.trigger() }
        if(cmd === 'save') { createHandler() }
    }, [cmd])


    const imageSourse = photo.image.src? photo.image.src : image

    return (
        <div className={styles.main}>
            <div className={styles.top}>
                <div className={styles.prew}>
                    {photo.element}
                    <img src={imageSourse} alt="ArcleImage" />
                </div>
                <div className={styles.info}>
                    <input className={styles.title} {...title.bind} placeholder="title" />
                    <textarea className={styles.description} {...description.bind} placeholder="description"/>
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