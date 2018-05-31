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
import {monthFormat, dateFormat, serverUrl,getMyDate} from '../../utils/';
import {Spin, Table, Input, Modal, Form, Row, Col, Select, DatePicker} from 'antd';
import {SearchArea} from './SearchArea'
import {getControlPersonList, getControlDetail,getCustomFiledList} from "../../actions/ControlPersonnel";
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// 样式
const sliderdyHeader = {
    borderBottom: "1px solid #0C5F93",
    padding: "8px 0 18px",
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
        let path = '';
        if(controlType==='GK_WGK'){
           path = serverUrls + store.getState().ControlPersonnel.data.getExport.result.path;
        }else{
           path = serverUrls + store.getState().ControlPersonnel.data.getExport2.result.path;
        }
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
                dataList.push({id:list[i].id,key:list[i].id, serial: c, cardId: list[i].idcard, label: list[i].name, sex: list[i].sex == '1' ? '男': '女' ,age:list[i].age, state:(list[i].address_type == '0' ? '常住' : (list[i].address_type == '1' ? '暂住' : '流动')), phone:list[i].phone,zrdw:list[i].taskname, updatetime: getLocalTime(list[i].updatetime),cycle:list[i].cycle == '0' ? '按天' : (list[i].cycle == '1'?'按周':''),address:list[i].now_address,personFrom:list[i].source === '901006' ? '后台导入':'前端新增'})
            }
        }
        const columns = [{
            title: '序号',
            dataIndex: 'serial',
            width:50,
        },{
            title: '身份证号',
            dataIndex: 'cardId',
            width:160,
        },{
            title: '姓名',
            dataIndex: 'label',
            width:90,
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
            width:180,
        },{
            title: '联系电话',
            dataIndex: 'phone',
        },{
            title: '隶属任务',
            dataIndex: 'zrdw',
            width:180,
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
            width:50,
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
            width:160,
        },{
            title: '姓名',
            dataIndex: 'label',
            width:90,
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
            width:350
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
            width:50,
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
                    strs=newValue[i].value.split(/[,，]/);
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
                                        initialValue:this.state.modalType === 'edit' ? (detail.sex == '1' ? '男' : '女') : '',
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
                                        <Input title={detail.address} disabled/>
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
                                        initialValue:this.state.modalType === 'edit' ? detail.work_address : '',
                                    })(
                                        <Input title={detail.work_address} disabled/>
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
                            <Col span={12} className={controlType === 'GK_WGK'?'noneDiv':''}>
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
                            <Col span={12} className={controlType === 'GK_WGK'?'noneDiv':''}>
                                <FormItem
                                    {...formItemLayout}
                                    label="任务周期"
                                >
                                    {getFieldDecorator('cycle', {
                                        initialValue:this.state.modalType === 'edit' ? (detail.cycle=='0'?'按天':(detail.cycle=='1'?'按周':'')) : '',
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
                                        initialValue: this.state.modalType === 'edit' ? (detail.attribute === "1"? '涉疆人员':(detail.attribute === "2"?'涉藏人员':'')) : '',
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
                                        initialValue: this.state.modalType === 'edit' ? (detail.carstatus ? '有，'+detail.carnumber : '无') : '',
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
                                        initialValue:this.state.modalType === 'edit' ? moment(getMyDate(detail.updatetime / 1000), 'YYYY-MM-DD HH:mm:ss') : '',
                                    })(
                                        <DatePicker showTime placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '283px' }} disabled />
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
Control = Form.create()(Control);
export default connect(mainReducer)(Control);