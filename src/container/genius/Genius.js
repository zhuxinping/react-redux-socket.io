import React,{Component} from 'react';
import {getGeniusList} from '../../api';
import {connect} from 'react-redux';
import {getChatList} from '../../store/actions/chat';
import UserCard from "../../component/usercard/UserCard";
@connect(
    state=>state.chat,
    {getChatList}
)
export default class Genius extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount() {
        this.props.getChatList({type:'boss'});
    }
    // async GetGeniusList(type){
    //     let {data}=await getGeniusList(type);
    //     // console.log(data);
    //     if(data.code==0){
    //         this.setState({
    //             data:data.data
    //         });
    //     }
    // }
    render(){
        return(
            <div>
                <UserCard userList={this.props.userList}/>
            </div>
        );
    }
}
