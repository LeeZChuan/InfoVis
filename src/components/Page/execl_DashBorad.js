//页面整体布局设计
import React from 'react';
import { Layout } from 'antd';
import TableDemo from '@/components/Table/indexdemo.js'
const { Footer, Content } = Layout;

const Dashborad = () => {
    return (<Layout>
        <Content>
            <TableDemo />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Created by TYKJ</Footer>
    </Layout>)
}

export default Dashborad;