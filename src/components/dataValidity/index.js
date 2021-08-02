import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
const data1 = ['50', '60', '30', '50', '60', '30', '50', '60', '40', '60', '20', '40', '60'];
const data2 = ['50', '60', '30', '50', '60', '30', '50', '60', '40', '60', '20', '40', '60'];
const data3 = ['50', '60', '30', '50', '60', '30', '50', '60', '40', '60', '20', '40', '60'];
const data4 = ['50', '60', '30', '50', '60', '30', '50', '60', '40', '60', '20', '40', '60'];
const datacity = [
    '2019-12',
    '2020-01',
    '2020-02',
    '2020-03',
    '2020-04',
    '2020-05',
    '2020-06',
    '2020-07',
    '2020-08',
    '2020-09',
    '2020-10',
    '2020-11',
];

const colorArr=['#00DAFF','#0058B4','#7F5BEA','#34CD7F']
const option = {
    backgroundColor:'#080b30',
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            saveAsImage: { show: true },
           
        }
    },
    color:colorArr,
    legend: {
        data: ['线路车辆公里能耗', '生成时间', '数据频发', '生成时间错误'],
        left: '3%',
        top: '40',
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 15,
        top:'10%',
        textStyle: {
            color: '#ACCFFF',
            fontSize: 12,
        },
    },
    title: {
        text: '近12个月线路能耗',
        textStyle: {
            color: '#FFFFFF',
            fontSize: '22',
            fontFamily: 'PingFang',
            fontWeight: '400',
        },
        padding: [10, 0, 1000, 500],
        left: 'center',
    },

    grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        top: '20%',
        containLabel: true,
    },
    yAxis: [
        {
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
            },
            axisLine: {
                lineStyle: {
                    color: '#0066FF',
                },
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
        },
        {
            name: '',
            // 单位 显示位置
            // nameLocation: 'start',

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
            },
            axisLine: {
                lineStyle: {
                    color: '#0066FF',
                },
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
        },
    ],
    xAxis: [
        {
            type: 'category',
            axisTick: {
                show: false,
            },
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
            },
            axisLine: {
                lineStyle: {
                    color: '#0066FF',
                },
            },
            data: datacity,
        },
    ],
    series: [
        {
            name:'线路车辆公里能耗',
            type:'line',
            yAxisIndex: 1,
            symbolSize: 10,
                symbol: 'circle',
                lineStyle: {
                    normal: {
                        color: '#00DAFF',
                        width: 2,
                        shadowBlur: 3,
                        shadowColor: 'rgba(0,0,0,0.2)',
                        shadowOffsetY: 10,
                    },
                },
			data: data1
        },
        {
            name: '生成时间',
            type: 'bar',
            barWidth: '20',
            stack: '总量',
            label: {
                show: false,
            },
            itemStyle: {
                normal: {
                    show: true,
                },
            },
            data: data2,
        },
        {
            name: '数据频发',
            type: 'bar',
            barWidth: '20',
            stack:'总量',
            label: {
                show: false,
            },
            itemStyle: {
                normal: {
                    show: true,
                },
            },
            data: data3,
        },
        {
            name: '生成时间错误',
            type: 'bar',
            stack:'总量',
            barWidth: '20',
            label: {
                show: false,
            },
            itemStyle: {
                normal: {
                    show: true,
                    barBorderRadius: [20, 20, 0, 0], // 圆角（左上、右上、右下、左下）
                },
            },
            data: data4,
        },
    ],
};


const LineChart = () => {
    const myChart = useRef();
    useEffect(() => {
        myChart.current = echarts.init(document.getElementById('scatterYChart'));
    }, [])
    const getData = async () => {
        myChart.current.setOption(option);
    }
    useEffect(() => {
        getData();
    });
    return (
        <div>

            <div id="scatterYChart" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default LineChart;