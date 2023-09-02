import useInput from '../input.hook'

export default function useComent(defaultValue='') {
    const validation = (value) => (value.length <= 1000)
    const check = (value) => (value.length >= 150 && value.length <= 1000) 
    const tooltip = 'Comment has to be in range 150 - 1000' 

    const input = useInput(defaultValue, validation, check)

    return {...input, tooltip}
}