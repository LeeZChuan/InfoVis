//每日采集数据量折线图

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';


const option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line',
        symbol: 'triangle',
        symbolSize: 20,
        lineStyle: {
            color: '#5470C6',
            width: 4,
            type: 'dashed'
        },
        itemStyle: {
            borderWidth: 3,
            borderColor: '#EE6666',
            color: 'yellow'
        }
    }]
};

const LineChart = () => {
    const myChart = useRef();
    useEffect(() => {
        // const myChartDom = document.getElementById('Chart');
        myChart.current = echarts.init(document.getElementById('everydayLineChart'));
    }, [])
    const getData = async () => {
        myChart.current.setOption(option);
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>

            <div id="everydayLineChart" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default LineChart;