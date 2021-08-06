//第三列图表：数据时效性：柱状图或者折线图切换展示
//多种组合图表联动展示--暂时放弃了，但是右侧折线图已经完成数据展示

import React, { useEffect, useRef, useContext, useState } from 'react';
import * as echarts from 'echarts';
import { getChartData } from '@/service/api';
import AppContext from '@/store';
import { Select } from 'antd'
const { Option } = Select;

const chooseOption = ["A1count", "A2count", "CSQcount", "Pcount", "Scount"];
const color = ['#00ffff', '#00cfff', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000'];
const option = {
    backgroundColor: '#080b30',
    color: color,
    title: {},
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
    toolbox: {
        show: false
    },
    series: [{}]
};

const DataIntPieChart = () => {
    const { list } = useContext(AppContext);
    const myChart = useRef();
    const [noeChoose, setnoeChoose] = useState("A1count");
    const chooseStyle = (e) => {
        setnoeChoose(e);
    }
    useEffect(() => {
        myChart.current = echarts.init(document.getElementById('dataTemporalpieChart'));
    }, [])
    const getData = async (CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation) => {
        const Data = await getChartData(CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation);
        let objList = Data.map(item => { return (item.deltaT) });
        let tilie = {
            text: noeChoose+'数据时效性',
            top: '48%',
            textAlign: "center",
            left: "49%",
            textStyle: {
                color: '#fff',
                fontSize: 22,
                fontWeight: '400'
            }
        }
        let data = [];
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
            }, {
                value: 2,
                name: '',
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        },
                        color: 'rgba(0, 0, 0, 0)',
                        borderColor: 'rgba(0, 0, 0, 0)',
                        borderWidth: 0
                    }
                }
            });
        }
        //动态添加不同的属性的数据，让多个属性进行结合展示
        let seriesList = {
            name: '',
            type: 'pie',
            clockWise: false,
            radius: [105, 109],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'outside',
                        color: '#ddd',
                        formatter: function (params) {
                            var percent = 0;
                            var total = 0;
                            for (var i = 0; i < Data.length; i++) {
                                total += Data[i][noeChoose];
                            }
                            percent = ((params.value / total) * 100).toFixed(0);
                            if (params.name !== '') {
                                return '名称：' + params.name + '\n' + '\n' + '占比：' + percent + '%';
                            } else {
                                return '';
                            }
                        },
                    },
                    labelLine: {
                        length: 30,
                        length2: 100,
                        show: true,
                        color: '#00ffff'
                    }
                }
            },
            data: data
        }
        //数据配置
        option.legend.data = objList;
        option.series = seriesList;
        option.title=tilie;
        myChart.current.setOption(option);
    }
    useEffect(() => {
        getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, "getDataTimeliness_PieData");
    }, [list]);
    useEffect(() => {
        getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, "getDataTimeliness_PieData");
    }, [noeChoose]);
    return (
        <div>
            <Select
                showSearch
                style={{ width: 120 }}
                onChange={e => {
                    chooseStyle(e);
                }}>
                {
                    chooseOption.map(item => {
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