import React, { Component } from 'react'
import BackHome from "./BackHome"
export default class ArticleDetail extends Component {
    // backHome= ()=>{
    //     this.props.history.push("/home")
    // }
    render() {
        return (
            <div>
                <BackHome/>
                ArticleDetail {this.props.match.params.id}
            </div>
        )
    }
}
