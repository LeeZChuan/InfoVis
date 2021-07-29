//数据请求

import axios from 'axios';
import { apiBase } from './config';//引入请求地址
// import { cookie } from 'request'; //引入cookie保存登录信息


//数据
export async function getTimeseriesData(carBrand){
    const data = await axios.get(apiBase+"getTime_LineChartData/brand%"+carBrand+"&type%All&device%All&timeStart%"+"\'"+"xxxxx"+"\'"+"&timeEnd%"+"\'"+"xxx"+"\'");
    return data.data;
}

//车辆品牌数据
export async function getCarBrandData(){
    const data = await axios.get(apiBase+"getCarBrand/brand%All&type%All&device%All&timeStart%"+"\'"+"xxxxx"+"\'"+"&timeEnd%"+"\'"+"xxx"+"\'");
    return data.data;
}
//车辆机型数据
export async function getCarStyle(carBrand){
    // console.log("api变化"+carBrand);
    const data = await axios.get(apiBase+"getCarStyle/brand%"+carBrand+"&type%All&device%All&timeStart%"+"\'"+"xxxxx"+"\'"+"&timeEnd%"+"\'"+"xxx"+"\'");
    // console.log(data.data);
    return data.data;
}
//车辆终端类型查询
export async function getDeviceName(carBrand,carType){
    const data = await axios.get(apiBase+"getDeviceName/brand%"+carBrand+"&type%"+carType+"&device%All&timeStart%"+"\'"+"xxxxx"+"\'"+"&timeEnd%"+"\'"+"xxx"+"\'");
    // console.log(data);
    return data.data;
}
//绘制图表返回数据返还
export async function getChartData(carBrand,carType,deviceName,startTime,endTime,DataFuncation){
    const data = await axios.get(apiBase+DataFuncation+"/brand%"+carBrand+"&type%"+carType+"&device%"+deviceName+"&timeStart%"+"\'"+startTime+"\'"+"&timeEnd%"+"\'"+endTime+"\'");
    // console.log(carBrand);
    return data.data;
}

//绘制图表返回数据返还
export async function getNumLineChartData(carBrand,carType,deviceName,startTime,endTime){
    const data = await axios.get("http://192.168.19.2:5000/vis/get/getCarInstallAmount/brand%"+carBrand+"&type%"+carType+"&device%"+deviceName+"&timeStart%"+startTime+"&timeEnd%"+endTime);
    // console.log("api内部")
    // console.log(carBrand);
    return data.data;
}