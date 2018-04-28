import React,{Component} from 'react';
import {getInfo} from "../../api/index";
import {withRouter} from 'react-router-dom';
import {loadData} from "../../store/actions/user";
import  {connect} from 'react-redux';
@withRouter
@connect(
    state=>state.user,
    {loadData}
)
class AuthRoute extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        //获取用户信息
        //是否登陆
        //现在的url login是不需要跳转的

        //用户的type  身份是boss还是牛人
        //用户是否完善信息(选择头像 个人简历)
        this.getInfoData();
    }
    async getInfoData(){
        const publicList=['/login','/register'];
        const pathname=this.props.location.pathname;
        if(publicList.indexOf(pathname)>-1){
            return null;
        }
        let {data}=await getInfo();
       // console.log(data.code);
        if(data.code==0){
            this.props.loadData(data.data);
        }else{
            this.props.history.push('/login');
        }
    }
    render(){

        return null;
    }
}
export default AuthRoute;
