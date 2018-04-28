import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mainReducer} from "../../reducers/reducers";
import {StylePage, ShallowBlueBtn, Pag,} from "../generalPurposeModule";
import {store} from '../../index.js';
import * as constants from "../../utils/Constants";
import {monthFormat, dateFormat, serverUrl} from '../../utils/';
import {Spin, Table, message, Input, Modal, Button, Form, Icon, Row, Col, Select, DatePicker, Tag, Divider} from 'antd';

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

export  class PersonnelInventory extends Component{
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
            key: '',
            data: [
                {key: 1, serial: 1, cardId: '230106196201222121', label: '张三',zrdw:'呼伦浩特市XX单位', time: '2018-04-10',police:'警员001',tag:'人员通过'},
                {key: 2, serial: 2, cardId: '230106196201222121', label: '张三',zrdw:'呼伦浩特市XX单位', time: '2018-04-10',police:'警员001',tag:'人员通过'},
                {key: 3, serial: 3, cardId: '230106196201222121', label: '张三',zrdw:'呼伦浩特市XX单位', time: '2018-04-10',police:'警员001',tag:'人员通过'},
            ],
            record: null,
            pagination: pagination,
            loading: false,
            personInfo:'',
            modalKey: 0,
            modalType: '',
            remark:"",
            zoomvisible:false,
            imgtext:'',
            text:null,
        };
        this.pageChange = this.pageChange.bind(this);
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
                pid:"199"
            },
            showCount: 10
        }
        // store.dispatch(DeleteHorrorSoftwareData(crads,params));

        this.setState({
            selectedRowsId: [],
            // nowPage: 1
        });

    }
    saveModel=(e)=>{
        // this.handleCancel();
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let userItem = JSON.parse(sessionStorage.getItem('user'));
            if(!err){
                if(this.state.modalType === "edit"){
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
                }else if(this.state.modalType === "add"){
                    let data = this.state.data;
                    let len = this.state.data.length - 1;
                    let key = data[len].key + 1
                    let value = {key: key, serial: key, value: values.value, label: values.label, updatetime: "2018-04-10"}
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
    pageChange(nowPage) {
        this.state = Object.assign({}, this.state, {nowPage:nowPage});
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
            selectedRowsId:[],
            selectedRowKeys:[],
        });
    }
    initEntity = () =>{
        this.setState({
            nowPage: 1,
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let nowPage = this.state.nowPage;
        let isFetching = store.getState().ControlPersonnel.isFetching;
        const columns = [{
            title: '序号',
            dataIndex: 'serial',
        },{
            title: '名称',
            dataIndex: 'label',
            width:180,
        },{
            title: '身份证号',
            dataIndex: 'cardId',
        },{
            title: '标签',
            dataIndex: 'tag',
        },{
            title: '盘查时间',
            dataIndex: 'time',
        },{
            title: '警员',
            dataIndex: 'police',
        },{
            title: '单位',
            dataIndex: 'zrdw',
        },{
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                        <span onClick={(e)=>this.editShowModal(record)} style={{cursor:'pointer'}}>详情</span>
                </span>
            ),
        }];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                const ids = [];
                for(var i=0;i<selectedRows.length;i++){
                    var selectedRow = selectedRows[i];
                    ids.push(selectedRow.id);
                }
                this.setState({
                    selectedRowsId:ids
                });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        };

        return(
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
                    {isFetching ===  true?
                        <div style={{textAlign:"center",position:"absolute",left:"45%",top:"50%"}}>
                            <Spin size="large" />
                        </div>:
                        <div style={{padding:"0 15px"}}>
                            <Table locale={{emptyText:'暂无数据'}} columns={columns} dataSource={this.state.data} bordered  pagination={false}/>
                        </div>}
                    <div className="clear"></div>
                </div>
                {/*分页*/}
                <Pag pageSize={10} nowPage={nowPage} totalRecord={10} pageChange={this.pageChange} />
                <Modal
                    width={900}
                    style={{top:'20px'}}
                    title="详情"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    key={this.state.modalKey}
                >
                    <Row>
                        <Col span={24}  style={{fontSize:'16px'}}>人员信息</Col>
                        <Col span={12}>
                            <Row style={{padding:'32px'}}>
                                <Col span={4}>照片：</Col>
                                <Col span={20}><img src="../../images/zanwu.png" style={{width:'130px',height:'160px'}}/></Col>
                            </Row>
                            <Row style={{padding:'0 32px'}}>
                                <Col span={4}>标签：</Col>
                                <Col span={20}>
                                    <Tag color="red">人员通过</Tag>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Form onSubmit={this.saveModel}>
                                <FormItem
                                    {...formItemLayout}
                                    label="姓名"
                                    style={{marginBottom:'5px'}}
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.label,
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="性别"
                                    style={{marginBottom:'5px'}}
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.sex,
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="民族"
                                    style={{marginBottom:'5px'}}
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.sex,
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="生日"
                                    style={{marginBottom:'5px'}}
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.age,
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="住址"
                                    style={{marginBottom:'5px'}}
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.state,
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="身份证号"
                                    style={{marginBottom:'5px'}}
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.cardId,
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="盘查时间"
                                    style={{marginBottom:'5px'}}
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.time,
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                    <Divider style={{background:'rgb(29, 40, 81)',height:'2px'}}/>
                    <Row>
                        <Col span={24} style={{fontSize:'16px'}}>警员信息</Col>
                        <Col span={12}>
                            <Form>
                                <FormItem
                                    {...formItemLayout}
                                    label="姓名"
                                    style={{marginBottom:'5px'}}
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.address,
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="所在单位"
                                    style={{marginBottom:'5px'}}
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.phone,
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Form>
                        </Col>
                        <Col span={12}>
                            <Form>
                                <FormItem
                                    {...formItemLayout}
                                    label="警号"
                                    style={{marginBottom:'5px'}}
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.zrdw,
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="身份证号"
                                    style={{marginBottom:'5px'}}
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.cycle
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                    <Divider style={{background:'rgb(29, 40, 81)',height:'2px'}}/>
                    <Row>
                        <Col span={24}  style={{fontSize:'16px'}}>写实详情</Col>
                        <Row style={{padding:'32px'}}>
                            <Col span={24}>
                                <img src="../../images/zanwu.png" style={{width:'100px',height:'120px',margin:'5px'}}/>
                                <img src="../../images/zanwu.png" style={{width:'100px',height:'120px',margin:'5px'}}/>
                                <img src="../../images/zanwu.png" style={{width:'100px',height:'120px',margin:'5px'}}/>
                            </Col>
                            <Col span={24}>
                                <FormItem
                                    {...formText}
                                    label="详情"
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.content
                                    })(
                                        <TextArea rows={2} disabled/>
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
            beginDate: moment().format('YYYY-MM-DD 00:00:00'),
            endDate: moment().format('YYYY-MM-DD 23:59:59'),
            police_name: '',
            unitSelected: '',
            tagsSelect: []
        };
    },
    init: function () {
        this.setState({
            sfzh: '',
            name: '',
            beginDate: moment().format('YYYY-MM-DD 00:00:00'),
            endDate: moment().format('YYYY-MM-DD 23:59:59'),
            police_name: '',
            unitSelected: '',
            tagsSelect: []
        });
    },
    componentWillReceiveProps: function (nextProps) {
        if (this.props.type !== nextProps.type) {
            this.init();
        }
    },
    handleSfzhClick: function (id, value) {
        this.setState({
            sfzh: value,
        });
    },
    handleNameClick: function (id, value) {
        this.setState({
            name: value,
        });
    },
    handlePoliceNameClick: function (id, value) {
        this.setState({
            police_name: value,
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
        this.setState({
            unitSelected: value
        });
    },
    ontagsChange: function (value) {
        this.setState({
            tagsSelect: value
        });
    },
    handleClick: function () { //点击查询
        let nowPage = this.props.nowPage;
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                type: this.props.type,
                name: this.state.name,
                idcard: this.state.sfzh,
                beginTime: this.state.beginDate,
                endTime: this.state.endDate,
                police_unitcode: this.state.unitSelected,
                police_name: this.state.police_name,
                tags: this.state.tagsSelect
            },
            showCount: constants.pageSize
        }

        // store.dispatch(fetchPersonnelInventoryData(creds));

        // this.props.serchChange(this.state.sfzh, this.state.name,
        //     this.state.beginDate, this.state.endDate, this.state.unitSelected,
        //     this.state.police_name, this.state.tagsSelect);

    },
    handleClickExport: function () { //点击导出
        // //this.handleClick();
        // let url = api + '/data/exportPersonExcel';
        // url += '?type=' + this.props.type;
        // url += '&name=' + this.state.name;
        // url += '&idcard=' + this.state.sfzh;
        // url += '&beginTime=' + this.state.beginDate;
        // url += '&endTime=' + this.state.endDate;
        // url += '&police_unitcode=' + this.state.unitSelected;
        // url += '&police_name=' + this.state.police_name;
        // url += '&tags=' + this.state.tagsSelect;
        // url += '&Authorization=' + sessionStorage.getItem('id_token') || '';
        // //store.dispatch(fetchExportPersonExcel(url)); //getPersonList_ly  getPersonList
        // window.open(url);
    },
    handleClickClear: function () { //点击清除
        // store.dispatch(changeShade('block'));
        // this.props.createClick("block");
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

        let sfzh = this.state.sfzh;
        let name = this.state.name;
        let police_name = this.state.police_name;
        let beginDate = this.state.beginDate;
        let endDate = this.state.endDate;
        let gender = this.state.gender;
        let unitSelected = this.state.unitSelected;
        let tagsSelect = this.state.tagsSelect;

        let beginDateValue = '';
        if (beginDate === '') {
        } else {
            beginDateValue = moment(beginDate, 'YYYY-MM-DD HH:mm:ss');
        }
        let endDateValue = '';
        if (endDate === '') {
        } else {
            endDateValue = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
        }

        if (beginDateValue != "" && endDateValue != "" && beginDateValue > endDateValue) {
            message.error('提示：开始时间不能大于结束时间！');
            return;
        }
        return (
            <div>
                <div className="marLeft40 z_searchDiv">
                    <label htmlFor="" className="font14">人员姓名：</label>
                    <Input style={{width:'130px',marginRight:"10px"}} type="text" id='name' placeholder='请输入姓名' value={name} callbackParent={this.handleNameClick} />
                    <label htmlFor="" className="font14">身份证号：</label>
                    <Input style={{width:'130px',marginRight:"10px"}} type="text" id='sfzh' placeholder='请输入身份证号' value={sfzh} callbackParent={this.handleSfzhClick} />
                    <label htmlFor="" className="font14">单位：</label>
                    <Select key='select'
                            style={{ width: 175, marginRight: "10px" }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={this.handleSelectChange}
                            value={unitSelected}
                            dropdownMatchSelectWidth={false}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            notFoundContent='暂无'
                    >
                        <Option key="all" value="">全部</Option>
                        {policeUnitsOptions}
                    </Select>
                    <label htmlFor="" className="font14">起止时间：</label>
                    <DatePicker format='YYYY-MM-DD HH:mm:ss' showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                allowClear={false} style={{ marginRight: "10px" }} value={beginDateValue}
                                onChange={this.handleBeginDeteClick}
                                onOk={this.onOkBegin}
                    />
                    <span className="font14" style={{ marginRight: "10px" }}>至</span>
                    <DatePicker format='YYYY-MM-DD HH:mm:ss' showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                allowClear={false} style={{ marginRight: "10px" }} value={endDateValue} defaultValue=""
                                onChange={this.handleEndDeteClick}
                                onOk={this.onOkEnd}
                    />

                </div>
                <div style={{ marginLeft: "2%", marginTop: "20px" }}>
                    <label htmlFor="" className="font14">警员姓名：</label>
                    <Input style={{width:'130px',marginRight:"10px"}} type="text" id='police_name' placeholder='请输入警员姓名' value={police_name} callbackParent={this.handlePoliceNameClick} />
                    <label htmlFor="" className="font14">标签：</label>
                    {/*标签*/}
                    <Select key='tagselect'
                            mode="multiple"
                            style={{ width: 570, marginRight: "10px" }}
                            placeholder="请选择人员标签"
                        //defaultValue={['a10', 'c12']}
                            onChange={this.ontagsChange}
                            value={tagsSelect}
                            notFoundContent='暂无'
                    >
                        {personTagsOptions}
                    </Select>
                    <ShallowBlueBtn width="82" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                    <ShallowBlueBtn width="82" text="重置" margin="0 10px 0 0" onClick={this.init} />
                    {/*<ShallowBlueBtn width="82" text="导出" margin="0 10px 0 0" onClick={this.handleClickExport} />*/}
                    <Button style={{ margin: '0 10px 0 0', width: "82px" }} onClick={this.handleClickExport} className="btn_ok">
                        <Icon type="download" /> 导出
                    </Button>
                </div>
            </div>

        );
    }
})
PersonnelInventory = Form.create()(PersonnelInventory);
export default connect(mainReducer)(PersonnelInventory);