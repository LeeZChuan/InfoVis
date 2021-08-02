//全局状态储存
import React, { createContext, useState } from 'react';
const AppContext = createContext();//创建context对象

export function AppProvider(props) {
    const [list, setlist] = useState({
        nowChooseCarBrand: "ALL",
        nowChooseCarStyle: "ALL",
        nowCho_CarDevNaData: "ALL",
        startTime: "2020-10-1",
        endTime: "2020-10-1"
    });
    const [selectPage, setselectPage] = useState(true);//表格与可视化图标页面路由切换状态
    const [selectNum, setselectNum] = useState(false);//动态滚动提示栏数据更新情况状态

    return <AppContext.Provider value={{ list, setlist, selectPage, setselectPage, selectNum, setselectNum }}>{props.children}</AppContext.Provider>
}

export default AppContext;