//数据请求

import axios from 'axios';
import { apiBase } from './config';//引入请求地址
// import { cookie } from 'request'; //引入cookie保存登录信息


// export default {
//     methods: {
//          getCarBrandData() {
//             const data = axios.get(apiBase + "getCarBrand/brand%All&type%All&device%All&timeStart%" + "\'" + "xxxxx" + "\'" + "&timeEnd%" + "\'" + "xxx" + "\'");
//             return data.data;
//         },
//     }
// }


//数据
export async function getTimeseriesData(carBrand) {
    const data = await axios.get(apiBase + "getTime_LineChartData/brand%" + carBrand + "&type%All&device%All&timeStart%" + "\'" + "xxxxx" + "\'" + "&timeEnd%" + "\'" + "xxx" + "\'");
    return data.data;
}

//车辆品牌数据
export async function getCarBrandData() {
    const data = await axios.get(apiBase + "getCarBrand/brand%All&type%All&device%All&timeStart%" + "\'" + "xxxxx" + "\'" + "&timeEnd%" + "\'" + "xxx" + "\'");
    return data.data;
}

//车辆品牌数据
// export function getCarBrandData() {
//      axios.get(apiBase + "getCarBrand/brand%All&type%All&device%All&timeStart%" + "\'" + "xxxxx" + "\'" + "&timeEnd%" + "\'" + "xxx" + "\'").then((res)=>{
//          let carBrandData=res.data;
//          return carBrandData;
//      });
// }
//车辆机型数据
export async function getCarStyle(carBrand) {
    // console.log("api变化"+carBrand);
    const data = await axios.get(apiBase + "getCarStyle/brand%" + carBrand + "&type%All&device%All&timeStart%" + "\'" + "xxxxx" + "\'" + "&timeEnd%" + "\'" + "xxx" + "\'");
    return data.data;
}
//车辆终端类型查询
export async function getDeviceName(carBrand, carType) {
    const data = await axios.get(apiBase + "getDeviceName/brand%" + carBrand + "&type%" + carType + "&device%All&timeStart%" + "\'" + "xxxxx" + "\'" + "&timeEnd%" + "\'" + "xxx" + "\'");
    return data.data;
}
//绘制图表返回数据返还(已经将所有图表使用同一个方法进行返还了)
export async function getChartData(carBrand, carType, deviceName, startTime, endTime, DataFuncation) {
    const data = await axios.get(apiBase + DataFuncation + "/brand%" + carBrand + "&type%" + carType + "&device%" + deviceName + "&timeStart%" + "\'" + startTime + "\'" + "&timeEnd%" + "\'" + endTime + "\'");
    // console.log(carBrand);
    return data.data;
}



export function downloadExcelData() {
    //获取python后端传回的excel表格文件
    axios.post('https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoGlobalStatis,FAutoContinentStatis,FAutoGlobalDailyList,FAutoCountryConfirmAdd').then((res) => {
        let worldData = res.data.data.FAutoGlobalStatis;
        return worldData;
    });
}

// export function downloadExcelData() {
//     //获取python后端传回的excel表格文件
//     axios.post('https://api.inews.qq.com/newsqa/v1/automation/modules/list?modules=FAutoGlobalStatis,FAutoContinentStatis,FAutoGlobalDailyList,FAutoCountryConfirmAdd').then((res) => {
//         let worldData = res.data.data.FAutoGlobalStatis;
//         return worldData;
//     });
// }

export function getworldRankListData() {
    //获取世界各国肺炎疫情
    axios.post('https://api.inews.qq.com/newsqa/v1/automation/foreign/country/ranklist').then((res) => {
        let worldRankListData = res.data.data;
        return worldRankListData;
    });
}

export function getChinaData() {
  
}