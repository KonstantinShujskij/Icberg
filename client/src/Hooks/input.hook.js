import {  useState } from 'react'


const noop = () => true

export default function useInput(defaultValue='', validation=noop, check=noop) {
    const [value, setValue] = useState(defaultValue)
    const [valid, setValid] = useState(true)

    const onChange = (event) => { 
        const tempValue = event.target.value
        if(!validation(tempValue)) { return }
        setValid(check(tempValue))

        changeValue(tempValue)    
    }

    const changeValue = (newValue) => { 
        if(newValue !== value) { setValue(newValue) } 
    }

    return {
        bind: { value, onChange },
        value,
        valid,
        changeValue
    }
}