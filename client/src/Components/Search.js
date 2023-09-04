import React, { useState } from 'react'
import Input from './UI/Input'

import styles from '../styles/search.module.css'


function Search({isOpen, input}) {
    return (
        <div>
            {isOpen && <Input input={input} placeholder="Your request" /> }
        </div>
    )
}

export default Search