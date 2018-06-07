// 盘查管理-周期任务-按天
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
    postInventoryListHushiData, postInventoryListHushiDetailsData, postOldInventoryLuokuData
} from "../../actions/InventoryManagement";
import { OldModal } from "./OldModal.js";
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

export class NewModal extends Component {
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
            address_type: '',
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
            testData: { "police_code": "080003", "police_idcard": "230382198011010010", "address": "", "police_unitcode": "410000000000", "nation": "", "checktime": "2018-03-22 10:53:19", "police_area": "", "sex": "男", "birth": "1980-01-01", "tagscode": "", "tags": "", "recordId": "23038219801101001020180322105307964", "police_unit": "河南省公安厅", "zpurl": "", "idcard": "350125198001010075", "name": "", "check_exception": 0, "imei": "", "personId": "b829a02b16c84f0ebddbb6cb935516d2", "collectNumber": 0, "police_name": "测试用户一", "cid": "HYX315000136" },
        };
        // this.pageChange = this.pageChange.bind(this);
    }
    componentDidMount() {

    }


    render() {
        const { getFieldDecorator } = this.props.form;
        // let nowPage = this.state.nowPage;
        // let isFetching = store.getState().InventoryManagement.data.invenListHushi.isFetching;
        // let data = store.getState().InventoryManagement.data.invenListHushi.result.list;
        // let obj = store.getState().InventoryManagement.data.invenListHushiDetails.result;
        let obj = this.props.newobj;
        // 标签
        let greenTag = [];
        let redTag = [];
        if (obj && obj.tags) {
            if (obj.tags.length > 0) {
                let tagsArr = obj.tags.split(',');

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
        }

        let imgArray = [];
        if (obj) {
            if (obj.paint) {
                let arrayImg = JSON.parse(obj.paint.paint_photo_path);
                var imgObjText = obj.paint.text;
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
                width={900}
                style={{ top: '20px' }}
                title="详情"
                visible={this.props.visible}
                onCancel={this.props.handleCancel}
                footer={null}
                key={this.props.modalKey}
                maskClosable={false}
            >
                <Form onSubmit={this.saveModel}>
                    <Row>
                        <Col span={24} style={{ fontSize: '16px', color: "#fff" }}>人员信息</Col>
                        <Col span={12}>
                            <Row style={{ padding: '32px 32px 16px 32px' }}>
                                <Col span={4} style={{ color: "#fff" }}>照片：</Col>
                                <Col span={20}><img src={obj ? obj.zpurl ? obj.zpurl : "/images/zanwu.png" : "/images/zanwu.png"} style={{ width: '130px', height: '160px' }} /></Col>
                            </Row>
                            <Row style={{ padding: '0 32px 16px 32px', maxHeight: '100px', overflow: 'auto' }}>
                                {redTag}{greenTag}
                            </Row>
                            <FormItem
                                {...formItemLayout}
                                label="身份证号"
                                style={{ marginBottom: '5px' }}
                            >
                                {getFieldDecorator('idcard', {
                                    initialValue: obj ? obj.idcard ? obj.idcard : '' : '',
                                })(
                                    <Input disabled />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="姓名"
                                style={{ marginBottom: '5px' }}
                            >
                                {getFieldDecorator('name', {
                                    initialValue: obj ? obj.name ? obj.name : '' : '',
                                })(
                                    <Input disabled />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="性别"
                                style={{ marginBottom: '5px' }}
                            >
                                {getFieldDecorator('sex', {
                                    initialValue: obj ? obj.sex ? obj.sex : '' : '',
                                })(
                                    <Input disabled />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="年龄"
                                style={{ marginBottom: '5px' }}
                            >
                                {getFieldDecorator('age', {
                                    initialValue: obj ? obj.age ? obj.age : '' : '',
                                })(
                                    <Input disabled />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="民族"
                                style={{ marginBottom: '5px' }}
                            >
                                {getFieldDecorator('nation', {
                                    initialValue: obj ? obj.nation ? obj.nation : '' : '',
                                })(
                                    <Input disabled />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="户籍地址"
                                style={{ marginBottom: '5px' }}
                            >
                                {getFieldDecorator('address', {
                                    initialValue: obj ? obj.address ? obj.address : '' : '',
                                })(
                                    <Input disabled title={obj ? obj.address ? obj.address : '' : ''} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="居住类型"
                                style={{ marginBottom: '5px' }}
                            >
                                {getFieldDecorator('address_type', {
                                    initialValue: obj ? obj.address_type != undefined ? obj.address_type : '' : '',
                                })(
                                    <Select disabled>
                                        <Option value={0}>常住</Option>
                                        <Option value={1}>暂住</Option>
                                        <Option value={2}>流动</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="现居住地址"
                                style={{ marginBottom: '5px' }}
                            >
                                {getFieldDecorator('now_address', {
                                    initialValue: obj ? obj.now_address ? obj.now_address : '' : '',
                                })(
                                    <Input disabled title={obj ? obj.now_address ? obj.now_address : '' : ''} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="工作地址"
                                style={{ marginBottom: '5px' }}
                            >
                                {getFieldDecorator('work_address', {
                                    initialValue: obj ? obj.work_address ? obj.work_address : '' : '',
                                })(
                                    <Input disabled title={obj ? obj.work_address ? obj.work_address : '' : ''} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="联系电话"
                                style={{ marginBottom: '5px' }}
                            >
                                {getFieldDecorator('phone', {
                                    initialValue: obj ? obj.phone ? obj.phone : '' : '',
                                })(
                                    <Input disabled title={obj ? obj.phone ? obj.phone : '' : ''} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="隶属任务"
                                style={{ marginBottom: '5px' }}
                            >
                                {getFieldDecorator('taskname', {
                                    initialValue: obj ? obj.taskname ? obj.taskname : '' : '',
                                })(
                                    <Input disabled title={obj ? obj.taskname ? obj.taskname : '' : ''} />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="盘查警员"
                                style={{ marginBottom: '5px' }}
                            >
                                {getFieldDecorator('police_name', {
                                    initialValue: obj ? obj.police_name ? obj.police_name : '' : '',
                                })(
                                    <Input disabled />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="任务周期"
                                style={{ marginBottom: '5px' }}
                            >
                                {getFieldDecorator('cycle', {
                                    initialValue: obj ? obj.cycle ? obj.cycle : '' : '',
                                })(
                                    <Input disabled />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="人员来源"
                                style={{ marginBottom: '5px' }}
                            >
                                {getFieldDecorator('source', {
                                    initialValue: obj ? obj.source ? obj.source : '' : '',
                                })(
                                    <Input disabled />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="人员属性"
                                style={{ marginBottom: '5px' }}
                            >
                                {getFieldDecorator('attribute', {
                                    initialValue: obj ? obj.attribute ? obj.attribute : '' : '',
                                })(
                                    <Input disabled />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="是否有车"
                                style={{ marginBottom: '5px' }}
                            >
                                {getFieldDecorator('carstatus', {
                                    initialValue: obj ? obj.carstatus ? obj.carstatus === true && obj.carnumber ? `有车  ${obj.carnumber}` : '暂无' : '' : '',
                                })(
                                    <Input disabled />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="盘查时间"
                                style={{ marginBottom: '5px' }}
                            >
                                {getFieldDecorator('checktime', {
                                    initialValue: obj ? obj.checktime ? moment(getMyDate(obj.checktime / 1000), 'YYYY-MM-DD HH:mm:ss') : '' : '',
                                })(
                                    <DatePicker showTime placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '247.91px' }} disabled />
                                )}
                            </FormItem>

                        </Col>
                    </Row>
                    <Divider style={{ background: 'rgb(29, 40, 81)', height: '2px', margin: '18px 0' }} />
                    <Row>
                        <Col span={24} style={{ fontSize: '16px', color: "#fff" }}>写实详情</Col>
                        <Row style={{ padding: '32px 32px 0 32px' }}>
                            <Col span={24} style={{ maxWidth: '99%', width: '856px', position: 'relative', overflowX: 'auto', }} className='bannermodal'>
                                <div style={{ display: 'flex', flexWrap: 'nowrap', }}>
                                    {imgArray}
                                </div>
                                <Modal
                                    key={this.state.ModalKey}
                                    visible={this.state.visibles}
                                    onCancel={this.handleCancels}
                                    footer={false}
                                    wrapClassName='zoomImg'
                                    maskClosable={false}
                                >
                                    <BannerAnimImg arrayImg={this.state.arrayImg} currentImg={this.state.currentImg} index={this.state.index} />
                                </Modal>
                            </Col>
                            <Col span={24}>
                                <FormItem
                                    {...formText}
                                    label="详情"
                                >
                                    {getFieldDecorator('paintText', {
                                        initialValue: obj ? obj.paint ? obj.paint.text : '' : ''
                                    })(
                                        <TextArea rows={2} disabled style={{ resize: 'none' }} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Row>
                </Form>
            </Modal>
        )
    }
}

NewModal = Form.create()(NewModal);
export default connect(mainReducer)(NewModal);