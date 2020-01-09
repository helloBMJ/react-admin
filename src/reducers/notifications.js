//纯函数固定的输入必须要有固定的输出，内部不能有Math.random这种类似的不纯粹的操作
//状态与视图一一对应，不能对之前的状态进行任何的更改

import {
    MARK_NOTIFICATIONS,
    MARK_NOTIFICATIONS_BY_ID,
    START_NOTIFICATIONS,
    END_NOTIFICATIONS,
    RECEIVE_NOTIFICATIONS
} from "../actions/actionType"
const initState = {
    list:[],
    isLoading:false
}
const reducer = (state=initState,action)=>{
    switch (action.type) {
        case RECEIVE_NOTIFICATIONS:
            return {
                ...state,
                list:action.payload.list
            }
        case START_NOTIFICATIONS:
            return {
                ...state,
                isLoading:true
            }
        case END_NOTIFICATIONS:
            return {
                ...state,
                isLoading:false
            }
        case MARK_NOTIFICATIONS_BY_ID:
            return {
                ...state,
                list:state.list.map(item=>{
                    if(item.id === action.payload.id){
                        item.hasRead = true
                    }
                    return item
                })
            }
        case MARK_NOTIFICATIONS:
            return {
                ...state,
                list:state.list.map(item=>{
                    item.hasRead = true
                    return item
                })
            }
        default:
            return state          
    }
}

export default reducer