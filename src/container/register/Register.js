import React,{Component} from 'react';
import Logo from '../../component/logo/logo';
import {List,Radio,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile';
import {connect}from 'react-redux';
import {Redirect} from 'react-router-dom';
import {register} from '../../store/actions/user';
import '../../static/css/index.css';
import MyForm from "../../component/my-form/MyForm";
@connect(
    state=>state.user,
    {register}
)
@MyForm
class Register extends Component{
    constructor(props){
        super(props);
        this.state={
            // type:'genius'
        }
        this.handleRegister=this.handleRegister.bind(this);
    }
    componentDidMount(){
        //有个默认值 一加载就执行
        this.props.handleChange('type','genius');
    }
        // handleChange(key,val){
        // this.setState({
        //     [key]:val
        // });
        // }
        //注册按钮点击事件
    handleRegister(){
           // console.log(this.state);
        this.props.register(this.props.state);
    }
    render(){
        const RadioItem=Radio.RadioItem;
        return(
        <div>
            {this.props.redirectTo? <Redirect to={this.props.redirectTo}/>:null}
            <Logo></Logo>
            <WingBlank>
                <List>
                    {this.props.msg? <p className="error-msg">{this.props.msg}</p>:null}
                    <InputItem
                     onChange={v=>this.props.handleChange('user',v)}
                    >用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type='password'
                        onChange={v=>this.props.handleChange('pwd',v)}
                    >密码</InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type='password'
                        onChange={v=>this.props.handleChange('repeatpwd',v)}
                    >确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem
                        onClick={()=>this.props.handleChange('type','genius')}
                        checked={this.props.state.type=='genius'}>
                        牛人
                    </RadioItem>
                    <RadioItem
                        onClick={()=>this.props.handleChange('type','boss')}
                        checked={this.props.state.type=='boss'}>
                        BOSS
                    </RadioItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </List>
            </WingBlank>
        </div>
        );
    }
}
export default Register;
