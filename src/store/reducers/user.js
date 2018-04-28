import * as Types from '../action-types';
import{getRedirectPath} from '../../util/util';
let initState={
    redirectTo:'',
    msg:'',
    user:'',
    type:''
};

 function user(state=initState,action) {
    switch (action.type){
        case Types.AUTH_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload};
        case Types.ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg};
        case Types.LOAD_DATA:
            return {...state,...action.payload};
        case Types.LOGOUT:
            return {...initState,redirectTo:'/login'};
        default:
            return state;
    }
}
export default user;

