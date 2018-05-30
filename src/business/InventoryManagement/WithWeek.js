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
    postInventoryListHushiData, postInventoryListHushiDetailsData
} from "../../actions/InventoryManagement";

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

export class WithWeek extends Component {
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
            data: [
                { key: 1, serial: 1, cardId: '230106196201222121', label: '张三', zrdw: '呼伦浩特市XX单位', time: '2018-04-10', police: '警员001', tag: '人员通过' },
                { key: 2, serial: 2, cardId: '230106196201222121', label: '张三', zrdw: '呼伦浩特市XX单位', time: '2018-04-10', police: '警员001', tag: '人员通过' },
                { key: 3, serial: 3, cardId: '230106196201222121', label: '张三', zrdw: '呼伦浩特市XX单位', time: '2018-04-10', police: '警员001', tag: '人员通过' },
            ],
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
        this.pageChange = this.pageChange.bind(this);
    }
    componentDidMount() {
        let params = {
            currentPage: 1,
            pd: {
                idcard: '',
                taskname: '',
                name: "",
                address_type: '',
                police_name: '',
                endtime: '',
                starttime: '',
                cycle: 1,
            },
            showCount: 10
        }
        store.dispatch(postInventoryListHushiData(params));
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
        store.dispatch(postInventoryListHushiDetailsData(creds));
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
        this.setState({
            oldVisibles: true,
            oldpersonInfo: record,
            modalType: 'edit'
        });
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                recordId: 'b829a02b16c84f0ebddbb6cb935516d2',
                personId: '23038219801101001020180322105307964',
            },
            showCount: constants.pageSize
        }
        store.dispatch(postInterrogationDetailsUsersData(creds));
    }
    // 原反恐利剑 取消
    handleOldCancel = () => {
        this.setState({
            oldVisibles: false,
            modalKey: this.state.modalKey + 1
        });
    }
    handleDelete = () => {
        if (this.state.selectedRowsId.length === 0) {
            message.error('请选择要删除的项！');
            return;
        }

        let crads = {
            // id: this.state.selectedRowsId,
            // userName: sessionStorage.getItem('userName') || ''

            pd: {
                id: this.state.selectedRowsId,
            },

        };
        let params = {
            currentPage: this.state.nowPage,
            pd: {
                beginTime: this.state.begindate,
                endTime: this.state.enddate,
                name: this.state.name,
                pid: "199"
            },
            showCount: 10
        }
        // store.dispatch(DeleteHorrorSoftwareData(crads,params));

        this.setState({
            selectedRowsId: [],
            // nowPage: 1
        });

    }
    saveModel = (e) => {
        // this.handleCancel();
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let userItem = JSON.parse(sessionStorage.getItem('user'));
            if (!err) {
                if (this.state.modalType === "edit") {
                    // values.id = this.state.personInfo.key;//让表单数据带上id  后台好进行操作
                    // console.log('this.state.personInfo',this.state.personInfo);
                    // console.log('values.id',values.id);
                    // let creds = {
                    //     pd:{
                    //         name:values.label,
                    //         iconUrl:values.iconUrl?values.iconUrl:this.state.avatarSrc,
                    //         id:values.id.toString(),
                    //         optuser:userItem.user.idcard,
                    //         createuser:userItem.user.idcard,
                    //         remark:values.remark?values.remark:'',
                    //         status:values.status?values.status:'1',
                    //         code:values.value?values.value:'',
                    //         level:'2',
                    //         pid:'199'
                    //     },//传参 把后台需要的参数传过去
                    // }
                    // let params = {
                    //     currentPage: 1,
                    //     pd: {
                    //         beginTime: this.state.begindate,
                    //         endTime: this.state.enddate,
                    //         name: this.state.name,
                    //         pid:"199"
                    //     },
                    //     showCount: 10
                    // }
                    // store.dispatch(updateHorrorSoftwareData(creds,params));
                } else if (this.state.modalType === "add") {
                    let data = this.state.data;
                    let len = this.state.data.length - 1;
                    let key = data[len].key + 1
                    let value = { key: key, serial: key, value: values.value, label: values.label, updatetime: "2018-04-10" }
                    data.push(value)
                    this.setState({
                        data: data,
                    });
                    // let creds = {//表单域不一定写了所有的字段 所以要把空值通过赋值显示
                    //     pd:{
                    //         name:values.label?values.label:'',
                    //         iconUrl:values.iconUrl?values.iconUrl:'',
                    //         menuname:"304",
                    //         optuser:userItem.user.idcard,
                    //         createuser:userItem.user.idcard,
                    //         remark:values.remark?values.remark:'',
                    //         status:values.status?values.status:'1',
                    //         code:values.value?values.value:'',
                    //         level:'2',
                    //         pid:'199'
                    //     },
                    // }
                    // let params = {
                    //     currentPage: 1,
                    //     pd: {
                    //         beginTime: this.state.begindate,
                    //         endTime: this.state.enddate,
                    //         name: this.state.name,
                    //         pid:"199"
                    //     },
                    //     showCount: 10
                    // }
                    // store.dispatch(addHorrorSoftwareData(creds,params))

                }
                this.handleCancel();
                this.setState({
                    nowPage: 1
                });
            }


        })
    }
    serchChange = (name, idcard, enddate, begindate, subtask_name, address_type, police_name, page) => {
        this.setState({
            name: name,
            idcard: idcard,
            enddate: enddate,
            begindate: begindate,
            subtask_name: subtask_name,
            address_type: address_type,
            police_name: police_name,
            nowPage: page
        });
    }
    pageChange(nowPage) {
        this.state = Object.assign({}, this.state, { nowPage: nowPage });
        // let creds = {
        //     currentPage:nowPage,
        //     entityOrField:true,
        //     pd:{
        //         beginTime:this.state.beginDate ,
        //         endTime:this.state.endDate,
        //         name:this.state.name,
        //         unit:this.state.unit,
        //         task_stauts:this.state.status,
        //         task_type:'113003',
        //     },
        //     showCount: constants.pageSize
        // }
        // store.dispatch(fetchPatrolTaskData(creds));
        this.setState({
            selectedRowsId: [],
            selectedRowKeys: [],
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
        let isFetching = store.getState().InventoryManagement.data.invenListHushi.isFetching;
        let data = store.getState().InventoryManagement.data.invenListHushi.result.list;
        let obj = store.getState().InventoryManagement.data.invenListHushiDetails.result;
        let page = store.getState().InventoryManagement.data.invenListHushi.result.page;
        let dataList = [];
        let recordNumber = parseInt((nowPage - 1) * 10);
        if (data) {
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                let serial = recordNumber + i + 1;
                dataList.push({
                    serial: serial,
                    name: item.name,
                    idcard: item.idcard,
                    sex: item.sex,
                    age: item.age,
                    address_type: item.address_type,
                    now_address: item.now_address,
                    phone: item.phone,
                    taskname: item.taskname,
                    police_name: item.police_name,
                    checktime: item.checktime ? getMyDate(item.checktime / 1000) : '',

                });
            }
        }
        const columns = [{
            title: '序号',
            dataIndex: 'serial',
        }, {
            title: '身份证号',
            dataIndex: 'idcard',
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
        }, {
            title: '居住类型',
            dataIndex: 'address_type',
            render: (text, record) => (
                <span>{record.address_type === 0 ? '常住' : record.address_type === 1 ? '暂住' : '流动'}</span>
            ),
        }, {
            title: '现居住地址',
            dataIndex: 'now_address',
        }, {
            title: '联系电话',
            dataIndex: 'phone',
        }, {
            title: '隶属任务',
            dataIndex: 'taskname',
        }, {
            title: '盘查警员',
            dataIndex: 'police_name',
        }, {
            title: '盘查时间',
            dataIndex: 'checktime',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <span onClick={(e) => this.editShowModal(record)} style={{ cursor: 'pointer' }}>详情</span>
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
        if (obj) {
            if (obj.paint) {
                let arrayImg = JSON.parse(obj.paint.paint_photo_path);
                var imgObjText = obj.paint.text;
                // let arrayImg = ["../../images/zanwu.png", "../../images/zanwu.png", "../../images/zanwu.png"];
                if (arrayImg && arrayImg.length > 0) {
                    for (let i = 0; i < arrayImg.length; i++) {
                        imgArray.push(
                            <img src={arrayImg[i]} key={i} alt="" style={{ width: '100px', height: '120px', margin: '5px' }}
                                onClick={handleImgClick => this.handleImgClick(arrayImg, arrayImg[i], i)} />
                        );
                    }
                } else {
                    imgArray.push(
                        <div style={{ fontSize: 16, color: '#fff', width: '100%', textAlign: "center" }}>暂无写实照片</div>
                    );
                }
            }
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
                        subtask_name: subtask_name,
                        name: name,
                        address_type: address_type,
                        police_name: police_name,
                        endtime: enddate,
                        starttime: begindate,
                        cycle: 1,
                    },
                    showCount: 10
                }
                store.dispatch(postInventoryListHushiData(params));
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
                    this.state.visible ?
                        <Modal
                            width={900}
                            style={{ top: '20px' }}
                            title="详情"
                            visible={this.state.visible}
                            onCancel={this.handleCancel}
                            footer={null}
                            key={this.state.modalKey}
                        >
                            <Form onSubmit={this.saveModel}>
                                <Row>
                                    <Col span={24} style={{ fontSize: '16px', color: "#fff" }}>人员信息</Col>
                                    <Col span={12}>
                                        <Row style={{ padding: '32px' }}>
                                            <Col span={4} style={{ color: "#fff" }}>照片：</Col>
                                            <Col span={20}><img src={obj ? obj.zpurl ? obj.zpurl : "/images/zanwu.png" : "/images/zanwu.png"} style={{ width: '130px', height: '160px' }} /></Col>
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

                                        <FormItem
                                            {...formItemLayout}
                                            label="户籍地址"
                                            style={{ marginBottom: '5px' }}
                                        >
                                            {getFieldDecorator('address', {
                                                initialValue: obj ? obj.address ? obj.address : '' : '',
                                            })(
                                                <Input disabled title={obj.address}/>
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={12}>
                                        <FormItem
                                            {...formItemLayout}
                                            label="居住类型"
                                            style={{ marginBottom: '5px' }}
                                        >
                                            {getFieldDecorator('address_type', {
                                                initialValue: obj ? obj.address_type ? obj.address_type : '' : '',
                                            })(
                                                <Select disabled>
                                                    <Option value=''>全部</Option>
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
                                                <Input disabled title={obj.now_address}/>
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
                                                <Input disabled title={obj.work_address}/>
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
                                                <Input disabled />
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
                                                <Input disabled title={obj.taskname}/>
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
                                                initialValue: obj ? obj.checktime ? obj.checktime : '' : '',
                                            })(
                                                <Input disabled />
                                            )}
                                        </FormItem>

                                    </Col>
                                </Row>
                                <Divider style={{ background: 'rgb(29, 40, 81)', height: '2px', margin: '18px 0' }} />
                                <Row>
                                    <Col span={24} style={{ fontSize: '16px', color: "#fff" }}>写实详情</Col>
                                    <Row style={{ padding: '32px 32px 0 32px' }}>
                                        <Col span={24}>
                                            {imgArray}
                                            <Modal
                                                key={this.state.ModalKey}
                                                visible={this.state.visibles}
                                                onCancel={this.handleCancels}
                                                footer={false}
                                                wrapClassName='zoomImg'
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
                        </Modal> : ''
                }
                {
                    this.state.oldVisibles ?
                        <Modal
                            width="60%"
                            style={{ top: '20px' }}
                            title="详情"
                            visible={this.state.oldVisibles}
                            onCancel={this.handleOldCancel}
                            footer={null}
                            key={this.state.modalKey}
                        >
                            <div>
                                <InterrogationDetailsItem interrogationDetailsUser={this.state.testData} />
                                <div>
                                    <div style={{ marginTop: "20px" }}>
                                        <Tabs tabs={tabs} handleTabClick={this.handleTabClick} />
                                        <div style={{ clear: "both" }}></div>
                                    </div>
                                    {content}
                                </div>
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
            address_type: '',
            police_name: ''
        };
    },
    handleClick: function () { //点击查询
        let page = 1;
        let { name, idcard, enddate, begindate, subtask_name, address_type, police_name } = this.state;
        let params = {
            currentPage: 1,
            pd: {
                idcard: idcard,
                taskname: subtask_name,
                name: name,
                address_type: address_type,
                police_name: police_name,
                endtime: enddate,
                starttime: begindate,
                cycle: 1,
            },
            showCount: 10
        }
        store.dispatch(postInventoryListHushiData(params));
        this.props.serchChange(name, idcard, enddate, begindate, subtask_name, address_type, police_name, page);
    },
    init: function () {
        let page = 1;
        this.setState({
            name: '',
            idcard: '',
            enddate: '',
            begindate: '',
            subtask_name: '',
            address_type: '',
            police_name: '',
        });
        let params = {
            currentPage: 1,
            pd: {
                idcard: '',
                taskname: '',
                name: '',
                address_type: '',
                police_name: '',
                endtime: '',
                starttime: '',
                cycle: 1,
            },
            showCount: 10
        }
        store.dispatch(postInventoryListHushiData(params));
        this.props.serchChange('', '', '', '', '', '', '', page);
    },
    componentWillReceiveProps: function (nextProps) {
        if (this.props.type !== nextProps.type) {
            this.init();
        }
    },
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
                    <label htmlFor="" className="font14">人员名称：</label>
                    <Input style={{ width: '180px', marginRight: "10px" }} type="text" id='name' placeholder='请输入姓名' value={name} onChange={this.handleNameClick} />
                    <label htmlFor="" className="font14">身份证号：</label>
                    <Input style={{ width: '230px', marginRight: "10px" }} type="text" id='sfzh' placeholder='请输入身份证号' value={idcard} onChange={this.handleSfzhClick} />
                    <label htmlFor="" className="font14">居住类型：</label>
                    <Select style={{ width: "10%", margin: "0 10px 0 0" }} value={address_type} onChange={this.handleaddressTypeClick} notFoundContent='暂无'>
                        <Option value=''>全部</Option>
                        <Option value={0}>常住</Option>
                        <Option value={1}>暂住</Option>
                        <Option value={2}>流动</Option>
                    </Select>
                    <label htmlFor="" className="font14">隶属任务：</label>
                    <Input value={subtask_name} style={{ width: '180px', marginRight: "10px" }} type="text" id='subtask_name' placeholder='请输入隶属任务名称' onChange={this.handleSubtaskNameClick} />
                    <label htmlFor="" className="font14">盘查警员：</label>
                    <Input style={{ width: '130px', marginRight: "10px" }} type="text" id='police_name' placeholder='请输入警员姓名' value={police_name} onChange={this.handlePoliceNameClick} />
                </div>
                <div style={{ marginLeft: "2%", marginTop: "20px" }}>
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
WithWeek = Form.create()(WithWeek);
export default connect(mainReducer)(WithWeek);