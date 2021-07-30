//数据完整性：三个指标的时间序列堆叠图

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import {getTimeseriesData} from '../service/api';


const option = {
    angleAxis: {
        type: 'category',
        data: [{}]
    },
    radiusAxis: {
    },
    polar: {
    },
    series: [{
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
        data: ['Can完整度', '经纬度完整度', '时间完整度']
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            // precision : '3'
        },
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        position: function (pos, params, el, elRect, size) {
            var obj = {top: 10};
            obj[['left'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
        },
        extraCssText: 'width: 170px'
    },
    // fontStyle:'bold'
};

const LineChart = () => {
    const myChart = useRef();
    useEffect(() => {
        // const myChartDom = document.getElementById('Chart');
        myChart.current = echarts.init(document.getElementById('stactterPieChart'));
    }, [])
    const getData = async () => {
        const Data=await getTimeseriesData();
        let DataList=[];
        let canRate=[];
        let locRate=[];
        let dailyRecordRate=[];
        for(let i=0;i<Data.length;i++)
        {
            // DataList.push(new Date(Data[i].msgDate).toLocaleString())
            DataList.push(Data[i].msgDate);
            canRate.push(Data[i].canRate);
            locRate.push(Data[i].locRate);
            dailyRecordRate.push(Data[i].dailyRecordRate);
        }
        console.log(DataList);
        option.angleAxis.data=DataList;
        option.series[0].data=canRate
        option.series[1].data=locRate
        option.series[2].data=dailyRecordRate
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