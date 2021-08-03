//实现地图操控效果，用户选择地图特定坐标点，然后进行筛选坐标点，然后可以实现地图坐标点与右侧辅助分析图表的联动效果
//用于展示各地区时效性之间的关系


import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import 'echarts/map/js/china';
import { Menu, Table } from 'antd';
import { getworldData, getworldRankListData,getChinaData } from '@/service/api'//数据读取


const chinaMap = [];
const chinaHeader = [];
const worldMap = [];
const worldHeader = [];
//地图组件
class Map extends React.Component {
    //地图展示
    drawMap() {
        let max = 2000;
        let show = true;
        let text = '中国国内';
        let name = {};
        if (this.props.data === 'world') {
            //国际效果
            max = 200000
            show = false
            text = '世界疫情地图'
            name = {
                "Afghanistan": "阿富汗",
                "Angola": "安哥拉",
                "Albania": "阿尔巴尼亚",
                "Algeria": "阿尔及利亚",
                "Argentina": "阿根廷",
                "Armenia": "亚美尼亚",
                "Australia": "澳大利亚",
                "Austria": "奥地利",
                "Azerbaijan": "阿塞拜疆",
                "Bahamas": "巴哈马",
                "Bangladesh": "孟加拉国",
                "Belgium": "比利时",
                "Benin": "贝宁",
                "Burkina Faso": "布基纳法索",
                "Burundi": "布隆迪",
                "Bulgaria": "保加利亚",
                "Bosnia and Herz.": "波斯尼亚和黑塞哥维那",
                "Belarus": "白俄罗斯",
                "Belize": "伯利兹",
                "Bermuda": "百慕大群岛",
                "Bolivia": "玻利维亚",
                "Brazil": "巴西",
                "Brunei": "文莱",
                "Bhutan": "不丹",
                "Botswana": "博茨瓦纳",
                "Cambodia": "柬埔寨",
                "Cameroon": "喀麦隆",
                "Canada": "加拿大",
                "Central African Rep.": "中非共和国",
                "Chad": "乍得",
                "Chile": "智利",
                "China": "中国",
                "Colombia": "哥伦比亚",
                "Congo": "刚果",
                "Costa Rica": "哥斯达黎加",
                "Côte d'Ivoire": "科特迪瓦",
                "Croatia": "克罗地亚",
                "Cuba": "古巴",
                "Cyprus": "塞浦路斯",
                "Czech Rep.": "捷克共和国",
                "Dem. Rep. Korea": "韩国",
                "Dem. Rep. Congo": "民主刚果",
                "Denmark": "丹麦",
                "Djibouti": "吉布提",
                "Dominican Rep.": "多米尼加共和国",
                "Ecuador": "厄瓜多尔",
                "Egypt": "埃及",
                "El Salvador": "萨尔瓦多",
                "Eq. Guinea": "赤道几内亚",
                "Eritrea": "厄立特里亚",
                "Estonia": "爱沙尼亚",
                "Ethiopia": "埃塞俄比亚",
                "Falkland Is.": "福克兰群岛",
                "Fiji": "斐济",
                "Finland": "芬兰",
                "France": "法国",
                "French Guiana": "法属圭亚那",
                "Fr. S. Antarctic Lands": "法属南部领地",
                "Gabon": "加蓬",
                "Gambia": "冈比亚",
                "Germany": "德国",
                "Georgia": "佐治亚州",
                "Ghana": "加纳",
                "Greece": "希腊",
                "Greenland": "格陵兰",
                "Guatemala": "危地马拉",
                "Guinea": "几内亚",
                "Guinea-Bissau": "几内亚比绍",
                "Guyana": "圭亚那",
                "Haiti": "海地",
                "Heard I. and McDonald Is.": "赫德岛和麦克唐纳群岛",
                "Honduras": "洪都拉斯",
                "Hungary": "匈牙利",
                "Iceland": "冰岛",
                "India": "印度",
                "Indonesia": "印度尼西亚",
                "Iran": "伊朗",
                "Iraq": "伊拉克",
                "Ireland": "爱尔兰",
                "Israel": "以色列",
                "Italy": "意大利",
                "Ivory Coast": "象牙海岸",
                "Jamaica": "牙买加",
                "Japan": "日本",
                "Jordan": "乔丹",
                "Kashmir": "克什米尔",
                "Kazakhstan": "哈萨克斯坦",
                "Kenya": "肯尼亚",
                "Kosovo": "科索沃",
                "Kuwait": "科威特",
                "Kyrgyzstan": "吉尔吉斯斯坦",
                "Laos": "老挝",
                "Lao PDR": "老挝人民民主共和国",
                "Latvia": "拉脱维亚",
                "Lebanon": "黎巴嫩",
                "Lesotho": "莱索托",
                "Liberia": "利比里亚",
                "Libya": "利比亚",
                "Lithuania": "立陶宛",
                "Luxembourg": "卢森堡",
                "Madagascar": "马达加斯加",
                "Macedonia": "马其顿",
                "Malawi": "马拉维",
                "Malaysia": "马来西亚",
                "Mali": "马里",
                "Mauritania": "毛里塔尼亚",
                "Mexico": "墨西哥",
                "Moldova": "摩尔多瓦",
                "Mongolia": "蒙古",
                "Montenegro": "黑山",
                "Morocco": "摩洛哥",
                "Mozambique": "莫桑比克",
                "Myanmar": "缅甸",
                "Namibia": "纳米比亚",
                "Netherlands": "荷兰",
                "New Caledonia": "新喀里多尼亚",
                "New Zealand": "新西兰",
                "Nepal": "尼泊尔",
                "Nicaragua": "尼加拉瓜",
                "Niger": "尼日尔",
                "Nigeria": "尼日利亚",
                "Korea": "朝鲜",
                "Northern Cyprus": "北塞浦路斯",
                "Norway": "挪威",
                "Oman": "阿曼",
                "Pakistan": "巴基斯坦",
                "Panama": "巴拿马",
                "Papua New Guinea": "巴布亚新几内亚",
                "Paraguay": "巴拉圭",
                "Peru": "秘鲁",
                "Republic of the Congo": "刚果共和国",
                "Philippines": "菲律宾",
                "Poland": "波兰",
                "Portugal": "葡萄牙",
                "Puerto Rico": "波多黎各",
                "Qatar": "卡塔尔",
                "Republic of Serbia": "塞尔维亚共和国",
                "Romania": "罗马尼亚",
                "Russia": "俄罗斯",
                "Rwanda": "卢旺达",
                "Samoa": "萨摩亚",
                "Saudi Arabia": "沙特阿拉伯",
                "Senegal": "塞内加尔",
                "Serbia": "塞尔维亚",
                "Sierra Leone": "塞拉利昂",
                "Slovakia": "斯洛伐克",
                "Slovenia": "斯洛文尼亚",
                "Solomon Is.": "所罗门群岛",
                "Somaliland": "索马里兰",
                "Somalia": "索马里",
                "South Africa": "南非",
                "S. Geo. and S. Sandw. Is.": "南乔治亚和南桑德威奇群岛",
                "S. Sudan": "南苏丹",
                "Spain": "西班牙",
                "Sri Lanka": "斯里兰卡",
                "Sudan": "苏丹",
                "Suriname": "苏里南",
                "Swaziland": "斯威士兰",
                "Sweden": "瑞典",
                "Switzerland": "瑞士",
                "Syria": "叙利亚",
                "Tajikistan": "塔吉克斯坦",
                "Tanzania": "坦桑尼亚",
                "Thailand": "泰国",
                "Timor-Leste": "东帝汶",
                "Togo": "多哥",
                "Trinidad and Tobago": "特立尼达和多巴哥",
                "Tunisia": "突尼斯",
                "Turkey": "土耳其",
                "Turkmenistan": "土库曼斯坦",
                "Uganda": "乌干达",
                "Ukraine": "乌克兰",
                "United Arab Emirates": "阿拉伯联合酋长国",
                "United Kingdom": "大不列颠联合王国",
                "United Republic of Tanzania": "坦桑尼亚联合共和国",
                "United States": "美国",
                "United States of America": "美利坚合众国",
                "Uruguay": "乌拉圭",
                "Uzbekistan": "乌兹别克斯坦",
                "Vanuatu": "瓦努阿图",
                "Venezuela": "委内瑞拉",
                "Vietnam": "越南",
                "West Bank": "西岸",
                "W. Sahara": "西撒哈拉",
                "Yemen": "也门",
                "Zambia": "赞比亚",
                "Zimbabwe": "津巴布韦"
            }
        }
        let myChart = echarts.init(document.getElementById('mapChart'));
        window.addEventListener('resize', function () {
            myChart.resize();
        })
        let option = {
            title: {
                text: text,
                left: 'center'
            },
            tooltip: {
                formatter: function (params, ticket, callback) {
                    return params.seriesName + '<br />' + params.name + '：' + params.value
                }//数据格式化
            },
            visualMap: {
                calculable: true,
                min: 0,
                max: max,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'],//取值范围的文字
                inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered']//取值范围的颜色
                },
                show: true//图注
            },
            geo: {
                nameMap: name,
                map: this.props.data,
                roam: false,//不开启缩放和平移
                zoom: 1.23,//视角缩放比例
                label: {
                    normal: {
                        show: show,
                        fontSize: '10',
                        color: 'rgba(0,0,0,0.7)'
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(0, 0, 0, 0.2)'
                    },
                    emphasis: {
                        areaColor: '#F3B329',//鼠标选择区域颜色
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 20,
                        borderWidth: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            series: [
                {
                    name: '感染人数',
                    mapType: this.props.data,
                    type: 'map',
                    geoIndex: 0,

                    data: this.props.dataMap
                }
            ]
        };

        myChart.setOption(option);
    }
    componentDidUpdate() {
        this.drawMap()
    }
    render() {
        return (<div id="mapChart"></div>)
    }
}
//头部展示组件
function Header(params) {//肺炎数据总览
    var data = params.header
    return <div className='box'>
        {
            data.map((item, index) => {
                return (
                    <div className='box2' key={index}>
                        <p style={{ color: 'red', fontSize: '18px' }}>{item.total}</p>
                        <p style={{ color: '#222' }}>{item.name}</p>
                        <p style={{ color: 'red', fontSize: '12px' }}>较昨日{item.add >= 0 ? '+' : ''}<span style={{ color: 'red' }}>{item.add}</span></p>
                    </div>
                )
            })
        }
    </div>
}

//最后汇总数据组件
const ControlMap = () => {
    // const myChart = useRef();
    const [current, setcurrent] = useState('china');//当前选择的展示状体
    const [dataSource, setdataSource] = useState([]);//列表数据
    const [dataMap, setdataMap] = useState([]);//地图数据
    const [header, setheader] = useState([]);//头部预览数据
    const getData = () => {
        let worldData = getworldData();
        let rankList = getworldRankListData();
        let chinaData = getChinaData();
        //中国总览数据
        chinaHeader = [
            {
                name: '累计确诊',
                add: chinaData.chinaAdd.confirm,
                total: chinaData.chinaTotal.confirm
            },
            {
                name: '现有确诊',
                add: chinaData.chinaAdd.nowConfirm,
                total: chinaData.chinaTotal.nowConfirm
            },
            {
                name: '死亡人数',
                add: chinaData.chinaAdd.dead,
                total: chinaData.chinaTotal.dead
            },
            {
                name: '治愈人数',
                add: chinaData.chinaAdd.heal,
                total: chinaData.chinaTotal.heal
            }
        ]

        //世界总览数据
        worldHeader = [
            {
                name: '累计确诊',
                add: worldData.confirmAdd,
                total: worldData.confirm
            },
            {
                name: '现有确诊',
                add: worldData.nowConfirmAdd,
                total: worldData.nowConfirm
            },
            {
                name: '死亡人数',
                add: worldData.deadAdd,
                total: worldData.dead
            },
            {
                name: '治愈人数',
                add: worldData.healAdd,
                total: worldData.heal
            }
        ];

        //*****************地图数据列表循环****************************
        chinaData.areaTree[0].children.forEach((item, i) => {
            //中国地图数据
            chinaMap[i] = {
                name: item.name,
                value: item.total.confirm
            }
        })

        rankList.forEach((item, i) => {
            //世界地图数据
            worldMap[i] = {
                name: item.name,
                value: item.confirm
            }
        })

        worldMap.push({ name: '中国', value: chinaData.chinaTotal.confirm })
        //刷新数据
        setheader(chinaHeader);
        setdataMap(chinaMap);
    };

    const handleClick = e => {
        //按钮数据切换方法
        console.log('click', e);
        setcurrent(e.key);
        if (e.key === 'china') {
            setdataMap(chinaMap);
            setheader(chinaHeader);
        } else {
            setdataMap(worldMap);
            setheader(worldHeader);
        }
    }

    // useEffect(() => {
    //     myChart.current = echarts.init(document.getElementById('mapChart'));
    // }, [])
    useEffect(() => {
        getData();
    });
    return (
        <div>
            {/* <div id="mapChart" ref={myChart} style={{ height: '600px' }}></div> */}
            <div>
                <Menu onClick={handleClick} selectedKeys={{ current }} mode="horizontal">
                    <Menu.Item key="china">中国国内</Menu.Item>
                    <Menu.Item key="world">国外情况</Menu.Item>
                </Menu>
            </div>
            <Header header={header}></Header>
            <Map data={current} dataMap={dataMap}></Map>
        </div>
    )
}

export default ControlMap;

