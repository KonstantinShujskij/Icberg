import React, { useCallback, useEffect, useState } from 'react'
import useArcleApi from '../API/arcle.api'
import Arcle from '../Components/Arcle'

import styles from '../styles/arcles.page.module.css'

function Arcles() {
    const { getArcles } = useArcleApi()

    const [arcles, setArcles] = useState([])

    const loadArcles = useCallback(async () => setArcles(await getArcles()), [])

    useEffect(() => {
        loadArcles().catch()
    }, [loadArcles])


    return (
        <div>
            {arcles.map((arcle) => <Arcle arcle={arcle} key={arcle._id} />)}
        </div>
    )
}

export default Arcles