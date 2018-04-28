import * as Types from '../action-types';
const initState={
    userList:[],
    chatMsg:[],
    users:{},
    unread:0
};
function chat(state=initState,action) {
    switch (action.type){
        case Types.USER_LIST:
            return {...state,userList:action.payload};
        case Types.MSG_LIST:
            return {...state,users:action.payload.users,chatMsg:action.payload.data,unread:action.payload.data.filter(v=>(!v.read)&&(v.to==action.payload.userid)).length};
        case Types.MSG_RECV:
            const n = action.payload.to== action.payload.userid ? 1 : 0;
            //console.log(action.payload)
            return {...state,chatMsg:[...state.chatMsg,action.payload],unread:state.unread+n}
        case Types.MSG_READ:
        default:
            return state;
    }
}
export default chat;