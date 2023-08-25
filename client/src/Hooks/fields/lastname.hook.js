import useInput from '../input.hook'

export default function useLastname(defaultValue='') {
    const validation = (value) => (value.length <= 18)
    const check = (value) => (value.length >= 2 && value.length <= 18) 
    const tooltip = 'Lastname has to be in range 2 - 18' 

    const input = useInput(defaultValue, validation, check)

    return {...input, tooltip}
}