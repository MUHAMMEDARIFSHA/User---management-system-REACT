import { combineReducers } from "redux"
import AdminAuthReducer from "./adminAuthReducer"
import authReducer from "./authReducer"

const rootReducer = combineReducers({
    authReducer : authReducer,
    AdminAuthReducer:AdminAuthReducer
})

export default rootReducer