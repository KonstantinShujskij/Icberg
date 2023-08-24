import useApi from "../Hooks/api.hook"


export default function useCaptchaApi() {
    const { publicRequest } = useApi()

    const getCaptcha = async () => {
        try { return await publicRequest('api/captcha/get') }
        catch(error) { return null } 
    }

    return { 
        getCaptcha
    }
}