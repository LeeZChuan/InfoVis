//页面整体布局设计
import React, { useState } from 'react';
//图表引入
import PieChart from './components/pieChart';
import CarNumLineChart from './components/carNum_LineChart'
import CarNumText from './components/carNum_TextBox'
import InstrumentChart1 from './components/instrumentChart1';
import MultipleyaxisChart from './components/dataValidity';
import Barycategory from './components/bar-ycategory';
import BarycategoryCobo from './components/bar-ycategoryCobo';
import EverydayLine from './components/everydayLine';
import DataSeries_PieChart from './components/dataSeries_PieChart';
import DataIntegrityLineChart from './components/dataIntegrity/timeLineChart/index';
import TimeLineChart from './components/dataIntegrity/timeseriesConpoment/lineChart';
import StactterPieChart from './components/dataIntegrity/timeseriesConpoment/stactterPieChart';
import { Layout, Row, Col, Divider, Card } from 'antd';
import { Button } from 'antd/lib/radio';
import { RetweetOutlined } from '@ant-design/icons'
const { Footer, Content } = Layout;

//背景颜色：白色#fff
//黑色#111111，，配图颜色折线color: ['#28E9F6', '#FFC051', '#00FFAE'],
//深蓝色'#021434，，配图颜色折线var colorArr=['#00DAFF','#0058B4','#7F5BEA','#34CD7F'],
const frontStyle = { front: '#fff' };

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
        <Layout style={{ backgroundColor: '#080b30',position:'absolute', width: 'auto',left:0,right:0 }}>
            <Content>
            
                <Divider id="onlineData" orientation="left" style={frontStyle}>实时展示栏目</Divider>
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
                    <Col md={8}>
                        饼状图
                        <PieChart />
                    </Col>

                    <Col md={16}>
                        堆叠图
                        <MultipleyaxisChart />
                    </Col>
                </Row>
                <Divider orientation="left">数据时效性</Divider>
                <Row gutter={10}>
                    <Col md={24}>
                        各类时效性概况图
                        <Barycategory />
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col md={24}>
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
                    <Col md={8}>
                        各类时效性地图联动效果
                        <DataSeries_PieChart />
                    </Col>
                    <Col md={16}>
                        每日采集数量折线图
                        <EverydayLine />
                    </Col>
                </Row>
            </Content>
            <Footer style={{backgroundColor: '#080b30', width: 'auto', textAlign: 'center',color:'#fff' }}>Created by TYKJ</Footer>
        </Layout >)
}

export default Dashborad;