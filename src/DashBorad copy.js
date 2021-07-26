//页面整体布局设计
import React, { useState, useEffect, useRef, useContext } from 'react';
//数据获取
import { getCarBrandData, getCarStyle, getDeviceName } from './service/api';
//图表引入
import PieChart from './components/pieChart';
import CarNumLineChart from './components/carNum_LineChart'
import CarNumText from './components/carNum_TextBox'
import Clock from './components/TimeShow/index'
import InstrumentChart1 from './components/instrumentChart1';
import MultipleyaxisChart from './components/multiple-yaxisChart';
import Barycategory from './components/bar-ycategory';
import BarycategoryCobo from './components/bar-ycategoryCobo';
import EverydayLine from './components/everydayLine';
import DataSeries_PieChart from './components/dataSeries_PieChart';
// import ControlMap from './components/Map/controlMap';
import LineChart from './components/lineChart';
import TimeLineChart from './components/dataIntegrity/timeseriesConpoment/lineChart';
import StactterPieChart from './components/dataIntegrity/timeseriesConpoment/stactterPieChart';
import AppContext from './store';
import { Layout, Row, Col, Select, Divider, Space, DatePicker, Affix, Anchor } from 'antd';
import { Button } from 'antd/lib/radio';
import { RetweetOutlined,FullscreenOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import moment from 'moment';//时间组件
import screenfull from 'screenfull';
import { Link } from 'react-router-dom';

const { Header, Footer, Content } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;

const style = { background: '#0092ff', heigh: '500px' };
const titlestyle0 = { margin: '0px 0px 0px 50px' }
const titlestyle1 = { margin: '0px 0px 0px 340px', color: '#fff' }
const titlestyle2 = { margin: '0px 0px 0px 100px' }

const Dashborad = () => {
    const [showChart, setshowChart] = useState(true);//图表切换状态
    const [selectChoose, setselectChoose] = useState(false);//图表切换状态
    const [carBrand, setcarBrand] = useState([]);//初始化一个车辆品牌列表数组
    const [carStyle, setcarStyle] = useState([]);//初始化一个车辆机型数组
    const [carDeviceNameData, setcarDeviceNameData] = useState([]);//初始化一个车辆终端数组
    const [nowChooseCarBrand, setnowChooseCarBrand] = useState("");
    const [nowChooseCarStyle, setnowChooseCarStyle] = useState("");
    const [nowCho_CarDevNaData, setnowCho_CarDevNaData] = useState("");
    const [startTime, setstartTime] = useState('');//初始化一个时间终端数组
    const [endTime, setendTime] = useState('');//初始化一个时间终端数组
    const { list, setlist } = useContext(AppContext);
    //图表切换 
    const showSwitch = () => {
        setshowChart(!showChart);
    }
    //下拉时间选择
    const chooseTimeRange = (dates, dateStrings) => {
        setstartTime(dateStrings[0]);
        setendTime(dateStrings[1]);
    }
    //全屏化方法
    const fullScreen=()=>{
        screenfull.toggle()
    }
    //初始化下拉菜单的数据列表
    const initData = async () => {
        setcarBrand(await getCarBrandData());
    }
    //初始化下拉菜单的车辆类型数据列表
    const initcarStyleData = async (carBrand) => {
        setcarStyle(await getCarStyle(carBrand));
    }

    //初始化下拉菜单的车辆终端数据列表
    const initcardeviceNameData = async (carBrand, carType) => {
        setcarDeviceNameData(await getDeviceName(carBrand, carType));
    }

    //将选择车辆品牌、类型、终端操作，进行柯里化合并
    const chooseCarData = (dataType, e) => {
        switch (dataType) {
            case "carBrand":
                setnowChooseCarBrand(e);
                initcarStyleData(e);
                break;
            case "carStyle":
                setnowChooseCarStyle(e);
                initcardeviceNameData(nowChooseCarBrand, e);//初始化后面的数据数组
                break;
            case "carDeviceName":
                setnowCho_CarDevNaData(e);
                break;
        }
    }

    useEffect(() => {
        initData();//最一开始初始化车辆品牌方法
    }, [])

    return (
        <Layout>
            <Affix>
                <Header style={style}>
                    <Row>
                        <div>
                            <Clock />
                        </div>
                        <div style={titlestyle0}>
                            <Button><Link to="/download" >前往数据下载表格页面</Link></Button>
                        </div>
                        <h1 style={titlestyle1}>
                            数据质量分析平台
                        </h1>
                        <div style={titlestyle2}>
                            <Space>
                                <Select
                                    showSearch
                                    // mode="multiple" as const
                                    style={{ width: 130 }}
                                    // style={{ maxHeight: 32, overflow: 'hidden', width: 130 }}
                                    // placeholder={"查询品牌"}
                                    placeholder={selectChoose ? list.nowChooseCarBrand : "查询品牌"}
                                    onChange={e => {
                                            chooseCarData("carBrand", e);
                                    }}
                                >
                                    {carBrand.map((item) => {
                                        return (
                                            <Option value={item.userName} key={item.userName}>
                                                {item.userName}
                                            </Option>
                                        )
                                    })}
                                </Select>
                                <Select
                                    showSearch
                                    style={{ width: 100 }}
                                    placeholder={selectChoose ? list.nowChooseCarStyle : "查询机型"}

                                    onChange={e => {
                                        chooseCarData("carStyle", e);
                                    }}
                                >
                                    {carStyle.map((item) => {
                                        return (
                                            <Option value={item.vclType} key={item.vclType}>
                                                {item.vclType}
                                            </Option>
                                        )
                                    })}
                                </Select>
                                <Select
                                    showSearch
                                    style={{ width: 100 }}
                                    placeholder={selectChoose ? list.nowCho_CarDevNaData : "查询终端"}
                                    onChange={e => {
                                        chooseCarData("carDeviceName", e);
                                    }}
                                >
                                    {carDeviceNameData.map((item) => {
                                        return (
                                            <Option value={item.terminalType} key={item.terminalType}>
                                                {item.terminalType}
                                            </Option>
                                        )
                                    })}
                                </Select>
                                <RangePicker ranges={{
                                    Today: [moment(), moment()],
                                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                                }}
                                    onChange={chooseTimeRange} />
                                <Button type="primary"
                                    onClick={() => {
                                        const item = {
                                            nowChooseCarBrand: nowChooseCarBrand,
                                            nowChooseCarStyle: nowChooseCarStyle,
                                            nowCho_CarDevNaData: nowCho_CarDevNaData,
                                            startTime: startTime,
                                            endTime: endTime
                                        }
                                        setlist(item);//设置全局list数据
                                        if(selectChoose!=true){
                                            
                                            setselectChoose(true);
                                        }
                                        else{
                                            
                                        }
                                        console.log(list);
                                    }}  >
                                    查询
                                </Button>
                                <Button type="primary" onClick={fullScreen} icon={<FullscreenOutlined />}>全屏</Button>
                            </Space>
                        </div>
                    </Row>
                </Header>
            </Affix>

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
                        <CarNumLineChart/>
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

            <Footer>Created by Lee</Footer>
        </Layout >)
}

export default Dashborad;