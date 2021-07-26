//终端装车数据时序折线图
import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { getChartData} from '../../service/api'//数据读取
import AppContext from '../../store';

// import theme from '../../style/echartsMap/dark.json'
// const obj = JSON.parse(theme);


const option = {
    title: {
        text: '每日车辆数据趋势',
        subtext: '数据来自天远科技有限公司',
        left: 'center',
        align: 'right'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
    },
    length:{
        show:true
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {},
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },
    dataZoom: [
        {
            show: true,
            realtime: true,
            start: 0,
            end: 100
        },
        {
            type: 'inside',
            realtime: true,
            start: 0,
            end: 100
        }
    ],
    xAxis:[{
        type: 'category',
        data: [{}],
    }],
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} '+'辆'
        },
    },
    series: [{}]
};

const LineChart = () => {
    const myChart = useRef();
    const { list } = useContext(AppContext);
    const getData = async (CarBrand, CarStyle, CarDevNaData, startTime, endTime,Chartfuncation) => {
        let demoData = await getChartData(CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation);
        let timeData=[];
        let data=[];
        demoData.map((item)=>{
            timeData.push(item.month.toString());
            data.push(item.amount);
        })
        const series = [{
            name: '车辆数目',
            type: 'line',
            smooth: true,
            data:data
        }]
        option.xAxis[0].data=timeData;
        option.series=series;

        myChart.current.setOption(option);
    }
    useEffect(() => {
        // echarts.registerTheme('dark', obj)
        myChart.current = echarts.init(document.getElementById('carNumLineChart'));
    }, [])
    useEffect(() => {
        getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, "getCarInstallAmount");
    }, []);
    return (
        <div>

            <div id="carNumLineChart" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default LineChart;