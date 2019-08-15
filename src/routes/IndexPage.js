import React from 'react';
import { connect } from 'dva';
import { Switch, Route, Redirect} from 'dva/router';
import { Layout} from 'antd';

import Home from './Home/home'
import Menus from './Menus/menus'
import Manage from './Manage/manage'
import About from './About/about'
import Login from './User/login'
import Register from './User/register'
import NavBar from '../components/NavBar/index'

import style from './IndexPage.scss';

const { Header, Content} = Layout

function IndexPage(props) {
    return (
        <Layout className="layout">
            <Header className={style.header}>
                <NavBar {...props} />
            </Header>
            <Content style={{ padding: '0 50px' }} className={style.content}>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    {/* 一级路由 */}
                    <Switch>
                        <Route path="/home" component={Home}></Route>
                        <Route path="/menu" component={Menus}></Route>
                        <Route path="/manage" component={Manage}></Route>
                        <Route path="/about" component={About}></Route>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/register" component={Register}></Route>
                        {/* 重定向 */}
                        <Redirect to="/home"></Redirect>
                    </Switch>
                </div>
            </Content>
        </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
