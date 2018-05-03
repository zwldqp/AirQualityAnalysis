import React, { Component } from 'react';
import { Menu, Icon, Switch } from 'antd';
import { Link } from 'react-router-dom'
const SubMenu = Menu.SubMenu;
export default class Header extends React.Component {
    state = {
        current: 'searchData',
    }
    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    render() {
        return (
            <div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    style={{display: 'flex',marginTop:10}}
                >
                    <Menu.Item key="searchData" style={{flex: 1}}>
                        <Link to='/SearcherData'><Icon type="search" />相关数据查询</Link>
                    </Menu.Item>
                    <Menu.Item key="UploadData" style={{flex: 1}}>
                        <Link to='/UploadData'><Icon type="upload" />上传数据建模</Link>
                    </Menu.Item>
                    <Menu.Item key="searchNews" style={{flex: 1}}>
                        <Link to='/SearchNews'><Icon type="heart-o" />时事新闻</Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}