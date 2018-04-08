/**
 * 研判报告银行信息
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
    FileBtn
} from "../generalPurposeModule";
import {
    DatePicker,
    Spin,
    Table,
    message,
    Input,
    InputNumber,
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
import {
    changeShade
} from "../../actions/actions";
import { store } from '../../index.js';
import { saveBankInformationData, fetchBankInformationData, addbankInformationData, editBankInformationData, deleteBankInformationData } from "../../actions/AuditReport"
import { dateFormat } from '../../utils/index';
import moment from 'moment';
import 'moment/locale/zh-cn';
import * as constants from "../../utils/Constants";
import { changeMenu } from "../../actions/actions";
import { uuid } from "../../utils/Uuid";

require('../../utils/Utils');

const FormItem = Form.Item;
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
export class BankInformation extends Component {
    constructor(props) {
        super(props);
        this.clickDelete = this.clickDelete.bind(this);
        this.state = {
            imgPath: "",
            img: "",
            ModalDialogueShow: 'none',
            bankInformationList: store.getState().AuditReport.data.bankInformationList,
            modalKey: 1,
            modalType: '',
            record: '',
            deletevisible: false,
            t_judge_record_bank_id: '',
            trade_type: '',
            trade_amount: '',
            opposite_unitname: '',
            opposite_account: '',
            opposite_personname: '',
            trade_time: '',
            selectedRows: [],
            selectedRowsId: [],
            pagination: pagination,
            toConfigure: store.getState().AuditReport.data.toConfigure,
        }
    }
    //加载
    componentDidMount() {
        //取状态树上的值
        let bankInformationList = store.getState().AuditReport.data.bankInformationList;
        let toConfigure = this.state.toConfigure;
        //判断是否有值，没有就从后台接口拿
        if (toConfigure === "") {//判断是不是修改的时候
            if (bankInformationList === null) {
                //取传过来的idNumber,做查询用
                let creds = {
                    pd: {
                        idcard: this.props.idcard,
                    },

                }
                //根据查询条件取值
                store.dispatch(fetchBankInformationData(creds));
            }
            //改变状态
            this.setState({
                bankInformationList: bankInformationList,
            });
        } else {
            this.setState({
                bankInformationList: bankInformationList,
            });
        }

    }
    //组件props发生变化，更新state
    componentWillReceiveProps(nextProps) {
        let bankInformationList = nextProps.AuditReport.data.bankInformationList;//更新状态树
        let toConfigure = nextProps.AuditReport.data.toConfigure;
        this.setState({
            bankInformationList: bankInformationList,
            toConfigure: toConfigure,
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
    // 刷新
    forceFun = () => {
        this.forceUpdate();
    }
    // 添加按钮modal
    handleClickClear = () => {
        this.setState({
            visible: true,
            modalType: 'add',
        });
    }
    // 添加按钮modal
    editShowModal = (record) => {
        this.setState({
            visible: true,
            modalType: 'edit',
            record: record
        });
    }
    // 关闭按钮modal
    handleCancel = () => {
        this.setState({
            visible: false,
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
        let selectedRowsId = this.state.selectedRowsId;
        if (this.state.selectedRows.length === 0) {
            message.error('提示：请选择要删除的项！');
            return;
        }
        for (let i = 0; i < selectedRows.length; i++) {
            let obj = selectedRows[i];
            store.dispatch(deleteBankInformationData(obj));
        }

        this.setState({
            deletevisible: false,
            selectedRowsId: [],
        });

    }
    // 删除是modal状态
    handleCanceldelete = () => {
        this.setState({
            deletevisible: false,
        });
    }
    //保存到状态树中
    savebankModel = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            let userItem = JSON.parse(sessionStorage.getItem('user'));
            if (!err) {
                if (this.state.modalType === 'add') {
                    let creds = {
                        id: uuid(),
                        idcard: values.idcard ? values.idcard : '',
                        trade_type: values.trade_type ? values.trade_type : '',
                        trade_amount: values.trade_amount ? values.trade_amount : '',
                        opposite_unitname: values.opposite_unitname ? values.opposite_unitname : '',
                        opposite_account: values.opposite_account ? values.opposite_account : '',
                        opposite_personname: values.opposite_personname ? values.opposite_personname : '',
                        trade_time: values['trade_time'].format('YYYY-MM-DD HH:mm:ss'),
                        bank_type: values.bank_type ? values.bank_type : '',
                        deposit_bank: values.deposit_bank ? values.deposit_bank : '',
                        deposit_time: values.deposit_time ? values['deposit_time'].format('YYYY-MM-DD HH:mm:ss') : '',
                        deposit_card: values.deposit_card ? values.deposit_card : '',

                    }
                    store.dispatch(addbankInformationData(creds));
                } else {
                    let creds = {
                        id: this.state.record.id,
                        idcard: values.idcard ? values.idcard : this.state.record.idcard,
                        trade_type: values.trade_type ? values.trade_type : this.state.record.trade_type,
                        trade_amount: values.trade_amount ? values.trade_amount : this.state.record.trade_amount,
                        opposite_unitname: values.opposite_unitname ? values.opposite_unitname : this.state.record.opposite_unitname,
                        opposite_account: values.opposite_account ? values.opposite_account : this.state.record.opposite_account,
                        opposite_personname: values.opposite_personname ? values.opposite_personname : this.state.record.opposite_personname,
                        trade_time: values['trade_time'].format('YYYY-MM-DD HH:mm:ss') ? values['trade_time'].format('YYYY-MM-DD HH:mm:ss') : this.state.record.trade_time,
                        bank_type: values.bank_type ? values.bank_type : this.state.record.bank_type,
                        deposit_bank: values.deposit_bank ? values.deposit_bank : this.state.record.deposit_bank,
                        deposit_time: values.deposit_time ? values['deposit_time'].format('YYYY-MM-DD HH:mm:ss') : this.state.record.deposit_time,
                        deposit_card: values.deposit_card ? values.deposit_card : this.state.record.deposit_card,

                    }
                    store.dispatch(editBankInformationData(creds));

                }
                this.setState({
                    visible: false,
                    modalKey: this.state.modalKey + 1
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
    // 交易金额长度验证
    testTrade = (rule, value, callback) => {
        let reg = /^(?=\d+.?\d+$)[\d.]{0,15}$/;
        if (!reg.test(value)) {
            callback('输入的数字不能超过15位', 'input Spaces, please check');
            return;
        }
        callback();
        return;
    }
    // 设置交易时间，点击确定按钮时选择当前时间
    tradeTimeOk = (e) => {
        if (e === undefined) {
            this.props.form.setFieldsValue({
                trade_time: moment(),
            });
        }
    }
    // 设置存款时间，点击确定按钮时选择当前时间
    depositTimeOk = (e) => {
        if (e === undefined) {
            this.props.form.setFieldsValue({
                deposit_time: moment(),
            });
        }
    }
    render() {
        let bankInformationList = this.state.bankInformationList;
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
            title: '交易类型',
            dataIndex: 'trade_type',
        }, {
            title: '交易金额',
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
                    <span onClick={(e) => this.editShowModal(record)} style={{ cursor: 'pointer' }}>{toConfigure === 'JudgeHistory' ? '详情' : '编辑'}</span>
                </span>
            ),
        }];
        const data = [];
        if (bankInformationList !== null) {
            for (var i = 0; i < bankInformationList.length; i++) {//取数据
                var bankInformation = bankInformationList[i];

                data.push({
                    // key: i,
                    // t_judge_record_bank_id: bankInformation.t_judge_record_bank_id,
                    trade_type: bankInformation.trade_type,
                    trade_amount: bankInformation.trade_amount,
                    opposite_unitname: bankInformation.opposite_unitname,
                    opposite_account: bankInformation.opposite_account,
                    opposite_personname: bankInformation.opposite_personname,
                    trade_time: bankInformation.trade_time,
                    id: bankInformation.id,
                    idcard: bankInformation.idcard,
                    bank_type: bankInformation.bank_type,
                    deposit_bank: bankInformation.deposit_bank,
                    deposit_time: bankInformation.deposit_time,
                    deposit_card: bankInformation.deposit_card,
                    key: bankInformation.id,
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

            <div style={{ marginTop: "30px" }}>
                <div>
                    {/*银行信息的标题*/}
                    <div style={titleBg}>
                        <div>
                            <span style={{ fontSize: "16px", color: "#fff" }}>银行信息</span>
                            {toConfigure === 'JudgeHistory' ? '' :
                                <div style={{ float: "right", width: "150px" }}>
                                    {/* <ShallowBlueBtn text="添加" width="60px" float="left" onClick={this.handleClickClear} /> */}
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
                                </div>}
                        </div>
                        <div style={clear}></div>
                    </div>
                    {/*银行信息*/}
                    <div style={{ padding: "15px" }}>
                        {/*把当前状态传给表格*/}
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={data}
                            bordered
                            pagination={this.state.pagination}
                            locale={{ emptyText: '暂无数据' }}
                            key="bankInformationTable"
                        />
                        <div style={{ margin: "15px 0" }}>
                            <ShallowBlueBtn text="下一步" onClick={this.handleNextClickClear} width="80px" float="right" />
                            <div style={clear}></div>
                        </div>
                    </div>

                </div>
                {/*遮罩层*/}
                {/* <ModalDialogue width="433px"  isShow={this.state.ModalDialogueShow} changeStatus={this.handChangeModalDialogueShow} /> */}
                <Modal
                    title="银行信息"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    key={this.state.modalKey}
                    width="45%"
                >
                    <Form>
                        <div style={{ float: 'left', width: '47%' }}>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="交易类型"
                                    hasFeedback
                                >
                                    {getFieldDecorator('trade_type', {
                                        rules: [{
                                            required: true, message: '请输入交易类型!',
                                        },{
                                            max: 25, message: '长度不能超过25!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.trade_type : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="交易金额"
                                    hasFeedback
                                >
                                    {getFieldDecorator('trade_amount', {
                                        rules: [{
                                            required: true, message: '请输入交易金额大于等于0的数字!',
                                        },{
                                            validator: this.testTrade
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.trade_amount : '',
                                        validateFirst: true
                                    })(
                                        <InputNumber disabled={toConfigure === 'JudgeHistory' ? true : false} style={{ width: "100%" }} min={0} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="对方交易单位"
                                    hasFeedback
                                >
                                    {getFieldDecorator('opposite_unitname', {
                                        rules: [{
                                            required: true, message: '请输入对方交易单位!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.opposite_unitname : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="对方帐号"
                                    hasFeedback
                                >
                                    {getFieldDecorator('opposite_account', {
                                        rules: [{
                                            required: true, message: '请输入对方帐号!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.opposite_account : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="对方交易人"
                                    hasFeedback
                                >
                                    {getFieldDecorator('opposite_personname', {
                                        rules: [{
                                            required: true, message: '请输入对方交易人!',
                                        },{
                                            max: 15, message: '长度不能超过15!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? this.state.record.opposite_personname : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="交易时间"
                                    hasFeedback
                                >
                                    {getFieldDecorator('trade_time', {
                                        rules: [{
                                            required: true, message: '请输入交易时间!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? moment(this.state.record.trade_time) : '',
                                        validateFirst: true
                                    })(
                                        <DatePicker allowClear={false} showTime={true}
                                            format='YYYY-MM-DD HH:mm:ss' onOk={this.tradeTimeOk} style={{ width: "100%" }} disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                        </div>
                        <div style={{ float: 'right', width: '47%' }}>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="身份证号"
                                    hasFeedback
                                >
                                    {getFieldDecorator('idcard', {
                                        rules: [{
                                            required: true, message: '请输入身份证号!',
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
                                    label="银行类型"
                                    hasFeedback
                                >
                                    {getFieldDecorator('bank_type', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.bank_type : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="存款类型"
                                    hasFeedback
                                >
                                    {getFieldDecorator('deposit_bank', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.deposit_bank : '',
                                        validateFirst: true
                                    })(
                                        <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="存款时间"
                                    hasFeedback
                                >
                                    {getFieldDecorator('deposit_time', {
                                        rules: [{
                                            required: true, message: '请输入存款时间!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' && this.state.record.deposit_time !== '' ? moment(this.state.record.deposit_time) : '',
                                        validateFirst: true
                                    })(
                                        <DatePicker allowClear={false} showTime={true}
                                            format='YYYY-MM-DD HH:mm:ss' onOk={this.depositTimeOk} style={{ width: "100%" }} disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                        )}
                                </FormItem>
                            </div>
                            <div className="formItemLeft">
                                <FormItem
                                    {...formItemLayout}
                                    label="存款卡号"
                                    hasFeedback
                                >
                                    {getFieldDecorator('deposit_card', {

                                        initialValue: this.state.modalType === 'edit' ? this.state.record.deposit_card : '',
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
                                    <Button htmlType="submit" onClick={this.savebankModel} className="btn_ok">保存</Button>
                                    <Button style={{ marginLeft: 30 }} onClick={this.handleCancel} className="btn_delete">取消</Button>

                                </Col>
                            </Row>}

                    </Form>
                </Modal>

            </div>

        );
    }
};

const mStyle = {
    fontSize: "14px", color: "#fff", marginRight: "20px", width: "56px", float: "left", textAlign: "right"
}
//表格样式
const tableStyle = {
    width: "98%",
    margin: "0 auto",
    border: "1px solid rgb(12, 95, 147)",
    //background:"rgba(12, 95, 147,0.4)"
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
BankInformation = Form.create()(BankInformation);
export default connect(mainReducer)(BankInformation);