export function getRedirectPath({type,avatar}){
    //根据用户名信息 返回跳转地址
   /* user.type /boss /genius
    user.avatar /bossinfo /geniusinfo */
   //console.log(type);
   let url=(type=='boss')?'/boss':'/genius'
    if(!avatar){
       url+='info';
    }
    return url;
}

export function getChatId(userId,targetId) {
    return [userId,targetId].sort().join('_');
}