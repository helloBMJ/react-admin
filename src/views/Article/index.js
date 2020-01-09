import React, { Component } from 'react'
import { Card, Button, Table, Tag, Modal, Typography,Tooltip } from 'antd';
import {getArticle,deleteArticleById} from "../../request"
import moment from "moment"
import XLSX from "xlsx"
const Text = Typography.Text
const ButtonGroup = Button.Group
const titleDisplayMap = {
  id: "id",
  title: "标题",
  author: "作者",
  amount: "阅读量",
  currentAt: "发布时间"
}
export default class ArticleList extends Component {
  state = {
    dataSource:[],
    columns:[],
    total:0,
    isLoading:false,  //默认不加载
    limited:10,//每页的条数
    offset:0,//页数
    isDeleteArticleModalShow:false,//modal是否显示，初始化的时候不显示
    deleteArticleTitle:"",//删除文章的标题
    isConfirmLoadingShow:false,//删除文章的loading
    isDeleteArticleId:""//删除文章的id
  }
  createColumns = (columnKeys)=>{
    const columns = columnKeys.map(item=>{
      if(item === "amount"){
        return {
          title:titleDisplayMap[item],
          render:(record)=>{
            let {amount} = record
            return (
              <Tooltip placement="topLeft" title={amount>350?"高于350":"低于350"}>
                <Tag color={amount>350?'green':'red'}>{amount}</Tag>
              </Tooltip>
            )
          },
          key:item,
        }
      }
      if(item === "currentAt"){
        return {
          title:titleDisplayMap[item],
          render:(record)=>{
            let {currentAt} = record
            return (
              <div>
                {
                  moment(currentAt).format("YYYY-MM-DD HH:mm")
                }
              </div>
            )
          },
          key:item,
        }
      }
      return {
        title:titleDisplayMap[item],
        dataIndex:item,
        key:item
      }
    })
    //在列的上面再添加一列
    columns.push({
        title:"操作",
        render:(record)=>{
          return (
            <ButtonGroup>
              <Button onClick={this.toEdit.bind(this,record)} size="small" type="primary">编辑</Button>
              <Button onClick={this.deleteArticle.bind(this,record)} size="small" type="danger">删除</Button>
            </ButtonGroup>
          )
        },
        key:"action",
    })
    return columns
  }
  toEdit=(record)=>{
    //跳入到编辑页面
    // this.props.history.push(`/admin/article/edit/${record.id}`)
    this.props.history.push({
      pathname:`/admin/article/edit/${record.id}`,
    })
  }
  onCancel=()=>{
    this.setState({
      isDeleteArticleModalShow:false
    })
  }
  onOk = ()=>{
    this.setState({isConfirmLoadingShow:true})
    deleteArticleById(this.state.isDeleteArticleId).then(res=>{
      // console.log(res)
    }).finally(()=>{
      this.setState({
        isConfirmLoadingShow:false,
        isDeleteArticleModalShow:false,
      },()=>{
        this.getData() 
      })
    })
    // this.setState({
    //   isDeleteArticleModalShow:false,
    //   deleteArticleTitle:""
    // })
  }
  //删除文章
  deleteArticle = (record)=>{
    this.setState({
      isDeleteArticleModalShow:true,
      deleteArticleTitle:record.title,
    })
    // Modal.confirm({
    //   title:"警告",
    //   content:<Text>确定删除<Text type="danger">{record.title}</Text>？</Text>,
    //   onOk:()=>{
    //      deleteArticleById(record.id).then(res=>{
    //       console.log(res)
    //     })
    //   }
    // })
  }
  getData = ()=>{
    getArticle(this.state.offset,this.state.limited).then(res=>{
      this.setState({isLoading:true})    //开始请求数据的时候需要进行加载
      const columnKeys = Object.keys(res.list[0])
      const columns = this.createColumns(columnKeys)
      this.setState({
        dataSource:res.list,
        columns,
        total:res.total,
        isLoading:false   //结束请求数据的时候需要进行加载
      })
    })
  }
  componentDidMount(){
    this.getData()
  }
  //点击页码时候触发
  onChange = (page, pageSize)=>{
    this.setState({
      offset:(page-1) * pageSize,
      limited:pageSize
    },()=>{//需要在第二个参数的回调函数使用，因为在这个回调函数里面获取到状态是最新的参数
      this.getData()
    })
  }
  onShowSizeChange = (current,size)=>{
    //回到首页
    this.setState({
      offset:0,
      limited:size
    },()=>{
      this.getData()
    })
  }
  toExcel = ()=>{
    //前端发起请求，后端传给前端一个下载地址
    const data = [Object.keys(this.state.dataSource[0])]  //id,title,amount,author...
    for(var i = 0; i<this.state.dataSource.length;i++){
      // data.push(Object.values(this.state.dataSource[i]))
      data.push([
        this.state.dataSource[i].id,
        this.state.dataSource[i].title,
        this.state.dataSource[i].author,
        this.state.dataSource[i].amount,
        moment(this.state.dataSource[i].currentAt).format("YYYY-MM-DD HH:mm")
      ])
    }
    const ws = XLSX.utils.aoa_to_sheet(data);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
		XLSX.writeFile(wb, `${this.state.offset / this.state.limited + 1}.xlsx`)
  }
    render() {
        return (
            <Card 
                title="文章列表" 
                extra={<Button onClick={this.toExcel}>导出Excel</Button>}
            >
                <Table 
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    rowKey={(record)=>record.id}
                    loading={this.state.isLoading}
                    pagination={{
                        total:this.state.total,//总张数
                        showQuickJumper:true,  //页面跳转
                        onChange:this.onChange,//点击页码
                        showSizeChanger:true,//是否可以改变页码
                        onShowSizeChange:this.onShowSizeChange,//改变页面后的回调函数
                        current:this.state.offset / this.state.limited + 1,
                        pageSizeOptions:["10","20","12","30"]//指定每页的数据
                    }}
                />
                 <Modal
                  visible={this.state.isDeleteArticleModalShow}
                  onCancel={this.onCancel}
                  onOk={this.onOk}
                  title={"警告！"}
                  confirmLoading={this.isConfirmLoadingShow}
                 >
                   <Text>确定删除<Text type="danger">{this.state.deleteArticleTitle}</Text>？</Text>
                 </Modal>
            </Card>
        )
    }
}