import React,{Component} from 'react';
import Logo from '../../component/logo/logo';
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login} from '../../store/actions/user';
import '../../static/css/index.css';
import MyForm from "../../component/my-form/MyForm";

// function hello() {
//     console.log('hello react!');
// }
//hello();
//高阶组件
// function WrapperHello(fn) {
//    return function () {
//        console.log('before hello react!');
//        fn();
//        console.log('after hello react!');
//    }
// }
// WrapperHello(hello)();
//属性代理
// function WrapperHello(Comp) {
//     class WrapComp extends Component{
//         render(){
//             return (
//                 <div>
//                     <p>这是HOC高阶组件特有的元素</p>
//                     <Comp {...this.props}></Comp>
//                 </div>
//             );
//         }
//     }
//     return WrapComp;
// }
// function WrapperHello(Comp) {
//     class WrapComp extends Comp{
//         componentDidMount(){
//             console.log('高阶组件新增的生命周期加载完成');
//         }
//         render(){
//             return (
//                 <div>
//                     <p>这是HOC高阶组件特有的元素</p>
//                     <Comp {...this.props}></Comp>
//                 </div>
//             );
//         }
//     }
//     return WrapComp;
// }
//  @WrapperHello
// class Hello extends Component{
//     render(){
//         return <h2>hello I Love redux!</h2>
//     }
// }

@connect(
    state=>state.user,
    {login})
@MyForm
class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            user:'',
            pwd:''
        }
        this.register=this.register.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
    }
    register(){
        this.props.history.push('/register');
        //console.log(this.props.history);
    }
    // handleChange(key,val){
    //     this.setState({
    //         [key]:val
    //     });
    // }
    handleLogin(){
        this.props.login(this.props.state);
    }
    render(){
        return(
        <div>
            {/*<Hello></Hello>*/}
            {(this.props.redirectTo&&this.props.redirectTo!='/login')? <Redirect to={this.props.redirectTo}/>:null}
            <Logo></Logo>
            <WingBlank>
                <List>
                    {this.props.msg? <p className="error-msg">{this.props.msg}</p>:null}
                    <InputItem
                        onChange={v=>this.props.handleChange('user',v)}
                    >用户</InputItem>
                    <InputItem
                        type="password"
                        onChange={v=>this.props.handleChange('pwd',v)}
                    >密码</InputItem>
                </List>
                <WhiteSpace/>
                <Button type="primary" onClick={this.handleLogin}>登陆</Button>
                <WhiteSpace/>
                <Button  onClick={this.register} type="primary">注册</Button>
            </WingBlank>
        </div>
        );
    }
}
export default  Login;
