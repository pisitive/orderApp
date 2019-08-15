import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import {NavLink} from "react-router-dom"

import logo from '../../assets/logo.png'
import style from './index.less'

export default class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedKeys: []
        }
    }
    
    componentDidMount() {
        //页面刷新改变key值
        const {pathname} = this.props.location
        this.handleSelectedKeys(pathname)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        //路由改变时，改变key值
        const {pathname} = this.props.location
        if (nextProps.location.pathname !== pathname) {
            this.handleSelectedKeys(nextProps.location.pathname)
        }
    }

    handleSelectedKeys(pathname) {
        const temp = pathname.split('/')
        const key = temp && temp.length < 2 ? 'home' : temp[1]
        this.setState({
            selectedKeys: [key]
        })
    }
    
    render() {
        const {selectedKeys} = this.state
        return (
            <nav className={style.header}>
                <a href="https://ant.design/" className={style.logo}>
                    <img src={logo} alt="logo" />
                </a>
                <Menu defaultSelectedKeys={['home']} mode="horizontal" 
                    className={style['menu-left']} selectedKeys={selectedKeys}>
                    <Menu.Item key="home">        
                        <NavLink to='/home'><Icon type="home" />主页</NavLink>
                    </Menu.Item>
                    <Menu.Item key="menu">
                        <NavLink to='/menu'><Icon type="menu" />菜单</NavLink>
                    </Menu.Item>
                    <Menu.Item key="manage">
                        <NavLink to='/manage'><Icon type="appstore" />管理</NavLink>                   
                    </Menu.Item>
                    <Menu.Item key="about">
                        <NavLink to='/about'><Icon type="contacts" />关于我们</NavLink>
                    </Menu.Item>
                    <Menu.Item key="login" className={style.login}>
                        <NavLink to='/login'><Icon type="login" />登陆</NavLink>     
                    </Menu.Item>
                    <Menu.Item key="register" className={style.register}>
                        <NavLink to='/register'><Icon type="user" />注册</NavLink>
                    </Menu.Item>
                </Menu>
            </nav>
        );
    }
}
