/* 
   数据可视化分析平台入口文件
   编写者：lzc
   创建时间：2021-7-2
*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './Page';
import { AppProvider } from './store';
import './style.css';
import 'antd/dist/antd.css';

ReactDOM.render(<AppProvider>
    <div class="all">
        <App />
    </div>
</AppProvider>, document.getElementById("root"))