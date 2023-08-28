import React, { useEffect } from 'react'
import useComentApi from '../API/coment.api'
import useInput from '../Hooks/input.hook'

import styles from '../styles/coment-form.module.css'
import { useSelector } from 'react-redux'
import * as selectorsCmd from '../redux/selectors/command.selectors'


function ComentForm({arcleId, update}) {
    const { createComent } = useComentApi()
    const text = useInput('')

    const cmd = useSelector(selectorsCmd.cmd)


    const createHandler = async () => {
        const create = await createComent(arcleId, text.value)

        if(create) { update() }
    }

    useEffect(() => {   
        if(cmd === 'coment') { createHandler() }
    }, [cmd])

    return (
        <div className={styles.main}>
            <input className={styles.text} {...text.bind} placeholder="coment..." />
        </div>
    )
}

export default ComentForm