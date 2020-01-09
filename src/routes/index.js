import {
    ArticleList,
    ArticleEdit,
    Dashboard,
    Login,
    NotFound,
    Settings,
    Notifications,
    NoAuth
} from "../views"

//用户未登录的界面
export const mainRoute = [
    {
        pathname: "/login",
        component: Login
    },
    {
        pathname: "/404",
        component:NotFound
    }
]

//用户登录之后的路由了

export const adminRoute = [
    {
        pathname: "/admin/dashboard",
        component:Dashboard,
        title: "仪表盘",
        isNav: true,
        icon:"dashboard",
        roles:["001","002","003"]
    },
    {
        pathname: "/admin/article",
        component:ArticleList,
        exact:true,
        title: "文章列表",
        isNav: true,
        icon: "unordered-list",
        roles:["001","002"]
    },
    {
        pathname: "/admin/article/edit/:id",
        component:ArticleEdit,
        roles:["001","002",]
    },
    {
        pathname: "/admin/notifications",
        component:Notifications,
        roles:["001","002","003"]
    },
    {
        pathname: "/admin/noauth",
        component:NoAuth,
        roles:["001","002","003"]
    },
    {
        pathname: "/admin/settings",
        component:Settings,
        title: "设置",
        isNav: true,
        icon: "setting",
        roles:["001"]
    },
]