/**
 * 管控人员右侧组件
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mainReducer} from "../../reducers/reducers";
import {StylePage, ShallowBlueBtn, Pag,} from "../generalPurposeModule";
import {store} from '../../index.js';
import * as constants from "../../utils/Constants";
import {serverUrls, getLocalTime} from '../../utils/index';
import {monthFormat, dateFormat, serverUrl} from '../../utils/';
import {Spin, Table, message, Input, Modal, Button, Form, Icon, Row, Col, Select, DatePicker, Divider, List, Popconfirm,Upload} from 'antd';
import {getControlPersonList, getControlDetail,getControlExport,getControlDownload,getCustomFiledList} from "../../actions/ControlPersonnel";
import moment from 'moment';
import 'moment/locale/zh-cn';
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
const newWord = []
let controlType = ''

export  class Control extends Component{
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
            newWords:[]
        };
        this.pageChange = this.pageChange.bind(this);
        let controlType = this.props.controlType;
        console.log(controlType)
    }

    componentDidMount() {
        let creds = {}
        store.dispatch(getControlPersonList(creds))
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.controlType!==nextProps.controlType){
            let creds = '';
            if(nextProps.controlType==='GK_WGK'){
                creds = {pd:{control_type:0}}
                this.getList(creds)
            }else if(nextProps.controlType==='GK_YGK'){
                creds = {pd:{control_type:1}}
                this.getList(creds)
            }else if(nextProps.controlType==='GK_LKZRQ') {
                creds = {pd:{control_type:2}}
                this.getList(creds)
            }else if(nextProps.controlType==='GK_SK'){
                creds = {pd:{control_type:3}}
                this.getList(creds)
            }else if(nextProps.controlType==='LY_DR'){
                creds = {pd:{source:'901006'}}
                this.getList(creds)
            }else if(nextProps.controlType==='LY_XZ'){
                creds = {pd:{source:'901008'}}
                this.getList(creds)
            }else{
                creds = {}
                this.getList(creds)
            }
        }
    }

    editShowModal = (record) => {
        console.log(record)
        let cerds = {id:record.id}
        store.dispatch(getControlDetail(cerds))
        this.setState({
            visible: true,
            modalType: 'edit',
            newWords:newWord
        });
    }
    addShowModal = (record) => {
        this.setState({
            visible: true,
            modalType: 'add',
            newWords:newWord
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            modalKey: this.state.modalKey + 1
        });
    }
    handleExport = () => {
        let path = serverUrls + store.getState().ControlPersonnel.data.getExport.result.path;
        window.open(path);
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
    getList(creds){
        store.dispatch(getControlPersonList(creds))
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let nowPage = this.state.nowPage;
        let isFetching = store.getState().ControlPersonnel.isFetching;
        let newWords = this.state.newWords;
        let dataList = [];
        controlType = this.props.controlType;
        let list = store.getState().ControlPersonnel.data.ControlPersonList.result.list;
        for(let i in list){
            if(i !== 'remove'){
                dataList.push({id:list[i].id,key: parseInt(i) + 1, serial: parseInt(i) + 1, cardId: list[i].idcard, label: list[i].name, sex: list[i].sex == '0' ? '男': '女' ,age:list[i].age, state:(list[i].address_type == '0' ? '常住' : (list[i].address_type == '1' ? '暂住' : '流动')), phone:list[i].phone,zrdw:list[i].subordination_task, updatetime: getLocalTime(list[i].updatetime),cycle:list[i].cycle == '0' ? '按天' : '按周',address:list[i].address,personFrom:list[i].source === '901006' ? '后台导入':'前端新增'})
            }
        }
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
        },{
            title: '人员来源',
            dataIndex: 'personFrom',
        }, {
            title: '更新时间',
            dataIndex: 'updatetime',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <span onClick={(e)=>this.editShowModal(record)} style={{cursor:'pointer'}}>详情</span>
                    {/*<Divider className={controlType === 'GZ_NLHRY' || controlType === 'GZ_ZALY' || controlType === 'LY_DR' || controlType === 'LY_XZ' || controlType === 'LY_XZ' ? '' : 'noneDiv'} type="vertical" />*/}
                    {/*<span className={controlType === 'GK_WGK' || controlType === 'GK_YGK' || controlType === 'GK_LKZRQ' || controlType === 'GK_SK' ? '' : 'noneDiv'} onClick={(e)=>this.editShowModal(record)} style={{cursor:'pointer'}}>详情</span>*/}
                    {/*<Divider className={controlType === 'GK_WGK' || controlType === 'GK_YGK' || controlType === 'GK_LKZRQ' || controlType === 'GK_SK' ? '' : 'noneDiv'} type="vertical" />*/}
                    {/*<Popconfirm title="是否确定该人员离开责任区？" okText="确定" cancelText="取消">*/}
                    {/*<span className={controlType === 'GK_WGK' || controlType === 'GK_YGK' || controlType === 'GK_LKZRQ' || controlType === 'GK_SK' ? '' : 'noneDiv'} style={{cursor:'pointer'}}>离开责任区</span>*/}
                    {/*</Popconfirm>*/}
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
                console.log('ids',ids)
                this.setState({
                    selectedRowsId:ids
                });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        };
        const newFormList = [];
        if(newWords.length > 0){
            for(let i in newWords){
                if(newWords[i].type === '文本'){
                    newFormList.push(
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label={newWords[i].name}
                            >
                                {getFieldDecorator('wordText' + i, {
                                    initialValue:this.state.modalType === 'edit' ? '' : '',
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    )
                }else if(newWords[i].type === '下拉框'){
                    let strs = []
                    strs=newWords[i].option.split("，");
                    const children = [];
                    for(let j in strs){
                        if(j!='remove'){
                            children.push(<Option key={j}>{strs[j]}</Option>);
                        }
                    }
                    newFormList.push(
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label={newWords[i].name}
                            >
                                {getFieldDecorator('wordName', {
                                    initialValue:this.state.modalType === 'edit' ? '' : '',
                                })(
                                    <Select>
                                        {children}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    )
                }
            }
        }
        let detail = store.getState().ControlPersonnel.data.getControlPersonListById.result.data;
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
                            handleExport={this.handleExport}
                            serchChange={this.serchChange}
                            form={this.props.form}
                            controlType = {this.props.controlType}
                            selectedRowsId = {this.state.selectedRowsId}
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
                            <Table locale={{emptyText:'暂无数据'}}  rowSelection={controlType === 'GZ_NLHRY' || controlType === 'GZ_ZALY' ? undefined : rowSelection} columns={columns} dataSource={dataList} bordered  pagination={false}/>
                        </div>}
                    <div className="clear"></div>
                </div>
                {/*分页*/}
                <Pag pageSize={10} nowPage={nowPage} totalRecord={10} pageChange={this.pageChange} />
                <Modal
                    width={700}
                    title="任务详情"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    key={this.state.modalKey}
                >
                    <Row>
                        <Form onSubmit={this.saveModel}>
                            <Col span={12} style={{ padding: '0 38px' }}>
                                <span style={{color:"#fff"}}>照片：</span>
                                {detail.zpurl!=='' ? <img src={detail.zpurl} style={{ width: '130px', height: '160px' }} /> : <img src="../../images/zanwu.png" style={{ width: '130px', height: '160px' }} />}
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="身份证号"
                                >
                                    {getFieldDecorator('cardId ', {
                                        initialValue:this.state.modalType === 'edit' ? detail.idcard : '',
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="姓名"
                                >
                                    {getFieldDecorator('lable', {
                                        initialValue:this.state.modalType === 'edit' ? detail.name : '',
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="性别"
                                >
                                    {getFieldDecorator('sex', {
                                        initialValue:this.state.modalType === 'edit' ? (detail.sex == '0' ? '男' : '女') : '',
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="年龄"
                                >
                                    {getFieldDecorator('age', {
                                        initialValue:this.state.modalType === 'edit' ? detail.age : '',
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="户籍地址"
                                >
                                    {getFieldDecorator('address', {
                                        initialValue:this.state.modalType === 'edit' ? detail.address : '',
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="民族"
                                >
                                    {getFieldDecorator('nation', {
                                        initialValue:this.state.modalType === 'edit' ? detail.nation : '',
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="居住类型"
                                >
                                    {getFieldDecorator('state', {
                                        initialValue:this.state.modalType === 'edit' ? (detail.address_type=='0'?'常住':(detail.address_type=='1'?'暂住':'流动')) : '',
                                    })(
                                        <Select notFoundContent='暂无' disabled>
                                            <Option value="">全部</Option>
                                            <Option value="常住">常住</Option>
                                            <Option value="暂住">暂住</Option>
                                            <Option value="流动">流动</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="现居住地址"
                                >
                                    {getFieldDecorator('address', {
                                        initialValue:this.state.modalType === 'edit' ? detail.now_address : '',
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="工作地址"
                                >
                                    {getFieldDecorator('address', {
                                        initialValue:this.state.modalType === 'edit' ? '' : '',
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="联系电话"
                                >
                                    {getFieldDecorator('phone', {
                                        initialValue:this.state.modalType === 'edit' ? detail.phone : '',
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="隶属任务"
                                >
                                    {getFieldDecorator('zrdw', {
                                        initialValue: this.state.modalType === 'edit' ? detail.subordination_task : '',
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="任务周期"
                                >
                                    {getFieldDecorator('cycle', {
                                        initialValue:this.state.modalType === 'edit' ? (detail.cycle=='0'?'每天':'每周') : '',
                                    })(
                                        <Select notFoundContent='暂无' disabled>
                                            <Option value="">全部</Option>
                                            <Option value="按周">按周</Option>
                                            <Option value="按天">按天</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="人员来源"
                                >
                                    {getFieldDecorator('personFrom', {
                                        initialValue: this.state.modalType === 'edit' ? (detail.source === '901006'?'后台导入':'前端新增') : '',
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="人员属性"
                                >
                                    {getFieldDecorator('personType', {
                                        initialValue: this.state.modalType === 'edit' ? this.state.personInfo.personType : '',
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="是否有车"
                                >
                                    {getFieldDecorator('car', {
                                        initialValue: this.state.modalType === 'edit' ? this.state.personInfo.car : '',
                                    })(
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="更新时间"
                                >
                                    {getFieldDecorator('time', {
                                        initialValue:this.state.modalType === 'edit' ? getLocalTime(detail.updatetime) : '',
                                    })(
                                        //<DatePicker placeholder="" allowClear={false} style={{width:"190px"}} disabled/>
                                        <Input disabled/>
                                    )}
                                </FormItem>
                            </Col>
                            {newFormList}
                        </Form>
                    </Row>
                    {/*<Row>*/}
                    {/*<Col span={15} style={{textAlign: 'right'}}>*/}
                    {/*<Button htmlType="submit"  className="btn_ok">保存</Button>*/}
                    {/*<Button style={{marginLeft: 30}} onClick={this.handleCancel} className="btn_delete">取消</Button>*/}
                    {/*</Col>*/}
                    {/*</Row>*/}
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
            cycle: '',
            zdyModal: false,
            zdyModals: false,
            wordType: '',
            showInput:{display:'none'},
            wordName:'',
            OptionWords:'',
            addModal: false,
            showDel:{display:'none'},
            prompt: false,
            promptText:'',
            prompType:''
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
        let {name,cardId,status,WorkPlace,begindate,enddate} = this.state;
        console.log(name, cardId, status, WorkPlace, begindate, enddate)
        let controlType = this.props.controlType
        let creds = ''
        if(controlType === 'GK_WGK'){
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),subordination_task:WorkPlace, beginTime:begindate,endTime:enddate,control_type:0}}
        }else if(controlType === 'GK_YGK'){
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),subordination_task:WorkPlace, beginTime:begindate,endTime:enddate,control_type:1}}
        }else if(controlType === 'GK_LKZRQ'){
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),subordination_task:WorkPlace, beginTime:begindate,endTime:enddate,control_type:2}}
        }else if(controlType === 'GK_SK'){
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),subordination_task:WorkPlace, beginTime:begindate,endTime:enddate,control_type:3}}
        } else if(controlType === 'LY_DR'){
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),subordination_task:WorkPlace, beginTime:begindate,endTime:enddate,source:"901006"}}
        } else if(controlType === 'LY_XZ'){
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),subordination_task:WorkPlace, beginTime:begindate,endTime:enddate,source:"901008"}}
        } else {
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),subordination_task:WorkPlace, beginTime:begindate,endTime:enddate}}
        }
        store.dispatch(getControlPersonList(creds))
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
            zdyModal:true
        });
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
            zdyModal: false,
            addModal:false,
            prompt: false
        });
    },
    hideDel:function(){
        this.setState({
            zdyModals: true,
            visible: false
        });
    },
    hideModals: function() {
        this.setState({
            zdyModals: false,
            zdyModal: true,
        });
    },
    getNewWords: function(){
        let creds = {}
        store.dispatch(getCustomFiledList(creds))
        this.setState({
            zdyModal: true,
            wordType: '',
            showInput:{display:'none'},
            wordName:''
        });
    },
    getSelects: function(value){
        if(value=='0'){
            this.setState({
                showInput: {display:'none'},
                wordType:'文本'
            });
        }else if(value=='1'){
            this.setState({
                showInput: {display:'block'},
                wordType:'下拉框'
            });
        }
    },
    getOptions:function(e){
        this.setState({
            OptionWords:e.target.value
        })
    },
    changeWordName:function (e) {
        this.setState({
            wordName:e.target.value
        });
    },
    saveNewWord:function () {
        if(this.state.wordName !== ''){
            newWord.push({name:this.state.wordName,type:this.state.wordType,option:this.state.OptionWords})
            this.hideModals();
        }
    },
    getAddModal:function(){
        this.setState({
            addModal:true
        });
    },
    addNewsWord:function (type, record) {
        if(type === 'update'){
            this.setState({
                showDel:{margin:'0 0 0 30px'},
                wordName:record.name,
                wordType:record.type
            })
            this.getSelects(record.type)
        }else if(type === 'add'){
            this.setState({
                showDel:{display:'none'},
                wordName:'',
                wordType:''
            })
            this.getSelects('0')
        }
        this.setState({
            zdyModals:true,
            zdyModal:false
        });
    },
    getDelete:function () {
        this.setState({
            visible:true,
            zdyModals:false
        })
    },
    importOnChange:function(info) {
        if(info.file.response.reason!==null){
            if(info.file.response.reason.code === '400'){
                message.error(`提示：${info.file.response.reason.text}`,5);
            }else{
                message.success(`提示：${info.file.response.reason.text}`);
            }
        }
        if (info.file.status === 'uploading') {
            this.importEnterLoading();
        }
        if (info.file.status !== 'uploading') {
            //console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            let creds = '';
            let controlType = this.props.controlType
            if(controlType==='GK_WGK'){
                creds = {pd:{control_type:0}}
            }else if(controlType==='GK_YGK'){
                creds = {pd:{control_type:1}}
            }else if(controlType==='GK_LKZRQ') {
                creds = {pd:{control_type:2}}
            }else if(controlType==='GK_SK'){
                creds = {pd:{control_type:3}}
            }else if(controlType==='LY_DR'){
                creds = {pd:{source:'901006'}}
            }else if(controlType==='LY_XZ'){
                creds = {pd:{source:'901008'}}
            }else{
                creds = {}
            }
            store.dispatch(getControlPersonList(creds))

            this.setState({
                importLoading: false,
            });


        } else if (info.file.status === 'error') {
            message.error(`提示：${info.file.name} 上传失败!`);
            this.setState({
                importLoading: false,
            });
        }
    },
    beforeUpload:function(file, fileList) {
        var rag = /\.(xls|xlsx|XLS|XLSX)$/;
        if(!rag.test(file.name)){
            message.error('提示：请上传excel!');
        }
        return;
    },
    getPrompt:function (type) {
        if(type === 'download'){
            this.setState({
                promptText:'是否确定下载导入模板？',
                prompType:'download'
            })
            store.dispatch(getControlDownload())
        }else if(type === 'export'){
            this.setState({
                promptText:'是否确定导出数据？',
                prompType:'export'
            })
            let creds = {ids:this.props.selectedRowsId.toString()}
            store.dispatch(getControlExport(creds))
        }
        this.setState({
            prompt:true,
        })
    },
    exportModal:function(){
        this.props.handleExport();
    },
    downloadModal:function () {
        let path = serverUrls + store.getState().ControlPersonnel.data.Download.result.path;
        window.open(path);
    },
    render() {
        const {getFieldDecorator} = this.props.form
        let {name,cardId,status,WorkPlace, enddate, begindate,cycle,wordType,showInput,wordName,OptionWords,showDel} = this.state;
        let beginDateValue = '';
        if (begindate === '') {} else {
            beginDateValue = moment(begindate, dateFormat);
        }
        let endDateValue = '';
        if (enddate === '') {} else {
            endDateValue = moment(enddate, dateFormat);
        }
        let zdyStyle = {width:"110px", marginRight:"10px",display:'none'}
        let userItem = JSON.parse(sessionStorage.getItem('user'));
        userItem.menu.map((menu)=>{
            if(menu.resourceCode === 'gkry_zdyzd_btn'){
                zdyStyle = {width:"110px", marginRight:"10px"}
            }
        })
        const columns = [{
            title: '序号',
            dataIndex: 'serial',
            width:80,
        },{
            title: '任务名称',
            dataIndex: 'name',
        },{
            title: '任务类别',
            dataIndex: 'type',
        },{
            title: '任务周期',
            dataIndex: 'cycle',
            width:80,
        }];
        const data = [
            {serial:'1',name:'玉泉区兴隆派出所按天盘查',type:'周期任务',cycle:'按天'},
            {serial:'2',name:'玉泉区兴隆派出所按周盘查',type:'周期任务',cycle:'按周'}
        ]
        const newWord = store.getState().ControlPersonnel.data.Download.result.list
        const list = [{
            key: 'name',
            render: (text, record) => (
                <span onClick={(e)=>this.addNewsWord('update', record)} style={{cursor:'pointer'}}>{record.name}</span>
            ),
        }];
        //上传
        const upLoad = {
            name: 'file',
            action: serverUrls + '/data/importControlPersonExcel',
            headers: {
                Authorization: sessionStorage.getItem('id_token') || '',
            },
            data: {
                userName: sessionStorage.getItem('userName') || '',
            },
            showUploadList: false,
        };
        let btns = (
            <div style={{marginTop:"15px"}}>
                <Button style={{width:"110px", marginRight:"10px",float:'left'}} onClick={this.getAddModal} className="btn_ok">添加到任务</Button>
                <div  style={{float:'left'}}>
                    <Upload {...upLoad} onChange={this.importOnChange} beforeUpload={this.beforeUpload} showUploadList={false}>
                        <Button style={{width:"80px", marginRight:"10px"}} className="btn_ok">导入</Button>
                    </Upload>
                </div>
                <Button style={{width:"80px", marginRight:"10px"}} className="btn_ok" onClick={() => this.getPrompt('export')}>导出</Button>
                <Button style={{width:"110px", marginRight:"10px"}} className="btn_ok" onClick={() => this.getPrompt('download')}>模板下载</Button>
                <Button style={zdyStyle} className="btn_ok" onClick={this.getNewWords}>自定义字段</Button>
            </div>
        )
        let controlType = this.props.controlType
        if(controlType === 'GZ_NLHRY' || controlType === 'GZ_ZALY'){
            btns = ''
        }else if(controlType === 'GK_YGK'){
            btns = (
                <div style={{marginTop:"15px"}}>
                    <Button style={{width:"110px", marginRight:"10px"}} onClick={this.getAddModal} className="btn_ok">变更任务</Button>
                    <Button style={{width:"80px", marginRight:"10px"}} className="btn_ok" onClick={() => this.getPrompt('export')}>导出</Button>
                </div>
            )
        }else if(controlType === 'GK_LKZRQ' || controlType === 'GK_SK'){
            btns = (
                <div style={{marginTop:"15px"}}>
                    <Button style={{width:"110px", marginRight:"10px"}} onClick={this.getAddModal} className="btn_ok">添加到任务</Button>
                    <Button style={{width:"80px", marginRight:"10px"}} className="btn_ok" onClick={() => this.getPrompt('export')}>导出</Button>
                </div>
            )
        }else if(controlType === 'LY_DR' || controlType === 'LY_XZ'){
            btns = (
                <div style={{marginTop:"15px"}}>
                    <Button style={{width:"110px", marginRight:"10px"}} className="btn_ok" onClick={() => this.getPrompt('export')}>导出</Button>
                </div>
            )
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
                    <Option value="0">常住</Option>
                    <Option value="1">暂住</Option>
                    <Option value="2">流动</Option>
                </Select>
                <label htmlFor="" className="font14">隶属任务：</label>
                <Input style={{width:'130px',marginRight:"10px"}} type="text"  id='name' placeholder='请输入隶属任务'  value={WorkPlace}  onChange={this.WorkPlaceChange}/>
                {/*<label htmlFor="" className="font14">任务周期：</label>*/}
                {/*<Select value={cycle} style={{ width: 100 ,marginRight:"10px" }} onChange={this.cycleChange} notFoundContent='暂无'>*/}
                {/*<Option value="">全部</Option>*/}
                {/*<Option value="按周">按周</Option>*/}
                {/*<Option value="按天">按天</Option>*/}
                {/*</Select>*/}
                <label htmlFor="" className="font14">更新时间：</label>
                <DatePicker format={dateFormat} allowClear={false} style={{marginRight:"10px",width:'130px'}} value={beginDateValue} placeholder="请选择日期" onChange={this.handleBeginDeteClick}/>
                <span className="font14" style={{margin:"0 10px 0 0"}}>至</span>
                <DatePicker format={dateFormat} allowClear={false} style={{marginRight:"10px",width:'130px'}} placeholder="请选择日期"  value={endDateValue} onChange={this.handleEndDeteClick}/>
                <ShallowBlueBtn width="80px" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                <ShallowBlueBtn width="80px" text="重置" margin="0 10px 0 0" onClick={this.init} />
                <div>
                    {btns}
                    <Modal style={{top:"38%"}}
                           title="任务列表"
                           visible={this.state.addModal}
                           footer={null}
                           onCancel={this.hideModal}
                           width={750}
                    >
                        <div style={{margin:'0 0 16px 0'}}>
                            <Input style={{width:'520px',marginRight:"10px"}} type="text"  id='name' placeholder='请输入任务名称' onChange={this.handleCardChange}/>
                            <ShallowBlueBtn width="80px" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                            <ShallowBlueBtn width="80px" text="重置" onClick={this.init} />
                        </div>
                        <Table locale={{emptyText:'暂无数据'}} columns={columns} dataSource={data} bordered/>
                    </Modal>
                    <Modal style={{top:"38%"}}
                           title="提示"
                           visible={this.state.prompt}
                           footer={null}
                           maskClosable={false}
                           closable={false}
                    >
                        <p style={{fontSize:"16px",}}>{this.state.promptText}</p>
                        <p style={{marginTop:"20px",textAlign:"center"}}>
                            <Button style={{margin:'0 20px 0 0 ',width:"80px"}} onClick={this.state.prompType==='export'? this.exportModal:this.downloadModal} className="btn_ok">
                                确定
                            </Button>
                            <Button style={{margin:'',width:"80px"}} onClick={this.hideModal} className="btn_delete">
                                取消
                            </Button>
                        </p>

                    </Modal>
                    <Modal style={{top:"38%"}}
                           title="自定义字段"
                           visible={this.state.zdyModal}
                           footer={null}
                           className="ModalList"
                           onCancel={this.hideModal}
                    >
                        <Table locale={{emptyText:'暂无字段'}} columns={list} dataSource={newWord} bordered  pagination={false} showHeader={false}/>
                        <p style={{marginTop:"20px",textAlign:"center"}}>
                            <Button style={{margin:'0 15px 0 0 ',width:'100%',fontSize:'30px',lineHeight:'0'}} onClick={() => this.addNewsWord('add')} className="btn_ok">
                                +
                            </Button>
                        </p>
                    </Modal>
                    <Modal style={{top:"38%"}}
                           title="自定义字段"
                           visible={this.state.zdyModals}
                           footer={null}
                           onCancel={this.hideModals}
                    >
                        <Form onSubmit={this.saveModel}>
                            <FormItem
                                {...formItemLayout}
                                label="字段名称"
                            >
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true, message: '请输入字段名称!',

                                    },{
                                        max:20,message:'最多输入二十个字符!',
                                    }],
                                    initialValue: wordName,
                                    validateFirst:true
                                })(
                                    <Input onChange={this.changeWordName}/>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="字段类型"
                            >
                                <Select value={wordType} onChange={this.getSelects}>
                                    <Option value="0">文本</Option>
                                    <Option value="1">下拉框</Option>
                                </Select>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="下拉值"
                                style={showInput}
                            >
                                <Input value={OptionWords} onChange={this.getOptions}/>
                            </FormItem>
                        </Form>
                        <p style={{marginTop:"20px",textAlign:"center"}}>
                            <Button htmlType="submit" onClick={this.saveNewWord} className="btn_ok">
                                保存
                            </Button>
                            <Button style={showDel} onClick={this.getDelete} className="btn_delete">
                                删除
                            </Button>
                        </p>
                    </Modal>
                    <Modal style={{top:"38%"}}
                           title="提示"
                           visible={this.state.visible}
                           footer={null}
                           maskClosable={false}
                           closable={false}
                    >
                        <p style={{fontSize:"16px",}}>是否确定删除该自定义字段？</p>
                        <p style={{marginTop:"20px",textAlign:"center"}}>
                            <Button style={{margin:'0 20px 0 0 ',width:"80px"}} onClick={this.hideModalOk} className="btn_ok">
                                确定
                            </Button>
                            <Button style={{margin:'',width:"80px"}} onClick={this.hideDel} className="btn_delete">
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
Control = Form.create()(Control);
export default connect(mainReducer)(Control);