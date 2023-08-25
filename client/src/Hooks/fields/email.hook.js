import useInput from '../input.hook'


export default function useEmail(defaultValue='') {
    const validation = (value) => (value.length <= 42)
    const check = (value) => {
        const pattern = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/
        return pattern.test(value) 
    }
    const tooltip = 'Email has to be correctly' 

    const input = useInput(defaultValue, validation, check)

    return {...input, tooltip}
}