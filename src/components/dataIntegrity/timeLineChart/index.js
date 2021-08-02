//终端装车量时序折线图

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const fontColor = '#30eee9';
const option = {
    backgroundColor:'#080b30',
    title: {
        text: '每日终端装车量',
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
        left: '5%',
        right: '5%',
        top: '15%',
        bottom: '5%',
        containLabel: true
    },
    tooltip: {
        show: true,
        trigger: 'item'
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            saveAsImage: { show: true },
            dataZoom: {
                yAxisIndex: 'none'
            },
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
        data: [ '已发布']
    },
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
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '浏览量',
            min: 0,
            max: 1000,
            position: 'right',
            axisLabel: {
                formatter: '{value} 人',
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
    series: [
        {
            name: '已发布',
            type: 'line',
            stack: '总量',
            symbol: 'circle',
            symbolSize: 8,

            itemStyle: {
                normal: {
                    color: '#00d4c7',
                    lineStyle: {
                        color: "#00d4c7",
                        width: 1
                    },
                    areaStyle: {
                        //color: '#94C9EC'
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
            data: [220, 182, 191, 234, 290, 330, 310, 201, 154, 190, 330, 410]
        },
    ]
};

const LineChart = () => {
    const myChart = useRef();
    useEffect(() => {
        myChart.current = echarts.init(document.getElementById('Chart'));
    }, [])
    const getData = async () => {
        myChart.current.setOption(option);
    }
    useEffect(() => {
        getData();
    });
    return (
        <div>

            <div id="Chart" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default LineChart;