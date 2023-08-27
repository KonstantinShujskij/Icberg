import { useDispatch } from 'react-redux'
import { setCommand, clearCommand } from '../redux/actions/command.actions'


export default function useCommand() {
    const dispatch = useDispatch()
    
    const pushCmd = (cmd) => {
        dispatch(setCommand(cmd))
        
        setTimeout(() => dispatch(clearCommand(cmd)), 1500)  
    }

    return { 
        pushCmd
    }
}