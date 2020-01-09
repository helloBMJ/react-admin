import React, {Component} from 'react'
import {adminRoute} from "./routes"
import {Switch, Route, Redirect} from "react-router-dom"
import {Frame} from "./components"
import {connect} from 'react-redux'
const  menu = adminRoute.filter(route=>route.isNav === true)
const mapState = state=>{
    return {
        isLogin:state.users.isLogin,
        role:state.users.role
    }
}
@connect (mapState)
class App extends Component {
    render() {
        return (
            this.props.isLogin?
                <Frame menu={menu}>
                    <Switch>
                        {
                            adminRoute.map(route=>{
                                return <Route
                                    path={route.pathname}
                                    key={route.pathname}
                                    exact={route.exact}
                                    render={(routeProps)=>{
                                        const hasPermition = route.roles.includes(this.props.role)
                                        return hasPermition?<route.component {...routeProps}/>:<Redirect to="/admin/noauth"/>
                                    }}
                                />
                            })
                        }
                        <Redirect to="./admin/dashboard" from="/admin" exact/>
                        <Redirect to="/404" />
                    </Switch>
                </Frame>
            :
            <Redirect to="/login"/>
        )
    }
}
export default App