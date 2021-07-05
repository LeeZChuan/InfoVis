// 在线率表示仪表盘1


import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';


const option = {
    series: [{
        type: 'gauge',
        progress: {
            show: true,
            width: 18
        },
        axisLine: {
            lineStyle: {
                width: 18
            }
        },
        axisTick: {
            show: false
        },
        splitLine: {
            length: 15,
            lineStyle: {
                width: 2,
                color: '#999'
            }
        },
        axisLabel: {
            distance: 25,
            color: '#999',
            fontSize: 15
        },
        anchor: {
            show: true,
            showAbove: true,
            size: 15,
            itemStyle: {
                borderWidth: 10
            }
        },
        title: {
            show: false
        },
        detail: {
            valueAnimation: true,
            fontSize: 60,
            offsetCenter: [0, '70%']
        },
        data: [{
            value: 70
        }]
    }]
};

const InstrumentChart = () => {
    const myChart = useRef();
    useEffect(() => {
        // const myChartDom = document.getElementById('Chart');
        myChart.current = echarts.init(document.getElementById('instrumentChart'));
    }, [])
    const getData = async () => {
        myChart.current.setOption(option);
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <div id="instrumentChart" ref={myChart} style={{ height: '400px '}}></div>
        </div>
    )

}

export default InstrumentChart;