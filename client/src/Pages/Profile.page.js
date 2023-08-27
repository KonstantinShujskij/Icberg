import React, { useCallback, useEffect, useState } from 'react'
import Arcle from '../Components/Arcle'
import { useSelector } from 'react-redux'
import * as selectors from '../redux/selectors/user.selectors'
import useArcleApi from '../API/arcle.api'
import { Link } from 'react-router-dom'
import style from '../styles/profile.page.module.css'


function Profile() {
    const { getArclesByAuthor } = useArcleApi()

    const user = useSelector(selectors.user)

    const [arcles, setArcles] = useState([])

    const loadArcles = useCallback(async () => setArcles(await getArclesByAuthor(user.id)), [user])
    
    useEffect(() => {
        loadArcles().catch()
    }, [loadArcles])

    return (
        <div className={style.profile}>
            {/* <div className={style.header}>
                <Link to="/update" className={style.avatar}>
                    <img src={user.avatarSourse} alt="avatar"/>
                </Link>
                <div className={style.info}>
                    <div className={style.name}>{user.name} {user.lastname}</div>
                    <div className={style.count}>Arcles Write {user.arclesCount}</div>
                    <a className={style.site} href={`http://${user.site}`} target="_blank" rel="noreferrer">
                        {user.site}
                    </a>
                </div>
            </div> */}
            <div className="arcles">
                {arcles.map((arcle) => <Arcle arcle={arcle} key={arcle._id} />)}
            </div>
        </div>
    )
}

export default Profile