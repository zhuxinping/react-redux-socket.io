const express=require('express');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const model=require('./model');
const User=model.getModel('user');
const Chat=model.getModel('chat');
const app=express();
//work with express
const server=app.listen(9093,function () {
    console.log('Node app start at port 9093');
});
//const server=require('http').Server(app);
const io= require('socket.io')(server);
const userRouter=require('./user');
io.on('connection',function (socket) {
    //console.log('user login');
    socket.on('sendmsg',function (data) {

        const {from,to,chatMsg}=data;
        const chatid=[from,to].sort().join('_');
        Chat.create({chatid,from,to,content:chatMsg},function (err,doc) {
            //发送到全局io上
           // console.log(doc);
            io.emit('recvmsg',Object.assign({},doc._doc))
        });

    });
});
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',userRouter);
