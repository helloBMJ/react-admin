

import {
    LOGINFAILED,
    LOGINSUCCSESS,
    STARTLOGIN
} from "../actions/actionType"

const isLogin = Boolean(localStorage.getItem("authToken")) || Boolean(sessionStorage.getItem("authToken"))
const users = JSON.parse(localStorage.getItem("users")) || JSON.parse(sessionStorage.getItem("users"))
const initState = {
    ...users,
    isLogin,
    isLoading:false,//登录时的loading状态
}


export default (state=initState,action)=>{
    switch (action.type) {
        case STARTLOGIN:
            return {
                ...state,
                isLoading:true//开始登录
            }
        case LOGINSUCCSESS:
            return {
                ...state,
                ...action.payload.userInfo,
                isLogin:true,
                isLoading:false//登录成功
            }
        case LOGINFAILED:
            return {
                ...state,
                isLogin:false,
                isLoading:false
            }
        default:
            return state
    }
}