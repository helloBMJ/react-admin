import App from "./App";
import React from "react"
import { render } from "react-dom"
import { ConfigProvider } from "antd"
import zh_CN from 'antd/es/locale/zh_CN';
import { mainRoute } from "./routes"
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import "./index.less"
import { Provider } from "react-redux"
import store from "./store"
render(
        <Provider store={store}>
                <ConfigProvider locale={zh_CN}>
                        <Router>
                                <Switch>
                                        <Route path="/admin" render={(routerProps) => {
                                                return <App {...routerProps} />
                                        }} />
                                        {
                                                mainRoute.map(route => {
                                                        return <Route key={route.pathname} path={route.pathname} component={route.component}></Route>
                                                })
                                        }
                                        <Redirect to="/admin" from="/" exact />
                                        <Redirect to="/404" />
                                </Switch>
                        </Router>
                </ConfigProvider>
        </Provider>
        , document.getElementById("root"))