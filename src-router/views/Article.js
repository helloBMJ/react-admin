import React, { Component } from 'react'
import {NavLink as Link} from "react-router-dom"
// import ArticleDetail from "./ArticleDetail"
export default class Article extends Component {
    render() {
        return (
            <div>
                <span><Link to="/article/1?from=article">文章一</Link></span>
                <span><Link to={{
                    pathname:"/article/2",
                    search:"from=article"
                }}>文章二</Link></span>
                {/* <Route path="/article/:id" component={ArticleDetail}/> */}
            </div>
        )
    }
}
