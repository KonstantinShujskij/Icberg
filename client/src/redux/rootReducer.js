import { combineReducers } from 'redux'
import authRuducer from './authRuducer'
import userReducer from './userReducer'
import alertReducer from './alertRuducer'
import commandReducer from './commandReducer'


const rootReducer = combineReducers({
    auth: authRuducer,
    user: userReducer,
    alert: alertReducer,
    command: commandReducer
})

export default rootReducer