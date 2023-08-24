import React from 'react'
import { Link } from 'react-router-dom'
import { formatTime } from '../Utils/time.utils'
import { FRONT_URL } from '../const'

import styles from '../styles/arcle.module.css'


function Arcle({arcle}) {
    const imageSourse = `${FRONT_URL}/store/images/${arcle.author}/arcles/${arcle.image}`

    return (
        <div className={styles.arcle}>
            <div className={styles.image}>
                <img src={imageSourse} alt={arcle.title} />
            </div>
            <div className={styles.content}>
                <div className={styles.title}><Link to={`/arcle/${arcle._id}`}>{arcle.title}</Link></div>
                <div className={styles.description}>{arcle.description}</div>
                <div >Coments write: {arcle.comentsCount}</div>
                <div >Created: {formatTime(arcle.createdAt)}</div>
                <div className={styles.author}>
          Author: <Link to={`/author/${arcle.author}`}>{arcle.authorName}</Link>
                </div>
            </div>
        </div>
    )
}

export default Arcle