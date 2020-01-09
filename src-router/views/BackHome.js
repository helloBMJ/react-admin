import React, { Component } from 'react'
import { withRouter } from "react-router-dom";

@withRouter
class BackHome extends Component {
    backHome = ()=>{
        this.props.history.push("/home")
    }
    render() {
        return (
            <div>
                <button onClick={this.backHome} type="button" className="btn btn-default">返回首页</button>
            </div>
        )
    }
}
export default BackHome