import { combineReducers } from 'redux'
import authRuducer from './authRuducer'
import userReducer from './userReducer'
import alertReducer from './alertRuducer'


const rootReducer = combineReducers({
    auth: authRuducer,
    user: userReducer,
    alert: alertReducer
})

export default rootReducer