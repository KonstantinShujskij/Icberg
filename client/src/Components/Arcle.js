import React from 'react'
import { Link } from 'react-router-dom'
import { formatTime } from '../Utils/time.utils'
import { FRONT_URL } from '../const'

import styles from '../styles/arcle.module.css'


function Arcle({arcle}) {
    let imageSourse = `${FRONT_URL}/store/images/${arcle?.author}/arcles/${arcle?.image}`
    if(!arcle.author) { imageSourse = `${FRONT_URL}/images/defaultImage.jpg` }

    return (
        <div className={styles.arcle}>
            <div className={styles.image}>
                <img src={imageSourse} alt={arcle.title} />
            </div>
            <div className={styles.content}>
                <Link className={styles.title} to={`/arcle/${arcle._id}`}>{arcle.title || 'Title'}</Link>
                <div className={styles.description}>{arcle?.description}</div>
                <div className={styles.info}>
                    <Link className={styles.author} to={`/author/${arcle?.author}`}>
                        <i className="fa-solid fa-user-pen"></i>
                        {arcle?.authorName || 'Author'}
                    </Link>
                    <div className={styles.comment}>
                        <i className="fa-solid fa-comment"></i> 
                        {arcle?.comentsCount || '0'}
                    </div>
                    <div className={styles.date}>{formatTime(arcle?.createdAt)}</div>
                </div>
            </div>
        </div>
    )
}

export default Arcle