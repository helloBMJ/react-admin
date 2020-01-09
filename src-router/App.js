import React, { Component } from 'react'
import {Route, Switch,Redirect,NavLink as Link} from "react-router-dom"
import Home from "./views/Home"
import Article from "./views/Article"
import NotFind from "./views/NotFind"
import ArticleDetail from "./views/ArticleDetail"
export default class App extends Component {
    state = {
        isLogin:true
    }
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/home">首页</Link></li>
                    <li><Link to="/article">文章</Link></li>
                </ul>
                <Switch>
                    <Route path="/home" render={(rootProps)=>{
                        return this.state.isLogin?<Home {...rootProps} x={1}/>:"没有登录"
                    }}></Route>
                    <Route path="/article" component={Article} exact></Route>
                    <Route path="/article/:id" component={ArticleDetail}/>
                    <Route path="/404" component={NotFind}/>
                    <Redirect to="/home" from="/" exact/>
                    <Redirect to="/404"/>
                </Switch>
            </div>
        )
    }
}
