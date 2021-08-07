// 数据表格下载模块

import React, { useContext, useState, useEffect } from 'react'
import { Card, Button, Table } from 'antd'
import axios, { post } from 'axios'
import { getChartData } from '@/service/api'//数据读取
import AppContext from '@/store'
import { Select } from 'antd'
const { Option } = Select;

const INITOPTION = ["A", "B"];

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


const downloadAllData = (carBrand, carType, deviceName, startTime, endTime) => {
    //下载所有数据的函数
    console.log("下载所有数据！！！！！");
    axios.get("http://192.168.19.2:5000/vis/get/downloadExcelData/brand%" + carBrand + "&type%" + carType + "&device%" + deviceName + "&timeStart%" + "\'" + startTime + "\'" + "&timeEnd%" + "\'" + endTime + "\'")
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
                    a.download = '全部数据.csv';
                    console.log(a);
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
}

const TableDemo = () => {

    let data2 = [];//表格数据
    let columns2 = [];//表格属性
    const dataList = useState([]);//多选数组储存
    // const chooseObj = useState("A");//多选数组储存
    const [chooseObj, setchooseObj] = useState("A")
    const [downloadfile, setdownloadfile] = useState(false);
    const filteredInfo = useState(null);
    const sortedInfo = useState(null);
    const { list } = useContext(AppContext);
    // {
    //     title: 'Name',
    //     dataIndex: 'name',
    //     key: 'name',
    //     filters: [
    //         { text: 'Edward', value: 'Edward' },
    //         { text: 'Jim', value: 'Jim' },
    //     ],
    //     filteredValue: filteredInfo.name || null,
    //     onFilter: (value, record) => record.name.includes(value),
    //     sorter: (a, b) => a.name.length - b.name.length,
    //     sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    //     ellipsis: true,
    // }

    const getData = async (CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation) => {
        let TabdemoData = await getChartData(CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation);
        console.log(TabdemoData);
        let objList = Object.keys(TabdemoData[0]);
        console.log(objList);
        objList.map(item => {
            columns2.push({
                title: TabdemoData[0][item],
                dataIndex: item,
                key: item,
            })
        })
        console.log(columns2);
        for (let i = 1; i < TabdemoData.length; i++) {
            data2.push({
                key: i - 1,
                ...TabdemoData[i]
            })
        }
        console.log(data2);
        // {
        //     title: 'Age',
        //     dataIndex: 'age',
        //     key: 'age',
        //     sorter: (a, b) => a.age - b.age,
        //     sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
        //     ellipsis: true,
        // }
        // {
        //     title: 'Mon',
        //     dataIndex: 'mon',
        //     key: 'mon',
        // },

    }

    useEffect(() => {
        getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, 'getExcelTableData_' + chooseObj);
        return () => {
            data2.splice(0, data2.length);
            columns2.splice(0, columns2.length);
            console.log('will unmount')
        }
    }, [list, chooseObj]);

    return (
        <div>
            {/* <TypingCard id='howUse' source={cardContent} height={178} /> */}
            <Card bordered={false} title='原始数据表格' style={{ marginBottom: 10, minHeight: 762 }} id='select'>
                <Button onClick={downloadAllData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime)}>下载完整Excel表格</Button>
                <Button onClick={downloadData()}>下载当前选择的Excel表格</Button>
                <Select
                    placeholder={"选中需要查看的表格数据"}
                    onChange={e => {
                        setchooseObj(e);
                    }} >
                    {
                        INITOPTION.map(item => {
                            return (
                                <Option value={item} key={item}>
                                    {item}
                                </Option>
                            )
                        })
                    }
                </Select>
                <Table rowSelection={rowSelection} dataSource={data2} columns={columns2} style={styles.tableStyle} onChange={handleChange} />
            </Card>
        </div>
    )

}


export default TableDemo;
