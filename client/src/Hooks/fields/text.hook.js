import useInput from '../input.hook'

export default function useText(defaultValue='') {
    const validation = (value) => (value.length <= 50000)
    const check = (value) => (value.length >= 2000 && value.length <= 50000) 
    const tooltip = 'Text has to be in range 2000 - 50000' 

    const input = useInput(defaultValue, validation, check)

    return {...input, tooltip}
}