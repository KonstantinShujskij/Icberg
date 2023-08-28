import React from 'react'
import { Link } from 'react-router-dom'
import { formatTime } from '../Utils/time.utils'

import styles from '../styles/coment.module.css'


function Coment({ coment }) {
    return (
        <div className={styles.main}>
            <div>{coment.text}</div>
            <div>{formatTime(coment.createdAt)}</div>
            <div>
                Author: <Link to={`/author/${coment.author}`}>{coment.authorName}</Link>
            </div>
        </div>
    )
}

export default Coment