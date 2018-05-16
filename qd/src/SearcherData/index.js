import React, { Component } from 'react';
import { Table, Icon, Divider } from 'antd';
import axios from 'axios'
import ReactEcharts from 'echarts-for-react'

export default class SearchData extends React.Component {
  state = {
    columns: [{
      title: '城市',
      dataIndex: 'city',
      key: 'city',
      render: (text, record) => <a href="#" onClick={this.handleClick} name={record.name}>{text}</a>,
    }],
    airColumns: [{
      title: 'PM2.5',
      dataIndex: 'pm25',
      key: 'pm25',
    }, {
      title: 'PM10',
      dataIndex: 'pm10',
      key: 'pm10',
    }, {
      title: 'SO2',
      dataIndex: 'so2',
      key: 'so2',
    }, {
      title: 'NO2',
      dataIndex: 'no2',
      key: 'no2',
    }, {
      title: 'CO',
      dataIndex: 'co',
      key: 'co',
    }, {
      title: 'O3',
      dataIndex: 'o3',
      key: 'o3',
    }, {
      title: 'AQI',
      dataIndex: 'aqi',
      key: 'aqi',
    }],
    futureColumns: [{
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    }, {
      title: '最高气温',
      dataIndex: 'high',
      key: 'high',
    }, {
      title: '最低气温',
      dataIndex: 'low',
      key: 'low',
    }, {
      title: '星期',
      dataIndex: 'day',
      key: 'day',
    }, {
      title: '天气',
      dataIndex: 'text',
      key: 'text',
    }, {
      title: '风力',
      dataIndex: 'wind',
      key: 'wind',
    }],
    data: [{ key: '1', city: '哈尔滨', name: 'CHHL000000' }, { key: '2', city: '双城', name: 'CHHL000100' }, { key: '3', city: '呼兰', name: 'CHHL000200' }, { key: '4', city: '阿城', name: 'CHHL000300' },
    { key: '5', city: '宾县', name: 'CHHL000400' }, { key: '6', city: '依兰', name: 'CHHL000500' }, { key: '7', city: '巴彦', name: 'CHHL000600' },
    { key: '8', city: '通河', name: 'CHHL000700' },
    { key: '9', city: '方正', name: 'CHHL000800' }, { key: '10', city: '延寿', name: 'CHHL000900' },
    { key: '11', city: '尚志', name: 'CHHL001000' }, { key: '12', city: '五常', name: 'CHHL001100' }, { key: '13', city: '木兰', name: 'CHHL001200' }],
    dataList: {},
    isShow: false,
    qualityData: []

  }

  getOption = () => {
    const option = {
      title: {
        text: 'AQI趋势图'
    },
      xAxis: {
        type: 'category',
        data: this.state.qualityData.map(item =>  item.date )
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: this.state.qualityData.map(item =>  item.aqi ),
        type: 'line',
        smooth: true
      }]
    }
    return option
  }
  componentWillMount() {
    axios.get("http://localhost:4000/getAirQulityData").then(res => { this.setState({ qualityData: res.data }); console.log(res) })
  }

  handleClick = (e) => {
    this.setState({ isShow: true })
    axios.get("http://localhost:4000/searchDataTest/" + e.target.name).then((res) => { this.setState({ dataList: res }); })
  }
  render() {
    console.log( this.state.qualityData.map(item => { console.log(item.date) }))
    return (
      <div>
        <ReactEcharts
          option={this.getOption()}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"} />
        <Table columns={this.state.columns} dataSource={this.state.data} />
        <p>{this.state.dataList.data ? this.state.dataList.data.weather[0].city_name : ''}</p>
        <p style={{ visibility: this.state.isShow ? 'visible' : 'hidden' }}>穿衣建议：{this.state.dataList.data ? this.state.dataList.data.weather[0].today.suggestion.dressing.brief : ''}</p>
        <p>{this.state.dataList.data ? this.state.dataList.data.weather[0].today.suggestion.dressing.details : ''}</p>
        <p style={{ visibility: this.state.isShow ? 'visible' : 'hidden' }}>感冒指数：{this.state.dataList.data ? this.state.dataList.data.weather[0].today.suggestion.flu.brief : ''}</p>
        <p>{this.state.dataList.data ? this.state.dataList.data.weather[0].today.suggestion.flu.details : ''}</p>
        <Table columns={this.state.airColumns} dataSource={this.state.dataList.data ? [this.state.dataList.data.weather[0].now.air_quality.city] : []} size="small" style={{ visibility: this.state.isShow ? 'visible' : 'hidden' }} />
        <Table columns={this.state.futureColumns} dataSource={this.state.dataList.data ? this.state.dataList.data.weather[0].future : []} size="small" style={{ visibility: this.state.isShow ? 'visible' : 'hidden' }} />
      </div>
    )
  }
}