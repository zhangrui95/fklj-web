/**
 * 管控人员右侧组件
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mainReducer} from "../../reducers/reducers";
import {StylePage, ShallowBlueBtn} from "../generalPurposeModule";
import {store} from '../../index.js';
import * as constants from "../../utils/Constants";
import {serverUrls, getLocalTime} from '../../utils/index';
import {monthFormat, dateFormat, serverUrl} from '../../utils/';
import {Spin, Table, message, Input, Modal, Button, Form, Icon, Row, Col, Select, DatePicker, Divider, List, Popconfirm,Upload} from 'antd';
import {Regular} from '../../components/Regular'
import {getControlPersonList, getControlDetail,getControlExport,getControlDownload,getCustomFiledList,insertOrUpdateCustomFiled,delCustomFiled,updateTaskModelControlPerson,getTaskModelList} from "../../actions/ControlPersonnel";
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

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
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
            loading: false,
            personInfo:'',
            modalKey: 0,
            modalType: '',
            remark:"",
            zoomvisible:false,
            imgtext:'',
            text:null,
            newWords:[],
            selectedRowKeys: [],
            current: 1,
            name: '',
            cardId:'',
            status:'',
            Tosk:'',
            begindate: '',
            enddate: '',
            ImgFalse:true
        };
        let controlType = this.props.controlType;
    }

    componentDidMount() {
        this.getList(this.props.controlType,1)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.controlType!==nextProps.controlType){
            this.setState({
                current: 1,
                selectedRowKeys:[],
                selectedRowsId:[],
                name: '',
                cardId:'',
                status:'',
                Tosk:'',
                begindate: '',
                enddate: '',
            })
            setTimeout(()=>{
                this.getList(nextProps.controlType,1)
                this.refs.SearchArea.init();
            },0)
        }
    }


    editShowModal = (record) => {
        let cerds = {id:record.id}
        store.dispatch(getControlDetail(cerds))
        let cred = {}
        store.dispatch(getCustomFiledList(cred))
        this.setState({
            visible: true,
            modalType: 'edit',
            newWords:newWord,
            ImgFalse:true
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
    initEntity = () =>{
        this.setState({
            nowPage: 1,
        })
    }

    onRef = (ref) => {
        this.child = ref
    }

    getList(controlType,page){
        let {name,cardId,status,Tosk, enddate, begindate} = this.state;
        let creds = ''
        if(controlType === 'GK_WGK'){
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate,control_type:0},showCount:10,currentPage:page}
        }else if(controlType === 'GK_YGK'){
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate,control_type:1},showCount:10,currentPage:page}
        }else if(controlType === 'GK_LKZRQ'){
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate,control_type:2},showCount:10,currentPage:page}
        }else if(controlType === 'GK_SK'){
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate,control_type:3},showCount:10,currentPage:page}
        } else if(controlType === 'LY_DR'){
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate,source:"901006"},showCount:10,currentPage:page}
        } else if(controlType === 'LY_XZ'){
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate,source:"901001"},showCount:10,currentPage:page}
        } else {
            creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate},showCount:10,currentPage:page}
        }
        store.dispatch(getControlPersonList(creds))
    }
    changeSelection(selectedRowKeys,current){
        this.setState({
            selectedRowKeys,
            selectedRowsId:selectedRowKeys,
            current
        })
    }
    getSearch(name,cardId,status,Tosk,begindate,enddate){
        this.setState({
            name,
            cardId,
            status,
            Tosk,
            begindate,
            enddate
        })
    }
    ImgError(e){
        console.log('img-error===========>',e)
        e.setState({
            ImgFalse:false
        })
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
                let c = (parseInt(this.state.current) - 1) * 10 + parseInt(i) + 1;
                dataList.push({id:list[i].id,key:list[i].id, serial: c, cardId: list[i].idcard, label: list[i].name, sex: list[i].sex == '0' ? '男': '女' ,age:list[i].age, state:(list[i].address_type == '0' ? '常住' : (list[i].address_type == '1' ? '暂住' : '流动')), phone:list[i].phone,zrdw:list[i].taskname, updatetime: getLocalTime(list[i].updatetime),cycle:list[i].cycle == '0' ? '按天' : (list[i].cycle == '1'?'按周':''),address:list[i].now_address,personFrom:list[i].source === '901006' ? '后台导入':'前端新增'})
            }
        }
        const columns = [{
            title: '序号',
            dataIndex: 'serial',
            width:50,
        },{
            title: '身份证号',
            dataIndex: 'cardId',
            width:180,
        },{
            title: '姓名',
            dataIndex: 'label',
            width:150,
        },{
            title: '性别',
            dataIndex: 'sex',
            width:50,
        },{
            title: '年龄',
            dataIndex: 'age',
            width:50,
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
            width:80,
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
        const column = [{
            title: '序号',
            dataIndex: 'serial',
            width:50,
        },{
            title: '身份证号',
            dataIndex: 'cardId',
            width:180,
        },{
            title: '姓名',
            dataIndex: 'label',
            width:150,
        },{
            title: '性别',
            dataIndex: 'sex',
            width:50,
        },{
            title: '年龄',
            dataIndex: 'age',
            width:50,
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
            title: '人员来源',
            dataIndex: 'personFrom',
        }, {
            title: '更新时间',
            dataIndex: 'updatetime',
        }, {
            title: '操作',
            key: 'action',
            width:80,
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
        const {selectedRowKeys} = this.state
        const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKey, selectedRows) => {
                console.log(`selectedRowKey: ${selectedRowKey}`, 'selectedRows: ', selectedRows);
                this.setState({
                    selectedRowKeys:selectedRowKey
                })
                // const ids = [];
                // for(var i=0;i<selectedRows.length;i++){
                //     var selectedRow = selectedRows[i];
                //     ids.push(selectedRow.id);
                // }
                this.setState({
                    selectedRowsId:`${selectedRowKey}`.split(',')
                });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        };
        const newFormList = [];
        let detail = store.getState().ControlPersonnel.data.getControlPersonListById.result.data;
        let newValue = store.getState().ControlPersonnel.data.FiledList.result.list;
        if(newValue.length > 0){
            for(let i in newValue){
                if(newValue[i].type == '0'){
                    newFormList.push(
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label={newValue[i].name}
                            >
                                {getFieldDecorator('wordText' + i, {
                                    initialValue:this.state.modalType === 'edit' ? detail.custom_filed_value[i].value : '',
                                })(
                                    <Input disabled/>
                                )}
                            </FormItem>
                        </Col>
                    )
                }else if(newValue[i].type == '1'){
                    let strs = []
                    strs=newValue[i].value.split("，");
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
                                label={newValue[i].name}
                            >
                                {getFieldDecorator('wordName', {
                                    initialValue:this.state.modalType === 'edit' ? detail.custom_filed_value[i].value : '',
                                })(
                                    <Select disabled>
                                        {children}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                    )
                }
            }
        }
        const pagination = {
            onChange: (page) =>{
                this.setState({
                    current: page,
                });
                this.getList(this.props.controlType, page)
            },
            showQuickJumper:'true',
            total: store.getState().ControlPersonnel.data.ControlPersonList.result.page.totalResult,
            current: this.state.current,
        }
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
                            changeSelection={(selectedRowKeys,current)=> this.changeSelection(selectedRowKeys,current)}
                            getSearch={(name,cardId,status,Tosk,begindate,enddate)=> this.getSearch(name,cardId,status,Tosk,begindate,enddate)}
                            serchChange={this.serchChange}
                            form={this.props.form}
                            controlType = {this.props.controlType}
                            selectedRowsId = {this.state.selectedRowsId}
                            ref="SearchArea"
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
                            <Table locale={{emptyText:'暂无数据'}} rowSelection={rowSelection} columns={controlType === 'GK_WGK' ? column : columns} dataSource={dataList} bordered pagination={pagination}/>
                        </div>}
                    <div className="clear"></div>
                </div>
                <Modal
                    width={900}
                    title="任务详情"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    key={this.state.modalKey}
                    maskClosable={false}
                >
                    <Row>
                        <Form>
                            <Col span={12} style={{ padding: '0 65px' }}>
                                <span style={{color:"#fff"}}>照片：</span>
                                {(detail.zpurl!==''&&this.state.ImgFalse)? <img src={detail.zpurl} style={{ width: '130px', height: '160px' }} onError={() =>this.ImgError(this)}/> : <img src="../../images/zanwu.png" style={{ width: '130px', height: '160px' }} />}
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
                                        <Input title={detail.now_address} disabled/>
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
                                        initialValue: this.state.modalType === 'edit' ? detail.taskname : '',
                                    })(
                                        <Input title={detail.taskname} disabled/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="任务周期"
                                >
                                    {getFieldDecorator('cycle', {
                                        initialValue:this.state.modalType === 'edit' ? (detail.cycle=='0'?'按天':(detail.cycle=='0'?'按周':'')) : '',
                                    })(
                                        <Select notFoundContent='暂无' disabled>
                                            {/*<Option value="">全部</Option>*/}
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
            Tosk:'',
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
            prompType:'',
            wordId:'',
            ToskId:'请选择任务',
            ModalTitle:'',
            zdyType:''
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
    ToskChange:function (e) {
        this.setState({
            Tosk: e.target.value
        });
    },
    handleClick: function() { //点击查询
        let controlType = this.props.controlType;
        let {name,cardId,status,Tosk,begindate,enddate} = this.state;
        if ( begindate!= "" && enddate!= "" && begindate > enddate) {
            message.error('提示：开始时间不能大于结束时间！');
            return;
        }else{
            let creds = ''
            if(controlType === 'GK_WGK'){
                creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate,control_type:0},showCount:10,currentPage:1}
            }else if(controlType === 'GK_YGK'){
                creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate,control_type:1},showCount:10,currentPage:1}
            }else if(controlType === 'GK_LKZRQ'){
                creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate,control_type:2},showCount:10,currentPage:1}
            }else if(controlType === 'GK_SK'){
                creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate,control_type:3},showCount:10,currentPage:1}
            } else if(controlType === 'LY_DR'){
                creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate,source:"901006"},showCount:10,currentPage:1}
            } else if(controlType === 'LY_XZ'){
                creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate,source:"901001"},showCount:10,currentPage:1}
            } else {
                creds = {pd:{name:name, idcard:cardId, address_type: parseInt(status),taskname:Tosk, beginTime:begindate,endTime:enddate},showCount:10,currentPage:1}
            }
            store.dispatch(getControlPersonList(creds))
        }
        this.props.getSearch(name, cardId, status, Tosk, begindate, enddate);
        this.props.changeSelection([],1);
    },
    // getList:function(controlType){
    // },
    init:function () {
        this.setState({
            name: '',
            cardId:'',
            nameClear:'',
            status:'',
            Tosk:'',
            begindate: '',
            enddate: '',
        });
        this.props.getSearch('', '', '', '', '', '');
    },
    inits:function () {
        this.setState({
            name: '',
            cardId:'',
            nameClear:'',
            status:'',
            Tosk:'',
            begindate: '',
            enddate: '',
        });
        this.props.getSearch('', '', '', '', '', '');
        setTimeout(()=>{
            this.handleClick();
        },200)
    },
    showModal: function() {
        this.setState({
            visible: true,
        });
    },
    hideModalOk: function() {
        let id = this.state.wordId;
        store.dispatch(delCustomFiled({id:id}));
        setTimeout(()=>{
            let delCode = store.getState().ControlPersonnel.data.delCustomFiled.reason;
            if(delCode === null){
                message.success(`提示：字段删除成功`);
                this.getNewWords();
            }else{
                message.error(`提示：${store.getState().ControlPersonnel.data.delCustomFiled.reason.text}`);
            }
        },100)
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
        this.getNewWords();
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
        let creds = {}
        const user = JSON.parse(sessionStorage.getItem('user'));
        if(this.state.wordId === ''){
            if(this.state.wordType === '文本'){
                creds = {createuser:user.user.name,name:this.state.wordName,type:"0",updateuser:'',value:''}
            }else{
                creds = {createuser:user.user.name,name:this.state.wordName,type:"1",updateuser:'',value:this.state.OptionWords}
            }
        }else{
            if(this.state.wordType === '文本'){
                creds = {createuser:user.user.name,name:this.state.wordName,type:"0",value:'',id:this.state.wordId}
            }else{
                creds = {createuser:user.user.name,name:this.state.wordName,type:"1",value:this.state.OptionWords,id:this.state.wordId}
            }
        }
        if(this.state.wordName.trim()!==""){
            let reg = Regular('zdyName').reg
            if(!reg.test(this.state.wordName.trim())){
                message.error(Regular('zdyName').msg,5);
            }else{
                store.dispatch(insertOrUpdateCustomFiled(creds));
                setTimeout(()=>{
                    let delCode = store.getState().ControlPersonnel.data.CustomFiled.reason;
                    if(delCode === null){
                        message.success(`提示：自定义字段${this.state.zdyType === 'add' ? '新增':'修改'}成功`);
                        this.getNewWords();
                    }else{
                        message.error(`提示：${store.getState().ControlPersonnel.data.CustomFiled.reason.text}`);
                    }
                },100)
                this.hideModals();
            }
        }else{
            message.error(`提示：字段名称不能为空`,5);
        }
    },
    getAddModal:function(type){
        if(type === 'add'){
            this.setState({
                ModalTitle:'添加到任务',
                ToskId:'请选择任务'
            })
        }else{
            this.setState({
                ModalTitle:'变更任务',
                ToskId:'请选择任务'
            })
        }
        if(this.props.selectedRowsId.length > 0){
            let creds = { taskswitch:'1',showCount:9999999}
            store.dispatch(getTaskModelList(creds));
            this.setState({
                addModal:true
            });
        }else{
            message.warning(`提示：请选择人员`);
        }
    },
    addNewsWord:function (type, record) {
        // record.id
        if(type === 'update'){
            this.setState({
                showDel:{margin:'0 0 0 30px'},
                wordName:record.name,
                wordType:record.type,
                OptionWords:record.value,
                wordId:record.id,
                zdyType:'update'
            })
            this.getSelects(record.type)
        }else if(type === 'add'){
            this.setState({
                showDel:{display:'none'},
                wordName:'',
                wordType:'',
                wordId:'',
                zdyType:'add'
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
    errorText:function(path){
        let paths = serverUrls + path;
        window.open(paths);
        message.destroy();
    },
    getOnClose:function(){
        message.destroy();
    },
    importOnChange:function(info) {
        if(info.file.response.reason!==null){
            if(info.file.response.reason.code === ""){
                if(info.file.response.result.errorExcelPath === "" ||info.file.response.result.errorExcelPath === undefined){
                    message.success(`提示：${info.file.response.reason.text}`);
                }else{
                    message.warning(
                        <content>
                            <span>提示：{info.file.response.reason.text}</span>
                            <a onClick={()=>this.errorText(info.file.response.result.errorExcelPath)}> 下载失败数据明细 </a>
                            <a onClick={this.getOnClose}> 关闭 </a>
                        </content>,0
                    );
                }
            }else{
                message.error(`提示：${info.file.response.reason.text}`,5)
            }
        }
        if (info.file.status === 'uploading') {
            this.importEnterLoading();
        }
        if (info.file.status !== 'uploading') {

        }
        if (info.file.status === 'done') {
            let creds = '';
            let controlType = this.props.controlType
            if(controlType==='GK_WGK'){
                creds = {pd:{control_type:0},showCount:10,currentPage:1}
            }else if(controlType==='GK_YGK'){
                creds = {pd:{control_type:1},showCount:10,currentPage:1}
            }else if(controlType==='GK_LKZRQ') {
                creds = {pd:{control_type:2},showCount:10,currentPage:1}
            }else if(controlType==='GK_SK'){
                creds = {pd:{control_type:3},showCount:10,currentPage:1}
            }else if(controlType==='LY_DR'){
                creds = {pd:{source:'901006'},showCount:10,currentPage:1}
            }else if(controlType==='LY_XZ'){
                creds = {pd:{source:'901001'},showCount:10,currentPage:1}
            }else{
                creds = {}
            }
            store.dispatch(getControlPersonList(creds))
            this.setState({
                importLoading: false,
            });
            this.props.changeSelection([],1);
        } else if (info.file.status === 'error') {
            message.error(`提示：${info.file.name} 上传失败`);
            this.setState({
                importLoading: false,
            });
        }
    },
    beforeUpload:function(file, fileList) {
        var rag = /\.(xls|xlsx|XLS|XLSX)$/;
        if(!rag.test(file.name)){
            message.error('提示：请上传excel');
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
            this.setState({
                prompt:true,
            })
        }else if(type === 'export'){
            if(this.props.selectedRowsId.length > 0){
                this.setState({
                    promptText:'是否确定导出数据？',
                    prompType:'export'
                })
                let creds = {ids:this.props.selectedRowsId.toString()}
                store.dispatch(getControlExport(creds))
                this.setState({
                    prompt:true,
                })
            }else{
                message.warning('提示：请选择需导出的人员');
            }
        }
    },
    exportModal:function(){
        this.props.handleExport();
        setTimeout(()=>{
            this.hideModal();
            this.props.changeSelection([],1);
        },100)
    },
    downloadModal:function () {
        let path = serverUrls + store.getState().ControlPersonnel.data.Download.result.path;
        window.open(path);
        setTimeout(()=>{
            this.hideModal();
        },100)
    },
    getNewsList:function(){
        let controlType = this.props.controlType;
        let cred = '';
        if(controlType==='GK_WGK'){
            cred = {pd:{control_type:0}}
        }else if(controlType==='GK_YGK'){
            cred = {pd:{control_type:1}}
        }else if(controlType==='GK_LKZRQ') {
            cred = {pd:{control_type:2}}
        }else if(controlType==='GK_SK'){
            cred = {pd:{control_type:3}}
        }else if(controlType==='LY_DR'){
            cred = {pd:{source:'901006'}}
        }else if(controlType==='LY_XZ'){
            cred = {pd:{source:'901001'}}
        }else{
            cred = {}
        }
        store.dispatch(getControlPersonList(cred))
        this.props.changeSelection([],1);
    },
    choiceTask:function () {
        const user = JSON.parse(sessionStorage.getItem('user'));
        let creds = {id:this.state.ToskId,personalid:this.props.selectedRowsId,updateuser:user.user.name}
        if(this.state.ToskId === '请选择任务'){
            message.warning(`提示：${this.state.ToskId}`);
        }else{
            store.dispatch(updateTaskModelControlPerson(creds))
            setTimeout(()=>{
                let delCode = store.getState().ControlPersonnel.data.TaskModelControlPerson.reason;
                if(delCode === null){
                    message.success(`提示：${this.state.ModalTitle}成功`);
                }else{
                    message.error(`提示：${store.getState().ControlPersonnel.data.TaskModelControlPerson.reason.text}`);
                }
            },200)
            setTimeout(()=>{
                this.getNewsList();
                this.props.changeSelection([],1);
            },200)
            this.setState({
                addModal:false
            });
        }
    },
    getSelectTosk:function(e){
        this.setState({
            ToskId: e
        })
    },
    getSelectSearch:function(e){
        let creds = { taskswitch:'1',showCount:9999999,pd:{name:e}}
        store.dispatch(getTaskModelList(creds));
    },
    render() {
        const {getFieldDecorator} = this.props.form
        let {name,cardId,status,Tosk, enddate, begindate,cycle,wordType,showInput,wordName,OptionWords,showDel} = this.state;
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
        let newWord = []
        for(let i in store.getState().ControlPersonnel.data.FiledList.result.list){
            if(i !== 'remove'){
                let list= store.getState().ControlPersonnel.data.FiledList.result.list
                newWord.push({name:list[i].name,key:i,id:list[i].id,type:list[i].type,value:list[i].value})
            }
        }
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
                <Button style={{width:"110px", marginRight:"10px",float:'left'}} onClick={() => this.getAddModal('add')} className="btn_ok">添加到任务</Button>
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
                    <Button style={{width:"110px", marginRight:"10px"}} onClick={() => this.getAddModal('update')} className="btn_ok">变更任务</Button>
                    <Button style={{width:"80px", marginRight:"10px"}} className="btn_ok" onClick={() => this.getPrompt('export')}>导出</Button>
                </div>
            )
        }else if(controlType === 'GK_LKZRQ' || controlType === 'GK_SK'){
            btns = (
                <div style={{marginTop:"15px"}}>
                    <Button style={{width:"110px", marginRight:"10px"}} onClick={() => this.getAddModal('add')} className="btn_ok">添加到任务</Button>
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
        const children = [];
        let toskList = store.getState().ControlPersonnel.data.getTaskModelList.result.list
        for(let j in toskList){
            if(j!='remove'){
                children.push(<Option key={j} value={toskList[j].id}>{toskList[j].name}</Option>);
            }
        }
        const ToskSearch = (
            controlType==='GK_WGK' ?
                <span></span>:
                <span>
                <label htmlFor="" className="font14">隶属任务：</label>
                <Input style={{width:'130px',marginRight:"10px"}} type="text"  id='name' placeholder='请输入隶属任务'  value={Tosk}  onChange={this.ToskChange}/>
            </span>
        )
        return (
            <div className="marLeft40 fl z_searchDiv">
                <label htmlFor="" className="font14">身份证号：</label>
                <Input style={{width:'230px',marginRight:"10px"}} type="text"  id='name' placeholder='请输入身份证号'  value={cardId} onChange={this.handleCardChange}/>
                <label htmlFor="" className="font14">姓名：</label>
                <Input style={{width:'130px',marginRight:"10px"}} type="text"  id='name' placeholder='请输入人员姓名'  value={name}  onChange={this.handleNameChange}/>
                <label htmlFor="" className="font14">居住类型：</label>
                <Select value={status} style={{ width: 100 ,marginRight:"10px" }} onChange={this.statusChange} notFoundContent='暂无'>
                    <Option value="">全部</Option>
                    <Option value="0">常住</Option>
                    <Option value="1">暂住</Option>
                    <Option value="2">流动</Option>
                </Select>
                {ToskSearch}
                <label htmlFor="" className="font14">更新时间：</label>
                <DatePicker format={dateFormat} allowClear={false} style={{marginRight:"10px",width:'130px'}} value={beginDateValue} placeholder="请选择日期" onChange={this.handleBeginDeteClick}/>
                <span className="font14" style={{margin:"0 10px 0 0"}}>至</span>
                <DatePicker format={dateFormat} allowClear={false} style={{marginRight:"10px",width:'130px'}} placeholder="请选择日期"  value={endDateValue} onChange={this.handleEndDeteClick}/>
                <ShallowBlueBtn width="80px" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                <ShallowBlueBtn width="80px" text="重置" margin="0 10px 0 0" onClick={this.inits} />
                <div>
                    {btns}
                    <Modal style={{top:"20%"}}
                           title={this.state.ModalTitle}
                           visible={this.state.addModal}
                           footer={null}
                           onCancel={this.hideModal}
                           width={600}
                           maskClosable={false}
                    >
                        <div style={{margin:'0 0 16px 0'}}>
                            <Select style={{width:'450px',marginRight:"10px"}} placeholder='请选择任务' value={this.state.ToskId} onChange={this.getSelectTosk} showSearch={true}  filterOption={false} onSearch={this.getSelectSearch}>
                                {children}
                            </Select>
                            <ShallowBlueBtn width="80px" text="确定" margin="0 0 0 10px" onClick={this.choiceTask} />
                            {/*<ShallowBlueBtn width="80px" text="取消" onClick={this.hideModal} />*/}
                        </div>
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
                    <Modal style={{top:"20%"}}
                           title="自定义字段"
                           visible={this.state.zdyModal}
                           footer={null}
                           className="ModalList"
                           onCancel={this.hideModal}
                           maskClosable={false}
                    >
                        <Table className={newWord.length < 1 ? 'noneDiv': 'activeDiv'} columns={list} dataSource={newWord} bordered  pagination={false} showHeader={false} />
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
                           maskClosable={false}
                    >
                        <Form>
                            <FormItem
                                {...formItemLayout}
                                label="字段名称"
                            >
                                <Input value={wordName} onChange={this.changeWordName}/>
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