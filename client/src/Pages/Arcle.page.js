import React, { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useArcleApi from '../API/arcle.api'
import useComentApi from '../API/coment.api'
import { formatTime } from '../Utils/time.utils'

import * as selectors from '../redux/selectors/auth.selectors'
import { FRONT_URL } from '../const'

import Coment from '../Components/Coment'
import ComentForm from '../Components/ComentForm'

import styles from '../styles/arcle.page.module.css'


function Arcle() {
    const { id } = useParams()
    const { getArcle } = useArcleApi()
    const { getComents } = useComentApi()

    const isAuth = useSelector(selectors.isAuth)

    const [arcle, setArcle] = useState(null)
    const [coments, setComents] = useState([])

    const loadArcle = useCallback(async () => setArcle(await getArcle(id)), [id])
    const loadComents = useCallback(async () => setComents(await getComents(id)), [id])

    const imageSourse = `${FRONT_URL}/store/images/${arcle?.author}/arcles/${arcle?.image}`

    useEffect(() => {
        loadArcle().catch(console.error)
        loadComents().catch(console.error)
    }, [loadArcle, loadComents])

    return (
        <div className={styles.arcle}>
            <div className={styles.image}>
                <img src={imageSourse} alt='arcle' />
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
                {isAuth && <Link to={`/edit/${id}`}>Edit</Link>}
            </div>
            <br />
            {coments.map((coment) => <Coment coment={coment} key={coment._id} />)}
            <br />    
            {isAuth && <ComentForm arcleId={arcle?._id} update={() => loadComents()}/>}
        </div>
    )
}

export default Arcle