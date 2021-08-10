//数据连续性饼状图

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const option = {
    tooltip: {
        trigger: 'item',
        backgroundColor: '#fff',
        formatter: "该天数据百分比情况占比{d}%"
    },
    series: [
        {
            name: '上网时间',
            type: 'pie',
            radius: ['6%', '70%'],//条形柱状图高度大小
            roseType: 'area',
            color: ['#3fa7dc'],//条形柱状图颜色
            data: [{}],
            labelLine: {
                normal: {
                    show: false
                }
            },
            label: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },
        {
            name: '',
            type: 'gauge',
            min: 0,
            max: 24,
            startAngle: 90,
            endAngle: 449.9,
            radius: '100%',
            splitNumber: 24,
            clockwise: false,
            animation: false,
            detail: {
                formatter: '{value}',
                textStyle: {
                    color: '#F02FC2'
                }
            },
            detail: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: [
                        [0.25, '#63869e'],//仪表盘左上角颜色
                        [0.75, '#ffffff'],//仪表盘底部颜色
                        [1, '#63869e']//仪表盘右上角颜色
                    ],
                    width: '40%',
                    shadowColor: '#0d4b81', //默认仪表盘周围边沿透明颜色
                    shadowBlur: 40,
                    opacity: 1
                }
            },
            splitLine: {
                length: 5,
                lineStyle: {
                    color: '#ffffff',
                    width: 2
                }
            },
            axisLabel: {
                formatter: function (v) {
                    return v ? v : '';
                },
                textStyle: {
                    color: "black",//周围24小时字体颜色
                    fontWeight: 700
                }
            },
            itemStyle: {
                normal: {
                    color: 'blue',
                    width: 2
                }
            }
        },
        {
            name: '',
            type: 'gauge',
            min: 0,
            max: 24,
            startAngle: 90,
            endAngle: 449.9,
            radius: '72%',
            splitNumber: 24,
            clockwise: false,
            animation: false,
            detail: {
                formatter: '{value}',
                textStyle: {
                    color: '#63869e'
                }
            },
            detail: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: [
                        [1, '#E8E8E8']//仪表盘背景颜色
                    ],
                    width: '10%',
                    opacity: 0.8
                }
            },
            splitLine: {
                show: true,
                length: '92%',
                lineStyle: {
                    color: 'grey',
                    width: '1'
                }
            },
            axisLabel: {
                show: false,
                formatter: function (v) {
                    return v ? v : '';
                },
                textStyle: {
                    color: "#F02FC2",
                    fontWeight: 700
                }
            },
            itemStyle: {
                normal: {
                    color: 'green',
                    width: 2,
                    borderWidth: 3,
                }
            }
        }
    ]
};
const PieChart = () => {
    const myChart = useRef();
    useEffect(() => {
        // const myChartDom = document.getElementById('Chart');
        myChart.current = echarts.init(document.getElementById('dataSeriesPieChart'));
    }, [])
    const getData = async () => {
        const data = () => {
            var d = [];
            for (var i = 0; i < 24; i++) {
                d.push({ name: i + '~' + (i + 1), value: Math.random() * 100 });
            }
            return d;
        }
        option.series[0].data = data();
        myChart.current.setOption(option);
    }
    useEffect(() => {
        getData();
    });
    return (
        <div>

            <div id="dataSeriesPieChart" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default PieChart;