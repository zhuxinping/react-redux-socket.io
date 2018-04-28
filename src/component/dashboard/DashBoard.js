import React,{Component} from 'react';
import {NavBar} from 'antd-mobile';
import {HashRouter as Router,Route,Switch,Redirect,BrowserRouter} from 'react-router-dom';
import  {getMessageList,recvMsg} from '../../store/actions/chat';
import {connect} from 'react-redux';
import Boss from "../../container/boss/Boss";
import Genius from "../../container/genius/Genius";
import Msg from "../../container/msg/Msg";
import User from "../../container/user/User";
import NavLinkBar from "../navlinkbar/NavLinkBar";
import '../../static/css/index.css';

@connect(
    state=>state,
    {getMessageList,recvMsg}
)
 class DashBoard extends Component{
    constructor(props){
        super(props);
    }
componentDidMount(){
    if(!this.props.chat.chatMsg.length){
        this.props.getMessageList();
        this.props.recvMsg();
    }
}
    render(){
        const user=this.props.user;
        const {pathname}=this.props.location;
        const navList=[
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hide:user.type=='genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'boss列表',
                component:Genius,
                hide:user.type=='boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg
            }
            ,
            {
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User
            }
        ];
        return(
        <div>
            <NavBar mode='dard' className="fixd-header">
                {navList.find(v=>v.path==pathname).title}
            </NavBar>
            <div id="chat-page" style={{marginTop:45,marginBottom:55}}>
                <Switch>
                    {navList.map(v=>(
                        <Route key={v.path} path={v.path} component={v.component}></Route>
                    ))}
                </Switch>
            </div>
            <div className="stick-footer">
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        </div>
        );
    }
}
export default DashBoard;
