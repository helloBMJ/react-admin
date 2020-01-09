import React, { Component } from 'react'
import withCopyRight from "./withCopyRight"
import About from "./About"
class App extends Component {
    render() {
        return (
            <div>
                <About name={"关于。。。"}/>
                App
            </div>
        )
    }
}
export default withCopyRight(App)