import {userListAction,getMesAction,mesRecvAction} from './actionsCreators';
import {getUserList,getMesList} from '../../api';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');
//获取 用户列表信息
export function getChatList(type) {
    return async (dispatch)=>{
        let {data}=await getUserList(type);
        if(data.code==0){
            dispatch(userListAction(data.data));
        }
    }
}
//获取聊天列表
export function getMessageList() {
    return async (dispatch,getState)=>{
        let {data}=await getMesList();
        if(data.code==0){
            const userid=getState().user._id;
            console.log(getState());
            dispatch(getMesAction(data.data,data.users,userid));
        }
    }
}

//发送聊天信息
export function sendMsg({from,to,chatMsg}) {
    return (dispatch)=>{
        socket.emit('sendmsg',{from,to,chatMsg});
    }
}

//接收消息
export function recvMsg() {
    return (dispatch,getState)=>{
        const userId = getState().user._id;
        socket.on('recvmsg',(data)=>{
            dispatch(mesRecvAction(data,userId));
        });
    }
}