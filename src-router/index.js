import React from "react"
import App from "./App"
import {render} from "react-dom"
import {HashRouter as Router} from "react-router-dom"
render(
    <Router>
        <App/>
    </Router>,document.getElementById("root"))