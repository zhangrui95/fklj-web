/**
 * 系统管理原籍地联系人
 */
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
    postCodeData,postCodeTableData,DeletepostCodeTableData,updatepostCodeTableData,addpostCodeTableData
} from "../../actions/SystemManagement";
import {
    changeShade,api
} from "../../actions/actions";
import {
    FileInput
} from "../../components/fileInput";
import {
    StylePage,
    ShallowBlueBtn,
    DeepRedBtn,
    DeepBlueBtn,
    PhotoItem,
    Pag,
    SelectModel
} from "../generalPurposeModule";
import {
    store
} from '../../index.js';
import * as constants from "../../utils/Constants";
import {
    DatePicker,
    Spin,
    Table,
    message,
    Select,
    Input,
    Modal,
    Button,
    Form,
    Upload,
    Icon,
    Row,
    Col,
    TreeSelect
} from 'antd';

import {
    monthFormat,
    dateFormat,
    serverUrl
} from '../../utils/';
import moment from 'moment';
moment.locale('zh-cn');

const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const {TextArea } = Input;

// //分页配置文件
// const pagination = {
//     size: 'small',
//     pageSize: constants.recordPageSize,
//     showTotal(total) {
//         return `合计 ${total} 条记录`;
//     },
//     itemRender(current, type, originalElement) {
//         if (type === 'prev') {
//             return <a>上一页</a>;
//         } else if (type === 'next') {
//             return <a>下一页</a>;
//         }
//         return originalElement;
//     }
// };

//表格样式
const tableStyle = {
    width: "98%",
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

// 样式
const sliderdyHeader = {
    borderBottom: "1px solid #0C5F93",
    padding: "18px 0",
    overflow: "hidden"
}
const font14 = {
    fontSize: "14px",
    color: "#fff"
}

function getNewTreeData(treeData, curKey) {
    let codeTempTreeList =  store.getState().SystemManagement.data.codeTempTreeList.result.list;
   
    console.log('TreeList===',codeTempTreeList);
    const loopTest = (data) => {
        console.log('jiedao date',data);
        data.forEach((item) => {
          //  console.log('(item.key).toString()',(TreeList.pid).toString()); 
            if (curKey === item.key.toString()) {//对比点击的节点和循环出来的树的id是否相同
                item.children = codeTempTreeList;
            }
            else{
                if (item.children) {
                    loopTest(item.children);
                }
            }
        });
    };
    loopTest(treeData);
}

export class CodingTable extends Component {
    constructor(props) { //初始化nowPage为1
        super(props);
        this.state = {
            nowPage: 1,
            selectedRowsId: [],
            dateBegin: '',
            dateEnd: '',
            data: [],
            record: null,
            // pagination: pagination,
            loading: false,
            personInfo:'',
            modalKey: 0,
            modalType: '',
            avatarSrc: '',
            selectcitycode:'',
            codeTable:this.props.codeTable,
            keyvalue:'',
            levelvalue:'1',
            zoomvisible:false,
            imgtext:'',
            text:null,
        };
        this.pageChange = this.pageChange.bind(this);
        
        
    }
    componentDidMount() {
        // this.props.dispatch(fetchHorrorSoftwareData('/getHorrorSoftware'));
       
        store.dispatch(postCodeData('0'));
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                pid:""
            },
            showCount: 10
        }
        store.dispatch(postCodeTableData(creds));
       
    }
    // componentWillReceiveProps(nextProps){
    //     let codeTableData = this.state.codeTable;
    //     // if(this.state.selectcitycode !== nextProps.selectcitycode){
    //         if(codeTableData !== undefined ||codeTableData!== null||codeTableData!== ''){
    //             // let keyvalue = '0';
    //             // let levelvalue= '1';
    //             for(var i=0;i<codeTableData.length;i++){
    //                 var codeTableList = codeTableData[i];
    //                 console.log('codeTableList.value',codeTableList.value);
    //                 if(codeTableList.value === this.state.selectcitycode){
    //                    let keyvalue = codeTableList.key;
    //                    let  levelvalue = codeTableList.level;
    //                     this.setState({
    //                         keyvalue:keyvalue,
    //                         levelvalue:levelvalue
    //                     })
    //                 }
    
    //             }
               
    
    //         }
    //     // }
        
    // }
       
        serchChange = (dateBegin, dateEnd,keyvalue) => {
            this.setState({
                nowPage: 1,
                dateBegin: dateBegin,
                dateEnd: dateEnd,
                keyvalue:keyvalue
            });
        }
        pageChange(nowPage) {
            this.state = Object.assign({}, this.state, {
                nowPage: nowPage
            });
            // var search='nowPage';
            
                let creds = {
                    currentPage: nowPage,
                    entityOrField: true,
                    pd: {
                        beginTime: this.state.dateBegin,
                        endTime: this.state.dateEnd,
                        pid:this.state.keyvalue.toString(),
                        
                    },
                    showCount: 10
                }
                store.dispatch(postCodeTableData(creds));
        }
//删除按钮点击
handleDelete = () => {
            if (this.state.selectedRowsId.length === 0) {
                message.error('请选择要删除的项！');
                return;
            }
            let crads = {
                 currentPage: 1,
                pd: {
                    id: this.state.selectedRowsId,
                },
                showCount: 10
            };
            let params = {
                currentPage: this.state.nowPage,
                pd: {
                    beginTime: this.state.dateBegin,
                    endTime: this.state.dateEnd,
                    pid:this.state.keyvalue.toString()
                },
                showCount: 10
            }
            store.dispatch(DeletepostCodeTableData(crads));
    
    
            this.setState({
                selectedRowsId: [],
                //nowPage: 1
            });
            
    
    
        }
        editShowModal = (record) => {
            this.setState({
                visible: true,
                personInfo: record,
                modalType: 'edit',
                avatarSrc: record.iconUrl
            });
        }
    addShowModal = (record) => {
        console.log('添加里面的',this.state.selectcitycode);
        this.setState({
            visible: true,
            modalType: 'add',
            avatarSrc: '',
            selectcitycode:this.state.selectcitycode,
        });
        
    }
        handleCancel = () => {
            this.setState({
                visible: false,
                modalKey: this.state.modalKey + 1
            });
        }
    //图片放大
    zoomclickModel=(text)=>{
        this.setState({
            zoomvisible: true,
            imgtext:text,
        });
    }
    handleZoomCancel=()=>{
        this.setState({
            zoomvisible: false,
            
        });
    }
        handleOk = () => {
            this.setState({
                visible: false,
                modalKey: this.state.modalKey + 1
            });
        }
        //可以把 onChange 的参数（如 event）转化为控件的值
    normFile =(e) => {
        if (e.file.status === 'done') {
            message.success(`头像上传成功!`);
            return e.file.response.result;
        }
        else if (!e.file.status) {
            return this.state.avatarSrc;
        }

    }

    beforeUpload = (file) => {//文件上传前钩子  参数为上传的文件 
        if (  file.type !== 'image/png'){
            message.error(`请上传.png类型图片`);
            return false;
        }
        else if (file.size > 10485760) {//判断图片的大小
            message.error(`图片上传不能超过10M`);
            return false;
        }
    }
    //回调函数
    avatarChange= (info) => {
        if (info.file.status === 'done') {
            const reader = new FileReader();//允许web异步读取存储在用户计算机上的文件
            reader.addEventListener('load', () => {
                this.setState({ avatarSrc: reader.result})//result  读取到文件的内容 这个属性只在文件读取完 有效 格式由读取的哪个方法决定 只读
            });

            reader.readAsDataURL(info.file.originFileObj);//readAsDataURL 读取指定的blo对象或file对象中内容  originFileObj 文件对象
            //readAsDataURL 操作完成，readyState属性将成为done状态，如果设置了onLoad事件，则调用，同时result会存在一个data：URL格式的字符串，来表示所有文件内容
        }
        else if(info.file.status === 'error') {
            message.error(`头像上传失败!`);
        }
    }

    saveModel=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let userItem = JSON.parse(sessionStorage.getItem('user'));
            console.log('values',values);
            if(!err){
                if(this.state.modalType === "edit"){
                    values.id = this.state.personInfo.key;//让表单数据带上id  后台好进行操作
                    values.pid = this.state.personInfo.pid;
                    values.level = this.state.personInfo.level,
                    values.status = this.state.personInfo.status
                    if(values.status ==='是'){
                        values.status = '1'
                    }else{
                        values.status = '0'
                    }
                    console.log('this.state.personInfo.pid',this.state.personInfo.pid);
                        let creds = {
                           
                            pd:{
                                name:values.label,
                                iconUrl:values.iconUrl?values.iconUrl:this.state.avatarSrc,
                                id:values.id.toString(),
                                optuser:userItem.user.idcard,
                                createuser:userItem.user.idcard,
                                remark:values.remark?values.remark:'',
                                status:values.status?values.status:'1',
                                code:values.value?values.value:'',
                                pid:values.pid.toString()?values.pid.toString():'0',
                                level:values.level?values.level.toString():'1'
                            },//传参 把后台需要的参数传过去
                           
                        }
                        let params = {
                            currentPage:1,
                            pd:{
                                beginTime: this.state.dateBegin,
                                endTime: this.state.dateEnd,
                                pid:this.state.keyvalue.toString(),
                            },
                            showCount: 10 
                        }
                    store.dispatch(updatepostCodeTableData(creds,params));
                }else if(this.state.modalType === "add"){
                    let codeTableData = this.state.codeTable;
                    console.log('codeTableData 判断',codeTableData);
                    if(codeTableData !== undefined ||codeTableData!== null||codeTableData!== ''){
                        // let keyvalue = '0';
                        // let levelvalue= '1';
                        // for(var i=0;i<codeTableData.length;i++){
                        //     var codeTableList = codeTableData[i];
                        //     console.log('codeTableList.value',codeTableList.value);
                        //     if(codeTableList.value === this.state.selectcitycode){
                        //         console.log('codeTableList.key',codeTableList.key);
                        //     // keyvalue = codeTableList.key;
                        //     // levelvalue = codeTableList.level;
                        //     this.setState({
                        //         keyvalue: codeTableList.key,
                        //         levelvalue:codeTableList.level
                        //     });
                        //     }

                        // }
                        console.log('this.state.keyvalue edit',this.state.keyvalue);
                        
                        let creds = {//表单域不一定写了所有的字段 所以要把空值通过赋值显示
                            
                             pd:{
                                 name:values.label?values.label:'', 
                                 iconUrl:values.iconUrl?values.iconUrl:'',
                                 menuname:"0",
                                 optuser:userItem.user.idcard,
                                 createuser:userItem.user.idcard,
                                 remark:values.remark?values.remark:'',
                                 code:values.value?values.value:'',
                                 pid:this.state.keyvalue.toString() === ''?'0':this.state.keyvalue.toString(),
                                 level:(parseInt(this.state.levelvalue)+1).toString(),
                                 status:values.status?values.status:'1',
                             },
                            
                         }
                         let params = {
                             currentPage:1,
                             pd:{

                                 beginTime: this.state.dateBegin,
                                 endTime: this.state.dateEnd,
                                 pid:this.state.keyvalue.toString(),
                             },
                             showCount: 10 
                         }
                         store.dispatch(addpostCodeTableData(creds,params))
                    }
                   
                    //判断 传过来的是否为空
                    console.log('add values',values);
                    // if(this.state.selectcitycode === undefined||this.state.selectcitycode === ""){
                    //     let creds = {//表单域不一定写了所有的字段 所以要把空值通过赋值显示
                           
                    //         pd:{
                    //             name:values.label?values.label:'', 
                    //             iconUrl:values.iconUrl?values.iconUrl:'',
                    //             menuname:"0",
                    //             optuser:userItem.user.idcard,
                    //             createuser:userItem.user.idcard,
                    //             remark:values.remark?values.remark:'',
                    //             value:values.value?values.value:'',
                    //             pid:this.state.keyvalue.toString(),
                    //             level:this.state.levelvalue.toString(),
                    //         },
                           
                    //     }
                    //     let params = {
                    //         currentPage:1,
                    //         pd:{
                    //             beginTime: this.state.dateBegin,
                    //             endTime: this.state.dateEnd,
                    //             code:this.state.selectcitycode,
                    //         },
                    //         showCount: 10 
                    //     }
                    //     store.dispatch(addpostCodeTableData(creds,params))
                    // }else{
                    //     let creds = {//表单域不一定写了所有的字段 所以要把空值通过赋值显示
                           
                    //         pd:{
                    //             name:values.label?values.label:'', 
                    //             iconUrl:values.iconUrl?values.iconUrl:'',
                    //             menuname:this.state.selectcitycode,
                    //             optuser:userItem.user.idcard,
                    //             createuser:userItem.user.idcard,
                    //             remark:values.remark?values.remark:'',
                    //             value:values.value?values.value:'',
                    //             pid:this.state.keyvalue.toString(),
                    //             level:this.state.levelvalue.toString(),
                    //         },
                           
                    //     }
                    //     let params = {

                    //         currentPage:1,
                    //         pd:{
                    //             beginTime: this.state.dateBegin,
                    //             endTime: this.state.dateEnd,
                    //             code:this.state.selectcitycode,
                    //         },
                    //         showCount: 10 
                    //     }
                    //     store.dispatch(addpostCodeTableData(creds,params)) 
                    // }
                    
            }
            this.handleCancel();
            this.setState({
                nowPage: 1
            });
         }
            
           
        })
    }

    statusChange=(value)=>{
        this.setState({
            status:value
        });
    }
       render(){
           console.log('this.state.imgtext',this.state.imgtext);
        console.log('keyvalue',this.state.keyvalue);
        let obj =  store.getState().SystemManagement.data.codeTableist.result.list;
        let nowPage = this.state.nowPage;
        let totalRecord = store.getState().SystemManagement.data.codeTableist.result.total;
        let isFetching = store.getState().SystemManagement.isFetching;
        console.log('this.state.selectcode',this.state.selectcitycode);
        const columns = [{
            title: '序号',
            dataIndex: 'serial',
        }, {
            title: '编码',
            dataIndex: 'value',
        }, {
            title: '名称',
            dataIndex: 'label',
        }, {
            title: '图标',
            render: (text, record) => (
                <span>
                {text.iconUrl !== ''?<img src={text.iconUrl} style={{width:"30px",height:"30px"}} onClick={(e)=>this.zoomclickModel(text)}/>:''} 
                </span>
            ),
        }, {
            title: '数据来源',
            dataIndex: 'source',
        }, {
            title: '是否启用',
            dataIndex: 'status',
        }, {
            title: '更新时间',
            dataIndex: 'updatetime',
            width:180,
        }, {
            title: '操作人',
            dataIndex: 'optuser',
        }, {
            title: '备注',
            dataIndex: 'remark',
            render: (text, record) => (<span>
                {text !== ''? 
                   <span title={text} style={{cursor:"pointer"}}>
                       {
                           text !==undefined ? (text.length <= 10? text.slice(0,9):text.slice(0,9)+"..."):''
                       }
                   </span>
                   :
               ''
                }
               </span>)
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                        <span onClick={(e)=>this.editShowModal(record)} style={{cursor:'pointer'}}>编辑</span>
                </span>
            ),
        }];
        const data = [];
        let recordNumber = parseInt((nowPage - 1) * 10);
        for (var i = 0; i < obj.length; i++) {
            var objList = obj[i];
            let serial = recordNumber + i + 1;
            data.push({
               // key: i,
                serial: serial,
                label: objList.label,
                iconUrl: objList.iconUrl,
                remark: objList.remark,
                source: objList.source,
                optuser: objList.optuser,
                updatetime: objList.updatetime,
                value: objList.value,
                status: objList.status,
                pid:objList.pid,
                key: objList.key,
                level:objList.level,

            });

        }
         const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                // const ids = [];
                // for (var i = 0; i < selectedRows.length; i++) {
                //     var selectedRow = selectedRows[i];
                //     ids.push(selectedRow.id);
                // }
                this.setState({
                    selectedRowsId: selectedRowKeys
                });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
        };  

        let codeTreeList =  store.getState().SystemManagement.data.codeTreeList.result.list;
       

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
           labelCol: {
               span: 6,
           },
           wrapperCol: {
               span: 14
           }
       };
       let statusList = [{
            "key": "是",
            "value": '1'
        }, {
            "key": "否",
            "value": '0'
        }];
    let statusOptions = [];
    for (var i = 0; i < statusList.length; i++) {
        var statusUnit = statusList[i];
        statusOptions.push(
            <Option key={statusUnit.key} value={statusUnit.value}>{statusUnit.key}</Option>
        )
    }
           const pagination = {
               onChange: (page) =>{
                   this.setState({
                       nowPage: page,
                   });
                   this.pageChange(page)
               },
               showQuickJumper:'true',
               total: totalRecord,
               current: this.state.nowPage,
           }
           return(
            <div className="sliderWrap">
                <div className="sliderItemDiv">
                    <div style={sliderdyHeader}>
                        <SearchArea   
                            dispatch={this.props.dispatch} 
                            handleClickAdd={this.addShowModal}
                            handleDelete={this.handleDelete}
                            serchChange={this.serchChange}
                            codeTreeList = {codeTreeList}
                            codeTable={this.state.codeTable}
                        />
                        <div className="clear"></div>
                    </div>
                    <div className="z_slderRightBody sys_overflow">
                        {isFetching ===  true?
                        <div style={{textAlign:"center",position:"absolute",left:"45%",top:"50%"}}>
                            <Spin size="large" />
                        </div>:
                        <div style={{padding:"0 15px"}}>
                            <Table 
                                rowSelection={rowSelection} 
                                columns={columns} 
                                dataSource={data} 
                                bordered  
                                // pagination={false}
                                pagination={pagination}
                            />
                        </div>}
                        <div className="clear"></div>
                    </div>
                    {/*分页*/}
                    {/*<Pag pageSize={10} nowPage={nowPage} totalRecord={totalRecord} pageChange={this.pageChange} />*/}
                    {/* 模态框 */}
                    <Modal
                    title="数据字典"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    key={this.state.modalKey}
                    >
                    <Form onSubmit={this.saveModel}>
                    <div className="formItemLeft">
                            <FormItem
                            {...formItemLayout}
                            label="编码"
                            //hasFeedback
                            >
                            {getFieldDecorator('value', {
                                rules: [{
                                    required: true, message: '请输入编码!',
                                    },{
                                        max:14,message:'最多输入十四个字符!',
                                    }],
                                initialValue:this.state.modalType === 'edit' ? this.state.personInfo.value : '',
                                validateFirst:true
                            })(
                                <Input />
                            )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                            {...formItemLayout}
                            label="名称"
                           // hasFeedback
                            >
                            {getFieldDecorator('label', {
                                rules: [{
                                required: true, message: '请输入名称!',
                                },{
                                    max:20,message:'最多输入二十个字符!',
                                }],
                                initialValue:this.state.modalType === 'edit' ? this.state.personInfo.label : '',
                                validateFirst:true
                            })(
                                <Input />
                            )}
                            </FormItem>
                        </div>
                        
                        <div className="formItemLeft">
                            <FormItem
                                {...formItemLayout} label={'图片'} hasFeedback>

                                {getFieldDecorator('iconUrl', {
                                    getValueFromEvent: this.normFile
                                })(
                                    <Upload className="avatar-uploader" name="file" 
                                        showUploadList={false} 
                                        action={api + '/data/FilePicupload' }
                                        beforeUpload={this.beforeUpload}
                                        onChange={this.avatarChange}
                                    >
                                    {
                                        this.state.avatarSrc ?
                                            <img src={this.state.avatarSrc} alt="" className="avatar" /> :
                                            <Icon style={{color:'#fff'}} type="plus" className="avatar-uploader-trigger" />
                                    }
                                </Upload>
                                )}
                            </FormItem>
                        </div>
                        
                        <div className="formItemLeft">
                            <FormItem
                            {...formItemLayout}
                            label="是否启用"
                           // hasFeedback
                            >
                            {getFieldDecorator('status', {
                                
                                initialValue:this.state.modalType === 'edit' ? this.state.personInfo.status : '1',
                                validateFirst:true
                            })(
                                <Select key='status'                                       
                                        //placeholder="请选择状态"
                                        optionFilterProp="children"
                                        onChange={this.statusChange}
                                        // value={status}
                                        dropdownMatchSelectWidth={false}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    
                                    {statusOptions}
                                </Select>
                            )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                            {...formItemLayout}
                            label="备注"
                           // hasFeedback
                            >
                            {getFieldDecorator('remark', {
                                rules:[{
                                    max:50,message:'最多输入五十个字符!',
                                }],
                                initialValue:this.state.modalType === 'edit' ? this.state.personInfo.remark : '',
                                validateFirst:true
                            })(
                                <TextArea  style={{resize:"none"}} />
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
                {/* 点击图片放大 */}
                    <Modal
                        className="zoomImg"
                        visible={this.state.zoomvisible}
                        onCancel={this.handleZoomCancel}
                        footer={null}
                        style={{textAlign:'center',}}
                        >
                        <img src={this.state.imgtext.iconUrl} style={{width:"80%"}}/>
                    </Modal>      
                </div>
            </div>
           );
       };


}

//树形选择器
class Tree extends Component{
    state={
        citycode: '',
    }
    constructor(props){  //初始化nowPage为1
        super(props);
        this.state = {
            
            treeData: props.treeData,
        };
    }
     componentDidMount() {

    }
    clear = () =>{
        this.setState({
            citycode:'',
       });
    }
    //接收到新的propos state 后进行渲染之前调用
    componentWillReceiveProps(nextProps){
        if(this.props.treeData !== nextProps.treeData){
            this.state = {
                treeData: nextProps.treeData,
                
            };
        }
    }
     
   
    load = (node) =>{
        
        store.dispatch(postCodeData(node.props.eventKey));//点击的节点id
        return new Promise((resolve) => {//es6 异步
            setTimeout(() => {//定时器
                let treeData = [...this.state.treeData];
                //let a = fetchUnitTree();
                //console.info('a',a);
                console.info('node.props.eventKey:',node.props.eventKey);
                getNewTreeData(treeData, node.props.eventKey);
                this.setState({ treeData });
                resolve();
            }, 500);
        });
    }
    onChange = (value) => {
        
        console.log('shu value',value);
        return new Promise((resolve) => {
            setTimeout(() => {
                    this.setState({
                        citycode:value,
                   });

               console.log('this.state.citycode',this.state.citycode);
               this.props.citycodeChange(this.state.citycode);
               this.props.handleClick();
            },500)
            
        })
       
       
   }
    render(){
        console.log('this.state.citycode里面',this.state.citycode);
        const tProps = {
            treeData:this.state.treeData,
            value: this.state.citycode,
            onChange: this.onChange,
            multiple: false,
            treeCheckable: false,
            dropdownStyle:{maxHeight: 500, overflow: 'auto',position:"fixed"},
            dropdownMatchSelectWidth:false,
            showCheckedStrategy: SHOW_PARENT,
            loadData:this.load,
            searchPlaceholder: 'Please select',
            style: {
                width: 280,
            },
        };
        return <TreeSelect placeholder="请选择数据字典" {...tProps} />;
        
    }
}

const SearchArea = React.createClass({
    getInitialState: function() {
        return {
            dateBegin: '',
            dateEnd: '',
            selectcitycode:'',
            keyvalueClear:'',
            begindateClear:'',
            enddateClear:'',
            keyvalue:'',
            levelvalue:'1'
        };
    },
    // clear:function(){
    //     this.setState({
    //         dateBegin: '',
    //         dateEnd: '',
    //         selectcitycode:''
    //     });
    //     store.dispatch(postCodeData(0));
    // },
    handleBeginDeteClick: function(date, dateString) {
        this.setState({
            dateBegin: dateString,
        });
    },
    handleEndDeteClick: function(date, dateString) {
        this.setState({
            dateEnd: dateString,
        });
    },
    handleClick: function() { //点击查询
        if ( this.state.dateBegin!= "" && this.state.dateEnd!= "" && this.state.dateBegin > this.state.dateEnd) {
            message.error('提示：开始时间不能大于结束时间！');
            return;
        } else {
            let codeTableData = this.props.codeTable;
            if(codeTableData !== undefined ||codeTableData!== null||codeTableData!== ''){
                for(var i=0;i<codeTableData.length;i++){
                    var codeTableList = codeTableData[i];
                    console.log('codeTableList.value',codeTableList.value);
                    if(codeTableList.value === this.state.selectcitycode){
                        this.setState({
                            keyvalue:codeTableList.key,
                            levelvalue:codeTableList.level
                        })
                    }
                }
                let creds = {
                    currentPage: 1,
                    entityOrField: true,
                    pd: {
                        beginTime: this.state.dateBegin,
                        endTime: this.state.dateEnd,
                        pid:this.state.keyvalue?this.state.keyvalue.toString():'',
                    },
                    showCount: 10
                }
                store.dispatch(postCodeTableData(creds));
                this.props.serchChange(
                    this.state.dateBegin, this.state.dateEnd,this.state.keyvalue)
            }
        }
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
    citycodeChange:function(selectcitycode){
        this.setState({
            selectcitycode: selectcitycode,
        });
    },
    clear:function(){
        this.refs.tree.clear();
       let keyvalueClear=this.state.keyvalueClear;
       let begindateClear=this.state.begindateClear;
       let enddateClear=this.state.enddateClear;
        this.setState({
            dateBegin:'',
            dateEnd:'',
            keyvalueClear:'',
            begindateClear:'',
            enddateClear:''

        });
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                beginTime:'',
                endTime: '',
                code:'',
            },
            showCount: 10
        }
        store.dispatch(postCodeTableData(creds));
        store.dispatch(postCodeData('0'));
        this.props.serchChange(
            this.state.begindateClear, this.state.enddateClear, this.state.keyvalueClear)
    },
    render() {
        console.log('查询条件',this.state.selectcitycode);
        let dateBegin = this.state.dateBegin;
        let dateEnd = this.state.dateEnd;

        let beginDateValue = '';
        if (dateBegin === '') {} else {
            beginDateValue = moment(dateBegin, dateFormat);
        }
        let endDateValue = '';
        if (dateEnd === '') {} else {
            endDateValue = moment(dateEnd, dateFormat);
        }
        if ( this.state.dateBegin!= "" && this.state.dateEnd!= "" && this.state.dateBegin > this.state.dateEnd) {
            message.error('提示：开始时间不能大于结束时间！');
            return;
        }
        return (
            <div className="marLeft40 fl z_searchDiv">
                <label htmlFor="" className="font14" style={{marginRight:10}}>数据字典：</label>
                <Tree treeData={this.props.codeTreeList} citycodeChange={this.citycodeChange} handleClick={this.handleClick} ref='tree'/>
                <label htmlFor="" className="font14" style={{marginLeft:10}}>更新时间：</label>
                <DatePicker  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={beginDateValue} placeholder="请选择日期" onChange={this.handleBeginDeteClick}/>
                <span className="font14" style={{margin:"0 10px 0 0"}}>至</span>
                <DatePicker  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={endDateValue} placeholder="请选择日期" onChange={this.handleEndDeteClick}/>
                <ShallowBlueBtn width="82" text="查询" margin="0 10px 0 0px" onClick={this.handleClick} />
                <ShallowBlueBtn  width="82" text="创建" margin="0 10px 0 0" onClick={this.props.handleClickAdd} />
                <DeepRedBtn  margin="0 10px 0 0" width="82" text="清除" onClick={this.clear} />
                <DeepRedBtn  width="82" text="删除" onClick={this.showModal} />
                {/* <Button style={{margin:'0 0 0 10px',width:"80px"}} onClick={this.showModal} className="btn_delete">
                          删除
                </Button> */}
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
            </div>
        );
    }
});


const mStyle = {
        fontSize: "14px",
        color: "#fff",
        marginRight: "20px",
        width: "56px",
        float: "left",
        textAlign: "right"
    }
    //select


    CodingTable = Form.create()(CodingTable);
export default connect(mainReducer)(CodingTable);