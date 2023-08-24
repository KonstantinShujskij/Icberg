import React, { useCallback, useEffect, useState } from 'react'
import style from '../styles/profile.page.module.css'
import Arcle from '../Components/Arcle'
import { useSelector } from 'react-redux'
import * as selectors from '../redux/selectors/user.selectors'
import useArcleApi from '../API/arcle.api'
import { Link } from 'react-router-dom'


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
            <div className={style.header}>
                <div className={style.avatar}>
                    <img src={user.avatarSourse} alt="avatar"/>
                </div>
                <div className={style.info}>
                    <div className={style.name}>{user.name} {user.lastname}</div>
                    <div className={style.count}>Arcles Write {user.arclesCount}</div>
                    <a className={style.site} href={`http://${user.site}`} target="_blank" rel="noreferrer">
                        {user.site}
                    </a>
                </div>
            </div>
            <div>
                <Link to="/update">Edit Profile</Link>
                <br />
                <Link to="/create">Create Arcle</Link>
            </div>
            <div className="arcles">
                {arcles.map((arcle) => <Arcle arcle={arcle} key={arcle._id} />)}
            </div>
        </div>
    )
}

export default Profile