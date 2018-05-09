//卡点管理右侧组件
import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import {
    mainReducer
} from "../../reducers/reducers";
import {
    StylePage,
    ShallowBlueBtn,
    Pag,
} from "../generalPurposeModule";
import {
    store
} from '../../index.js';
import * as constants from "../../utils/Constants";
import {
    monthFormat,
    dateFormat,
    serverUrl
} from '../../utils/';
import {
    Spin,
    Table,
    message,
    Input,
    Modal,
    Button,
    Form,
    Icon,
    Row,
    Col,
    TreeSelect,
    DatePicker
} from 'antd';

import moment from 'moment';
moment.locale('zh-cn');
import {findDeptTree} from "../../actions/AreaManagement";

// 样式
const sliderdyHeader = {
    borderBottom: "1px solid #0C5F93",
    padding: "18px 0",
    overflow: "hidden"
}
const FormItem = Form.Item;

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

export  class AreaManage extends Component{
    constructor(props) { //初始化nowPage为1
        super(props);
        this.treeData = []
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
                {key: 1, serial: 1, value: '呼和浩特市公安局', name: '海邻科卡点', updatetime: '2018-04-10',operatingPerson:'张三'},
                {key: 2, serial: 2, value: '呼和浩特市公安局', name: 'hylink卡点', updatetime: '2018-04-09',operatingPerson:'李四'},
                {key: 3, serial: 3, value: '呼和浩特市公安局', name: '海邻科卡点', updatetime: '2018-04-08',operatingPerson:'王二'},
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
        let creds = {name: "", policetpyes: []}
        store.dispatch(findDeptTree(creds))
    }
    editShowModal = (record) => {
        this.setState({
            visible: true,
            personInfo: record,
            modalType: 'edit'
        });
        this.treeData = [];
        const list = store.getState().AreaManagement.data.FindTreeList.result.list
        this.getListTree(list, false , this.treeData)
    }
    addShowModal = (record) => {
        this.setState({
            visible: true,
            modalType: 'add',
        });
        this.treeData = [];
        const list = store.getState().AreaManagement.data.FindTreeList.result.list
        this.getListTree(list, false , this.treeData)
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
                    let value = {key: key, serial: key, name: values.name, value: values.label, updatetime: "2018-04-10"}
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
    getListTree = (list, child ,tree) => {
        for(let i in list){
            if(!child){
                if(i !== 'remove'){
                    tree.push({label:list[i].name,value:list[i].name,key:list[i].name,children:[]})
                    if(list[i].childrenList.length > 0){
                        this.getListTree(list[i].childrenList,true , tree[i])
                    }
                }
            } else{
                if(i !== 'remove') {
                    tree.children.push({label: list[i].name, value: list[i].name, key: list[i].name, children:[]})
                    if (list[i].childrenList.length > 0) {
                        this.getListTree(list[i].childrenList, true, tree.children[i])
                    }
                }
            }
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let nowPage = this.state.nowPage;
        let isFetching = store.getState().AreaManagement.isFetching;
        const columns = [{
            title: '序号',
            dataIndex: 'serial',
        }, {
            title: '卡点名称',
            dataIndex: 'name',
        }, {
            title: '所属单位',
            dataIndex: 'value',
        }, {
            title: '操作人',
            dataIndex: 'operatingPerson',
            width:180,
        },{
            title: '更新时间',
            dataIndex: 'updatetime',
            width:180,
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                        <span onClick={(e)=>this.editShowModal(record)} style={{cursor:'pointer'}}>编辑</span>
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
                            <Table locale={{emptyText:'暂无数据'}} rowSelection={rowSelection} columns={columns} dataSource={this.state.data} bordered  pagination={false}/>
                        </div>}
                    <div className="clear"></div>
                </div>
                {/*分页*/}
                <Pag pageSize={10} nowPage={nowPage} totalRecord={10} pageChange={this.pageChange} />
                <Modal
                    title="卡点管理"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    key={this.state.modalKey}
                >
                    <Form onSubmit={this.saveModel}>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="卡点名称"
                            >
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true, message: '请输入名称!',

                                    },{
                                        max:20,message:'最多输入二十个字符!',
                                    }],
                                    initialValue:this.state.modalType === 'edit' ? this.state.personInfo.name : '',
                                    validateFirst:true
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout}
                                label="所属单位"
                            >
                                {getFieldDecorator('label', {
                                    rules: [{
                                        required: true, message: '请选择所属单位!',

                                    }],
                                    initialValue:this.state.modalType === 'edit' ? this.state.personInfo.value : '',
                                    validateFirst:true
                                })(
                                    <TreeSelect treeData={this.treeData} placeholder="请选择所属单位"/>
                                )}
                            </FormItem>
                        </div>
                        <Row>
                            <Col span={16} style={{textAlign: 'right'}}>
                                <Button htmlType="submit"  className="btn_ok">保存</Button>
                                <Button style={{marginLeft: 30}} onClick={this.handleCancel} className="btn_delete">取消</Button>
                            </Col>
                        </Row>
                    </Form>
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
            begindate: '',
            enddate: '',
            nameClear:'',
            begindateClear:'',
            enddateClear:'',
            treeData:[],
            Pname: ''
        };
    },
    handleNameChange: function(e) {
        this.setState({
            name: e.target.value
        });
    },
    handlePnameChange: function(e) {
        this.setState({
            Pname: e.target.value
        });
    },
    handleClick: function() { //点击查询
        let {name} = this.state;
        console.log('查询', name);
    },
    init:function () {
        this.setState({
            name:'',
            begindate: '',
            enddate: '',
            Pname: ''
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
    hideModal: function() {
        this.setState({
            visible: false,
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
    getTreeList:function(){
        this.treeData = [];
        const list = store.getState().AreaManagement.data.FindTreeList.result.list
        this.getListTree(list, false , this.treeData)
    },
    getListTree:function(list, child ,tree){
        for(let i in list){
            if(!child){
                if(i !== 'remove'){
                    tree.push({label:list[i].name,value:list[i].name,key:list[i].name,children:[]})
                    if(list[i].childrenList.length > 0){
                        this.getListTree(list[i].childrenList,true , tree[i])
                    }
                }
            } else{
                if(i !== 'remove') {
                    tree.children.push({label: list[i].name, value: list[i].name, key: list[i].name, children:[]})
                    if (list[i].childrenList.length > 0) {
                        this.getListTree(list[i].childrenList, true, tree.children[i])
                    }
                }
            }
        }
        this.setState({
            treeData: this.treeData
        });
    },
    render() {
        let {name, enddate, begindate,Pname} = this.state;
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
                <label htmlFor="" className="font14">卡点名称：</label>
                <Input style={{width:'150px',marginRight:"10px"}} type="text"  id='name' placeholder='请输入卡点名称'  value={name}  onChange={this.handleNameChange}/>
                <label htmlFor="" className="font14">所属单位：</label>
                <TreeSelect style={{width:'150px',marginRight:"10px"}} dropdownClassName="treeStyle" treeData={this.state.treeData} placeholder="全部" onClick={this.getTreeList}/>
                <label htmlFor="" className="font14">起止时间：</label>
                <DatePicker placeholder="请选择日期"  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={beginDateValue} defaultValue="" onChange={this.handleBeginDeteClick}/>
                <span className="font14" style={{margin:"0 10px 0 0"}}>至</span>
                <DatePicker placeholder="请选择日期"  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={endDateValue} defaultValue="" onChange={this.handleEndDeteClick}/>
                <label htmlFor="" className="font14">操作人：</label>
                <Input style={{width:'150px',marginRight:"10px"}} type="text"  id='name' placeholder='请输入操作人'  value={Pname}  onChange={this.handlePnameChange}/>
                <ShallowBlueBtn width="80px" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                <ShallowBlueBtn width="80px" text="重置" margin="0 10px 0 0" onClick={this.init} />
                <div style={{marginTop:"15px"}}>
                    <Button style={{width:"80px"}}
                            onClick={this.props.addShowModal}
                            className="btn_ok"
                    >
                        <Icon type="file-add" /> 增加
                    </Button>
                    <Button style={{margin:'0 0 0 10px',width:"80px"}} onClick={this.showModal} className="btn_delete">
                        <Icon type="delete" />  删除
                    </Button>
                    <Modal style={{top:"38%"}}
                           title="提示"
                           visible={this.state.visible}
                           footer={null}
                           maskClosable={false}
                           closable={false}
                    >
                        <p style={{fontSize:"16px",}}>是否删除选中项？</p>
                        <p style={{marginTop:"20px",textAlign:"center"}}>
                            <Button style={{margin:'0 20px 0 0 ',width:"80px"}} onClick={this.hideModalOk} className="btn_ok">
                                确定
                            </Button>
                            <Button style={{margin:'',width:"80px"}} onClick={this.hideModal} className="btn_delete">
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