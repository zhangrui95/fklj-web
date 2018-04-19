/**
 * 研判报告轨迹信息
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mainReducer } from "../../reducers/reducers";
import {
    changeShade
} from "../../actions/actions";
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
    Radio
} from 'antd';
import { store } from '../../index.js';
import * as constants from "../../utils/Constants";
import { changeMenu } from "../../actions/actions";
import { uuid } from "../../utils/Uuid";
require('../../utils/Utils');
import moment from 'moment';
import 'moment/locale/zh-cn';
import {
    postHouseholdInformationData, postDomicilePlaceData, postIllegalCrimeData,
    addHouseholdInformationData, editHouseholdInformationData, deleteHouseholdInformationData,
    addIllegalCrimeData, editIllegalCrimeData, deleteIllegalCrimeData,
    addDomicilePlaceData, editDomicilePlaceData, deleteDomicilePlaceData,
    postDrugData, addDrugData, editDrugData, deleteDrugData,
    postTrafviolateData, addTrafviolateData, editTrafviolateData, deleteTrafviolateData,
    postCriminalData, addCriminalData, editCriminalData, deleteCriminalData
} from "../../actions/AuditReport"
import TransferList from 'antd/lib/transfer/list';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

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

export class BgInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgPath: "",
            img: "",
            ModalDialogueShow: 'none',
            householdInformationList: store.getState().AuditReport.data.bgInformation.householdInformationList,
            domicilePlaceList: store.getState().AuditReport.data.bgInformation.domicilePlaceList,
            illegalCrimeList: store.getState().AuditReport.data.bgInformation.illegalCrimeList,
            drugList: store.getState().AuditReport.data.bgInformation.drugList,
            trafviolateList: store.getState().AuditReport.data.bgInformation.trafviolateList,
            criminalList: store.getState().AuditReport.data.bgInformation.criminalList,
            ModalDialogueSourceShow: 'none',
            ModalDialogueSourceShow2: 'none',
            modalKey: 0,
            modalType: '',
            visiblefamily: false,
            deletevisible: false,
            selectedRows: [],
            selectedRowsId: [],
            record: '',
            pagination: pagination,
            toConfigure: store.getState().AuditReport.data.toConfigure,
            bgTrigger: store.getState().AuditReport.data.bgTrigger,
        }
    }
    //加载
    componentDidMount() {
        //取状态树上的值
        let householdInformationList = store.getState().AuditReport.data.bgInformation.householdInformationList;
        let domicilePlaceList = store.getState().AuditReport.data.bgInformation.domicilePlaceList;
        let illegalCrimeList = store.getState().AuditReport.data.bgInformation.illegalCrimeList;
        let drugList = store.getState().AuditReport.data.bgInformation.drugList;
        let trafviolateList = store.getState().AuditReport.data.bgInformation.trafviolateList;
        let criminalList = store.getState().AuditReport.data.bgInformation.criminalList;
        let toConfigure = this.state.toConfigure;
        let bgTrigger = this.state.bgTrigger;
        //判断是否有值，没有就从后台接口拿
        if (toConfigure === "") {//判断是否研判历史状态
            if (bgTrigger === false) {//如果背景信息已经经过了删除操作，就不请求后台接口了(false是没进行删除操作)
                if (householdInformationList.length === 0 || householdInformationList === null) {
                    let creds = {
                        pd: {
                            idcard: this.props.idcard,
                        },

                    }
                    store.dispatch(postHouseholdInformationData(creds));
                }
                if (domicilePlaceList === null || domicilePlaceList === null) {
                    let creds = {
                        pd: {
                            idcard: this.props.idcard,
                        },

                    }
                    store.dispatch(postDomicilePlaceData(creds));
                }
                if (illegalCrimeList.length === 0 || illegalCrimeList === null) {
                    let creds = {
                        pd: {
                            idcard: this.props.idcard,
                        },

                    }
                    store.dispatch(postIllegalCrimeData(creds));
                }
                if (drugList.length === 0 || drugList === null) {
                    let creds = {
                        pd: {
                            idcard: this.props.idcard,
                        },

                    }
                    store.dispatch(postDrugData(creds));
                }
                if (trafviolateList.length === 0 || trafviolateList === null) {
                    let creds = {
                        pd: {
                            idcard: this.props.idcard,
                        },

                    }
                    store.dispatch(postTrafviolateData(creds));
                }
                if (criminalList.length === 0 || criminalList === null) {
                    let creds = {
                        pd: {
                            idcard: this.props.idcard,
                        },

                    }
                    store.dispatch(postCriminalData(creds));
                }
                //改变状态
                this.setState({
                    householdInformationList: householdInformationList,
                    domicilePlaceList: domicilePlaceList,
                    illegalCrimeList: illegalCrimeList,
                    drugList: drugList,
                    trafviolateList: trafviolateList,
                    criminalList: criminalList,
                });
            } else {
                //改变状态
                this.setState({
                    householdInformationList: householdInformationList,
                    domicilePlaceList: domicilePlaceList,
                    illegalCrimeList: illegalCrimeList,
                    drugList: drugList,
                    trafviolateList: trafviolateList,
                    criminalList: criminalList,
                });
            }

        } else {
            //改变状态
            this.setState({
                householdInformationList: householdInformationList,
                domicilePlaceList: domicilePlaceList,
                illegalCrimeList: illegalCrimeList,
                drugList: drugList,
                trafviolateList: trafviolateList,
                criminalList: criminalList,
            });
        }


    }
    //组件props发生变化，更新state
    componentWillReceiveProps(nextProps) {
        let householdInformationList = nextProps.AuditReport.data.bgInformation.householdInformationList;//更新状态树
        let domicilePlaceList = nextProps.AuditReport.data.bgInformation.domicilePlaceList;//更新状态树
        let illegalCrimeList = nextProps.AuditReport.data.bgInformation.illegalCrimeList;
        let drugList = nextProps.AuditReport.data.bgInformation.drugList;
        let trafviolateList = nextProps.AuditReport.data.bgInformation.trafviolateList;
        let criminalList = nextProps.AuditReport.data.bgInformation.criminalList;
        let toConfigure = nextProps.AuditReport.data.toConfigure;
        this.setState({
            householdInformationList: householdInformationList,
            domicilePlaceList: domicilePlaceList,
            illegalCrimeList: illegalCrimeList,
            drugList: drugList,
            trafviolateList: trafviolateList,
            criminalList: criminalList,
            toConfigure: toConfigure,
        });

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
    //同户信息 打开模态框
    handleClickClear = () => {
        this.setState({
            visiblefamily: true,
            modalType: 'add',
        })
    }
    editShowModal = (record) => {
        this.setState({
            visiblefamily: true,
            modalType: 'edit',
            record: record
        });
    }
    //模态框 取消
    handleCancelfamily = () => {
        this.setState({
            visiblefamily: false,
            modalKey: this.state.modalKey + 1
        });
    }
    //保存
    saveFamilyModel = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let userItem = JSON.parse(sessionStorage.getItem('user'));
            if (!err) {
                if (this.state.modalType === 'add') {
                    let creds = {
                        id: uuid(),
                        name: values.name ? values.name : '',
                        idcard: values.idcard ? values.idcard : '',
                        relation: values.relation ? values.relation : '',
                    }

                    store.dispatch(addHouseholdInformationData(creds));
                } else {

                    let creds = {
                        id: this.state.record.id,
                        name: values.name ? values.name : this.state.record.name,
                        idcard: values.idcard ? values.idcard : this.state.record.idcard,
                        relation: values.relation ? values.relation : this.state.record.relation,
                    }
                    store.dispatch(editHouseholdInformationData(creds));

                }
                this.setState({
                    visiblefamily: false,
                    modalKey: this.state.modalKey + 1
                });
            }
        })

    }
    //同户信息删除
    clickDelete = () => {
        let selectedRows = this.state.selectedRows;
        let selectedRowsId = this.state.selectedRowsId;
        if (this.state.selectedRows.length === 0) {
            message.error('提示：请选择要删除的项！');
            return;
        }
        for (let i = 0; i < selectedRows.length; i++) {
            let obj = selectedRows[i];
            store.dispatch(deleteHouseholdInformationData(obj));
        }
        this.setState({
            selectedRowsId: [],
            deletevisible: false,
        })
    }
    //删除事件
    showDeleteModal = () => {
        this.setState({
            deletevisible: true,
        })
    }
    handleCanceldelete = () => {
        this.setState({
            deletevisible: false,
            modalKey: this.state.modalKey + 1
        });
    }
    //身份证校验
    testid = (rule, value, callback) => {
        let reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if (!reg.test(value)) {
            callback('身份证号码不合规', 'input Spaces, please check');
            return;
        }
        callback();
        return;
    }

    render() {
        let householdInformationList = this.state.householdInformationList;
        let domicilePlaceList = this.state.domicilePlaceList;
        let illegalCrimeList = this.state.illegalCrimeList;
        let drugList = this.state.drugList;
        let trafviolateList = this.state.trafviolateList;
        let criminalList = this.state.criminalList;
        let isFetching = store.getState().AuditReport.isFetching;
        let toConfigure = this.state.toConfigure;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16
            }
        };
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
        }, {
            title: '身份证',
            dataIndex: 'idcard',
        }, {
            title: '关系人',
            dataIndex: 'relation',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
                    <span onClick={(e) => this.editShowModal(record)} style={{ cursor: 'pointer' }}>{toConfigure === 'JudgeHistory' ? '详情' : '编辑'}</span>
                </span>
            ),
        }];
        const data = [];
        if (householdInformationList !== null) {
            for (let i = 0; i < householdInformationList.length; i++) {
                let householdInformation = householdInformationList[i];
                data.push({
                    id: householdInformation.id,
                    name: householdInformation.name,
                    relation: householdInformation.relation,
                    idcard: householdInformation.idcard,
                    key: householdInformation.id,
                });

            }
        }

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                // const ids = [];
                // for (var i = 0; i < selectedRows.length; i++) {
                //     var selectedRow = selectedRows[i];
                //     ids.push(selectedRow.id);
                // }
                // console.log('ids',ids);
                this.setState({
                    selectedRowsId: selectedRowKeys,
                    selectedRows: selectedRows,
                });
            },
            // selectedRowKeys: this.state.selectedRows? []:selectedRowKeys,
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
        };


        return (
            <div style={{ marginTop: "30px" }}>
                <div>
                    {/*同户信息的标题*/}
                    <div style={titleBg}>
                        <div>
                            <span style={{ fontSize: "16px", color: "#fff" }}>同户信息</span>
                            {toConfigure === 'JudgeHistory' ? '' ://判断是否是研判历史展示的
                                <div style={{ float: "right", width: "150px" }}>
                                    {/* <ShallowBlueBtn text="添加" width="60px" float="left" onClick={this.handleClickClear} disabled= {toConfigure==='JudgeHistory'?true:false}/> */}
                                    <Button style={{ margin: '0 0 0 0px', width: "60px", float: "left" }} onClick={this.handleClickClear} className="btn_ok" >
                                        添加
                                </Button>
                                    <Button style={{ margin: '0 0 0 0px', width: "60px", float: "right" }} onClick={this.showDeleteModal} className="btn_delete">
                                        删除
                                </Button>
                                    <Modal style={{ top: "38%" }}
                                        title="提示"
                                        visible={this.state.deletevisible}
                                        footer={null}
                                        maskClosable={false}
                                        closable={false}
                                    >
                                        <p style={{ fontSize: "16px", }}>是否删除选中项？</p>
                                        <p style={{ marginTop: "20px", textAlign: "center" }}>
                                            <Button style={{ margin: '0 20px 0 0 ', width: "80px" }} onClick={this.clickDelete} className="btn_ok">
                                                确定
                                        </Button>
                                            <Button style={{ margin: '', width: "80px" }} onClick={this.handleCanceldelete} className="btn_delete">
                                                取消
                                        </Button>
                                        </p>

                                    </Modal>
                                    <div style={{ clear: "both" }}></div>
                                </div>
                            }
                        </div>
                        <div style={clear}></div>
                    </div>
                    <div style={{ position: 'relative' }}>
                        {/*同户信息*/}

                        <div style={{ padding: "15px" }}>
                            <Table
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={data}
                                bordered
                                pagination={this.state.pagination}
                                locale={{ emptyText: '暂无数据' }}
                                loading={isFetching}
                                key="household"
                            />
                        </div>
                    </div>
                    {/* 同户信息模态框 */}
                    <Modal
                        title="同户信息"
                        visible={this.state.visiblefamily}
                        onCancel={this.handleCancelfamily}
                        footer={null}
                        key={this.state.modalKey}
                    >
                        <Form>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="姓名"
                                    hasFeedback
                                >
                                    {getFieldDecorator('name', {
                                        rules: [{
                                            required: true, message: '请输入名称!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.name : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="身份证"
                                    hasFeedback
                                >
                                    {getFieldDecorator('idcard', {
                                        rules: [{
                                            required: true, message: '请输入身份证!',
                                        }, {
                                            validator: this.testid
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.idcard : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="关系人"
                                    hasFeedback
                                >
                                    {getFieldDecorator('relation', {
                                        rules: [{
                                            required: true, message: '请输入关联人!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.relation : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            {toConfigure === 'JudgeHistory' ? '' :
                                <Row>
                                    <Col span={16} style={{ textAlign: 'right' }}>
                                        <Button htmlType="submit" onClick={this.saveFamilyModel} className="btn_ok">保存</Button>
                                        <Button style={{ marginLeft: 30 }} onClick={this.handleCancelfamily} className="btn_delete">取消</Button>

                                    </Col>
                                </Row>}

                        </Form>
                    </Modal>
                </div>
                <div>

                    {/*户籍地核查情况*/}
                    {/* <DomicilePlace domicilePlaceList={domicilePlaceList} /> */}

                </div>
                <div>
                    {/*违法犯罪前科*/}
                    <IllegalCrime illegalCrimeList={illegalCrimeList} isFetching={isFetching} toConfigure={toConfigure} />

                </div>
                <div>
                    {/* 吸贩毒 */}
                    <Drug drugList={drugList} isFetching={isFetching} toConfigure={toConfigure} />
                </div>
                {/* <div>
                    <Trafviolate trafviolateList={trafviolateList} />
                </div> */}
                <div>
                    <Criminal criminalList={criminalList} isFetching={isFetching} toConfigure={toConfigure} />
                </div>
                <div style={{ margin: "15px 0", paddingRight: "15px" }}>
                    <ShallowBlueBtn text="下一步" onClick={this.handleNextClickClear} width="80px" float="right" />
                    <div style={clear}></div>
                </div>
            </div>

        );
    }
};


//在逃人员
class IllegalCrime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleIllegal: false,
            modalKey: 1,
            modalType: '',
            selectedRows: [],
            selectedRowsId: [],
            deletevisible: '',
            record: '',
            pagination: pagination
        }
    }
    //刷新
    forceFun = () => {
        this.forceUpdate();
    }
    //违法犯罪前科
    handleSourceClickClear = () => {
        this.setState({
            visibleIllegal: true,
            modalType: 'add',
        });
    }
    editShowModal = (record) => {
        this.setState({
            visibleIllegal: true,
            modalType: 'edit',
            record: record
        });
    }
    //模态框 取消
    handleCancelIllegal = () => {
        this.setState({
            visibleIllegal: false,
            modalKey: this.state.modalKey + 1
        });
    }
    //保存
    saveIllegalModel = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            let userItem = JSON.parse(sessionStorage.getItem('user'));
            if (!err) {
                if (this.state.modalType === 'add') {
                    let creds = {
                        id: uuid(),
                        bg_type: '',
                        name: values.name ? values.name : '',
                        sex: values.sex ? values.sex : '',
                        birth: values['birth'].format('YYYY-MM-DD') ? values['birth'].format('YYYY-MM-DD') : '',
                        idcard: values.idcard ? values.idcard : '',
                        nation: values.nation ? values.nation : '',
                        cencusaddr: values.cencusaddr ? values.cencusaddr : '',
                        liveaddr: values.liveaddr ? values.liveaddr : '',
                        fugitivetype: values.fugitivetype ? values.fugitivetype : '',
                        remark: values.remark ? values.remark : '',
                    }
                    store.dispatch(addIllegalCrimeData(creds));
                } else {
                    let creds = {
                        id: this.state.record.id,
                        bg_type: '',
                        name: values.name ? values.name : this.state.record.name,
                        sex: values.sex ? values.sex : this.state.record.sex,
                        birth: values['birth'].format('YYYY-MM-DD') ? values['birth'].format('YYYY-MM-DD') : this.state.record.birth,
                        idcard: values.idcard ? values.idcard : this.state.record.idcard,
                        nation: values.nation ? values.nation : this.state.record.nation,
                        cencusaddr: values.cencusaddr ? values.cencusaddr : this.state.record.cencusaddr,
                        liveaddr: values.liveaddr ? values.liveaddr : this.state.record.liveaddr,
                        fugitivetype: values.fugitivetype ? values.fugitivetype : this.state.record.fugitivetype,
                        remark: values.remark ? values.remark : this.state.record.remark,
                    }
                    store.dispatch(editIllegalCrimeData(creds));

                }
                this.setState({
                    visibleIllegal: false,
                    modalKey: this.state.modalKey + 1
                });

            }
        })

    }
    //删除
    showDeleteModal = () => {
        this.setState({
            deletevisible: true,
        });
    }
    //确认删除事件
    clickDelete = () => {
        let selectedRows = this.state.selectedRows;
        let selectedRowsId = this.state.selectedRowsId;
        if (this.state.selectedRows.length === 0) {
            message.error('提示：请选择要删除的项！');
            return;
        }
        for (let i = 0; i < selectedRows.length; i++) {
            let obj = selectedRows[i];
            store.dispatch(deleteIllegalCrimeData(obj));
        }

        this.setState({
            deletevisible: false,
            selectedRowsId: [],
        });

    }
    handleCanceldelete = () => {
        this.setState({
            deletevisible: false,
        });
    }
    //身份证校验
    testid = (rule, value, callback) => {
        let reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if (!reg.test(value)) {
            callback('身份证号码不合规', 'input Spaces, please check');
            return;
        }
        callback();
        return;
    }
    render() {
        let illegalCrimeList = this.props.illegalCrimeList;
        let isFetching = this.props.isFetching;
        let toConfigure = this.props.toConfigure;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16
            }
        };
        // let divList = [];
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
        }, {
            title: '性别',
            dataIndex: 'sex',
        }, {
            title: '出生日期',
            dataIndex: 'birth',
        }, {
            title: '身份证号',
            dataIndex: 'idcard',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
                    <span onClick={(e) => this.editShowModal(record)} style={{ cursor: 'pointer' }}>{toConfigure === 'JudgeHistory' ? '详情' : '编辑'}</span>
                </span>
            ),
        }];
        const data = [];
        if (illegalCrimeList !== null) {
            for (let i = 0; i < illegalCrimeList.length; i++) {
                var illegalCrime = illegalCrimeList[i];
                data.push({
                    id: illegalCrime.id,
                    bg_type: illegalCrime.bg_type,
                    name: illegalCrime.name,
                    birth: illegalCrime.birth,
                    idcard: illegalCrime.idcard,
                    nation: illegalCrime.nation,
                    cencusaddr: illegalCrime.cencusaddr,
                    liveaddr: illegalCrime.liveaddr,
                    fugitivetype: illegalCrime.fugitivetype,
                    remark: illegalCrime.remark,
                    sex: illegalCrime.sex,
                    key: illegalCrime.id,
                });

            }
        }
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                // const ids = [];
                // for (var i = 0; i < selectedRows.length; i++) {
                //     var selectedRow = selectedRows[i];
                //     ids.push(selectedRow.id);
                // }
                // console.log('ids',ids);
                this.setState({
                    selectedRowsId: selectedRowKeys,
                    selectedRows: selectedRows,
                });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
        };

        // if(domicilePlaceList !== null) {
        //     for (var i = 0; i < domicilePlaceList.length; i++) {
        //         let divData = domicilePlaceList[i];
        //         divList.push(
        //             <InsoDIv divData={divData} forceFun={this.forceFun}/>
        //         );
        //     }
        // }
        return (
            <div style={{ position: 'relative' }}>
                {/*标题*/}
                <div style={titleBg}>
                    <div>
                        <span style={{ fontSize: "16px", color: "#fff" }}>在逃人员</span>
                        {toConfigure === 'JudgeHistory' ? '' :
                            <div style={{ float: "right", width: "150px" }}>
                                {/* <ShallowBlueBtn text="添加" width="60px" float="left" onClick={this.handleSourceClickClear} disabled= {toConfigure==='JudgeHistory'?true:false}/> */}
                                <Button style={{ margin: '0 0 0 0px', width: "60px", float: "left" }} onClick={this.handleSourceClickClear} className="btn_ok" >
                                    添加
                            </Button>
                                <Button style={{ margin: '0 0 0 0px', width: "60px", float: "right" }} onClick={this.showDeleteModal} className="btn_delete" >
                                    删除
                        </Button>
                                <Modal style={{ top: "38%" }}
                                    title="提示"
                                    visible={this.state.deletevisible}
                                    footer={null}
                                    maskClosable={false}
                                    closable={false}
                                >
                                    <p style={{ fontSize: "16px", }}>是否删除选中项？</p>
                                    <p style={{ marginTop: "20px", textAlign: "center" }}>
                                        <Button style={{ margin: '0 20px 0 0 ', width: "80px" }} onClick={this.clickDelete} className="btn_ok">
                                            确定
                                    </Button>
                                        <Button style={{ margin: '', width: "80px" }} onClick={this.handleCanceldelete} className="btn_delete">
                                            取消
                                    </Button>
                                    </p>

                                </Modal>
                            </div>}
                    </div>
                    <div style={clear}></div>
                </div>

                <div style={{ padding: '15px' }}>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={data}
                        bordered
                        pagination={this.state.pagination}
                        locale={{ emptyText: '暂无数据' }}
                        loading={isFetching}
                        key="illegalCrime"
                    />
                </div>
                <Modal
                    title="在逃人员"
                    visible={this.state.visibleIllegal}
                    onCancel={this.handleCancelIllegal}
                    footer={null}
                    key={this.state.modalKey}

                >
                    <Form>
                        <div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="姓名"
                                    hasFeedback
                                >
                                    {getFieldDecorator('name', {
                                        rules: [{
                                            required: true, message: '请输入!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.name : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="性别"
                                    hasFeedback
                                >
                                    {getFieldDecorator('sex', {
                                        rules: [{
                                            required: true, message: '请输入!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.sex : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="出生日期"
                                    hasFeedback
                                >
                                    {getFieldDecorator('birth', {
                                        rules: [{
                                            required: true, message: '请输入!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? moment(this.state.record.birth) : '',
                                        validateFirst: true
                                    })(
                                        <DatePicker  placeholder="" format='YYYY-MM-DD' allowClear={false} style={{ width: '323px' }} disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="身份证号"
                                    hasFeedback
                                >
                                    {getFieldDecorator('idcard', {
                                        rules: [{
                                            required: true, message: '请输入!',
                                        }, {
                                            validator: this.testid
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.idcard : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="民族"
                                    hasFeedback
                                >
                                    {getFieldDecorator('nation', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.nation : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="户籍地址"
                                    hasFeedback
                                >
                                    {getFieldDecorator('cencusaddr', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.cencusaddr : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="居住地址"
                                    hasFeedback
                                >
                                    {getFieldDecorator('liveaddr', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.liveaddr : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="罪犯类型"
                                    hasFeedback
                                >
                                    {getFieldDecorator('fugitivetype', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.fugitivetype : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="备注"
                                    hasFeedback
                                >
                                    {getFieldDecorator('remark', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.remark : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>

                        </div>
                        <div style={{ clear: 'both' }}></div>
                        {toConfigure === 'JudgeHistory' ? '' :
                            <Row>
                                <Col span={16} style={{ textAlign: 'right' }}>
                                    <Button htmlType="submit" className="btn_ok" onClick={this.saveIllegalModel}>保存</Button>
                                    <Button style={{ marginLeft: 30 }} onClick={this.handleCancelIllegal} className="btn_delete">取消</Button>

                                </Col>
                            </Row>}

                    </Form>
                </Modal>
            </div>
        );
    }
}

//户籍地
class DomicilePlace extends Component {
    //刷新
    constructor(props) {
        super(props);
        this.state = {
            visibleHousehold: false,
            modalKey: 1,
            modalType: '',
            selectedRows: [],
            record: '',
            deletevisible: false,
        }
    }
    forceFun = () => {
        this.forceUpdate();
    }
    //户籍地祥址
    handleSourceClickClearHousehold = () => {
        this.setState({
            visibleHousehold: true,
            modalType: 'add',
        });
    }
    editShowModal = (record) => {
        this.setState({
            visibleHousehold: true,
            modalType: 'edit',
            record: record
        });
    }
    handleCancelHousehold = () => {
        this.setState({
            visibleHousehold: false,
            modalKey: this.state.modalKey + 1
        });
    }
    //保存到状态树中
    saveHouseholdModel = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.state.modalType === 'add') {
                    let creds = {
                        id: uuid(),
                        t_judge_record_bank_id: values.t_judge_record_bank_id ? values.t_judge_record_bank_id : '',
                        trade_type: values.trade_type ? values.trade_type : '',
                        trade_amount: values.trade_amount ? values.trade_amount : '',
                        opposite_unitname: values.opposite_unitname ? values.opposite_unitname : '',
                        opposite_account: values.opposite_account ? values.opposite_account : '',
                        opposite_personname: values.opposite_personname ? values.opposite_personname : '',
                        trade_time: values['trade_time'].format('YYYY-MM-DD'),
                    }
                    store.dispatch(addDomicilePlaceData(creds));
                } else {
                    let creds = {
                        id: this.state.record.id,
                        t_judge_record_bank_id: values.t_judge_record_bank_id ? values.t_judge_record_bank_id : this.state.record.t_judge_record_bank_id,
                        trade_type: values.trade_type ? values.trade_type : this.state.record.trade_type,
                        trade_amount: values.trade_amount ? values.trade_amount : this.state.record.trade_amount,
                        opposite_unitname: values.opposite_unitname ? values.opposite_unitname : this.state.record.opposite_unitname,
                        opposite_account: values.opposite_account ? values.opposite_account : this.state.record.opposite_account,
                        opposite_personname: values.opposite_personname ? values.opposite_personname : this.state.record.opposite_personname,
                        trade_time: values['trade_time'].format('YYYY-MM-DD') ? values['trade_time'].format('YYYY-MM-DD') : this.state.record.trade_time,
                    }
                    store.dispatch(editDomicilePlaceData(creds));

                }

            }
        })
        this.setState({
            visibleHousehold: false,
            modalKey: this.state.modalKey + 1
        });
    }
    //删除
    showDeleteModal = () => {
        this.setState({
            deletevisible: true,
        });
    }
    //确认删除事件
    clickDelete = () => {
        let selectedRows = this.state.selectedRows;
        for (let i = 0; i < selectedRows.length; i++) {
            let obj = selectedRows[i];
            store.dispatch(deleteDomicilePlaceData(obj));
        }

        this.setState({
            deletevisible: false,
        });

    }
    handleCanceldelete = () => {
        this.setState({
            deletevisible: false,
        });
    }
    render() {
        let domicilePlaceList = this.props.domicilePlaceList;
        let divList = [];
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16
            }
        };
        // let divList = [];
        const columns = [{
            title: '银行编号',
            dataIndex: 't_judge_record_bank_id',
        }, {
            title: '交易类型',
            dataIndex: 'trade_type',
        }, {
            title: '交易数量',
            dataIndex: 'trade_amount',
        }, {
            title: '对方交易单位',
            dataIndex: 'opposite_unitname',
        }, {
            title: '对方帐号',
            dataIndex: 'opposite_account',
        }, {
            title: '对方交易人',
            dataIndex: 'opposite_personname',
        }, {
            title: '交易时间',
            dataIndex: 'trade_time',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
                    <span onClick={(e) => this.editShowModal(record)} style={{ cursor: 'pointer' }}>编辑</span>
                </span>
            ),
        }];
        const data = [];
        // if(bankInformationList !== null){
        //      for (var i = 0; i < bankInformationList.length; i++) {
        //          var bankInformation = bankInformationList[i];

        //          data.push({
        //          // key: i,

        //          t_judge_record_bank_id: bankInformation.t_judge_record_bank_id,
        //          trade_type: bankInformation.trade_type,
        //          trade_amount: bankInformation.trade_amount,
        //          opposite_unitname:bankInformation.opposite_unitname,
        //          opposite_account: bankInformation.opposite_account,
        //          opposite_personname: bankInformation.opposite_personname,
        //          trade_time: bankInformation.trade_time,
        //          });

        //      }
        // }
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                // const ids = [];
                // for (var i = 0; i < selectedRows.length; i++) {
                //     var selectedRow = selectedRows[i];
                //     ids.push(selectedRow.id);
                // }
                // console.log('ids',ids);
                this.setState({
                    selectedRowsId: selectedRowKeys,
                    selectedRows: selectedRows,
                });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
        };
        // if(domicilePlaceList !== null) {
        //     for (var i = 0; i < domicilePlaceList.length; i++) {
        //         let divData = domicilePlaceList[i];
        //         // divList.push(
        //         //     <InsoDIv2 divData={divData} forceFun={this.forceFun}/>
        //         // );
        //     }
        // }
        return (
            <div>
                <div style={titleBg}>
                    <div>
                        <span style={{ fontSize: "16px", color: "#fff" }}>户籍地核查情况</span>
                        {/* <ShallowBlueBtn text="添加" width="60px" float="right" onClick={this.handleSourceClickClearHousehold} /> */}
                        <Button style={{ margin: '0 0 0 0px', width: "60px", float: "left" }} onClick={this.handleSourceClickClearHousehold} className="btn_ok">
                            添加
                        </Button>
                        <Button style={{ margin: '0 0 0 0px', width: "60px", float: "right" }} onClick={this.showDeleteModal} className="btn_delete">
                            删除
                        </Button>
                        <Modal style={{ top: "38%" }}
                            title="提示"
                            visible={this.state.deletevisible}
                            footer={null}
                            maskClosable={false}
                            closable={false}
                        >
                            <p style={{ fontSize: "16px", }}>是否删除选中项？</p>
                            <p style={{ marginTop: "20px", textAlign: "center" }}>
                                <Button style={{ margin: '0 20px 0 0 ', width: "80px" }} onClick={this.clickDelete} className="btn_ok">
                                    确定
                                </Button>
                                <Button style={{ margin: '', width: "80px" }} onClick={this.handleCanceldelete} className="btn_delete">
                                    取消
                                </Button>
                            </p>

                        </Modal>
                    </div>
                    <div style={clear}></div>
                </div>
                <div style={{ padding: "15px" }}>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={data}
                        bordered
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title="户籍地核查情况"
                    visible={this.state.visibleHousehold}
                    onCancel={this.handleCancelHousehold}
                    footer={null}
                    key={this.state.modalKey}
                >
                    <Form>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="来源"
                                hasFeedback
                            >
                                {getFieldDecorator('source', {
                                    rules: [{
                                        required: true, message: '请输入来源!',
                                    }],
                                    initialValue: '',
                                    validateFirst: true
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="详细信息"
                                hasFeedback
                            >
                                {getFieldDecorator('information', {
                                    rules: [{
                                        required: true, message: '请输入详细信息!',
                                    }],
                                    initialValue: '',
                                    validateFirst: true
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                        </div>

                        <Row>
                            <Col span={16} style={{ textAlign: 'right' }}>
                                <Button htmlType="submit" className="btn_ok" onClick={this.saveHouseholdModel}>保存</Button>
                                <Button style={{ marginLeft: 30 }} onClick={this.handleCancelHousehold} className="btn_delete">取消</Button>

                            </Col>
                        </Row>

                    </Form>
                </Modal>
            </div>
        );
    }
}
//吸毒
class Drug extends Component {
    //刷新
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            modalKey: 1,
            modalType: '',
            selectedRows: [],
            selectedRowsId: [],
            record: '',
            deletevisible: false,
            pagination: pagination
        }
    }
    forceFun = () => {
        this.forceUpdate();
    }
    //户籍地祥址
    handleSourceClickClear = () => {
        this.setState({
            visible: true,
            modalType: 'add',
        });
    }
    editShowModal = (record) => {
        this.setState({
            visible: true,
            modalType: 'edit',
            record: record
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            modalKey: this.state.modalKey + 1
        });
    }
    //保存到状态树中
    saveModel = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            let userItem = JSON.parse(sessionStorage.getItem('user'));
            if (!err) {
                if (this.state.modalType === 'add') {
                    let creds = {
                        id: uuid(),
                        bg_type: '',
                        name: values.name ? values.name : '',
                        idcard: values.idcard ? values.idcard : '',
                        checkinperson: values.checkinperson ? values.checkinperson : '',
                        checkintime: values['checkintime'].format('YYYY-MM-DD HH:mm:ss') ? values['checkintime'].format('YYYY-MM-DD HH:mm:ss') : this.state.record.checkintime,
                        cencusaddr: values.cencusaddr ? values.cencusaddr : '',
                    }
                    store.dispatch(addDrugData(creds));
                } else {
                    let creds = {
                        id: this.state.record.id,
                        bg_type: '',
                        name: values.name ? values.name : this.state.record.name,
                        idcard: values.idcard ? values.idcard : this.state.record.idcard,
                        checkinperson: values.checkinperson ? values.checkinperson : this.state.record.checkinperson,
                        checkintime: values['checkintime'].format('YYYY-MM-DD HH:mm:ss') ? values['checkintime'].format('YYYY-MM-DD HH:mm:ss') : this.state.record.checkintime,
                        cencusaddr: values.cencusaddr ? values.cencusaddr : this.state.record.cencusaddr,
                    }
                    store.dispatch(editDrugData(creds));

                }
                this.setState({
                    visible: false,
                    modalKey: this.state.modalKey + 1
                });

            }
        })

    }
    //删除
    showDeleteModal = () => {
        this.setState({
            deletevisible: true,
        });
    }
    //确认删除事件
    clickDelete = () => {
        let selectedRows = this.state.selectedRows;
        let selectedRowsId = this.state.selectedRowsId;
        if (this.state.selectedRows.length === 0) {
            message.error('提示：请选择要删除的项！');
            return;
        }
        for (let i = 0; i < selectedRows.length; i++) {
            let obj = selectedRows[i];
            store.dispatch(deleteDrugData(obj));
        }

        this.setState({
            deletevisible: false,
            selectedRowsId: []
        });

    }
    handleCanceldelete = () => {
        this.setState({
            deletevisible: false,
        });
    }
    //身份证校验
    testid = (rule, value, callback) => {
        let reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if (!reg.test(value)) {
            callback('身份证号码不合规', 'input Spaces, please check');
            return;
        }
        callback();
        return;
    }
    checkintimeOk = (e) => {
        if (e === undefined) {
            this.props.form.setFieldsValue({
                checkintime: moment(),
            });
        }
    }
    render() {
        let drugList = this.props.drugList;
        let isFetching = this.props.isFetching;
        let toConfigure = this.props.toConfigure;
        let divList = [];
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16
            }
        };
        // let divList = [];
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
        }, {
            title: '身份证号',
            dataIndex: 'idcard',
        }, {
            title: '登记人',
            dataIndex: 'checkinperson',
        }, {
            title: '登记时间',
            dataIndex: 'checkintime',
        }, {
            title: '地址',
            dataIndex: 'cencusaddr',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
                    <span onClick={(e) => this.editShowModal(record)} style={{ cursor: 'pointer' }}>{toConfigure === 'JudgeHistory' ? '详情' : '编辑'}</span>
                </span>
            ),
        }];
        const data = [];
        if (drugList !== null) {
            for (var i = 0; i < drugList.length; i++) {
                var drugData = drugList[i];

                data.push({
                    id: drugData.id,
                    bg_type: drugData.bg_type,
                    name: drugData.name,
                    idcard: drugData.idcard,
                    checkinperson: drugData.checkinperson,
                    checkintime: drugData.checkintime,
                    cencusaddr: drugData.cencusaddr,
                    key: drugData.id,
                });

            }
        }
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                // const ids = [];
                // for (var i = 0; i < selectedRows.length; i++) {
                //     var selectedRow = selectedRows[i];
                //     ids.push(selectedRow.id);
                // }
                // console.log('ids',ids);
                this.setState({
                    selectedRowsId: selectedRowKeys,
                    selectedRows: selectedRows,
                });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
        };

        return (
            <div style={{ position: 'relative' }}>
                <div style={titleBg}>
                    <div>
                        <span style={{ fontSize: "16px", color: "#fff" }}>吸贩毒情况</span>
                        {toConfigure === 'JudgeHistory' ? '' :
                            <div style={{ float: 'right', width: '150px' }}>
                                {/* <ShallowBlueBtn text="添加" width="60px" float="left" onClick={this.handleSourceClickClear} disabled= {toConfigure==='JudgeHistory'?true:false}/> */}
                                <Button style={{ margin: '0 0 0 0px', width: "60px", float: "left" }} onClick={this.handleSourceClickClear} className="btn_ok" disabled={toConfigure === 'JudgeHistory' ? true : false}>
                                    添加
                            </Button>
                                <Button style={{ margin: '0 0 0 0px', width: "60px", float: "right" }} onClick={this.showDeleteModal} className="btn_delete" disabled={toConfigure === 'JudgeHistory' ? true : false}>
                                    删除
                            </Button>
                                <Modal style={{ top: "38%" }}
                                    title="提示"
                                    visible={this.state.deletevisible}
                                    footer={null}
                                    maskClosable={false}
                                    closable={false}
                                >
                                    <p style={{ fontSize: "16px", }}>是否删除选中项？</p>
                                    <p style={{ marginTop: "20px", textAlign: "center" }}>
                                        <Button style={{ margin: '0 20px 0 0 ', width: "80px" }} onClick={this.clickDelete} className="btn_ok">
                                            确定
                                    </Button>
                                        <Button style={{ margin: '', width: "80px" }} onClick={this.handleCanceldelete} className="btn_delete">
                                            取消
                                    </Button>
                                    </p>

                                </Modal>
                            </div>}
                    </div>
                    <div style={clear}></div>
                </div>

                <div style={{ padding: "15px" }}>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={data}
                        bordered
                        pagination={this.state.pagination}
                        locale={{ emptyText: '暂无数据' }}
                        loading={isFetching}
                        key="drug"
                    />
                </div>
                <Modal
                    title="吸贩毒情况"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    key={this.state.modalKey}
                >
                    <Form>

                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="姓名"
                                hasFeedback
                            >
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true, message: '请输入!',
                                    }],
                                    initialValue: this.state.modalType === 'edit' ? this.state.record.name : '',
                                    validateFirst: true
                                })(
                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                    )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="身份证号"
                                hasFeedback
                            >
                                {getFieldDecorator('idcard', {
                                    rules: [{
                                        required: true, message: '请输入!',
                                    }, {
                                        validator: this.testid
                                    }],
                                    initialValue: this.state.modalType === 'edit' ? this.state.record.idcard : '',
                                    validateFirst: true
                                })(
                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                    )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="登记人"
                                hasFeedback
                            >
                                {getFieldDecorator('checkinperson', {
                                    rules: [{
                                        required: true, message: '请输入!',
                                    }],
                                    initialValue: this.state.modalType === 'edit' ? this.state.record.checkinperson : '',
                                    validateFirst: true
                                })(
                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                    )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="登记时间"
                                hasFeedback
                            >
                                {getFieldDecorator('checkintime', {
                                    rules: [{
                                        required: true, message: '请输入!',
                                    }],
                                    initialValue: this.state.modalType === 'edit' ? moment(this.state.record.checkintime) : '',
                                    validateFirst: true
                                })(
                                    <DatePicker  placeholder="" onOk={this.checkintimeOk} format='YYYY-MM-DD HH:mm:ss' allowClear={false} showTime={true} style={{ width: '323px' }} disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                    )}
                            </FormItem>
                        </div>

                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="地址"
                                hasFeedback
                            >
                                {getFieldDecorator('cencusaddr', {

                                    initialValue: this.state.modalType === 'edit' ? this.state.record.cencusaddr : '',
                                    validateFirst: true
                                })(
                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                    )}
                            </FormItem>
                        </div>
                        {toConfigure === 'JudgeHistory' ? '' :
                            <Row>
                                <Col span={16} style={{ textAlign: 'right' }}>
                                    <Button htmlType="submit" className="btn_ok" onClick={this.saveModel} disabled={toConfigure === 'JudgeHistory' ? true : false}>保存</Button>
                                    <Button style={{ marginLeft: 30 }} onClick={this.handleCancel} className="btn_delete">取消</Button>

                                </Col>
                            </Row>}

                    </Form>
                </Modal>
            </div>
        );
    }
}
//交通违法
class Trafviolate extends Component {
    //刷新
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            modalKey: 1,
            modalType: '',
            selectedRows: [],
            record: '',
            deletevisible: false,
            pagination: pagination
        }
    }
    forceFun = () => {
        this.forceUpdate();
    }
    //户籍地祥址
    handleSourceClickClear = () => {
        this.setState({
            visible: true,
            modalType: 'add',
        });
    }
    editShowModal = (record) => {
        this.setState({
            visible: true,
            modalType: 'edit',
            record: record
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            modalKey: this.state.modalKey + 1
        });
    }
    //保存到状态树中
    saveModel = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            let userItem = JSON.parse(sessionStorage.getItem('user'));
            if (!err) {
                if (this.state.modalType === 'add') {
                    let creds = {
                        id: uuid(),
                        back_id: this.props.judgeCode,
                        bg_type: '',
                        code: values.code ? values.code : '',
                        judgecode: this.props.judgeCode,
                        archivenum: values.archivenum ? values.archivenum : '',
                        party: values.party ? values.party : '',
                        district: values.district ? values.district : '',
                        address: values.address ? values.address : '',
                        telno: values.telno ? values.telno : '',
                        licenseplate: values.licenseplate ? values.licenseplate : '',
                        owner: values.owner ? values.owner : '',
                        illegaltime: values.illegaltime ? values['illegaltime'].format('YYYY-MM-DD') : '',
                        illegaladdr: values.illegaladdr ? values.illegaladdr : '',
                        illegalevent: values.illegalevent ? values.illegalevent : '',
                        illegalscore: values.illegalscore ? values.illegalscore : '',
                        drvlicense: values.drvlicense ? values.drvlicense : '',
                        finemoney: values.finemoney ? values.finemoney : '',
                        infact: values.infact ? values.infact : '',
                        theory: values.theory ? values.theory : '',
                        latefee: values.latefee ? values.latefee : '',
                        policeman: values.policeman ? values.policeman : '',
                        discoveorgan: values.discoveorgan ? values.discoveorgan : '',
                        disposetime: values.disposetime ? values.disposetime : '',
                        paytime: values.paytime ? values['paytime'].format('YYYY-MM-DD  HH:mm:ss') : '',
                        recordpeople: values.recordpeople ? values.recordpeople : '',
                        recordtime: values.recordtime ? values['recordtime'].format('YYYY-MM-DD') : '',
                    }
                    store.dispatch(addTrafviolateData(creds));
                } else {
                    let creds = {
                        id: this.state.record.id,
                        back_id: this.props.judgeCode,
                        bg_type: '',
                        code: values.code ? values.code : this.state.record.code,
                        judgecode: this.props.judgeCode,
                        archivenum: values.archivenum ? values.archivenum : this.state.record.archivenum,
                        party: values.party ? values.party : this.state.record.party,
                        district: values.district ? values.district : this.state.record.district,
                        address: values.address ? values.address : this.state.record.address,
                        telno: values.telno ? values.telno : this.state.record.telno,
                        licenseplate: values.licenseplate ? values.licenseplate : this.state.record.licenseplate,
                        owner: values.owner ? values.owner : this.state.record.owner,
                        illegaltime: values.illegaltime ? values['illegaltime'].format('YYYY-MM-DD') : this.state.record.illegaltime,
                        illegaladdr: values.illegaladdr ? values.illegaladdr : this.state.record.illegaladdr,
                        illegalevent: values.illegalevent ? values.illegalevent : this.state.record.illegalevent,
                        illegalscore: values.illegalscore ? values.illegalscore : this.state.record.illegalscore,
                        drvlicense: values.drvlicense ? values.drvlicense : this.state.record.drvlicense,
                        finemoney: values.finemoney ? values.finemoney : this.state.record.finemoney,
                        infact: values.infact ? values.infact : this.state.record.infact,
                        theory: values.theory ? values.theory : this.state.record.theory,
                        latefee: values.latefee ? values.latefee : this.state.record.latefee,
                        policeman: values.policeman ? values.policeman : this.state.record.policeman,
                        discoveorgan: values.discoveorgan ? values.discoveorgan : this.state.record.discoveorgan,
                        disposetime: values.disposetime ? values.disposetime : this.state.record.disposetime,
                        paytime: values.paytime ? values['paytime'].format('YYYY-MM-DD  HH:mm:ss') : this.state.record.paytime,
                        recordpeople: values.recordpeople ? values.recordpeople : this.state.record.recordpeople,
                        recordtime: values.recordtime ? values['recordtime'].format('YYYY-MM-DD') : this.state.record.recordtime,
                    }
                    store.dispatch(editTrafviolateData(creds));

                }
                this.setState({
                    visible: false,
                    modalKey: this.state.modalKey + 1
                });

            }
        })

    }
    //删除
    showDeleteModal = () => {
        this.setState({
            deletevisible: true,
        });
    }
    //确认删除事件
    clickDelete = () => {
        let selectedRows = this.state.selectedRows;
        if (this.state.selectedRows.length === 0) {
            message.error('提示：请选择要删除的项！');
            return;
        }
        for (let i = 0; i < selectedRows.length; i++) {
            let obj = selectedRows[i];
            store.dispatch(deleteTrafviolateData(obj));
        }

        this.setState({
            deletevisible: false,
        });

    }
    handleCanceldelete = () => {
        this.setState({
            deletevisible: false,
        });
    }
    render() {
        let trafviolateList = this.props.trafviolateList;
        let toConfigure = this.props.toConfigure;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16
            }
        };
        // let divList = [];
        const columns = [{
            title: '类型',
            dataIndex: 'bg_type',
        }, {
            title: '档案编号',
            dataIndex: 'archivenum',
        }, {
            title: '车牌',
            dataIndex: 'licenseplate',
        }, {
            title: '归属人',
            dataIndex: 'owner',
        }, {
            title: '违法时间',
            dataIndex: 'illegaltime',
        }, {
            title: '违法地点',
            dataIndex: 'illegaladdr',
        }, {
            title: '违法事件',
            dataIndex: 'illegalevent',
        }, {
            title: '违法分数',
            dataIndex: 'illegalscore',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
                    <span onClick={(e) => this.editShowModal(record)} style={{ cursor: 'pointer' }}>编辑</span>
                </span>
            ),
        }];
        const data = [];
        if (trafviolateList !== null) {
            for (var i = 0; i < trafviolateList.length; i++) {
                var trafviolateData = trafviolateList[i];

                data.push({
                    id: trafviolateData.id,
                    bg_type: trafviolateData.bg_type,
                    code: trafviolateData.code,
                    judgecode: trafviolateData.judgecode,
                    archivenum: trafviolateData.archivenum,//档案文件编码
                    party: trafviolateData.party,
                    district: trafviolateData.district,//区
                    address: trafviolateData.address,//地址
                    telno: trafviolateData.telno,//联系电话
                    licenseplate: trafviolateData.licenseplate,//车牌
                    owner: trafviolateData.owner,//归属人
                    illegaltime: trafviolateData.illegaltime,//违法时间
                    illegaladdr: trafviolateData.illegaladdr,//违法地址
                    illegalevent: trafviolateData.illegalevent,//违法事件
                    illegalscore: trafviolateData.illegalscore,//违法分数
                    infact: trafviolateData.infact,
                    theory: trafviolateData.theory,
                    latefee: trafviolateData.latefee,
                    policeman: trafviolateData.policeman,
                    discoveorgan: trafviolateData.discoveorgan,
                    disposetime: trafviolateData.disposetime,
                    paytime: trafviolateData.paytime,
                    recordpeople: trafviolateData.recordpeople,
                    recordtime: trafviolateData.recordtime,
                    drvlicense: trafviolateData.drvlicense,
                    finemoney: trafviolateData.finemoney,

                });

            }
        }
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                // const ids = [];
                // for (var i = 0; i < selectedRows.length; i++) {
                //     var selectedRow = selectedRows[i];
                //     ids.push(selectedRow.id);
                // }
                // console.log('ids',ids);
                this.setState({
                    selectedRowsId: selectedRowKeys,
                    selectedRows: selectedRows,
                });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
        };
        return (
            <div>
                <div style={titleBg}>
                    <div>
                        <span style={{ fontSize: "16px", color: "#fff" }}>交通违法情况</span>
                        <div style={{ float: 'right', width: '150px' }}>
                            {/* <ShallowBlueBtn text="添加" width="60px" float="left" onClick={this.handleSourceClickClear} disabled= {toConfigure==='JudgeHistory'?true:false}/> */}
                            <Button style={{ margin: '0 0 0 0px', width: "60px", float: "left" }} onClick={this.handleSourceClickClear} className="btn_ok" disabled={toConfigure === 'JudgeHistory' ? true : false}>
                                添加
                            </Button>
                            <Button style={{ margin: '0 0 0 0px', width: "60px", float: "right" }} onClick={this.showDeleteModal} className="btn_delete" disabled={toConfigure === 'JudgeHistory' ? true : false}>
                                删除
                            </Button>
                            <Modal style={{ top: "38%" }}
                                title="提示"
                                visible={this.state.deletevisible}
                                footer={null}
                                maskClosable={false}
                                closable={false}
                            >
                                <p style={{ fontSize: "16px", }}>是否删除选中项？</p>
                                <p style={{ marginTop: "20px", textAlign: "center" }}>
                                    <Button style={{ margin: '0 20px 0 0 ', width: "80px" }} onClick={this.clickDelete} className="btn_ok">
                                        确定
                                    </Button>
                                    <Button style={{ margin: '', width: "80px" }} onClick={this.handleCanceldelete} className="btn_delete">
                                        取消
                                    </Button>
                                </p>

                            </Modal>
                        </div>
                    </div>
                    <div style={clear}></div>
                </div>
                <div style={{ padding: "15px" }}>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={data}
                        bordered
                        pagination={this.state.pagination}
                        locale={{ emptyText: '暂无数据' }}
                        key="Trafviolate"
                    />
                </div>
                <Modal
                    title="交通违法情况"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    key={this.state.modalKey}
                    width='45%'
                    style={{ top: '5%' }}
                >
                    <Form>
                        <div style={{ float: 'left', width: '47%' }}>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="档案编号"
                                    hasFeedback
                                >
                                    {getFieldDecorator('archivenum', {
                                        rules: [{
                                            required: true, message: '请输入!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.archivenum : '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="车牌"
                                    hasFeedback
                                >
                                    {getFieldDecorator('licenseplate', {
                                        rules: [{
                                            required: true, message: '请输入!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.licenseplate : '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="归属人"
                                    hasFeedback
                                >
                                    {getFieldDecorator('owner', {
                                        rules: [{
                                            required: true, message: '请输入!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.owner : '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="违法时间"
                                    hasFeedback
                                >
                                    {getFieldDecorator('illegaltime', {
                                        rules: [{
                                            required: true, message: '请输入!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? moment(this.state.record.illegaltime) : '',
                                        validateFirst: true
                                    })(
                                        <DatePicker  placeholder="" format='YYYY-MM-DD' allowClear={false} width={{ width: "323px" }} />
                                        )}
                                </FormItem>
                            </div>

                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="违法地点"
                                    hasFeedback
                                >
                                    {getFieldDecorator('illegaladdr', {
                                        rules: [{
                                            required: true, message: '请输入!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.illegaladdr : '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="违法事件"
                                    hasFeedback
                                >
                                    {getFieldDecorator('illegalevent', {
                                        rules: [{
                                            required: true, message: '请输入!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.illegalevent : '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="违法级别"
                                    hasFeedback
                                >
                                    {getFieldDecorator('illegalscore', {
                                        rules: [{
                                            required: true, message: '请输入!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.illegalscore : '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="驾驶证号"
                                    hasFeedback
                                >
                                    {getFieldDecorator('drvlicense', {
                                        rules: [{
                                            required: true, message: '请输入!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.drvlicense : '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="当事人"
                                    hasFeedback
                                >
                                    {getFieldDecorator('party', {
                                        rules: [{
                                            required: true, message: '请输入!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.party : '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="地区"
                                    hasFeedback
                                >
                                    {getFieldDecorator('district', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.district : '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="地址"
                                    hasFeedback
                                >
                                    {getFieldDecorator('address', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.address : '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </div>
                        </div>
                        <div style={{ float: "right", width: '47%' }}>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="联系电话"
                                    hasFeedback
                                >
                                    {getFieldDecorator('telno', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.telno : '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="罚款"
                                    hasFeedback
                                >
                                    {getFieldDecorator('finemoney', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.finemoney : '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="实际上"
                                    hasFeedback
                                >
                                    {getFieldDecorator('infact', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.infact : '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="理论"
                                    hasFeedback
                                >
                                    {getFieldDecorator('theory', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.theory : '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="滞纳金"
                                    hasFeedback
                                >
                                    {getFieldDecorator('latefee', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.latefee : '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="警员"
                                    hasFeedback
                                >
                                    {getFieldDecorator('policeman', {
                                        rules: [{
                                            required: true, message: '请输入!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.policeman : '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="发现"
                                    hasFeedback
                                >
                                    {getFieldDecorator('discoveorgan', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.discoveorgan : '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="处理机关名称"
                                    hasFeedback
                                >
                                    {getFieldDecorator('disposetime', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.disposetime : '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="支付时间"
                                    hasFeedback
                                >
                                    {getFieldDecorator('paytime', {

                                        initialValue: this.state.modalType === 'edit' ? moment(this.state.record.paytime) : '',
                                        validateFirst: true
                                    })(
                                        <DatePicker  placeholder="" format='YYYY-MM-DD HH:mm:ss' allowClear={false} style={{ width: '323px' }} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="记录员"
                                    hasFeedback
                                >
                                    {getFieldDecorator('recordpeople', {
                                        rules: [{
                                            required: true, message: '请输入!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.recordpeople : '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="记录时间"
                                    hasFeedback
                                >
                                    {getFieldDecorator('recordtime', {

                                        initialValue: this.state.modalType === 'edit' ? moment(this.state.record.recordtime) : '',
                                        validateFirst: true
                                    })(
                                        <DatePicker  placeholder="" format='YYYY-MM-DD HH:mm:ss' allowClear={false} showTime={true} style={{ width: "323px" }} />
                                        )}
                                </FormItem>
                            </div>
                        </div>
                        <div style={{ clear: 'both' }}></div>
                        <Row>
                            <Col span={14} style={{ textAlign: 'right' }}>
                                <Button htmlType="submit" className="btn_ok" onClick={this.saveModel}>保存</Button>
                                <Button style={{ marginLeft: 30 }} onClick={this.handleCancel} className="btn_delete">取消</Button>

                            </Col>
                        </Row>

                    </Form>
                </Modal>
            </div>
        );
    }
}

//违法犯罪
class Criminal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            modalKey: 1,
            modalType: '',
            selectedRows: [],
            selectedRowsId: [],
            deletevisible: '',
            record: '',
            pagination: pagination
        }
    }
    //刷新
    forceFun = () => {
        this.forceUpdate();
    }
    //违法犯罪前科
    handleSourceClickClear = () => {
        this.setState({
            visible: true,
            modalType: 'add',
        });
    }
    editShowModal = (record) => {
        this.setState({
            visible: true,
            modalType: 'edit',
            record: record
        });
    }
    //模态框 取消
    handleCancel = () => {
        this.setState({
            visible: false,
            modalKey: this.state.modalKey + 1
        });
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
                        bg_type: '',
                        name: values.name ? values.name : '',
                        sex: values.sex ? values.sex : '',
                        remarks: values.remarks ? values.remarks : '',
                        idcard: values.idcard ? values.idcard : '',
                        nation: values.nation ? values.nation : '',
                        census: values.census ? values.census : '',
                        liveaddr: values.liveaddr ? values.liveaddr : '',
                        cencusdist: values.cencusdist ? values.cencusdist : '',
                        livedist: values.livedist ? values.livedist : '',
                        JYAQ: values.JYAQ ? values.JYAQ : '',
                        AJLB: values.AJLB ? values.AJLB : '',

                    }
                    store.dispatch(addCriminalData(creds));
                } else {
                    let creds = {
                        id: this.state.record.id,
                        bg_type: '',
                        name: values.name ? values.name : this.state.record.name,
                        sex: values.sex ? values.sex : this.state.record.sex,
                        remarks: values.remarks ? values.remarks : this.state.record.remarks,
                        idcard: values.idcard ? values.idcard : this.state.record.idcard,
                        nation: values.nation ? values.nation : this.state.record.nation,
                        census: values.census ? values.census : this.state.record.census,
                        liveaddr: values.liveaddr ? values.liveaddr : this.state.record.liveaddr,
                        cencusdist: values.cencusdist ? values.cencusdist : this.state.record.cencusdist,
                        livedist: values.livedist ? values.livedist : this.state.record.livedist,
                        JYAQ: values.JYAQ ? values.JYAQ : this.state.record.JYAQ,
                        AJLB: values.AJLB ? values.AJLB : this.state.record.AJLB,
                    }
                    store.dispatch(editCriminalData(creds));

                }
                this.setState({
                    visible: false,
                    modalKey: this.state.modalKey + 1
                });

            }
        })

    }
    //删除
    showDeleteModal = () => {
        this.setState({
            deletevisible: true,
        });
    }
    //确认删除事件
    clickDelete = () => {
        let selectedRows = this.state.selectedRows;
        let selectedRowsId = this.state.selectedRowsId;
        if (this.state.selectedRows.length === 0) {
            message.error('提示：请选择要删除的项！');
            return;
        }
        for (let i = 0; i < selectedRows.length; i++) {
            let obj = selectedRows[i];
            store.dispatch(deleteCriminalData(obj));
        }

        this.setState({
            deletevisible: false,
            selectedRowsId: [],
        });

    }
    handleCanceldelete = () => {
        this.setState({
            deletevisible: false,
        });
    }
    //身份证校验
    testid = (rule, value, callback) => {
        let reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if (!reg.test(value)) {
            callback('身份证号码不合规', 'input Spaces, please check');
            return;
        }
        callback();
        return;
    }
    render() {
        let criminalList = this.props.criminalList;
        let isFetching = this.props.isFetching;
        let toConfigure = this.props.toConfigure;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16
            }
        };
        // let divList = [];
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
        }, {
            title: '性别',
            dataIndex: 'sex',
        }, {
            title: '身份证号',
            dataIndex: 'idcard',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
                    <span onClick={(e) => this.editShowModal(record)} style={{ cursor: 'pointer' }}>{toConfigure === 'JudgeHistory' ? '详情' : '编辑'}</span>
                </span>
            ),
        }];
        const data = [];
        if (criminalList !== null) {
            for (let i = 0; i < criminalList.length; i++) {
                let criminal = criminalList[i];
                data.push({
                    id: criminal.id,
                    bg_type: criminal.bg_type,
                    name: criminal.name,
                    remarks: criminal.remarks,
                    idcard: criminal.idcard,
                    nation: criminal.nation,
                    census: criminal.census,
                    liveaddr: criminal.liveaddr,
                    cencusdist: criminal.cencusdist,
                    livedist: criminal.livedist,
                    JYAQ: criminal.JYAQ,
                    AJLB: criminal.AJLB,
                    sex: criminal.sex,
                    key: criminal.id,
                });

            }
        }
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                // const ids = [];
                // for (var i = 0; i < selectedRows.length; i++) {
                //     var selectedRow = selectedRows[i];
                //     ids.push(selectedRow.id);
                // }
                // console.log('ids',ids);
                this.setState({
                    selectedRowsId: selectedRowKeys,
                    selectedRows: selectedRows,
                });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
        };

        // if(domicilePlaceList !== null) {
        //     for (var i = 0; i < domicilePlaceList.length; i++) {
        //         let divData = domicilePlaceList[i];
        //         divList.push(
        //             <InsoDIv divData={divData} forceFun={this.forceFun}/>
        //         );
        //     }
        // }
        return (
            <div>
                {/*标题*/}
                <div style={titleBg}>
                    <div>
                        <span style={{ fontSize: "16px", color: "#fff" }}>违法犯罪</span>
                        {toConfigure === 'JudgeHistory' ? '' :
                            <div style={{ float: "right", width: "150px" }}>
                                {/* <ShallowBlueBtn text="添加" width="60px" float="left" onClick={this.handleSourceClickClear} disabled = {toConfigure === 'JudgeHistory'?true:false}/> */}
                                <Button style={{ margin: '0 0 0 0px', width: "60px", float: "left" }} onClick={this.handleSourceClickClear} className="btn_ok" >
                                    添加
                            </Button>
                                <Button style={{ margin: '0 0 0 0px', width: "60px", float: "right" }} onClick={this.showDeleteModal} className="btn_delete">
                                    删除
                            </Button>
                                <Modal style={{ top: "38%" }}
                                    title="提示"
                                    visible={this.state.deletevisible}
                                    footer={null}
                                    maskClosable={false}
                                    closable={false}
                                >
                                    <p style={{ fontSize: "16px", }}>是否删除选中项？</p>
                                    <p style={{ marginTop: "20px", textAlign: "center" }}>
                                        <Button style={{ margin: '0 20px 0 0 ', width: "80px" }} onClick={this.clickDelete} className="btn_ok">
                                            确定
                                    </Button>
                                        <Button style={{ margin: '', width: "80px" }} onClick={this.handleCanceldelete} className="btn_delete">
                                            取消
                                    </Button>
                                    </p>

                                </Modal>
                            </div>}
                    </div>
                    <div style={clear}></div>
                </div>

                <div style={{ padding: '15px' }}>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={data}
                        bordered
                        pagination={this.state.pagination}
                        locale={{ emptyText: '暂无数据' }}
                        loading={isFetching}
                        key="Criminal"
                    />
                </div>
                <Modal
                    title="违法犯罪"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    key={this.state.modalKey}
                    style={{ top: '2%' }}
                >
                    <Form>
                        <div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="姓名"
                                    hasFeedback
                                >
                                    {getFieldDecorator('name', {
                                        rules: [{
                                            required: true, message: '请输入!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.name : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>

                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="性别"
                                    hasFeedback
                                >
                                    {getFieldDecorator('sex', {
                                        rules: [{
                                            required: true, message: '请输入!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.sex : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>

                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="身份证号"
                                    hasFeedback
                                >
                                    {getFieldDecorator('idcard', {
                                        rules: [{
                                            required: true, message: '请输入身份证!',
                                        }, {
                                            validator: this.testid
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.idcard : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="民族"
                                    hasFeedback
                                >
                                    {getFieldDecorator('nation', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.nation : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>



                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="户籍地详址"
                                    hasFeedback
                                >
                                    {getFieldDecorator('census', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.census : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="户籍地划分"
                                    hasFeedback
                                >
                                    {getFieldDecorator('cencusdist', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.cencusdist : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="居住地详址"
                                    hasFeedback
                                >
                                    {getFieldDecorator('liveaddr', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.liveaddr : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="居住地划分"
                                    hasFeedback
                                >
                                    {getFieldDecorator('livedist', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.livedist : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>

                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="案件类型"
                                    hasFeedback
                                >
                                    {getFieldDecorator('AJLB', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.AJLB : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="案件详情"
                                    hasFeedback
                                >
                                    {getFieldDecorator('JYAQ', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.JYAQ : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="备注"
                                    hasFeedback
                                >
                                    {getFieldDecorator('remarks', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.remarks : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                        </div>
                        <div style={{ clear: 'both' }}></div>
                        {toConfigure === 'JudgeHistory' ? '' :
                            <Row>
                                <Col span={16} style={{ textAlign: 'right' }}>
                                    <Button htmlType="submit" className="btn_ok" onClick={this.saveModel}>保存</Button>
                                    <Button style={{ marginLeft: 30 }} onClick={this.handleCancel} className="btn_delete">取消</Button>

                                </Col>
                            </Row>}

                    </Form>
                </Modal>
            </div>
        );
    }
}


//表格样式
const tableStyle = {
    width: "98%",
    margin: "0 auto",
    border: "1px solid rgb(12, 95, 147)",
    // background:"rgba(12, 95, 147,0.4)"
    textAlign: "center",
    borderCollapse: "collapse",
    fontSize: "14px",
    color: "#fff"
}
const tdStyle = {
    border: "1px solid rgb(12, 95, 147)",
    height: "40px",
}
const thStyle = {
    border: "1px solid rgb(12, 95, 147)",
    height: "40px",
    background: "#021855",
}
const mStyle = {
    fontSize: "14px", color: "#fff", marginRight: "20px", width: "56px", float: "left", textAlign: "right"
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
const bgDiv = {
    background: "rgba(25, 41, 85, 0.498039)",
    padding: "15px"
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
//下拉组件
BgInformation = Form.create()(BgInformation);
IllegalCrime = Form.create()(IllegalCrime);
DomicilePlace = Form.create()(DomicilePlace);
Drug = Form.create()(Drug);
Trafviolate = Form.create()(Trafviolate);
Criminal = Form.create()(Criminal);
export default connect(mainReducer)(BgInformation);