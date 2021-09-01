//数据时效性：数据排行榜

/* 
    数据时效性：排行榜柱状图
    编写者：lzc
    时间：2021-7-10
*/

import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { getChartData } from '@/service/api';
import AppContext from '@/store';

const option = {
    backgroundColor: '#080b30',
    title: {
        text: '数据时效性-各类时效性概况',
        textStyle: {
            color: '#FFFFFF',
            fontSize: '22',
            fontFamily: 'PingFang',
            fontWeight: '400',
        },
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            saveAsImage: { show: true },
        }
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            saveAsImage: { show: true }
        }
    },
    legend: {
        data: [''],
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
            margin: 10,
            textStyle: {
                color: '#BCD8FF',
                fontFamily: 'PingFang',
                fontStyle: 'normal',
                fontSize: 15,
            },
        },

    },
    yAxis: {
        //动态排列盘y轴样式
        type: 'category',
        data: [{}],
        axisLine: {
            lineStyle: {
                color: '#BCD8FF'
            }
        }
    },
    series: [
        {
            name: '',
            type: 'bar',
            data: [{}]
        }
    ]
};


const BarChart = () => {
    const { list } = useContext(AppContext);
    const myChart = useRef();
    useEffect(() => {
        myChart.current = echarts.init(document.getElementById('rankingBarChart'));
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
        console.log("数据排行榜数据");
        console.log(Data);
        let yAxis_name = Object.keys(Data[0]);
        let serise_data = [];
        if (serise_data.length != 0) {
            serise_data.length = 0;
        }
        else {
            for (let [key, value] of Object.entries(Data[0])) {
                //获取对象数值
                serise_data.push(value);
            }
        }

        option.yAxis.data = yAxis_name;
        option.series[0].data = serise_data;
        //数据配置
        myChart.current.setOption(option);
        //showLoading遮盖层隐藏
        myChart.current.hideLoading();
    }
    useEffect(() => {
        getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, "getDataTimeliness_BaryData");
    }, [list]);
    return (
        <div>

            <div id="rankingBarChart" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default BarChart;