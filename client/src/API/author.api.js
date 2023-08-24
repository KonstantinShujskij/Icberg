import useApi from '../Hooks/api.hook'


export default function useAuthorApi() {
    const { publicRequest } = useApi()

    const getAuthor = async (id) => {
        try { return await publicRequest('api/author/get', {id}) }
        catch(error) { return null } 
    }

    return { 
        getAuthor
    }
}