//使用axios进行异步请求
import axios from "axios"
import {message} from "antd"
message.config({
    top: 200
});
//http://rap2api.taobao.org/app/mock/241703/api/articlelist
const isDev = process.env.NODE_ENV === "development"
const service = axios.create({
    baseURL:isDev ? "http://rap2api.taobao.org/app/mock/241703" : "http://rap2api.taobao.org/app/mock/241703"
})

const service2 = axios.create({
    baseURL:isDev ? "http://rap2api.taobao.org/app/mock/241703" : "http://rap2api.taobao.org/app/mock/241703"
})

//axios拦截器 （请求之前的拦截，响应之后的拦截）
//请求之前的拦截 作用
//可以在每次发起请求之前，可以在请求头上面携带一些数据传给后端
service.interceptors.request.use(config=>{
    config.data = {...config.data,authToken:"adfsfds"}
    return config
})

//响应之后的拦截，根据后端返回的状态码进行业务判断
service.interceptors.response.use(res=>{
    if(res.data.code === 200){
        return res.data.data
    }else{
        message.error(res.data.errMsg)
    }
})
//获取文章列表
export const getArticle = (offset,limited)=> {
    return service.post("/api/articlelist",{offset,limited})
}

//根据id删除文章
export const deleteArticleById = (id)=>{
    return service.post(`/api/articleDelete/${id}`)
}

//根据id查询编辑的文章详情

export const getArticleDetailById = id=>{
    return service.post(`/api/articlelist/${id}`)
}

//编辑页面的提交
export const saveArticleById = (id,data)=>{
    return service.post(`/api/articleEdit/${id}`, data)
}

//通知中心列表获取

export const getNotifications = ()=>{
    return service.post(`/api/notifications`)
}

//用户登录接口

export const requestLogin = (userInfo)=>{
    return service2.post(`/api/login`, userInfo)
}