import React,{Component} from 'react';
import {connect} from 'react-redux';
import  {getMessageList,sendMsg,recvMsg} from '../../store/actions/chat';
import {List,InputItem,NavBar,Icon} from 'antd-mobile';
import '../../static/css/index.css';
import {getChatId} from "../../util/util";
@connect(
    state=>state,
    {getMessageList,sendMsg,recvMsg}
)
 class Chat extends Component{
    constructor(props){
        super(props);
        this.state={
            text:'',
            msg:[]
        }
    }
    componentDidMount(){
        if(!this.props.chat.chatMsg.length){
            this.props.getMessageList();
            this.props.recvMsg();
        }
        // socket.on('recvmsg',(data)=>{
        //     //console.log(data);
        //     this.setState({
        //         msg:[...this.state.msg,data.text]
        //     })
        // });

    }
    handleSend(){
        // socket.emit('sendmsg',{text:this.state.text});
        // //console.log(this.state.text);
        // this.setState({text:''});
        //谁发送的
        const from=this.props.user._id;
        //谁接收的
        const to=this.props.match.params.user;
        //接收的内容
        const chatMsg=this.state.text;
        //发送信息
        this.props.sendMsg({from,to,chatMsg});
        this.setState({text:''});
        //发送完毕再设置msg状态
        //   socket.on('recvmsg',(data)=>{
        //       let {chatMsg}=data;
        //       this.setState({
        //           msg:[...this.state.msg,chatMsg]
        //       },()=>{
        //           this.setState({text:''});
        //       });
        //   })
    }
    render(){
        //console.log(this.props.chat.chatMsg)
        const userid=this.props.match.params.user;
        //console.log(userid);
        const users=this.props.chat.users;
        if(!users[userid]){
            return null;
        }
        const chatid=getChatId(userid,this.props.user._id)
        const chatMsg=this.props.chat.chatMsg.filter(v=>v.chatid==chatid);
        //console.log(this.props.chat.chatMsg);
        return(
       <div>
           <NavBar mode='dark' className="fixd-header"
           icon={<Icon type="left"/>}
                   onLeftClick={()=>{
                       this.props.history.goBack();
                   }}
           >
               {users[userid].name}
           </NavBar>
           <div id="chat-page" style={{marginTop:45,marginBottom:45}}>
               {chatMsg.map((item,index)=>{
                   const avatar=require(`../../static/images/${users[item.from].avatar}.png`);
                   return item.from==userid?(
                       <List key={index}>
                           <List.Item
                                      thumb={avatar}
                           >对方发来的:{item.content}</List.Item>
                       </List>
                   ):(
                       <List key={index}>
                           <List.Item className="chat-me"
                               extra={<img src={avatar} alt=""/>}
                           > 我发送的:{item.content}</List.Item>
                       </List>
                   )
               })}
           </div>
           <div className="stick-footer">
               <List>
                   <InputItem
                       placeholder='请输入'
                       value={this.state.text}
                       onChange={v=>{
                           this.setState({text:v});
                       }}
                       extra={<span onClick={()=>this.handleSend()}>发送</span>}
                   >
                       信息
                   </InputItem>
               </List>
           </div>
       </div>
        );
    }
}
export default Chat;
