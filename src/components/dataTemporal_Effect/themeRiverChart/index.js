
/* 
   数据时效性-主题河流图
   编写者：lzc
   创建时间：2021-7-15
*/



import React, { useEffect, useRef, useContext } from 'react';
import * as echarts from 'echarts';
import { getChartData } from '@/service/api';
import AppContext from '@/store';

const line_color = ['#EF7C1E', '#BCD8FF', '#00b3f4', '#00d4c7', '#61418C', '#434F96', '#E5AA25'];
const option = {
    backgroundColor: '#080b30',
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
        //showLoading遮盖层显示
        myChart.current.showLoading({
            text: '数据正在努力加载中...',
            color: '#c23531',
            textColor: 'black',
            // 字体大小。从 `v4.8.0` 开始支持。
            fontSize: 45,
            // 字体粗细。从 `v5.0.1` 开始支持。
            fontWeight: 'normal',
            // 字体风格。从 `v5.0.1` 开始支持。
            fontStyle: 'normal',
            // 字体系列。从 `v5.0.1` 开始支持。
            fontFamily: 'sans-serif',
            backgroundColor: 'rgba(255, 255, 255, 0)'
        });
    }, [])
    const getData = async (CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation) => {
        const Data = await getChartData(CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation);
        let seriesList = [];
        let objList = Object.keys(Data[0]);
        //日期列表
        let DateList = Data.map(item => {
            return item[objList[0]];
        })
        for (let i = 0; i < objList.length; i++) {
            if (objList[i] == "msgDate") {

            }
            else {
                Data.map(item => {
                    //时间，数值大小，名称
                    seriesList.push([item.msgDate, item[objList[i]], objList[i].toString()]);
                })
            }
        }
        // console.log(seriesList);
        // console.log(objList);
        option.series[0].data = seriesList;
        option.legend.data = objList.slice(1, objList.length);
        //数据配置
        myChart.current.setOption(option);
        //showLoading遮盖层隐藏
        myChart.current.hideLoading();
    }
    useEffect(() => {
        getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, "getDataTimeliness_ComboData");
    }, [list]);
    return (
        <div>
            <div id="themeRiverChart" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default ThemeRiverChart;