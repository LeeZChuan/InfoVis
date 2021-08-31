/* 
   第一列组件：动态滚动表格展示组件，用于展示用户选择的日期内的详细组件情况
   编写者：lzc
   创建时间：2021-7-4
*/
import React, { Component } from "react";
import { JsSeamlessScroll } from "css-react-seamless-scroll";
import { getChartData } from '@/service/api';//数据读取
import {message} from 'antd';
import AppContext from '@/store';
import "./styles.css";

const data = [];
class JsExample extends Component {
    state = {
        scrollSwitch: true,
        datas: [],
    }
    //声明接收context
    static contextType = AppContext;
    getData = async (CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation) => {
        let demoData = await getChartData(CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation);
        //清除原始残留数据数组
        if (data.length != 0) {
            data.splice(0, data.length);
        }
        //判断筛选的数据长度，如果不够弹窗进行报错，然后用户重新选择
        if (demoData.length !== 0) {
        } else {
            // alert('表格暂无数据，请重新选择');
            message.error('故障车辆实时滚动条该时间段内暂无数据，请重新选择');

        }
        demoData.map((item, index) => {
            data.push({
                key: index,
                carID: item.carID,
                installDate: item.installDate
            })
        })
        //数组使用深拷贝实现图表数据刷新
        let lists = data.concat();
        this.setState({ datas: lists })
    }
    //这里有一个还未解决的问题，就是动态滚动模块，数据重新加载dom组件并未及时更新，需要定时器刷新，并且超过了范围就会出现初始化的数据
    componentWillMount() {
        let iniDataList = [];
        for (let i = 0; i < 10000; i++) {
            iniDataList.push({
                key: i,
                carID: "React 无缝滚动组件展示数据",
                installDate: Date.now(),
            })
        }
        this.setState({ datas: iniDataList });
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            //开启定时器就会按照一个时间粒度进行不断循环，直至清除这个定时器
            if (this.context.selectNum) {
                this.getData(this.context.list.nowChooseCarBrand, this.context.list.nowChooseCarStyle, this.context.list.nowCho_CarDevNaData, this.context.list.startTime, this.context.list.endTime, "getCarInstallInfo")
                this.context.setselectNum(false);
            } else {
                if (this.state.datas.length == 10000) {
                    this.getData(this.context.list.nowChooseCarBrand, this.context.list.nowChooseCarStyle, this.context.list.nowCho_CarDevNaData, this.context.list.startTime, this.context.list.endTime, "getCarInstallInfo")
                }
                else {//如果切换重置了，再次注入数据

                }
            }
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div className="scroll">
                <div>车辆列表数据动态展示</div>
                <JsSeamlessScroll datas={this.state.datas} hover>
                    <span>序号</span>
                    <span>车辆信息</span>
                    <span>日期</span>
                    {
                        this.state.datas.map(data => <div className="item" key={data.key}>
                            <span>{data.key}</span>
                            <span>{data.carID}</span>
                            <span>{data.installDate}</span>
                        </div>)
                    }
                </JsSeamlessScroll >

            </div >

        )
    }
}

export default JsExample;
