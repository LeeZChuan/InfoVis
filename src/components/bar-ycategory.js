//数据完整性：三个指标的时间序列堆叠图

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';


const option = {
    title: {
        text: '数据时效性-各类时效性概况',
        subtext: '数据来自网络'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['2011年', '2012年']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
    },
    series: [
        {
            name: '2011年',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
        },
        {
            name: '2012年',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
        }
    ]
};

const BarChart = () => {
    const myChart = useRef();
    useEffect(() => {
        // const myChartDom = document.getElementById('Chart');
        myChart.current = echarts.init(document.getElementById('BarChart'));
    }, [])
    const getData = async () => {
        myChart.current.setOption(option);
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>

            <div id="BarChart" ref={myChart} style={{ height: '600px' }}></div>
        </div>
    )

}

export default BarChart;