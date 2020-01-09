import React, { Component } from 'react'
import { Layout, Menu, Icon, Dropdown, Badge, Avatar } from 'antd';
import Logo from "./logo.png"
import "./index.less"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {receiveNotifications} from "../../actions/notifications"
import {exit} from "../../actions/users"
const { Header, Content, Sider } = Layout;
const mapState = state=>{
    return {
        notificationsCount:state.notifications.list.filter(item=>item.hasRead===false).length,
        avatar:state.users.avatar,
        displayName:state.users.displayName
    }
}
@connect(mapState, {receiveNotifications,exit})
@withRouter
class index extends Component {
    componentDidMount(){
        this.props.receiveNotifications()
    }
    handleClick=({key})=>{
        if(key === "/exit"){
            this.props.exit()
        }else{
            this.props.history.push(key)
        }
    }
    menu = ()=>{
        return (
            <Menu onClick={this.handleClick}>
              <Menu.Item key={"/admin/notifications"}>
                  <Badge dot={Boolean(this.props.notificationsCount)}>
                    通知中心
                  </Badge>
              </Menu.Item>
              <Menu.Item key={"/admin/settings"}>
                个人设置
              </Menu.Item>
              <Menu.Item key={"/exit"}>
                退出
              </Menu.Item>
            </Menu>
        )
    } 
    render() {
        let selectPath = this.props.location.pathname.split("/")
        selectPath.length = 3
        return (
            <Layout>
                <Header className="header xx-header">
                    <div className="logo ">
                        <img className="xx-logo" src={Logo} alt=""/>
                    </div>
                    <Dropdown overlay={this.menu()}>
                        <div className="ant-dropdown-link">
                            <Avatar src={this.props.avatar} />
                            <span>{this.props.displayName}</span>
                            <Badge offset={[-15,-6]} count={this.props.notificationsCount}>
                                <Icon type="down" />
                            </Badge>
                        </div>
                    </Dropdown>,
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                        mode="inline"
                        selectedKeys={[selectPath.join("/")]}
                        style={{ height: '100%', borderRight: 0 }}
                        onClick={this.handleClick}
                        >
                            {
                                this.props.menu.map(item=>{
                                    return (
                                        <Menu.Item key={item.pathname}>
                                            <Icon type={item.icon} />
                                            {item.title}
                                        </Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '16px' }}>
                        <Content
                        style={{
                            background: '#fff',
                        }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
export default index