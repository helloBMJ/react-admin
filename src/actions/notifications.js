import {
    MARK_NOTIFICATIONS,
    MARK_NOTIFICATIONS_BY_ID,
    START_NOTIFICATIONS,
    END_NOTIFICATIONS,
    RECEIVE_NOTIFICATIONS
} from "./actionType"
import {getNotifications} from "../request"
const startNotifications = ()=>{
    return {
        type:START_NOTIFICATIONS
    }
}
const endNotifications = ()=>{
    return {
        type:END_NOTIFICATIONS
    }
}
export const receiveNotifications = ()=>{
    return dispatch=>{
        getNotifications().then(res=>{
            dispatch({
                type:RECEIVE_NOTIFICATIONS,
                payload:{
                    list:res.list
                }
            })
        })
    }
}
export const markNotificationsById = id =>{
    return dispatch=>{
        dispatch(startNotifications())
        setTimeout(() => {
            dispatch({//通过dispatch派发标志性信息的action给reducer
                type:MARK_NOTIFICATIONS_BY_ID,
                payload:{
                    id
                }
            })
            dispatch(endNotifications())
        }, 1000);
    }
}

export const markNotifications = ()=>{
    return dispatch=>{
        dispatch(startNotifications())
        setTimeout(() => {
            dispatch({type:MARK_NOTIFICATIONS})
            dispatch(endNotifications())
        }, 1000);
    }
}