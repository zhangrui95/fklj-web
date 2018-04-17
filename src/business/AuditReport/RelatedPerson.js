/**
 * 研判报告关联人
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
import { postRelatedPersonData, editRelatedPersonData, addRelatedPersonData, deleteRelatedPersonData } from "../../actions/AuditReport"

import {
    changeShade
} from "../../actions/actions";

import { store } from '../../index.js';
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
export class RelatedPerson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgPath: "",
            img: "",
            ModalDialogueShow: 'none',
            relatedPersonList: store.getState().AuditReport.data.relatedPersonList,
            modalKey: 1,
            modalType: '',
            record: '',
            deletevisible: false,
            selectedRows: [],
            selectedRowsId: [],
            pagination: pagination,
            toConfigure: store.getState().AuditReport.data.toConfigure,
        }
    }
    //加载
    componentDidMount() {
        //取状态树上的值
        let relatedPersonList = store.getState().AuditReport.data.relatedPersonList;
        let toConfigure = this.state.toConfigure;
        //判断是否有值，没有就从后台接口拿
        if (toConfigure === "") {//判断是不是修改的时候
            if (relatedPersonList.length === 0) {
                let creds = {
                    pd: {
                        idcard: this.props.idcard,
                    },

                }
                store.dispatch(postRelatedPersonData(creds));
            }
            //改变状态
            this.setState({
                relatedPersonList: relatedPersonList,
            });
        } else {
            this.setState({
                relatedPersonList: relatedPersonList,
            });
        }

    }
    //组件props发生变化，更新state
    componentWillReceiveProps(nextProps) {
        let relatedPersonList = nextProps.AuditReport.data.relatedPersonList;//更新状态树
        let toConfigure = nextProps.AuditReport.data.toConfigure;
        this.setState({
            relatedPersonList: relatedPersonList,
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
    // 添加的modal
    handleClickClear = () => {
        this.setState({
            visible: true,
            modalType: 'add',
        });
    }
    // 修改的modal
    editShowModal = (record) => {
        this.setState({
            visible: true,
            modalType: 'edit',
            record: record
        });
    }
    // 关闭的modal
    handleCancel = () => {
        this.setState({
            visible: false,
            modalKey: this.state.modalKey + 1
        });
    }
    //删除modal状态
    showDeleteModal = () => {
        this.setState({
            deletevisible: true,
        });
    }
    // 删除确定按钮事件
    clickDelete = () => {
        let selectedRows = this.state.selectedRows;
        let selectedRowsId = this.state.selectedRowsId;
        if (this.state.selectedRows.length === 0) {
            message.error('提示：请选择要删除的项！');
            return;
        }
        for (let i = 0; i < selectedRows.length; i++) {
            let obj = selectedRows[i];
            store.dispatch(deleteRelatedPersonData(obj));
        }

        this.setState({
            deletevisible: false,
            selectedRowsId: [],
        });
    }
    // 删除取消状态
    handleCanceldelete = () => {
        this.setState({
            deletevisible: false,
        });
    }
    //保存
    saveRelatedModel = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let userItem = JSON.parse(sessionStorage.getItem('user'));
            if (!err) {
                if (this.state.modalType === 'add') {
                    let creds = {
                        id: uuid(),
                        back_id: this.props.judgeCode,
                        name: values.name ? values.name : '',
                        idcard: values.idcard ? values.idcard : '',
                        hh: values.hh ? values.hh : '',
                        relation: values.relation ? values.relation : '',
                        ishaveterrback: values.ishaveterrback ? values.ishaveterrback : '',
                        incrimination: values.incrimination ? values.incrimination : '',
                        createuser: userItem.user.idcard,
                        optuser: userItem.user.idcard,
                    }

                    store.dispatch(addRelatedPersonData(creds));
                } else {
                    let creds = {
                        id: this.state.record.id,
                        back_id: this.props.judgeCode,
                        name: values.name ? values.name : this.state.record.name,
                        idcard: values.idcard ? values.idcard : this.state.record.idcard,
                        hh: values.hh ? values.hh : this.state.record.hh,
                        relation: values.relation ? values.relation : this.state.record.relation,
                        ishaveterrback: values.ishaveterrback ? values.ishaveterrback : this.state.record.ishaveterrback,
                        incrimination: values.incrimination ? values.incrimination : this.state.record.incrimination,
                        createuser: userItem.user.idcard,
                        optuser: userItem.user.idcard,
                    }
                    store.dispatch(editRelatedPersonData(creds));

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
    // 状态改变事件
    statusChange = (value) => {
        this.setState({
            ishaveterrback: value
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
        let relatedPersonList = this.state.relatedPersonList;
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
            title: '身份证号',
            dataIndex: 'idcard',
        }, {
            title: '同案人',
            dataIndex: 'relation',
        }, {
            title: '是否有涉恐背景',
            render: (text, record) => (
                text.ishaveterrback === '1' ? "是" : '否'
            ),
        }, {
            title: '经纪犯罪',
            dataIndex: 'incrimination',
        }, {
            title: '其他',
            dataIndex: 'hh',
        }, {
            title: '操作',
            render: (text, record) => (
                <span>
                    <span onClick={(e) => this.editShowModal(record)} style={{ cursor: 'pointer' }}>{toConfigure === 'JudgeHistory' ? '详情' : '编辑'}</span>
                </span>
            ),
        }];
        const data = [];

        for (var i = 0; i < relatedPersonList.length; i++) {
            var relatedPerson = relatedPersonList[i];

            data.push({
                // key: i,
                id: relatedPerson.id,
                name: relatedPerson.name,
                idcard: relatedPerson.idcard,
                hh: relatedPerson.hh,
                relation: relatedPerson.relation,
                ishaveterrback: relatedPerson.ishaveterrback,
                incrimination: relatedPerson.incrimination,
                key: relatedPerson.id,
            });

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
        let statusList = [{
            "key": "是",
            "value": '1'
        }, {
            "key": "否",
            "value": '0'
        }];
        let statusOptions = [];
        for (var i = 0; i < statusList.length; i++) {
            var statusUnit = statusList[i];
            statusOptions.push(
                <Option key={statusUnit.key} value={statusUnit.value}>{statusUnit.key}</Option>
            )
        }
        return (
            <div style={{ marginTop: "30px" }}>
                <div>
                    {/*标题*/}
                    <div style={titleBg}>
                        <div>
                            <span style={{ fontSize: "16px", color: "#fff" }}>关联人</span>
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
                            {/*<ShallowBlueBtn text="关联人研判工具"  width="120px" float="right" margin="0 15px 0 0"/>*/}
                        </div>
                        <div style={clear}></div>
                    </div>
                    {/*关联人*/}
                    <div style={{ padding: "15px" }}>
                        <div style={{ margin: "5px 0" }}>
                            {/*<ShallowBlueBtn text="已生成轨迹图片"  width="120px" float="right"/>*/}
                            <div style={clear}></div>
                        </div>
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={data}
                            bordered
                            pagination={this.state.pagination}
                            locale={{ emptyText: '暂无数据' }}
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
                    title="关联人信息"
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
                                        required: true, message: '请输入姓名!',
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
                                label="同案人"
                                hasFeedback
                            >
                                {getFieldDecorator('relation', {
                                    rules: [{
                                        required: true, message: '请输入同案人!',
                                    }],
                                    initialValue: this.state.modalType === 'edit' ? this.state.record.relation : '',
                                    validateFirst: true
                                })(
                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                    )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="是否有涉恐背景"
                                hasFeedback
                            >
                                {getFieldDecorator('ishaveterrback', {
                                    rules: [{
                                        required: true, message: '请选择是否有涉恐背景!',
                                    }],
                                    initialValue: this.state.modalType === 'edit' ? this.state.record.ishaveterrback : '1',
                                    validateFirst: true
                                })(
                                    <Select key='status'
                                        //placeholder="请选择状态"
                                        disabled={toConfigure === 'JudgeHistory' ? true : false}
                                        optionFilterProp="children"
                                        onChange={this.statusChange}
                                        // value={ishaveterrback}
                                        dropdownMatchSelectWidth={false}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >

                                        {statusOptions}
                                    </Select>
                                    )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="经济犯罪"
                                hasFeedback
                            >
                                {getFieldDecorator('incrimination', {
                                    rules: [{
                                        required: true, message: '请输入经济犯罪!',
                                    }],
                                    initialValue: this.state.modalType === 'edit' ? this.state.record.incrimination : '',
                                    validateFirst: true
                                })(
                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                    )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="其他"
                                hasFeedback
                            >
                                {getFieldDecorator('hh', {
                                    initialValue: this.state.modalType === 'edit' ? this.state.record.hh : '',
                                    validateFirst: true
                                })(
                                    <Input disabled={toConfigure === 'JudgeHistory' ? true : false} />
                                    )}
                            </FormItem>
                        </div>
                        {toConfigure === 'JudgeHistory' ? '' :
                            <Row>
                                <Col span={16} style={{ textAlign: 'right' }}>
                                    <Button htmlType="submit" onClick={this.saveRelatedModel} className="btn_ok">保存</Button>
                                    <Button style={{ marginLeft: 30 }} onClick={this.handleCancel} className="btn_delete">取消</Button>

                                </Col>
                            </Row>}

                    </Form>
                </Modal>

            </div>

        );
    }
};
//行
// class  Tr extends Component{
//     constructor(props){
//         super(props);
//         this.delete = this.delete.bind(this);//绑定this
//     }
//     //删除
//     delete= () =>{
//       let  relatedPersonList=store.getState().AuditReport.data.relatedPersonList;
//       //remove写好的删除方法
//       relatedPersonList.remove(this.props.trData);
//       //调用刷新方法
//       this.props.forceFun();
//       alert("删除成功");
//     }
//     render(){
//         let remove = <div onClick={this.delete} style={{cursor:"pointer"}}>删除</div>
//         return(
//             <tr>
//                 <td style={tdStyle}>{this.props.trData.idCard}</td>
//                 <td style={tdStyle}>{this.props.trData.name}</td>
//                 <td style={tdStyle}>{this.props.trData.contactMode}</td>
//                 <td style={tdStyle}>{this.props.trData.intimacy}</td>
//                 <td style={tdStyle}>{this.props.trData.remark}</td>
//                 <td style={tdStyle}>{remove}</td>
//             </tr>
//         );
//     }
// }
// //表格
// class Table extends Component{
//      //刷新
//         forceFun=()=>{
//             this.forceUpdate();
//         }

//     render(){
//         let relatedPersonList = this.props.relatedPersonList;//取值
//         //循环tr
//         let trs=[];
//         if(relatedPersonList !== null) {
//             for (var i = 0; i < relatedPersonList.length; i++) {
//                 let trData = relatedPersonList[i];
//                 trs.push(
//                     <Tr trData={trData} forceFun={this.forceFun}/>
//                 );
//             }
//         }

//         return(
//             <table style={tableStyle}>
//                 <tr style={thStyle}>
//                     {/*<th>序号</th>*/}

//                     <td  style={tdStyle}>身份证号</td>
//                     <td  style={tdStyle}>姓名</td>
//                     <td  style={tdStyle}>接触方式</td>
//                     <td  style={tdStyle}>亲密度</td>
//                     <td  style={tdStyle}>备注</td>
//                     <td  style={tdStyle}>操作</td>
//                 </tr>
//                {trs}
//             </table>
//         )
//     }
// }
//模态框组件
export class ModalDialogue extends Component {
    constructor(props) {  //初始化nowPage为1
        super(props);
        this.state = {
            idCard: "",
            name: '',
            contactMode: '',
            intimacy: '',
            remark: ''
        };
    }
    clear() {
        //关闭弹出框
        this.props.changeStatus("none");
        //关闭遮罩
        store.dispatch(changeShade("none"));
        this.state = {
            idCard: "",
            name: '',
            contactMode: '',
            intimacy: '',
            remark: ''
        };
    }
    //创建事件
    handleCreate = () => {

        const idCard = this.state.idCard;
        const name = this.state.name;

        const contactMode = this.state.contactMode;
        const intimacy = this.state.intimacy;
        const remark = this.state.remark;
        const creds = { id: uuid(), idCard: idCard, name: name, contactMode: contactMode, intimacy: intimacy, remark: remark }
        this.VerificationSFZH();
        //保存到状态树
        store.getState().AuditReport.data.relatedPersonList.unshift(creds);
        //刷新页面
        // store.dispatch(fetchInterrogationInformationData('/getInterrogationInformation'));
        this.clear();
    }
    //身份证号
    VerificationSFZH = () => {
        var reg = new RegExp("^\d{15}|\d{}18$");
        let idCard = this.state.idCard;
        if (!reg.idCard) {
            alert("请输入正确的身份证号！");
        }
    }
    //关闭事件
    handleClose = () => {
        this.clear();
    }
    //图片改变事件
    // handleChangeImg = (files, event) => {
    //     //获取图片对象
    //     let img = files[0];
    //     this.setState({
    //         imgPath: img.thumb,
    //         img:img
    //     });
    // }
    //改变身份证
    idCardChange = (id, value) => {
        this.setState({
            idCard: value
        });
    }
    //改变姓名
    nameChange = (id, value) => {
        this.setState({
            name: value
        });
    }
    //改变接触方式
    contactModeChange = (id, value) => {
        this.setState({
            contactMode: value
        });
    }
    //改变亲密度
    intimacyChange = (id, value) => {
        this.setState({
            intimacy: value
        });
    }
    //改变备注
    remarkChange = (id, value) => {
        this.setState({
            remark: value
        });
    }

    render() {
        let mdisplay = this.props.isShow;
        let name = this.state.name;
        let idCard = this.state.idCard;
        let contactMode = this.state.contactMode;
        let intimacy = this.state.intimacy;
        let remark = this.state.remark;
        return (
            <div style={{ width: this.props.width, height: this.props.height, border: "1px solid #0C5F93", position: "fixed", left: "35%", top: '35%', zIndex: "9999", display: mdisplay }}>
                {/*头部*/}
                <div style={{ background: "rgba(2, 24, 85, 0.9)", padding: "5px" }}>
                    <span style={{ float: "left", fontSize: "16px", color: "#fff" }}>添加关联人信息</span><img src="/images/guanbi.png" style={{ float: "right", marginTop: "5px" }} onClick={this.handleClose} />
                    <div style={{ clear: "both" }}></div>
                </div>
                {/*内容部分*/}
                <div style={{ padding: "20px", background: "rgba(37, 51, 100, 0.9)" }}>
                    <div style={{ marginBottom: "20px" }}>
                        <label style={mStyle} htmlFor="">身份证号</label>
                        <Input width="272px" callbackParent={this.idCardChange} value={idCard} />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <label style={mStyle} htmlFor="">姓名</label>
                        <Input width="272px" callbackParent={this.nameChange} value={name} />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <label style={mStyle} htmlFor="">接触方式</label>
                        <Input width="272px" callbackParent={this.contactModeChange} value={contactMode} />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <label style={mStyle} htmlFor="">亲密度</label>
                        <Input width="272px" callbackParent={this.intimacyChange} value={intimacy} />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                        <label style={mStyle} htmlFor="">备注</label>
                        <Input width="272px" callbackParent={this.remarkChange} value={remark} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <ShallowBlueBtn width="40px" text="确定" onClick={this.handleCreate} />
                    </div>
                    <div style={clear}></div>
                </div>
            </div>
        );
    }
}
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
RelatedPerson = Form.create()(RelatedPerson);
export default connect(mainReducer)(RelatedPerson);