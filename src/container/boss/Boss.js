import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getChatList} from '../../store/actions/chat';
import UserCard from "../../component/usercard/UserCard";
@connect(
    state=>state.chat,
    {getChatList}
)
export default class Boss extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount() {
        this.props.getChatList({type:'genius'});
    }
    // async GetGeniusList(type){
    //     let {data}=await getUserList(type);
    //    // console.log(data);
    //     if(data.code==0){
    //         this.setState({
    //             data:data.data
    //         });
    //     }
    // }
    render(){
        //console.log(this.props.userList);
        return(
        <div>
            <UserCard userList={this.props.userList}/>
        </div>
        );
    }
}
