/**
 * 系统管理人工盘查---特征设置
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
    addInterrogationInformationData,
    PostInterrogationInformationData,
    saveIntrrrogationList,
    DeleteInterrogationInformationData
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
    TextArea,
    SelectModel,
    Shade,
    
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
    Col
} from 'antd';

import moment from 'moment';
moment.locale('zh-cn');

let statusList = {
    data: [{
        text: "正常",
        value: "2001"
    }, {
        text: "异常",
        value: "2002"
    }]
}
const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
export class InterrogationInformation extends Component {
    constructor(props) { //初始化nowPage为1
            super(props);
            this.state = {
                nowPage: 1,
                name: '',
                InterrogationInformation_dateBegin: '',
                InterrogationInformation_dateEnd: '',
                selectedRowsId: [],
                personInfo: '',
                modalKey: 0,
                modalType: '',
                avatarSrc: '',
                docurlSrc:'',
                docurlname:'',
                zoomvisible:false,
                imgtext:'',
                text:null,
            };
            this.pageChange = this.pageChange.bind(this);
        }
        //修改弹出框展示状态
    handChangeModalDialogueShow = (value) => {
        this.setState({
            ModalDialogueShow: value,
        });
    }
    componentDidMount() {
            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    pid:"198"
                },
                showCount: 10
            }
            store.dispatch(PostInterrogationInformationData(creds));
        }
        //删除按钮点击
    
    serchChange = (name, InterrogationInformation_dateBegin, InterrogationInformation_dateEnd) => {
        this.setState({
            nowPage: 1,
            name: name,
            InterrogationInformation_dateBegin: InterrogationInformation_dateBegin,
            InterrogationInformation_dateEnd: InterrogationInformation_dateEnd,
        });
    }
    pageChange(nowPage) {
        this.state = Object.assign({}, this.state, {
            nowPage: nowPage
        });
        let creds = {
            currentPage: nowPage,
            entityOrField: true,
            pd: {
                beginTime: this.state.InterrogationInformation_dateBegin,
                endTime: this.state.InterrogationInformation_dateEnd,
                name: this.state.name,
                pid:"198"
            },
            showCount: 10
        }
        store.dispatch(PostInterrogationInformationData(creds));
    }
    handleDelete = () => {
        let crads = { 
            pd: {
                id: this.state.selectedRowsId,
            },   
        };
        let params = {
            currentPage: this.state.nowPage,
            entityOrField: true,
            pd: {
                beginTime: this.state.InterrogationInformation_dateBegin,
                endTime: this.state.InterrogationInformation_dateEnd,
                name: this.state.name,
                pid:"198"
            },
            showCount: 10
        }
        store.dispatch(DeleteInterrogationInformationData(crads,params));


        this.setState({
            selectedRowsId: [],
           // nowPage: 1
        });


    }
      editShowModal = (record) => {
            this.setState({
                visible: true,
                personInfo: record,
                modalType: 'edit',
                avatarSrc: record.iconurl,
                docurlSrc:record.remark
            });
        }
        addShowModal = (record) => {
            this.setState({
                visible: true,
                modalType: 'add',
                avatarSrc: '',
                docurlSrc:''

            });
        }
        handleCancel = () => {
            this.setState({
                visible: false,
                modalKey: this.state.modalKey + 1
            });
            console.log('modalKey',this.state.modalKey);
        }
        handleOk = () => {
            this.setState({
                visible: false
                // modalKey: this.state.modalKey + 1
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
        //可以把 onChange 的参数（如 event）转化为控件的值
        normFile =(e) => {
            if (e.file.status === 'done') {
                message.success(`图片上传成功!`);
                return e.file.response.result;
            }
            else if (!e.file.status) {
                return this.state.avatarSrc;
            }

        }
        beforeUpload = (file)=>{
            if(file.type !== 'image/png'){
                message.error('请上传.png类型的图片');
                return false;
            }else if(file.size >1024*1000){
                message.error('上传图片不能大于10M');
                return false;
            }
        }
        avatarChange = (info) => {
            console.log('avatarChange', info);
            if (info.file.status === 'done') {
                // this.getBase64(info.file.originFileObj, avatarSrc => this.setState({ avatarSrc }));
                let reader = new FileReader();
                reader.addEventListener('load',
                    ()=>{
                    this.setState({
                       avatarSrc:reader.result 
                    });
                    console.log('图片avatarSrc',this.state.avatarSrc);
                });
                reader.readAsDataURL(info.file.originFileObj);
                console.log('info.file.originFileObj图片',info.file.originFileObj);
            }else if(info.file.status === 'error') {
                message.error(`头像上传失败!`);
            }
        }

        
        //附件上传
        normFilefile =(e) => {
            console.log("eeee",e);
            if (e.file.status === 'done') {
                message.success(`附件上传成功!`);
                return e.file.response.result;
            }
            else if (!e.file.status) {
                return this.state.docurlSrc;
            }
            // if (Array.isArray(e)) {
            //     console.log('eeeeggg',e);
            //     return e;
            // }
            // console.log('eeee',e);
            // return e && e.fileList;


        }
        beforeUploadfile = (file)=>{
            if(file.type!== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
                message.error('请上传附件');
                return false;
            }
           
        }
        docurlChange = (info) => {
            if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded 成功`);
             let reader = new FileReader();
                reader.addEventListener('load',
                    ()=>{
                    this.setState({
                      // docurlSrc:reader.result ,
                       docurlSrc:info.file.response.result
                    });
                });
                
                reader.readAsDataURL(info.file.originFileObj);
                console.log('info.file.originFileObj文件',info.file.originFileObj);
            } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
            }
        }
        saveModel=(e)=>{
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                let userItem = JSON.parse(sessionStorage.getItem('user'));
                if(!err){
                    if(this.state.modalType === "edit"){
                        values.id = this.state.personInfo.key;//让表单数据带上id  后台好进行操作
                            let creds = {
                                pd: {
                                    remark:values.remark? values.remark:this.state.docurlSrc,
                                    name:values.label,
                                    iconurl:values.iconurl? values.iconurl:this.state.avatarSrc,
                                    id:values.id.toString(),
                                    optuser:userItem.user.idcard,
                                    createuser:userItem.user.name,
                                    status:values.status?values.status:'1',
                                    code:values.value?values.value:'',
                                    level:'2',
                                    pid:'198'
                                },    
                            }
                            let params = {
                                currentPage: 1,
                                entityOrField: true,
                                pd: {
                                    beginTime: this.state.InterrogationInformation_dateBegin,
                                    endTime: this.state.InterrogationInformation_dateEnd,
                                    name: this.state.name,
                                    pid:"198"
                                },
                                showCount: 10
                            }      
                    store.dispatch(saveIntrrrogationList(creds,params));
                }else if(this.state.modalType === "add"){
                    console.log('人工盘查-values',values);
                        let creds = {
                            pd:{
                                 name:values.label,
                                remark:values.remark?values.remark:'',
                                iconurl:values.iconurl?values.iconurl:'',
                                menuname:"303",
                                optuser:userItem.user.idcard,
                                createuser:userItem.user.name,
                                status:values.status?values.status:'1',
                                code:values.value?values.value:'',
                                level:'2',
                                pid:'198'
                            },  
                        }
                        let params = {
                            currentPage: 1,
                            entityOrField: true,
                            pd: {
                                beginTime: this.state.InterrogationInformation_dateBegin,
                                endTime: this.state.InterrogationInformation_dateEnd,
                                name: this.state.name,
                                pid:"198"
                            },
                            showCount: 10
                        }
                       store.dispatch(addInterrogationInformationData(creds,params));
                       
                   }
                   this.handleCancel();
                   this.setState({
                    nowPage: 1
                    });
                }
               
            })
        }

    render() {
         const { getFieldDecorator } = this.props.form;
         const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 14
            }
        };

        let interrogationInformationList = store.getState().SystemManagement.data.interrogationInformationList.result.list;
        console.log('interrogationInformationList', interrogationInformationList);
        let nowPage = this.state.nowPage;
        //Table= <InterrogationInformationTable  interrogationInformationList={interrogationInformationList} nowPage={nowPage}/>
        let totalRecord = store.getState().SystemManagement.data.interrogationInformationList.result.total;
        let isFetching = store.getState().SystemManagement.isFetching;
         

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
                {text.iconurl !== ''?<img src={text.iconurl} style={{width:"30px",height:"30px"}} onClick={(e)=>this.zoomclickModel(text)}/>:''}
                </span>
            ),
        }, {
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
        const data = [];
        let recordNumber = parseInt((nowPage - 1) * 10);
        for (var i = 0; i < interrogationInformationList.length; i++) {
            var interrogationInformation = interrogationInformationList[i];
            // let birth = '';
            // if (interrogationInformation.birth === '') {} else {
            //     birth = moment(interrogationInformation.birth, dateFormat);
            // }
            let serial = recordNumber + i + 1;
            data.push({
               // key: i,
                serial: serial,
                label: interrogationInformation.label,
                remark: interrogationInformation.remark,
                iconurl: interrogationInformation.iconurl,
                key: interrogationInformation.key,
                status:interrogationInformation.status,
                optuser: interrogationInformation.optuser,
                updatetime: interrogationInformation.updatetime,
                value: interrogationInformation.value,
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
        // let birth = '';
        // if (InterrogationInformation_dateBegin === '') {} else {
        //     beginDateValue = moment(InterrogationInformation_dateBegin, dateFormat);
        // }
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
                        handleDelete={this.handleDelete}
                        addShowModal={this.addShowModal}
                        serchChange={this.serchChange}
                        selectedRowsId = {this.state.selectedRowsId}
                    />

                        <div className="clear"></div>
                    </div>
                </div>
                {/*表单*/}
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
                            pagination={pagination}
                        />
                        </div>}
                    <div className="clear"></div>
                </div>
                {/*分页*/}
                {/*<Pag pageSize={10} nowPage={nowPage} totalRecord={totalRecord} pageChange={this.pageChange} />*/}

                {/*<ModalDialogue width="433px"  isShow={this.state.ModalDialogueShow} changeStatus={this.handChangeModalDialogueShow} />*/}
                <Modal
                    title="特征设置"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    key={this.state.modalKey}
                    >
                    <Form onSubmit={this.saveModel} >
                        <div className="formItemLeft">
                            <FormItem
                            {...formItemLayout}
                            label="编码"
                           // hasFeedback
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
                                required: true, message: '请输入特征名称!',
                                
                                },{
                                    max:7,message:'最多输入七个字符!',
                                }],
                                initialValue:this.state.modalType === 'edit' ? this.state.personInfo.label : '',
                                validateFirst:true
                            })(
                                <Input />
                            )}
                            </FormItem>
                        </div>
                        {/* <div className="formItemLeft">
                            <FormItem
                            {...formItemLayout}
                            label="附件"
                            hasFeedback
                            >
                            {getFieldDecorator('remark', {
                                  getValueFromEvent:this.normFilefile 
                                })(
                                    <Upload  name="file" 
                                    listType='text'
                                        showUploadList={false} 
                                        action={api + '/data/FilePicupload' }
                                        beforeUpload={this.beforeUploadfile}
                                        onChange={this.docurlChange}
                                    >
                                    
                                    
                                    
                                    <Button>
                                    <Icon type="upload" /> Click to Upload
                                    </Button>
                                    {
                                        this.state.docurlSrc?
                                     <div style={{color:"#fff"}}>{this.state.docurlSrc}</div> :
                                     ''  
                                   }
                                </Upload>
                                )}
                            </FormItem>
                        </div> */}
                        <div className="formItemLeft">
                            <FormItem
                            {...formItemLayout}
                            label="图片"
                            //hasFeedback
                            >
                            {getFieldDecorator('iconurl', {
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
                        <img src={this.state.imgtext.iconurl} style={{width:"80%"}}/>
                </Modal> 
            </div>


        );

    }
};



//姓名
let name,
    InterrogationInformation_dateBegin,
    InterrogationInformation_dateEnd;
//搜索区域内容组件
const SearchArea = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            InterrogationInformation_dateBegin: '',
            InterrogationInformation_dateEnd: '',
            nameClear:'',
            begindateClear:'',
            enddateClear:''
        };
    },
    // onChildChanged: function (id,value) {
    //     if(id==='name'){
    //         name = value;
    //     }else if(id==='InterrogationInformation_status'){
    //         InterrogationInformation_status = value;
    //     }else if(id==='InterrogationInformation_dateBegin'){
    //         InterrogationInformation_dateBegin =value;
    //     }else if(id==='InterrogationInformation_dateEnd'){
    //         InterrogationInformation_dateEnd =value;
    //     }
    //     this.setState({
    //         name: name,
    //         InterrogationInformation_status:InterrogationInformation_status,
    //         InterrogationInformation_dateBegin:InterrogationInformation_dateBegin,
    //         InterrogationInformation_dateEnd:InterrogationInformation_dateEnd
    //     });
    // },
    clear:function(){
        let nameClear = this.state.nameClear;
        let begindateClear = this.state.begindateClear;
        let enddateClear = this.state.enddateClear;
        this.setState({
            name: '',
            InterrogationInformation_dateBegin: '',
            InterrogationInformation_dateEnd: '',
            nameClear:'',
            begindateClear:'',
            enddateClear:''
        });
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                beginTime: '',
                endTime: '',
                name: '',
                pid:"198"
            },
            showCount: 10
        }
        store.dispatch(PostInterrogationInformationData(creds));
        this.props.serchChange(
            this.state.nameClear, this.state.begindateClear, this.state.enddateClear)
    },
    handleNameChange: function(e) {
        this.setState({
            name: e.target.value
        });
    },
    handleBeginDeteClick: function(date, dateString) {
        this.setState({
            InterrogationInformation_dateBegin: dateString,
        });
    },
    handleEndDeteClick: function(date, dateString) {
        this.setState({
            InterrogationInformation_dateEnd: dateString,
        });
    },
    //状态下拉框变更方法
    handleStatusChange: function(value) {
        this.setState({
            InterrogationInformation_status: value
        });
    },
    handleClick: function() { //点击查询
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                beginTime: this.state.InterrogationInformation_dateBegin,
                endTime: this.state.InterrogationInformation_dateEnd,
                name: this.state.name,
                pid:"198"
            },
            showCount: 10
        }
        store.dispatch(PostInterrogationInformationData(creds));
        this.props.serchChange(
            this.state.name, this.state.InterrogationInformation_dateBegin, this.state.InterrogationInformation_dateEnd)
    },
    handleClickClear: function() { //点击创建
        store.dispatch(changeShade('block'));
        this.props.createClick("block");

    },
    showModal: function() {
        if (this.props.selectedRowsId.length === 0) {
            message.error('请选择要删除的项！');
            return;
        }else{
            this.setState({
                visible: true,
            });
        }
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
    render() {
        let name = this.state.name;
        let InterrogationInformation_status = this.state.InterrogationInformation_status;
        let InterrogationInformation_dateBegin = this.state.InterrogationInformation_dateBegin;
        let InterrogationInformation_dateEnd = this.state.InterrogationInformation_dateEnd;

        let beginDateValue = '';
        if (InterrogationInformation_dateBegin === '') {} else {
            beginDateValue = moment(InterrogationInformation_dateBegin, dateFormat);
        }
        let endDateValue = '';
        if (InterrogationInformation_dateEnd === '') {} else {
            endDateValue = moment(InterrogationInformation_dateEnd, dateFormat);
        }
        if ( this.state.InterrogationInformation_dateBegin!= "" && this.state.InterrogationInformation_dateEnd!= "" && this.state.InterrogationInformation_dateBegin > this.state.InterrogationInformation_dateEnd) {
            message.error('提示：开始时间不能大于结束时间！');
            return;
        }
        return (
            <div className="marLeft40 fl z_searchDiv">
                <label htmlFor="" className="font14">名称：</label>
                <Input   style={{width:"130px",margin:"0 10px 0 0"}} type="text"  id='name' placeholder='请输入名称'  value={name}  onChange={this.handleNameChange} />
                <label htmlFor="" className="font14">更新时间：</label>
                <DatePicker  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={beginDateValue} placeholder='请选择日期' onChange={this.handleBeginDeteClick}/>
                <span className="font14" style={{margin:"0 10px 0 0"}}>至</span>
                <DatePicker  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={endDateValue} placeholder='请选择日期' onChange={this.handleEndDeteClick}/>
                <ShallowBlueBtn width="82" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                {/*<ShallowBlueBtn  width="82" text="创建" onClick={this.handleClickClear} margin="0 10px 0 0"/>*/}
                 {/* <Button style={{margin:'0 10px 0 0px',width:"80px"}} onClick={this.props.addShowModal} className="btn_ok">
                         创建
                </Button> */
                <ShallowBlueBtn  width="82" text="创建" onClick={this.props.addShowModal} margin="0 10px 0 0"/>}
                <DeepRedBtn  margin="0 10px 0 0" width="82" text="清除" onClick={this.clear} />
                <DeepRedBtn  width="82" text="删除" onClick={this.showModal} />
                {/* <Button style={{margin:'0 0 0 0px',width:"80px"}} onClick={this.showModal} className="btn_delete">
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
})


//模态框组件
export class ModalDialogue extends Component {
    constructor(props) { //初始化nowPage为1
        super(props);
        this.state = {
            imgPath: "",
            name: '',
            remarks: '',
            img: null
        };
    }
    clear() {
            //关闭弹出框
            this.props.changeStatus("none");
            //关闭遮罩
            store.dispatch(changeShade("none"));
            this.setState({
                imgPath: "",
                name: '',
                remarks: '',
                img: null
            });
        }
        //创建事件
    handleCreate = () => {

            const name = this.state.name;
            const remarks = this.state.remarks;
            const img = this.state.img;
            //   const creds = { name: name, remarks: remarks,img:img }

            const creds = {
                name: name,
                remarks: remarks,
                img: img,
                source: '901002',
                userName: sessionStorage.getItem('userName') || ''
            }

            store.dispatch(addInterrogationInformationData(creds, (e) => this.clear()));

            //保存
            // store.dispatch(addInterrogationInformationData(creds));
            //刷新页面
            // store.dispatch(PostInterrogationInformationData());
            // this.clear();
        }
        //关闭事件
    handleClose = () => {
            this.clear();
        }
        //图片改变事件
    handleChangeImg = (files, event) => {
            //获取图片对象
            let img = files[0];
            this.setState({
                imgPath: img.thumb,
                img: img
            });
        }
        //改变名称事件
    nameChange = (e) => {
            this.setState({
                name: e.target.value
            });
        }
        //改变备注事件
    remarksChange = (id, value) => {
        this.setState({
            remarks: value
        });
    }


    render() {
        let mdisplay = this.props.isShow;
        let name = this.state.name;
        let remarks = this.state.remarks;
        return (
            <div style={{width:this.props.width,height:this.props.height,border:"1px solid #0C5F93",position:"fixed",left:"35%",top:'35%',zIndex:"9999",display:mdisplay}}>
                {/*头部*/}
                <div style={{background:"rgba(2, 24, 85, 0.9)",padding:"5px"}}>
                    <span style={{float:"left",fontSize:"16px",color:"#fff"}}>创建</span><img src="/images/guanbi.png" style={{float:"right",marginTop:"5px"}} onClick={this.handleClose}/>
                    <div style={{clear:"both"}}></div>
                </div>
                {/*内容部分*/}
                <div style={{padding:"20px",background:"rgba(37, 51, 100, 0.9)"}}>
                    <div style={{marginBottom:"20px"}}>


                        <label style={{fontSize:"14px",color:"#fff",marginRight:"20px"}} htmlFor="">名称</label>
                        <Input style={{width:"272px"}} onChange={this.nameChange}  value={name} />

                    </div>
                    <div style={{marginBottom:"20px",position:"relative"}}>
                        <span style={{fontSize:"14px",color:"#fff",marginRight:"20px",float:"left"}}>图片</span>
                        {/*<div style={{background: "rgba(37, 51, 100,0.8)",opacity: 0.8,border: "1px solid #0C5F93",color:"#fff",float:"left",width:"50px",height:"50px",textAlign:"center"}}>
                            <span style={{fontSize:"30px",color:"#0C5F93"}}>+</span>
                        </div>*/}

                        <img src={this.state.imgPath===''?'/images/addp.png':this.state.imgPath} alt=""  ref="img"   width={'60px'} height={'60px'}/>
                        <FileInput btnValue="上传" maxFileSize={3} type = "image" multiple={false} onChange={this.handleChangeImg} width="60px" height="60px" left="50px"/>
                        <div style={{clear:"both"}}></div>
                    </div>
                    <div style={{marginBottom:"20px"}}>
                        <label style={{fontSize:"14px",color:"#fff",marginRight:"20px",verticalAlign: "top",}} htmlFor="">备注</label>
                        <TextArea width="272px" height="50px"  callbackParent={this.remarksChange} value={remarks}/>

                    </div>
                    <div>
                        <ShallowBlueBtn width="40px" text="创建" margin="0 80px 0 120px" onClick={this.handleCreate}/>
                        <DeepRedBtn width="40px" text="作废" onClick={this.handleClose} />
                    </div>
                </div>
            </div>
        );
    }
}

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
    //按钮
const quitBtn = {
    width: "46%",
    height: 31,
    // lineHeight:"31px",
    background: "#01175F",
    color: "#fff",
    border: "none",
    borderBottom: "2px solid #0025B4",
    fontSize: "0.8rem",
    // padding:"0 6px ",

}
const quitBtnRed = {
    width: 82,
    height: 31,
    // lineHeight:"31px",
    background: "#8C3535",
    color: "#fff",
    border: "none",
    borderBottom: "2px solid #EE3C3C",
    fontSize: "14px",
    // marginLeft:"20px"
    // padding:"0 6px ",

}
const quitBtnBlue = {
    width: 82,
    height: 31,
    // lineHeight:"31px",
    background: "#2B6CC5",
    color: "#fff",
    border: "none",
    borderBottom: "2px solid #0C1CD8",
    fontSize: "14px",
    marginRight: "10px"
        // marginLeft:"20px"
        // padding:"0 6px ",

}

const f16 = {
    fontSize: 16,
    color: "#fff",
}
 InterrogationInformation = Form.create()(InterrogationInformation);
export default connect(mainReducer)(InterrogationInformation);