//第三列图表：数据时效性：柱状图或者折线图切换展示
//多种组合图表联动展示--暂时放弃了，但是右侧折线图已经完成数据展示

import React, { useEffect, useRef, useContext, useState } from 'react';
import * as echarts from 'echarts';
import { getChartData } from '@/service/api';
import AppContext from '@/store';
import { Select } from 'antd'
const { Option } = Select;

const CHOOSE_OPTION = ["A1count", "A2count", "CSQcount", "Pcount", "Scount"];
const color = ['#00ffff', '#00cfff', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000'];
const option = {
    backgroundColor: '#080b30',
    color: color,
    // title: {},
    graphic: {
        elements: [{
            type: "image",
            z: 3,
            style: {
                width: 200,
                height: 200
            },
            left: 'center',
            top: 'center',
            position: [100, 100]
        }]
    },
    tooltip: {
        show: false
    },
    toolbox: {
        show: true,
        feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            saveAsImage: { show: true },
        }
    },
    legend: {
        icon: "circle",
        orient: 'horizontal',
        // x: 'left',
        data: [{}],
        right: 150,
        bottom: 0,
        align: 'right',
        textStyle: {
            color: "#fff"
        },
        itemGap: 10
    },
    series: [{}]
};

const DataIntPieChart = () => {
    const { list } = useContext(AppContext);
    const myChart = useRef();
    const [noeChoose, setnoeChoose] = useState("A1count");
    const [selectChoose, setselectChoose] = useState(false);
    const chooseStyle = (e) => {
        setnoeChoose(e);
        setselectChoose(true);
    }
    useEffect(() => {
        myChart.current = echarts.init(document.getElementById('dataTemporalpieChart'));
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
        console.log("数据时效性饼状图");
        console.log(Data);
        let objList = Data.map(item => { return (item.deltaT) });
        let tilie = {
            text: noeChoose + '数据时效性',
            top: '48%',
            textAlign: "center",
            left: "49%",
            textStyle: {
                color: '#fff',
                fontSize: 16,
                fontWeight: '400'
            }
        }
        let data = [];
        if (data.length != 0) {
            data.length = 0;
        } else {
            for (var i = 0; i < Data.length; i++) {
                data.push({
                    value: Data[i][noeChoose],
                    name: Data[i].deltaT,
                    itemStyle: {
                        normal: {
                            borderWidth: 5,
                            shadowBlur: 20,
                            borderColor: color[i],
                            shadowColor: color[i]
                        }
                    }
                });
            }
        }

        //动态添加不同的属性的数据，让多个属性进行结合展示
        let seriesList = {
            name: '',
            type: 'pie',
            clockWise: false,
            radius: ['40%', '80%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                fontSize: 16,
                position: 'inner',
                color:'black',
                formatter: params => {
                    return `范围：${params.name}\n\n${params.percent.toFixed(2)}%`
                },
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '15',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: data
        }
        //数据配置
        option.legend.data = objList;
        option.series = seriesList;
        option.title = tilie;
        myChart.current.setOption(option);
        //showLoading遮盖层隐藏
        myChart.current.hideLoading();
    }
    useEffect(() => {
        getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, "getDataTimeliness_PieData");
    }, [list]);
    useEffect(() => {
        getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, "getDataTimeliness_PieData");
    }, [noeChoose]);//下拉框筛选联动图表展示
    return (
        <div>
            <Select
                showSearch
                style={{ width: 120 }}
                placeholder={selectChoose ? noeChoose : "查询品牌"}
                onChange={e => {
                    chooseStyle(e);
                }}>
                {
                    CHOOSE_OPTION.map(item => {
                        return (
                            <Option value={item} key={item}>
                                {item}
                            </Option>
                        )
                    })
                }
            </Select>
            <div id="dataTemporalpieChart" ref={myChart} style={{ height: '400px' }}></div>
        </div>
    )

}

export default DataIntPieChart;