//React项目入口文件
import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
// import App from './App copy';
import App from './DashBorad';
import { AppProvider } from './store';
// import './style/index.less';


ReactDOM.render(<AppProvider>
    <App />
</AppProvider>, document.getElementById("root"))