/* 
   数据请求接口
   编写者：lzc
   创建时间：2021-7-2
*/


import axios from 'axios';
import { API_Base } from './config';//引入请求地址


//测试数据
export async function getTimeseriesData(carBrand) {
    const data = await axios.get(API_Base + "getTime_LineChartData/brand%" + carBrand + "&type%All&device%All&timeStart%" + "\'" + "xxxxx" + "\'" + "&timeEnd%" + "\'" + "xxx" + "\'");
    return data.data;
}

//车辆品牌列表数据
export async function getCarBrandData() {
    const data = await axios.get(API_Base + "getCarBrand/brand%All&type%All&device%All&timeStart%" + "\'" + "xxxxx" + "\'" + "&timeEnd%" + "\'" + "xxx" + "\'");
    return data.data;
}


//车辆机型列表数据
export async function getCarStyle(carBrand) {
    // console.log("api变化"+carBrand);
    const data = await axios.get(API_Base + "getCarStyle/brand%" + carBrand + "&type%All&device%All&timeStart%" + "\'" + "xxxxx" + "\'" + "&timeEnd%" + "\'" + "xxx" + "\'");
    return data.data;
}
//车辆终端类型列表数据查询
export async function getDeviceName(carBrand, carType) {
    const data = await axios.get(API_Base + "getDeviceName/brand%" + carBrand + "&type%" + carType + "&device%All&timeStart%" + "\'" + "xxxxx" + "\'" + "&timeEnd%" + "\'" + "xxx" + "\'");
    return data.data;
}
//绘制图表返回数据返还
export async function getChartData(carBrand, carType, deviceName, startTime, endTime, DataFuncation) {
    const data = await axios.get(API_Base + DataFuncation + "/brand%" + carBrand + "&type%" + carType + "&device%" + deviceName + "&timeStart%" + "\'" + startTime + "\'" + "&timeEnd%" + "\'" + endTime + "\'");
    return data.data;
}

export function downloadExcelData() {
    //获取python后端传回的excel表格文件
    axios.post('https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoGlobalStatis,FAutoContinentStatis,FAutoGlobalDailyList,FAutoCountryConfirmAdd').then((res) => {
        let worldData = res.data.data.FAutoGlobalStatis;
        return worldData;
    });
}
