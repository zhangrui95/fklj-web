/**
 * 系统管理涉恐软件
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
    addHorrorSoftwareData,
    updateHorrorSoftwareData,
    DeleteHorrorSoftwareData,
    PostHorrorSoftwareData
} from "../../actions/SystemManagement";
import {
    FileInput
} from "../../components/fileInput";
import {
    changeShade
} from "../../actions/actions";
import {
    StylePage,
    ShallowBlueBtn,
    DeepRedBtn,
    DeepBlueBtn,
    PhotoItem,
    Pag,
    SelectModel,
    TextArea,
    Shade
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
    Input,
    Select,
    Modal,
    Button,
    Form,
    Upload,
    Icon,
    Row,
    Col,
} from 'antd';
import {
    api
} from '../../actions/actions';
import {
    post,
    get,
    put
} from "../../actions/request";

import moment from 'moment';
moment.locale('zh-cn');

const mStyle = {
        fontSize: "14px",
        color: "#fff",
        marginRight: "20px",
        width: "56px",
        float: "left",
        textAlign: "right"
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


let rankList = {
    data: [{
        text: "橙色",
        value: "1001"
    }, {
        text: "黄色",
        value: "1002"
    }]
}
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

export class HorrorSoftware extends Component {
    constructor(props) { //初始化nowPage为1
        super(props);
        console.log('this.props', this.props)
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
            data: [],
            record: null,
            pagination: pagination,
            loading: false,
            personInfo:'',
            modalKey: 0,
            modalType: '',
            avatarSrc: '',
            remark:"",
            zoomvisible:false,
            imgtext:'',
            text:null,
        };
        this.pageChange = this.pageChange.bind(this);
       
    }
    componentDidMount() {
            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    pid:"199"
                },
                showCount: 10
            }
            store.dispatch(PostHorrorSoftwareData(creds));
        }
       // 修改弹出框展示状态
    handChangeModalDialogueShow = (value) => {
            this.setState({
                ModalDialogueShow: value,
            });
        }
        //选中表格行详情lineId变更方法
    handleLineIdChange = (value, highRiskLine = null) => { 
        this.setState({
            lineId: value, //id
            ModalDialogueType: 'edit',
            ModalDialogueShow: 'block',
            highRiskLine: highRiskLine, //对象

        });
        store.dispatch(changeShade("block"));
    }
    handleClickAdd = () => {
            this.setState({
                ModalDialogueType: 'add',
            });
            this.handChangeModalDialogueShow("block");
            store.dispatch(changeShade('block'));

        }
        //删除按钮点击
    

    serchChange = (name, begindate, enddate) => {
        this.setState({
            //nowPage: 1,
            name: name,
            begindate: begindate,
            enddate: enddate,
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
                beginTime: this.state.begindate,
                endTime: this.state.enddate,
                name: this.state.name,
                pid:"199"
            },
            showCount: 10
        }
        store.dispatch(PostHorrorSoftwareData(creds));
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
        store.dispatch(DeleteHorrorSoftwareData(crads,params));


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
                avatarSrc: record.iconUrl
            });
        }
    addShowModal = (record) => {
        this.setState({
            visible: true,
            modalType: 'add',
            avatarSrc: ''
        });
        
    }
        handleCancel = () => {
            this.setState({
                visible: false,
                modalKey: this.state.modalKey + 1
            });
        }
        handleOk = () => {
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

        // getBase64 = (img, callback) => {
        //     const reader = new FileReader();
        //     reader.addEventListener('load', () => callback(reader.result));
        //     reader.readAsDataURL(img);
        // }
        saveModel=(e)=>{
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                let userItem = JSON.parse(sessionStorage.getItem('user'));
                if(!err){
                    if(this.state.modalType === "edit"){
                        values.id = this.state.personInfo.key;//让表单数据带上id  后台好进行操作
                        console.log('this.state.personInfo',this.state.personInfo);
                        console.log('values.id',values.id);
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
                                    level:'2',
                                    pid:'199'
                                },//传参 把后台需要的参数传过去
                            }
                            let params = {
                                currentPage: 1,
                                pd: {
                                    beginTime: this.state.begindate,
                                    endTime: this.state.enddate,
                                    name: this.state.name,
                                    pid:"199"
                                },
                                showCount: 10
                            }    
                        store.dispatch(updateHorrorSoftwareData(creds,params));
                    }else if(this.state.modalType === "add"){
                        let creds = {//表单域不一定写了所有的字段 所以要把空值通过赋值显示
                            pd:{
                                name:values.label?values.label:'', 
                                iconUrl:values.iconUrl?values.iconUrl:'',
                                menuname:"304",
                                optuser:userItem.user.idcard,
                                createuser:userItem.user.idcard,
                                remark:values.remark?values.remark:'',
                                status:values.status?values.status:'1',
                                code:values.value?values.value:'',
                                level:'2',
                                pid:'199'
                            }, 
                        }
                        let params = {
                            currentPage: 1,
                            pd: {
                                beginTime: this.state.begindate,
                                endTime: this.state.enddate,
                                name: this.state.name,
                                pid:"199"
                            },
                            showCount: 10
                        } 
                        store.dispatch(addHorrorSoftwareData(creds,params))
                        
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
        // let horrorSoftwareList = this.props.horrorSoftwareList;
       let nowPage = this.state.nowPage;
        // let Table;
        // Table= <HorrorSoftwareTable  horrorSoftwareList={horrorSoftwareList} nowPage={nowPage}  lineIdChange={this.handleLineIdChange}/>
        let horrorSoftwareList = store.getState().SystemManagement.data.horrorSoftwareList.result.list;
        let totalRecord = store.getState().SystemManagement.data.horrorSoftwareList.result.total;
        let isFetching = store.getState().SystemManagement.isFetching;

        console.log('horrorSoftwareList',horrorSoftwareList);
         console.log(this.state.modalType);
        
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
        for (var i = 0; i < horrorSoftwareList.length; i++) {
            var horrorSoftware = horrorSoftwareList[i];
            let serial = recordNumber + i + 1;
            data.push({
               // key: i,
                serial: serial,
                label: horrorSoftware.label,
                iconUrl: horrorSoftware.iconUrl,
                key: horrorSoftware.key,
                status:HorrorSoftware.status,
                optuser: HorrorSoftware.optuser,
                createtime:horrorSoftware.createtime,
                updatetime:horrorSoftware.updatetime,
                value:horrorSoftware.value,
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
                // console.log('ids',ids);
                this.setState({
                    selectedRowsId: selectedRowKeys
                });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
        };

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
                        <Table 
                            rowSelection={rowSelection} 
                            columns={columns} 
                            dataSource={data} 
                            bordered  
                            pagination={false} 
                        />
                        </div>}
                    <div className="clear"></div>
                </div>
                {/*分页*/}
                <Pag pageSize={10} nowPage={nowPage} totalRecord={totalRecord} pageChange={this.pageChange} />
                {/*模态框*/}
                {/*<ModalDialogue width="433px" 
                    isShow={this.state.ModalDialogueShow} 
                    lineId={this.state.lineId} 
                    highRiskLine={this.state.highRiskLine} 
                    lineIdChange={this.handleLineIdChange} 
                    changeStatus={this.handChangeModalDialogueShow}
                    modalDialogueType={this.state.ModalDialogueType}
                  
                />*/}
                <Modal
                title="涉恐软件"
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
                           // hasFeedback
                            >
                            {getFieldDecorator('value', {
                                rules: [{
                                    required: true, message: '请输入编码!'
                                },{
                                    max:14,message:'最多输入十四个字符!'
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
                                {...formItemLayout} label={'图片'} 
                                //hasFeedback
                                >

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


        );

    }
};



//姓名
let name, begindate,
    enddate;
//搜索区域内容组件
const SearchArea = React.createClass({
        getInitialState: function() {
            return {
                name: '',
                begindate: '',
                enddate: '',
                nameClear:'',
                begindateClear:'',
                enddateClear:''
            };
        },
        // onChildChanged: function (id,value) {
        //     if(id==='name'){
        //         name = value;
        //     }else if(id==='begindate'){
        //         begindate =value;
        //     }else if(id==='enddate'){
        //         enddate =value;
        //     }
        //     this.setState({
        //         name: name,
        //         begindate:begindate,
        //         enddate:enddate
        //     });
        // },
        handleNameChange: function(e) {
            this.setState({
                name: e.target.value
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

        clear:function(){
            let nameClear = this.state.nameClear;
            let begindateClear = this.state.begindateClear;
            let enddateClear = this.state.enddateClear;
            this.setState({
                name: '',
                begindate: '',
                enddate: '',
                enddateClear:'',
                begindateClear:'',
                nameClear:''

            });
            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    beginTime: '',
                    endTime: '',
                    name: '',
                    pid:"199"
                },
                showCount: 10
            }
            store.dispatch(PostHorrorSoftwareData(creds));
            this.props.serchChange(
                this.state.nameClear, this.state.begindateClear, this.state.enddateClear)
        },
        handleClick: function() { //点击查询
            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    beginTime: this.state.begindate,
                    endTime: this.state.enddate,
                    name: this.state.name,
                    pid:"199"
                },
                showCount: 10
            }
            store.dispatch(PostHorrorSoftwareData(creds));
            this.props.serchChange(
                this.state.name, this.state.begindate, this.state.enddate)
        },
        handleClickClear: function() { //点击创建
            store.dispatch(changeShade('block'));
            this.props.createClick("block");

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
        render() {
            let name = this.state.name;
            let begindate = this.state.begindate;
            console.log('begindate', begindate)
            let enddate = this.state.enddate;
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
                <label htmlFor="" className="font14">名称：</label>
                <Input style={{width:'111px',marginRight:"10px"}} margin="0 10px 0 0"  type="text"  id='name' placeholder=''  value={name}  onChange={this.handleNameChange} />
                <label htmlFor="" className="font14">更新时间：</label>
                {/*<Input width="125px" margin="0 10px 0 0" type="date" id='begindate' value={begindate}  callbackParent={this.onChildChanged}/>*/}
               <DatePicker  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={beginDateValue}  placeholder='' onChange={this.handleBeginDeteClick}/>
                <span className="font14" style={{margin:"0 10px 0 0"}}>至</span>
                {/*<Input width="125px" margin="0 10px 0 0" type="date" id='enddate' value={enddate} callbackParent={this.onChildChanged}/>*/}
                <DatePicker  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={endDateValue}  placeholder='' onChange={this.handleEndDeteClick}/>
                <ShallowBlueBtn width="82" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                <ShallowBlueBtn  width="82" text="创建" onClick={this.props.addShowModal} margin="0 10px 0 0"/>
                <DeepRedBtn  margin="0 10px 0 0" width="82" text="清除" onClick={this.clear} />
                <DeepRedBtn  width="82" text="删除" onClick={this.showModal} />
                {/* <Button style={{margin:'0 0 0 0px',width:"80px"}} onClick={this.clear} className="btn_delete">
                          清除
                </Button>
                <Button style={{margin:'0 0 0 0px',width:"80px"}} onClick={this.showModal} className="btn_delete">
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
            type: "",
            level: "",
            remarks: '',
            img: null,
            id: ''
        };
    }
    clear() {
        this.props.lineIdChange('');
        //关闭弹出框
        this.props.changeStatus("none");
        //关闭遮罩
        store.dispatch(changeShade("none"));
        this.setState({
            imgPath: "",
            name: '',
            type: "",
            level: "",
            remarks: '',
            img: null,
            id: ''
        });
    }
    componentWillReceiveProps(nextProps) {
            //获取白名单对象
            let highRiskLine = nextProps.highRiskLine;
            if (highRiskLine !== null) {
                this.setState({
                    id: highRiskLine.id,
                    name: highRiskLine.name,
                    type: highRiskLine.softType,
                    level: highRiskLine.rank,
                    remarks: highRiskLine.remarks,
                    img: highRiskLine.imgsrc,
                    imgPath: highRiskLine.imgsrc,
                })
            }
        }
        //创建事件
    handleCreate = () => {

            const name = this.state.name;
            const type = this.state.type;
            const level = this.state.level;
            const remarks = this.state.remarks;
            const img = this.state.img;
            const id = this.state.id;
            //const creds = { name: this.state.name, remarks:this.state.remarks,img:this.state.img ,type:this.state.type,level:this.state.level,}
            console.log('type', this.props.modalDialogueType);
            if (this.props.modalDialogueType === 'add') {
                console.log('add');
                const creds = {
                    name: name,
                    type: type,
                    level: level,
                    remarks: remarks,
                    img: img,

                    source: '901002',
                    userName: sessionStorage.getItem('userName') || ''
                }
                store.dispatch(addHorrorSoftwareData(creds, (e) => this.clear()));
            } else if (this.props.modalDialogueType === 'edit') {
                console.log('edit');
                const creds = {
                    name: name,
                    type: type,
                    level: level,
                    remarks: remarks,
                    img: img,
                    id: id,
                    source: '901002',
                    userName: sessionStorage.getItem('userName') || ''
                }
                store.dispatch(updateHorrorSoftwareData(creds, (e) => this.clear()));
            }

            // if(this.props.lineId === ""){

            // store.dispatch(addHorrorSoftwareData(creds));
            // }else{

            // store.dispatch(updateHorrorSoftwareData(creds));
            // }

            // store.dispatch(PostHorrorSoftwareData('/getHorrorSoftware'));
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
        //改变类型事件
    typeChange = (e) => {
            this.setState({
                type: e.target.value
            });
        }
        //改变涉恐级别事件
    levelChange = (e) => {
            this.setState({
                level: e.target.value
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
        let level = this.state.level;
        let type = this.state.type;
        //线路ID
        let lineId = this.props.lineId;
        let buttonText;
        (lineId === "") ? buttonText = "创建": buttonText = "保存";
        return (
            <div style={{width:this.props.width,height:this.props.height,border:"1px solid #0C5F93",position:"fixed",left:"35%",top:'35%',zIndex:"9999",display:mdisplay}}>
                {/*头部*/}
                <div style={{background:"rgba(2, 24, 85, 0.9)",padding:"5px"}}>
                    <span style={{float:"left",fontSize:"16px",color:"#fff"}}>创建</span><img src="/images/guanbi.png" style={{float:"right",marginTop:"5px",cursor:"pointer"}}  onClick={this.handleClose}/>
                    <div style={{clear:"both"}}></div>
                </div>
                {/*内容部分*/}
                <div style={{padding:"20px",background:"rgba(37, 51, 100, 0.9)"}}>
                    <div style={{marginBottom:"20px"}}>
                        <label style={mStyle} htmlFor="">软件名称</label><Input style={{width:"272px"}} onChange={this.nameChange}  value={name} />
                    </div>
                    
                    <div style={{marginBottom:"20px",position:"relative"}}>
                        <span style={mStyle}>图片</span>
                        <img src={this.state.imgPath===''?'/images/addp.png':this.state.imgPath} alt=""  ref="img"   width={'60px'} height={'60px'}/>
                        <FileInput btnValue="上传"  type = "image" maxFileSize={3} multiple={false} onChange={this.handleChangeImg} width="60px" height="60px" left="50px"/>
                        <div style={{clear:"both"}}></div>
                    </div>
                    <div style={{marginBottom:"20px"}}>
                        <label style={{fontSize:"14px",color:"#fff",marginRight:"20px",verticalAlign: "top",width:"56px",float:"left",textAlign:"right"}} htmlFor="">备注</label>
                        <TextArea width="272px" height="50px" callbackParent={this.remarksChange} value={remarks}/>
                    </div>
                    <div>
                        <ShallowBlueBtn width="40px" text={buttonText} margin="0 80px 0 120px"  onClick={this.handleCreate}/>
                        <DeepRedBtn width="40px" text="作废"  onClick={this.handleClose}/>
                    </div>
                </div>
            </div>
        );
    }
}

HorrorSoftware = Form.create()(HorrorSoftware);
export default connect(mainReducer)(HorrorSoftware);