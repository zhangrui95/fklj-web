/**
 * Created by zy on 2017/5/8.
 */
//动态管控右侧组件
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
    PostUsersData,
    saveMessAttention,
    DelMessAttention
} from "../../actions/actions";
import {
    ShallowBlueBtn,
    DeepRedBtn,

    PhotoItem,
    Pag
} from "../generalPurposeModule";
import {
    changeShade
} from "../../actions/actions";
import {
    store
} from '../../index.js'
import * as constants from "../../utils/Constants";
import {
    DatePicker,
    notification,
    message,
    Input,
    Spin,
    Modal,
    Button
} from 'antd';

import {
    EmptyData
} from "../../components/EmptyData";

import {
    monthFormat,
    dateFormat
} from '../../utils/';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { goBack, push, replace } from 'react-router-redux';
import { browserHistory } from 'react-router';

// 样式
const sliderdyHeader = {
    borderBottom: "1px solid #0C5F93",
    padding: "18px 0",
    overflow: "hidden"
}

export class DynamicContent extends Component {
    constructor(props) { //初始化nowPage为1
        super(props);
        let { name = "", sfzh = '', beginTime = "", endTime = "", nowPagelbt = 1 } = store.getState().routing.locationBeforeTransitions.query;
        let { pathname = "", search = "" } = store.getState().routing.locationBeforeTransitions;
        this.state = {
            nowPage: 1,
            ModalDialogueShow: 'none',
            description: '',
            sfzh: sfzh,
            name: name,
            dateBegin: beginTime,
            dateEnd: endTime,
            queryCreds: {},
            current: pathname,
            search: search,
        };
        this.pageChange = this.pageChange.bind(this);
    }
    componentDidMount() {
        let userItem = JSON.parse(sessionStorage.getItem('user'));
        let routeCode = store.getState().routing.locationBeforeTransitions.query.code;

        if (routeCode !== '' && routeCode !== '201001' && routeCode !== '201002' && routeCode !== '201003') {
            browserHistory.replace('/DynamicControl')

            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    code: this.props.type,
                    beginTime: '',
                    endTime: '',
                    name: '',
                    idcard: '',
                    followerUserid: '' + userItem.user.idcard,

                },
                showCount: constants.pageSize
            }
            store.dispatch(PostUsersData(creds));
        } else {

            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    code: this.props.type,
                    beginTime: this.state.dateBegin,
                    endTime: this.state.dateEnd,
                    name: this.state.name,
                    idcard: this.state.sfzh,
                    followerUserid: '' + userItem.user.idcard,
                },
                showCount: constants.pageSize
            }
            store.dispatch(PostUsersData(creds));
        }



    }
    componentDidUpdate(nextProps, nextState) {

    }
    componentWillReceiveProps(nextProps) {
        let userItem = JSON.parse(sessionStorage.getItem('user'));
        let lbt = store.getState().routing.locationBeforeTransitions;
        let lbtquery = store.getState().routing.locationBeforeTransitions.query;
        if (this.props.type !== nextProps.type) {
            browserHistory.replace('/DynamicControl')
            this.setState({
                nowPage: 1,
            });
            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    code: nextProps.type,
                    followerUserid: '' + userItem.user.idcard,
                },
                showCount: constants.pageSize
            }
            store.dispatch(PostUsersData(creds)); //人员盘查   getPersonList  getPersonList

        }
        if ((lbt.pathname + lbt.search) !== (this.state.current + this.state.search)) {
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
            if ((lbt.pathname + lbt.search) !== (this.state.current + this.state.search)) {
                let creds = {
                    currentPage: 1,
                    entityOrField: true,
                    pd: {
                        code: this.props.type,
                        beginTime: lbtquery.beginTime ? lbtquery.beginTime : '',
                        endTime: lbtquery.endTime ? lbtquery.endTime : '',
                        name: lbtquery.name ? lbtquery.name : '',
                        idcard: lbtquery.sfzh ? lbtquery.sfzh : '',
                        followerUserid: '' + userItem.user.idcard,
                    },
                    showCount: constants.pageSize
                }
                store.dispatch(PostUsersData(creds));
            }
            this.forceUpdate();
        }

    }

    //修改弹出框展示状态
    handleModalDialogueShow = (value, description) => {
        this.setState({
            ModalDialogueShow: value,
            description: description

        });

    }
    serchChange = (name, sfzh, dateBegin, dateEnd) => {
        this.setState({

            name: name,
            sfzh: sfzh,
            dateBegin: dateBegin,
            dateEnd: dateEnd,
        });
    }

    pageChange(nowPage) {
        this.state = Object.assign({}, this.state, {
            nowPage: nowPage
        });
        //    var search='nowPage';
        let userItem = JSON.parse(sessionStorage.getItem('user'));
        let creds = {
            currentPage: nowPage,
            entityOrField: true,
            pd: {
                //code:this.props.type,
                beginTime: this.state.dateBegin,
                endTime: this.state.dateEnd,
                idcard: this.state.sfzh,
                name: this.state.name,
                followerUserid: '' + userItem.user.idcard,
            },
            showCount: constants.pageSize
        }
        store.dispatch(PostUsersData(creds));

    }

    handleClickgzu = () => {
        let user = JSON.parse(sessionStorage.getItem('user'));
        let users = store.getState().DynamicControl.data.users.result.list;
        this.forceFun();
    }
    forceFun = () => {
        this.forceUpdate();
    }
    render() {

        let userItem = JSON.parse(sessionStorage.getItem('user'));
        let queryCreds = {
            currentPage: this.state.nowPage,
            entityOrField: true,
            pd: {
                code: this.props.type,
                beginTime: this.state.dateBegin,
                endTime: this.state.dateEnd,
                idcard: this.state.sfzh,
                name: this.state.name,
                followerUserid: '' + userItem.user.idcard,
            },
            showCount: constants.pageSize
        }
        let userItems = [];
        // this.props.users.data.users.forEach(function(user){
        //     userItems.push(
        //           <PhotoItem  user={user}  />       
        //     );
        // });

        let users = store.getState().DynamicControl.data.users.result.list;
        let pageType = "动态管控"
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            var key = "PhotoItem_" + i;
            userItems.push(
                <PhotoItem key={key} user={user} pageType={pageType} queryCreds={queryCreds} />
            )
        }



        let totalRecord = store.getState().DynamicControl.data.users.result.total;
        let isFetching = store.getState().DynamicControl.isFetching;
        let nowPage = this.state.nowPage;
        // let lbtnowPage = store.getState().routing.locationBeforeTransitions.query.nowPage;

        return (
            <div className="sliderWrap">
                <div className="sliderItemDiv">
                    {/*查询条件*/}
                    <div style={sliderdyHeader}>
                        <SearchArea
                            dispatch={this.props.dispatch}
                            serchChange={this.serchChange}
                            description={this.state.description}
                            type={this.props.type}
                            nowPage={nowPage}
                        />
                        <div className="clear"></div>
                    </div>
                </div>
                {/*照片项*/}
                {isFetching === true ?
                    <div style={{ textAlign: "center", position: "absolute", left: "45%", top: "50%" }}>
                        <Spin size="large" />
                    </div> :
                    parseInt(totalRecord) > 0 ?
                        <div>
                            <div style={{ padding: "15px 0 0 0", width: "98%", margin: "0 auto", height: "650px", overflow: "auto" }}>
                                {userItems}
                                <div className="clear"></div>
                            </div>
                            {/*分页*/}
                            <Pag pageSize={constants.pageSize} nowPage={nowPage} totalRecord={totalRecord} pageChange={this.pageChange} padding="0 15px 10px 15px" />
                            {/*弹出框*/}
                            <ModalDialogue width="20%"
                                isShow={this.state.ModalDialogueShow}
                                description={this.state.description}
                                changeStatus={this.handleModalDialogueShow}
                            />
                        </div>
                        :
                        <EmptyData />
                }
            </div>
        );

    }
};


//姓名
let name, sfzh, dateBegin, dateEnd;

//搜索区域内容组件
const SearchArea = React.createClass({
    getInitialState: function () {
        let routeCode = store.getState().routing.locationBeforeTransitions.query.code;
        if (routeCode !== '' && routeCode !== '201001' && routeCode !== '201002' && routeCode !== '201003') {
            browserHistory.push({
                pathname: "DynamicControl",
                query: {
                    name: '',
                    sfzh: '',
                    beginTime: '',
                    endTime: '',
                    code: routeCode
                }
            })
        }

        let { name = "", sfzh = '', beginTime = "", endTime = "" } = store.getState().routing.locationBeforeTransitions.query;
        // let lbtquery = store.getState().routing.locationBeforeTransitions.query;
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
    onChildChanged: function (id, value) {
        if (id === 'dtgkname') {
            name = value;
        }
        if (id === 'dtgksfzh') {
            sfzh = value;
        }

        this.setState({
            name: name,
            sfzh: sfzh,
            // dateBegin:dateBegin,
            // dateEnd:dateEnd
        });
    },
    // 姓名改变事件
    onChangeName: function (e) {
        this.setState({ name: e.target.value });
    },
    // 身份证改变事件
    onChangeSFZH: function (e) {
        this.setState({ sfzh: e.target.value });
    },
    // 时间改变事件
    handleBeginDeteClick: function (date, dateString) {

        this.setState({
            dateBegin: dateString,
        });

    },

    handleEndDeteClick: function (date, dateString) {
        this.setState({
            dateEnd: dateString,
        });
    },

    handleClick: function () { //查询按钮点击事件
        name = this.state.name;
        sfzh = this.state.sfzh;
        dateEnd = this.state.dateEnd;
        dateBegin = this.state.dateBegin;
        let userItem = JSON.parse(sessionStorage.getItem('user'));
        let creds = {
            currentPage: this.props.nowPage,
            entityOrField: true,
            pd: {
                code: this.props.type,
                beginTime: this.state.dateBegin,
                endTime: this.state.dateEnd,
                name: this.state.name,
                idcard: this.state.sfzh,
                followerUserid: '' + userItem.user.idcard,

            },
            showCount: constants.pageSize
        }
        store.dispatch(PostUsersData(creds));
        this.props.serchChange(
            this.state.name, this.state.sfzh, this.state.dateBegin, this.state.dateEnd, )

        browserHistory.push({
            pathname: "DynamicControl",
            query: {
                name: this.state.name,
                sfzh: this.state.sfzh,
                beginTime: this.state.dateBegin,
                endTime: this.state.dateEnd,
                code: this.props.type,
            }
        })

        console.log('点击查询后', store.getState().routing.locationBeforeTransitions.query);

    },
    //表单验证身份证号
    VerificationSFZH: function (obj) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //验证身份证号码
        // sfzh = this.state.sfzh;
        if (!reg.test(obj)) {
            // alert("请输入正确的身份证号！");
            store.dispatch(changeShade('block'));
            this.props.handleClickClear("block", '请输入正确身份证！');

        }
    },
    clearHandleClick: function () {
        this.setState({
            name: '',
            sfzh: '',
            dateBegin: '',
            dateEnd: ''

        });
        let userItem = JSON.parse(sessionStorage.getItem('user'));
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                code: this.props.type,
                beginTime: '',
                endTime: '',
                name: '',
                idcard: '',
                followerUserid: '' + userItem.user.idcard,

            },
            showCount: constants.pageSize
        }
        store.dispatch(PostUsersData(creds));
        browserHistory.replace('/DynamicControl')
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
                dateBegin: lbtquery.beginTime ? lbtquery.beginTime : '',
                dateEnd: lbtquery.endTime ? lbtquery.endTime : '',
                name: lbtquery.name ? lbtquery.name : '',
                sfzh: lbtquery.sfzh ? lbtquery.sfzh : '',
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
        let beginDateValue = ''
        let beginPicker = '';
        if (dateBegin === '') {
            beginPicker = (
                <DatePicker placeholder="" onChange={this.handleBeginDeteClick} format={dateFormat} allowClear={false} style={{ marginRight: "10px" }} value={dateBegin} />
            )
        } else {
            beginDateValue = moment(dateBegin, dateFormat);
            beginPicker = (
                <DatePicker placeholder="" onChange={this.handleBeginDeteClick} format={dateFormat} allowClear={false} style={{ marginRight: "10px" }} value={beginDateValue} />
            )
        }

        let endDateValue = '';
        let endPicker = '';
        if (dateEnd === '') {
            endPicker = (
                <DatePicker placeholder="" onChange={this.handleEndDeteClick} format={dateFormat} allowClear={false} style={{ marginRight: "10px" }} value={dateEnd} />
            )
        } else {
            endDateValue = moment(dateEnd, dateFormat);
            endPicker = (
                <DatePicker placeholder="" onChange={this.handleEndDeteClick} format={dateFormat} allowClear={false} style={{ marginRight: "10px" }} value={endDateValue} />
            )
        }
        if (beginDateValue != "" && endDateValue != "" && beginDateValue > endDateValue) {
            message.error('提示：开始时间不能大于结束时间！');
            return;
        }

        return (
            <div className="marLeft40 fl z_searchDiv">
                <label htmlFor="" className="font14">姓名：</label>
                <Input
                    placeholder="请输入姓名"
                    value={name}
                    onChange={this.onChangeName}
                    style={{ width: 111, margin: "0 10px 0 0" }}
                />
                <label htmlFor="" className="font14">证件号：</label>
                <Input
                    placeholder="请输入证件号"
                    value={sfzh}
                    onChange={this.onChangeSFZH}
                    style={{ width: 202, margin: "0 10px 0 0" }}
                />
                <label htmlFor="" className="font14">最后盘查时间：</label>
                {beginPicker}
                <span className="font14" style={{ margin: "0 10px 0 0" }}>至</span>
                {endPicker}
                <ShallowBlueBtn width={82} text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                <DeepRedBtn width={82} text="清除" onClick={this.clearHandleClick} />
                <Modal style={{ top: "38%" }}
                    title="提示"
                    visible={this.state.visible}
                    footer={null}
                    maskClosable={false}
                    closable={false}
                >
                    <p style={{ fontSize: "16px", }}>请输入？</p>
                    <p style={{ marginTop: "20px", textAlign: "center" }}>
                        <Button style={{ margin: '0 20px 0 0 ', width: "80px" }} onClick={this.hideModalOk} className="btn_ok">
                            知道了
                        </Button>
                    </p>

                </Modal>
            </div>
        );
    }
})


//弹出的提示框
class ModalDialogue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isShow:'block'
        }
    }
    handleClose = () => {
        this.clear();
    }
    clear() {
        //关闭弹出框
        this.props.changeStatus("none");
        //关闭遮罩
        store.dispatch(changeShade("none"));
        this.setState({

        });
    }

    render() {
        let mdisplay = this.props.isShow;
        return (
            <div>
                <div style={{
                    width: this.props.width, height: this.props.height, border: "1px solid #0C5F93", position: "fixed",
                    left: "39%", top: '35%', zIndex: "9999", display: mdisplay
                }}>
                    <div style={{ background: "rgba(2, 24, 85, 0.9)", padding: "5px" }}>
                        <span style={{ float: "left", fontSize: "16px", color: "#fff" }}>提示框</span>
                        <img src="/images/guanbi.png" style={{ float: "right", marginTop: "5px" }} onClick={this.handleClose} />
                        <div style={{ clear: "both" }}></div>
                    </div>
                    <div style={{ padding: "20px", background: "rgba(37, 51, 100, 0.9)", height: "130px" }}>
                        <p style={{ fontSize: "16px", color: "#fff", textAlign: "center", marginTop: "30px" }}>
                            {this.props.description}
                        </p>
                    </div>

                </div> </div>
        );
    }
}



export default connect(mainReducer)(DynamicContent);