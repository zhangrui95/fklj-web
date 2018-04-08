/**
 * 研判报告网上通联信息
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
import { saveOnlineInformationData, fetchOnlineInformationData, addOnlineInformationData, editOnlineInformationData, deleteOnlineInformationData } from "../../actions/AuditReport"
import * as constants from "../../utils/Constants";
import { changeMenu } from "../../actions/actions";

import { uuid } from "../../utils/Uuid";
// import { start } from 'repl';
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

export class OnlineInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onlineInformationList: store.getState().AuditReport.data.onlineInformationList,
            nowPage: 1,
            modalKey: 1,
            modalType: '',
            record: '',
            deletevisible: false,
            account_type: '',
            account_number: '',
            nickname: '',
            selectedRows: [],
            selectedRowsId: [],
            pagination: pagination,
            toConfigure: store.getState().AuditReport.data.toConfigure,
        }
    }
    componentDidMount() {
        let onlineInformationList = store.getState().AuditReport.data.onlineInformationList;
        let toConfigure = this.state.toConfigure;
        if (toConfigure === "") {//判断是不是修改的时候
            if (onlineInformationList === null) {
                //let search = "idNumber="+this.props.idNumber;
                let creds = {
                    pd: {
                        idcard: this.props.idcard,
                    },

                }
                store.dispatch(fetchOnlineInformationData(creds));
            }
            this.setState({
                onlineInformationList: onlineInformationList
            });
        } else {
            this.setState({
                onlineInformationList: onlineInformationList
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        let onlineInformationList = nextProps.AuditReport.data.onlineInformationList;
        let toConfigure = nextProps.AuditReport.data.toConfigure;
        this.setState({
            onlineInformationList: onlineInformationList,
            toConfigure: toConfigure,
        });
    }
    // 添加modal
    handleClickClear = () => {
        this.setState({
            visible: true,
            modalType: 'add'
        });
    }
    // 修改modal
    editShowModal = (record) => {
        this.setState({
            visible: true,
            modalType: 'edit',
            record: record
        });
    }
    // 关闭modal
    handleCancel = () => {
        this.setState({
            visible: false,
            modalKey: this.state.modalKey + 1
        });
    }
    //删除modal显示事件
    showDeleteModal = () => {
        this.setState({
            deletevisible: true,
        });
    }
    // 删除确定事件
    clickDelete = () => {
        let selectedRows = this.state.selectedRows;
        let selectedRowsId = this.state.selectedRowsId;
        if (this.state.selectedRows.length === 0) {
            message.error('提示：请选择要删除的项！');
            return;
        }
        for (let i = 0; i < selectedRows.length; i++) {
            let obj = selectedRows[i];
            store.dispatch(deleteOnlineInformationData(obj));
        }
        this.setState({
            deletevisible: false,
            selectedRowsId: [],
        });
    }
    deleteCancel = () => {
        this.setState({
            deletevisible: false,
        });
    }
    //保存
    saveOnlineModel = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let userItem = JSON.parse(sessionStorage.getItem('user'));
            if (!err) {
                if (this.state.modalType === 'add') {
                    let creds = {
                        id: uuid(),
                        nickname: values.nickname ? values.nickname : '',
                        account_type: values.account_type ? values.account_type : '',
                        account_number: values.account_number ? values.account_number : '',
                        idcard: values.idcard ? values.idcard : ''
                    }
                    store.dispatch(addOnlineInformationData(creds));
                    // store.getState().AuditReport.data.onlineInformationList.unshift(creds);
                } else {
                    // let onlineInformationList = store.getState().AuditReport.data.onlineInformationList;
                    // let online;
                    // for (let i = 0; i < onlineInformationList.length; i++) {
                    //     online = onlineInformationList[i]
                    //     if (online.id === this.state.record.id) {
                    let creds = {
                        id: this.state.record.id,
                        nickname: values.nickname ? values.nickname : this.state.record.nickname,
                        account_type: values.account_type ? values.account_type : this.state.record.account_type,
                        account_number: values.account_number ? values.account_number : this.state.record.account_number,
                        idcard: values.idcard ? values.idcard : this.state.record.idcard,
                    };
                    store.dispatch(editOnlineInformationData(creds));

                    //     }
                    // }

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

    render() {
        let onlineInformationList = this.state.onlineInformationList;
        let isFetching = store.getState().AuditReport.isFetching;
        let toConfigure = this.state.toConfigure;
        let nowPage = this.state.nowPage;
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
            title: '身份证号',
            dataIndex: 'idcard',
        }, {
            title: '账号类型',
            dataIndex: 'account_type',
        }, {
            title: '通信账号',
            dataIndex: 'account_number',
        }, {
            title: '常用昵称',
            dataIndex: 'nickname',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
                    <span onClick={(e) => this.editShowModal(record)} style={{ cursor: 'pointer' }}>{toConfigure === 'JudgeHistory' ? '详情' : '编辑'}</span>
                </span>
            ),
        }];
        const data = [];
        // let recordNumber = parseInt((nowPage - 1) * 10);
        if (onlineInformationList !== null) {
            for (var i = 0; i < onlineInformationList.length; i++) {
                var onlineInformation = onlineInformationList[i];
                // let serial = recordNumber + i + 1;
                data.push({
                    //  serial: serial,
                    id: onlineInformation.id,
                    account_type: onlineInformation.account_type,
                    account_number: onlineInformation.account_number,
                    nickname: onlineInformation.nickname,
                    idcard: onlineInformation.idcard,
                    key: onlineInformation.id,
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
                    {/*网上联通信息的标题*/}
                    <div style={titleBg}>
                        <div>
                            <span style={{ fontSize: "16px", color: "#fff" }}>网上通联信息</span>
                            {toConfigure === 'JudgeHistory' ? '' :
                                <div style={{ float: "right", width: "150px" }}>
                                    {/* <ShallowBlueBtn text="添加"  width="60px" float="left" onClick={this.handleClickClear} /> */}
                                    <Button style={{ margin: '0 0 0 0px', width: "60px", float: "left" }} onClick={this.handleClickClear} className="btn_ok" >
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
                                        onCancel={this.deleteCancel}
                                    >
                                        <p style={{ fontSize: "16px", }}>是否删除选中项？</p>
                                        <p style={{ marginTop: "20px", textAlign: "center" }}>
                                            <Button style={{ margin: '0 20px 0 0 ', width: "80px" }} onClick={this.clickDelete} className="btn_ok">
                                                确定
                                        </Button>
                                            <Button style={{ margin: '', width: "80px" }} onClick={this.deleteCancel} className="btn_delete">
                                                取消
                                        </Button>
                                        </p>

                                    </Modal>
                                    <div style={{ clear: "both" }}></div>
                                </div>}
                        </div>
                        <div style={clear}></div>
                    </div>
                    {/*网上联通信息*/}
                    <div style={{ padding: "15px" }}>
                        {isFetching === true ?
                            <div style={{ textAlign: "center", position: "absolute", left: "45%", top: "50%" }}>
                                <Spin size="large" />
                            </div> :
                            <Table
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={data}
                                bordered
                                pagination={this.state.pagination}
                                locale={{ emptyText: '暂无数据' }}
                                key="onlineInformationTable"
                            />}

                        <div style={{ margin: "15px 0" }}>
                            <ShallowBlueBtn text="下一步" onClick={this.handleNextClickClear} width="80px" float="right" />
                            <div style={clear}></div>
                        </div>
                    </div>

                </div>
                {/*遮罩层*/}
                {/* <ModalDialogue width="433px"  isShow={this.state.ModalDialogueShow} changeStatus={this.handChangeModalDialogueShow} /> */}
                <Modal
                    title="网上通联信息"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    key={this.state.modalKey}
                >
                    <Form>
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
                                label="账号类型"
                                hasFeedback
                            >
                                {getFieldDecorator('account_type', {
                                    rules: [{
                                        required: true, message: '请输入账号类型!',
                                    },{
                                        max: 25, message: '长度不能超过25!',
                                    }],
                                    initialValue: this.state.modalType === 'edit' ? this.state.record.account_type : '',
                                    validateFirst: true
                                })(
                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                    )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="通信账号"
                                hasFeedback
                            >
                                {getFieldDecorator('account_number', {
                                    rules: [{
                                        required: true, message: '请输入通信账号!',
                                    }],
                                    initialValue: this.state.modalType === 'edit' ? this.state.record.account_number : '',
                                    validateFirst: true
                                })(
                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                    )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="常用昵称"
                                hasFeedback
                            >
                                {getFieldDecorator('nickname', {
                                    rules: [{
                                        required: true, message: '请输入通常用昵称!',
                                    },{
                                        max: 30, message: '长度不能超过30!',
                                    }],
                                    initialValue: this.state.modalType === 'edit' ? this.state.record.nickname : '',
                                    validateFirst: true
                                })(
                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                    )}
                            </FormItem>
                        </div>
                        {toConfigure === 'JudgeHistory' ? '' :
                            <Row>
                                <Col span={16} style={{ textAlign: 'right' }}>
                                    <Button htmlType="submit" onClick={this.saveOnlineModel} className="btn_ok">保存</Button>
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
OnlineInformation = Form.create()(OnlineInformation);
export default connect(mainReducer)(OnlineInformation);