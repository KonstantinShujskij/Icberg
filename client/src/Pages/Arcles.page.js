import React, { useCallback, useEffect, useState } from 'react'
import useArcleApi from '../API/arcle.api'
import Arcle from '../Components/Arcle'
import useInput from '../Hooks/input.hook'

import styles from '../styles/arcles.page.module.css'
import Search from '../Components/Search'
import useSearch from '../Hooks/search.hook'


const initialArcle = [
    {_id: 1},
    {_id: 2},
    {_id: 3}
]

function Arcles() {
    const { getArcles } = useArcleApi()

    const [arcles, setArcles] = useState(initialArcle)

    const search = useSearch(async (query) => setArcles(await getArcles(query)))

    const loadArcles = useCallback(async () => setArcles(await getArcles()), [])

    useEffect(() => { loadArcles().catch() }, [loadArcles])

    return (
        <div className={styles.main}>
            <Search {...search.bind} />
            {arcles.map((arcle) => <Arcle arcle={arcle} key={arcle._id} />)}
        </div>
    )
}

export default Arcles