
/* 
   顶部导航栏目设计组件
   编写者：lzc
   创建时间：2021-7-10
*/

import React, { useState, useEffect, useContext } from 'react';
import Clock from '@/components/TimeShow/index'
import AppContext from '@/store';
import moment from 'moment'; // 时间组件
import { Link } from 'react-router-dom';
import { getCarBrandData, getCarStyle, getDeviceName } from '@/service/api';
import screenfull from 'screenfull';
import { FullscreenOutlined, AreaChartOutlined } from '@ant-design/icons';
import { Layout, Select, Space, DatePicker, Affix, Button, Modal } from 'antd';
import { ConfigProvider } from 'antd'; // 日期选择器外壳汉化
import zhCN from 'antd/lib/locale/zh_CN';
import 'moment/locale/zh-cn'; // 内部文字汉化
import './index.css'; 
moment.locale('zh-cn');
const { Header } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;

const style = { background: '#0092ff' };

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
    const [visible, setVisible] = useState(false);//地图图表弹窗展示
    const { list, setlist } = useContext(AppContext);
    const { selectPage, setselectPage } = useContext(AppContext);
    const { setselectNum } = useContext(AppContext);
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
    const initCarBrandData = async () => {
        setcarBrand(await getCarBrandData());
    }
    //初始化下拉菜单的车辆类型数据列表
    const initCarStyleData = async (carBrand) => {
        setcarStyle(await getCarStyle(carBrand));
    }

    //初始化下拉菜单的车辆终端数据列表
    const initCarDeviceNameData = async (carBrand, carType) => {
        setcarDeviceNameData(await getDeviceName(carBrand, carType));
    }

    //将选择车辆品牌、类型、终端操作，进行柯里化合并
    const chooseCarData = (dataType, e) => {
        switch (dataType) {
            case "carBrand":
                setnowChooseCarBrand(e);
                initCarStyleData(e);
                break;
            case "carStyle":
                setnowChooseCarStyle(e);
                initCarDeviceNameData(nowChooseCarBrand, e);//初始化后面的数据数组
                break;
            case "carDeviceName":
                setnowCho_CarDevNaData(e);
                break;
        }
    }

    //全局状态设置--按钮点击事件
    const selectType = () => {
        const item = {
            nowChooseCarBrand: nowChooseCarBrand,
            nowChooseCarStyle: nowChooseCarStyle,
            nowCho_CarDevNaData: nowCho_CarDevNaData,
            startTime: startTime,
            endTime: endTime
        }
        setlist(item);//设置全局list数据
        setselectNum(true);//设置全局图表状态更新（主要针对于第一列的动态轮播图）
        if (selectChoose != true) {
            setselectChoose(true);
            console.log("设置成功la!!!!");
        }
        else {
            console.log("已经设置成功，无需设置la!!!!");
        }
    }

    //点击切换的节流函数
    const throChoose = (func, waittime) => {
        let timerOut
        return function () {
            if (!timerOut) {
                timerOut = setTimeout(() => {
                    func();
                    timerOut = null;
                }, waittime);
            }
        }
    }

    useEffect(() => {
        initCarBrandData();//最一开始初始化车辆品牌方法
    }, [])

    return (
        <Affix>
            <Header style={style}>
                <div className="header">
                    <div className="showTime">
                        <Clock />
                    </div>
                    <div className="selectPage">
                        {
                            // 页面切换按钮这里可以进行重构，目前还没有想到更好的实现方式
                            (selectPage) ? (<Button onClick={() => {
                                if (selectPage != true) { } else { setselectPage(false); }

                            }}><Link to="/download" >数据下载</Link></Button>) : (<Button onClick={() => {
                                if (selectPage != true) {
                                    setselectPage(true);
                                } else { }
                            }} > <Link to="/index" >可视展示</Link></Button>)

                        }
                    </div>
                    <h1 className="title">
                        数据质量分析平台
                    </h1>
                    <div className="search">
                        <Space>
                            <Select
                                showSearch
                                style={{ width: 130 }}
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
                            <ConfigProvider locale={zhCN}>
                                <RangePicker
                                    ranges={{
                                        '今天': [moment(), moment()],
                                        '当前月份': [moment().startOf('month'), moment().endOf('month')],
                                    }}
                                    onChange={chooseTimeRange} />
                            </ConfigProvider>
                            <Button type="primary"
                                onClick={throChoose(selectType, 2000)}  >
                                查询
                            </Button>
                            <Button type="primary" onClick={() => setVisible(true)} icon={<AreaChartOutlined />}></Button>
                            <Button type="primary" onClick={fullScreen} icon={<FullscreenOutlined />}></Button>

                            <Modal
                                title="地图弹窗展示"
                                centered
                                visible={visible}
                                onOk={() => setVisible(false)}
                                onCancel={() => setVisible(false)}
                                width={1000}
                            >
                                <p>用于展示地图与多图联动效果</p>
                                <p>等待数据接入中...</p>
                                <p>静态联动已经设计完成...</p>
                            </Modal>
                        </Space>
                    </div>
                </div>
            </Header>
        </Affix >
    )
}

export default Topnav;