//顶部导航栏目设计组件
import React, { useState, useEffect, useContext } from 'react';
import Clock from '../TimeShow/index'
import AppContext from '../../store';
import moment from 'moment';//时间组件
import { Link } from 'react-router-dom';
import { getCarBrandData, getCarStyle, getDeviceName } from '../../service/api';
import screenfull from 'screenfull';//全屏
import { FullscreenOutlined } from '@ant-design/icons';
import { Layout, Row, Select, Space, DatePicker, Affix, Button } from 'antd';

const { Header } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;

const style = { background: '#0092ff', heigh: '500px' };
const titlestyle0 = { margin: '0px 0px 0px 50px' }
const titlestyle1 = { margin: '0px 0px 0px 300px', color: '#fff' }
const titlestyle2 = { margin: '0px 0px 0px 100px' }



const Topnav = () => {
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

    //下拉时间选择
    const chooseTimeRange = (dates, dateStrings) => {
        setstartTime(dateStrings[0]);
        setendTime(dateStrings[1]);
    }
    //全屏化方法
    const fullScreen = () => {
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
        <Affix>
            <Header style={style}>
                <Row>
                    <div>
                        <Clock />
                    </div>
                    <div style={titlestyle0}>
                        <Button><Link to="/index" >前往数据可视化页面</Link></Button>
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
                                    if (selectChoose != true) {

                                        setselectChoose(true);
                                    }
                                    else {

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
    )
}


export default Topnav;