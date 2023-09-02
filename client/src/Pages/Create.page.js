import React, { useEffect, useState } from 'react'
import useArcleApi from '../API/arcle.api'
import useUser from '../Hooks/user.hook'
import { useNavigate } from 'react-router-dom'
import useImage from '../Hooks/image.hook'
import { FRONT_URL } from '../const'
import styles from '../styles/create.page.module.css'
import { useSelector } from 'react-redux'
import useTitle from '../Hooks/fields/title.hook'
import useDescription from '../Hooks/fields/description.hook'
import useText from '../Hooks/fields/text.hook'
import Input from '../Components/UI/Input'
import Text from '../Components/UI/Text'


import * as selectorsCmd from '../redux/selectors/command.selectors'


function Create() {
    const navigate = useNavigate()
    const { createArcle } = useArcleApi()
    const { refreshUser } = useUser()

    const cmd = useSelector(selectorsCmd.cmd)


    const title = useTitle()
    const description = useDescription()
    const text = useText()

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

    useEffect(() => {
        if(cmd === 'load') { photo.trigger() }
        if(cmd === 'save' && !isRequest) { createHandler() }
    }, [cmd])

    const imageSourse = photo.image.src? photo.image.src : `${FRONT_URL}/images/defaultImage.jpg`

    return (
        <div className={styles.main}>
            <div className={styles.top}>
                <div className={styles.prew}>
                    {photo.element}
                    <img src={imageSourse} alt="ArcleImage" />
                </div>
                <div className={styles.info}>
                    <Input className={styles.title} input={title} placeholder="title" />
                    <Text className={styles.description} input={description} placeholder="description" />
                </div>
            </div>            
            
            {(photo.image.src && 
                <div className={styles.image}>
                    <img src={imageSourse} alt="ArcleImage" />
                </div>
            )}
            <h2 className={styles.header}>{title.value? title.value : 'Title'}</h2>
            <Text className={styles.text} input={text} placeholder="text" />
        </div>
    )
}

export default Create