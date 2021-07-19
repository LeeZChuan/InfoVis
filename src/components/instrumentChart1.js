// 在线率表示仪表盘2

import React, { useEffect, useRef,useContext} from 'react';
import * as echarts from 'echarts';
import { getChartData,getDemodata } from '../service/api'//数据读取

import AppContext from '../store';

var highlight = '#03b7c9';

const option = {
    // backgroundColor: '#fff',
    series: [{}]
};

const InstrumentChart = () => {
    const myChart = useRef();
    const {list} =useContext(AppContext);

    useEffect(() => {
        myChart.current = echarts.init(document.getElementById('instrumentChart1'));
    }, [])

    const getData = async() => {

        let demoData = await getChartData(list.nowChooseCarBrand,list.nowChooseCarStyle,list.nowCho_CarDevNaData,list.startTime,list.endTime,"get_InstChartData");
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
                    distance: -20,
                    textStyle: {
                        color: highlight,
                        fontSize: '14',
                        fontWeight: 'bold'
                    }
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
                name: "在线率",
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
                        color: '#222'
                    },
                    formatter: [
                        '{value} ' + ("%" || ''),
                        '{name|' + "在线率" + '}'
                    ].join('\n'),
                    rich: {
                        name: {
                            fontSize: 14,
                            lineHeight: 30,
                            color: '#222'
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
                center:['75%', '50%'],
                radius: '60%',  // 1行3个
                splitNumber: 8|| 10,
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
                    distance: -20,
                    textStyle: {
                        color: highlight,
                        fontSize: '14',
                        fontWeight: 'bold'
                    }
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
                name: "终端数量",
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
                        color: '#222'
                    },
                    formatter: [
                        '{value} ' + ("%" || ''),
                        '{name|' + "终端数量" + '}'
                    ].join('\n'),
                    rich: {
                        name: {
                            fontSize: 14,
                            lineHeight: 30,
                            color: '#222'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: highlight,
                    }
                },
                data: [{
                    value: demoData[0].gpdOnlieRate*100
                }]
            }
        ]
        //数据配置
        option.series = series;
        myChart.current.setOption(option);
    }
    useEffect(() => {
        getData(list.nowChooseCarBrand,list.nowChooseCarStyle,list.nowCho_CarDevNaData,list.startTime,list.endTime);
    }, []);
    return (
        <div>
            <div id="instrumentChart1" ref={myChart} style={{ height: '350px' }}></div>
        </div>
    )

}

export default InstrumentChart;