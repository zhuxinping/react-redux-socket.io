import axios from 'axios';
import {Toast} from 'antd-mobile';
axios.defaults.baseURL = 'http://localhost:3000';
//拦截请求
axios.interceptors.request.use(function (config) {
    Toast.loading('加载中',0);
    //console.log(config);
    return config;
});
//拦截响应
axios.interceptors.response.use(function (config) {
   // setTimeout(()=>{
   //     Toast.hide();
   // },2000);
    Toast.hide();
   // console.log(config);
    return config;
});
export default axios;