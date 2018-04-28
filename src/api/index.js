import axios from '../config';
export function getInfo() {
    return axios.get('/user/info');
}
export function getRegister(data) {
    return axios.post('/user/register',{...data});
}
export function getLogin(data) {
    return axios.post('/user/login',{...data});
}
export function updateUserInfo(data) {
    return axios.post('/user/update',{...data});
}

//获取牛人信息列表
export function getUserList(type) {
    return axios.get('/user/list',{params:type});
}
//获取聊天信息列表
export function getMesList() {
    return axios.get('/user/getmsglist');
}