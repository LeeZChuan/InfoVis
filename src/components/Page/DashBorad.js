//页面整体布局设计
import React, { useState } from 'react';
//图表引入
import PieChart from '@/components/onLine/online_ScattarChart';
import CarNumLineChart from '@/components/onLine/carNum_LineChart'
import CarNumText from '@/components/onLine/carNum_TextBox'
import InstrumentChart1 from '@/components/instrumentChart1';
import MultipleyaxisChart from '@/components/dataValidity/multiple';
import Barycategory from '@/components/bar-ycategory';
import BarycategoryCobo from '@/components/bar-ycategoryCobo';
import EverydayLine from '@/components/everydayLine';
import DataSeries_PieChart from '@/components/dataSeries_PieChart';
import CanIntegrityLineChart from '@/components/dataIntegrity/timeLineChart/index';//can数据完整度
import AllIntegrityLineChart from '@/components/dataIntegrity/timeseriesConpoment/lineChart';
import StactterPieChart from '@/components/dataIntegrity/timeseriesConpoment/stactterPieChart';
import { Layout, Row, Col, Divider } from 'antd';
import { Button } from 'antd/lib/radio';
import { RetweetOutlined } from '@ant-design/icons';
import './index.css';
const { Footer, Content } = Layout;

//背景颜色：白色#fff
//黑色#111111，，配图颜色折线color: ['#28E9F6', '#FFC051', '#00FFAE'],
//深蓝色'#021434，，配图颜色折线var colorArr=['#00DAFF','#0058B4','#7F5BEA','#34CD7F'],
const frontStyle = { color: '#fff' };

const Dashborad = () => {
    const [LineOrScatterChart, setLineOrScatterChart] = useState(true);//图表切换状态
   
    //图表切换 
    const showSwitch = () => {
        setLineOrScatterChart(!LineOrScatterChart);
    }
    return (
        <Layout style={{ backgroundColor: '#080b30' }} className="layout" >
            <Content>

                <Divider id="onlineData" orientation="left" style={frontStyle}>实时展示栏目</Divider>
                <Row orientation="left">
                    <Col span={24} style={frontStyle}>实时时间展示窗口</Col>
                </Row>
                <Row >
                    <Col className="gutter-row" span={8}>
                        <div>
                            <InstrumentChart1 />
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <CarNumLineChart />
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <CarNumText />
                    </Col>
                </Row>
                <Divider id="basicData" orientation="left" style={frontStyle}>数据完整性展示</Divider>
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                        <Button shape="circle" icon={<RetweetOutlined />} onClick={showSwitch}>转换</Button>
                 
                        <div>
                            {
                                LineOrScatterChart ? (
                                    <AllIntegrityLineChart />
                                ) : (<StactterPieChart />)

                            }
                        </div>
                    </Col>
                    <Col className="gutter-row" span={12} style={frontStyle}>
                        带有时间序列的终端装车量
                        <CanIntegrityLineChart />
                    </Col>
                </Row>
                <Divider orientation="left" style={frontStyle}>数据有效性</Divider>
                <Row gutter={10}>
                    <Col md={8} style={frontStyle}>
                        饼状图
                        <PieChart />
                    </Col>

                    <Col md={16} style={frontStyle}>
                        堆叠图
                        <MultipleyaxisChart />
                    </Col>
                </Row>
                <Divider orientation="left" style={frontStyle}>数据时效性</Divider>
                <Row gutter={10}>
                    <Col md={24} style={frontStyle}>
                        各类时效性概况图
                        <Barycategory />
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col md={24} style={frontStyle}>
                        数据时效性-同步数据时长
                        <BarycategoryCobo />
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col md={24} style={frontStyle}>
                        各类时效性地图联动效果
                        {/* <ControlMap/> */}
                    </Col>
                </Row>
                <Divider orientation="left" style={frontStyle}>数据连续性</Divider>
                <Row gutter={10}>
                    <Col md={8} style={frontStyle}>
                        <DataSeries_PieChart />
                    </Col>
                    <Col md={16} style={frontStyle}>
                        每日采集数量折线图
                        <EverydayLine />
                    </Col>
                </Row>
            </Content>
            <Footer style={{ backgroundColor: '#080b30', width: 'auto', textAlign: 'center', color: '#fff' }}>Created by TYKJ</Footer>
        </Layout >)
}

export default Dashborad;