import React, { useCallback, useEffect, useState } from 'react'
import useArcleApi from '../API/arcle.api'
import Arcle from '../Components/Arcle'
import useInput from '../Hooks/input.hook'

import styles from '../styles/arcles.page.module.css'
import Search from '../Components/Search'
import { useSelector } from 'react-redux'
import * as selectorsCmd from '../redux/selectors/command.selectors'


const initialArcle = [
    {_id: 1},
    {_id: 2},
    {_id: 3}
]

function Arcles() {
    const { getArcles } = useArcleApi()

    const [arcles, setArcles] = useState(initialArcle)

    const [showSearch, setShowSearch] = useState(false)

    const query = useInput('')

    const cmd = useSelector(selectorsCmd.cmd)
    

    const loadArcles = useCallback(async () => setArcles(await getArcles()), [])

    useEffect(() => {
        loadArcles().catch()
    }, [loadArcles])

    useEffect(() => {   
        if(cmd === 'search') { if(!showSearch) { setShowSearch(true) } }
    }, [cmd])

    return (
        <div className={styles.main}>
            
            {showSearch && <Search query={query} />}
            {arcles.map((arcle) => <Arcle arcle={arcle} key={arcle._id} />)}
        </div>
    )
}

export default Arcles