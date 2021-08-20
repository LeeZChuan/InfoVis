/* 
   数据完整性三种方向时序折线图
   编写者：lzc
   创建时间：2021-7-12
*/



import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { getChartData } from '@/service/api';
import AppContext from '@/store';

const option = {
    backgroundColor: '#080b30',
    title: {
        text: '数据完整性关系图',
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
        bottom: 80
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
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
            animation: false,
        },
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        position: function (pos, params, el, elRect, size) {
            var obj = { top: 10 };
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
        },
        extraCssText: 'width: 170px'
    },
    legend: {
        data: ['Can完整度', '经纬度完整度', '时间完整度'],
        left: '5%',
        top: '40',
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 15,
        top: '1%',
        textStyle: {
            color: '#ACCFFF',
            fontSize: 12,
        },
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
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            // axisLine: { onZero: false },
            axisLine: { show: true },
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
            splitArea: {
                // show: true,
                color: '#f00',
                lineStyle: {
                    color: '#f00'
                },
            },
            data: [{}]
        }

    ],
    yAxis: [
        {
            name: 'Can完整度(%)',
            type: 'value',
            max: 100,
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
        },
        {
            name: '经纬度完整度(%)',
            max: 100,
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
        },
        {
            name: '经纬度完整度(%)',
            max: 100,
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
        },

    ],
    series: [
        {
            name: 'Can完整度',
            type: 'line',
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            symbolSize: 10,
            lineStyle: {
                normal: {
                    color: "#00b3f4",
                    shadowColor: 'rgba(0, 0, 0, .3)',
                    shadowBlur: 0,
                    shadowOffsetY: 5,
                    shadowOffsetX: 5,
                },
            },
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    color: '#00b3f4',
                }
            },
            itemStyle: {
                color: "#00b3f4",
                borderColor: "#fff",
                borderWidth: 3,
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2,
            },
            tooltip: {
                show: false
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0,179,244,0.3)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(0,179,244,0)'
                    }
                    ], false),
                    shadowColor: 'rgba(0,179,244, 0.9)',
                    shadowBlur: 20
                }
            },
            data: [{}]
        },
        {
            name: '经纬度完整度',
            type: 'line',
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            symbolSize: 10,
            lineStyle: {
                normal: {
                    color: "#00ca95",
                    shadowColor: 'rgba(0, 0, 0, .3)',
                    shadowBlur: 0,
                    shadowOffsetY: 5,
                    shadowOffsetX: 5,
                },
            },
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    color: '#00ca95',
                }
            },

            itemStyle: {
                color: "#00ca95",
                borderColor: "#fff",
                borderWidth: 3,
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2,
            },
            tooltip: {
                show: false
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0,202,149,0.3)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(0,202,149,0)'
                    }
                    ], false),
                    shadowColor: 'rgba(0,202,149, 0.9)',
                    shadowBlur: 20
                }
            },
            data: [{}]
        },
        {
            name: '时间完整度',
            type: 'line',
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            symbolSize: 10,
            lineStyle: {
                normal: {
                    color: "#EF7C1E",
                    shadowColor: 'rgba(0, 0, 0, .3)',
                    shadowBlur: 0,
                    shadowOffsetY: 5,
                    shadowOffsetX: 5,
                },
            },
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    color: '#EF7C1E',
                }
            },

            itemStyle: {
                color: "#EF7C1E",
                borderColor: "#fff",
                borderWidth: 3,
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 2,
                shadowOffsetX: 2,
            },
            tooltip: {
                show: false
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(239,124,30,0.3)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(239,124,30,0)'
                    }
                    ], false),
                    shadowColor: 'rgba(239,124,30, 0.9)',
                    shadowBlur: 20
                }
            },
            data: [{}]
        }
    ]
};

const LineChart = () => {
    const { list } = useContext(AppContext);
    const myChart = useRef();
    useEffect(() => {
        myChart.current = echarts.init(document.getElementById('timeLineChart'), null, { renderer: 'svg' });
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
        let DataList = [];
        let canRate = [];
        let locRate = [];
        let dailyRecordRate = [];
        if (DataList.length != 0 || canRate.length != 0 || locRate.length != 0 || dailyRecordRate.length != 0) {
            DataList.length = 0;
            canRate.length = 0;
            locRate.length = 0;
            dailyRecordRate.length = 0;
        } else {
            for (let i = 0; i < Data.length; i++) {
                DataList.push(Data[i].msgDate);
                canRate.push(Data[i].canRate * 100);
                locRate.push(Data[i].locRate * 100);
                dailyRecordRate.push(Data[i].dailyRecordRate * 100);
            }
        }
        //数据配置
        option.xAxis[0].data = DataList;
        option.series[0].data = canRate
        option.series[1].data = locRate
        option.series[2].data = dailyRecordRate
        myChart.current.setOption(option);
        //showLoading遮盖层隐藏
        myChart.current.hideLoading();
    }

    useEffect(() => {
        getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, "getTime_LineChartData");
    },[list]);
    return (
        <div>
            <div id="timeLineChart" theme="theme" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default LineChart;