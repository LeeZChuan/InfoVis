
/* 
   数据完整性can数据方向时序折线图
   编写者：lzc
   创建时间：2021-7-12
*/


import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { getChartData } from '@/service/api';
import AppContext from '@/store';

const fontColor = '#30eee9';
const line_color = ['#EF7C1E', '#BCD8FF', '#00b3f4', '#00d4c7', '#61418C', '#434F96', '#E5AA25'];
const option = {
    backgroundColor: '#080b30',
    title: {
        text: '多组Can数据完整度',
        textStyle: {
            color: '#FFFFFF',
            fontSize: '22',
            fontFamily: 'PingFang',
            fontWeight: '400',
        },
        left: 'center',
        align: 'right'
    },
    grid: {
        left: '0%',
        right: '0%',
        top: '20%',
        bottom: '10%',
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
            label: {
                show: true
            }
        }
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            saveAsImage: { show: true }
        }
    },
    legend: {
        show: true,
        x: 'center',
        y: '35',
        icon: 'stack',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
            color: '#1bb4f6'
        },
        data: [{}]//x轴选择栏目
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                color: fontColor
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#397cbc'
                }
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#195384'
                }
            },
            data: [{}]//x轴时间列表
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '占比情况',
            min: 0,
            max: 1000,
            position: 'right',
            axisLabel: {
                formatter: '{value} 百分比',
                textStyle: {
                    color: '#186afe'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#186afe'
                }
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#11366e'
                }
            }
        }
    ],
    dataZoom: [
        {
            show: true,
            start: 30,
            end: 100
        },
        {
            type: 'inside',
            start: 30,
            end: 100
        }
    ],
    series: [{}]//存在多少类
};


const LineChart = () => {
    const { list } = useContext(AppContext);
    const myChart = useRef();
    useEffect(() => {
        myChart.current = echarts.init(document.getElementById('Chart'));
        //showLoading遮盖层显示
        myChart.current.showLoading({
            text: '数据正在努力加载中...',
            color: '#c23531',
            textColor: 'black',
            // 字体大小。从 `v4.8.0` 开始支持。
            fontSize: 45,
            // 字体粗细。从 `v5.0.1` 开始支持。
            fontWeight: 'normal',
            // 字体风格。从 `v5.0.1` 开始支持。
            fontStyle: 'normal',
            // 字体系列。从 `v5.0.1` 开始支持。
            fontFamily: 'sans-serif',
            backgroundColor: 'rgba(255, 255, 255, 0)'
        });
    }, [])
    const getData = async (CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation) => {
        const Data = await getChartData(CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation);
        let seriesList = [];
        let objList = Object.keys(Data[0]);
        if (seriesList.length !== 0) {
            seriesList.length = 0;
        } else {
            for (let i = 1; i < objList.length; i++) {
                seriesList.push({
                    name: objList[i],
                    type: 'line',
                    smooth: true,
                    stack: '百分比',
                    symbol: 'circle',
                    symbolSize: 10,
                    itemStyle: {
                        normal: {
                            color: line_color[i - 1],
                            lineStyle: {
                                color: line_color[i - 1],
                                width: 1
                            },
                            areaStyle: {
                                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                    offset: 0,
                                    color: 'rgba(7,44,90,0.3)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(0,212,199,0.9)'
                                }]),
                            }
                        }
                    },
                    data: Data.map(item => {
                        return (item[objList[i]] * 100).toFixed(2);
                    })
                });
            }
        }
        option.xAxis[0].data = Data.map(item => {
            return item[objList[0]];
        });
        option.legend.data = objList.slice(1, objList.length);
        option.series = seriesList;
        myChart.current.setOption(option);
        //showLoading遮盖层隐藏
        myChart.current.hideLoading();
    }
    useEffect(() => {
        getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, "getTime_CanIntegrityLineChartData");
    },[list]);
    return (
        <div>
            <div id="Chart" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default LineChart;