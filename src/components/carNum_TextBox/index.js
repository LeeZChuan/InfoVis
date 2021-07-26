//终端装车数据列表展示
import React, { useEffect, useContext } from 'react';
import { getChartData } from '../../service/api'//数据读取
import { Card, Table } from 'antd'
import AppContext from '../../store';
import './styles.less';


const styles = {
    tableStyle: {
        width: '100%'
    },
}

const rowSelection = {
    selections: true,
}
const data = [];
const columns = [{
    title: "型号",
    dataIndex: '',
    key: ''
},
{
    title: "时间",
    dataIndex: '',
    key: ''
}];

const CarNumListTable = () => {
    const { list } = useContext(AppContext);
    const getData = async (CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation) => {
        let demoData = await getChartData(CarBrand, CarStyle, CarDevNaData, startTime, endTime, Chartfuncation);
        //判断筛选的数据长度，如果不够弹窗进行报错，然后用户重新选择
        if (demoData.length !== 0) {
            for (let i = 0; i < columns.length; i++) {
                columns[i].dataIndex = Object.keys(demoData[0])[i];
                columns[i].key = Object.keys(demoData[0])[i];
            }
        } else {

            console.log("表格暂无数据，请重新选择")
        }
        demoData.map((item, index) => {
            data.push({
                key: index,
                carID: item.carID,
                installDate: item.installDate
            })
        })

    }

    const select = () => {
        console.log(1);
    }
    useEffect(() => {
        getData(list.nowChooseCarBrand, list.nowChooseCarStyle, list.nowCho_CarDevNaData, list.startTime, list.endTime, "getCarInstallInfo");

    }, []);
    return (
        <div className={'tableStyle'}>
            {/* <TypingCard id='howUse' source={cardContent} height={178} /> */}
            {/* <Card bordered={false} title='车辆数据表格' style={{ marginBottom: 5, minHeight: 400 }} id='select'></Card> */}
                <Table rowSelection={rowSelection} rowKey={()=>data.key} dataSource={data} columns={columns}  style={styles.tableStyle} scroll={{x:'max-content'}} onChange={select} pagination={false}/>
    

        </div>
    )

}

export default CarNumListTable;