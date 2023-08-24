import useApi from "../Hooks/api.hook"


export default function useUserApi() {
    const { publicRequest, protectedRequest } = useApi()

    const loginUser = async (email, password, captcha) => {
        try { return await publicRequest('api/auth/login', {email, password, captcha}) }
        catch(error) { return null } 
    }

    const verifyUser = async (token) => {
        try { return await publicRequest('api/auth/verify', {token}) }
        catch(error) { return null } 
    }

    const loadUser = async () => {
        try { return await protectedRequest('api/author/load') }
        catch(error) { return null } 
    } 

    const updateUser = async (form) => {
        try { return await protectedRequest('api/author/update', form, 'form') }
        catch(error) { return false } 
    } 

    return { 
        loginUser,
        verifyUser,
        loadUser,
        updateUser
    }
}