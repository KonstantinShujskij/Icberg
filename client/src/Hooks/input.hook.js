import {  useState } from "react"


export default function useInput(defaultValue='') {
    const [value, setValue] = useState(defaultValue)

    const onChange = (event) => { 
        const tempValue = event.target.value
        changeValue(tempValue)    
    }

    const changeValue = (newValue) => { 
        if(newValue !== value) { setValue(newValue) } 
    }

    return {
        bind: { value, onChange },
        value,
        changeValue,
    }
}