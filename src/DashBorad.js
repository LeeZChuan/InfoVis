//页面整体布局设计
import React, { useState,useEffect } from 'react';
//图表引入
import PieChart from './components/pieChart';
import CarNumLineChart from './components/carNum_LineChart'
import CarNumText from './components/carNum_TextBox'
import InstrumentChart1 from './components/instrumentChart1';
import MultipleyaxisChart from './components/multiple-yaxisChart';
import Barycategory from './components/bar-ycategory';
import BarycategoryCobo from './components/bar-ycategoryCobo';
import EverydayLine from './components/everydayLine';
import DataSeries_PieChart from './components/dataSeries_PieChart';
// import ControlMap from './components/Map/controlMap';
import DataIntegrityLineChart from './components/dataIntegrity/timeLineChart/index';
import TimeLineChart from './components/dataIntegrity/timeseriesConpoment/lineChart';
import StactterPieChart from './components/dataIntegrity/timeseriesConpoment/stactterPieChart';
import { Layout, Row, Col, Divider } from 'antd';
import { Button } from 'antd/lib/radio';
import { RetweetOutlined } from '@ant-design/icons'
const { Footer, Content } = Layout;


const Dashborad = () => {
    const [showChart, setshowChart] = useState(true);//图表切换状态
    //图表切换 
    const showSwitch = () => {
        setshowChart(!showChart);
    }

    // useEffect(()=>{
    //     let dom =document.getElementById('instrumentChart1');
    //     let dom1 =document.getElementById('timeLineChart')
    //     if(dom){
    //         console.log("仪表盘渲染完成")
    //         console.log(dom);
    //     }
    //     else{
    //         console.log('渲染失败')
    //     }
    //     if(dom1){
    //         console.log('折线图渲染完成')
    //         console.log(dom1);
    //     }else{
    //         console.log('渲染失败！！！！')
    //     }
    // })

    return (
        <Layout>
            <Content>
                <Divider id="onlineData" orientation="left">实时展示栏目</Divider>
                <Row orientation="left">
                    <Col span={24}>实时时间展示窗口</Col>
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
                <Divider id="basicData" orientation="left">数据完整性展示</Divider>
                <Row gutter={16}>
                    <Col className="gutter-row" span={12}>
                        <Button shape="circle" icon={<RetweetOutlined />} onClick={showSwitch}>Trunsform</Button>
                        <div>
                            {showChart ? (
                                <TimeLineChart />
                            ) : (<StactterPieChart />)
                            }
                        </div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        带有时间序列的终端装车量
                        <DataIntegrityLineChart />
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
                        {/* <ControlMap/> */}
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
            {/* 右上角浮动窗口 */}
            {/* <Affix style={styles.affixBox}>
                <Anchor offsetTop={50} affix={false}>
                    <Anchor.Link href='#onlineData' title='实时展示栏目' />
                    <Anchor.Link href='#basicData' title='数据完整性展示栏目' />
                    <Anchor.Link href='#select' title='数据有效性栏目' />
                    <Anchor.Link href='#filterOrSort' title='数据时效性栏目' />
                    <Anchor.Link href='#remoteLoading' title='数据时效性地理信息展示' />
                    <Anchor.Link href='#unfold' title='数据连续性' />
                </Anchor>
            </Affix> */}

            <Footer style={{ textAlign: 'center' }}>Created by Lee</Footer>
        </Layout >)
}

export default Dashborad;