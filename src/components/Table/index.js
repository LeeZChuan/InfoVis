// 数据表格下载模块

import React from 'react'
import { Card, Popconfirm, Button, Icon, Table, Divider, BackTop, Affix, Anchor, Form, InputNumber, Input } from 'antd'
// import axios from 'axios'
import { useState } from 'react'




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
const downloadAllData = () => {
    //下载所有数据的函数
    console.log("下载成功")

}
const TableDemo = () => {
    const dataList = useState([]);//多选数组储存
    const filteredInfo = useState(null);
    const sortedInfo = useState(null);



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
                <Button onClick={downloadAllData}>下载完整Excel表格</Button>
                <Button onClick={downloadData}>下载当前选择的Excel表格</Button>
                <Table rowSelection={rowSelection} dataSource={data2} columns={columns2} style={styles.tableStyle} onChange={handleChange} />
            </Card>
        </div>
    )

}


export default TableDemo;
