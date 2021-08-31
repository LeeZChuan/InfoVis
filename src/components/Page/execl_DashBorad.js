/* 
    页面整体布局设计--用于数据表格展示的布局效果
    编写者：lzc
    创建时间：2021-7-5
*/



import React from 'react';
import { Layout } from 'antd';
import TableDemo from '@/components/Table'
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