//数据完整性：三个指标的时间序列堆叠图
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const option = {
    backgroundColor:'#080b30',
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
        data: ['2011年', '2012年'],
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
        data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)'],
        axisLine: {
            lineStyle: {
                color: '#BCD8FF'
            }
        }
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

            <div id="BarChart" ref={myChart} style={{ height: '600px',width:'1900px'}}></div>
        </div>
    )

}

export default BarChart;