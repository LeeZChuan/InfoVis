import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
//组件
import Nav from './components/Topnavigation/index';
import BasicLayout from './components/TopDashborad/layout';
import NotFound from './components/Page/NotFound';
import Test from './scroll';
import DashBorad from './DashBorad';
import Execl_DashBorad from './execl_DashBorad';

export default () => (
    <Router>
            <Nav />
            <Switch>
                <Route path="/" exact component={BasicLayout} />
                <Route path="/index" component={DashBorad} />
                <Route path="/download" component={Execl_DashBorad} />
                <Route path="/404" component={NotFound} />
                <Route path="/test" component={Test} />
            </Switch>
    </Router>
);