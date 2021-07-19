//页面整体布局设计
import React, { useState, useEffect, useRef, useContext } from 'react';
//数据获取
import { getCarBrandData, getCarStyle, getDeviceName, getDemodata } from './service/api';
import PieChart from './components/pieChart';
import StactterPieChart from './components/stactterPieChart';
import Clock from './components/TimeShow/index'
// import Tiltle from './components/Topnavigation/index'
// import InstrumentChart from './components/instrumentChart';
import InstrumentChart1 from './components/instrumentChart1';
import MultipleyaxisChart from './components/multiple-yaxisChart';
import Barycategory from './components/bar-ycategory';
import BarycategoryCobo from './components/bar-ycategoryCobo';
import EverydayLine from './components/everydayLine';
import DataSeries_PieChart from './components/dataSeries_PieChart';
// import ControlMap from './components/Map/controlMap';
import LineChart from './components/lineChart';
import TimeLineChart from './components/timelineChart';
import AppContext from './store';
import { Layout, Row, Col, Select, Divider, Space, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { Button } from 'antd/lib/radio';
import moment from 'moment';//时间组件
const { Header, Footer, Content } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;

const style = { background: '#0092ff', padding: '0px 0px', heigh: '500px' };
const titlestyle = { margin: '0px  0px 50px 50px' }
// const titlestyle1 = { height: '50px', width: '100%', left:'850px', position: 'fixed', color: '#fff', }
const titlestyle1 = { margin: '0px 0px 600px 600px', color: '#fff', font: 300 }
// const titlestyle2 = { height: '50px', width: '100%', left:'1500px', position: 'fixed', }
const titlestyle2 = { margin: '0px 0px 100px 100px' }


const Dashborad = () => {
    const [showChart, setshowChart] = useState(true);//图表切换
    const [carBrand, setcarBrand] = useState([]);//初始化一个车辆品牌列表数组
    const [carStyle, setcarStyle] = useState([]);//初始化一个车辆机型数组
    const [carDeviceNameData, setcarDeviceNameData] = useState([]);//初始化一个车辆终端数组
    const [nowChooseCarBrand, setnowChooseCarBrand] = useState("");
    const [nowChooseCarStyle, setnowChooseCarStyle] = useState("");
    const [nowCho_CarDevNaData, setnowCho_CarDevNaData] = useState("");
    // const [timeRange, settimeRange] = useState({ startTime: "", endTime: "" });//初始化一个时间终端数组
    const [startTime, setstartTime] = useState("");//初始化一个时间终端数组
    const [endTime, setendTime] = useState("");//初始化一个时间终端数组
    const { setlist } = useContext(AppContext);
    //图表切换 
    const showSwitch = () => {
        setshowChart(!showChart);
    }
    //下拉时间选择
    const chooseTimeRange = (dates, dateStrings) => {
        // settimeRange({
        //     startTime: dateStrings[0],
        //     endTime: dateStrings[1]
        // });
        setstartTime(dateStrings[0]);
        setendTime(dateStrings[1]);
    }

    const chooseCarbrand = useRef("SK500")//初始化选择的车辆品牌
    //初始化下拉菜单的数据列表
    const initData = async () => {
        // let brandData = await getCarBrandData();
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
                initcardeviceNameData(e);//初始化后面的数据数组
                break;
            case "carDeviceName":
                setnowCho_CarDevNaData(e);
                break;
        }
    }

    useEffect(() => {
        initData();//最一开始初始化车辆品牌方法
    }, [])

    return (<Layout>
        <Header style={style}>
            <Row>
                <div style={titlestyle}>
                    <Clock />
                </div>
                <h1 style={titlestyle1}>
                    数据质量分析平台
                </h1>
                <div style={titlestyle2}>
                    <Space>
                        <Select
                            showSearch
                            style={{ width: 130 }}
                            placeholder="查询品牌"
                            onChange={e => {
                                chooseCarData("carBrand", e)
                            }}
                        >
                            {carBrand.map((item) => {
                                return (
                                    <Option value={item.carType} key={item.carType}>
                                        {item.carType}
                                    </Option>
                                )
                            })}
                        </Select>
                        <Select
                            showSearch
                            style={{ width: 100 }}
                            placeholder="查询机型"
                            onChange={e => {
                                chooseCarData("carStyle", e)
                            }}
                        >
                            {carStyle.map((item) => {
                                return (
                                    <Option value={item.vclTpye} key={item.vclTpye}>
                                        {item.vclTpye}
                                    </Option>
                                )
                            })}
                        </Select>
                        <Select
                            showSearch
                            style={{ width: 100 }}
                            placeholder="查询终端"
                        >
                            {carDeviceNameData.map((item) => {
                                return (
                                    <Option value={item.carType} key={item.carType}>
                                        {item.carType}
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
                                    nowChooseCarBrand,
                                    nowChooseCarStyle,
                                    nowCho_CarDevNaData,
                                    startTime,
                                    endTime

                                }
                                setlist(item);//设置全局list数据
                            }}  >
                            查询
                        </Button>
                    </Space>
                </div>
            </Row>
        </Header>
        <Content>
            <Divider orientation="left">实时展示栏目</Divider>
            <Row orientation="left">
                <Col span={24}>实时时间展示窗口</Col>
                {/* <AppProvider></AppProvider> */}
            </Row>
            <Row >
                <Col className="gutter-row" span={8}>
                    <div>
                        <InstrumentChart1
                            getData={getDemodata(chooseCarbrand)}
                        />
                    </div>
                </Col>
            </Row>
            <Divider orientation="left">数据完整性展示</Divider>
            <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                    <Button onClick={showSwitch}>切换折线图与时间序列堆叠图</Button>
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
        <Footer>Created by Lee</Footer>
    </Layout>)
}

export default Dashborad;