import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mainReducer} from "../../reducers/reducers";
import {StylePage, ShallowBlueBtn, Pag,} from "../generalPurposeModule";
import {store} from '../../index.js';
import * as constants from "../../utils/Constants";
import {monthFormat, dateFormat, serverUrl} from '../../utils/';
import {Spin, Table, message, Input, Modal, Button, Form, Icon, Row, Col, Select, DatePicker} from 'antd';

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

export  class WithdrawPerson extends Component{
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
                {key: 1, serial: 1, cardId: '230106196201222121', label: '张三', sex:'男',age:'26', state:'暂住', phone:'13936003633',zrdw:'呼伦浩特市XX单位', updatetime: '2018-04-10',cycle:'按周',address:'玉泉区兴隆巷1106号'},
                {key: 2, serial: 2, cardId: '230106196201222121', label: '李四', sex:'男',age:'26', state:'暂住', phone:'13936003633',zrdw:'呼伦浩特市XX单位', updatetime: '2018-04-10',cycle:'按周',address:'玉泉区兴隆巷1106号'},
                {key: 3, serial: 3, cardId: '230106196201222121', label: '王二', sex:'男',age:'26', state:'暂住', phone:'13936003633',zrdw:'呼伦浩特市XX单位', updatetime: '2018-04-10',cycle:'按周',address:'玉泉区兴隆巷1106号'},
                {key: 4, serial: 4, cardId: '230106196201222121', label: '买买提', sex:'男',age:'26', state:'暂住', phone:'13936003633',zrdw:'呼伦浩特市XX单位', updatetime: '2018-04-10',cycle:'按天',address:'玉泉区兴隆巷1106号'},
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
            title: '身份证号',
            dataIndex: 'cardId',
            width:180,
        },{
            title: '姓名',
            dataIndex: 'label',
        },{
            title: '性别',
            dataIndex: 'sex',
        },{
            title: '年龄',
            dataIndex: 'age',
        },{
            title: '居住类型',
            dataIndex: 'state',
        },{
            title: '现居住地址',
            dataIndex: 'address',
        },{
            title: '联系电话',
            dataIndex: 'phone',
        },{
            title: '隶属任务',
            dataIndex: 'zrdw',
        },{
            title: '任务周期',
            dataIndex: 'cycle',
        }, {
            title: '更新时间',
            dataIndex: 'updatetime',
        }, {
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
                    width={700}
                    title="详情"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    key={this.state.modalKey}
                >
                    <Row>
                        <Col span={12}>
                            <Form onSubmit={this.saveModel}>
                                <FormItem
                                    {...formItemLayout}
                                    label="身份证号"
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.cardId,
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="姓名"
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
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.sex,
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="年龄"
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.age,
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="居住类型"
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.state,
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
                                    label="现居住地址"
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.address,
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="联系电话"
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.phone,
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="隶属任务"
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.zrdw,
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="任务周期"
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.cycle
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="更新时间"
                                >
                                    {getFieldDecorator('value', {
                                        initialValue:this.state.personInfo.updatetime,
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}

//搜索区域内容组件
const SearchArea = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            cardId:'',
            nameClear:'',
            status:'',
            WorkPlace:'',
            begindate: '',
            enddate: '',
            cycle:''

        };
    },
    handleNameChange: function(e) {
        this.setState({
            name: e.target.value
        });
    },
    handleCardChange: function (e) {
        this.setState({
            cardId: e.target.value
        });
    },
    statusChange:function(value){
        this.setState({
            status: value
        });
    },
    cycleChange:function(value){
        this.setState({
            cycle: value
        });
    },
    WorkPlaceChange:function (e) {
        this.setState({
            WorkPlace: e.target.value
        });
    },
    handleClick: function() { //点击查询
        let {name} = this.state;
        console.log('查询', name);
    },
    init:function () {
        this.setState({
            name: '',
            cardId:'',
            nameClear:'',
            status:'',
            WorkPlace:'',
            begindate: '',
            enddate: '',
            cycle:''
        });
    },
    showModal: function() {
        this.setState({
            visible: true,
        });
    },
    hideModalOk: function() {
        this.setState({
            visible: false,
        });
        this.props.handleDelete();
    },
    handleBeginDeteClick: function(date, dateString) {
        this.setState({
            begindate: dateString,
        });
    },
    handleEndDeteClick: function(date, dateString) {
        this.setState({
            enddate: dateString,
        });
    },
    hideModal: function() {
        this.setState({
            visible: false,
        });
    },
    render() {
        let {name,cardId,status,WorkPlace, enddate, begindate,cycle} = this.state;
        let beginDateValue = '';
        if (begindate === '') {} else {
            beginDateValue = moment(begindate, dateFormat);
        }
        let endDateValue = '';
        if (enddate === '') {} else {
            endDateValue = moment(enddate, dateFormat);
        }
        return (
            <div className="marLeft40 fl z_searchDiv">
                <label htmlFor="" className="font14">身份证号：</label>
                <Input style={{width:'130px',marginRight:"10px"}} type="text"  id='name' placeholder='请输入身份证号'  value={cardId} onChange={this.handleCardChange}/>
                <label htmlFor="" className="font14">姓名：</label>
                <Input style={{width:'130px',marginRight:"10px"}} type="text"  id='name' placeholder='请输入人员姓名'  value={name}  onChange={this.handleNameChange}/>
                <label htmlFor="" className="font14">居住类型：</label>
                <Select value={status} style={{ width: 100 ,marginRight:"10px" }} onChange={this.statusChange} notFoundContent='暂无'>
                    <Option value="">全部</Option>
                    <Option value="常住">常住</Option>
                    <Option value="暂住">暂住</Option>
                    <Option value="流动">流动</Option>
                </Select>
                <label htmlFor="" className="font14">隶属任务：</label>
                <Input style={{width:'130px',marginRight:"10px"}} type="text"  id='name' placeholder='请输入隶属任务'  value={WorkPlace}  onChange={this.WorkPlaceChange}/>
                <label htmlFor="" className="font14">任务周期：</label>
                <Select value={cycle} style={{ width: 100 ,marginRight:"10px" }} onChange={this.cycleChange} notFoundContent='暂无'>
                    <Option value="">全部</Option>
                    <Option value="按周">按周</Option>
                    <Option value="按天">按天</Option>
                </Select>
                <label htmlFor="" className="font14">更新时间：</label>
                <DatePicker format={dateFormat} allowClear={false} style={{marginRight:"10px",width:'130px'}} value={beginDateValue} placeholder="请选择日期" onChange={this.handleBeginDeteClick}/>
                <span className="font14" style={{margin:"0 10px 0 0"}}>至</span>
                <DatePicker format={dateFormat} allowClear={false} style={{marginRight:"10px",width:'130px'}} placeholder="请选择日期"  value={endDateValue} onChange={this.handleEndDeteClick}/>
                <ShallowBlueBtn width="80px" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                <ShallowBlueBtn width="80px" text="重置" margin="0 10px 0 0" onClick={this.init} />
            </div>
        );
    }
})
WithdrawPerson = Form.create()(WithdrawPerson);
export default connect(mainReducer)(WithdrawPerson);