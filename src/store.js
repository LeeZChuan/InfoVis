//全局状态储存
import React, { createContext, useState } from 'react';

const AppContext = createContext();
// const { Provider } = AppContext;

export function AppProvider(props) {
    const [ list, setlist ] = useState({});

    return <AppContext.Provider value={{ list, setlist }}>{props.children}</AppContext.Provider>
}

export default AppContext;