/**
 * Created by ycj on 2017/4/6.
 */
// 盘查详情页面基本信息下所有表格
import React, {
    Component
} from 'react';
import {
    connect
} from "react-redux";
import {
    mainReducer
} from "../../reducers/reducers";
import {
    StylePage,
    ShallowBlueBtn,
    DeepRedBtn,
    DeepBlueBtn,
    PhotoItem,
    Pag,
    InterrogationDetailsItem,
    Tabs
} from "../generalPurposeModule";
import {
    store
} from '../../index.js';
import * as constants from "../../utils/Constants";
import {
    postELECTOROTemporaryPpulationData,
    postELECTOROMarryData,
    postELECTOROResidenceMemberData,
    postELECTORORaletionshipData,
    postELECTOROVehicleData,
    postELECTORODriverData
} from "../../actions/ElectronicArchives";
import {
    DatePicker,
    Spin,
    Table,
    Input,
    Modal,
    Button,
    message
} from 'antd';
import {
    api
} from '../../actions/actions';

import {
    post,
    get,
    put
} from "../../actions/request";
const thBg = {
    background: "rgba(2, 24, 85, 0.4)",
}
const mStyle = {
    fontSize: "14px",
    color: "#fff",
    marginRight: "20px",
    width: "104px",
    float: "left",
    textAlign: "right"
}

export class BasicInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nowPage: 1
        }
    }

    render() {
        //let basicInformation=this.props.basicInformation;
        // let vehicle=this.props.InterrogationDetailsUsers.data.interrogationDetails.basicInformation.vehicle;
        // let driver=this.props.InterrogationDetailsUsers.data.interrogationDetails.basicInformation.driver;
        let idcard = this.props.idcard;
        var user = JSON.parse(sessionStorage.getItem('user'));
        var jyxm = user.user.name;
        //let pliceName = userItem.
        return (
            <div>
               <div style={{border:"1px solid rgb(12, 95, 147)",padding:"20px",background:"rgba(40,51,99,0.8)",zIndex:"3"}}>
                    <div style={{marginBottom:"20px"}}>
                        <p style={p}>人员基本信息</p>

                        <PersonBasicTable   idcard={idcard} jyxm={jyxm}/>
                    </div>
                    {/*<div style={{marginBottom:"20px"}}>
                        <p style={p}>婚姻信息</p>
                        <MarryMessageTable  idcard={idcard} jyxm={jyxm}/>
                    </div>*/}
                    {/*<div style={{marginBottom:"20px"}}>
                        <p style={p}>户成员信息</p>
                        <MemberTable   idcard={idcard} jyxm={jyxm}/>
                    </div>
                    <div style={{marginBottom:"20px"}}>
                        <p style={p}>关系人</p>
                        <RaletionTable  idcard={idcard} jyxm={jyxm}/>
                    </div>*/}
                    <div style={{marginBottom:"20px"}}>
                        <p style={p}>机动车信息</p>
                        <VehicleTable   idcard={idcard} jyxm={jyxm}/>
                    </div>
                    {/* <div style={{marginBottom:"20px"}}>
                        <p style={p}>驾驶证信息</p>
                        <DriverTable   idcard={idcard} jyxm={jyxm}/>
                    </div> */}
                </div>
            </div>
        )
    }
}
//分页配置文件
const  pagination = {size:'small',pageSize:constants.recordPageSize,
    showTotal(total){return `合计 ${total} 条记录`;},
    itemRender(current, type, originalElement){
        if (type === 'prev') {
            return <a>上一页</a>;
        } else if (type === 'next') {
            return <a>下一页</a>;
        }
        return originalElement;
    }
};
//人员信息
class PersonBasicTable extends Component{
    state = {
        data: [{
            name:'测试用户',
            nameUsedBefore:'无',
            educationLevel:'初中',
            maritalStatus:'有配偶',
            religiousBeliefs:'无',
            occupation:'自由职业'
        }],
        record:null,
        pagination: pagination,
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        console.info('pager',pager);
        this.setState({
            pagination: pager,
        });
        this.fetch({//点击下一页的时候调取的参数
        currentPage:pagination.current,
        entityOrField:true,
        pd:{
            idcard: this.props.idcard
        },
        showCount:pagination.pageSize});
    }
    
   fetch= (params = {"currentPage":1,"entityOrField":true,pd:{idcard: this.props.idcard},"showCount":constants.recordPageSize}) => {
        post(api+'/data/getGXRKList',params).then((data)=>{
            let dataList = [];
            dataList.push(data.result);
            const pagination = { ...this.state.pagination };
            pagination.total = 0;
            this.setState({
                loading: false,
                data: dataList,
                pagination,
            });
        }).catch((e)=>{
        });
    }
    componentDidMount() {
        this.fetch();
    }
   showModal = (record) => {
        console.info(record);
        this.setState({ visible: true,record:record });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleOk = () => {
        this.setState({ visible: false });
    }
    render(){
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
            },{
                title: '曾用名',
                dataIndex: 'nameUsedBefore ',
            },{
                title: '文化程度',
                dataIndex: 'educationLevel',
            },{
                title: '婚姻状况',
                dataIndex: 'maritalStatus',
            },{
                title: '宗教信仰',
                dataIndex: 'religiousBeliefs',
            },{
                title: '职业',
                dataIndex: 'occupation',
            }
            // ,{
            //     title: '操作',
            //     key: 'action',
            //     // width: 30,
            //     render: (text, record) => (
            //         <span>
            //             <span onClick={onClickEdit=>this.showModal(record)} style={{cursor:'pointer'}}>详情</span>
            //     </span>
            //     ),
            
            // }
        ];
        return (
            <div>
                <Table columns={columns}
                       rowKey={record => record.registered}
                       dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       bordered
                       onChange={this.handleTableChange}
                       locale={{emptyText:'暂无数据'}}
                />
                <Modal
                    visible={this.state.visible}
                    title="人员基本信息"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    closable={true}
                    style={{maxHeight:650,overflow:"auto"}}
                    footer={null}
                    
                >
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">姓名：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.name:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">曾用名：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.nameUsedBefore :''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">文化程度：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.educationLevel:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">婚姻状况：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.maritalStatus:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">宗教信仰：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.religiousBeliefs:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">职业：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.occupation:''} readOnly="readOnly"/>
                    </div>
                     <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">身份号码：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.idcard:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">性别：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.sex :''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">民族：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.nation:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">出生日期：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.birth:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">籍贯：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.originPlace:''} readOnly="readOnly"/>
                    </div>

                </Modal>
            </div>
        );
    }
};


//婚姻信息
class MarryMessageTable extends Component{
    state = {
        data: [],
        pagination: {size:'small',pageSize:5,
            showTotal(total){return `合计 ${total} 条记录`;},
            itemRender(current, type, originalElement){
                    if (type === 'prev') {
                    return <a>上一页</a>;
                } else if (type === 'next') {
                    return <a>下一页</a>;
                }
                    return originalElement;
            }
        },
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        console.info('pager',pager);
        this.setState({
            pagination: pager,
        });
        this.fetch({//点击下一页的时候调取的参数
        currentPage:pagination.current,
        entityOrField:true,
        pd:{
            idcard: this.props.idcard, 
            
        },
        showCount:pagination.pageSize});
    }
    fetch= (params = {"currentPage":1,"entityOrField":true,pd:{idcard: this.props.idcard,jyxm:this.props.jyxm},"showCount":constants.recordPageSize}) => {
        post(api+'/data/getArcPersonlistPage',params).then((data)=>{
            console.info('data',data);
            const pagination = { ...this.state.pagination };
            pagination.total = 0;
            this.setState({
                loading: false,
                data: data.results,
                pagination,
            });
        }).catch((e)=>{
        });
    }
    componentDidMount() {
        this.fetch();
    }
    render(){
        const columns = [
            {
                title: '序号',
                dataIndex: 'serial',
            },{
                title: '配偶姓名',
                dataIndex: 'SpouseName',
            },{
                title: '配偶身份证号',
                dataIndex: 'SpouseIdNumber',
            },{
                title: '配偶民族',
                dataIndex: 'SpouseNation',
            },{
                title: '配偶职业',
                dataIndex: 'SpouseOccupation',
            },{
                title: '登记日期',
                dataIndex: 'registrationDate',
            },{
                title: '操作',
                key: 'action',
                // width: 30,
                render: (text, record) => (
                    <span>
                        <span onClick={onClickEdit=>this.showModal(record.id,record)} style={{cursor:'pointer'}}>详情</span>
                </span>
                ),
            
            }];
        return (
            <div>
                <Table columns={columns}
                       rowKey={record => record.registered}
                       dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       bordered
                       onChange={this.handleTableChange}
                        locale={{emptyText:'暂无数据'}}
                />
            </div>
        );
    }
};

//户成员
class MemberTable extends Component{
    state = {
        data: [],
        pagination: {size:'small',pageSize:5,
            showTotal(total){return `合计 ${total} 条记录`;},
            itemRender(current, type, originalElement){
                    if (type === 'prev') {
                    return <a>上一页</a>;
                } else if (type === 'next') {
                    return <a>下一页</a>;
                }
                    return originalElement;
            }
        },
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        console.info('pager',pager);
        this.setState({
            pagination: pager,
        });
        this.fetch({//点击下一页的时候调取的参数
        currentPage:pagination.current,
        entityOrField:true,
        pd:{
            idcard: this.props.idcard, 
            
        },
        showCount:pagination.pageSize});
    }
    fetch= (params = {"currentPage":1,"entityOrField":true,pd:{idcard: this.props.idcard,jyxm:this.props.jyxm},"showCount":constants.recordPageSize}) => {
        post(api+'/data/getArcPersonlistPage',params).then((data)=>{
            console.info('data',data);
            const pagination = { ...this.state.pagination };
            pagination.total = 0;
            this.setState({
                loading: false,
                data: data.results,
                pagination,
            });
        }).catch((e)=>{
        });
    }
    componentDidMount() {
        this.fetch();
    }
    render(){
        const columns = [
            {
                title: '序号',
                dataIndex: 'serial',
            },{
                title: '户号',
                dataIndex: 'residenceNumber',
            },{
                title: '与户主关系',
                dataIndex: 'memberRelationShip',
            },{
                title: '户成员数',
                dataIndex: 'residenceTotal',
            },{
                title: '操作',
                key: 'action',
                // width: 30,
                render: (text, record) => (
                    <span>
                        <span onClick={onClickEdit=>this.showModal(record.id,record)} style={{cursor:'pointer'}}>详情</span>
                </span>
                ),
            
            }];
        return (
            <div>
                <Table columns={columns}
                       rowKey={record => record.registered}
                       dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       bordered
                       onChange={this.handleTableChange}
                />
            </div>
        );
    }
};

//关系人
class RaletionTable extends Component{
    state = {
        data: [],
        pagination: {size:'small',pageSize:5,
            showTotal(total){return `合计 ${total} 条记录`;},
            itemRender(current, type, originalElement){
                    if (type === 'prev') {
                    return <a>上一页</a>;
                } else if (type === 'next') {
                    return <a>下一页</a>;
                }
                    return originalElement;
            }
        },
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        console.info('pager',pager);
        this.setState({
            pagination: pager,
        });
        this.fetch({//点击下一页的时候调取的参数
        currentPage:pagination.current,
        entityOrField:true,
        pd:{
            idcard: this.props.idcard, 
            
        },
        showCount:pagination.pageSize});
    }
    fetch= (params = {"currentPage":1,"entityOrField":true,pd:{idcard: this.props.idcard,jyxm:this.props.jyxm},"showCount":constants.recordPageSize}) => {
        post(api+'/data/getArcPersonlistPage',params).then((data)=>{
            console.info('data',data);
            const pagination = { ...this.state.pagination };
            pagination.total = 0;
            this.setState({
                loading: false,
                data: data.results,
                pagination,
            });
        }).catch((e)=>{
        });
    }
    componentDidMount() {
        this.fetch();
    }
    render(){
        const columns = [
            {
                title: '序号',
                dataIndex: 'serial',
            },{
                title: '户号',
                dataIndex: 'residenceNumber',
            },{
                title: '与户主关系',
                dataIndex: 'memberRelationShip',
            },{
                title: '户成员数',
                dataIndex: 'residenceTotal',
            },{
                title: '操作',
                key: 'action',
                // width: 30,
                render: (text, record) => (
                    <span>
                        <span onClick={onClickEdit=>this.showModal(record.id,record)} style={{cursor:'pointer'}}>详情</span>
                </span>
                ),
            
            }];
        return (
            <div>
                <Table columns={columns}
                       rowKey={record => record.registered}
                       dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       bordered
                       onChange={this.handleTableChange}
                        locale={{emptyText:'暂无数据'}}
                />
            </div>
        );
    }
};


//机动车表格
class VehicleTable extends Component{
     state = {
        data: [{
            vehicleIdentificationNumber:'2255155454',
            vehicleType:"小型",
            plateNumber:'黑AH8888',
            brands:'丰田',
            carBodyColor:'白'
        }],
        record:null,
        pagination: pagination,
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        console.info('pager',pager);
        this.setState({
            pagination: pager,
        });
        this.fetch({//点击下一页的时候调取的参数
        currentPage:pagination.current,
        entityOrField:true,
        pd:{
            idcard: this.props.idcard, 
            
        },
        showCount:pagination.pageSize});
    }
    fetch= (params = {"currentPage":1,"entityOrField":true,pd:{idcard: this.props.idcard},"showCount":constants.recordPageSize}) => {
        post(api+'/data/getGXJDCList',params).then((data)=>{
            console.info('data',data);
            const pagination = { ...this.state.pagination };
            pagination.total = 0;
            this.setState({
                loading: false,
                // data: data.result,
                pagination,
            });
        }).catch((e)=>{
        });
    }
    componentDidMount() {
        this.fetch();
    }
    showModal = (record) => {
        console.info(record);
        this.setState({ visible: true,record:record });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleOk = () => {
        this.setState({ visible: false });
    }
    render(){
        const columns = [
            {
                title: '车辆识别代号',
                dataIndex: 'vehicleIdentificationNumber',
            },{
                title: '车辆类型',
                dataIndex: 'vehicleType',
            },{
                title: '号牌号码',
                dataIndex: 'plateNumber',
            },{
                title: '车辆品牌',
                dataIndex: 'brands',
            },{
                title: '车身颜色',
                dataIndex: 'carBodyColor',
            }
            // ,{
            //     title: '操作',
            //     key: 'action',
            //     // width: 30,
            //     render: (text, record) => (
            //         <span>
            //             <span onClick={onClickEdit=>this.showModal(record)} style={{cursor:'pointer'}}>详情</span>
            //     </span>
            //     ),
            
            // }
        ];
        return (
            <div>
                <Table columns={columns}
                       rowKey={record => record.registered}
                       dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       bordered
                       onChange={this.handleTableChange}
                        locale={{emptyText:'暂无数据'}}
                />
                <Modal
                    visible={this.state.visible}
                    title="机动车"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    closable={true}
                    style={{maxHeight:650,overflow:"auto"}}
                    footer={null}
                    
                >
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">机动车所有人：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.Owner:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">身份证号：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.idcard :''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">号牌号码：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.plateNumber:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">车辆品牌：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.brands:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">车辆识别代号：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.vehicleIdentificationNumber:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">发动机号：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.engineNo:''} readOnly="readOnly"/>
                    </div>
                     <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">发动机型号：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.engineType:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">车辆型号：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.vehicleModel :''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">车身颜色：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.carBodyColor:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">车辆类型：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.vehicleType:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">出厂日期：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.manufactureDate:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">初次登记日期：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.initialRegistrationDate:''} readOnly="readOnly"/>
                    </div>
                </Modal>
            </div>
        );
    }
};

//驾驶员表格
class DriverTable extends Component{
    state = {
        data: [],
        record:null,
        pagination: pagination,
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        console.info('pager',pager);
        this.setState({
            pagination: pager,
        });
        this.fetch({//点击下一页的时候调取的参数
        currentPage:pagination.current,
        entityOrField:true,
        pd:{
            idcard: this.props.idcard, 
            
        },
        showCount:pagination.pageSize});
    }
    fetch= (params = {"currentPage":1,"entityOrField":true,pd:{idcard: this.props.idcard},"showCount":constants.recordPageSize}) => {
        post(api+'/data/getGXJSZList',params).then((data)=>{
            console.info('data',data);
            const pagination = { ...this.state.pagination };
            pagination.total = 0;
            this.setState({
                loading: false,
                data: data.result,
                pagination,
            });
        }).catch((e)=>{
        });
    }
    componentDidMount() {
        this.fetch();
    }
    showModal = (record) => {
        console.info(record);
        this.setState({ visible: true,record:record });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleOk = () => {
        this.setState({ visible: false });
    }
    render(){
        const columns = [
            {
                title: '序号',
                dataIndex: 'serial',
            },{
                title: '姓名',
                dataIndex: 'name',
            },{
                title: '身份证号',
                dataIndex: 'idcard',
            }
            ,{
                title: '联系电话',
                dataIndex: 'phoneNumber',
            },{
                title: '准驾型号',
                dataIndex: 'quasiDrivingModel',
            },{
                title: '驾驶证状态',
                dataIndex: 'driverLicenseStatus',
            }
            ,{
                title: '驾证期限',
                dataIndex: 'driverLicenseTerm',
            },{
                title: '操作',
                key: 'action',
                // width: 30,
                render: (text, record) => (
                    <span>
                        <span onClick={onClickEdit=>this.showModal(record)} style={{cursor:'pointer'}}>详情</span>
                </span>
                ),
            
            }];
        return (
            <div>
                <Table columns={columns}
                       rowKey={record => record.registered}
                       dataSource={this.state.data}
                       pagination={this.state.pagination}
                       loading={this.state.loading}
                       bordered
                       onChange={this.handleTableChange}
                        locale={{emptyText:'暂无数据'}}
                />
                <Modal
                    visible={this.state.visible}
                    title="机动车"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    closable={true}
                    style={{maxHeight:650,overflow:"auto"}}
                    footer={null}
                    
                >
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">姓名：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.name:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">身份证号：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.idcard :''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">联系电话：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.phoneNumber:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">登记住所地址：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.domicileRegistration:''} title={this.state.record!==null?this.state.record.domicileRegistration:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">暂住所地址：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.temporaryAddress:''} title={this.state.record!==null?this.state.record.temporaryAddress:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">初次领证日期：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.issueDate:''} readOnly="readOnly"/>
                    </div>
                     <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">准驾车型：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.quasiDrivingModel:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">驾驶证状态：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.driverLicenseStatus :''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">驾证期限：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.driverLicenseTerm:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">是否注销：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.cancellation:''} readOnly="readOnly"/>
                    </div>
                </Modal>
            </div>
        );
    }
};

const tableStyle = {
    width: "100%",
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
const tagDiv = {
    float: "left",
    width: "150px",
    color: "#fff",
    fontSize: "16px",
    textAlign: "center",
    height: "40px",
    lineHeight: "40px",
    background: "rgba(14,33,86,0.8)",
    border: "1px solid rgb(12, 95, 147)",
    marginLeft: "20px",
    // borderBottom:"0",
    marginBottom: "-1px",
    zIndex: "1"
}
const p = {
    fontSize: "16px",
    color: "#fff",
    marginBottom: "10px"
}