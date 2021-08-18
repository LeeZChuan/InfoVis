/* 
数据表格下载模块--基本功能已经完成
编写者：lzc
时间：2021-7-30 
*/


import React, { useContext, useState, useEffect } from 'react'
import { Card, Button, Table, Select, TreeSelect } from 'antd'
import axios from 'axios'
import { getChartData } from '@/service/api'//数据读取
import AppContext from '@/store'
const { Option } = Select;

const INITOPTION = [{
    title: "数据准确性",
    value: "A",
    children: [
        {
            title: '工作时间准确性表',
            value: 'cc',
        },
        {
            title: '经纬度跳变',
            value: 'ccc',
        },
        {
            title: '数据频发',
            value: 'ccac',
        },
        {
            title: '生成时间错误',
            value: 'cccc',
        },
        {
            title: '工况数据',
            value: 'acc',
        },
        {
            title: 'CCI推送数据',
            value: 'ssd',
        },
    ],
},
{
    title: "数据完整性",
    value: "B",
    children:[
        {
            title: '字典表',
            value: 'ads',
        },
        {
            title: '采集频率配置表',
            value: 'eqwe',
        },
    ]
}, {
    title: "数据时效性",
    value: "C",
    children:[
        {
            title: '数据时效性神钢定制',
            value: 'zz12',
        },
        {
            title: '数据时效性-神钢同步数据',
            value: 'cc23x',
        },
        {
            title: '数据时效性-CCI',
            value: 'dda',
        },
        {
            title: 'CSQ统计',
            value: 'eqw',
        },
        
    ]
}, {
    title: "数据连续性",
    value: "D",
    children:[
        {
            title: '日志信息',
            value: 'zz',
        },
        {
            title: '定时信息',
            value: 'ccx',
        },
        {
            title: '信号连续性',
            value: 'dd123a',
        },  
    ]
}, {
    title: "数据在线率",
    value: "E",
    children:[
        {
            title: '终端实时在线率',
            value: 'zz3',
        },
        {
            title: '终端历史在线率',
            value: 'c3cx',
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
    //下载选中的列表函数    
    console.log("下载选中数据？？？？")
}




const TableDemo = () => {

    let data2 = []; // 表格数据
    let columns2 = []; // 表格属性
    const [dataList, setdataList] = useState([]); // 多选数组储存
    const [columnsList, setcolumnsList] = useState([]); // 多选数组储存
    const [chooseObj, setchooseObj] = useState("A")
    const { list } = useContext(AppContext);

    const downloadAllData = () => {
        // 下载所有数据的csv文件函数
        axios.get("http://192.168.19.2:5000/vis/get/downloadExcelData/brand%" + list.nowChooseCarBrand + "&type%" + list.nowChooseCarStyle + "&device%" + list.nowCho_CarDevNaData + "&timeStart%" + "\'" + list.startTime + "\'" + "&timeEnd%" + "\'" + list.endTime + "\'")
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    const blob = new Blob([res.data], {
                        type: 'application/ms-excel',
                    });
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = e => {
                        const a = document.createElement('a');
                        // console.log(a);
                        a.download = Date.now() + '.csv';
                        a.href = e.target.result;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    };
                }
            })
            .catch(err => {
                console.log(err.message);
            });
        console.log("下载成功");
    }

    const getData = async (CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation) => {
        let TabdemoData = await getChartData(CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation);
        //objList表格抬头列表名称
        let objList = Object.keys(TabdemoData[0]);
        if (columns2.length != 0 || data2.length != 0) {
            //两者都可以截断数据
            columns2.slice(0, columns2.length);
            data2.length = 0;
        }
        else {
            objList.map(item => {
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
        //数据进行配置
        setcolumnsList(columns2);
        setdataList(data2);
    }

    useEffect(() => {
        getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, 'getExcelTableData_' + chooseObj);
        return () => {
            console.log('will unmount')
        }
    }, [list, chooseObj]);

    return (
        <div>
            <Card bordered={false} title='原始数据表格' style={{ marginBottom: 10, minHeight: 762 }} id='select'>
                {/* <Select
                    placeholder={"选中需要查看的表格数据"}
                    onChange={e => {
                        setchooseObj(e);
                    }} >
                    {
                        INITOPTION.map(item => {
                            return (
                                <Option value={item.value} key={item.value}>
                                    {item.name}
                                </Option>
                            )
                        })
                    }
                </Select> */}

                <TreeSelect
                    style={{ width: '200px' }}
                    value={chooseObj}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={INITOPTION}
                    placeholder="选中需要查看的表格数据"
                    treeDefaultExpandAll
                    onChange={e => {
                        console.log(e);
                        setchooseObj(e);
                    }}
                />
                <Button onClick={downloadAllData}>下载完整Excel表格</Button>
                {/* <Button onClick={downloadData}>下载当前选择的Excel表格</Button> */}
                <Table rowSelection={rowSelection} dataSource={dataList} columns={columnsList} style={styles.tableStyle} onChange={handleChange} />
            </Card>
        </div>
    )

}


export default TableDemo;
