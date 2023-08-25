import useInput from '../input.hook'

export default function useWebsite(defaultValue='') {
    const validation = (value) => (value.length <= 36)
    const check = (value) => {
        if(value.length === 0) { return true }
        if(value.length >= 3 && value.length <= 36) { return true }

        return false
    }
    
    const tooltip = 'Website has to be in range 3 - 36' 

    const input = useInput(defaultValue, validation, check)

    return {...input, tooltip}
}