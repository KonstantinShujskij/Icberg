import useApi from '../Hooks/api.hook'


export default function useArcleApi() {
    const { publicRequest, protectedRequest } = useApi()

    const getArcles = async (query) => {
        try { return await publicRequest('api/arcle/list', {query}) }
        catch(error) { return [] } 
    }

    const getArclesByAuthor = async (authorId, query) => {
        try { return await publicRequest('api/arcle/byAuthor', {author: authorId, query}) }
        catch(error) { return [] } 
    }

    const getArcle = async (id) => {
        try { return await publicRequest('api/arcle/get', {id}) }
        catch(error) { return null } 
    }

    const createArcle = async (form) => {
        try { return await protectedRequest('api/arcle/create', form, 'form') }
        catch(error) { return null } 
    }

    const updateArcle = async (form) => {
        try { return await protectedRequest('api/arcle/update', form, 'form') }
        catch(error) { return null } 
    }

    return { 
        createArcle,
        updateArcle,
        getArcle,
        getArcles,
        getArclesByAuthor
    }
}