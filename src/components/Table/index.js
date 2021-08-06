// 数据表格下载模块

import React, { useContext } from 'react'
import { Card, Button, Table } from 'antd'
import axios, { post } from 'axios'
import { useState } from 'react'
import AppContext from '@/store';

const data2 = []
for (let i = 0; i < 80000; i++) {
    data2.push({
        key: i,
        name: `Edward King ${i}`,
        age: Math.random() * 100,
        address: `London, Park Lane no. ${i}`,
        mon: 'daydayup',
        sex: 'nan',
    })
}


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
    selections: true,
}

const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    console.log("选中后");
}

const downloadData = () => {
    //下载选中的列表函数    

}
const downloadAllData = (carBrand, carType, deviceName, startTime, endTime) => {
    //下载所有数据的函数
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
                    a.download = '全部数据.xls';
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

    // axios.get("http://192.168.19.2:5000/vis/get/downloadExcelData/brand%" + carBrand + "&type%" + carType + "&device%" + deviceName + "&timeStart%" + "\'" + startTime + "\'" + "&timeEnd%" + "\'" + endTime + "\'")
    //     .then(res => {
    //         console.log(res);
    //     })
    console.log("下载成功");

}
const TableDemo = () => {
    const dataList = useState([]);//多选数组储存
    const filteredInfo = useState(null);
    const sortedInfo = useState(null);
    const { list } = useContext(AppContext);
    const columns2 = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            filters: [
                { text: 'Edward', value: 'Edward' },
                { text: 'Jim', value: 'Jim' },
            ],
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            ellipsis: true,
        }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
            ellipsis: true,
        }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            filters: [
                { text: 'London', value: 'London' },
                { text: 'New York', value: 'New York' },
            ],
            filteredValue: filteredInfo.address || null,
            onFilter: (value, record) => record.address.includes(value),
            sorter: (a, b) => a.address.length - b.address.length,
            sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Mon',
            dataIndex: 'mon',
            key: 'mon',
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
        }]

    return (
        <div>
            {/* <TypingCard id='howUse' source={cardContent} height={178} /> */}
            <Card bordered={false} title='原始数据表格' style={{ marginBottom: 10, minHeight: 762 }} id='select'>
                <Button onClick={downloadAllData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime)}>下载完整Excel表格</Button>
                <Button onClick={downloadData}>下载当前选择的Excel表格</Button>
                <Table rowSelection={rowSelection} dataSource={data2} columns={columns2} style={styles.tableStyle} onChange={handleChange} />
            </Card>
        </div>
    )

}


export default TableDemo;
