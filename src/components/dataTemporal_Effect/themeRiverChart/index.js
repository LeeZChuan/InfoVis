//第三列图表：数据时效性：饼状图



import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { getChartData } from '@/service/api';
import AppContext from '@/store';

const line_color = ['#EF7C1E', '#BCD8FF', '#00b3f4', '#00d4c7', '#61418C', '#434F96', '#E5AA25'];
const option = {
    backgroundColor: '#080b30',
    // grid: [{
    //     x: '35%',
    //     y: '-15%',
    //     width: '60%',
    //     height: '100%'
    // }],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: 'rgba(0,0,0,0.2)',
                width: 1,
                type: 'solid'
            }
        }
    },
    legend: {
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 15,
        top: '10%',
        textStyle: {
            color: '#ACCFFF',
            fontSize: 12,
        },
        data: [{}]
    },
    toolbox: {
        show: true,
        feature: {
            dataView: { show: true, readOnly: false },
            saveAsImage: { show: true }
        }
    },
    singleAxis: {
        top: 50,
        bottom: 50,
        axisTick: {},
        axisLabel: {},
        type: 'time',
        axisPointer: {
            animation: true,
            label: {
                show: true
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                type: 'dashed',
                opacity: 0.2
            }
        }
    },
    series: [
        {
            type: 'themeRiver',
            emphasis: {
                itemStyle: {
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.8)'
                }
            },
            data: [{}]
        }
    ]
};
const ThemeRiverChart = () => {
    const { list } = useContext(AppContext);
    const myChart = useRef();
    useEffect(() => {
        myChart.current = echarts.init(document.getElementById('themeRiverChart'));
    }, [])
    const getData = async (CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation) => {
        const Data = await getChartData(CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation);
        let seriesList = [];
        let objList = Object.keys(Data[0]);
        let DateList = Data.map(item => {
            return item[objList[0]];
        })
        for(let i=0;i<objList.length;i++)
        {
            if(objList[i]=="msgDate")
            {

            }
            else{
                Data.map(item=>{
                    //时间，数值大小，名称
                    seriesList.push([item.msgDate,item[objList[i]],objList[i].toString()]) ;
                })
            }
        }
        option.series[0].data=seriesList;
        option.legend.data=objList.slice(1, objList.length-1);
        //数据配置
        myChart.current.setOption(option);
    }
    useEffect(() => {
        getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, "getDataTimeliness_ComboData");
    },[list]);
    return (
        <div>
            <div id="themeRiverChart" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default ThemeRiverChart;