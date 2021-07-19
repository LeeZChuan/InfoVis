//终端装车量时序折线图

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';


const option = {
    title: {
        text: '每日终端装车量',
        subtext: '纯属虚构'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} '+'辆'
        },
        axisPointer: {
            snap: true
        }
    },
    visualMap: {
        show: false,
        dimension: 0,
        pieces: [{
            lte: 6,
            color: 'green'
        }, {
            gt: 6,
            lte: 8,
            color: 'red'
        }, {
            gt: 8,
            lte: 14,
            color: 'green'
        }, {
            gt: 14,
            lte: 17,
            color: 'red'
        }, {
            gt: 17,
            color: 'green'
        }]
    },
    series: [
        {
            name: '记录车辆数',
            type: 'line',
            smooth: true,
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
            markArea: {
                itemStyle: {
                    color: 'rgba(255, 173, 177, 0.4)'
                },
                data: [ [{
                    name: '起伏期',
                    xAxis: '07:30'
                }, {
                    xAxis: '10:00'
                }], [{
                    name: '起伏期2',
                    xAxis: '17:30'
                }, {
                    xAxis: '21:15'
                }] ]
            }
        }
    ]
};

const LineChart = () => {
    const myChart = useRef();
    useEffect(() => {
        // const myChartDom = document.getElementById('Chart');
        myChart.current = echarts.init(document.getElementById('Chart'));
    }, [])
    const getData = async () => {
        myChart.current.setOption(option);
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>

            <div id="Chart" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default LineChart;