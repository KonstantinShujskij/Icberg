import { useDispatch } from 'react-redux'
import { setMess, clearMess } from '../redux/actions/alert.actions'


export default function useAlert() {
    const dispatch = useDispatch()
    
    const pushMess = (mess) => {
        dispatch(setMess(mess))
        
        setTimeout(() => dispatch(clearMess()), 1500)  
    }

    return { 
        pushMess
    }
}