//页面整体布局设计
import React from 'react';
import PieChart from './components/pieChart';
import InstrumentChart from './components/instrumentChart';
import InstrumentChart1 from './components/instrumentChart1';
import LineChart from './components/lineChart';
import TimeLineChart from './components/timelineChart';
import { Layout, Row, Col, Card } from 'antd';
// import { Row, Col, Divider } from 'antd';
import 'antd/dist/antd.css';
const { Header, Footer, Sider, Content } = Layout;

const style = { background: '#0092ff', padding: '8px 0' };
const frontstyle = { background: '#fff', padding: '3px 0' };

export default () => (

   <Layout>
      <Header>
         <div style={frontstyle}>数据质量分析平台</div></Header>
      <Content>
         <Row orientation="left">
            <Col span={24}>实时时间展示窗口</Col>
         </Row>
         <Row gutter={16}>
            <Col className="gutter-row" span={6}>
               <div>
                  <Card bordered={true}>
                  <InstrumentChart />
                  </Card>
                  <Card bordered={true}>
                  <InstrumentChart1 />
                  </Card>
                  </div>
            </Col>
            <Col className="gutter-row" span={12}>
               <LineChart/>
            </Col>
            <Col className="gutter-row" span={6}>
               <TimeLineChart/>
            </Col>
         </Row>
         <Row gutter={10}>
            <Col md={8}> </Col>

            <Col md={8}><LineChart /></Col>

         </Row>
      </Content>
      <Footer>Footer</Footer>
   </Layout>)