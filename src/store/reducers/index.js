import {combineReducers} from 'redux'
import user from './user';
import chat from './chat';
// {home:{currentLesson:'all'},session:{user,err,msg,success}}
export default combineReducers({
    user,
    chat
});