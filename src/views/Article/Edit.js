import React, { Component,createRef } from 'react'
import {Card, Button, Form, Input, Icon,DatePicker,message, Spin} from "antd"
import {getArticleDetailById,saveArticleById} from "../../request"
import E from "wangeditor"
import "./index.less"
import moment from "moment"
const FromLayout = {
    labelCol:{span:4},
    wrapperCol:{span:20}
}
const formTailLayout = {
    labelCol: {span:4},
    wrapperCol:{span:8,offset:4}
}
@Form.create()
class Edit extends Component {
    constructor(){
        super()
        this.contentRef = createRef()
        this.state = {
            isLoading:false
        }
    }
    handleSubmit = e => {
    e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.setState({isLoading:true})//显示loading
            if (!err) {
                values.currentAt = values.currentAt.valueOf();
                saveArticleById(this.props.match.params.id,values).then(res=>{
                    message.success(res.msg)
                    // console.log(res)
                }).finally(()=>{
                    this.setState({isLoading:false})//关闭loading
                    //返回列表
                    this.props.history.push("/admin/article")
                })
            }
        });
    };
    initEditor=()=>{
        this.editor = new E(this.contentRef.current)
        //编辑器里面的内容发生改变后获取里面的内容
        this.editor.customConfig.onchange =  html=> {
            // html 即变化之后的内容
            this.props.form.setFieldsValue({
                content:html
            })
        }
        this.editor.create()
    }
    getArticleDetail=()=>{
        //显示loading
        this.setState({
            isLoading:true
        })
        getArticleDetailById(this.props.match.params.id)
        .then(res=>{
            //将editor里面的内容也需要进行设置
            this.editor.txt.html(res.content)

            //需要将返回来的数据进行表单的设置
            this.props.form.setFieldsValue({
                title:res.title,
                author:res.author,
                amount:res.amount,
                currentAt:moment(res.currentAt),
                content:res.content,
            })
        }).finally(()=>{
            this.setState({
                isLoading:false
            })
        })
    }
    componentDidMount(){
        this.initEditor()
        this.getArticleDetail()
    }
    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <Card
                title="文章编辑"
                extra={<Button onClick={this.props.history.goBack}>返回</Button>}
            >
            <Spin spinning={this.state.isLoading}>
                <Form 
                    onSubmit={this.handleSubmit} 
                    className="login-form"
                    {...FromLayout}
                >
                    <Form.Item label={"用户名"}>
                        {getFieldDecorator('title', {
                            rules: [
                                { required: true,message: 'Please input your title!'},
                            ],
                            // initialValue:"请输入标题"
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="title"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label={"阅读量"}>
                        {getFieldDecorator('amount', {
                            rules: [
                                { required: true,message: 'Please input your amount!'},
                            ],
                            // initialValue:"请输入标题"
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="amount"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label={"作者"}>
                        {getFieldDecorator('author', {
                            rules: [
                                { required: true,message: 'Please input your author!'},
                            ],
                            // initialValue:"请输入标题"
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="author"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item label={"发布时间"}> 
                        {getFieldDecorator('currentAt', {
                            rules: [
                                { required: true,message: 'Please input your currentAt!'},
                            ],
                            // initialValue:"请输入标题"
                        })(
                            <DatePicker showTime placeholder="Select Time"/>
                        )}
                    </Form.Item>
                    <Form.Item label={"文章内容"}> 
                        {getFieldDecorator('content', {
                            rules: [
                                { required: true,message: 'Please input your content!'},
                            ],
                            // initialValue:"请输入标题"
                        })(
                            <div className="content" ref={this.contentRef}>

                            </div>
                        )}
                    </Form.Item>
                    <Form.Item 
                        {...formTailLayout}
                    >
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
            </Card>
        )
    }
}
export default Edit