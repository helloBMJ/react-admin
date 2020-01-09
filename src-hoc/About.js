import React, { Component } from 'react'
import withCopyRight from "./withCopyRight"
class About extends Component {
    render() {
        return (
            <div>
                About{this.props.name}
            </div>
        )
    }
}
export default withCopyRight(About)