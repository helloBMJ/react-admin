
import {
    LOGINFAILED,
    LOGINSUCCSESS,
    STARTLOGIN
} from "./actionType"

import {requestLogin} from "../request"
const startLogin = ()=>{
    return {
        type:STARTLOGIN
    }
}


const loginSuccess = (userInfo)=>{
    return {
        type:LOGINSUCCSESS,
        payload:{
            userInfo
        }
    }
}

const loginFailed = ()=>{
    localStorage.removeItem("authToken")
    localStorage.removeItem("users")
    sessionStorage.removeItem("authToken")
    sessionStorage.removeItem("users")
    return {
        type:LOGINFAILED
    }
}

export const exit = ()=>{
    return dispatch =>{
        dispatch(loginFailed())
    }
}

export const login =(userInfo)=>{
    return dispatch=>{
        dispatch(startLogin())
        requestLogin(userInfo).then(res=>{
            const {authToken,...users} = res.data.data//id,avatar,displayname,role
            if(res.data.code === 200){
                if(userInfo.remember){
                    //记住用户名
                    localStorage.setItem("authToken",authToken)
                    localStorage.setItem("users",JSON.stringify(users))
                }else{
                    sessionStorage.setItem("authToken", authToken)
                    sessionStorage.setItem("users",JSON.stringify(users))
                }
                dispatch(loginSuccess(res.data.data))
            }else{
                dispatch(loginFailed())
            }
        })
    }
}