//数据完整性：三个指标的时间序列堆叠图

import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { getChartData } from '@/service/api';
import AppContext from '@/store';

const option = {
    backgroundColor: '#080b30',
    angleAxis: {
        type: 'category',
        data: [{}]
    },
    radiusAxis: {
    },
    polar: {
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            // precision : '3'
        },
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        position: function (pos, params, el, elRect, size) {
            var obj = { top: 10 };
            obj[['left'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
        },
        extraCssText: 'width: 170px'
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            saveAsImage: { show: true }
        }
    },
    series: [
        {
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
            type: 'bar',
            data: [{}],
            coordinateSystem: 'polar',
            name: 'Can完整度',
            stack: 'a',
            emphasis: {
                focus: 'series'
            }
        }, {
            type: 'bar',
            data: [{}],
            coordinateSystem: 'polar',
            name: '经纬度完整度',
            stack: 'a',
            emphasis: {
                focus: 'series'
            }
        }, {
            type: 'bar',
            data: [{}],
            coordinateSystem: 'polar',
            name: '时间完整度',
            stack: 'a',
            emphasis: {
                focus: 'series'
            }
        }],
    legend: {
        show: true,
        data: ['Can完整度', '经纬度完整度', '时间完整度'],
        left: '30%',
        top: '40',
        itemWidth: 15,
        itemHeight: 15,
        itemGap: 15,
        top: '0%',
        left: '35%',
        textStyle: {
            color: '#ACCFFF',
            fontSize: 15,
        },
    },
    //无障碍阅读
    aria: {
        enabled: true,
        decal: {
            show: true
        }
    }
};

const LineChart = () => {
    const { list } = useContext(AppContext);
    const myChart = useRef();
    useEffect(() => {
        myChart.current = echarts.init(document.getElementById('stactterPieChart'));
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
        console.log(Data);
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
                // DataList.push(new Date(Data[i].msgDate).toLocaleString())
                DataList.push(Data[i].msgDate);
                canRate.push(Data[i].canRate);
                locRate.push(Data[i].locRate);
                dailyRecordRate.push(Data[i].dailyRecordRate);
            }
        }
        option.angleAxis.data = DataList;
        option.series[0].data = canRate
        option.series[1].data = locRate
        option.series[2].data = dailyRecordRate
        console.log(option);
        //showLoading遮盖层隐藏
        myChart.current.hideLoading();
        myChart.current.setOption(option);
    }
    useEffect(() => {
        getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, "getTime_LineChartData");
    }, [list]);
    return (
        <div>
            <div id="stactterPieChart" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default LineChart;