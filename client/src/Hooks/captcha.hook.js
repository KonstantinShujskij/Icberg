import {  useCallback, useState } from 'react'
import useCaptchaApi from '../API/captcha.api'


export default function useCaptcha() {
    const [token, setToken] = useState(null)
    const [image, setImage] = useState('')
    const [rotate, setRotate] = useState(0)

    const { getCaptcha } = useCaptchaApi()
  
    const refresh = useCallback(async () => {
        const data = await getCaptcha()
        if(!data) { return }

        const { token, image } = data
 
        setToken(token)
        setImage(image)
        setRotate(0)
    }, [getCaptcha])

    const rotateRight = () => { setRotate((prew) => ((prew + 1) % 8)) }
    const rotateLeft = () => { setRotate((prew) => ((8 + prew - 1) % 8)) }

    return {
        bind: { image, rotate, refresh, rotateLeft, rotateRight },
        data: { token, answer: rotate },
        refresh    
    }
}