import { combineReducers } from 'redux'
import authRuducer from './authRuducer'
import userReducer from './userReducer'


const rootReducer = combineReducers({
    auth: authRuducer,
    user: userReducer
})

export default rootReducer