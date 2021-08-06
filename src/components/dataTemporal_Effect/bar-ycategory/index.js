//数据时效性：数据排行榜

import React, { useEffect, useRef,useContext } from 'react';
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
    }, [])
    const getData = async (CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation) => {
        const Data = await getChartData(CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation);
        console.log(Data);
        let yAxis_name=Object.keys(Data[0]);
        let serise_data=[];
        for(let[key,value] of Object.entries(Data[0])){
            //获取对象数值
            serise_data.push(value);

        }
        option.yAxis.data=yAxis_name;
        option.series[0].data=serise_data;
        //数据配置
        myChart.current.setOption(option);
    }
    useEffect(() => {
        getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, "getDataTimeliness_BaryData");
    },[list]);
    return (
        <div>

            <div id="rankingBarChart" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default BarChart;