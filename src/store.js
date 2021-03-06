
/* 
   全局持久化状态储存-用于管理全局变量
   编写者：lzc
   创建时间：2021-7-1
*/

import React, { createContext, useState } from 'react';
const AppContext = createContext();//创建context对象

export function AppProvider(props) {
    const [list, setlist] = useState({
        nowChooseCarBrand: "ALL",
        nowChooseCarStyle: "ALL",
        nowCho_CarDevNaData: "ALL",
        startTime: "2021-01-01",
        endTime: "2021-09-01"
    });
    const [selectPage, setselectPage] = useState(true);//表格与可视化图标页面路由切换状态
    const [selectNum, setselectNum] = useState(false);//动态滚动提示栏数据更新情况状态
    const [tableloading, settableloading] = useState(false);//表格加载状态
    return <AppContext.Provider value={{ list, setlist, selectPage, setselectPage, selectNum, setselectNum,tableloading,settableloading }}>{props.children}</AppContext.Provider>
}

export default AppContext;