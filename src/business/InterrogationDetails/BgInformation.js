/**
 * Created by ycj on 2017/4/6.
 */
//盘查详情页面背景信息下所有表格
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
    postELECTOROCriminalPersonnelData,
    postELECTORODrugRelatedData,
    postELECTOROTrafficViolationData,
    postELECTORORelatedjiangzangStudentData,
    postELECTOROFugitivesData
} from "../../actions/ElectronicArchives";
import {
    store
} from '../../index.js';
import * as constants from "../../utils/Constants";
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
    fontSize:"14px",color:"#fff",marginRight:"20px",width:"162px",float:"left",textAlign:"right"
}

export class BgInformation extends Component {
    componentDidMount() {

    }
    render() {
        let idcard = this.props.idcard;
        let recordId = this.props.recordId;
        let personId = this.props.personId;

        var user = JSON.parse(sessionStorage.getItem('user'));
        var jyxm = user.body.name;

        // let vehicle=this.props.InterrogationDetailsUsers.data.interrogationDetails.basicInformation.vehicle;
        // let driver=this.props.InterrogationDetailsUsers.data.interrogationDetails.basicInformation.driver;
        return (
            <div>
               <div style={{border:"1px solid rgb(12, 95, 147)",padding:"20px",background:"rgba(40,51,99,0.8)",zIndex:"3"}}>
                    <div style={{marginBottom:"20px"}}>
                        <p style={p}>违法犯罪人员</p>
                        <IllegalCrimeTable  idcard={idcard} jyxm={jyxm}/>
                    </div>
                    <div style={{marginBottom:"20px"}}>
                        <p style={p}>涉毒信息</p>
                        <DrugRelatedTable   idcard={idcard} jyxm={jyxm} />
                    </div>
                   <div style={{marginBottom:"20px"}}>
                        <p style={p}>交通违章</p>
                        <TrafficViolationTable   idcard={idcard} jyxm={jyxm}/>
                   </div>
                   <div style={{marginBottom:"20px"}}>
                        <p style={p}>在逃人员</p>
                        <AtLargeTable   idcard={idcard} jyxm={jyxm} />
                  </div>
                   {/*<div style={{marginBottom:"20px"}}>
                        <p style={p}>涉疆涉藏学生</p>
                        <XinjiangStudentsTable   idcard={idcard} jyxm={jyxm} />
                  </div>*/}
                  <div style={{marginBottom:"20px"}}>
                        <p style={p}>重点人员</p>
                        <KeyPersonnalTable   idcard={idcard} jyxm={jyxm} />
                  </div>
                  
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

//违法犯罪人员
class  IllegalCrimeTable extends Component{
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
        post(api+'/data/getGXWFFZList',params).then((data)=>{
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
                title: '姓名',
                dataIndex: 'name',
            },{
                title: '身份证号',
                dataIndex: 'idcard',
            },{
                title: '民族',
                dataIndex: 'nation',
            },{
                title: '性别',
                dataIndex: 'sex',
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
                    title="违法犯罪"
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
                        <label style={mStyle} htmlFor="">民族：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.nation:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">性别：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.sex:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">人员状态：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.personnelState:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">身份代码_拘留所：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.idcardPrison:''} readOnly="readOnly"/>
                    </div>
                     <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">身份代码_看守所强戒所：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.idcardDetentionCenter:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">户籍地详址：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.vehicleModel :''} title={this.state.record!==null?this.state.record.vehicleModel :''} readOnly="readOnly"/>
                    </div>
                    
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">监所编号：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.prisonNumber:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">人员基本信息备注：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.remarks:''} readOnly="readOnly"/>
                    </div>
                </Modal>
            </div>
        );
    }
};

//涉毒信息
class DrugRelatedTable extends Component{
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
   fetch= (params = {"currentPage":1,"entityOrField":true,pd:{idcard: this.props.idcard,jyxm:this.props.jyxm},"showCount":constants.recordPageSize}) => {
        post(api+'/data/getGXSDList',params).then((data)=>{
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
                title: '姓名',
                dataIndex: 'name',
            },{
                title: '身份证号',
                dataIndex: 'idcard',
            },{
                title: '户籍地址',
                dataIndex: 'domicilePlace',
            },{
                title: '登记人',
                dataIndex: 'Registrant',
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
                    title="违法犯罪"
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
                        <label style={mStyle} htmlFor="">户籍地址：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.domicilePlace:''} title={this.state.record!==null?this.state.record.domicilePlace:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">性别：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.sex:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">登记人：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.Registrant:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">人员类型：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.personnelType:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">居住地详址：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.liveAddress:''} title={this.state.record!==null?this.state.record.liveAddress:''} readOnly="readOnly"/>
                    </div>
                     <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">毒品犯罪嫌疑人类型：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.drugSuspectsType :''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">办案民警：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.policeHandlingCase :''} readOnly="readOnly"/>
                    </div>
                    
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">吸毒场所：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.drugAbusePlace:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">滥用毒品种类代码：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.drugAbuseType:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">注射毒品种类：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.drugInjectionsType:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">列管民警：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.managementPlice:''} readOnly="readOnly"/>
                    </div>
                </Modal>
            </div>
        );
    }
};

//交通违章
class TrafficViolationTable extends Component{
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
   fetch= (params = {"currentPage":1,"entityOrField":true,pd:{idcard: this.props.idcard,jyxm:this.props.jyxm},"showCount":constants.recordPageSize}) => {
        post(api+'/data/getJDCWZList',params).then((data)=>{
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
                title: '当事人姓名',
                dataIndex: 'name',
            },{
                title: '所有人',
                dataIndex: 'Owner',
            },{
                title: '号码号牌',
                dataIndex: 'plateNumber',
            },{
                title: '驾驶证号',
                dataIndex: 'driverLicenseNumber',
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
                    title="交通违章"
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
                        <label style={mStyle} htmlFor="">机动车所有人：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.Owner :''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">号牌号码：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.plateNumber:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">号牌种类：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.plateType:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">驾驶证号：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.driverLicenseNumber:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">发证机关：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.issuingAuthority:''} readOnly="readOnly"/>
                    </div>
                     <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">违法编号：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.illegalNumbers:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">违法行为代码：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.conductCode :''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">违法时间：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.conductTime:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">执勤民警：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.dutyPolicemen:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">决定书类别代码：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.decisionBookCategoryCode:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">处理机关代码：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.processingAuthorityCode:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">处理时间：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.processingTime:''} readOnly="readOnly"/>
                    </div>
                </Modal>
            </div>
        );
    }
};

//涉疆涉藏
class XinjiangStudentsTable extends Component{
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
                title: '姓名',
                dataIndex: 'name',
            },{
                title: '身份证号',
                dataIndex: 'idNumber',
            },{
                title: '民族',
                dataIndex: 'nation',
            },{
                title: '性别',
                dataIndex: 'sex',
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

//在逃人员
class AtLargeTable extends Component{
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
   fetch= (params = {"currentPage":1,"entityOrField":true,pd:{idcard: this.props.idcard,jyxm:this.props.jyxm},"showCount":constants.recordPageSize}) => {
        post(api+'/data/getGXZTList',params).then((data)=>{
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
                title: '姓名',
                dataIndex: 'name',
            },{
                title: '身份证号',
                dataIndex: 'idcard',
            },{
                title: '民族',
                dataIndex: 'nation',
            },{
                title: '性别',
                dataIndex: 'sex',
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
                    title="在逃人员"
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
                        <label style={mStyle} htmlFor="">性别：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.sex:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">民族代码：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.nation:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">口音代码：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.accent:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">户籍地详址：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.domicilePlace:''} title={this.state.record!==null?this.state.record.domicilePlace:''} readOnly="readOnly"/>
                    </div>
                     <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">现住地详址：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.presentAddress:''} title={this.state.record!==null?this.state.record.presentAddress:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">职业：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.occupation :''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">车身颜色：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.carBodyColor:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">在逃人员编号：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.personnelNumber:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">逃跑日期：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.escapeDate:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">逃跑方向区划：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.wscapeDirection:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">通缉令编号：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.arrestWarrantNumber:''} readOnly="readOnly"/>
                    </div>
                </Modal>
            </div>
        );
    }
};


//重点人员
class KeyPersonnalTable extends Component{
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
            recordId:this.props.recordId,
            personId:this.props.personId
        },
        showCount:pagination.pageSize});
    }
   fetch= (params = {"currentPage":1,"entityOrField":true,pd:{idcard: this.props.idcard,recordId:this.props.recordId,personId:this.props.personId},"showCount":constants.recordPageSize}) => {
        post(api+'/data/getGXZDRYList',params).then((data)=>{
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
                title: '重点人员编号',
                dataIndex: 'personnelNumber',
            },{
                title: '姓名',
                dataIndex: 'name',
            },{
                title: '身份证号',
                dataIndex: 'idcard',
            },{
                title: '性别',
                dataIndex: 'sex'
            },{
                title: '民族',
                dataIndex: 'nation',
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
                    title="重点人员"
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    closable={true}
                    style={{maxHeight:650,overflow:"auto"}}
                    footer={null}
                >
                     <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">重点人员编号：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.personnelNumber:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">姓名：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.name:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">身份证号：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.idcard :''} readOnly="readOnly"/>
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
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">户籍地详址：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.domicilePlace:''} title={this.state.record!==null?this.state.record.domicilePlace:''} readOnly="readOnly"/>
                    </div>
                     <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">现住地详址：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.presentAddress:''} title={this.state.record!==null?this.state.record.presentAddress:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">立案单位：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.filingUnit:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">重点人员类别标记：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.keyPersonnelCategoryMark:''} readOnly="readOnly"/>
                    </div>
                    <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">有效性：</label>
                        <Input style={{width:'60%'}}  value={this.state.record!==null?this.state.record.effectiveness:''} readOnly="readOnly"/>
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