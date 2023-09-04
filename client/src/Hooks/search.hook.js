import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import * as selectorsCmd from '../redux/selectors/command.selectors'

import useInput from './input.hook'


export default function useSearch(callback) {
    const cmd = useSelector(selectorsCmd.cmd)

    const [isOpen, setIsOpen] = useState(false)
    const query = useInput('')

    query.bind.onKeyDown = (event) => { 
        if(event.key === 'Enter') { callback(query.value) } 
    }

    useEffect(() => {   
        if(cmd === 'search') { 
            if(!isOpen) { return setIsOpen(true) } 

            callback(query.value) 
        } 
    }, [cmd]) 

    return { 
        query: query.value,
        bind: {
            isOpen,
            input: query
        }
    }
}