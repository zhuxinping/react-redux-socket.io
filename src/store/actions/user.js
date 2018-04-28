//异步注册用户action
import {getRegister,getLogin,updateUserInfo} from '../../api'
import {errorMsgAction,getUserInfoAction,authSuccessAction,logOutAction} from './actionsCreators';
//用户注册
export function register({user,pwd,repeatpwd,type}) {
    if(!user||!pwd||!type){
        return errorMsgAction('用户名密码必须输入');//如果输入框用户名或者密码或者类型为空就会dispatch  派发errorMsg这个同步action
    }
    if(pwd!==repeatpwd){
        return errorMsgAction('密码和确认密码不一致,请重新输入');
    }
    return async (dispatch)=>{
        let {data}=await getRegister({user,pwd,repeatpwd,type});
       // console.log(data);
        if(data.code==0){
            dispatch(authSuccessAction(data.data));
        }else{
            dispatch(errorMsgAction(data.msg));
        }
    }

}
//用户登录
export function login({user,pwd}) {
    if(!user||!pwd){
        return errorMsgAction('用户名密码必须输入');
    }
    return async (dispatch)=>{
        let {data}=await  getLogin({user,pwd});
        //console.log(data);
        if(data.code==0){
            dispatch(authSuccessAction(data.data));
        }else{
            dispatch(errorMsgAction(data.msg));
        }
    }
}
//获取用户信息
export function loadData(userinfo){
    //console.log(loadData)
    return getUserInfoAction(userinfo);
}
//上传用户个人信息
export function update(info) {
    let {title,desc,avatar}=info;
    if(!avatar){
        return errorMsgAction('头像不能为空,请选择一个头像!');
    }
    if(!title){
        return errorMsgAction('职位名称不能为空!');
    }
    if(!desc){
        return errorMsgAction('个人简介不能为空!');
    }
    //console.log(info);
    return async (dispatch)=>{
        let {data}=await updateUserInfo(info);
        if(data.code==0){
            dispatch(authSuccessAction(data.data));
        }else{
            dispatch(errorMsgAction(data.msg));
        }
    }
}
//用户退出登录
export function logoutSubmit(){
    return logOutAction()
}