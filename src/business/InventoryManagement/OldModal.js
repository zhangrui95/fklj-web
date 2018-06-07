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
    postOldInventoryListHushiData, postOldInventoryListHushiDetailsData, postOldInventoryLuokuData
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

export class OldModal extends Component {
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
            visibles: false,//呼市反恐详情展示
            arrayImg: [],
            currentImg: '',
            index: 0,
            ModalKey: 0,
            oldVisibles: false,
            oldpersonInfo: '',
            personId: '',
            recordId: '',
        };
        // this.pageChange = this.pageChange.bind(this);
    }
    componentDidMount() {

    }
    // editShowModal = (record) => {
    //     this.setState({
    //         visible: true,
    //         personInfo: record,
    //         modalType: 'edit'
    //     });
    //     let creds = {
    //         idcard: record.idcard
    //     }
    //     store.dispatch(postOldInventoryListHushiDetailsData(creds));
    // }
    // addShowModal = (record) => {
    //     this.setState({
    //         visible: true,
    //         modalType: 'add',
    //     });
    // }


    render() {
        const { getFieldDecorator } = this.props.form;
        let luokeData = this.props.luokeData;
        console.log('luokeData ***&&&', luokeData);
        let baseInfo = luokeData.baseInfo ? luokeData.baseInfo : {};//人员基本信息
        let recordPerson = luokeData.recordPerson ? luokeData.recordPerson : {};//人员信息及标签
        let domicileInfo = luokeData.domicileInfo ? luokeData.domicileInfo : {};//背景核查
        let paintRealInfo = luokeData.paintRealInfo ? luokeData.paintRealInfo : {};//写实信息
        let examinaTerrorismflow = luokeData.examinaTerrorismflow ? luokeData.examinaTerrorismflow : {};//流入地信息
        let scrutinyInfo = luokeData.scrutinyInfo ? luokeData.scrutinyInfo : [];//特征核查
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
            } else {
                imgArray.push(
                    <div style={{ fontSize: 16, color: '#fff', width: '100%', textAlign: "center" }}>暂无写实照片</div>
                );
            }
        } else {
            imgArray.push(
                <div style={{ fontSize: 16, color: '#fff', width: '100%', textAlign: "center" }}>暂无写实照片</div>
            );
        }


        return (

            <Modal
                width="80%"
                style={{ top: '20px' }}
                title="详情"
                visible={this.props.oldVisibles}
                onCancel={this.props.handleOldCancel}
                footer={null}
                key={this.props.modalKey}
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
            </Modal>


        )
    }
}


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

OldModal = Form.create()(OldModal);
export default connect(mainReducer)(OldModal);