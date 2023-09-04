import React, { useCallback, useEffect, useState } from 'react'
import useArcleApi from '../API/arcle.api'
import useAuthorApi from '../API/author.api'
import Arcle from '../Components/Arcle'
import { FRONT_URL } from '../const'
import { useParams } from 'react-router-dom'

import style from '../styles/author.page.module.css'
import Search from '../Components/Search'
import useSearch from '../Hooks/search.hook'


function Author() {
    const { id } = useParams()

    const { getAuthor } = useAuthorApi()
    const { getArclesByAuthor } = useArcleApi()

    const [author, setAuthor] = useState(null) 
    const [arcles, setArcles] = useState([])

    let avatarSourse = `${FRONT_URL}/images/defaultAvatar.jpg`
    if(author?.avatar) { avatarSourse = `${FRONT_URL}/store/images/${author.id}/${author.avatar}` }

    const search = useSearch(async (query) => setArcles(await getArclesByAuthor(id, query)))

    const loadAuthor = useCallback(async () => setAuthor(await getAuthor(id)), [id])
    const loadArcles = useCallback(async () => setArcles(await getArclesByAuthor(id)), [id])

    useEffect(() => {
        loadAuthor().catch()
        loadArcles().catch()
    }, [loadAuthor, loadArcles])

    return (
        <div className={style.profile}>
            <div className={style.header}>
                <div className={style.avatar}>
                    <img src={avatarSourse} alt="avatar"/>
                </div>
                <div className={style.info}>
                    <div className={style.name}>{author?.name} {author?.lastname}</div>
                    <div className={style.count}>
                        <i class="fa-solid fa-newspaper"></i>
                        {author?.arclesCount}
                    </div>
                    <div className={style.site}>{author?.site}</div>
                </div>
            </div>
            
            <Search {...search.bind} />
            
            <div className="arcles">
                {arcles.map((arcle) => <Arcle arcle={arcle} key={arcle._id} />)}
            </div>
        </div>
    )
}

export default Author