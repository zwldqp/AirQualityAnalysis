import React, { Component } from 'react';
import { List } from 'antd';
import axios from 'axios'
import ReactEcharts from 'echarts-for-react'

export default class SearchData extends React.Component {
    state = {
        data: []
    }

    componentWillMount() {
        axios.get("http://localhost:4000/News").then(res => { this.setState({ data: res.data }); console.log(res) })
    }

    render() {
        return (
            <div>
                <List
                    header={<div>你关心的</div>}
                    footer={<div>看的很多该休息啦，一会儿再来吧</div>}
                    bordered
                    dataSource={this.state.data}
                    renderItem={item => (<List.Item><a href={item.link}>{item.title}</a></List.Item>)}
                />
            </div>
        )
    }
}