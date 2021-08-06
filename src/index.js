//React项目入口文件
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Page';
import { AppProvider } from './store';
import './style.css';
import 'antd/dist/antd.css';

ReactDOM.render(<AppProvider>
    <div className="all"><App /></div>
</AppProvider>, document.getElementById("root"))