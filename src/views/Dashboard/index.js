import React, { Component,createRef } from 'react'
import { Card } from 'antd'
import echarts from "echarts"
export default class Dashboard extends Component {
    option = {
        title: {
            text: '文章阅读量'
        },
        tooltip: {},
        legend: {
            data:['阅读量']
        },
        xAxis: {
            data: ["星期一","星期二","星期三","星期四","星期五","星期六"]
        },
        yAxis: {},
        series: [{
            name: '阅读量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };
    constructor(){
        super()
        this.articleAmount = createRef()
    }
    initArticleEcharts=()=>{
        this.articleCharts = echarts.init(this.articleAmount.current)
        this.articleCharts.setOption(this.option);
    }
    componentDidMount(){
        this.initArticleEcharts()
    }
    render() {
        return (
            <Card
                title="浏览数"
            >
                <div ref={this.articleAmount} style={{height:420}}></div>
            </Card>
        )
    }
}
