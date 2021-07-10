//页面整体布局设计
import React from 'react';
import LineChart from './components/lineChart';
import Clock from './components/TimeShow/index'
import { Layout, Row, Col, Card } from 'antd';
import { Select} from 'antd';
import 'antd/dist/antd.css';
const { Header } = Layout;
const { Footer, Content } = Layout;

const style = { background: '#0092ff', padding: '0 0' };
const titlestyle={margin: '0px  0px 50px 50px'}
const titlestyle1={margin: '0px 0px 700px 700px'}
const titlestyle2={margin: '0px 0px 400px 400px'}


export default () => (

   <Layout>
     <Header style={style}>
        <Row >
            <div style={titlestyle}>
                <Clock/>
            </div>
            <div style={titlestyle1}>
                数据质量分析平台
            </div>
            <div style={titlestyle2}>
                <Select
                    showSearch
                    style={{ width: 100 }}
                    placeholder="查询机型"
                >
                </Select>
                <Select
                    showSearch
                    style={{ width: 100 }}
                    placeholder="查询品牌"
                >
                </Select>
                <Select
                    showSearch
                    style={{ width: 100 }}
                    placeholder="查询终端"
                >
                </Select>
                <Select
                    showSearch
                    style={{ width: 100 }}
                    placeholder="查询时间"
                >
                </Select>
            </div>
        </Row>
    </Header>
      <Content>
         <Row orientation="left">
            <Col span={24}>实时时间展示窗口</Col>
         </Row>
         <Row gutter={16}>
            <Col className="gutter-row" span={6}>
               <div>
                  <Card bordered={true}>
                   
                  </Card>
                  <Card bordered={true}>
                
                  </Card>
               </div>
            </Col>
            <Col className="gutter-row" span={12}>
       
            </Col>
            <Col className="gutter-row" span={6}>
               带有时间序列的终端装车量
               <LineChart />
            </Col>
         </Row>
         <Row gutter={10}>
            <Col md={16}>
               饼状图
          
            </Col>

            <Col md={8}>
               堆叠图
              
            </Col>
         </Row>
         <Row gutter={10}>
            <Col md={16}>
               各类时效性概况图
        
            </Col>

            <Col md={8}>
               数据时效性-同步数据时长
          
            </Col>
         </Row>
         <Row gutter={10}>
            <Col md={32}>
               各类时效性地图联动效果
            </Col>
         </Row>
      </Content>
      <Footer>Footer</Footer>
   </Layout>)