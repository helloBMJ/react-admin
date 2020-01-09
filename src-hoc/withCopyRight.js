import React, { Component } from 'react'
//本质是一个函数接收一个组件，返回一个新的属性

const withCopyRight = Comp=>{
    return class withCopyRight extends Component{
        render(){
            return (
                <div>
                    <Comp {...this.props}/>
                    &copy;
                    野鸡
                </div>
            )
        }
    }
}
export default withCopyRight