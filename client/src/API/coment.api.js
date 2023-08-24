import useApi from "../Hooks/api.hook"


export default function useComentApi() {
    const { publicRequest, protectedRequest } = useApi()
    
    const createComent = async (arcle, text) => {
        try { return await protectedRequest('api/coment/create', {arcle, text}) }
        catch(error) { return false } 
    }

    const getComents = async (arcle) => {
        try { return await publicRequest('api/coment/byArcle', {arcle}) }
        catch(error) { return [] } 
    }

    return { 
        createComent,
        getComents
    }
}