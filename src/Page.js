/* 
页面跳转
编写者：lzc
时间：2021-7-20 
*/


import React from 'react';
import { HashRouter as Router, Route, Switch, } from 'react-router-dom';
//由于BrowserRouter每次请求都会向服务器发送请求，而hashrouter会在路径添加#分隔路径，然后后面的所有请求都不会发送到服务器端
//如果做服务端渲染的话建议使用BrowserRouter，否则使用hashrouter
//组件
import Nav from './components/Topnavigation/index';
// import BasicLayout from './components/TopDashborad/layout';//首页进入的操作预览页面
import NotFound from './components/Page/NotFound';
import Test from './scroll';
// import Map from './components/Map';
import DashBorad from './components/Page/DashBorad';
import Execl_DashBorad from './components/Page/execl_DashBorad';

export default () => (
    <Router>
        
            <Nav />
            <Switch>
                <Route path="/" exact component={DashBorad} />
                <Route path="/index" exact component={DashBorad} />
                <Route path="/download" component={Execl_DashBorad} />
                <Route path="/404" component={NotFound} />
                <Route path="/test" component={Test} />
                {/* <Route path="/Map" component={Map} /> */}
            </Switch>

       
    </Router>
);