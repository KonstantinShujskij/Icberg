import React, { useEffect } from 'react'
import useComentApi from '../API/coment.api'
import useComent from '../Hooks/fields/coment.hook'

import styles from '../styles/coment-form.module.css'
import { useSelector } from 'react-redux'
import * as selectorsCmd from '../redux/selectors/command.selectors'
import Text from '../Components/UI/Text'


function ComentForm({arcleId, update}) {
    const { createComent } = useComentApi()
    const text = useComent()

    const cmd = useSelector(selectorsCmd.cmd)


    const createHandler = async () => {
        const create = await createComent(arcleId, text.value)

        if(create) { update() }
    }

    useEffect(() => {   
        if(cmd === 'coment') { 
            createHandler() 
            text.changeValue('')
        }
    }, [cmd])

    return (
        <div className={styles.main}>
            <Text className={styles.text} input={text} placeholder="coment..." />
        </div>
    )
}

export default ComentForm