//第一列组件：终端装车辆总数时间序列折线图；
//用于展示该时间段内的车辆总数变化情况

import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { getChartData } from '@/service/api'//数据读取
import AppContext from '@/store';
import { Select } from 'antd';
const { Option } = Select;

const option = {
    backgroundColor: '#080b30',
    title: {
        text: '车辆数量变化趋势',
        textStyle: {
            color: '#FFFFFF',
            fontSize: '22',
            fontFamily: 'PingFang',
            fontWeight: '400',
        },
        left: 'center',
        align: 'right'
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        axisPointer: {
            type: 'shadow',
            label: {
                show: true,
                backgroundColor: '#7B7DDC'
            }
        }
    },
    grid: [{
        x: '10%',
        y: '-10%',
        width: '88%',
        height: '100%'
    }],//位置操控
    color: '#00DAFF',//POINT COLOR
    length: {
        show: true
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            dataZoom: {
                yAxisIndex: 'none'
            },
            saveAsImage: { show: true }
        }
    },
    dataZoom: [
        {
            show: true,
            realtime: true,
            start: 0,
            end: 100
        },
        {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100
        }
    ],
    xAxis: [{
        type: 'category',
        axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 1, //设置为 1，表示『隔一个标签显示一个标签』
            margin: 6,
            textStyle: {
                color: '#BCD8FF',
                fontFamily: 'PingFang',
                fontStyle: 'normal',
                fontSize: 12,
            },
        },
        data: [{}],
    }],
    yAxis: {
        type: 'value',
        axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
            margin: 15,
            textStyle: {
                color: '#BCD8FF',
                fontFamily: 'PingFang',
                fontStyle: 'normal',
                fontSize: 12,
            },
            formatter: '{value} ' + '辆'
        },
    },
    series: [{}]
};
const timeData = [
    { value: 'day', name: '按天' },
    { value: 'month', name: '按月' }
]

const LineChart = () => {
    const myChart = useRef();
    const { list } = useContext(AppContext);
    const getData = async (CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation) => {
        let demoData = await getChartData(CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation);
        let timeData = [];
        let data = [];
        demoData.map((item) => {
            timeData.push(item.month.toString());
            data.push(item.amount);
        })
        const series = [{
            name: '车辆数目',
            type: 'line',
            smooth: true,
            symbolSize: 10,
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
                normal: {
                    color: '#0092f6',
                    lineStyle: {
                        color: "#0092f6",
                        width: 1
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                            offset: 0,
                            color: 'rgba(7,44,90,0.3)'
                        }, {
                            offset: 1,
                            color: 'rgba(0,146,246,0.9)'
                        }]),
                    }
                }
            },
            data: data
        }]
        option.xAxis[0].data = timeData;
        option.series = series;

        myChart.current.setOption(option);
    }

    const selectDate = (Date) => {
        if (Date == 'day') {
            getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, "getCarInstallAmount_Day");
        }
        else if(Date=='month') {
            getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, "getCarInstallAmount_Month");
        }
    }
    useEffect(() => {
        myChart.current = echarts.init(document.getElementById('carNumLineChart'));
    }, [])
    useEffect(() => {
        getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, "getCarInstallAmount_Month");
    }, [list]);
    return (
        <div>
            <Select
                style={{ width: 130 }}
                placeholder={"选择查询粒度"}
                onChange={e => {
                    selectDate(e);
                }}
            >
                {timeData.map(item => {
                    return (
                        <Option value={item.value} key={item.value}>
                            {item.name}
                        </Option>
                    )
                })}
            </Select>
            <div id="carNumLineChart" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default LineChart;