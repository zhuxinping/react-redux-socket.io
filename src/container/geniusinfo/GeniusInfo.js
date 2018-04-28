import React,{Component} from 'react';
import {NavBar,InputItem,WingBlank,WhiteSpace,TextareaItem,Button} from 'antd-mobile';
import Avatar from '../../component/avatar/Avatar';
import {update} from '../../store/actions/user';
import  {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import  '../../static/css/index.css';
@connect(
    state=>state.user,
    {update}
)
class GeniusInfo extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            desc:''
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        });
    }
    render(){
        const path=this.props.location.pathname;
        const redirect=this.props.redirectTo;
        return(
            <div>
                {redirect&&redirect!=path?<Redirect to={this.props.redirectTo}/>:null}
                <NavBar mode="dark">牛人完善信息页面</NavBar>
                <Avatar selectAvatar={(imgname)=>{
                    this.setState({
                        avatar:imgname
                    },()=>{/*console.log(this.state.avatar)*/});
                }}></Avatar>
                {this.props.msg? <p className="error-msg">{this.props.msg}</p>:null}
                <InputItem onChange={(v)=>this.onChange('title',v)}>
                    求职岗位
                </InputItem>
                <TextareaItem
                    rows={3}
                    autoHeight
                    title="求职简介"
                    onChange={(v)=>this.onChange('desc',v)}>
                </TextareaItem>
                <Button
                    onClick={()=>{
                        this.props.update(this.state);
                    }}
                    type="primary">保存</Button>
            </div>
        );
    }
}
export default  GeniusInfo;
