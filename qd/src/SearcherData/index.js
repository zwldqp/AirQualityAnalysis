import React, { Component } from 'react';
import { Table, Icon, Divider } from 'antd';
import axios from 'axios'
const data =  [{key: '1',city:'哈尔滨',name:'CHHL000000'},{key: '2',city:'双城',name:'CHHL000100'},{key: '3',city:'呼兰',name:'CHHL000200'},{key: '4',city:'阿城',name:'CHHL000300'},
        {key: '5',city:'宾县',name:'CHHL000400'},{key: '6',city:'依兰',name:'CHHL000500'},{key: '7',city:'巴彦',name:'CHHL000600'},
    {key: '8',city:'通河',name:'CHHL000700'},
        {key: '9',city:'方正',name:'CHHL000800'},{key: '10',city:'延寿',name:'CHHL000900'},
    {key: '11',city:'尚志',name:'CHHL001000'},{key: '12',city:'五常',name:'CHHL001100'},{key: '13',city:'木兰',name:'CHHL001200'}];
const handleClick = (e) => {
    console.log(axios.get("http://tj.nineton.cn/Heart/index/all?city="+e.target.name+"&language=zh-chs&unit=c&aqi=city&alarm=1&key=78928e706123c1a8f1766f062bc8676b" ))
}
const columns = [{
    title: '城市',
    dataIndex: 'city',
    key:'city',
    render: (text,record) => <a href="#" onClick={handleClick} name={record.name}>{text}</a>,
}];
export default class SearchData extends React.Component {
    state={
        isShow: false
    }

    render(){
        return (
            <div>
                <Table columns={columns} dataSource={data} style={{width:'30%'}}/>
                <Table columns={columns} dataSource={data} size="small" style={{visibility: this.state.isShow ? 'visible': 'hidden' }} />
            </div>
        )
    }
}