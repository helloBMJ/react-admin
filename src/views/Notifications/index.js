import React, { Component } from 'react'
import { Card, Button,List, Badge, Spin } from 'antd'
import {connect} from "react-redux"
import {markNotificationsById,markNotifications} from "../../actions/notifications"
const mapState = state=>{
    return {
        list:state.notifications.list,
        isLoading:state.notifications.isLoading
    }
}
@connect(mapState, {markNotifications,markNotificationsById})
class Notifications extends Component {
    render() {
        return (
            <Spin spinning={this.props.isLoading}>
                <Card
                title="通知中心"
                extra={<Button onClick={this.props.markNotifications} disabled={this.props.list.every(item=>item.hasRead===true)}>全部已读</Button>}
            >
                    <List
                        itemLayout="horizontal"
                        dataSource={this.props.list}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                                    description={item.desc}
                                />
                                <div>{item.hasRead?"":<Button onClick={this.props.markNotificationsById.bind(this,item.id)}>标记已读</Button>}</div>
                            </List.Item>
                        )}
                    />
                </Card>
            </Spin>
        )
    }
}
export default Notifications