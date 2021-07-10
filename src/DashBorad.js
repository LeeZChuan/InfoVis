//页面整体布局设计
import React, { useState } from 'react';
import PieChart from './components/pieChart';
import StactterPieChart from './components/stactterPieChart';
import Clock from './components/TimeShow/index'
import InstrumentChart from './components/instrumentChart';
import InstrumentChart1 from './components/instrumentChart1';
import MultipleyaxisChart from './components/multiple-yaxisChart';
import Barycategory from './components/bar-ycategory';
import BarycategoryCobo from './components/bar-ycategoryCobo';
import EverydayLine from './components/everydayLine';
import DataSeries_PieChart from './components/dataSeries_PieChart';
// import ControlMap from './components/Map/geo_controlMap';

import LineChart from './components/lineChart';
import TimeLineChart from './components/timelineChart';
import { Layout, Row, Col, Card } from 'antd';
import { Select, Divider } from 'antd';
import 'antd/dist/antd.css';
import { Button } from 'antd/lib/radio';

const { Option } = Select;
const { Header, Footer, Content } = Layout;


const style = { background: '#0092ff', padding: '0px 0px', heigh: '500px' };
const title = { background: '#0092ff', height: '60px', width: '100%', position: 'fixd' };
const titlestyle = { margin: '0px  0px 50px 50px' }
// const titlestyle1 = { height: '50px', width: '100%', left:'850px', position: 'fixed', color: '#fff', }
const titlestyle1 = { margin: '0px 0px 600px 600px', color: '#fff', font: 300 }
// const titlestyle2 = { height: '50px', width: '100%', left:'1500px', position: 'fixed', }
const titlestyle2 = { margin: '0px 0px 450px 450px' }

const Dashborad = () => {

    const [showChart, setshowChart] = useState(true);
    //图表切换
    const showSwitch = () => {
        setshowChart(!showChart);
    }

    return (<Layout>
        <Header style={style}>
            <Row>
                <div style={titlestyle}>
                    <Clock/>
                </div>
                <h1 style={titlestyle1}>
                    数据质量分析平台
                </h1>
                <div style={titlestyle2}>
                    <Select
                        showSearch
                        style={{ width: 100 }}
                        placeholder="查询品牌"
                    >
                    </Select>
                    <Select
                        showSearch
                        style={{ width: 100 }}
                        placeholder="查询机型"
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
            <Divider orientation="left">实时展示栏目</Divider>
            <Row orientation="left">
                <Col span={24}>实时时间展示窗口</Col>
            </Row>
            <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                    <div>
                        <InstrumentChart1 />
                    </div>
                </Col>
                <Col className="gutter-row" span={12}>
                    <Button onClick={showSwitch}>切换折线图与时间序列堆叠图</Button>
                    <div>
                        {showChart ? (
                            <TimeLineChart />
                        ) : (<StactterPieChart />)
                        }
                    </div>
                </Col>
                <Col className="gutter-row" span={6}>
                    带有时间序列的终端装车量
                    <LineChart />
                </Col>
            </Row>
            <Divider orientation="left">数据有效性</Divider>
            <Row gutter={10}>
                <Col md={16}>
                    饼状图
                    <PieChart />
                </Col>

                <Col md={8}>
                    堆叠图
                    <MultipleyaxisChart />
                </Col>
            </Row>
            <Divider orientation="left">数据时效性</Divider>
            <Row gutter={10}>
                <Col md={16}>
                    各类时效性概况图
                    <Barycategory />
                </Col>

                <Col md={8}>
                    数据时效性-同步数据时长
                    <BarycategoryCobo />
                </Col>
            </Row>
            <Divider orientation="left">数据时效性地理信息展示</Divider>
            <Row gutter={10}>
                <Col md={32}>
                    各类时效性地图联动效果
                </Col>
            </Row>
            <Divider orientation="left">数据连续性</Divider>
            <Row gutter={10}>
                <Col md={16}>
                    各类时效性地图联动效果
                    <DataSeries_PieChart />
                </Col>
                <Col md={16}>
                    每日采集数量折线图
                    <EverydayLine />
                </Col>
            </Row>
        </Content>
        <Footer>Created by Lee</Footer>
    </Layout>)
}

export default Dashborad;