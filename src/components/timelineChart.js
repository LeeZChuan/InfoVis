import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { getTimeseriesData } from '../service/api';



const option = {
    title: {
        text: '数据完整性关系图',
        subtext: '数据来自天远科技有限公司',
        left: 'center',
        align: 'right'
    },
    grid: {
        bottom: 80
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            animation: false,
            label: {
                backgroundColor: '#505765'
            }
        }
    },
    legend: {
        data: ['Can完整度', '经纬度完整度', '时间完整度'],
        left: 10
    },
    dataZoom: [
        {
            show: true,
            realtime: true,
            start: 30,
            end: 85
        },
        {
            type: 'inside',
            realtime: true,
            start: 30,
            end: 85
        }
    ],
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            axisLine: { onZero: false },
            data: [{}]
        }
    ],
    yAxis: [
        {
            name: 'Can完整度(%)',
            type: 'value',
            max: 1
        },
        {
            name: '经纬度完整度(%)',
            // nameLocation: 'start',
            max: 1,
            type: 'value',
            // inverse: true
        },
        {
            name: '经纬度完整度(%)',
            // nameLocation: 'start',
            max: 1,
            type: 'value',
            // inverse: true
        },
    ],
    series: [
        {
            name: 'Can完整度',
            type: 'line',
            areaStyle: {},
            lineStyle: {
                width: 1
            },
            emphasis: {
                focus: 'series'
            },
            markArea: {
                silent: true,
                itemStyle: {
                    opacity: 0.3
                },
                data: [[{
                    xAxis: ''
                }, {
                    xAxis: ''
                }]]
            },
            data: [{}]
        },
        {
            name: '经纬度完整度',
            type: 'line',
            yAxisIndex: 1,
            areaStyle: {},
            lineStyle: {
                width: 1
            },
            emphasis: {
                focus: 'series'
            },
            markArea: {
                silent: true,
                itemStyle: {
                    opacity: 0.3
                },
                data: [
                    [{
                        xAxis: ''
                    }, {
                        xAxis: ''
                    }]
                ]
            },
            data: [{}]
        },
        {
            name: '时间完整度',
            type: 'line',
            yAxisIndex: 1,
            areaStyle: {},
            lineStyle: {
                width: 1
            },
            emphasis: {
                focus: 'series'
            },
            markArea: {
                silent: true,
                itemStyle: {
                    opacity: 0.3
                },
                data: [
                    [{
                        xAxis: ''
                    }, {
                        xAxis: ''
                    }]
                ]
            },
            data: [{}]
        }
    ]
};

const LineChart = () => {
    const myChart = useRef();
    useEffect(() => {
        myChart.current = echarts.init(document.getElementById('timeLineChart'));
    }, [])
    const getData = async () => {
        const Data = await getTimeseriesData();
        let DataList = [];
        let canRate = [];
        let locRate = [];
        let dailyRecordRate = [];
        for (let i = 0; i < Data.length; i++) {
            DataList.push(Data[i].msgDate);
            canRate.push(Data[i].canRate);
            locRate.push(Data[i].locRate);
            dailyRecordRate.push(Data[i].dailyRecordRate);
        }
        //数据配置
        option.xAxis[0].data = DataList;
        option.series[0].data = canRate
        option.series[1].data = locRate
        option.series[2].data = dailyRecordRate
        myChart.current.setOption(option);
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <div id="timeLineChart" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default LineChart;