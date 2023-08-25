import useInput from '../input.hook'


export default function usePassword(defaultValue='') {
    const validation = (value) => (value.length <= 24)
    const check = (value) => (value.length >= 8 && value.length <= 24) 
    const tooltip = 'Password has to be in range 8 - 24' 

    const input = useInput(defaultValue, validation, check)

    return {...input, tooltip}
}