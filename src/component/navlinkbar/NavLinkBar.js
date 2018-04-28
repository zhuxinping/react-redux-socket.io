import React,{Component} from 'react';
import PropTypes from 'prop-types';
import '../../static/css/index.css';
import {withRouter} from 'react-router-dom';
import {TabBar} from 'antd-mobile';
import {connect} from 'react-redux';
@connect(
    state=>state
)
@withRouter
class NavLinkBar extends Component{
    static propTypes={
        data:PropTypes.array.isRequired
    }
    constructor(props){
        super(props);
    }
    render(){
        const navList=this.props.data.filter(v=>!v.hide);//把角色不同的过滤掉
        //获取路由信息
        const {pathname}=this.props.location;
        //console.log(navList);
        return(
       <TabBar>
           {navList.map(v=>(
               <TabBar.Item
                   badge={v.path=='/msg'?this.props.chat.unread:0}
                   key={v.path}
                   title={v.text}
                   icon={{uri:require(`../../static/images/${v.icon}.png`)}}
                   selectedIcon={{uri:require(`../../static/images/${v.icon}-active.png`)}}
                   selected={pathname==v.path}
                   onPress={()=>{
                       this.props.history.push(v.path);
                   }}
               >

               </TabBar.Item>
           ))}
       </TabBar>
        );
    }
}
export default NavLinkBar;
