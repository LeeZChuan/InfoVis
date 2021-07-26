import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
//组件
import BasicLayout from './components/layout';
import NotFound from './components/Page/NotFound';
import DashBorad from './DashBorad';
import Execl_DashBorad from './execl_DashBorad';

export default () => (
    <Router>
        <Switch>
            <Router exact path="/" component={BasicLayout}></Router>
            <Route exact path="/index" component={DashBorad} />
            <Route path="/download" component={Execl_DashBorad} />
            <Route path="/404" component={NotFound} />
        </Switch>
    </Router>
);