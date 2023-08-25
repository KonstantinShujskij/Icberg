import useInput from '../input.hook'

export default function useDescription(defaultValue='') {
    const validation = (value) => (value.length <= 500)
    const check = (value) => (value.length >= 150 && value.length <= 500) 
    const tooltip = 'Description has to be in range 150 - 500' 

    const input = useInput(defaultValue, validation, check)

    return {...input, tooltip}
}