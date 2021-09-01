/* 
    数据表格下载模块--基本功能1.0已经完成
    2.0版本需要，添加对表格的操作，例如多选下载，表格指标排序,
    编写者：lzc
    时间：2021-7-30 
*/

import React, { useContext, useState, useEffect } from 'react'
import { Card, Button, Table, TreeSelect, notification } from 'antd'
import { SecurityScanTwoTone, SecurityScanFilled } from '@ant-design/icons'
import { API_Base } from '@/service/config';//引入请求地址
import axios from 'axios'
import { getChartData } from '@/service/api'//数据读取
import AppContext from '@/store'

const INITOPTION = [
    //disable属性用于下拉框筛选项的禁用，如果需要放开去掉即可
    {
        title: "终端在线率",
        value: "A",
        children: [
            {
                title: '终端实时在线率',
                value: 'terminalOnlineRate',

            },
            {
                title: '终端历史在线率',
                value: 'terminalOnlineRateOfHistory',
                disabled: true,
            },
        ],
    },
    {
        title: "终端信息表/车辆统计原始数据",
        value: "carInfo"
    },
    {
        title: "数据准确性",
        value: "B",
        children: [
            {
                title: '工作时间准确性表',
                value: 'dataActuallyOfWorktime',
                disabled: true,
            },
            {
                title: '经纬度跳变',
                value: 'dataActuallyOfLocation',
            },
            {
                title: '数据频发',
                value: 'dataActuallyOfInfo',
                disabled: true,
            },
            {
                title: '生成时间错误',
                value: 'dataActuallyOfEroTime',
                disabled: true,
            },
            {
                title: '工况数据',
                value: 'dataActuallyOfCAN',
            },
            {
                title: 'CCI推送数据',
                value: 'dataActuallyOfCCI',
            },
        ],
    },
    {
        title: "数据完整性",
        value: "dataComplement",
        children: [
            {
                title: '字典表',
                value: 'dictTable',
                disabled: true,

            },
            {
                title: '采集频率配置表',
                value: 'receiveFre',
                disabled: true,
            },
        ]
    }, {
        title: "数据时效性",
        value: "dataTimelinessNormal",
        children: [
            {
                title: '数据时效性神钢定制',
                value: 'dataTimelinessOfKob',
                disabled: true,

            },
            {
                title: '数据时效性-神钢同步数据',
                value: 'dataTimelinessOfKob2',
                disabled: true,
            },
            {
                title: '数据时效性-CCI',
                value: 'dataTimelinessOfCCI',
                disabled: true,
            },
            {
                title: 'CSQ统计',
                value: 'CSQ',
                disabled: true,

            },

        ]
    }, {
        title: "数据连续性",
        value: "C",
        children: [
            {
                title: '日志信息',
                value: 'dataContinuallyOfDailyRecord',
                disabled: true,
            },
            {
                title: '定时信息',
                value: 'dataContinuallyOfTimingInfo',
            },
            {
                title: '信号连续性',
                value: 'dataContinuallyOfSignal',
                disabled: true,

            },
        ]
    }];


const styles = {
    tableStyle: {
        width: '100%'
    },
    affixBox: {
        position: 'absolute',
        top: 100,
        right: 50,
        with: 170
    }
}

const rowSelection = {
    //行选择配置项
    selections: true,
}

const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    console.log("选中后");
}

const downloadData = () => {
    //下载选中的列表函数 ,未来版本可能会添加进入到表格数据筛选下载页面  
    console.log("下载选中数据？？？？")
}

const TableDemo = () => {
    let data2 = []; // 表格数据
    let columns2 = []; // 表格属性
    const [dataList, setdataList] = useState([]); // 多选数组储存
    const [columnsList, setcolumnsList] = useState([]); // 多选数组储存
    const [chooseObj, setchooseObj] = useState("carInfo"); // 当前用户选中的展示方向
    const [chooseName, setchooseName] = useState("终端信息表/车辆统计原始数据"); // 当前用户选中的展示方向中文
    const { list } = useContext(AppContext);
    const { tableloading, settableloading } = useContext(AppContext);//table加载控件状态

    //弹窗方法
    const openNotification = (message, whatChange, placement) => {
        if (whatChange) {
            //操作成功弹窗
            notification.open({
                message: chooseName + '-表格数据操作成功',
                description: message,
                icon: <SecurityScanTwoTone style={{ color: '#F81D22' }} />,
                placement
            })

        } else {
            //操作失败弹窗
            notification.open({
                message: chooseName + '-表格数据操作失败',
                description: message,
                icon: <SecurityScanFilled style={{ color: '#F81D22' }} />,
                placement,
                duration: 8
            })

        }
    }
    //下载用户需要的所有数据表格
    const downloadAllData = () => {
        // 下载所有数据的csv文件函数
        axios.get(API_Base + "downloadExcelData/brand%" + list.nowChooseCarBrand + "_" + chooseObj + "&type%" + list.nowChooseCarStyle + "&device%" + list.nowCho_CarDevNaData + "&timeStart%" + "\'" + list.startTime + "\'" + "&timeEnd%" + "\'" + list.endTime + "\'")
            .then(res => {
                if (res.status === 200) {
                    const blob = new Blob([res.data], {
                        type: 'application/ms-excel',
                    });
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = e => {
                        const a = document.createElement('a');
                        a.download = Date.now() + '.csv';
                        a.href = e.target.result;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    };
                    openNotification("数据下载成功！", true, 'topRight');
                }
            })
            .catch(err => {
                openNotification("下载失败，请寻找原因,原因报错:" + err.message, false, 'topRight');
            });
    }
    //数据获取
    const getData = async (CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation) => {
        try {
            let TabdemoData = await getChartData(CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation);
            if (TabdemoData.length <= 1) {
                settableloading(false);
                openNotification("你所查询的数据表格，暂无数据，请重新查询", false, 'topRight');
            } else {
                //objList表格抬头列表名称
                let objList = Object.keys(TabdemoData[0]);
                if (columns2.length != 0 || data2.length != 0) {
                    //两者都可以截断数据
                    columns2.slice(0, columns2.length);
                    data2.length = 0;
                }
                else {
                    objList.map(item => {
                        if (item == "installDate") {
                            columns2.push({
                                title: TabdemoData[0][item],
                                dataIndex: item,
                                key: item,
                                sorter: (function (a, b) {
                                    let aTimeString = a.installDate;
                                    let aTime = new Date(aTimeString).getTime();
                                    let bTimeString = b.installDate;
                                    let bTime = new Date(bTimeString).getTime();
                                    return aTime - bTime;
                                }),
                                ellipsis: true,
                            })
                        } else if (item == "lastReceiveTime1") {
                            columns2.push({
                                title: TabdemoData[0][item],
                                dataIndex: item,
                                key: item,
                                sorter: (function (a, b) {
                                    let aTimeString = a.lastReceiveTime1;
                                    let aTime = new Date(aTimeString).getTime();
                                    let bTimeString = b.lastReceiveTime1;
                                    let bTime = new Date(bTimeString).getTime();
                                    return aTime - bTime;
                                }),
                                ellipsis: true,
                            })
                        }
                        else
                            columns2.push({
                                title: TabdemoData[0][item],
                                dataIndex: item,
                                key: item,
                            })
                    })
                    for (let i = 1; i < TabdemoData.length; i++) {
                        data2.push({
                            key: i - 1,
                            ...TabdemoData[i]
                        })
                    }
                }
                console.log(columns2);
                //数据进行配置
                setcolumnsList(columns2);
                setdataList(data2);
                settableloading(false);
                openNotification("查询成功", true, 'topRight');
            }
        } catch (error) {
            settableloading(false);
            openNotification("查询出错，原因:" + error.message, false, 'topRight');
        }

    }
    useEffect(() => {
        //在这里使用_对象进行拼接,实现动态切换查询与下载
        getData(list.nowChooseCarBrand + "_" + chooseObj, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, 'getExcelTableData');
        return () => {
            columns2.slice(0, columns2.length);
            data2.length = 0;
            console.log('will unmount')
        }
    }, [list, chooseObj]);

    return (
        <div>
            <Card bordered={false} title='原始数据表格' style={{ marginBottom: 10, minHeight: 762 }} id='select'>
                <TreeSelect
                    style={{ width: '200px' }}
                    value={chooseObj}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={INITOPTION}
                    placeholder="选中需要查看的数据表格"
                    treeDefaultExpandAll
                    onChange={(e, value) => {
                        settableloading(true);//开启加载动画
                        setchooseName(value);//设置当前选中的中文名称
                        setchooseObj(e);//动态当前选中的库的英文名称
                    }}
                >
                </TreeSelect>
                <Button onClick={downloadAllData}>下载完整Excel表格</Button>
                {/* <Button onClick={downloadData}>下载当前选择的Excel表格</Button> */}
                <Table
                    rowSelection={rowSelection}
                    dataSource={dataList}
                    columns={columnsList}
                    style={styles.tableStyle}
                    onChange={handleChange}
                    loading={tableloading}
                />
            </Card>
        </div>
    )

}


export default TableDemo;
