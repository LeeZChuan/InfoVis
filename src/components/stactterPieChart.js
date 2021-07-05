//数据完整性：三个指标的时间序列堆叠图

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';


const option = {
    angleAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    radiusAxis: {
    },
    polar: {
    },
    series: [{
        type: 'bar',
        data: [1, 2, 3, 4, 3, 5, 1],
        coordinateSystem: 'polar',
        name: 'A',
        stack: 'a',
        emphasis: {
            focus: 'series'
        }
    }, {
        type: 'bar',
        data: [2, 4, 6, 1, 3, 2, 1],
        coordinateSystem: 'polar',
        name: 'B',
        stack: 'a',
        emphasis: {
            focus: 'series'
        }
    }, {
        type: 'bar',
        data: [1, 2, 3, 4, 1, 2, 5],
        coordinateSystem: 'polar',
        name: 'C',
        stack: 'a',
        emphasis: {
            focus: 'series'
        }
    }],
    legend: {
        show: true,
        data: ['A', 'B', 'C']
    }
};

const LineChart = () => {
    const myChart = useRef();
    useEffect(() => {
        // const myChartDom = document.getElementById('Chart');
        myChart.current = echarts.init(document.getElementById('stactterPieChart'));
    }, [])
    const getData = async () => {
        myChart.current.setOption(option);
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>

            <div id="stactterPieChart" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default LineChart;