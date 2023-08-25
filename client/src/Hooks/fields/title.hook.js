import useInput from '../input.hook'

export default function useTitle(defaultValue='') {
    const validation = (value) => (value.length <= 36)
    const check = (value) => (value.length >= 6 && value.length <= 36) 
    const tooltip = 'Title has to be in range 6 - 36' 

    const input = useInput(defaultValue, validation, check)

    return {...input, tooltip}
}