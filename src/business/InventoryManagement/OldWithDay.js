// 盘查管理-旧版反恐利剑
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mainReducer } from "../../reducers/reducers";
import { StylePage, ShallowBlueBtn, Pag, InterrogationDetailsItem, Tabs } from "../generalPurposeModule";
import { store } from '../../index.js';
import * as constants from "../../utils/Constants";
import { monthFormat, dateFormat, serverUrl, getMyDate } from '../../utils/';
import { Spin, Table, message, Input, Modal, Button, Form, Icon, Row, Col, Select, DatePicker, Tag, Divider, Radio } from 'antd';
import { BannerAnimImg } from '../../components/BannerAnim';
import { postInterrogationDetailsUsersData } from "../../actions/InterrogationDetails";
import { SwordData } from "../InterrogationDetails/SwordData";
import { changeTab } from "../../actions/actions";
import {
    postOldInventoryListHushiData, postOldInventoryListHushiDetailsData, postOldInventoryLuokuData, postInventoryListHushiDetailsData
} from "../../actions/InventoryManagement";
import {
    api
} from '../../actions/actions';
import {
    post,
    get,
    put
} from "../../actions/request";
import {
    Link
} from "react-router";
import moment from 'moment';
moment.locale('zh-cn');

// 样式
const sliderdyHeader = {
    borderBottom: "1px solid #0C5F93",
    padding: "18px 0",
    overflow: "hidden"
}
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
//分页配置文件
const pagination = {
    size: 'small',
    pageSize: constants.recordPageSize,
    showTotal(total) {
        return `合计 ${total} 条记录`;
    },
    itemRender(current, type, originalElement) {
        if (type === 'prev') {
            return <a>上一页</a>;
        } else if (type === 'next') {
            return <a>下一页</a>;
        }
        return originalElement;
    }
};
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const formText = {
    labelCol: {
        xs: { span: 22 },
        sm: { span: 2 },
    },
    wrapperCol: {
        xs: { span: 2 },
        sm: { span: 21 },
    },
};
const mStyle = {
    fontSize: "14px",
    color: "#fff",
    marginRight: "20px",
    width: "104px",
    float: "left",
    textAlign: "right"
}

export class OldWithDay extends Component {
    constructor(props) { //初始化nowPage为1
        super(props);
        this.state = {
            nowPage: 1,
            ModalDialogueShow: 'none',
            ModalDialogueType: 'add',
            lineId: '',
            highRiskLine: null,
            selectedRowsId: [],
            name: '',
            idcard: '',
            enddate: '',
            begindate: '',
            subtask_name: '',
            police_name: '',
            key: '',
            record: null,
            pagination: pagination,
            loading: false,
            personInfo: '',
            modalKey: 0,
            modalType: '',
            remark: "",
            zoomvisible: false,
            imgtext: '',
            text: null,
            visibles: false,//写实照片展示
            arrayImg: [],
            currentImg: '',
            index: 0,
            ModalKey: 0,
            oldVisibles: false,
            oldpersonInfo: '',
            personId: '',
            recordId: '',
            visible:false,
        };
        // this.pageChange = this.pageChange.bind(this);
    }
    componentDidMount() {
        let params = {
            currentPage: 1,
            pd: {
                idcard: '',
                police_unit: '',
                name: "",
                police_name: '',
                endtime: '',
                starttime: '',
            },
            showCount: 10
        }
        store.dispatch(postOldInventoryListHushiData(params));
    }
    editShowModal = (record) => {
        this.setState({
            visible: true,
            personInfo: record,
            modalType: 'edit'
        });
        let creds = {
            idcard: record.idcard
        }
        store.dispatch(postOldInventoryListHushiDetailsData(creds));
    }
    addShowModal = (record) => {
        this.setState({
            visible: true,
            modalType: 'add',
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            modalKey: this.state.modalKey + 1
        });
    }
    // 原反恐利剑 点击详情函数
    oldDetailsShowModal = (record) => {
        if (record.examine_version && record.examine_version == 0) {
            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    record_id: record.record_id,
                    person_id: record.person_id,
                },
                showCount: constants.pageSize
            }
            store.dispatch(postOldInventoryLuokuData(creds));
            this.setState({
                oldVisibles: true,
                oldpersonInfo: record,
                modalType: 'edit',
                recordId: record.record_id,
                personId: record.person_id,
            });
        } else {
            let creds = {
                idcard: record.idcard,
                cycle: 0,
                checktime: record.checktime,
                record_id: record.record_id,
            }
            store.dispatch(postInventoryListHushiDetailsData(creds));
            this.setState({
                visible: true,
                oldVisibles: false,
                personInfo: record,
                modalType: 'edit'
            });
        }


    }
    // 原反恐利剑 取消
    handleOldCancel = () => {
        this.setState({
            oldVisibles: false,
            modalKey: this.state.modalKey + 1
        });
    }
    serchChange = (name, idcard, enddate, begindate, subtask_name, police_name, page) => {
        this.setState({
            name: name,
            idcard: idcard,
            enddate: enddate,
            begindate: begindate,
            subtask_name: subtask_name,
            police_name: police_name,
            nowPage: page
        });
    }
    initEntity = () => {
        this.setState({
            nowPage: 1,
        })
    }
    handleImgClick = (arrayImg, currentImg, index) => {
        this.setState({
            visibles: true,
            arrayImg: arrayImg,
            currentImg: currentImg,
            index: index,
        });
    }
    handleCancels = () => {
        this.setState({
            visibles: false,
            arrayImg: [],
            currentImg: '',
            index: 0,
            ModalKey: this.state.ModalKey + 1
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            ModalKey: this.state.ModalKey + 1
        });
    }
    // 原反恐 
    //设置管理菜单点击-获取数据-开关事件
    handleTabClick = (tab, type) => {
        store.dispatch(changeTab(tab, type, constants.INTERROGATIONDETAILS_MODULE));

        switch (tab.tabName) {

            case constants.INTERROGATIONDETAILS_TAB_LJ_DATA:
                //   this.props.dispatch(fetchInterrogationInformationData('/getInterrogationInformation'));
                break;
            default:
                break
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let nowPage = this.state.nowPage;
        let isFetching = store.getState().InventoryManagement.data.oldinvenListHushi.isFetching;
        let data = store.getState().InventoryManagement.data.oldinvenListHushi.result.list;
        let obj = store.getState().InventoryManagement.data.oldinvenListHushi.result;
        let page = store.getState().InventoryManagement.data.oldinvenListHushi.result.page;
        let luokeData = store.getState().InventoryManagement.data.oldinvenLuoku.result;
        let baseInfo = luokeData.baseInfo ? luokeData.baseInfo : {};//人员基本信息
        let recordPerson = luokeData.recordPerson ? luokeData.recordPerson : {};//人员信息及标签
        let domicileInfo = luokeData.domicileInfo ? luokeData.domicileInfo : {};//背景核查
        let paintRealInfo = luokeData.paintRealInfo ? luokeData.paintRealInfo : {};//写实信息
        let examinaTerrorismflow = luokeData.examinaTerrorismflow ? luokeData.examinaTerrorismflow : {};//流入地信息
        let scrutinyInfo = luokeData.scrutinyInfo ? luokeData.scrutinyInfo : [];//特征核查
        let newobj = store.getState().InventoryManagement.data.invenListHushiDetails.result;
        // 特征盘查 数组
        let scrutinyInfoList = [];
        if (scrutinyInfo && scrutinyInfo.length > 0) {
            // let scrutinyInfoArr = JSON.stringify(scrutinyInfo).split(',');
            // for (let i = 0; i < scrutinyInfoArr.length; i++) {
            //     scrutinyInfoList.push(
            //         <span>{scrutinyInfoArr[i]}</span>
            //     );
            // }
            for (let i = 0; i < scrutinyInfo.length; i++) {
                scrutinyInfoList.push(
                    <span style={{ marginRight: '10px' }}>{scrutinyInfo[i]}</span>
                );
            }
        }

        // 标签
        let tags = luokeData.recordPerson ? luokeData.recordPerson.tags : [];
        let greenTag = [];
        let redTag = [];
        if (tags.length > 0) {
            let tagsArr = tags.split(',');

            for (let i = 0; i < tagsArr.length; i++) {
                let tagsList = tagsArr[i];
                let judgeTag = tagsList.split('-')[1];
                let textTag = tagsList.split('-')[0];
                if (judgeTag === "111001") {
                    redTag.push(
                        <Tag color="red" style={{ marginTop: "10px" }}>{textTag}</Tag>
                    );
                } else if (judgeTag === "111002") {
                    greenTag.push(
                        <Tag color="green" style={{ marginTop: "10px" }}>{textTag}</Tag>
                    );
                }
            }
        } else {

        }
        let dataList = [];
        let recordNumber = parseInt((nowPage - 1) * 10);
        if (data) {
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                let serial = recordNumber + i + 1;
                dataList.push({
                    serial: serial,
                    name: item.name ? item.name : '',
                    idcard: item.idcard ? item.idcard : '',
                    sex: item.sex ? item.sex : '',
                    age: item.age ? item.age : '',
                    nation: item.nation ? item.nation : '',
                    address: item.address ? item.address : '',
                    phone: item.phone ? item.phone : '',
                    police_unit: item.police_unit ? item.police_unit : '',
                    police_name: item.police_name ? item.police_name : '',
                    checktime: item.checktime ? getMyDate(item.checktime / 1000) : '',
                    person_id: item.person_id ? item.person_id : '',
                    record_id: item.record_id ? item.record_id : '',
                    examine_version: item.examine_version ? item.examine_version : '',

                });
            }
        }
        const columns = [{
            title: '序号',
            dataIndex: 'serial',
        }, {
            title: '身份证号',
            dataIndex: 'idcard',
            width: 160,
        }, {
            title: '姓名',
            dataIndex: 'name',
            // width: 180,
        }, {
            title: '性别',
            dataIndex: 'sex',
        }, {
            title: '年龄',
            dataIndex: 'age',
        }
            , {
            title: '民族',
            dataIndex: 'nation',
        }
            , {
            title: '户籍地址',
            dataIndex: 'address',
        }, {
            title: '联系电话',
            dataIndex: 'phone',
        }, {
            title: '所属机构',
            dataIndex: 'police_unit',
        }, {
            title: '盘查警员',
            dataIndex: 'police_name',
        }, {
            title: '盘查时间',
            dataIndex: 'checktime',
            width: 138
        }, {
            title: '操作',
            key: 'action',
            width: 50,
            render: (text, record) => (
                <span>
                    <span onClick={(e) => this.oldDetailsShowModal(record)} style={{ cursor: 'pointer' }}>详情</span>
                </span>
            ),
        }];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                const ids = [];
                for (var i = 0; i < selectedRows.length; i++) {
                    var selectedRow = selectedRows[i];
                    ids.push(selectedRow.id);
                }
                this.setState({
                    selectedRowsId: ids
                });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        };
        let imgArray = [];
        if (paintRealInfo) {
            if (paintRealInfo.paint_photo_path) {
                let arrayImg = JSON.parse(paintRealInfo.paint_photo_path);
                var imgObjText = paintRealInfo.text;
                // let arrayImg = ["../../images/zanwu.png", "../../images/zanwu.png", "../../images/zanwu.png"];
                if (arrayImg && arrayImg.length > 0) {
                    for (let i = 0; i < arrayImg.length; i++) {
                        imgArray.push(
                            <img src={arrayImg[i]} key={i} alt="" style={{ width: '100px', height: '120px', margin: '5px', flexShrink: 0 }}
                                onClick={handleImgClick => this.handleImgClick(arrayImg, arrayImg[i], i)} />
                        );
                    }
                } else {
                    imgArray.push(
                        <div style={{ fontSize: 16, color: '#fff', width: '100%', textAlign: "center" }}>暂无写实照片</div>
                    );
                }
            }
        } else {
            imgArray.push(
                <div style={{ fontSize: 16, color: '#fff', width: '100%', textAlign: "center" }}>暂无写实照片</div>
            );
        }

        let tabs = store.getState().InterrogationDetailsUsers.uiData.tabs;
        let isSelectTab, content;
        //查找被选中的标签
        tabs.forEach(function (tab) {
            if (tab.isSelect === true) {
                isSelectTab = tab;
            }
        });
        let recordId = 'b829a02b16c84f0ebddbb6cb935516d2';
        let personId = '23038219801101001020180322105307964';

        switch (isSelectTab.tabName) {
            case constants.INTERROGATIONDETAILS_TAB_LJ_DATA:
                content = <SwordData recordId={recordId} personId={personId} />
                break
            default:
                break
        }
        // 分页
        const pagination = {
            onChange: (page) => {
                this.setState({
                    nowPage: page,
                });
                let { name, idcard, enddate, begindate, subtask_name, address_type, police_name } = this.state;
                let params = {
                    currentPage: page,
                    pd: {
                        idcard: idcard,
                        police_unit: subtask_name,
                        name: name,
                        police_name: police_name,
                        endtime: enddate,
                        starttime: begindate,
                    },
                    showCount: 10
                }
                store.dispatch(postOldInventoryListHushiData(params));
            },
            current: page.currentPage,
            total: page.totalResult,
            pageSize: page.showCount,
            showQuickJumper: true,

        }
        return (
            <div className="sliderWrap">
                <div className="sliderItemDiv">
                    {/*查询条件*/}
                    <div style={sliderdyHeader}>
                        <SearchArea
                            dispatch={this.props.dispatch}
                            lineId={this.state.lineId}
                            highRiskLine={this.state.highRiskLine}
                            lineIdChange={this.handleLineIdChange}
                            createClick={this.handChangeModalDialogueShow}
                            addShowModal={this.addShowModal}
                            handleDelete={this.handleDelete}
                            serchChange={this.serchChange}
                        />

                        <div className="clear"></div>
                    </div>
                </div>
                {/*表格*/}
                <div className="z_slderRightBody sys_overflow">
                    {isFetching === true ?
                        <div style={{ textAlign: "center", position: "absolute", left: "45%", top: "50%" }}>
                            <Spin size="large" />
                        </div> :
                        <div style={{ padding: "0 15px" }}>
                            <Table locale={{ emptyText: '暂无数据' }} columns={columns} dataSource={dataList} bordered pagination={pagination} />
                        </div>}
                    <div className="clear"></div>
                </div>
                {/*分页*/}
                {/* <Pag pageSize={10} nowPage={nowPage} totalRecord={10} pageChange={this.pageChange} /> */}
                {
                    this.state.oldVisibles ?
                        <Modal
                            width="80%"
                            style={{ top: '20px' }}
                            title="详情"
                            visible={this.state.oldVisibles}
                            onCancel={this.handleOldCancel}
                            footer={null}
                            key={this.state.modalKey}
                            maskClosable={false}
                        >
                            <div>
                                {/* <InterrogationDetailsItem interrogationDetailsUser={this.state.testData} />
                                <div>
                                    <div style={{ marginTop: "20px" }}>
                                        <Tabs tabs={tabs} handleTabClick={this.handleTabClick} />
                                        <div style={{ clear: "both" }}></div>
                                    </div>
                                    {content}
                                </div> */}
                                <Row>
                                    <Col span={4}>
                                        <img src={recordPerson ? recordPerson.zpurl ? recordPerson.zpurl : "/images/zanwu.png" : ''} style={{ width: '130px', height: '160px' }} />
                                    </Col>
                                    <Col span={19}>
                                        <Row style={{ marginBottom: '10px' }}>
                                            <Col span={10}>
                                                姓名：{recordPerson ? recordPerson.name : ''}
                                            </Col>
                                            <Col span={10}>
                                                身份证号：{recordPerson ? recordPerson.idcard : ''}
                                            </Col>
                                        </Row>
                                        <Row style={{ marginBottom: '10px' }}>
                                            <Col span={5}>
                                                性别：{recordPerson ? recordPerson.sex : ''}
                                            </Col>
                                            <Col span={5}>
                                                民族：{recordPerson ? recordPerson.nation : ''}
                                            </Col>
                                            <Col span={10}>
                                                出生日期：{recordPerson ? recordPerson.birth : ''}
                                            </Col>
                                        </Row>
                                        <Row style={{ marginBottom: '10px' }}>
                                            <Col span={24}>
                                                住址：{recordPerson ? recordPerson.address : ''}
                                            </Col>
                                        </Row>
                                        <Row>
                                            {redTag}{greenTag}
                                        </Row>

                                    </Col>
                                </Row>
                                <hr style={{ background: '#0c5f93', height: '1px', border: 'none', margin: '24px 0' }} />
                                <Row>
                                    <p style={{ fontSize: '16px' }}>特征盘查信息</p>
                                    <Col span={24}>
                                        特征描述：{scrutinyInfoList}
                                    </Col>
                                </Row>
                                <hr style={{ background: '#0c5f93', height: '1px', border: 'none', margin: '24px 0' }} />
                                <Row>
                                    <p style={{ fontSize: '16px' }}>基础信息</p>
                                    <Row style={{ marginBottom: '10px' }}>
                                        <Col span={8}>
                                            人员属性：{baseInfo ? baseInfo.attribute : ''}
                                        </Col>
                                        <Col span={8}>
                                            人员状态：{baseInfo ? baseInfo.state : ''}
                                        </Col>
                                        <Col span={8}>
                                            到达方式：{baseInfo ? baseInfo.to_type : ''}
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '10px' }}>
                                        <Col span={8}>
                                            住所类型：{baseInfo ? baseInfo.residence_type : ''}
                                        </Col>
                                        <Col span={8}>
                                            人员类型：{baseInfo ? baseInfo.type : ''}
                                        </Col>
                                    </Row>
                                </Row>
                                <hr style={{ background: '#0c5f93', height: '1px', border: 'none', margin: '24px 0' }} />
                                <Row>
                                    <p style={{ fontSize: '16px' }}>流入地信息</p>
                                    <Row style={{ marginBottom: '10px' }}>
                                        <Col span={8}>
                                            从何处来：{examinaTerrorismflow ? examinaTerrorismflow.fromCity : ''}
                                        </Col>
                                        <Col span={8}>
                                            到何处去：{examinaTerrorismflow ? examinaTerrorismflow.toCity : ''}
                                        </Col>
                                        <Col span={8}>
                                            联络员：{examinaTerrorismflow ? examinaTerrorismflow.liaisonname : ''}
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '10px' }}>
                                        <Col span={8}>
                                            出行方式：{examinaTerrorismflow ? examinaTerrorismflow.tripmode : ''}
                                        </Col>
                                        <Col span={8}>
                                            出行目的：{examinaTerrorismflow ? examinaTerrorismflow.trippurp : ''}
                                        </Col>
                                        <Col span={8}>
                                            出行日期：{examinaTerrorismflow ? examinaTerrorismflow.traveldate ? getMyDate(examinaTerrorismflow.traveldate / 1000) : '' : ''}
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '10px' }}>
                                        <Col span={8}>
                                            投奔人：{examinaTerrorismflow ? examinaTerrorismflow.visitorname ? examinaTerrorismflow.visitorname : '暂无' : '暂无'}，
                                            电话号码&nbsp;{examinaTerrorismflow ? examinaTerrorismflow.visitortel ? examinaTerrorismflow.visitortel : '暂无' : '暂无'}
                                        </Col>
                                        <Col span={16}>
                                            其他信息：座位号&nbsp;{examinaTerrorismflow ? examinaTerrorismflow.seatnumber ? examinaTerrorismflow.seatnumber : '暂无' : '暂无'}，
                                            车厢号&nbsp;{examinaTerrorismflow ? examinaTerrorismflow.carriagenumber ? examinaTerrorismflow.carriagenumber : '暂无' : '暂无'}
                                            ，司机电话号&nbsp;{examinaTerrorismflow ? examinaTerrorismflow.drivertel ? examinaTerrorismflow.drivertel : '暂无' : '暂无'}，
                                            车牌号&nbsp;{examinaTerrorismflow ? examinaTerrorismflow.trainnumber ? examinaTerrorismflow.trainnumber : '暂无' : '暂无'}
                                        </Col>
                                    </Row>
                                </Row>
                                <hr style={{ background: '#0c5f93', height: '1px', border: 'none', margin: '24px 0' }} />
                                <Row>
                                    <p style={{ fontSize: '16px' }}>手机信息</p>
                                    <MobileDataTable personId={this.state.personId} recordId={this.state.recordId} />
                                </Row>
                                <hr style={{ background: '#0c5f93', height: '1px', border: 'none', margin: '24px 0' }} />
                                <Row>
                                    <p style={{ fontSize: '16px' }}>联通信息</p>
                                    <OnlineTable personId={this.state.personId} recordId={this.state.recordId} />
                                </Row>
                                <hr style={{ background: '#0c5f93', height: '1px', border: 'none', margin: '24px 0' }} />
                                <Row>
                                    <p style={{ fontSize: '16px' }}>背景核查</p>
                                    <Row style={{ marginBottom: '10px' }}>
                                        <Col span={24}>
                                            核查方式：{domicileInfo ? domicileInfo.checked_type : ''}
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '10px' }}>
                                        <Col span={24}>
                                            核查类型：{domicileInfo ? domicileInfo.checked_mark : ''}
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '10px' }}>
                                        <Col span={12}>
                                            户籍警局：{domicileInfo ? domicileInfo.station : ''}
                                        </Col>
                                        <Col span={12}>
                                            户籍地联系人：{domicileInfo ? domicileInfo.station_person : ''}
                                        </Col>
                                    </Row>
                                </Row>
                                <hr style={{ background: '#0c5f93', height: '1px', border: 'none', margin: '24px 0' }} />
                                <Row>
                                    <p style={{ fontSize: '16px' }}>写实详情</p>
                                    <Row>
                                        <Col span={24} style={{ maxWidth: '99%', width: '1480px', position: 'relative', overflowX: 'auto', }} className='bannermodal'>
                                            <div style={{ display: 'flex', flexWrap: 'nowrap', }}>
                                                {imgArray}
                                            </div>
                                            <Modal
                                                key={this.state.ModalKey}
                                                visible={this.state.visibles}
                                                onCancel={this.handleCancels}
                                                footer={false}
                                                wrapClassName='zoomImg'
                                                style={{ height: '85%' }}
                                                maskClosable={false}
                                            >
                                                <BannerAnimImg arrayImg={this.state.arrayImg} currentImg={this.state.currentImg} index={this.state.index} />
                                            </Modal>
                                        </Col>
                                        <Col span={24}>
                                            <Row style={{ marginTop: '8px' }}>
                                                <Col span={2} style={{ textAlign: 'right' }}>
                                                    <p style={{ marginBottom: '14px' }}>详情：</p>
                                                </Col>
                                                <Col span={22}>
                                                    <TextArea rows={2} disabled style={{ resize: 'none' }} value={imgObjText} />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Row>
                                {/* <hr style={{ background: '#0c5f93', height: '1px', border: 'none', margin: '24px 0' }} />
                                <Row>
                                    <p style={{ fontSize: '16px' }}>租房信息</p>
                                    <Row>
                                        <Col span={24}>
                                            核查类型：留大胡子
                                        </Col>
                                    </Row>
                                </Row> */}
                            </div>
                        </Modal> : ''
                }

            </div>
        )
    }
}

//搜索区域内容组件
const SearchArea = React.createClass({
    getInitialState: function () {
        return {
            name: '',
            idcard: '',
            enddate: '',
            begindate: '',
            subtask_name: '',
            police_name: ''
        };
    },
    handleClick: function () { //点击查询
        let page = 1;
        let { name, idcard, enddate, begindate, subtask_name, police_name } = this.state;
        let params = {
            currentPage: 1,
            pd: {
                idcard: idcard,
                police_unit: subtask_name,
                name: name,
                police_name: police_name,
                endtime: enddate,
                starttime: begindate,
            },
            showCount: 10
        }
        store.dispatch(postOldInventoryListHushiData(params));
        this.props.serchChange(name, idcard, enddate, begindate, subtask_name, police_name, page);
    },
    init: function () {
        let page = 1;
        this.setState({
            name: '',
            idcard: '',
            enddate: '',
            begindate: '',
            subtask_name: '',
            police_name: '',
        });
        let params = {
            currentPage: 1,
            pd: {
                idcard: '',
                police_unit: '',
                name: '',
                police_name: '',
                endtime: '',
                starttime: '',
            },
            showCount: 10
        }
        store.dispatch(postOldInventoryListHushiData(params));
        this.props.serchChange('', '', '', '', '', '', page);
    },
    // componentWillReceiveProps: function (nextProps) {
    //     if (this.props.type !== nextProps.type) {
    //         this.init();
    //     }
    // },
    handleSfzhClick: function (e) {
        this.setState({
            idcard: e.target.value,
        });
    },
    handleNameClick: function (e) {
        this.setState({
            name: e.target.value,
        });
    },
    handlePoliceNameClick: function (e) {
        this.setState({
            police_name: e.target.value,
        });
    },
    handleaddressTypeClick: function (value) {
        this.setState({
            address_type: value
        });
    },
    handleSubtaskNameClick: function (e) {
        this.setState({
            subtask_name: e.target.value
        });
    },
    handleBeginDeteClick: function (date, dateString) {
        this.setState({
            begindate: dateString,
        });

    },
    handleEndDeteClick: function (date, dateString) {
        this.setState({
            enddate: dateString,
        });
    },
    handleSelectChange: function (value) {
        this.setState({
            unitSelected: value
        });
    },
    ontagsChange: function (value) {
        this.setState({
            tagsSelect: value
        });
    },

    onOkBegin: function (e) {
        let beginDate = this.state.beginDate;
        if (e === undefined) {
            this.setState({
                beginDate: moment()
            });
        }
    },
    onOkEnd: function (e) {
        let endDate = this.state.endDate;
        if (e === undefined) {
            this.setState({
                endDate: moment()
            });
        }
    },
    render() {
        //警员单位列表
        let policeUnitsList = store.getState().root.data.policeUnitsList;
        let policeUnitsOptions = [];
        for (var i = 0; i < policeUnitsList.length; i++) {
            var policeUnit = policeUnitsList[i];
            let key = "policeUnitsList" + policeUnit.code + "_" + i;
            policeUnitsOptions.push(
                <Option key={key} value={policeUnit.code}>{policeUnit.text}</Option>
            )
        }
        //人员标签列表
        let personTagsList = store.getState().root.data.personTagsList;
        let personTagsOptions = [];
        for (var i = 0; i < personTagsList.length; i++) {
            var personTag = personTagsList[i];
            personTagsOptions.push(
                <Option key={personTag.code}>{personTag.text}</Option>
            )
        }

        let idcard = this.state.idcard;
        let name = this.state.name;
        let police_name = this.state.police_name;
        let begindate = this.state.begindate;
        let enddate = this.state.enddate;
        let subtask_name = this.state.subtask_name;
        let address_type = this.state.address_type;

        let beginDateValue = '';
        if (begindate === '') { } else {
            beginDateValue = moment(begindate, dateFormat);
        }
        let endDateValue = '';
        if (enddate === '') { } else {
            endDateValue = moment(enddate, dateFormat);
        }

        if (beginDateValue != "" && endDateValue != "" && beginDateValue > endDateValue) {
            message.error('提示：开始时间不能大于结束时间！');
            return;
        }
        return (
            <div>
                <div className="marLeft40 z_searchDiv">
                    <div style={{ float: 'left', marginTop: '10px' }}>
                        <label htmlFor="" className="font14">人员姓名：</label>
                        <Input style={{ width: '180px', marginRight: "10px" }} type="text" id='name' placeholder='请输入人员姓名' value={name} onChange={this.handleNameClick} />
                    </div>
                    <div style={{ float: 'left', marginTop: '10px' }}>
                        <label htmlFor="" className="font14">身份证号：</label>
                        <Input style={{ width: '230px', marginRight: "10px" }} type="text" id='sfzh' placeholder='请输入身份证号' value={idcard} onChange={this.handleSfzhClick} />
                    </div>
                    <div style={{ float: 'left', marginTop: '10px' }}>
                        <label htmlFor="" className="font14">所属机构：</label>
                        <Input value={subtask_name} style={{ width: '230px', marginRight: "10px" }} type="text" id='subtask_name' placeholder='请输入所属机构名称' onChange={this.handleSubtaskNameClick} />
                    </div>
                    <div style={{ float: 'left', marginTop: '10px' }}>
                        <label htmlFor="" className="font14">盘查警员：</label>
                        <Input style={{ width: '230px', marginRight: "10px" }} type="text" id='police_name' placeholder='请输入盘查警员姓名' value={police_name} onChange={this.handlePoliceNameClick} />
                    </div>
                    {/* <label htmlFor="" className="font14">居住类型：</label>
                    <Select style={{ width: "10%", margin: "0 10px 0 0" }} value={address_type} onChange={this.handleaddressTypeClick} notFoundContent='暂无'>
                        <Option value=''>全部</Option>
                        <Option value={0}>常住</Option>
                        <Option value={1}>暂住</Option>
                        <Option value={2}>流动</Option>
                    </Select> */}
                    <div style={{ clear: 'both' }}></div>
                </div>
                <div style={{ marginLeft: "2%", marginTop: "10px" }}>
                    <label htmlFor="" className="font14">起止时间：</label>
                    <DatePicker placeholder="请选择日期" format={dateFormat} allowClear={false} style={{ marginRight: "10px" }} value={beginDateValue} defaultValue="" onChange={this.handleBeginDeteClick} />
                    <span className="font14" style={{ marginRight: "10px" }}>至</span>
                    <DatePicker placeholder="请选择日期" format={dateFormat} allowClear={false} style={{ marginRight: "10px" }} value={endDateValue} defaultValue="" onChange={this.handleEndDeteClick} />
                    <ShallowBlueBtn width="82" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                    <ShallowBlueBtn width="82" text="重置" margin="0 10px 0 0" onClick={this.init} />
                </div>
            </div>

        );
    }
})
const paginationSmall = {
    size: 'small',
    pageSize: constants.recordPageSize,
    showTotal(total) {
        return `合计 ${total} 条记录`;
    },
    itemRender(current, type, originalElement) {
        if (type === 'prev') {
            return <a>上一页</a>;
        } else if (type === 'next') {
            return <a>下一页</a>;
        }
        return originalElement;
    }
};
// 手机信息
class MobileDataTable extends Component {
    state = {
        visible: false,
        record: null,
        data: [],
        pagination: paginationSmall,
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = {
            ...this.state.pagination
        };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({ //点击下一页的时候调取的参数
            currentPage: pagination.current,
            entityOrField: true,
            pd: {
                record_id: this.props.recordId,
                person_id: this.props.personId
            },
            showCount: pagination.pageSize
        });
    }
    //params第一次掉的参数，是第一页，它也会判断是否在掉fetch的时候传参  没传就执行默认的这个第一页
    fetch = (params = {
        "currentPage": 1,
        "entityOrField": true,
        pd: {
            record_id: this.props.recordId,
            person_id: this.props.personId
        },
        "showCount": constants.recordPageSize
    }) => {
        post(api + '/data/getOldExaminePhoneBasicData', params).then((data) => {
            const pagination = {
                ...this.state.pagination
            };
            pagination.total = data.result.page.totalResult;
            this.setState({
                loading: false,
                data: data.result.list,
                pagination,
            });
        }).catch((e) => { });
    }
    componentDidMount() {
        this.fetch();

    }
    showModal = (record) => {
        this.setState({
            visible: true,
            record: record
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
    handleOk = () => {
        this.setState({
            visible: false
        });
    }
    render() {
        //to={'/PhoneDetails/'+this.state.record.phoneId}
        const columns = [{
            title: '手机号',
            dataIndex: 'msisdn',
            width: 150
        }, {
            title: 'IMEI',
            dataIndex: 'imei',
            width: 150
        }, {
            title: '型号',
            dataIndex: 'product',
            width: 80
        }, {
            title: '系统',
            dataIndex: 'os',
            // render: (text, record) => (
            //     <span title={text} style={{ cursor: "pointer" }}>
            //         {
            //             text.length <= 75 ?
            //                 text.slice(0, 74) : text.slice(0, 74) + "..."

            //         }
            //     </span>
            // )
        }, {
            title: '操作',
            key: 'action',
            width: 35,
            render: (text, record) => (
                <span onClick={() => this.showModal(record)} style={{ cursor: 'pointer' }}>
                    详情
                </span>
            ),

        }];
        return (
            <div>
                <Table columns={columns}
                    rowKey={record => record.registered}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    bordered
                    onChange={this.handleTableChange}
                    locale={{ emptyText: '暂无数据' }}
                />
                <Modal
                    visible={this.state.visible}
                    title="手机信息详情"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    closable={true}
                    // style={{ width:'95%' }}
                    width="80%"
                    footer={null}
                    style={{ top: '20px' }}
                    maskClosable={false}
                >
                    {/* <div style={{ marginBottom: "10px" }}>
                        <label style={mStyle} htmlFor="">手机号：</label>
                        <Input style={{ width: '60%' }} value={this.state.record !== null ? this.state.record.phoneNumber : ''} readOnly="readOnly" />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={mStyle} htmlFor="">系统：</label>
                        <TextArea width="60%" height='120px' value={this.state.record !== null ? this.state.record.os : ''} readOnly="readOnly" />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={mStyle} htmlFor="">型号：</label>
                        <Input style={{ width: '60%' }} value={this.state.record !== null ? this.state.record.product : ''} readOnly="readOnly" />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={mStyle} htmlFor="">IMEI：</label>
                        <Input style={{ width: '60%' }} value={this.state.record !== null ? this.state.record.imei : ''} readOnly="readOnly" />
                    </div> */}
                    <div>
                        <div>
                            <p style={{ fontSize: '16px' }}>通话记录信息</p>
                            <CallLogTable phoneId={this.state.record ? this.state.record.phone_id : ''} personId={this.props.personId} recordId={this.props.recordId} />
                        </div>
                        <div>
                            <p style={{ fontSize: '16px' }}>短信记录信息</p>
                            <MessageTable phoneId={this.state.record ? this.state.record.phone_id : ''} personId={this.props.personId} recordId={this.props.recordId} />
                        </div>
                        <div>
                            <p style={{ fontSize: '16px' }}>安装软件记录信息</p>
                            <InstallationSoftwareTable phoneId={this.state.record ? this.state.record.phone_id : ''} personId={this.props.personId} recordId={this.props.recordId} />
                        </div>
                    </div>

                </Modal>
            </div>
        );
    }
};
//盘查数据的通话记录数据
class CallLogTable extends Component {
    state = {
        visible: false,
        record: null,
        data: [],
        pagination: paginationSmall,
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => { //下一页方法
        const pager = {
            ...this.state.pagination
        };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({ //点击下一页的时候调取的参数
            currentPage: pagination.current,
            entityOrField: true,
            pd: {
                record_id: this.props.recordId,
                person_id: this.props.personId,
                phoneId: this.props.phoneId
            },
            showCount: pagination.pageSize
        });
    }
    fetch = (params = {
        "currentPage": 1,
        "entityOrField": true,
        pd: {
            record_id: this.props.recordId,
            person_id: this.props.personId,
            phoneId: this.props.phoneId
        },
        "showCount": constants.recordPageSize
    }) => {
        post(api + '/data/getPhoneCallInfolistPage', params).then((data) => {
            const pagination = {
                ...this.state.pagination
            };
            pagination.total = data.result.page.totalResult;
            this.setState({
                loading: false,
                data: data.result.data.cannInfo,
                pagination,
            });
        }).catch((e) => { });
    }
    componentDidMount() {
        this.fetch();
    }
    showModal = (record) => {
        this.setState({
            visible: true,
            record: record
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
    handleOk = () => {
        this.setState({
            visible: false
        });
    }
    render() {
        const columns = [{
            title: '主叫号码',
            dataIndex: 'callingnumber',
        }, {
            title: '被叫号码',
            dataIndex: 'calldenumber',
        }, {
            title: '呼叫时间',
            dataIndex: 'time',
        }, {
            title: '是主/被叫',
            dataIndex: 'type',
        }, {
            title: '通话时长(秒)',
            dataIndex: 'voicelen',
        }, {
            title: '操作',
            key: 'action',
            // width: 30,
            render: (text, record) => (
                <span>
                    <span onClick={(e) => this.showModal(record)} style={{ cursor: 'pointer' }}>详情</span>
                </span>
            ),

        }];
        let timevalue = this.state.record ? moment(this.state.record.time, 'YYYY-MM-DD HH:mm:ss') : '';
        return (
            <div>
                <Table columns={columns}
                    rowKey={record => record.registered}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    bordered
                    onChange={this.handleTableChange}
                    locale={{ emptyText: '暂无数据' }}
                />
                <Modal
                    visible={this.state.visible}
                    title="通话记录信息详情"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    closable={true}
                    style={{ maxHeight: 650, overflow: "auto" }}
                    footer={null}
                    maskClosable={false}
                >
                    <div style={{ marginBottom: "10px" }}>
                        <label style={mStyle} htmlFor="">主叫号码：</label>
                        <Input style={{ width: '60%' }} value={this.state.record ? this.state.record.callingnumber : ''} disabled />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={mStyle} htmlFor="">被叫号码：</label>
                        <Input style={{ width: '60%' }} value={this.state.record ? this.state.record.calldenumber : ''} disabled />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={mStyle} htmlFor="">呼叫时间：</label>
                        <DatePicker showTime placeholder="" value={timevalue} format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '60%' }} disabled />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={mStyle} htmlFor="">是主/被叫：</label>
                        <Input style={{ width: '60%' }} value={this.state.record ? this.state.record.type : ''} disabled />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={mStyle} htmlFor="">通话时长：</label>
                        <Input style={{ width: '60%' }} value={this.state.record ? this.state.record.voicelen + ' 秒' : ''} disabled />
                    </div>

                </Modal>
            </div>
        );
    }
};

//短信记录
class MessageTable extends Component {
    state = {
        visible: false,
        record: null,
        data: [],
        pagination: paginationSmall,
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = {
            ...this.state.pagination
        };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({ //点击下一页的时候调取的参数
            currentPage: pagination.current,
            entityOrField: true,
            pd: {
                record_id: this.props.recordId,
                person_id: this.props.personId,
                phoneId: this.props.phoneId
            },
            showCount: pagination.pageSize
        });
    }
    fetch = (params = {
        "currentPage": 1,
        "entityOrField": true,
        pd: {
            record_id: this.props.recordId,
            person_id: this.props.personId,
            phoneId: this.props.phoneId
        },
        "showCount": constants.recordPageSize
    }) => {
        post(api + '/data/getPhoneSmsRecordlistPage', params).then((data) => {
            const pagination = {
                ...this.state.pagination
            };
            pagination.total = data.result.page.totalResult;
            this.setState({
                loading: false,
                data: data.result.data.SmsRecordInfo,
                pagination,
            });
        }).catch((e) => { });
    }
    componentDidMount() {
        this.fetch();
    }
    showModal = (record) => {
        this.setState({
            visible: true,
            record: record
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
    handleOk = () => {
        this.setState({
            visible: false
        });
    }
    render() {
        const columns = [{
            title: '来往号码',
            dataIndex: 'callno',
        }, {
            title: '短信内容',
            dataIndex: 'content',
            render: (text, record) => (
                <span title={text} style={{ cursor: "pointer" }}>
                    {
                        text.length <= 30 ?
                            text.slice(0, 29) : text.slice(0, 29) + "..."

                    }
                </span>
            )
        }, {
            title: '发送时间',
            dataIndex: 'time',
            render: (text, record) => (
                <span>
                    <span>{record ? getMyDate(record.time / 1000) : ''}</span>
                </span>
            )
        }, {
            title: '操作',
            key: 'action',
            // width: 30,
            render: (text, record) => (
                <span>
                    <span onClick={(e) => this.showModal(record)} style={{ cursor: 'pointer' }}>详情</span>
                </span>
            ),

        }];
        let timevalue = this.state.record ? moment(getMyDate(this.state.record.time / 1000), 'YYYY-MM-DD HH:mm:ss') : '';
        return (
            <div>
                <Table columns={columns}
                    rowKey={record => record.registered}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    bordered
                    onChange={this.handleTableChange}
                    locale={{ emptyText: '暂无数据' }}
                />
                <Modal
                    visible={this.state.visible}
                    title="短信记录信息详情"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    closable={true}
                    style={{ maxHeight: 650, overflow: "auto" }}
                    footer={null}
                    maskClosable={false}
                >
                    <div style={{ marginBottom: "10px" }}>
                        <label style={mStyle} htmlFor="">来往号码：</label>
                        <Input style={{ width: '60%' }} value={this.state.record ? this.state.record.callno : ''} disabled />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={mStyle} htmlFor="">短信内容：</label>
                        <TextArea style={{ width: '60%', height: '120px', resize: 'none' }} autosize={true} value={this.state.record ? this.state.record.content : ''} disabled />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={mStyle} htmlFor="">发送时间：</label>
                        <DatePicker showTime placeholder="" value={timevalue} format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '60%' }} disabled />
                    </div>

                </Modal>
            </div>
        );
    }
};

//盘查数据的安装软件记
class InstallationSoftwareTable extends Component {
    state = {
        visible: false,
        record: null,
        data: [],
        pagination: paginationSmall,
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = {
            ...this.state.pagination
        };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({ //点击下一页的时候调取的参数
            currentPage: pagination.current,
            entityOrField: true,
            pd: {
                record_id: this.props.recordId,
                person_id: this.props.personId,
                phoneId: this.props.phoneId
            },
            showCount: pagination.pageSize
        });
    }
    fetch = (params = {
        "currentPage": 1,
        "entityOrField": true,
        pd: {
            record_id: this.props.recordId,
            person_id: this.props.personId,
            phoneId: this.props.phoneId
        },
        "showCount": constants.recordPageSize
    }) => {
        post(api + '/data/getPhoneAppDatalistPage', params).then((data) => {
            const pagination = {
                ...this.state.pagination
            };
            pagination.total = data.result.page.totalResult;
            this.setState({
                loading: false,
                data: data.result.data.appInfo,
                pagination,
            });
        }).catch((e) => { });
    }
    componentDidMount() {
        this.fetch();
    }
    showModal = (record) => {
        this.setState({
            visible: true,
            record: record
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
    handleOk = () => {
        this.setState({
            visible: false
        });
    }
    render() {
        const columns = [{
            title: '软件名称',
            dataIndex: 'name',
        }, {
            title: '安装包名称',
            dataIndex: 'pkg',
        }, {
            title: '版本号',
            dataIndex: 'version',
        }, {
            title: '操作',
            key: 'action',
            // width: 30,
            render: (text, record) => (
                <span>
                    <span onClick={(e) => this.showModal(record)} style={{ cursor: 'pointer' }}>详情</span>
                </span>
            ),

        }];
        return (
            <div>
                <Table columns={columns}
                    rowKey={record => record.registered}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    bordered
                    onChange={this.handleTableChange}
                    locale={{ emptyText: '暂无数据' }}
                />
                <Modal
                    visible={this.state.visible}
                    title="安装软件记录信息详情"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    closable={true}
                    style={{ maxHeight: 650, overflow: "auto" }}
                    footer={null}
                    maskClosable={false}
                >
                    <div style={{ marginBottom: "10px" }}>
                        <label style={mStyle} htmlFor="">软件名称：</label>
                        <Input style={{ width: '60%' }} value={this.state.record ? this.state.record.name : ''} disabled />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={mStyle} htmlFor="">安装包名称：</label>
                        <TextArea style={{ width: '60%', height: '120px', resize: 'none' }} autosize={true} value={this.state.record ? this.state.record.pkg : ''} disabled />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label style={mStyle} htmlFor="">版本号：</label>
                        <Input style={{ width: '60%' }} value={this.state.record ? this.state.record.version : ''} disabled />
                    </div>

                </Modal>
            </div>
        );
    }
};
// 网上联通信息
class OnlineTable extends Component {
    state = {
        visible: false,
        record: null,
        data: [],
        pagination: paginationSmall,
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => { //下一页方法
        const pager = {
            ...this.state.pagination
        };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({ //点击下一页的时候调取的参数
            currentPage: pagination.current,
            entityOrField: true,
            pd: {
                record_id: this.props.recordId,
                person_id: this.props.personId,
            },
            showCount: pagination.pageSize
        });
    }
    fetch = (params = {
        "currentPage": 1,
        "entityOrField": true,
        pd: {
            record_id: this.props.recordId,
            person_id: this.props.personId,
        },
        "showCount": constants.recordPageSize
    }) => {
        post(api + '/data/getOldExamineContactManage', params).then((data) => {
            const pagination = {
                ...this.state.pagination
            };
            pagination.total = data.result.page.totalResult;
            this.setState({
                loading: false,
                data: data.result.list,
                pagination,
            });
        }).catch((e) => { });
    }
    componentDidMount() {
        this.fetch();
    }
    showModal = (record) => {
        this.setState({
            visible: true,
            record: record
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
    handleOk = () => {
        this.setState({
            visible: false
        });
    }
    render() {
        const columns = [{
            title: '类别',
            dataIndex: 'text',
        }, {
            title: '号码',
            dataIndex: 'number',
        }, {
            title: '操作',
            key: 'action',
            // width: 30,
            render: (text, record) => (
                <span>
                    <span onClick={(e) => this.showModal(record)} style={{ cursor: 'pointer' }}>详情</span>
                </span>
            ),

        }];
        return (
            <div>
                <Table columns={columns}
                    rowKey={record => record.registered}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    bordered
                    onChange={this.handleTableChange}
                    locale={{ emptyText: '暂无数据' }}
                />
                <Modal
                    visible={this.state.visible}
                    title="联通信息详情"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    closable={true}
                    style={{ maxHeight: 650, overflow: "auto" }}
                    footer={null}
                    maskClosable={false}
                >
                    <div style={{ marginBottom: "10px" }}>
                        <label style={mStyle} htmlFor="">类别：</label>
                        <Input style={{ width: '60%' }} value={this.state.record ? this.state.record.text : ''} readOnly="readOnly" />
                    </div>
                    {/* <div style={{ marginBottom: "10px" }}>
                        <label style={mStyle} htmlFor="">类别编码：</label>
                        <Input style={{ width: '60%' }} value={this.state.record ? this.state.record.code : ''} readOnly="readOnly" />
                    </div> */}
                    <div style={{ marginBottom: "10px" }}>
                        <label style={mStyle} htmlFor="">号码：</label>
                        <Input style={{ width: '60%' }} value={this.state.record ? this.state.record.number : ''} readOnly="readOnly" />
                    </div>
                    {/* <div style={{ marginBottom: "10px" }}>
                        <label style={mStyle} htmlFor="">照片：</label>
                        <img src={this.state.record ? this.state.record.photo : '/images/zanwu.png'} style={{ width: '80px' }} />
                        <div style={{ clear: 'both' }}></div>
                    </div> */}
                </Modal>
            </div>
        );
    }
};

OldWithDay = Form.create()(OldWithDay);
export default connect(mainReducer)(OldWithDay);