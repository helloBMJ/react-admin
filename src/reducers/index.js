import {combineReducers} from "redux"
//引入分支的reducer
import notifications from "./notifications"
import users from "./users"
const reducer = combineReducers({
    notifications,   //合并分支reducer
    users
})
export default reducer