import React, { useCallback, useEffect, useState } from 'react'
import Arcle from '../Components/Arcle'
import { useSelector } from 'react-redux'
import * as selectors from '../redux/selectors/user.selectors'
import useArcleApi from '../API/arcle.api'
import { Link } from 'react-router-dom'
import style from '../styles/profile.page.module.css'
import Search from '../Components/Search'
import useSearch from '../Hooks/search.hook'


function Profile() {
    const { getArclesByAuthor } = useArcleApi()

    const user = useSelector(selectors.user)

    const [arcles, setArcles] = useState([])

    const search = useSearch(async (query) => setArcles(await getArclesByAuthor(user.id, query)))

    const loadArcles = useCallback(async () => setArcles(await getArclesByAuthor(user.id)), [user])
    
    useEffect(() => {
        loadArcles().catch()
    }, [loadArcles])

    return (
        <div className={style.profile}>
            <Search {...search.bind} />
            <div className="arcles">
                {arcles.map((arcle) => <Arcle arcle={arcle} key={arcle._id} />)}
            </div>
        </div>
    )
}

export default Profile