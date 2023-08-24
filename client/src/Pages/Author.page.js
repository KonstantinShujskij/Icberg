import React, { useCallback, useEffect, useState } from 'react'
import style from '../styles/profile.page.module.css'
import useArcleApi from '../API/arcle.api'
import useAuthorApi from '../API/author.api'
import Arcle from '../Components/Arcle'
import { FRONT_URL } from '../const'
import { useParams } from 'react-router-dom'

function Author() {
    const { id } = useParams()

    const { getAuthor } = useAuthorApi()
    const { getArclesByAuthor } = useArcleApi()

    const [author, setAuthor] = useState(null) 
    const [arcles, setArcles] = useState([])

    const loadAuthor = useCallback(async () => setAuthor(await getAuthor(id)), [id])
    const loadArcles = useCallback(async () => setArcles(await getArclesByAuthor(id)), [id])

    let avatarSourse = `${FRONT_URL}/images/defaultAvatar.jpg`
    if(author?.avatar) { avatarSourse = `${FRONT_URL}/store/images/${author.id}/${author.avatar}` }

    useEffect(() => {
        loadAuthor().catch(console.error)
        loadArcles().catch(console.error)
    }, [loadAuthor, loadArcles])

    return (
        <div className={style.profile}>
            <div className={style.header}>
                <div className={style.avatar}>
                    <img src={avatarSourse} alt='avatar'/>
                </div>
                <div className={style.info}>
                    <div className={style.name}>{author?.name} {author?.lastname}</div>
                    <div className={style.count}>Arcles Write {author?.arclesCount}</div>
                    <div className={style.site}>{author?.site}</div>
                </div>
            </div>
            <div className='arcles'>
                {arcles.map((arcle) => <Arcle arcle={arcle} key={arcle._id} />)}
            </div>
        </div>
    )
}

export default Author