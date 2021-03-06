/* 
   数据请求接口
   编写者：lzc
   创建时间：2021-7-2
*/

import axios from 'axios';
import { API_Base } from './config';//引入请求地址


//车辆品牌列表数据
export async function getCarBrandData(startTime, endTime) {
    const data = await axios.get(API_Base + "getCarBrand/brand%All&type%All&device%All&timeStart%" + "\'" + startTime + "\'" + "&timeEnd%" + "\'" + endTime + "\'");
    console.log("车辆品牌")
    console.log(data.data);
    return data.data;
}
//车辆机型列表数据
export async function getCarStyle(carBrand, startTime, endTime) {
    const data = await axios.get(API_Base + "getCarStyle/brand%" + carBrand + "&type%All&device%All&timeStart%" + "\'" + startTime + "\'" + "&timeEnd%" + "\'" + endTime + "\'");
    console.log("车辆机型")
    console.log(data.data);
    return data.data;
}
//车辆终端类型列表数据查询
export async function getDeviceName(carBrand, carType, startTime, endTime) {
    const data = await axios.get(API_Base + "getDeviceName/brand%" + carBrand + "&type%" + carType + "&device%All&timeStart%" + "\'" + startTime + "\'" + "&timeEnd%" + "\'" + endTime + "\'");
    console.log("车辆终端数据")
    console.log(data.data);
    return data.data;
}
//绘制图表返回数据返还
export async function getChartData(carBrand, carType, deviceName, startTime, endTime, DataFuncation) {
    const data = await axios.get(API_Base + DataFuncation + "/brand%" + carBrand + "&type%" + carType + "&device%" + deviceName + "&timeStart%" + "\'" + startTime + "\'" + "&timeEnd%" + "\'" + endTime + "\'");
    return data.data;
}
