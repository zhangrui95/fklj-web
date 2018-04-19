/**
 * 个人中心右侧
 */
import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import {
    mainReducer
} from "../../reducers/reducers";
import {
    PostPersonCenterJudgeData
} from "../../actions/PersonalCenter";
import {
    StylePage,
    ShallowBlueBtn,
    DeepRedBtn,
    Input,
    DeepBlueBtn,
    PhotoItem,
    Pag
} from "../generalPurposeModule";
import {
    store
} from '../../index.js';
import * as constants from "../../utils/Constants";
import {
    DatePicker,
    notification,
    message,
    Spin
} from 'antd';

import {
    monthFormat,
    dateFormat
} from '../../utils/';
import {
    Spare
} from '../Spare.js';

import moment from 'moment';
moment.locale('zh-cn');
import { goBack, push, replace } from 'react-router-redux';
import { browserHistory } from 'react-router';
// 样式
const sliderdyHeader = {
    borderBottom: "1px solid #0C5F93",
    padding: "18px 0",
    overflow: "hidden"
}
const font14 = {
    fontSize: "14px",
    color: "#fff"
}

export class PersonalContentJudge extends Component {
    constructor(props) { //初始化nowPage为1
        super(props);
        let { name = "", sfzh = '', beginTime = "", endTime = "" ,nowPagelbt=1} = store.getState().routing.locationBeforeTransitions.query;
        let { pathname = "", search = "" } = store.getState().routing.locationBeforeTransitions;
        this.state = {
            nowPage: 1,
            sfzh: sfzh,
            name: name,
            dateBegin: beginTime,
            dateEnd: endTime,
            queryCreds: {},
            current: pathname,
            search: search,
            toConfigure : store.getState().AuditReport.data.toConfigure,
        };
        this.pageChange = this.pageChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        let userItem = JSON.parse(sessionStorage.getItem('user'));
        let lbt = store.getState().routing.locationBeforeTransitions;
        let lbtquery = store.getState().routing.locationBeforeTransitions.query;
        if (this.props.type !== nextProps.type) {
            browserHistory.replace('/PersonalCenter')
            this.setState({
                nowPage: 1,
            });
            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    username:userItem.user.name
                },
                showCount: constants.pageSize
            }
            store.dispatch(PostPersonCenterJudgeData(creds));
        }
        if ((lbt.pathname+lbt.search) !== (this.state.current+this.state.search)) {
            let { name = "", sfzh = '', beginTime = "", endTime = "" } = store.getState().routing.locationBeforeTransitions.query;
            this.setState({
                current: lbt.pathname,
                search: lbt.search,
                dateBegin: beginTime,
                dateEnd: endTime,
                name: name,
                sfzh: sfzh,
                code: this.props.type,
                
            })
            if ((lbt.pathname+lbt.search) !== (this.state.current+this.state.search)) {
                let creds = {
                    currentPage:1,
                    entityOrField:true,
                    pd:{
                        beginTime: lbtquery.beginTime?lbtquery.beginTime:'',
                        endTime: lbtquery.endTime?lbtquery.endTime:'',
                        name: lbtquery.name?lbtquery.name:'',
                        idcard: lbtquery.sfzh?lbtquery.sfzh:'',
                        username:userItem.user.name
                    },
                    showCount: constants.pageSize
                }
                store.dispatch(PostPersonCenterJudgeData(creds));
            }
            this.forceUpdate();
        }
    }
    componentDidMount() {
        let userItem = JSON.parse(sessionStorage.getItem('user'));
        let routeCode = store.getState().routing.locationBeforeTransitions.query.code;
        if(store.getState().routing.locationBeforeTransitions.query.code !== '106' ){
            
            browserHistory.replace('/PersonalCenter')

            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    username:userItem.user.name
                },
                showCount: constants.pageSize
            }
            store.dispatch(PostPersonCenterJudgeData(creds));
       }else{
           
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                username:userItem.user.name,
                beginTime: this.state.dateBegin,
                endTime: this.state.dateEnd,
                idcard: this.state.sfzh,
                name: this.state.name,
            },
            showCount: constants.pageSize
        }
        store.dispatch(PostPersonCenterJudgeData(creds));
       }
        
    }
    
    serchChange = (name, sfzh, dateBegin, dateEnd) => {
        this.setState({
            nowPage: 1,
            name: name,
            sfzh: sfzh,
            dateBegin: dateBegin,
            dateEnd: dateEnd,
        });
    }
    pageChange(nowPage) {
        let userItem = JSON.parse(sessionStorage.getItem('user'));
        this.state = Object.assign({}, this.state, {
            nowPage: nowPage
        });
        //  var search='nowPage';
        let creds = {
            currentPage: nowPage,
            entityOrField: true,
            pd: {
                username:userItem.user.name,
                beginTime: this.state.dateBegin,
                endTime: this.state.dateEnd,
                idcard: this.state.sfzh,
                name: this.state.name,

            },
            showCount: constants.pageSize
        }
        store.dispatch(PostPersonCenterJudgeData(creds));
    }
    render() {
        let userItems = [];
        let personalList = store.getState().PersonalCenter.data.personCenterJudgeList.result.list;
        let toConfigure = this.state.toConfigure;
        let pageType = "我的研判";
        for (var i = 0; i < personalList.length; i++) {
            var personal = personalList[i];
            var key = "PhotoItem_" + i;
            userItems.push(
                <PhotoItem key={key} user={personal} pageType={pageType}  onClick={this.handleClickgzu} toConfigure={toConfigure}/>
            )
        }
        let totalRecord = store.getState().PersonalCenter.data.personCenterJudgeList.result.total;
        let isFetching = store.getState().PersonalCenter.isFetching;
        let nowPage = this.state.nowPage;
        return (

            <div className="sliderWrap">
                <div className="sliderItemDiv">
                    
                    <div style={sliderdyHeader}>
                         <SearchArea   dispatch={this.props.dispatch} type={this.props.type}  serchChange={this.serchChange}/>
                        <div className="clear"></div>
                    </div>
                </div>
                
                {isFetching ===  true?
                        <div style={{textAlign:"center",position:"absolute",left:"45%",top:"50%"}}>
                            <Spin size="large" />
                        </div>:
                <div className="z_slderRightBody">
                    {userItems}
                    <div className="clear"></div>
                </div>}
                
                <Pag pageSize={constants.pageSize} nowPage={nowPage} totalRecord={totalRecord} pageChange={this.pageChange} />
                {/* <Spare header='false'/> */}
            </div>
        );

    }
};


//姓名
let name, sfzh, dateBegin, dateEnd;
//搜索区域内容组件
const SearchArea = React.createClass({
    getInitialState: function() {
        let routeCode = store.getState().routing.locationBeforeTransitions.query.code;
        if(store.getState().routing.locationBeforeTransitions.query.code !== '106'){
            browserHistory.push({
                        pathname: "PersonalCenter",
                        query: {
                            name:'',
                            sfzh:'',
                            beginTime:'',
                            endTime:'',
                            code:routeCode
                        }
            }) 
        }
        let { name = "", sfzh = '', beginTime = "", endTime = "" } = store.getState().routing.locationBeforeTransitions.query;
        let { pathname = "", search = "" } = store.getState().routing.locationBeforeTransitions;
        return {
            sfzh: sfzh,
            name: name,
            dateBegin: beginTime,
            dateEnd: endTime,
            current: pathname,
            search: search

        };
    },
    onChildChanged: function(id, value) {
        if (id === 'dtgkname') {
            name = value;
        } else if (id === 'dtgksfzh') {
            sfzh = value;
        }
        this.setState({
            sfzh: sfzh,
            name: name,

        });
    },
    //改变时间
    onChangeBeginValue: function(value) {
        this.setState({
            dateBegin: value

        });
    },
    onChangeEndValue: function(value) {
        this.setState({
            dateEnd: value


        });
    },
    handleBeginDeteClick: function(date, dateString) {
        this.setState({
            dateBegin: dateString,
        });

    },

    handleEndDeteClick: function(date, dateString) {
        this.setState({
            dateEnd: dateString,
        });
    },
    handleClick: function() { //点击查询
        let userItem = JSON.parse(sessionStorage.getItem('user'));
        name = this.state.name;
        sfzh = this.state.sfzh;
        dateEnd = this.state.dateEnd;
        dateBegin = this.state.dateBegin;
        let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    username:userItem.user.name,
                    beginTime: this.state.dateBegin,
                    endTime: this.state.dateEnd,
                    name: this.state.name,
                    idcard: this.state.sfzh,
                },
                showCount: constants.pageSize
            }
            
        store.dispatch(PostPersonCenterJudgeData(creds));
        this.props.serchChange(
            this.state.name, this.state.sfzh, this.state.dateBegin, this.state.dateEnd, );
        browserHistory.push({
            pathname: "PersonalCenter",
            query: {
                name: this.state.name,
                sfzh: this.state.sfzh,
                beginTime: this.state.dateBegin,
                endTime: this.state.dateEnd,
                code: this.props.type,
            }
        })
    },
    //表单验证身份证号
    VerificationSFZH: function() {
        var reg = new RegExp("^\d{15}|\d{}18$");
        sfzh = this.state.sfzh;
        if (!reg.sfzh && sfzh !== '') {
            alert("请输入正确的身份证号！");
        }
    },
    handleClickClear: function() { //点击清除
        this.setState({
            sfzh: '',
            name: '',
            dateBegin: '',
            dateEnd: ''
        });
        let userItem = JSON.parse(sessionStorage.getItem('user'));
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                username:userItem.user.name
            },
            showCount: constants.pageSize
        }
        store.dispatch(PostPersonCenterJudgeData(creds));
        browserHistory.replace('/PersonalCenter');
    },
    componentWillReceiveProps: function (nextProps) {
        let lbt = store.getState().routing.locationBeforeTransitions;
        let lbtquery = store.getState().routing.locationBeforeTransitions.query;
        let userItem = JSON.parse(sessionStorage.getItem('user'));
        // if (this.props.type !== nextProps.type) {
        //      this.clearHandleClick();
            
        // }

            let { name = "", sfzh = "", beginTime = "", endTime = "", nowPage = Number(1), code = this.props.type } = store.getState().routing.locationBeforeTransitions.query;
            if ((lbt.pathname + lbt.search) !== (this.state.current + this.state.search)) {
                
                this.setState({
                    current: lbt.pathname,
                    search: lbt.search,
                    dateBegin: lbtquery.beginTime?lbtquery.beginTime:'',
                    dateEnd: lbtquery.endTime?lbtquery.endTime:'',
                    name: lbtquery.name?lbtquery.name:'',
                    sfzh: lbtquery.sfzh?lbtquery.sfzh:'',
                    code: this.props.type,
                })
                this.forceUpdate();
            }
        
        
    },
    render() {
        let name = this.state.name;
        let sfzh = this.state.sfzh;
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
        if (beginDateValue != "" && endDateValue != "" && beginDateValue > endDateValue) {
            message.error('提示：开始时间不能大于结束时间！');
            return;
        }
        return (
            <div className="marLeft40 fl z_searchDiv">
                <label htmlFor="" className="font14">姓名：</label>
               <Input width="111px" margin="0 10px 0 0"  type="text"  id='dtgkname' placeholder='请输入姓名'  value={name}  callbackParent={this.onChildChanged} />
                 <label htmlFor="" className="font14">证件号：</label>
               <Input width="202px" margin="0 10px 0 0"  type="text" id='dtgksfzh' placeholder='请输入证件号' value={sfzh} callbackParent={this.onChildChanged} />
                 <label htmlFor="" className="font14">最后研判时间：</label>
               <DatePicker  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={beginDateValue} onChange={this.handleBeginDeteClick}/>
               <span className="font14" style={{margin:"0 10px 0 0"}}>至</span>
               <DatePicker   format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={endDateValue} onChange={this.handleEndDeteClick}/>
                <ShallowBlueBtn width={82} text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                <DeepRedBtn  width={82} text="清除" onClick={this.handleClickClear} />
            </div>
        );
    }
})



export default connect(mainReducer)(PersonalContentJudge);