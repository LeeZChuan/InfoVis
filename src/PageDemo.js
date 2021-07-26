import React from 'react';
import { HashRouter as Router, Route, Switch, } from 'react-router-dom';
import TopHeader from './components/Topnavigation/index';
import NotFound from './components/Page/NotFound';
import DashBorad from './DashBorad';
import Execl_DashBorad from './execl_DashBorad';

export default () => (
    <Router>
        <Switch>
            <Route exact path="/index" component={DashBorad} />
            <Route exact path="/download" component={Execl_DashBorad} />
            <Route exact path="/404" component={NotFound} />
        </Switch>
    </Router>
);