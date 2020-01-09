import React, { Component } from 'react'
import { Form, Input, Icon, Checkbox, Button, Card } from "antd"
import "./index.less"
import {login} from "../../actions/users"
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom"
const mapState = state=>{
    return {
        isLogin:state.users.isLogin,
        isLoading:state.users.isLoading
    }
}
@Form.create()
@connect(mapState,{login})
class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                this.props.login(values)
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            this.props.isLogin?<Redirect to="/admin"/>:
            <Card
                title={"xx-login"}
                className="xx-login"
            >
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                disabled={this.props.isLoading}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                disabled={this.props.isLoading}
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox disabled={this.props.isLoading}>Remember me</Checkbox>)}
                        <Button loading={this.props.isLoading} type="primary" htmlType="submit" className="login-form-button">
                            登录
                    </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
export default Login