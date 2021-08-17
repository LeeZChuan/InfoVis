/* 
在线率表示仪表盘--暂时使用筛选器进行数据获取，后面版本添加需求文档中的实时刷新功能
编写者：lzc
时间：2021-7-4
*/


import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { getChartData } from '@/service/api'//数据读取
import AppContext from '@/store';

var highlight = '#03b7c9';
const option = {
    backgroundColor: '#080b30',
    title: {
        text: '实时在线率仪表盘',
        textStyle: {
            color: '#FFFFFF',
            fontSize: '22',
            fontFamily: 'PingFang',
            fontWeight: '400',
        },
        padding: [10, 0, 1000, 500],
        left: 'center',
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            saveAsImage: { show: true }
        }
    },
    series: [{}]
};



const InstrumentChart = () => {
    const myChart = useRef();
    const { list } = useContext(AppContext);
    const getData = async (CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation) => {
        let demoData = await getChartData(CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation);
        const series = [
            {
                type: 'gauge',
                center: ['25%', '50%'],
                radius: '60%',  // 1行3个
                splitNumber: 8 || 10,
                min: 0,
                max: demoData[0].online,
                startAngle: 225,
                endAngle: -45,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 2,
                        shadowBlur: 0,
                        color: [
                            [1, highlight]
                        ]
                    },
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: highlight,
                        width: 1
                    },
                    length: -5,
                    splitNumber: 10
                },
                splitLine: {
                    show: true,
                    length: -14,
                    lineStyle: {
                        color: highlight,
                    }
                },
                axisLabel: {
                    distance: -25,
                    textStyle: {
                        color: '#fff',
                        // color: highlight,
                        fontSize: '15',
                        fontWeight: 'bold'
                    },
                    //外侧仪表盘取整
                    formatter: function (v) {
                        return v.toFixed(0);

                    },
                },
                pointer: {
                    show: 0
                },
                detail: {
                    show: 0
                }
            },
            // 内侧指针、数值显示
            {
                name: "终端在线率",
                type: 'gauge',
                center: ['25%', '50%'],
                radius: '60%',
                startAngle: 225,
                endAngle: -45,
                min: 0,
                max: 100,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 16,
                        color: [
                            [1, 'rgba(255,255,255,.1)']
                        ]
                    }
                },
                axisTick: {
                    show: 0,
                },
                splitLine: {
                    show: 0,
                },
                axisLabel: {
                    show: 0
                },
                pointer: {
                    show: true,
                    length: '105%'
                },
                detail: {
                    show: true,
                    offsetCenter: [0, '100%'],
                    textStyle: {
                        fontSize: 20,
                        color: '#fff'
                    },
                    formatter: [
                        '{value} ' + ("%" || ''),
                        '{name|' + "终端在线率" + '}'
                    ].join('\n'),
                    rich: {
                        name: {
                            fontSize: 14,
                            lineHeight: 20,
                            color: '#fff'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: highlight,
                    }
                },
                data: [{
                    value: demoData[0].onlineRate * 100
                }]
            },
            // 外围刻度
            {
                type: 'gauge',
                center: ['75%', '50%'],
                radius: '60%',  // 1行3个
                splitNumber: 8 || 10,
                min: 0,
                max: demoData[0].gpsOnline,
                startAngle: 225,
                endAngle: -45,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 2,
                        shadowBlur: 0,
                        color: [
                            [1, highlight]
                        ]
                    }
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: highlight,
                        width: 1
                    },
                    length: -5,
                    splitNumber: 10
                },
                splitLine: {
                    show: true,
                    length: -14,
                    lineStyle: {
                        color: highlight,
                    }
                },
                axisLabel: {
                    distance: -25,
                    textStyle: {
                        color: '#fff',
                        // color: highlight,
                        fontSize: '15',
                        fontWeight: 'bold'
                    },
                    //外侧仪表盘取整
                    formatter: function (v) {
                        return v.toFixed(0);

                    },
                },
                // pointer: {
                //     show: 0
                // },
                // detail: {
                //     show: 0
                // }
            },

            // 内侧指针、数值显示
            {
                name: "GPS在线率",
                type: 'gauge',
                center: ['75%', '50%'],
                radius: '60%',
                startAngle: 225,
                endAngle: -45,
                min: 0,
                max: 100,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 16,
                        color: [
                            [1, 'rgba(255,255,255,.1)']
                        ]
                    }
                },
                axisTick: {
                    show: 0,
                },
                splitLine: {
                    show: 0,
                },
                axisLabel: {
                    show: 0
                },
                pointer: {
                    show: true,
                    length: '105%'
                },
                detail: {
                    show: true,
                    offsetCenter: [0, '100%'],
                    textStyle: {
                        fontSize: 20,
                        color: '#fff'
                    },
                    formatter: [
                        '{value} ' + ("%" || ''),
                        '{name|' + "GPS在线率" + '}'
                    ].join('\n'),
                    rich: {
                        name: {
                            fontSize: 14,
                            lineHeight: 30,
                            color: '#fff'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: highlight,
                    }
                },
                data: [{
                    value: demoData[0].gpdOnlieRate * 100
                }]
            }
        ]
        //数据配置
        option.series = series;
        myChart.current.setOption(option);
    }

    useEffect(() => {
        myChart.current = echarts.init(document.getElementById('instrumentChart'));
    }, [])

    useEffect(() => {
        let { nowChooseCarBrand, nowChooseCarStyle, nowCho_CarDevNaData, startTime, endTime } = list
        getData(nowChooseCarBrand, nowChooseCarStyle, nowCho_CarDevNaData, startTime, endTime, "get_InstChartData");
    }, [list]);
    return (
        <div>
            <div id="instrumentChart" ref={myChart} style={{ height: '400px' }} ></div>
        </div>
    )

}

export default InstrumentChart;