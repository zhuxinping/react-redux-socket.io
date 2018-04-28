import * as Types from '../action-types';

export function errorMsgAction(msg) {
    return {type:Types.ERROR_MSG,msg}
}
// export function registerAction(data) {
//     return {type:Types.REGISTER_SUCCESS,payload:data}
// }
// export function loginAction(data) {
//     return {type:Types.LOGIN_SUCCESS,payload:data}
// }
export function getUserInfoAction(data) {
    return {type:Types.LOAD_DATA,payload:data}
}
// export function updateUserInfoAction() {
//     return {type:Types.UPDATAE_USER,payload:data}
// }
export function authSuccessAction(data) {
    return {type:Types.AUTH_SUCCESS,payload:data}
}

export function userListAction(data) {
    return {type:Types.USER_LIST,payload:data}
}
export function logOutAction(){
    return {type:Types.LOGOUT}
}
export function getMesAction(data,users,userid) {
    return {type:Types.MSG_LIST,payload:{data,users,userid}}
}
export function mesRecvAction(data,userid) {
    return {type:Types.MSG_RECV,payload:{data,userid}}
}