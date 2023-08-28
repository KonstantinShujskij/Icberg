import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useArcleApi from '../API/arcle.api'
import useComentApi from '../API/coment.api'
import { formatTime } from '../Utils/time.utils'

import * as selectorsAuth from '../redux/selectors/auth.selectors'
import * as selectorsCmd from '../redux/selectors/command.selectors'

import { FRONT_URL } from '../const'

import Coment from '../Components/Coment'
import ComentForm from '../Components/ComentForm'

import styles from '../styles/arcle.page.module.css'


function Arcle() {
    const { id } = useParams()
    const { getArcle } = useArcleApi()
    const { getComents } = useComentApi()
    const navigate = useNavigate()

    const isAuth = useSelector(selectorsAuth.isAuth)
    const cmd = useSelector(selectorsCmd.cmd)

    const [arcle, setArcle] = useState(null)
    const [coments, setComents] = useState([])

    const loadArcle = useCallback(async () => setArcle(await getArcle(id)), [id])
    const loadComents = useCallback(async () => setComents(await getComents(id)), [id])

    const imageSourse = `${FRONT_URL}/store/images/${arcle?.author}/arcles/${arcle?.image}`

    useEffect(() => {
        loadArcle().catch()
        loadComents().catch()
    }, [loadArcle, loadComents])

    useEffect(() => {
        if(cmd === 'edit') { navigate(`/edit/${id}`) }
    }, [cmd])

    return (
        <div className={styles.arcle}>
            <div className={styles.image}>
                <img src={imageSourse} alt="arcle" />
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <div className={styles.title}>{arcle?.title}</div>
                    <div className={styles.info}>
                        <div className={styles.author}>
                            <Link to={`/author/${arcle?.author}`}>{arcle?.authorName}</Link>
                        </div>
                        <div className={styles.date}>{formatTime(arcle?.createdAt)}</div>
                    </div>
                </div>
                <div className={styles.text}>
                    {arcle?.text}
                </div>
            </div>
            <br />
            {coments.map((coment) => <Coment coment={coment} key={coment._id} />)}
            <br />    
            {isAuth && <ComentForm arcleId={arcle?._id} update={() => loadComents()}/>}
        </div>
    )
}

export default Arcle