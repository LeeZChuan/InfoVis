import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { getChartData } from '@/service/api';
import AppContext from '@/store';

const colorArr = ['#00DAFF', '#0058B4', '#7F5BEA', '#34CD7F']
const option = {
    backgroundColor: '#080b30',
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
    color: colorArr,
    legend: {
        data: ['Can数据', '工作时间', '位置信息', '信息时间','信息生成时间错误'],
        left: '3%',
        top: '40',
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 15,
        top: '10%',
        textStyle: {
            color: '#ACCFFF',
            fontSize: 12,
        },
    },
    title: {
        text: '数据完整性占比情况展示',
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
                formatter: '{value} %',
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
            name: '百分比(%)',
            // 单位 显示位置
            // nameLocation: 'start',
            type: 'value',
            axisLabel: {
                //坐标轴刻度标签的相关设置。
                interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
                margin: 15,
                formatter: '{value} %',
                textStyle: {
                    color: '#BCD8FF',
                    fontFamily: 'PingFang',
                    fontStyle: 'normal',
                    fontSize: 12,
                },
            },
            axisLine: {
                lineStyle: {
                    color: '#BCD8FF',
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
            data: [{}],
        },
    ],
    series: [
        {
            name: 'Can数据',
            type: 'line',
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
            data: [{}]
        },
        {
            name: '工作时间',
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
            data: [{}],
        },
        {
            name: '位置信息',
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
            data: [{}],
        },
        {
            name: '信息时间',
            type: 'bar',
            stack: '总量',
            barWidth: '20',
            label: {
                show: false,
            },
            itemStyle: {
                normal: {
                    show: true, 
                },
            },
            data: [{}],
        },
        {
            name: '信息生成时间错误',
            type: 'bar',
            stack: '总量',
            barWidth: '20',
            label: {
                show: false,
            },
            itemStyle: {
                normal: {
                    show: true,
                    color: '#DB2F75',
                    barBorderRadius: [20, 20, 0, 0], // 圆角（左上、右上、右下、左下）
                },
            },
            data: [{}],
        },
    ],
};


const LineChart = () => {
    const { list } = useContext(AppContext);
    const myChart = useRef();
    useEffect(() => {
        myChart.current = echarts.init(document.getElementById('scatterYChart'));
    }, [])
    const getData = async (CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation) => {
        const Data = await getChartData(CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation);
        let datacity = [];
        let Can = [];//can数据
        let Error = [];//错误信息数据
        let Info = [];//信息参数
        let Loc = [];//位置信息参数
        let Work = [];//工作时间
        Data.map(item => {
            datacity.push(item.msgDate);
            Can.push(item.RoCan*100);
            Error.push(item.RoErrotime*100);
            Info.push(item.RoInfo*100);
            Loc.push(item.RoLocation*100);
            Work.push(item.RoWorktime*100);
        })
        option.series[0].data = Can;
        option.series[1].data = Work;
        option.series[2].data = Loc;
        option.series[3].data = Info;
        option.series[4].data = Error;
        option.xAxis[0].data = datacity;
        myChart.current.setOption(option);
    }
    useEffect(() => {
        getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, "getDataValidation_MultipleData");
    },[list]);
    return (
        <div>

            <div id="scatterYChart" ref={myChart} style={{ height: '400px' ,width:'100%'}}></div>
        </div>
    )

}

export default LineChart;