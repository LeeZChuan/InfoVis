//第三列图表：数据时效性：饼状图，柱状图组合
//多种组合图表联动展示

import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { getChartData } from '@/service/api';
import AppContext from '@/store';

const fontColor = '#30eee9';
const line_color = ['#EF7C1E', '#BCD8FF', '#00b3f4', '#00d4c7', '#61418C', '#434F96', '#E5AA25'];
const option = {
    backgroundColor: '#080b30',
    grid: [{
        x: '35%',
        y: '-15%',
        width: '60%',
        height: '100%'
    }],
    legend: [{
        x: '2%',
        y: '10%',
        orient: 'vertical',
        align: 'left',
        textStyle: {
            color: '#fff'
        },
        data: ['客服电话', '奥迪官网', '媒体曝光', '质检总局', '其他']
    },
    {
        x: "right",
        orient: 'vertical',
        top: "10%",
        textStyle: {
            color: '#fff'
        },
        data: [{}]//右侧折线图情况
    }
    ],
    tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        axisPointer: {
            type: 'shadow',
            label: {
                show: true,
                backgroundColor: '#7B7DDC'
            }
        }
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            saveAsImage: { show: true }
        }
    },
    xAxis: [{
        "type": "category",
        "axisLine": {
            lineStyle: {
                color: '#fff'
            }
        },
        "splitLine": {
            "show": false
        },
        "axisTick": {
            "show": false
        },
        "splitArea": {
            "show": false
        },
        "axisLabel": {
            "interval": 0,

        },
        "data": [{}],//时间变化情况
    }],
    yAxis: [{
        "type": "value",
        "splitLine": {
            "show": false
        },
        "axisLine": {
            lineStyle: {
                color: '#fff'
            }
        },
        "axisTick": {
            "show": false
        },
        "axisLabel": {
            "interval": 0,

        },
        "splitArea": {
            "show": false
        },

    }],
    dataZoom: [
        {
            show: true,
            start: 30,
            end: 100
        },
        {
            type: 'inside',
            start: 30,
            end: 100
        },
    ],
    series: [{
        name: '项目组规格、数量占比',
        type: 'pie',
        radius: '30%',
        center: ['22%', '55%'],
        color: [
            //Cyan
            '#61418C',
            '#434F96',
            '#E5AA25',
            '#2598BC',
            '#13c2c2'
        ],
        data: [{
            value: 335,
            name: '客服电话'
        },
        {
            value: 310,
            name: '奥迪官网'
        },
        {
            value: 234,
            name: '媒体曝光'
        },
        {
            value: 135,
            name: '质检总局'
        },
        {
            value: 105,
            name: '其他'
        },
        ],
        labelLine: {
            show: true
        },
        itemStyle: {
            normal: {
                borderWidth: 2,
                borderColor: '#FFF',
                label: {
                    show: true,
                    formatter: '{b} \n ({d}%)',
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
        },
    }]
};
const BarChart = () => {
    const { list } = useContext(AppContext);
    const myChart = useRef();
    useEffect(() => {
        myChart.current = echarts.init(document.getElementById('BarComboChart'));
    }, [])
    const getData = async (CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation) => {
        const Data = await getChartData(CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation);
        let seriesList = [];
        let objList = Object.keys(Data[0]);
        let DateList = Data.map(item => {
            return item[objList[0]];
        })
        //动态添加不同的属性的数据，让多个属性进行结合展示
        for (let i = 1; i < objList.length; i++) {
            seriesList.push({
                name: objList[i],
                type: 'line',
                smooth: true,
                stack: '百分比',
                symbol: 'circle',
                symbolSize: 10,
                itemStyle: {
                    normal: {
                        color: line_color[i - 1],
                        lineStyle: {
                            color: line_color[i - 1],
                            width: 1
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: 'rgba(7,44,90,0.3)'
                            }, {
                                offset: 1,
                                color: 'rgba(0,212,199,0.9)'
                            }]),
                        }
                    }
                },
                data: Data.map(item => {
                    return item[objList[i]];
                })
            });
        }

        option.xAxis[0].data = DateList;
        option.legend[1].data = objList.slice(1, objList.length-1);
        if(option.series.length!=1){
            //防止push的数组会无限不断添加进去
            let temp=option.series.slice(0,1);
            option.series=temp;
        }
        else{
            console.log("数组正常");
        }
        option.series.push(...seriesList);
        //数据配置
        myChart.current.setOption(option);
    }
    useEffect(() => {
        getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, "getDataTimeliness_ComboData");
        console.log("切换成功")
    },[list]);
    return (
        <div>
            <div id="BarComboChart" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default BarChart;