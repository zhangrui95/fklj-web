/**
 * 研判报告轨迹信息
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mainReducer } from "../../reducers/reducers";
import {
    FileInput
} from "../../components/fileInput";
import {
    StylePage,
    ShallowBlueBtn,
    DeepRedBtn,
    DeepBlueBtn,
    PhotoItem,
    Pag,
    SliderMenuItem,
    Shade,
    TextArea,
    FileBtn,
    PagSmall
} from "../generalPurposeModule";
import {
    DatePicker,
    Spin,
    Table,
    message,
    Input,
    Select,
    Modal,
    Button,
    Form,
    Upload,
    Icon,
    Row,
    Col,
    Radio,
    Pagination
} from 'antd';
import {
    changeShade
} from "../../actions/actions";
import { store } from '../../index.js';
import {
    postTrajectoryInformationData, addTrajectoryData, editTrajectoryData, deleteTrajectoryData, addTrafviolateData, editTrafviolateData
} from "../../actions/AuditReport"

import * as constants from "../../utils/Constants";
import { changeMenu } from "../../actions/actions";
import { uuid } from "../../utils/Uuid";
import { getYmd } from "../../utils/Date";
import {
    monthFormat,
    dateFormat,
    serverUrl
} from '../../utils/';
require('../../utils/Utils');
import moment from 'moment';
import { pageSize } from '../../utils/Constants';
moment.locale('zh-cn');
const FormItem = Form.Item;
const mStyle = {
    fontSize: "14px", color: "#fff", marginRight: "20px", width: "56px", float: "left", textAlign: "right"
}
const spanBg = {
    background: "rgb(10, 119, 174)",
    color: "#fff",
    padding: "2px 7px",
    marginRight: "10px",
    fontSize: 14,
    cursor: "pointer",

}
const spanBgActive = {
    background: "rgb(43, 108, 197)",
    color: "#fff",
    padding: "2px 7px",
    marginRight: "10px",
    fontSize: 14,
    cursor: "pointer",
}
const smallIcon = {
    width: "287px",
    border: "1px solid #0C5F93",
    height: "30px",
    borderRadius: "3px",
    float: "left",
}
const IconLi = {
    width: "57px",
    borderRight: "1px solid #0C5F93",
    textAlign: "center",
    lineHeight: "30px",
    height: "30px",
    fontSize: "14px",
    color: "#cacaca",
    float: "left",
    cursor: "pointer",
}
const IconLiActive = {
    width: "57px",
    borderRight: "1px solid #0C5F93",
    textAlign: "center",
    lineHeight: "30px",
    height: "30px",
    fontSize: "14px",
    color: "#fff",
    float: "left",
    background: "rgb(10, 119, 174)",
    cursor: "pointer",
}
const IconLinoborder = {
    width: "57px",

    textAlign: "center",
    lineHeight: "30px",
    height: "30px",
    fontSize: "14px",
    color: "#fff",
    float: "left",
    cursor: "pointer",
}
const IconLinoborderActive = {
    width: "57px",
    textAlign: "center",
    lineHeight: "30px",
    height: "30px",
    fontSize: "14px",
    color: "#fff",
    float: "left",
    background: "rgb(10, 119, 174)",
    cursor: "pointer",
}

const Iocimg = {
    marginTop: "5px",
}
const titlediv = {
    background: "rgba(2, 24, 85, 0.5)",
    height: "40px",
    lineHeight: "40px",
    color: "#fff",
    padding: "0 15px",

}
const titleBg = {
    background: "rgba(2, 24, 85, 0.5)",
    padding: "15px",

}
const clear = {
    clear: "both"
}
const key = {
    color: "red",
    marginRight: "5px"
}
const labelStyle = {
    fontSize: "14px",
    color: "#fff",
    width: "70px",
    display: "inline-block",
}
const labelStyle2 = {
    fontSize: "14px",
    color: "#fff",
    width: "85px",
    display: "inline-block",
    textAlign: "right",
    marginRight: "10px"
}
const borderDiv = {
    float: "left",
    width: "578px",
    background: "rgba(37, 51, 100,0.8)",
    opacity: 0.8,
    border: "1px solid #0C5F93",
    color: "#fff",
    padding: "10px"
}

const font20 = {
    fontSize: "20px",
    color: "#fff",
    textAlign: "left",
    marginBottom: "35px",
    // width: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",/*文字溢出的部分隐藏并用省略号代替*/
    whiteSpace: "nowrap"

}

const font16two = {
    fontSize: "16px",
    color: "#fff",
    textAlign: "left",
    // width: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",/*文字溢出的部分隐藏并用省略号代替*/
    whiteSpace: "nowrap"
}

export class TrajectoryInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgPath: "",
            img: "",
            ModalDialogueShow: 'none',
            trajectoryInformationList: store.getState().AuditReport.data.trajectoryInformationList.result.list,
            tab: "all",
            dateBegin: '',
            dateEnd: "",
            dateBeginDb: "",
            dateEndDb: "",
            type: 'railway',
            //  tab: "train_tab",
            modalKey: 0,
            nowPage: 1,
            visible: false,
            pageSize: 5,
            total: store.getState().AuditReport.data.trajectoryInformationList.result.list.length,
            toConfigure: store.getState().AuditReport.data.toConfigure,
            trajectoryTrigger: store.getState().AuditReport.data.trajectoryTrigger,
        }
        this.pageChange = this.pageChange.bind(this);
    }
    //加载
    componentDidMount() {
        //取状态树上的值
        let trajectoryInformationList = store.getState().AuditReport.data.trajectoryInformationList.result.list;
        console.log('trajectoryInformationList.length', trajectoryInformationList.length);
        let userItem = JSON.parse(sessionStorage.getItem('user'));
        let toConfigure = this.state.toConfigure;
        let trajectoryTrigger = this.state.trajectoryTrigger;
        let pageSize = this.state.pageSize;
        //判断是否有值，没有就从后台接口拿
        if (toConfigure === "") {//判断是不是修改的时候
            if (trajectoryTrigger === false) {
                if (trajectoryInformationList.length === 0) {
                    let creds = {
                        currentPage: 1,
                        entityOrField: true,
                        pd: {
                            idcard: this.props.idcard,
                            followerUserid: '' + userItem.user.idcard,
                        },

                    }
                    store.dispatch(postTrajectoryInformationData(creds));
                }
                // //改变状态
                this.setState({
                    trajectoryInformationList: trajectoryInformationList,
                });
            } else {
                // //改变状态
                this.setState({
                    trajectoryInformationList: trajectoryInformationList,
                });
            }

        } else {
            // //改变状态
            this.setState({
                trajectoryInformationList: trajectoryInformationList,
            });
        }

    }
    //组件props发生变化，更新state
    componentWillReceiveProps(nextProps) {
        let trajectoryInformationList = nextProps.AuditReport.data.trajectoryInformationList.result.list;//更新状态树
        let toConfigure = nextProps.AuditReport.data.toConfigure;
        this.setState({
            trajectoryInformationList: trajectoryInformationList,
            toConfigure: toConfigure,
        });

    }
    pageChange(current) {
        this.setState({
            nowPage: current
        });

    }
    //修改弹出框展示状态
    handChangeModalDialogueShow = (value) => {
        this.setState({
            ModalDialogueShow: value,
        });
    }
    //图片改变事件
    handleChangeImg = (files, event) => {
        //获取图片对象
        let img = files[0];
        this.setState({
            imgPath: img.thumb,
            img: img,
        });
    }
    forceFun = () => {
        this.forceUpdate();
    }

    //添加那妞
    handleClickAdd = () => {
        this.setState({
            visible: true,
            modalType: 'add'
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            modalKey: this.state.modalKey + 1,
            type: 'railway',
            //  tab: "train_tab",
        });
    }
    //查询按钮
    handleClickQuery = () => {
        let dateBegin = this.state.dateBeginDb;
        let dateEnd = this.state.dateEndDb;
        if (dateBegin === "") {
            message.error('请选择开始时间');
            return;
        }
        if (dateEnd === "") {
            message.error('请选择结束时间');
            return;
        }
        if (dateEnd !== "" && dateBegin !== "") {
            this.setState({
                dateEnd: dateEnd,
                dateBegin: dateBegin
            });
        }
        if (dateEnd === "" && dateBegin === "") {
            this.setState({
                dateEnd: "",
                dateBegin: ""
            });
        }
        // let userItem = JSON.parse(sessionStorage.getItem('user'));
        // let creds = {
        //     currentPage: 1,
        //     entityOrField: true,
        //     pd: {
        //         idcard: this.props.idcard,
        //         followerUserid: '' + userItem.user.idcard,
        //         beginTime: dateBegin,
        //         endTime: dateEnd,
        //     },

        // }
        // store.dispatch(postTrajectoryInformationData(creds));
        let trajectoryInformationList = store.getState().AuditReport.data.trajectoryInformationList.result.list;
        this.setState({
            trajectoryInformationList: trajectoryInformationList
        })
    }

    //开始时间改变事件
    handleChangeDateBegin = (date, dateString) => {
        this.setState({
            dateBeginDb: dateString
        });
    }
    //结束时间改变事件
    handleChangeDateEnd = (date, dateString) => {
        this.setState({
            dateEndDb: dateString
        });
    }

    //tab点击事件
    handleTabClick = (type) => {
        // let nowPage = this.state.nowPage;
        this.setState({
            tab: type,
            nowPage: 1,
            dateEnd: "",
            dateBegin: "",
            dateBeginDb: "",
            dateEndDb: "",
        });

    }
    // 改变选择的类型
    handleTabTrain = (event) => {
        this.setState({
            //tab: "train_tab",
            type: "railway",
        });
        this.props.form.resetFields();
    }
    //公路表单
    handleTabHighway = (event) => {
        this.setState({
            // tab: "highway_tab",
            type: "highway"
        });
        this.props.form.resetFields();
    }
    //民航表单
    handleTabAir = (event) => {
        this.setState({
            //  tab: "air_tab",
            type: "plane"
        });
        this.props.form.resetFields();
    }
    //上网表单
    handleTabInternet = (event) => {
        this.setState({
            //   tab: "internet_tab",
            type: "netPlay"
        });
        this.props.form.resetFields();
    }
    //酒店表单
    handleTabLnn = (event) => {
        this.setState({
            //  tab: "lnn_tab",
            type: "hostel"
        });
        this.props.form.resetFields();
    }
    //保存
    saveModel = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            let userItem = JSON.parse(sessionStorage.getItem('user'));
            if (!err) {
                if (this.state.modalType === 'add') {
                    let creds = {
                        id: uuid(),
                        type: this.state.type,
                        name: values.name ? values.name : '',
                        position: values.position ? values.position : '',
                        beginDate: values.beginDate ? values['beginDate'].format('YYYY-MM-DD HH:mm:ss') : '',
                        endDate: values.endDate ? values['endDate'].format('YYYY-MM-DD HH:mm:ss') : '',
                        address: values.address ? values.address : '',
                        fromCity: values.fromCity ? values.fromCity : '',
                        toCity: values.toCity ? values.toCity : '',
                    }
                    store.dispatch(addTrajectoryData(creds));
                }
                this.setState({
                    visible: false,
                    modalKey: this.state.modalKey + 1,
                    type: 'railway',
                });

            }
        })

    }


    //点击下一步
    handleNextClickClear = () => {
        let menus = store.getState().AuditReport.uiData.menus;
        let isSelectMenu;
        for (let x in menus) {
            if (menus[x].isSelect === true) {
                isSelectMenu = menus[x];
                break;
            }
        }
        store.dispatch(changeMenu(menus[isSelectMenu.stage], 'getData', constants.AUDIT_REPORT_MODULE)); //改变选中样式
    };
    // 页码减一
    currentPage = (current) => {
        this.setState({
            nowPage: current
        });
    }
    render() {
        let trajectoryInformationList = this.state.trajectoryInformationList;
        const listConst = this.state.trajectoryInformationList;
        let toConfigure = this.state.toConfigure;
        let lists = [];
        let dateBegin = this.state.dateBegin;
        let dateEnd = this.state.dateEnd;
        let isQueryDate = false;
        if (dateBegin !== "" && dateEnd !== "") {
            isQueryDate = true;
            let dateBeginArr = dateBegin.split("-");
            let dateEndArr = dateEnd.split("-");
            dateBegin = new Date(dateBeginArr[0], dateBeginArr[1], dateBeginArr[2]);
            dateEnd = new Date(dateEndArr[0], dateEndArr[1], dateEndArr[2]);
        }


        if (trajectoryInformationList.length !== 0) {
            for (var i = 0; i < trajectoryInformationList.length; i++) {

                let isTrue = true;
                let trajectoryInformation = trajectoryInformationList[i];
                let beginDate = trajectoryInformation.beginDate ? trajectoryInformation.beginDate : '';
                if (!beginDate) {
                    isTrue = false;
                } else {
                    //beginDate = getYmd(beginDate,'ymd');
                    beginDate = moment(beginDate).format('YYYY-MM-DD');//转换为想要的格式
                    let beginDateArr = beginDate.split("-");
                    beginDate = new Date(beginDateArr[0], beginDateArr[1], beginDateArr[2]);

                }
                if (this.state.tab === 'all') {
                    if (isQueryDate && isTrue) {//时间比较
                        if (dateBegin.getTime() <= beginDate.getTime() && beginDate.getTime() <= dateEnd.getTime()) {//比较数据里面时间是否是在选择查询时间中
                            lists.push(
                                <TraiectoryData
                                    traInList={trajectoryInformationList}
                                    current={this.state.nowPage}
                                    pageSize={this.state.pageSize}
                                    currentPage={this.currentPage}
                                    trajectoryInformation={trajectoryInformation}
                                    forceFun={this.forceFun} key={'tabletra' + i}
                                    toConfigure={toConfigure} />
                            );
                        }

                    } else {

                        lists.push(
                            <TraiectoryData
                                traInList={trajectoryInformationList}
                                current={this.state.nowPage}
                                pageSize={this.state.pageSize}
                                currentPage={this.currentPage}
                                trajectoryInformation={trajectoryInformation}
                                forceFun={this.forceFun} key={'tabletra' + i}
                                toConfigure={toConfigure} />
                        );

                    }

                } else {
                    if (trajectoryInformation.type === this.state.tab) {

                        if (isQueryDate && isTrue) {

                            if (dateBegin.getTime() <= beginDate.getTime() && beginDate.getTime() <= dateEnd.getTime()) {
                                lists.push(
                                    <TraiectoryData
                                        traInList={trajectoryInformationList}
                                        current={this.state.nowPage}
                                        pageSize={this.state.pageSize}
                                        currentPage={this.currentPage}
                                        trajectoryInformation={trajectoryInformation}
                                        forceFun={this.forceFun} key={'tabletra' + i}
                                        toConfigure={toConfigure} />
                                );

                            }
                        } else {
                            lists.push(
                                <TraiectoryData
                                    traInList={trajectoryInformationList}
                                    current={this.state.nowPage}
                                    pageSize={this.state.pageSize}
                                    currentPage={this.currentPage}
                                    trajectoryInformation={trajectoryInformation}
                                    forceFun={this.forceFun} key={'tabletra' + i}
                                    toConfigure={toConfigure} />
                            );
                        }


                    }
                }



            }

        }
        // 假的分页显示代码
        let traList = [];
        if (lists.length !== 0) {
            let current = this.state.nowPage;
            let pageSize = this.state.pageSize;
            for (let pageing = (current - 1) * pageSize; pageing < current * pageSize; pageing++) {
                if (pageing >= 0 && lists[pageing]) {
                    let trajectoryDataList = lists[pageing];
                    traList.push(
                        trajectoryDataList
                    );

                }
                if (traList.length === 0) {
                    current = current - 1
                }
            }
        }
        let totalRecord = store.getState().AuditReport.data.trajectoryInformationList.result.total;
        let nowPage = this.state.nowPage;
        let tab = this.state.tab;
        let type = this.state.type;
        let dateBeginDb = this.state.dateBeginDb;
        let dateEndDb = this.state.dateEndDb;
        // 查询时间变成想要的格式
        let beginDateValue = '';
        if (dateBeginDb === '') { } else {
            beginDateValue = moment(dateBeginDb, dateFormat);
        }
        let endDateValue = '';
        if (dateEndDb === '') { } else {
            endDateValue = moment(dateEndDb, dateFormat);
        }
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16
            }
        };
        return (
            <div style={{ marginTop: "30px" }}>
                {/*查询条件*/}
                <div style={titleBg}>
                    <div style={smallIcon}>
                        {tab === "all" ?
                            <ul>
                                <li onClick={fun => this.handleTabClick('all')} style={IconLiActive}>全部</li>
                                <li onClick={fun => this.handleTabClick('plane')} style={IconLi}><img src="/images/arIcon2.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                <li onClick={fun => this.handleTabClick('railway')} style={IconLi}><img src="/images/arIcon1.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                <li onClick={fun => this.handleTabClick('hostel')} style={IconLi}><img src="/images/arIcon4.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                <li onClick={fun => this.handleTabClick('netPlay')} style={IconLinoborder}><img src="/images/arIcon5.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                <div style={clear}></div>
                            </ul> : tab === "plane" ? <ul>
                                <li onClick={fun => this.handleTabClick('all')} style={IconLi}>全部</li>
                                <li onClick={fun => this.handleTabClick('plane')} style={IconLiActive}><img src="/images/arIcon2_2.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                <li onClick={fun => this.handleTabClick('railway')} style={IconLi}><img src="/images/arIcon1.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                <li onClick={fun => this.handleTabClick('hostel')} style={IconLi}><img src="/images/arIcon4.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                <li onClick={fun => this.handleTabClick('netPlay')} style={IconLinoborder}><img src="/images/arIcon5.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                <div style={clear}></div>
                            </ul> : tab === "railway" ? <ul>
                                <li onClick={fun => this.handleTabClick('all')} style={IconLi}>全部</li>
                                <li onClick={fun => this.handleTabClick('plane')} style={IconLi}><img src="/images/arIcon2.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                <li onClick={fun => this.handleTabClick('railway')} style={IconLiActive}><img src="/images/arIcon1_1.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                <li onClick={fun => this.handleTabClick('hostel')} style={IconLi}><img src="/images/arIcon4.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                <li onClick={fun => this.handleTabClick('netPlay')} style={IconLinoborder}><img src="/images/arIcon5.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                <div style={clear}></div>
                            </ul> : tab === "hostel" ? <ul>
                                <li onClick={fun => this.handleTabClick('all')} style={IconLi}>全部</li>
                                <li onClick={fun => this.handleTabClick('plane')} style={IconLi}><img src="/images/arIcon2.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                <li onClick={fun => this.handleTabClick('railway')} style={IconLi}><img src="/images/arIcon1.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                <li onClick={fun => this.handleTabClick('hostel')} style={IconLiActive}><img src="/images/arIcon4_4.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                <li onClick={fun => this.handleTabClick('netPlay')} style={IconLinoborder}><img src="/images/arIcon5.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                <div style={clear}></div>
                            </ul> : <ul>
                                            <li onClick={fun => this.handleTabClick('all')} style={IconLi}>全部</li>
                                            <li onClick={fun => this.handleTabClick('plane')} style={IconLi}><img src="/images/arIcon2.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                            <li onClick={fun => this.handleTabClick('railway')} style={IconLi}><img src="/images/arIcon1.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                            <li onClick={fun => this.handleTabClick('hostel')} style={IconLi}><img src="/images/arIcon4.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                            <li onClick={fun => this.handleTabClick('netPlay')} style={IconLinoborderActive}><img src="/images/arIcon5_2.png" width="20px" height="20px" style={Iocimg} alt="" /></li>
                                            <div style={clear}></div>
                                        </ul>
                        }

                    </div>
                    {/*时间查询*/}
                    <div>
                        <label htmlFor="" style={labelStyle2}>时间：</label>
                        <DatePicker  placeholder="" value={beginDateValue} onChange={this.handleChangeDateBegin} />
                        <span style={{ color: "#fff", fontSize: "14px", margin: "0 10px" }}>至</span>
                        <DatePicker  placeholder="" value={endDateValue} onChange={this.handleChangeDateEnd} />
                        <ShallowBlueBtn text="查询" margin="0 0 0 20px" width="60px" onClick={this.handleClickQuery} />
                        {toConfigure === 'JudgeHistory' ? '' :
                            <Button style={{ margin: '0 0 0 0px', width: "60px", float: "right" }} onClick={this.handleClickAdd} className="btn_ok">
                                添加
                        </Button>
                        }
                    </div>
                    <div style={clear}></div>
                </div>
                {/*轨迹列表*/}
                <div style={{ padding: "15px" }}>
                    <TraiectoryModel
                        traList={traList}
                        trajectoryInformationList={trajectoryInformationList}
                        type={this.state.tab}
                        dateBegin={dateBeginDb}
                        dateEnd={dateEndDb}
                        tab={this.state.tab}
                        key='TraiectoryModel'

                    />
                </div>
                <div className="pagesize">
                    {/* <PagSmall pageSize={5} nowPage={this.state.nowPage} totalRecord={totalRecord} pageChange={this.pageChange} padding="0 15px 10px 15px" />
                    <div style={{ clear: "both" }}></div> */}
                    <Pagination total={lists.length} key='page' current={this.state.nowPage} pageSize={this.state.pageSize} onChange={this.pageChange} />
                </div>
                <div style={{ margin: "15px 0", paddingRight: "15px" }}>
                    <ShallowBlueBtn text="下一步" onClick={this.handleNextClickClear} width="80px" float="right" />
                    <div style={clear}></div>
                </div>

                {/*遮罩层*/}
                {/* <ModalDialogue width="433px"  isShow={this.state.ModalDialogueShow} changeStatus={this.handChangeModalDialogueShow} /> */}
                <Modal
                    title="轨迹信息"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    key={this.state.modalKey}
                >
                    <Form>
                        {type === "railway" ?
                            <div>
                                <div style={{ marginBottom: "20px", textAlign: 'center' }}>
                                    <span style={spanBgActive} onClick={(event) => this.handleTabTrain(event)}>铁路</span>
                                    <span style={spanBg} onClick={(event) => this.handleTabAir(event)}>民航</span>
                                    <span style={spanBg} onClick={(event) => this.handleTabInternet(event)}>上网</span>
                                    <span style={spanBg} onClick={(event) => this.handleTabLnn(event)}>酒店</span>
                                </div>
                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="车次"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('name', {
                                            rules: [{
                                                required: true, message: '请输入车次!',
                                            }],
                                            initialValue: '',
                                            validateFirst: true
                                        })(
                                            <Input />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="车厢座位"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('position', {
                                            rules: [{
                                                required: true, message: '请输入座位!',
                                            }],
                                            initialValue: '',
                                            validateFirst: true
                                        })(
                                            <Input />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="出发地"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('fromCity', {
                                            rules: [{
                                                required: true, message: '请输入出发地!',
                                            }],
                                            initialValue: '',
                                            validateFirst: true
                                        })(
                                            <Input />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="目的地"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('toCity', {
                                            rules: [{
                                                required: true, message: '请输入目的地!',
                                            }],
                                            initialValue: '',
                                            validateFirst: true
                                        })(
                                            <Input />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px", display: 'none' }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="地址"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('address', {

                                            initialValue: '',
                                            validateFirst: true
                                        })(
                                            <Input />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="出发时间"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('beginDate', {
                                            rules: [{
                                                required: true, message: '请输入出发时间!',
                                            }],
                                            initialValue: '',
                                            validateFirst: true
                                        })(
                                            <DatePicker  placeholder="" format='YYYY-MM-DD HH:mm:ss' allowClear={false} style={{ width: '323px' }} />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px" ,display:'none'}}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="到达时间"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('endDate', {
                                            rules: [{
                                                required: true, message: '请输入到达时间!',
                                            }],
                                            initialValue: moment(),
                                            validateFirst: true
                                        })(
                                            <DatePicker  placeholder="" format='YYYY-MM-DD HH:mm:ss' allowClear={false} style={{ width: '323px' }} />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <Button htmlType="submit" onClick={this.saveModel} className="btn_ok">保存</Button>
                                    <Button style={{ marginLeft: 30 }} onClick={this.handleCancel} className="btn_delete">取消</Button>
                                </div>
                                <div style={clear}></div>
                            </div> : type === "plane" ? <div>
                                <div style={{ marginBottom: "20px", textAlign: 'center' }}>
                                    <span style={spanBg} onClick={(event) => this.handleTabTrain(event)}>铁路</span>
                                    <span style={spanBgActive} onClick={(event) => this.handleTabAir(event)}>民航</span>
                                    <span style={spanBg} onClick={(event) => this.handleTabInternet(event)}>上网</span>
                                    <span style={spanBg} onClick={(event) => this.handleTabLnn(event)}>酒店</span>
                                </div>

                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="班次"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('name', {
                                            rules: [{
                                                required: true, message: '请输入班次!',
                                            }],
                                            initialValue: '',
                                            validateFirst: true
                                        })(
                                            <Input />
                                            )}
                                    </FormItem>

                                </div>
                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="座位号"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('position', {
                                            rules: [{
                                                required: true, message: '请输入座位号!',
                                            }],
                                            initialValue: '',
                                            validateFirst: true
                                        })(
                                            <Input />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="出发地"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('fromCity', {
                                            rules: [{
                                                required: true, message: '请输入出发地!',
                                            }],
                                            initialValue: '',
                                            validateFirst: true
                                        })(
                                            <Input />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="目的地"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('toCity', {
                                            rules: [{
                                                required: true, message: '请输入目的地!',
                                            }],
                                            initialValue: '',
                                            validateFirst: true
                                        })(
                                            <Input />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px", display: 'none' }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="地址"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('address', {
                                            initialValue: '',
                                            validateFirst: true
                                        })(
                                            <Input />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="出发时间"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('beginDate', {
                                            rules: [{
                                                required: true, message: '请输入出发时间!',
                                            }],
                                            initialValue: '',
                                            validateFirst: true
                                        })(
                                            <DatePicker  placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '323px' }} />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px",display:'none' }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="到达时间"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('endDate', {
                                            rules: [{
                                                required: true, message: '请输入到达时间!',
                                            }],
                                            initialValue: moment(),
                                            validateFirst: true
                                        })(
                                            <DatePicker  placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '323px' }} />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <Button htmlType="submit" onClick={this.saveModel} className="btn_ok">保存</Button>
                                    <Button style={{ marginLeft: 30 }} onClick={this.handleCancel} className="btn_delete">取消</Button>
                                </div>
                                <div style={clear}></div>

                            </div> : type === "netPlay" ?
                                    <div>
                                        <div style={{ marginBottom: "20px", textAlign: 'center' }}>
                                            <span style={spanBg} onClick={(event) => this.handleTabTrain(event)}>铁路</span>
                                            <span style={spanBg} onClick={(event) => this.handleTabAir(event)}>民航</span>
                                            <span style={spanBgActive} onClick={(event) => this.handleTabInternet(event)}>上网</span>
                                            <span style={spanBg} onClick={(event) => this.handleTabLnn(event)}>酒店</span>
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="网吧名称"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('name', {
                                                    rules: [{
                                                        required: true, message: '请输入名称!',
                                                    }],
                                                    initialValue: '',
                                                    validateFirst: true
                                                })(
                                                    <Input />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="主机号"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('position', {
                                                    rules: [{
                                                        required: true, message: '请输入主机号!',
                                                    }],
                                                    initialValue: '',
                                                    validateFirst: true
                                                })(
                                                    <Input />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ marginBottom: "20px", display: "none" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="出发地"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('fromCity', {

                                                    initialValue: '',
                                                    validateFirst: true
                                                })(
                                                    <Input />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ marginBottom: "20px", display: "none" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="目的地"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('toCity', {

                                                    initialValue: '',
                                                    validateFirst: true
                                                })(
                                                    <Input />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="网吧地址"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('address', {

                                                    initialValue: '',
                                                    validateFirst: true
                                                })(
                                                    <Input />
                                                    )}
                                            </FormItem>
                                        </div>

                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="开始时间"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('beginDate', {
                                                    rules: [{
                                                        required: true, message: '请输入出发时间!',
                                                    }],
                                                    initialValue: '',
                                                    validateFirst: true
                                                })(
                                                    <DatePicker  placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '323px' }} />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="结束时间"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('endDate', {
                                                    rules: [{
                                                        required: true, message: '请输入结束时间!',
                                                    }],
                                                    initialValue: '',
                                                    validateFirst: true
                                                })(
                                                    <DatePicker  placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '323px' }} />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ textAlign: "center" }}>
                                            <Button htmlType="submit" onClick={this.saveModel} className="btn_ok">保存</Button>
                                            <Button style={{ marginLeft: 30 }} onClick={this.handleCancel} className="btn_delete">取消</Button>
                                        </div>
                                        <div style={clear}></div>
                                    </div>
                                    : type === "hostel" ? <div>
                                        <div style={{ marginBottom: "20px", textAlign: 'center' }}>
                                            <span style={spanBg} onClick={(event) => this.handleTabTrain(event)}>铁路</span>
                                            <span style={spanBg} onClick={(event) => this.handleTabAir(event)}>民航</span>
                                            <span style={spanBg} onClick={(event) => this.handleTabInternet(event)}>上网</span>
                                            <span style={spanBgActive} onClick={(event) => this.handleTabLnn(event)}>酒店</span>
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="酒店名称"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('name', {
                                                    rules: [{
                                                        required: true, message: '请输入酒店名称!',
                                                    }],
                                                    initialValue: '',
                                                    validateFirst: true
                                                })(
                                                    <Input />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="房间号"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('position', {
                                                    rules: [{
                                                        required: true, message: '请输入房间号!',
                                                    }],
                                                    initialValue: '',
                                                    validateFirst: true
                                                })(
                                                    <Input />
                                                    )}
                                            </FormItem>

                                        </div>
                                        <div style={{ marginBottom: "20px", display: "none" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="出发地"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('fromCity', {

                                                    initialValue: '',
                                                    validateFirst: true
                                                })(
                                                    <Input />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ marginBottom: "20px", display: "none" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="目的地"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('toCity', {

                                                    initialValue: '',
                                                    validateFirst: true
                                                })(
                                                    <Input />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="酒店地址"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('address', {

                                                    initialValue: '',
                                                    validateFirst: true
                                                })(
                                                    <Input />
                                                    )}
                                            </FormItem>

                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="入住时间"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('beginDate', {
                                                    rules: [{
                                                        required: true, message: '请输入入住时间!',
                                                    }],
                                                    initialValue: '',
                                                    validateFirst: true
                                                })(
                                                    <DatePicker  placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '323px' }} />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="退房时间"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('endDate', {
                                                    rules: [{
                                                        required: true, message: '请输入退房时间!',
                                                    }],
                                                    initialValue: '',
                                                    validateFirst: true
                                                })(
                                                    <DatePicker  placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '323px' }} />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ textAlign: "center" }}>
                                            <Button htmlType="submit" onClick={this.saveModel} className="btn_ok">保存</Button>
                                            <Button style={{ marginLeft: 30 }} onClick={this.handleCancel} className="btn_delete">取消</Button>
                                        </div>
                                        <div style={clear}></div>

                                    </div> : ''
                        }
                    </Form>
                </Modal>
            </div>

        );
    }
};

class TraiectoryModel extends Component {
    //刷新
    constructor(props) {
        super(props);
        this.state = {
            TraiectoryDataKey: 0
        }
    }
    forceFun = () => {
        this.forceUpdate();
    }

    render() {
        let traList = this.props.traList;
        return (
            <div>
                {traList}
            </div>
        );
    }
}
//轨迹列表展示
class TraiectoryData extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);//绑定this
        this.state = {
            background: "rgba(25, 41, 85, 0.498039)",
            dleColor: "#fff",
            deletevisible: false,
            visible: false,
            type: 'railway'
        }
    }
    //删除
    delete = () => {
        this.setState({
            deletevisible: true,
        });
    }

    handleMouseOver = () => {
        this.setState({
            background: "#28386A",
            dleColor: "#e77255"
        });
    }
    handleMouseOut = () => {
        this.setState({
            background: "rgba(25, 41, 85, 0.498039)",
            dleColor: "#fff"
        });
    }

    //确认删除事件
    clickDelete = () => {
        let creds = this.props.trajectoryInformation;
        store.dispatch(deleteTrajectoryData(creds));
        message.success('删除成功');
        // 分页最后一页删除到最后，向前跳一页
        let current = this.props.current; //当前页
        let pageSize = this.props.pageSize; //每页显示条数
        let trajectoryInformationList = this.props.traInList;
        let count = this.props.traInList.length;//总条数
        let totalPage = Math.ceil(count / pageSize);//共有多少页



        console.info('totalPage', totalPage);
        // if(Math.ceil(trajectoryInformationList.length/pageSize) === current){   15       20
        if (current * pageSize > count) {//在最后一个才会出现，当前页乘以每页条数大于总条数
            if (count % pageSize === 0 && current !== 1) {
                current = current - 1;
                this.props.currentPage(current);
            }
        }
        // }

        this.setState({
            deletevisible: false,
        });

    }
    handleCanceldelete = () => {
        this.setState({
            deletevisible: false,
        });
    }
    //铁路表单
    handleTabTrain = (event) => {
        this.setState({
            type: "railway"
        });
        this.props.form.resetFields();
    }
    //公路表单
    handleTabHighway = (event) => {
        this.setState({
            type: "highway"
        });
        this.props.form.resetFields();
    }
    //民航表单
    handleTabAir = (event) => {
        this.setState({
            type: "plane"
        });
        this.props.form.resetFields();
    }
    //上网表单
    handleTabInternet = (event) => {
        this.setState({
            type: "netPlay"
        });
        this.props.form.resetFields();
    }
    //酒店表单
    handleTabLnn = (event) => {
        this.setState({
            type: "hostel"
        });
        this.props.form.resetFields();
    }
    //修改
    editModal = () => {
        this.setState({
            type: this.props.trajectoryInformation.type,
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    saveModel = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let userItem = JSON.parse(sessionStorage.getItem('user'));
            if (!err) {
                let creds = {
                    id: this.props.trajectoryInformation.id,
                    type: this.state.type ? this.state.type : this.props.trajectoryInformation.type,
                    name: values.name ? values.name : this.props.trajectoryInformation.name,
                    position: values.position ? values.position : this.props.trajectoryInformation.position,
                    beginDate: values.beginDate ? values['beginDate'].format('YYYY-MM-DD HH:mm:ss') : this.props.trajectoryInformation.beginDate,
                    endDate: values.endDate ? values['endDate'].format('YYYY-MM-DD HH:mm:ss') : this.props.trajectoryInformation.endDate,
                    address: values.address ? values.address : this.props.trajectoryInformation.address,
                    fromCity: values.fromCity ? values.fromCity : this.props.trajectoryInformation.fromCity,
                    toCity: values.toCity ? values.toCity : this.props.trajectoryInformation.toCity,
                }
                store.dispatch(editTrajectoryData(creds));
                this.setState({
                    visible: false
                });
            }
        })

    }
    render() {
        //let tab = this.props.tab;
        let type = this.state.type;
        let trajectoryInformation = this.props.trajectoryInformation;
        let toConfigure = this.props.toConfigure;
        let background = this.state.background;
        let dleColor = this.state.dleColor;
        let remove = <div onClick={this.delete} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} style={{ cursor: "pointer", color: dleColor }}>{toConfigure === 'JudgeHistory' ? '' : '删除'}</div>
        let edit = <div onClick={this.editModal} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} style={{ cursor: "pointer", color: dleColor }}>{toConfigure === 'JudgeHistory' ? '详情' : '编辑'}</div>
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16
            }
        };
        return (
            <div style={{ background: background, padding: "15px", marginBottom: "10px" }} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                <div style={{ float: "left", marginRight: "30px" }}>
                    {trajectoryInformation.type === "plane" ? <img src="/images/air.png" alt="" />
                        : trajectoryInformation.type === "netPlay" ? <img src="/images/internet.png" alt="" />
                            : trajectoryInformation.type === "railway" ? <img src="/images/tielu.png" alt="" />
                                : trajectoryInformation.type === "highway" ? <img src="/images/gonglu.png" alt="" /> : <img src="/images/hotel.png" />}
                </div>
                <div style={{ float: "left", marginRight: "10px" }}>
                    <p style={font20}>
                        <span style={{ marginRight: "50px" }}>
                            {trajectoryInformation.type === "plane" ? "民航"
                                : trajectoryInformation.type === "netPlay" ? "上网"
                                    : trajectoryInformation.type === "railway" ? "铁路"
                                        : trajectoryInformation.type === "highway" ? "公路" : "酒店"}
                        </span>
                        <span style={{ marginRight: "10px" }}>
                            {trajectoryInformation.type === "netPlay" ||trajectoryInformation.type === "hostel"? trajectoryInformation.beginDate + "至" + trajectoryInformation.endDate : trajectoryInformation.beginDate}
                        </span>
                    </p>
                    <p style={font16two} >
                        <span style={{ marginRight: "70px" }}>
                            {trajectoryInformation.type === "netPlay" ? trajectoryInformation.address : trajectoryInformation.fromCity + "---" + trajectoryInformation.toCity && trajectoryInformation.type === "hostel" ? trajectoryInformation.address : trajectoryInformation.fromCity + "---" + trajectoryInformation.toCity}
                        </span>
                        <span style={{ marginRight: "70px" }}>
                            {trajectoryInformation.type === "plane" ? "班次：" + trajectoryInformation.name
                                : trajectoryInformation.type === "netPlay" ? trajectoryInformation.name
                                    : trajectoryInformation.type === "railway" ? "车次：" + trajectoryInformation.name
                                        : trajectoryInformation.type === "highway" ? "车次：" + trajectoryInformation.name : trajectoryInformation.name}
                        </span>
                        <span>
                            {trajectoryInformation.type === "netPlay" ? "主机号：" + trajectoryInformation.position : "座位：" + trajectoryInformation.position && trajectoryInformation.type === "hostel" ? "房间号：" + trajectoryInformation.position : "座位：" + trajectoryInformation.position}
                        </span>
                    </p>
                </div>
                <div style={{ float: "right", marginTop: "30px", color: "#fff", width: '60px' }}>
                    <div style={{ float: "left" }}>{edit}</div>
                    <div style={{ float: "right" }}>{remove}</div>
                    <div style={{ clear: "both" }}></div>
                </div>

                <div style={{ clear: "both" }}></div>
                <Modal style={{ top: "38%" }}
                    title="提示"
                    visible={this.state.deletevisible}
                    footer={null}
                    maskClosable={false}
                    closable={false}
                >
                    <p style={{ fontSize: "16px", }}>是否删除此项？</p>
                    <p style={{ marginTop: "20px", textAlign: "center" }}>
                        <Button style={{ margin: '0 20px 0 0 ', width: "80px" }} onClick={this.clickDelete} className="btn_ok">
                            确定
                        </Button>
                        <Button style={{ margin: '', width: "80px" }} onClick={this.handleCanceldelete} className="btn_delete">
                            取消
                        </Button>
                    </p>

                </Modal>
                {/* 修改轨迹信息 */}
                <Modal
                    title="修改轨迹信息"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}

                >

                    <Form>
                        {type === "railway" ?
                            <div>
                                <div style={{ marginBottom: "20px", textAlign: 'center' }}>
                                    <span style={spanBgActive} onClick={(event) => this.handleTabTrain(event)}>铁路</span>
                                    {/* <span style={spanBg} onClick={(event) => this.handleTabAir(event)}>民航</span>
                                    <span style={spanBg} onClick={(event) => this.handleTabInternet(event)}>上网</span>
                                    <span style={spanBg} onClick={(event) => this.handleTabLnn(event)}>酒店</span> */}
                                </div>
                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="车次"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('name', {
                                            rules: [{
                                                required: true, message: '请输入车次!',
                                            }],
                                            initialValue: trajectoryInformation.name,
                                            validateFirst: true
                                        })(
                                            <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="车厢座位"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('position', {
                                            rules: [{
                                                required: true, message: '请输入座位!',
                                            }],
                                            initialValue: trajectoryInformation.position,
                                            validateFirst: true
                                        })(
                                            <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="出发地"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('fromCity', {
                                            rules: [{
                                                required: true, message: '请输入出发地!',
                                            }],
                                            initialValue: trajectoryInformation.fromCity,
                                            validateFirst: true
                                        })(
                                            <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="目的地"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('toCity', {
                                            rules: [{
                                                required: true, message: '请输入目的地!',
                                            }],
                                            initialValue: trajectoryInformation.toCity,
                                            validateFirst: true
                                        })(
                                            <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px", display: 'none' }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="地址"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('address', {

                                            initialValue: trajectoryInformation.address,
                                            validateFirst: true
                                        })(
                                            <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="出发时间"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('beginDate', {
                                            rules: [{
                                                required: true, message: '请输入出发时间!',
                                            }],
                                            initialValue: moment(trajectoryInformation.beginDate),
                                            validateFirst: true
                                        })(
                                            <DatePicker  placeholder="" format='YYYY-MM-DD HH:mm:ss' allowClear={false} disabled={toConfigure === 'JudgeHistory' ? true : false} style={{ width: '323px' }} />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px" ,display:'none'}}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="到达时间"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('endDate', {
                                            rules: [{
                                                required: true, message: '请输入到达时间!',
                                            }],
                                            initialValue: trajectoryInformation.endDate ? moment(trajectoryInformation.endDate) : moment(),
                                            validateFirst: true
                                        })(
                                            <DatePicker  placeholder="" format='YYYY-MM-DD HH:mm:ss' allowClear={false} disabled={toConfigure === 'JudgeHistory' ? true : false} style={{ width: '323px' }} />
                                            )}
                                    </FormItem>
                                </div>
                                {toConfigure === 'JudgeHistory' ? '' :
                                    <div style={{ textAlign: "center" }}>
                                        <Button htmlType="submit" onClick={this.saveModel} className="btn_ok">保存</Button>
                                        <Button style={{ marginLeft: 30 }} onClick={this.handleCancel} className="btn_delete">取消</Button>
                                    </div>}
                                <div style={clear}></div>
                            </div> : type === "plane" ? <div>
                                <div style={{ marginBottom: "20px", textAlign: 'center' }}>
                                    {/* <span style={spanBg} onClick={(event) => this.handleTabTrain(event)}>铁路</span> */}
                                    <span style={spanBgActive} onClick={(event) => this.handleTabAir(event)}>民航</span>
                                    {/* <span style={spanBg} onClick={(event) => this.handleTabInternet(event)}>上网</span>
                                    <span style={spanBg} onClick={(event) => this.handleTabLnn(event)}>酒店</span> */}
                                </div>

                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="班次"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('name', {
                                            rules: [{
                                                required: true, message: '请输入班次!',
                                            }],
                                            initialValue: trajectoryInformation.name,
                                            validateFirst: true
                                        })(
                                            <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                            )}
                                    </FormItem>

                                </div>
                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="座位号"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('position', {
                                            rules: [{
                                                required: true, message: '请输入座位号!',
                                            }],
                                            initialValue: trajectoryInformation.position,
                                            validateFirst: true
                                        })(
                                            <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="出发地"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('fromCity', {
                                            rules: [{
                                                required: true, message: '请输入出发地!',
                                            }],
                                            initialValue: trajectoryInformation.fromCity,
                                            validateFirst: true
                                        })(
                                            <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="目的地"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('toCity', {
                                            rules: [{
                                                required: true, message: '请输入目的地!',
                                            }],
                                            initialValue: trajectoryInformation.toCity,
                                            validateFirst: true
                                        })(
                                            <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px", display: 'none' }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="地址"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('address', {
                                            initialValue: trajectoryInformation.address,
                                            validateFirst: true
                                        })(
                                            <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px" }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="出发时间"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('beginDate', {
                                            rules: [{
                                                required: true, message: '请输入出发时间!',
                                            }],
                                            initialValue: moment(trajectoryInformation.beginDate),
                                            validateFirst: true
                                        })(
                                            <DatePicker  placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} disabled={toConfigure === 'JudgeHistory' ? true : false} style={{ width: '323px' }} />
                                            )}
                                    </FormItem>
                                </div>
                                <div style={{ marginBottom: "20px",display:'none' }}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="到达时间"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('endDate', {
                                            rules: [{
                                                required: true, message: '请输入到达时间!',
                                            }],
                                            initialValue: trajectoryInformation.endDate ? moment(trajectoryInformation.endDate) : moment(),
                                            validateFirst: true
                                        })(
                                            <DatePicker  placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} disabled={toConfigure === 'JudgeHistory' ? true : false} style={{ width: '323px' }} />
                                            )}
                                    </FormItem>
                                </div>
                                {toConfigure === 'JudgeHistory' ? '' :
                                    <div style={{ textAlign: "center" }}>
                                        <Button htmlType="submit" onClick={this.saveModel} className="btn_ok">保存</Button>
                                        <Button style={{ marginLeft: 30 }} onClick={this.handleCancel} className="btn_delete">取消</Button>
                                    </div>}
                                <div style={clear}></div>

                            </div> : type === "netPlay" ?
                                    <div>
                                        <div style={{ marginBottom: "20px", textAlign: 'center' }}>
                                            {/* <span style={spanBg} onClick={(event) => this.handleTabTrain(event)}>铁路</span>
                                            <span style={spanBg} onClick={(event) => this.handleTabAir(event)}>民航</span> */}
                                            <span style={spanBgActive} onClick={(event) => this.handleTabInternet(event)}>上网</span>
                                            {/* <span style={spanBg} onClick={(event) => this.handleTabLnn(event)}>酒店</span> */}
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="网吧名称"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('name', {
                                                    rules: [{
                                                        required: true, message: '请输入名称!',
                                                    }],
                                                    initialValue: trajectoryInformation.name,
                                                    validateFirst: true
                                                })(
                                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="主机号"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('position', {
                                                    rules: [{
                                                        required: true, message: '请输入主机号!',
                                                    }],
                                                    initialValue: trajectoryInformation.position,
                                                    validateFirst: true
                                                })(
                                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ marginBottom: "20px", display: "none" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="出发地"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('fromCity', {

                                                    initialValue: trajectoryInformation.fromCity,
                                                    validateFirst: true
                                                })(
                                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ marginBottom: "20px", display: "none" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="目的地"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('toCity', {

                                                    initialValue: trajectoryInformation.toCity,
                                                    validateFirst: true
                                                })(
                                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="网吧地址"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('address', {

                                                    initialValue: trajectoryInformation.address,
                                                    validateFirst: true
                                                })(
                                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                                    )}
                                            </FormItem>
                                        </div>

                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="开始时间"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('beginDate', {
                                                    rules: [{
                                                        required: true, message: '请输入出发时间!',
                                                    }],
                                                    initialValue: moment(trajectoryInformation.beginDate),
                                                    validateFirst: true
                                                })(
                                                    <DatePicker  placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} disabled={toConfigure === 'JudgeHistory' ? true : false} style={{ width: '323px' }} />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="结束时间"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('endDate', {
                                                    rules: [{
                                                        required: true, message: '请输入结束时间!',
                                                    }],
                                                    initialValue: trajectoryInformation.endDate ? moment(trajectoryInformation.endDate) : moment(),
                                                    validateFirst: true
                                                })(
                                                    <DatePicker  placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} disabled={toConfigure === 'JudgeHistory' ? true : false} style={{ width: '323px' }} />
                                                    )}
                                            </FormItem>
                                        </div>
                                        {toConfigure === 'JudgeHistory' ? '' :
                                            <div style={{ textAlign: "center" }}>
                                                <Button htmlType="submit" onClick={this.saveModel} className="btn_ok">保存</Button>
                                                <Button style={{ marginLeft: 30 }} onClick={this.handleCancel} className="btn_delete">取消</Button>
                                            </div>}
                                        <div style={clear}></div>
                                    </div>
                                    : type === "hostel" ? <div>
                                        <div style={{ marginBottom: "20px", textAlign: 'center' }}>
                                            {/* <span style={spanBg} onClick={(event) => this.handleTabTrain(event)}>铁路</span>
                                            <span style={spanBg} onClick={(event) => this.handleTabAir(event)}>民航</span>
                                            <span style={spanBg} onClick={(event) => this.handleTabInternet(event)}>上网</span> */}
                                            <span style={spanBgActive} onClick={(event) => this.handleTabLnn(event)}>酒店</span>
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="酒店名称"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('name', {
                                                    rules: [{
                                                        required: true, message: '请输入酒店名称!',
                                                    }],
                                                    initialValue: trajectoryInformation.name,
                                                    validateFirst: true
                                                })(
                                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="房间号"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('position', {
                                                    rules: [{
                                                        required: true, message: '请输入房间号!',
                                                    }],
                                                    initialValue: trajectoryInformation.position,
                                                    validateFirst: true
                                                })(
                                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                                    )}
                                            </FormItem>

                                        </div>
                                        <div style={{ marginBottom: "20px", display: "none" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="出发地"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('fromCity', {

                                                    initialValue: trajectoryInformation.fromCity,
                                                    validateFirst: true
                                                })(
                                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ marginBottom: "20px", display: "none" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="目的地"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('toCity', {

                                                    initialValue: trajectoryInformation.toCity,
                                                    validateFirst: true
                                                })(
                                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="酒店地址"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('address', {

                                                    initialValue: trajectoryInformation.address,
                                                    validateFirst: true
                                                })(
                                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                                    )}
                                            </FormItem>

                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="入住时间"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('beginDate', {
                                                    rules: [{
                                                        required: true, message: '请输入出发时间!',
                                                    }],
                                                    initialValue: moment(trajectoryInformation.beginDate),
                                                    validateFirst: true
                                                })(
                                                    <DatePicker  placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} disabled={toConfigure === 'JudgeHistory' ? true : false} style={{ width: '323px' }} />
                                                    )}
                                            </FormItem>
                                        </div>
                                        <div style={{ marginBottom: "20px" }}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="退房时间"
                                                hasFeedback
                                            >
                                                {getFieldDecorator('endDate', {
                                                    rules: [{
                                                        required: true, message: '请输入退房时间!',
                                                    }],
                                                    initialValue: trajectoryInformation.endDate ? moment(trajectoryInformation.endDate) : moment(),
                                                    validateFirst: true
                                                })(
                                                    <DatePicker  placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} disabled={toConfigure === 'JudgeHistory' ? true : false} style={{ width: '323px' }} />
                                                    )}
                                            </FormItem>
                                        </div>
                                        {toConfigure === 'JudgeHistory' ? '' :
                                            <div style={{ textAlign: "center" }}>
                                                <Button htmlType="submit" onClick={this.saveModel} className="btn_ok">保存</Button>
                                                <Button style={{ marginLeft: 30 }} onClick={this.handleCancel} className="btn_delete">取消</Button>
                                            </div>}
                                        <div style={clear}></div>

                                    </div> : ''
                        }
                    </Form>
                </Modal>

            </div>
        );
    }
}
TraiectoryData = Form.create()(TraiectoryData);
TrajectoryInformation = Form.create()(TrajectoryInformation);
export default connect(mainReducer)(TrajectoryInformation);