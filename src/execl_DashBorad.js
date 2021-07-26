//页面整体布局设计
import React, { useState, useEffect, useRef, useContext } from 'react';
//数据获取

import { Layout} from 'antd';
import Top from './components/Topnavigation/index'
import TableDemo from '../src/components/Table'

const { Footer, Content } = Layout;


const Dashborad = () => {

    return (<Layout>
        <Top />
        <Content>
            <TableDemo />
        </Content>
        <Footer style={{textAlign:'center'}}>Created by Lee</Footer>
    </Layout>)
}

export default Dashborad;