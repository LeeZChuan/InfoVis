//数据完整性：三个指标的时间序列堆叠图

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';


const option = {
    backgroundColor:'#080b30',
    title: {
        text: '数据有效性南丁格尔图',
        textStyle: {
            color: '#FFFFFF',
            fontSize: '22',
            fontFamily: 'PingFang',
            fontWeight: '400',
        },
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        left: 'center',
        top: 'bottom',
        data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
    },
    toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            saveAsImage: {show: true}
        }
    },
    series: [
        // {
        //     name: '半径模式',
        //     type: 'pie',
        //     radius: [20, 140],
        //     center: ['25%', '50%'],
        //     roseType: 'radius',
        //     itemStyle: {
        //         borderRadius: 5
        //     },
        //     label: {
        //         show: false
        //     },
        //     emphasis: {
        //         label: {
        //             show: true
        //         }
        //     },
        //     data: [
        //         {value: 40, name: 'rose 1'},
        //         {value: 33, name: 'rose 2'},
        //         {value: 28, name: 'rose 3'},
        //         {value: 22, name: 'rose 4'},
        //         {value: 20, name: 'rose 5'},
        //         {value: 15, name: 'rose 6'},
        //         {value: 12, name: 'rose 7'},
        //         {value: 10, name: 'rose 8'}
        //     ]
        // },
        {
            name: '面积模式',
            type: 'pie',
            radius: [20, 140],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 5
            },
            data: [
                {value: 30, name: 'rose 1'},
                {value: 28, name: 'rose 2'},
                {value: 26, name: 'rose 3'},
                {value: 24, name: 'rose 4'},
                {value: 22, name: 'rose 5'},
                {value: 20, name: 'rose 6'},
                {value: 18, name: 'rose 7'},
                {value: 16, name: 'rose 8'}
            ]
        }
    ]
};
const PieChart = () => {
    const myChart = useRef();
    useEffect(() => {
        // const myChartDom = document.getElementById('Chart');
        myChart.current = echarts.init(document.getElementById('PieChart'));
    }, [])
    const getData = async () => {
        myChart.current.setOption(option);
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>

            <div id="PieChart" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default PieChart;