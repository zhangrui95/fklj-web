/**
 * Created by zy on 2017/5/15.
 */
//盘查记录页面
import React, {
    Component
} from 'react'
import {
    mainReducer
} from "../reducers/reducers";
import {
    fetchUsersData
} from "../actions/actions";
import {
    postInterrogationUsersData
} from "../actions/InterrogationRecord";
import {
    connect
} from "react-redux";
import DynamicRightContent from "./DynamicRightContent";
import {
    StylePage,
    ShallowBlueBtn,
    DeepRedBtn,
    Input,
    DeepBlueBtn,
    PhotoItem,
    Pag,
    Interrogation
} from "./generalPurposeModule";
import {
    store
} from '../index.js'
import {
    Header
} from "../components/Header";
import * as constants from "../utils/Constants";
import {
    DatePicker,
    notification,
    message,
    Spin,
    Modal,
    Button
} from 'antd';

import {
    EmptyData
} from "../components/EmptyData";
import {
    monthFormat,
    dateFormat
} from '../utils/';
import moment from 'moment';
moment.locale('zh-cn');
import { browserHistory } from 'react-router';
//姓名
let dateBegin, dateEnd;
class InterrogationRecord extends Component {
    constructor(props) { //初始化nowPage为1
        let { beginTime = "", endTime = "" } = store.getState().routing.locationBeforeTransitions.query;
        // let lbtquery = store.getState().routing.locationBeforeTransitions.query;
        let { pathname , search } = store.getState().routing.locationBeforeTransitions;
        super(props);
        this.state = {
            nowPage: 1,
            dateBegin: beginTime,
            dateEnd: endTime,
            pathname:pathname
        };
        this.pageChange = this.pageChange.bind(this);
    }
    componentDidMount() {
    //let search = "idNumber="+this.props.params.idNumber;

        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                idcard: this.props.params.idcard
            },
            showCount: 6
        }
        this.props.dispatch(postInterrogationUsersData(creds));
    }

    // getInitialState = () => {
    //     return {
    //         dateBegin: '',
    //         dateEnd: ''
    //     };
    // }
    // onChildChanged = (id, value) => {
    //     if (id === 'dtgkdateBegin') {
    //         dateBegin = value;
    //     } else if (id === 'dtgkdateEnd') {
    //         dateEnd = value;
    //     }
    //     this.setState({
    //         dateBegin: dateBegin,
    //         dateEnd: dateEnd
    //     });
    // }
    clear=()=>{
        this.setState({
            dateBegin: '',
            dateEnd: ''
        });
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                idcard: this.props.params.idcard,
                beginTime: '',
                endTime: '',
            },
            showCount: 6
        }
        this.props.dispatch(postInterrogationUsersData(creds));
        browserHistory.push({
            pathname: this.state.pathname,
            query: {
               // idcard: this.props.params.idcard,
                
            }
        })
    }
    handleBeginDeteClick = (date, dateString) => {

        this.setState({
            dateBegin: dateString,
        });

    }

    handleEndDeteClick = (date, dateString) => {
        this.setState({
            dateEnd: dateString,
        });
    }
    handleClick = () => {

        let dateEnd = this.state.dateEnd;
        let dateBegin = this.state.dateBegin;
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                idcard: this.props.params.idcard,
                beginTime: this.state.dateBegin,
                endTime: this.state.dateEnd,
            },
            showCount: 6
        }
        this.props.dispatch(postInterrogationUsersData(creds));
        browserHistory.push({
            pathname: this.state.pathname,
            query: {
               // idcard: this.props.params.idcard,
                beginTime: this.state.dateBegin,
                endTime: this.state.dateEnd,
            }
        })
    }
    pageChange(nowPage) {
        this.state = Object.assign({}, this.state, {
            nowPage: nowPage
        });
        //var searchPag='nowPage';
        let creds = {
            currentPage: nowPage,
            entityOrField: true,
            pd: {
                idcard: this.props.params.idcard,
                beginTime: this.state.dateBegin,
                endTime: this.state.dateEnd,
            },
            showCount: 6
        }
        store.dispatch(postInterrogationUsersData(creds));
    }
   
    render() {
        let interrogationRecordUserItems = [];
        let interrogationRecordJson = store.getState().InterrogationRecordUsers.data.interrogationRecord.result.list;

        let totalRecord = store.getState().InterrogationRecordUsers.data.interrogationRecord.result.total;
        let isFetching = store.getState().InterrogationRecordUsers.isFetching;
        let nowPage = this.state.nowPage;
        let dateBegin = this.state.dateBegin;
        let dateEnd = this.state.dateEnd;
        let beginDateValue = '';
        if (dateBegin === '') {} else {
            beginDateValue = moment(dateBegin, dateFormat);
        }
        let endDateValue = '';
        if (dateEnd === '') {} else {
            endDateValue = moment(dateEnd, dateFormat);
        }

        for (var i = 0; i < interrogationRecordJson.length; i++) {

            if ((i + 1) % 2 > 0) {

                interrogationRecordUserItems.push(
                    <Interrogation width="48.5%" minWidth="750px" float="left" margin="0 40px 40px 0"  interrogationRecordProps={interrogationRecordJson[i]}/>
                );
            } else if ((i + 1) % 2 == 0) {

                interrogationRecordUserItems.push(
                    <Interrogation width="48.5%" minWidth="750px" float="left" margin="0 0 40px 0"  interrogationRecordProps={interrogationRecordJson[i]}/>
                );
            }
        }
        return (
            <div style={{position:"relative"}}>
                    <Header />
                    {/*查询条件*/}
                    <div style={{padding:"18px",width:"98%",borderBottom:"1px solid rgb(12, 95, 147)"}}>
                        <label htmlFor="" className="font14">采集时间：</label>
                        <DatePicker onChange={this.handleBeginDeteClick}  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={beginDateValue}/>
                        <span className="font14" style={{margin:"0 10px 0 0"}}>至</span>
                        {/*<Input width="125px" margin="0 10px 0 0" type="date" id='dtgkdateEnd' value={dateEnd} callbackParent={this.onChildChanged}/>*/}
                        <DatePicker onChange={this.handleEndDeteClick}  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={endDateValue}/>
                        <ShallowBlueBtn width={82} text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                        <DeepRedBtn  margin="0 10px 0 0" width="82" text="清除" onClick={this.clear} />
                    
                    </div>
                    <div style={{position:"relative"}}>
                        {isFetching ===  true?
                            <div style={{textAlign:"center",position:"absolute",left:"45%",top:"50%"}}>
                                <Spin size="large" />
                            </div>:
                        parseInt(totalRecord) > 0 ?
                        <div>
                            {/*盘查记录*/}
                            <div className="container" style={{margin:"0 auto",marginTop:"20px"}}>
                                <div style={{}}>
                                    {interrogationRecordUserItems}
                                    <div style={{clear:"both"}}></div>
                                </div>
                            </div>
                            <div style={{clear:"both"}}></div>
                            {/*分页*/}
                            <Pag pageSize={6}  nowPage={nowPage}  totalRecord={totalRecord} pageChange={this.pageChange} />
                        </div>:<EmptyData />
                        }
                    </div>
                    
                     
                </div>
        );
    }
}
export default connect(mainReducer)(InterrogationRecord);