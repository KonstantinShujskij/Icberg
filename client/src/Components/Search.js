import React from 'react'
import Input from './UI/Input'

import styles from '../styles/search.module.css'


function Search({query}) {
    return (
        <div>
            <Input input={query} placeholder="Your request" />
        </div>
    )
}

export default Search