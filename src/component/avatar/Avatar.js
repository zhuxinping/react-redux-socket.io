import React,{Component} from 'react';
import {Grid,List} from 'antd-mobile';
import PropTypes from 'prop-types';
export default class Avatar extends Component{
    static propTypes={
        selectAvatar:PropTypes.func.isRequired
    }
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        const avatarList='boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'
            .split(',')
            .map(v=>({
                icon:require(`../../static/images/${v}.png`),
                text:v
            }));
        const gridHeader=this.state.text?(<div>
            <span>已选择头像</span>
            <img style={{width:20}} src={this.state.icon} alt=""/>
        </div>):<div>请选择头像</div>;
        return(
        <div>
            <List renderHeader={()=>gridHeader}>
                <Grid data={avatarList}  columnNum={5}
                      onClick={ele=>{
                          this.props.selectAvatar(ele.text);
                          this.setState(ele);
                      }}
                ></Grid>
            </List>
        </div>
        );
    }
}
