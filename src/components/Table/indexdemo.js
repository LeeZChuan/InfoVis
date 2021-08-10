// 数据表格下载模块

import React, { useContext, useState, useEffect } from 'react'
import { Card, Button, Table } from 'antd'
import axios from 'axios'
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




const TableDemo = () => {

    let data2 = [];//表格数据
    let columns2 = [];//表格属性
    const [dataList, setdataList] = useState([]);//多选数组储存
    const [columnsList, setcolumnsList] = useState([]);//多选数组储存
    const [chooseObj, setchooseObj] = useState("A")
    const { list } = useContext(AppContext);

    const downloadAllData = () => {
        //下载所有数据的函数
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
        console.log(TabdemoData);
        let objList = Object.keys(TabdemoData[0]);
        console.log(objList);
        if (columns2.length != 0 || data2.length != 0) {
            //两者都可以截断数据
            columns2.slice(0, columns2.length);
            data2.length = 0;
        }
        else {
            objList.map(item => {
                console.log(item);
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
                <Button onClick={downloadAllData}>下载完整Excel表格</Button>
                <Button onClick={downloadData}>下载当前选择的Excel表格</Button>
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
                <Table rowSelection={rowSelection} dataSource={dataList} columns={columnsList} style={styles.tableStyle} onChange={handleChange} />
            </Card>
        </div>
    )

}


export default TableDemo;
