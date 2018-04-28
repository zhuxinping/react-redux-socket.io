import React,{Component} from 'react';
import {connect}from 'react-redux';
import  browserCookie from 'browser-cookies';
import {logoutSubmit} from '../../store/actions/user';
import {Redirect} from 'react-router-dom';
import {Result,List,WhiteSpace,Modal} from 'antd-mobile';
@connect(
    state=>state.user,
    {logoutSubmit}
)
 class User extends Component{
    constructor(props){
        super(props);
        this.logout=this.logout.bind(this);
    }
    logout(){
        const alert=Modal.alert;
        alert('注销', '确认退出吗???', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                    browserCookie.erase('userid');
                   // window.location.href= window.location.href;
                    this.props.logoutSubmit();
                } },
        ])
       // browserCookie.erase('userid');
    }
    render(){
        const Item = List.Item;
        const Brief = Item.Brief;
        return this.props.user?(
        <div>
            <Result
            img={<img style={{width:50}}  src={require(`../../static/images/${this.props.avatar}.png`)} alt=""/>}
            title={this.props.user}
            message={this.props.type=='boss'?this.props.company:null}
            />
            <List renderHeader={()=>'简介'}>
                <Item multipleLine>
                    {this.props.title}
                    {this.props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                    {this.props.money?<Brief>薪资:{this.props.money}</Brief>:null}
                </Item>
            </List>
            <WhiteSpace></WhiteSpace>
            <List>
                <Item onClick={this.logout}>退出登录</Item>
            </List>
        </div>
        ):<Redirect to={this.props.redirectTo}/>;
        {/*没有user就直接跳转login*/}
    }
}
export default User;
