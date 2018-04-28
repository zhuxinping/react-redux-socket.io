import React,{Component} from 'react';
import {Card,WhiteSpace,WingBlank} from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
@withRouter
class UserCard extends Component{
    static propTypes={
        userList:PropTypes.array.isRequired
    }
    handleClick(v){
        this.props.history.push(`/chat/${v._id}`);
        //console.log(v._id);
    }
    render(){
        return (
            <WingBlank>
                <WhiteSpace/>
                {this.props.userList.map((v)=>(
                    v.avatar?<Card key={v._id}
                    onClick={()=>this.handleClick(v)}
                    >
                        <Card.Header
                            title={v.user}
                            thumb={require(`../../static/images/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        >
                        </Card.Header>
                        <Card.Body>
                            {v.type=='boss'?<div>公司:{v.company}</div>:null}
                            {v.type=='boss'?<div>职位要求:</div>:<div>基本技能及经验:</div>}
                            {v.desc.split('\n').map((d)=>(
                                <div key={d}>{d}</div>
                            ))}
                            {v.type=='boss'?<div>薪资:{v.money}</div>:null}
                        </Card.Body>
                    </Card>:null
                ))}
            </WingBlank>
        );
    }
}
export default UserCard;