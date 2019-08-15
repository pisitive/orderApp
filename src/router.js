import React from 'react'
import { Router, Route, Switch } from 'dva/router'
import IndexPage from './routes/IndexPage'
import About from './routes/About/about'
import Home from './routes/Home/home'
import Manage from './routes/Manage/manage'
import Menu from './routes/Menus/menus'
import Login from './routes/User/login'
import Register from './routes/User/register'
import History_order from './routes/About/History_order/History_order'
import Contact_us from './routes/About/Contact_us/Contact_us'
import Order_document from './routes/About/Order_document/Order_document'
import Express_information from './routes/About/Express_information/Express_information'


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={IndexPage} />
        <Route path="/home" component={Home} />
        <Route path="/manage" component={Manage} />
        <Route path="/menu" component={Menu} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/about/history_order" component={History_order} />
        <Route path="/about/contact_us" component={Contact_us} />
        <Route path="/about/order_document" component={Order_document} />
        <Route path="/about/express_information" component={Express_information} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
