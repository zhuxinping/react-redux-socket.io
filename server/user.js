const express=require('express');
const utils=require('utility');
const Router=express.Router();
const model=require('./model');
const User=model.getModel('user');
const Chat=model.getModel('chat');
const _fliter={'pwd':0,'_v':0};
Router.get('/list',function(req,res){
    const {type}=req.query;
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc});
    });
});
Router.get('/info',function (req,res) {
    const {userid}=req.cookies;
    if(!userid){
        return res.json({code:1});
    }
   User.findOne({_id:userid},_fliter,function (err,doc) {
       if(err){
           return res.json({code:1,msg:'后端出错了!'});
       }
       if(doc){
           return res.json({code:0,data:doc});
       }
   });
});
//用户注册
Router.post('/register',function (req,res) {
    //console.log(req.body);
    let {user,pwd,type}=req.body;
    console.log(user,pwd,type);
    User.findOne({user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复，请重新输入!'})
        }
        const userModel=new User({user,type,pwd:md5Pwd(pwd)});//这样才能生成id
        userModel.save(function (err,doc) {
            if(err){
                return res.json({code:1,msg:'后端出错了!'})
            }
            let {user,type,_id}=doc;
            res.cookie('userid',_id);
            return res.json({code:0,data:{user,type,_id}});
        });
    });
});
//用户登录
Router.post('/login',function (req,res) {
    let {user,pwd}=req.body;
    User.findOne({user,pwd:md5Pwd(pwd)},_fliter,function (err,doc) {
        if(!doc){
            return res.json({code:1,msg:'用户名不存在或密码错误!'})
        }
        res.cookie('userid',doc._id);
        return res.json({code:0,data:doc});
    });
});
function md5Pwd(pwd){
    const salt='react_and_vue_345787!@#$%%';
    return utils.md5( utils.md5(pwd+salt));
}
//完善个人信息
Router.post('/update',function (req,res) {
    let userid=req.cookies.userid;
    if(!userid){
        return res.json({code:1});
    }
    const body=req.body;
    User.findByIdAndUpdate(userid,body,function (err,doc) {
        const data=Object.assign({
            user:doc.user,
            type:doc.type
        }, body);
        return res.json({code:0,data});
    });
});
//获取聊天信息列表
Router.get('/getmsglist',function (req,res) {
    const user=req.cookies.userid;
    User.find({},function (err,userdoc) {
        let users={}
        userdoc.forEach(item=>{
            users[item._id]={name:item.user,avatar:item.avatar}
        });
        Chat.find({'$or':[{from:user},{to:user}]},function (err,doc) {
            if(!err){
                return res.json({
                    code:0,data:doc,users:users
                });
            }
        });
    });
    //'$or':[{from:user,to:user}]

});
module.exports=Router;