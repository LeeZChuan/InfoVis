// 在线率表示仪表盘2

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { getDemodata } from '../service/api'//数据读取



var highlight = '#03b7c9';

// { "name": '电压', "value": 220, "unit": 'V', "pos": ['16.6%', '50%'], "range": [0, 400] },
// { "name": '电流', "value": 32, "unit": 'A', "pos": ['49.8%', '50%'], "range": [0, 60] },
// { "name": '功率因数', "value": 0.9,"unit": 'A', "pos": ['83%', '50%'], "range": [0.1, 1.0], splitNum: 9 },

const demoData1 = [
    { "name": '电压', "value": 220, "unit": 'V', "pos": ['25%', '50%'], "range": [0, 400] },
    { "name": '电流', "value": 32, "unit": 'A', "pos": ['75%', '50%'], "range": [0, 60] },
];

const option = {
    backgroundColor: '#fff',
    // backgroundColor: '#222939',

    series: [{}]
};

const InstrumentChart = () => {
    const myChart = useRef();
    useEffect(() => {
        // const myChartDom = document.getElementById('Chart');
        myChart.current = echarts.init(document.getElementById('instrumentChart1'));
    }, [])
    const getData = async () => {
        let demoData = await getDemodata();
        console.log(demoData);
        console.log(demoData[0].online);

        const series = (function () {
            var result = [];


            return result;
        })()

        const series1 = [
            {
                type: 'gauge',
                center: ['25%', '50%'],
                radius: '50%',  // 1行3个
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
                radius: '30.33%',
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
                        '{value} ' + ("%百分比" || ''),
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
                radius: '50%',  // 1行3个
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
                radius: '30.33%',
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
                        '{value} ' + ("%百分比" || ''),
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

        // series = [ // 外围刻度
        //     {
        //         type: 'gauge',
        //         center: ['25%', '50%'],
        //         radius: '50%',  // 1行3个
        //         splitNumber: 100 || 10,
        //         min: 0,
        //         max: 100,
        //         startAngle: 225,
        //         endAngle: -45,
        //         axisLine: {
        //             show: true,
        //             lineStyle: {
        //                 width: 2,
        //                 shadowBlur: 0,
        //                 color: [
        //                     [1, highlight]
        //                 ]
        //             }
        //         },
        //         axisTick: {
        //             show: true,
        //             lineStyle: {
        //                 color: highlight,
        //                 width: 1
        //             },
        //             length: -5,
        //             splitNumber: 10
        //         },
        //         splitLine: {
        //             show: true,
        //             length: -14,
        //             lineStyle: {
        //                 color: highlight,
        //             }
        //         },
        //         axisLabel: {
        //             distance: -20,
        //             textStyle: {
        //                 color: highlight,
        //                 fontSize: '14',
        //                 fontWeight: 'bold'
        //             }
        //         },
        //         pointer: {
        //             show: 0
        //         },
        //         detail: {
        //             show: 0
        //         }
        //     },
        //     // 内侧指针、数值显示
        //     {
        //         name: "在线率",
        //         type: 'gauge',
        //         center: ['25%', '50%'],
        //         radius: '30.33%',
        //         startAngle: 225,
        //         endAngle: -45,
        //         min: 0,
        //         max: 100,
        //         axisLine: {
        //             show: true,
        //             lineStyle: {
        //                 width: 16,
        //                 color: [
        //                     [1, 'rgba(255,255,255,.1)']
        //                 ]
        //             }
        //         },
        //         axisTick: {
        //             show: 0,
        //         },
        //         splitLine: {
        //             show: 0,
        //         },
        //         axisLabel: {
        //             show: 0
        //         },
        //         pointer: {
        //             show: true,
        //             length: '105%'
        //         },
        //         detail: {
        //             show: true,
        //             offsetCenter: [0, '100%'],
        //             textStyle: {
        //                 fontSize: 20,
        //                 color: '#222'
        //             },
        //             formatter: [
        //                 '{value} ' + ("车辆" || ''),
        //                 '{name|' + "在线率" + '}'
        //             ].join('\n'),
        //             rich: {
        //                 name: {
        //                     fontSize: 14,
        //                     lineHeight: 30,
        //                     color: '#222'
        //                 }
        //             }
        //         },
        //         itemStyle: {
        //             normal: {
        //                 color: highlight,
        //             }
        //         },
        //         data: [{
        //             value: 1000
        //         }]
        //     },
        //     //  // 外围刻度
        //     //  {
        //     //     type: 'gauge',
        //     //     center:['50%', '75%'],
        //     //     radius: '50%',  // 1行3个
        //     //     splitNumber: 100|| 10,
        //     //     min: 0,
        //     //     max: 100,
        //     //     startAngle: 225,
        //     //     endAngle: -45,
        //     //     axisLine: {
        //     //         show: true,
        //     //         lineStyle: {
        //     //             width: 2,
        //     //             shadowBlur: 0,
        //     //             color: [
        //     //                 [1, highlight]
        //     //             ]
        //     //         }
        //     //     },
        //     //     axisTick: {
        //     //         show: true,
        //     //         lineStyle: {
        //     //             color: highlight,
        //     //             width: 1
        //     //         },
        //     //         length: -5,
        //     //         splitNumber: 10
        //     //     },
        //     //     splitLine: {
        //     //         show: true,
        //     //         length: -14,
        //     //         lineStyle: {
        //     //             color: highlight,
        //     //         }
        //     //     },
        //     //     axisLabel: {
        //     //         distance: -20,
        //     //         textStyle: {
        //     //             color: highlight,
        //     //             fontSize: '14',
        //     //             fontWeight: 'bold'
        //     //         }
        //     //     },
        //     //     pointer: {
        //     //         show: 0
        //     //     },
        //     //     detail: {
        //     //         show: 0
        //     //     }
        //     // },

        //     // // 内侧指针、数值显示
        //     // {
        //     //     name: "终端数量",
        //     //     type: 'gauge',
        //     //     center: ['50%', '75%'],
        //     //     radius: '30.33%',
        //     //     startAngle: 225,
        //     //     endAngle: -45,
        //     //     min: 0,
        //     //     max: 100,
        //     //     axisLine: {
        //     //         show: true,
        //     //         lineStyle: {
        //     //             width: 16,
        //     //             color: [
        //     //                 [1, 'rgba(255,255,255,.1)']
        //     //             ]
        //     //         }
        //     //     },
        //     //     axisTick: {
        //     //         show: 0,
        //     //     },
        //     //     splitLine: {
        //     //         show: 0,
        //     //     },
        //     //     axisLabel: {
        //     //         show: 0
        //     //     },
        //     //     pointer: {
        //     //         show: true,
        //     //         length: '105%'
        //     //     },
        //     //     detail: {
        //     //         show: true,
        //     //         offsetCenter: [0, '100%'],
        //     //         textStyle: {
        //     //             fontSize: 20,
        //     //             color: '#222'
        //     //         },
        //     //         formatter: [
        //     //             '{value} ' + ("车辆" || ''),
        //     //             '{name|' + "终端数量" + '}'
        //     //         ].join('\n'),
        //     //         rich: {
        //     //             name: {
        //     //                 fontSize: 14,
        //     //                 lineHeight: 30,
        //     //                 color: '#222'
        //     //             }
        //     //         }
        //     //     },
        //     //     itemStyle: {
        //     //         normal: {
        //     //             color: highlight,
        //     //         }
        //     //     },
        //     //     data: [{
        //     //         value: 150
        //     //     }]
        //     // }
        // ]
        // // console.log(series)

        option.series = series1;

        myChart.current.setOption(option);
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <div id="instrumentChart1" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default InstrumentChart;