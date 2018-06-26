/**
 * 盘查管理=>人员盘查右侧组件
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mainReducer } from "../../reducers/reducers";
import { StylePage, ShallowBlueBtn, Pag, } from "../generalPurposeModule";
import { store } from '../../index.js';
import * as constants from "../../utils/Constants";
import { monthFormat, dateFormat, serverUrl } from '../../utils/';
import { Spin, Table, message, Input, Modal, Button, Form, Icon, Row, Col, Select, DatePicker, Tag, Divider, TreeSelect } from 'antd';
import { BannerAnimImg } from '../../components/BannerAnim';
import {
    changeShade, postCardPointManage_taskData, PostOrganizationData, api, fetchPointCardData, fetchPersonTagsData
} from "../../actions/actions";
import { fetchCumtomerPersonnelData, postpersonpointInventoryHushiDetailsData } from "../../actions/InventoryManagement";
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
const TreeNode = TreeSelect.TreeNode;

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

export class PersonnelPonitInventory extends Component {
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
            begindate: '',
            enddate: '',
            idcard: '',
            unitSelected: '',//单位 
            location_id: '',//卡点 
            police_name: '',//警员姓名 
            tagsSelect: [],//标签
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
            visibles: false,
            arrayImg: [],
            currentImg: '',
            index: 0,
            ModalKey: 0
        };
        this.pageChange = this.pageChange.bind(this);
    }
    componentDidMount() {
        let params = {
            currentPage: 1,
            pd: {
            },
            showCount: 10
        }
        store.dispatch(fetchCumtomerPersonnelData(params));
        let creds = {
            currentPage: 1,
            pd: {
            },
            showCount: 9999
        }
        store.dispatch(postCardPointManage_taskData(creds));
        // 人员标签
        store.dispatch(fetchPersonTagsData());
    }
    ShowModal = (record) => {
        let creds = {
            person_id: record.id,
            record_id:record.record_id
        };
        store.dispatch(postpersonpointInventoryHushiDetailsData(creds));
        this.setState({
            visible: true,
            personInfo: record,
            modalType: 'details'
        });
    }
    editShowModal = (record) => {
        this.setState({
            visible: true,
            personInfo: record,
            modalType: 'edit'
        });
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
    serchChange = (idcard, name, begindate, enddate, unitSelected, location_id, police_name, tagsSelect, page) => {
        this.setState({
            name: name,
            idcard: idcard,
            enddate: enddate,
            begindate: begindate,
            unitSelected: unitSelected,
            location_id: location_id,
            police_name: police_name,
            tagsSelect: tagsSelect,
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
    render() {
        const { getFieldDecorator } = this.props.form;
        let nowPage = this.state.nowPage;
        let data = store.getState().InventoryManagement.data.personnelInventoryPointList.result.list;
        let page = store.getState().InventoryManagement.data.personnelInventoryPointList.result.page;
        let byidObj = store.getState().InventoryManagement.data.personnelInventoryPointById.result;
        console.log('byidObj**', byidObj);
        let isFetching = store.getState().InventoryManagement.data.personnelInventoryPointList.isFetching;
        let dataList = [];
        let recordNumber = parseInt((nowPage - 1) * 10);
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let serial = recordNumber + i + 1;
            dataList.push({
                serial: serial,
                name: item.name,
                address: item.address,
                birth: item.birth,
                idcard: item.idcard,
                location_name: item.location_name,
                nation: item.nation,
                tags: item.tags,
                police_name: item.police_name,
                checktime: item.checktime,
                taskname: item.taskname,
                police_unit: item.police_unit,
                id: item.id,
                record_id:item.record_id

            });
        }
        const columns = [{
            title: '序号',
            dataIndex: 'serial',
        }, {
            title: '名称',
            dataIndex: 'name',
            width: 180,
        }, {
            title: '身份证号',
            dataIndex: 'idcard',
        }
            , {
            title: '标签',
            dataIndex: 'tags',
        }
            , {
            title: '盘查时间',
            dataIndex: 'checktime',
        }, {
            title: '警员',
            dataIndex: 'police_name',
        }, {
            title: '单位',
            dataIndex: 'police_unit',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <span onClick={(e) => this.ShowModal(record)} style={{ cursor: 'pointer' }}>详情</span>
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
        if (byidObj) {
            if (byidObj.paint_real_path) {
                let imgObj = JSON.parse(byidObj.paint_real_path);
                // var imgObjText = byidObj.text;
                let arrayImg = imgObj;
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

        // 分页
        const pagination = {
            onChange: (page) => {
                this.setState({
                    nowPage: page,
                });
                let { idcard, name, begindate, enddate, unitSelected, location_id, police_name, tagsSelect, } = this.state;
                let params = {
                    currentPage: page,
                    pd: {
                        name: name,
                        idcard: idcard,
                        endtime: enddate,
                        starttime: begindate,
                        police_unitcode: unitSelected,
                        location_id: location_id,
                        police_name: police_name,
                        tags: tagsSelect,
                    },
                    showCount: 10
                }
                store.dispatch(fetchCumtomerPersonnelData(params));
            },
            current: page.currentPage,
            total: page.totalResult,
            pageSize: page.showCount,
            showQuickJumper: true,

        }
        // 标签
        let tagsList = [];
        if (byidObj && byidObj.tags) {

            let tagsArr = byidObj.tags.split(',');

            for (var i = 0; i < tagsArr.length; i++) {
                var tagsItem = tagsArr[i];
                tagsList.push(
                    <Tag color="red">{tagsItem}</Tag>
                );
            }
        } else {

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
                <Modal
                    width={900}
                    style={{ top: '20px' }}
                    title="详情"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    key={this.state.modalKey}
                >
                    <Row>
                        <Col span={24} style={{ fontSize: '16px' }}>人员信息</Col>
                        <Col span={12}>
                            <Row style={{ padding: '32px' }}>
                                <Col span={4}>照片：</Col>
                                <Col span={20}><img src="../../images/zanwu.png" style={{ width: '130px', height: '160px' }} /></Col>
                            </Row>
                            <Row style={{ padding: '0 32px' }}>
                                <Col span={4}>标签：</Col>
                                <Col span={20}>
                                    {tagsList}
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Form onSubmit={this.saveModel}>
                                <FormItem
                                    {...formItemLayout}
                                    label="姓名"
                                    style={{ marginBottom: '5px' }}
                                >
                                    {getFieldDecorator('name', {
                                        initialValue: this.state.modalType === 'edit' || this.state.modalType === 'details' ? byidObj ? byidObj.name : '' : '',
                                    })(
                                        this.state.modalType === 'details' ?
                                            <Input disabled /> :
                                            <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="性别"
                                    style={{ marginBottom: '5px' }}
                                >
                                    {getFieldDecorator('sex', {
                                        initialValue: this.state.modalType === 'edit' || 'details' ? byidObj ? byidObj.sex : '' : '',
                                    })(
                                        this.state.modalType === 'details' ?
                                            <Input disabled /> :
                                            <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="民族"
                                    style={{ marginBottom: '5px' }}
                                >
                                    {getFieldDecorator('nation', {
                                        initialValue: this.state.modalType === 'edit' || 'details' ? byidObj ? byidObj.nation : '' : '',
                                    })(
                                        this.state.modalType === 'details' ?
                                            <Input disabled /> :
                                            <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="生日"
                                    style={{ marginBottom: '5px' }}
                                >
                                    {getFieldDecorator('birth', {
                                        initialValue: this.state.modalType === 'edit' || 'details' ? byidObj ? byidObj.birth : '' : '',
                                    })(
                                        this.state.modalType === 'details' ?
                                            <Input disabled /> :
                                            <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="住址"
                                    style={{ marginBottom: '5px' }}
                                >
                                    {getFieldDecorator('address', {
                                        initialValue: this.state.modalType === 'edit' || 'details' ? byidObj ? byidObj.address : '' : '',
                                    })(
                                        this.state.modalType === 'details' ?
                                            <Input disabled /> :
                                            <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="卡点"
                                    style={{ marginBottom: '5px' }}
                                >
                                    {getFieldDecorator('location_name', {
                                        initialValue: this.state.modalType === 'edit' || 'details' ? byidObj ? byidObj.location_name : '' : '',
                                    })(
                                        this.state.modalType === 'details' ?
                                            <Input disabled /> :
                                            <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="身份证号"
                                    style={{ marginBottom: '5px' }}
                                >
                                    {getFieldDecorator('idcard', {
                                        initialValue: this.state.modalType === 'edit' || 'details' ? byidObj ? byidObj.idcard : '' : '',
                                    })(
                                        this.state.modalType === 'details' ?
                                            <Input disabled /> :
                                            <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="盘查时间"
                                    style={{ marginBottom: '5px' }}
                                >
                                    {getFieldDecorator('checktime', {
                                        initialValue: this.state.modalType === 'edit' || 'details' ? byidObj ? byidObj.checktime : '' : '',
                                    })(
                                        this.state.modalType === 'details' ?
                                            <Input disabled /> :
                                            <Input />
                                    )}
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                    <Divider style={{ background: 'rgb(29, 40, 81)', height: '2px' }} />
                    <Row>
                        <Col span={24} style={{ fontSize: '16px' }}>警员信息</Col>
                        <Col span={12}>
                            <Form>
                                <FormItem
                                    {...formItemLayout}
                                    label="姓名"
                                    style={{ marginBottom: '5px' }}
                                >
                                    {getFieldDecorator('police_name', {
                                        initialValue: this.state.modalType === 'edit' || 'details' ? byidObj ? byidObj.police_name : '' : '',
                                    })(
                                        this.state.modalType === 'details' ?
                                            <Input disabled /> :
                                            <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="所在单位"
                                    style={{ marginBottom: '5px' }}
                                >
                                    {getFieldDecorator('police_unit', {
                                        initialValue: this.state.modalType === 'edit' || 'details' ? byidObj ? byidObj.police_unit : '' : '',
                                    })(
                                        this.state.modalType === 'details' ?
                                            <Input disabled /> :
                                            <Input />
                                    )}
                                </FormItem>
                            </Form>
                        </Col>
                        <Col span={12}>
                            <Form>
                                <FormItem
                                    {...formItemLayout}
                                    label="警号"
                                    style={{ marginBottom: '5px' }}
                                >
                                    {getFieldDecorator('police_code', {
                                        initialValue: this.state.modalType === 'edit' || 'details' ? byidObj ? byidObj.police_code : '' : '',
                                    })(
                                        this.state.modalType === 'details' ?
                                            <Input disabled /> :
                                            <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="身份证号"
                                    style={{ marginBottom: '5px' }}
                                >
                                    {getFieldDecorator('police_idcard', {
                                        initialValue: this.state.modalType === 'edit' || 'details' ? byidObj ? byidObj.police_idcard : '' : '',
                                    })(
                                        this.state.modalType === 'details' ?
                                            <Input disabled /> :
                                            <Input />
                                    )}
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                    <Divider style={{ background: 'rgb(29, 40, 81)', height: '2px' }} />
                    <Row>
                        <Col span={24} style={{ fontSize: '16px' }}>写实详情</Col>
                        <Row style={{ padding: '32px' }}>
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
                                >
                                    <BannerAnimImg arrayImg={this.state.arrayImg} currentImg={this.state.currentImg} index={this.state.index} />
                                </Modal>
                            </Col>
                            <Col span={24}>
                                <FormItem
                                    {...formText}
                                    label="详情"
                                >
                                    {getFieldDecorator('value', {
                                        initialValue: this.state.modalType === 'edit' || 'details' ? byidObj ? byidObj.text : '' : '',
                                    })(
                                        <TextArea rows={2} disabled />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Row>
                </Modal>
            </div>
        )
    }
}

//搜索区域内容组件
const SearchArea = React.createClass({
    getInitialState: function () {
        return {
            sfzh: '',
            name: '',
            beginDate: '',
            endDate: '',
            police_name: '',
            unitSelected: '',
            tagsSelect: [],
            selectDisable: true,
            location_id: '',
        };
    },
    init: function () {
        this.setState({
            sfzh: '',
            name: '',
            beginDate: '',
            endDate: '',
            police_name: '',
            unitSelected: '',
            tagsSelect: [],
            selectDisable: true,
            location_id: '',
        });
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
            },
            showCount: 10
        }

        store.dispatch(fetchCumtomerPersonnelData(creds));

        this.props.serchChange('', '', '', '', '', '', '', '');
    },
    componentWillReceiveProps: function (nextProps) {
        if (this.props.type !== nextProps.type) {
            this.init();
        }
    },
    handleSfzhClick: function (e) {
        this.setState({
            sfzh: e.target.value,
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
    //下拉选择器的回调函数
    handleSelectChange: function (value) {
        // console.log(`selected ${value}`);
        // this.setState({
        //     unitSelected:value
        // });
        this.setState({
            unitSelected: value ? value : ''
        });
        // if (value == '') {
        //     this.setState({
        //         selectDisable: true,
        //         location_id: '',
        //         unitSelected: '',
        //     })

        // } else {
        //     //获取卡点
        //     let param = {
        //         currentPage: 1,
        //         entityOrField: true,
        //         pd: {
        //             // police_unitcode: value,
        //             // type: this.props.type
        //         },
        //         showCount: 9999
        //     }
        //     store.dispatch(postCardPointManage_taskData(param));

        //     this.setState({
        //         selectDisable: false,
        //         unitSelected: value,
        //         location_id: '全部'
        //     })
        // }
    },
    cardChange: function (value) {
        this.setState({

            location_id: value ? value : ''
        })

    },
    ontagsChange: function (value) {
        this.setState({
            tagsSelect: value
        });
    },
    handleClick: function () { //点击查询
        let nowPage = this.props.nowPage;
        this.state.location_id = this.state.location_id == '全部' ? '' : this.state.location_id
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                // type: this.props.type,
                name: this.state.name,
                idcard: this.state.sfzh,
                starttime: this.state.beginDate,
                endtime: this.state.endDate,
                police_unitcode: this.state.unitSelected,
                police_name: this.state.police_name,
                tags: this.state.tagsSelect,
                location_id: this.state.location_id
            },
            showCount: constants.pageSize
        }

        store.dispatch(fetchCumtomerPersonnelData(creds));

        this.props.serchChange(this.state.sfzh, this.state.name,
            this.state.beginDate, this.state.endDate, this.state.unitSelected, this.state.location_id,
            this.state.police_name, this.state.tagsSelect);

    },
    handleClickExport: function () { //点击导出
        // this.handleClick();
        let url = api + '/data/exportPersonExcel';
        url += '?type=' + this.props.type;
        url += '&name=' + this.state.name;
        url += '&idcard=' + this.state.sfzh;
        url += '&beginTime=' + this.state.beginDate;
        url += '&endTime=' + this.state.endDate;
        url += '&police_unitcode=' + this.state.unitSelected;
        url += '&police_name=' + this.state.police_name;
        url += '&tags=' + this.state.tagsSelect;
        url += '&Authorization=' + sessionStorage.getItem('id_token') || '';
        //store.dispatch(fetchExportPersonExcel(url)); //getPersonList_ly  getPersonList
        window.open(url);
    },
    handleClickClear: function () { //点击清除
        store.dispatch(changeShade('block'));
        this.props.createClick("block");
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
    // 树状选择器的筛选
    filterNode: function (inputValue, treeNode) {
        let str = treeNode.props.title;
        if (str.indexOf(inputValue) != -1) {
            return treeNode;
        }

    },
    // 下拉选择框的筛选
    filterOption: function (inputValue, option) {
        let str = option.props.title;
        if (str.indexOf(inputValue) != -1) {
            return option;
        }
    },
    render() {

        // 组织机构展示数据
        let organizationData = store.getState().root.data.organizationData.result.list;
        const organizationloop = data => data.map((item) => {
            if (item.childrenList) {
                return (
                    <TreeNode key={item.code} title={item.name} value={item.code}>
                        {organizationloop(item.childrenList)}
                    </TreeNode>)
            }
            return <TreeNode key={item.code} title={item.name} value={item.code} />;
        });
        //人员标签列表
        let personTagsList = store.getState().root.data.personTagsList;
        let personTagsOptions = [];
        for (var i = 0; i < personTagsList.length; i++) {
            var personTag = personTagsList[i];
            personTagsOptions.push(
                <Option key={personTag.code}>{personTag.text}</Option>
            )
        }
        //卡点
        let invetoryCardPointData = store.getState().root.data.invetoryCardPointData.result.list;
        let optinCardList = [];
        console.log('invetoryCardPointData', invetoryCardPointData);
        // // 盘查卡点的节点
        // const loop = data => data.map((item) => {
        //     return <TreeNode key={item.id} title={item.checkpoint_name} value={item.id} />;
        // })
        for (var j = 0; j < invetoryCardPointData.length; j++) {
            var item = invetoryCardPointData[j];
            optinCardList.push(
                <Option key={item.id} value={item.id}>{item.checkpoint_name}</Option>
            )
        }

        let sfzh = this.state.sfzh;
        let name = this.state.name;
        let police_name = this.state.police_name;
        let beginDate = this.state.beginDate;
        let endDate = this.state.endDate;
        let gender = this.state.gender;
        let unitSelected = this.state.unitSelected;
        let tagsSelect = this.state.tagsSelect;
        let location_id = this.state.location_id;

        let beginDateValue = '';
        if (beginDate === '') {
        } else {
            beginDateValue = moment(beginDate, 'YYYY-MM-DD');
        }
        let endDateValue = '';
        if (endDate === '') {
        } else {
            endDateValue = moment(endDate, 'YYYY-MM-DD');
        }

        if (beginDateValue != "" && endDateValue != "" && beginDateValue > endDateValue) {
            message.error('提示：开始时间不能大于结束时间！');
            return;
        }
        return (
            <div>
                <div className="marLeft40 z_searchDiv">
                    <div style={{ float: 'left', marginBottom: '10px' }}>
                        <label htmlFor="" className="font14">人员姓名：</label>
                        <Input style={{ width: '121px', margin: "0 10px 0 0" }} type="text" id='name' placeholder='请输入姓名' value={name} onChange={this.handleNameClick} />
                    </div>
                    <div style={{ float: 'left', marginBottom: '10px' }}>
                        <label htmlFor="" className="font14">身份证号：</label>
                        <Input style={{ width: '221px', margin: "0 10px 0 0" }} type="text" id='sfzh' placeholder='请输入身份证号' value={sfzh} onChange={this.handleSfzhClick} />
                    </div>
                    <div style={{ float: 'left', marginBottom: '10px' }}>
                        <label htmlFor="" className="font14">单位：</label>
                        <TreeSelect
                            style={{ width: 184 }}
                            placeholder="请选择单位"
                            value={unitSelected}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto', position: "fixed" }}
                            onChange={this.handleSelectChange}
                            showSearch={true}
                            dropdownMatchSelectWidth={false}
                            filterTreeNode={this.filterNode}
                            notFoundContent='暂无'
                        >
                            <TreeNode key={0} title={'全部'} value="" >
                                {organizationData.length > 0 ? organizationloop(organizationData) : ''}
                            </TreeNode>
                        </TreeSelect>
                    </div>
                    <div style={{ float: 'left', marginBottom: '10px', marginLeft: '10px' }}>
                        <label htmlFor="" className="font14">卡点：</label>
                        {/* <TreeSelect
                            style={{ width: 272 }}
                            value={location_id}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto', position: "fixed" }}
                            placeholder="请选择卡点"
                            onChange={this.cardChange}
                            showSearch={true}
                            dropdownMatchSelectWidth={false}
                            filterTreeNode={this.filterNode}
                            notFoundContent='暂无'
                        >
                            <TreeNode key={'全部'} title={'全部'} value="" >
                                {invetoryCardPointData.length > 0 ? loop(invetoryCardPointData) : ''}
                            </TreeNode>
                        </TreeSelect> */}
                        <Select style={{ width: 184, marginRight: 10 }}
                            value={location_id} onChange={this.cardChange}
                            placeholder='全部'
                            notFoundContent='暂无'
                            filterOption={this.filterOption}
                        >
                            <Option value="">全部</Option>
                            {optinCardList}
                        </Select>
                    </div>

                    {/* <Select disabled={this.state.selectDisable}  style={{width: 184,marginRight:10}} 
                             value={this.state.location_id} onChange={this.cardChange} 
                                    placeholder="全部" 
                            >
                                <Option value="">全部</Option>
                                {pointCardOptions}
                    </Select> */}
                    <div style={{ float: 'left', marginBottom: '10px' }}>
                        <label htmlFor="" className="font14">起止时间：</label>
                        <DatePicker format='YYYY-MM-DD' 
                        // showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            allowClear={false} style={{ marginRight: "10px" }} value={beginDateValue}
                            onChange={this.handleBeginDeteClick}
                            onOk={this.onOkBegin}
                        />
                        <span className="font14" style={{ marginRight: "10px" }}>至</span>
                        <DatePicker format='YYYY-MM-DD' 
                        // showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            allowClear={false} style={{ marginRight: "10px" }} value={endDateValue} defaultValue=""
                            onChange={this.handleEndDeteClick}
                            onOk={this.onOkEnd}
                        />
                    </div>
                    <div style={{ clear: 'both' }}></div>

                </div>
                <div style={{ marginLeft: "2%", }}>
                    <div style={{ float: 'left'}}>
                        <label htmlFor="" className="font14">警员姓名：</label>
                        <Input style={{ width: '121px', margin: "0 10px 0 0" }} type="text" id='police_name' placeholder='请输入警员姓名' value={police_name} onChange={this.handlePoliceNameClick} />
                    </div>
                    <div style={{ float: 'left' }}>
                        <label htmlFor="" className="font14">标签：</label>
                        {/*标签*/}
                        <Select key='tagselect'
                            mode="multiple"
                            style={{ width: 570 }}
                            placeholder="请选择人员标签"
                            //defaultValue={['a10', 'c12']}
                            onChange={this.ontagsChange}
                            value={tagsSelect}
                            notFoundContent='暂无'
                        >
                            {personTagsOptions}
                        </Select>
                    </div>
                    <div style={{ float: 'left' }}>
                        <ShallowBlueBtn width="82" text="查询" margin="0 10px 0 10px" onClick={this.handleClick} />
                        <ShallowBlueBtn width="82" text="重置" margin="0 10px 0 0" onClick={this.init} />
                        {/*<ShallowBlueBtn width="82" text="导出" margin="0 10px 0 0" onClick={this.handleClickExport} />*/}
                        {/* <Button style={{ margin: '0 10px 0 0', width: "82px" }} onClick={this.handleClickExport} className="btn_ok">
                            <Icon type="download" /> 导出
                    </Button> */}
                    </div>
                    <div style={{ clear: 'both' }}></div>
                </div>
            </div>

        );
    }
})
PersonnelPonitInventory = Form.create()(PersonnelPonitInventory);
export default connect(mainReducer)(PersonnelPonitInventory);