/**
 *卡点管理
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    mainReducer
} from "../../reducers/reducers";
import {
    postCardPointManageListHushiData, saveaddPointManagekData, saveeditPointManageData, DeletePointManageData
} from "../../actions/SystemManagement";
import {
    FileInput
} from "../../components/fileInput";
import {
    changeShade, fetchUnitTree, fetchUnitTreeData, fetchCheckpointLevelData
} from "../../actions/actions";
import { StylePage, ShallowBlueBtn, DeepRedBtn, DeepBlueBtn, PhotoItem, Pag, SelectModel, Shade } from "../generalPurposeModule";
import {
    store
} from '../../index.js';
import * as constants from "../../utils/Constants";
import { DatePicker, message, Button, Icon, Spin, Input, Modal, TreeSelect, Table, Form, Row, Col } from 'antd';
import { monthFormat, dateFormat, serverUrl, getNowFormatDate, getYmd } from '../../utils/';

import moment from 'moment';
moment.locale('zh-cn');

const { TextArea } = Input;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const FormItem = Form.Item;
const mStyle = {
    fontSize: "14px", color: "#fff", marginRight: "20px", width: "104px", float: "left", textAlign: "right"
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
    // borderRight:"1px solid rgb(12, 95, 147)",
    // borderBottom:"1px solid rgb(12, 95, 147)"
    // background:"rgba(37, 51, 100, 0.8)"
}

// 样式
const sliderdyHeader = {
    borderBottom: "1px solid #0C5F93",
    padding: "18px 0"
}
const font14 = {
    fontSize: "14px",
    color: "#fff"
}
const formItemLayouts = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
    },
};
let user = JSON.parse(sessionStorage.getItem('user'));
export class AreaManage extends Component {
    constructor(props) {  //初始化nowPage为1
        super(props);
        this.state = {
            nowPage: 1,
            ModalDialogueShow: 'none', lineId: '', customspassLine: null,
            ModalDialogueType: 'add',
            checkpoint_name: '',
            updateuser: '',
            // beginDate:moment().format('YYYY-MM-DD 00:00:00'),
            // endDate:moment().format('YYYY-MM-DD 23:59:59'),
            beginDate: '',
            endDate: '',
            selectedRowsId: [],
            loading: false,
            handleVisible: false,
            personInfo: {}

        };
        this.pageChange = this.pageChange.bind(this);
    }
    componentDidMount() {
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
            },
            showCount: 10
        }
        store.dispatch(postCardPointManageListHushiData(creds)); //暂时注释掉
        this.setState({
            loading: false
        });
        // store.dispatch(fetchCheckpointLevelData());//获取卡点等级
    }
    componentWillUnmount() {
        store.getState().SystemManagement.data.cardPointList = {
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                total: 0,
                list: [],
            },
            isFetching: false
        }
    }
    initEntity = () => {
        this.setState({
            nowPage: 1,
        })
    }
    // 打开模态框 添加
    handleChangeModol = () => {
        this.setState({
            handleVisible: true,
            modalType: 'add'
        });
    }
    // 关闭模块框
    handleChangeCancel = () => {
        this.setState({
            handleVisible: false,
        });
    }
    // 点击编辑
    editChange = (id, record) => {
        this.setState({
            personInfo: record,
            modalType: 'edit',
            handleVisible: true
        });
    }
    //查询变更
    serchChange = (checkpoint_name, beginDate, endDate, updateuser) => {
        this.setState({
            nowPage: 1,
            checkpoint_name: checkpoint_name,
            beginDate: beginDate,
            endDate: endDate,
            updateuser: updateuser,
        });
    }
    pageChange(nowPage) {
        this.state = Object.assign({}, this.state, { nowPage: nowPage });
        let creds = {
            currentPage: nowPage,
            entityOrField: true,
            pd: {
                starttime: this.state.beginDate,
                endTime: this.state.endDate,
                checkpoint_name: this.state.checkpoint_name,
                updateuser: this.state.updateuser,
            },
            showCount: 10
        }
        store.dispatch(postCardPointManageListHushiData(creds)); //getPersonList
    }
    //删除按钮点击
    handleDelete = () => {
        if (this.state.selectedRowsId.length === 0) {
            message.error('提示：请选择要删除的项！');
            return;
        }
        let crads = {
            id: this.state.selectedRowsId,
            updateuser: JSON.parse(sessionStorage.getItem('user')).user.name,
        };
        let params = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                starttime: this.state.beginDate,
                endTime: this.state.endDate,
                checkpoint_name: this.state.checkpoint_name,
                updateuser: this.state.updateuser,
            },
            showCount: 10
        }
        store.dispatch(DeletePointManageData(crads, params));
        this.setState({
            selectedRowsId: []
        });
    }
    loadchange = () => {
        this.setState({
            Loading: false
        });
    }
    // 保存
    saveModel = (e) => {
        this.setState({
            Loading: true
        });
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let userItem = JSON.parse(sessionStorage.getItem('user'));
            if (!err) {
                if (this.state.modalType === "edit") {
                    let creds = {
                        checkpoint_name: values.checkpoint_name,
                        id: values.id.toString(),
                        updateuser: values.updateuser

                    }
                    let params = {
                        currentPage: 1,
                        pd: {
                            checkpoint_name: this.state.checkpoint_name,
                            starttime: this.state.beginDate,
                            endtime: this.state.endDate,
                            updateuser: this.state.updateuser
                        },
                        showCount: 10
                    }
                    store.dispatch(saveeditPointManageData(creds, params, () => this.loadchange()));
                } else if (this.state.modalType === "add") {
                    let creds = {//表单域不一定写了所有的字段 所以要把空值通过赋值显示
                        checkpoint_name: values.checkpoint_name,
                        id: values.id.toString(),
                        updateuser: values.updateuser
                    }
                    let params = {
                        currentPage: 1,
                        pd: {
                            checkpoint_name: this.state.checkpoint_name,
                            starttime: this.state.beginDate,
                            endtime: this.state.endDate,
                            updateuser: this.state.updateuser
                        },
                        showCount: 10
                    }
                    store.dispatch(saveaddPointManagekData(creds, params, () => this.loadchange()))

                }
                this.handleChangeCancel();
                this.setState({
                    nowPage: 1
                });
            }


        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let nowPage = this.state.nowPage;
        let customsPassList = store.getState().SystemManagement.data.cardPointList.result.list;
        // let customsPassList = [];
        let page = store.getState().SystemManagement.data.cardPointList.result.page;
        let isFetching = store.getState().SystemManagement.isFetching;
        let personInfo = this.state.personInfo;
        let user = JSON.parse(sessionStorage.getItem('user'));
        console.log('user', user);
        const columns = [
            {
                title: '序号',
                dataIndex: 'serial',
            }, {
                title: '卡点名称',
                dataIndex: 'checkpoint_name',
            }
            , {
                title: '操作人',
                dataIndex: 'updateuser',
            }, {
                title: '更新时间',
                dataIndex: 'updatetime',
            }, {
                title: '操作',
                key: 'action',
                // width: 30,
                render: (text, record) => (
                    <span>
                        <span onClick={(e) => this.editChange(record.id, record)} style={{ cursor: 'pointer' }}>编辑</span>
                    </span>
                ),
            }];

        const data = [];
        let recordNumber = parseInt((nowPage - 1) * 10);
        for (var i = 0; i < customsPassList.length; i++) {
            var customspass = customsPassList[i];
            let serial = recordNumber + i + 1;
            data.push({
                key: i,
                serial: serial,
                checkpoint_name: customspass.checkpoint_name,
                updateuser: customspass.updateuser,
                updatetime: customspass.updatetime,
                id: customspass.id
            });

        }
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
        const pagination = {
            onChange: (page) => {
                this.setState({
                    nowPage: page,
                });
                let { checkpoint_name, endDate, beginDate, updateuser } = this.state;
                let creds = {
                    currentPage: page,
                    entityOrField: true,
                    pd: {
                        checkpoint_name: checkpoint_name,
                        starttime: beginDate,
                        endtime: endDate,
                        updateuser: updateuser,
                    },
                    showCount: 10
                }
                store.dispatch(postCardPointManageListHushiData(creds));
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
                            type={this.props.type}
                            serchChange={this.serchChange}
                            handleAdd={this.handleChangeModol}
                            handleDelete={this.handleDelete} />

                    </div>
                </div>
                {/*表格*/}
                {isFetching === true ?
                    <div style={{ textAlign: "center", position: "absolute", left: "45%", top: "50%" }}>
                        <Spin size="large" />
                    </div> :

                    <div>
                        <div className="z_slderRightBody">
                            <div style={{ padding: "0 15px", maxHeight: 580 }}>
                                <Table locale={{ emptyText: '暂无数据' }}
                                    rowSelection={rowSelection}
                                    columns={columns}
                                    dataSource={data}
                                    bordered
                                    pagination={pagination} />
                            </div>
                            <div className="clear"></div>
                        </div>

                        {/*模态框*/}
                        <Modal width={800}
                            title={this.state.modalType === 'edit' ? "编辑任务" : "新增任务"}
                            visible={this.state.handleVisible}
                            onCancel={this.handleChangeCancel}
                            footer={null}
                            key={this.state.modalKey}
                            maskClosable={false}
                            wrapClassName="taskaddeditModalClass"
                        >
                            <Form onSubmit={this.saveModel}>
                                <Row className="formItemLeft" style={{ display: 'none' }}>
                                    <Col span={24}>
                                        <FormItem
                                            {...formItemLayouts}
                                            label="id"
                                        >
                                            {getFieldDecorator('id', {
                                                initialValue: this.state.modalType === 'edit' ? personInfo.id : '',
                                                validateFirst: true
                                            })(
                                                <Input type="hidden" />
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row className="formItemLeft">
                                    <Col span={24}>
                                        <FormItem
                                            {...formItemLayouts}
                                            label="卡点名称"
                                        >
                                            {getFieldDecorator('checkpoint_name', {
                                                initialValue: this.state.modalType === 'edit' ? personInfo.checkpoint_name : '',
                                                validateFirst: true
                                            })(
                                                <Input placeholder="请输入卡点名称" />
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row className="formItemLeft" style={{ display: 'none' }}>
                                    <Col span={24}>
                                        <FormItem
                                            {...formItemLayouts}
                                            label="updateuser"
                                        >
                                            {getFieldDecorator('updateuser', {
                                                initialValue: this.state.modalType === 'edit' ? personInfo.updateuser : user.user.name,
                                                validateFirst: true
                                            })(
                                                <Input type="hidden" />
                                            )}
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={15} style={{ textAlign: 'right' }}>
                                        <Button htmlType="submit" className="btn_ok" loading={this.state.Loading}>保存</Button>
                                        <Button style={{ marginLeft: 30 }} onClick={this.handleChangeCancel} className="btn_delete">取消</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal>


                    </div>


                }

            </div>


        );

    }
};


//搜索区域内容组件
const SearchArea = React.createClass({
    getInitialState: function () {
        return {
            checkpoint_name: '',
            // beginDate:moment().format('YYYY-MM-DD 00:00:00'),
            // endDate:moment().format('YYYY-MM-DD 23:59:59'),
            beginDate: '',
            endDate: '',
            updateuser: '',
        };
    },
    init: function () {
        this.setState({
            checkpoint_name: '',
            // beginDate:moment().format('YYYY-MM-DD 00:00:00'),
            // endDate:moment().format('YYYY-MM-DD 23:59:59'),
            beginDate: '',
            endDate: '',
            updateuser: ''
        });
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
            },
            showCount: 10
        }
        store.dispatch(postCardPointManageListHushiData(creds));
        this.props.serchChange(
            '', '', '', '');
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.props.type !== nextProps.type) {
            this.init();
        }
    },
    handleCardPointNameChange: function (e) {
        this.setState({
            checkpoint_name: e.target.value,
        });
    },
    handleBeginDeteClick: function (date, dateString) {
        this.setState({
            beginDate: dateString,
        });

    },
    handleEndDeteClick: function (date, dateString) {
        this.setState({
            endDate: dateString,
        });
    },
    updateuserChange: function (e) {
        this.setState({
            updateuser: e.target.value,
        });
    },
    handleClick: function () { //点击查询
        let { beginDate, endDate, checkpoint_name, updateuser } = this.state;
        let nowPage = 1;
        let creds = {
            currentPage: nowPage,
            entityOrField: true,
            pd: {
                starttime: beginDate,
                endTime: endDate,
                checkpoint_name: checkpoint_name,
                updateuser: updateuser,
            },
            showCount: 10
        }
        store.dispatch(postCardPointManageListHushiData(creds));
        this.props.serchChange(
            checkpoint_name, beginDate, endDate, updateuser);
    },
    showModal: function () {
        this.setState({
            visible: true,
        });

    },
    hideModalOk: function () {
        this.setState({
            visible: false,
        });
        this.props.handleDelete();

    },
    hideModal: function () {
        this.setState({
            visible: false,
        });
    },
    cardPoint_leveChange: function (value) {
        this.setState({
            cardPoint_leve: value
        });
    },
    onOkBegin: function (e) {
        let beginDate = this.state.beginDate;
        if (e === undefined) {
            this.setState({
                beginDate: moment().format('YYYY-MM-DD')
            });
        }
    },
    onOkEnd: function (e) {
        let endDate = this.state.endDate;
        if (e === undefined) {
            this.setState({
                endDate: moment().format('YYYY-MM-DD')
            });
        }
    },
    render() {




        let { checkpoint_name, endDate, beginDate, updateuser } = this.state;
        let beginDateValue = '';
        if (beginDate === '') {
        } else {
            beginDateValue = moment(beginDate, dateFormat);
        }
        let endDateValue = '';
        if (endDate === '') {
        } else {
            endDateValue = moment(endDate, dateFormat);
        }
        if (beginDateValue != "" && endDateValue != "" && beginDateValue > endDateValue) {
            message.error('提示：开始时间不能大于结束时间！');
            return;
        }

        return (
            <div>
                <div className="marLeft40 z_searchDiv">

                    <label htmlFor="" className="font14">卡点名称：</label>
                    <Input
                        style={{ width: "221px", marginRight: "10px" }}
                        type="text"
                        id='checkpoint_name'
                        placeholder='请输入卡点名称'
                        value={checkpoint_name}
                        onChange={this.handleCardPointNameChange}
                    />
                    <label htmlFor="" className="font14">更新时间：</label>

                    <DatePicker
                        format={dateFormat}
                        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        allowClear={false}
                        style={{ marginRight: "10px" }}
                        value={beginDateValue}
                        defaultValue=""
                        onChange={this.handleBeginDeteClick}
                        onOk={this.onOkBegin}
                    />
                    <span className="font14" style={{ marginRight: "10px" }}>至</span>
                    <DatePicker
                        format={dateFormat}
                        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        allowClear={false}
                        style={{ marginRight: "10px" }}
                        value={endDateValue}
                        defaultValue=""
                        onChange={this.handleEndDeteClick}
                        onOk={this.onOkEnd}
                    />
                    <label htmlFor="" className="font14">操作人：</label>
                    <Input
                        style={{ width: "121px", marginRight: "10px" }}
                        type="text"
                        id='createuser'
                        placeholder='请输入操作人'
                        value={updateuser}
                        onChange={this.updateuserChange}
                    />
                    <ShallowBlueBtn width="82" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                    <ShallowBlueBtn width="82" text="重置" margin="0 10px 0 0" onClick={this.init} />
                </div>
                <div style={{ marginTop: "15px" }}>
                    <Button style={{ margin: '0 0 0 20px', width: "80px" }}
                        onClick={this.props.handleAdd}
                        className="btn_ok"
                    >
                        <Icon type="file-add" /> 增加
                    </Button>
                    <Button style={{ margin: '0 0 0 20px', width: "80px" }} onClick={this.showModal} className="btn_delete">
                        <Icon type="delete" />  删除
                    </Button>
                    <Modal style={{ top: "38%" }}
                        title="提示"
                        visible={this.state.visible}
                        footer={null}
                        maskClosable={false}
                        closable={false}
                    >
                        <p style={{ fontSize: "16px", }}>是否删除选中项？</p>
                        <p style={{ marginTop: "20px", textAlign: "center" }}>
                            <Button style={{ margin: '0 20px 0 0 ', width: "80px" }} onClick={this.hideModalOk} className="btn_ok">
                                确定
                        </Button>
                            <Button style={{ margin: '', width: "80px" }} onClick={this.hideModal} className="btn_delete">
                                取消
                        </Button>
                        </p>

                    </Modal>
                    <div className="clear"></div>
                </div>

            </div>

        );
    }
})




AreaManage = Form.create()(AreaManage);
export default connect(mainReducer)(AreaManage);
