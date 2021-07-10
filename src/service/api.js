//数据请求

import axios from 'axios';
import { apiBase } from './config';//引入请求地址
// import { cookie } from 'request'; //引入cookie保存登录信息

//测试数据
export async function getDemodata(){
    const data = await axios.get("http://192.168.19.2:5000/vis/get/get_InstChartData/brand%All&type%All&device%All&timeStart%xxxxx&timeEnd%xxx");
    // console.log(data);
    return data.data;
}
