import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import { Route, Redirect, Switch } from 'dva/router';
import { Layout, Menu} from 'antd';

import History_order from './History_order/History_order'
import Contact_us from './Contact_us/Contact_us'
import Order_document from './Order_document/Order_document'
import Express_information from './Express_information/Express_information'

export default class About extends Component {
    render() {
        const {Content, Sider} = Layout
        return (
            <Layout className="layout">
                <Layout>
                    <Sider width={260} style={{ background: '#fff'}}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['History_order']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <Menu.Item key="History_order">
                                <NavLink to='/about/history_order'>历史订餐</NavLink>
                            </Menu.Item>
                            <Menu.Item key="Contact_us">
                                <NavLink to="/about/contact_us">联系我们</NavLink>
                            </Menu.Item>
                            <Menu.Item key="Order_document">
                                <NavLink to="/about/order_document">点餐文档</NavLink>
                            </Menu.Item>
                            <Menu.Item key="Express_information">
                                <NavLink to="/about/express_information">快递信息</NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>   
                    <Content
                    width={500}
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                    >
                    <Switch>
                        <Route path="/about/history_order" component={History_order} />
                        <Route path="/about/contact_us" component={Contact_us} />
                        <Route path="/about/order_document" component={Order_document} />
                        <Route path="/about/express_information" component={Express_information} />
                        <Redirect to="/about/history_order"></Redirect>
                    </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
