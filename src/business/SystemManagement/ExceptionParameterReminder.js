/**
 * 系统管理异常比对规则-右侧
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mainReducer} from "../../reducers/reducers";
import {fetchInterrogationInformationData
} from "../../actions/SystemManagement";
import {StylePage,ShallowBlueBtn,DeepRedBtn,DeepBlueBtn,PhotoItem,Pag} from "../generalPurposeModule";
import {
    DatePicker,
    Spin,
    Table,
    Input,
    Modal,
    Button,
    message,
    Pagination,
    Form,
    InputNumber,
    Row,
    Col
} from 'antd';
import reqwest from 'reqwest';
import {store} from '../../index.js';
import  * as constants from "../../utils/Constants";

import {postExceptionParameterReminderData,saveExceptionParameterReminderData} from "../../actions/SystemManagement";
const FormItem = Form.Item;


export class ExceptionParameterReminder extends Component{
    //初始化
    constructor(props) {
        super(props);
       
        this.state={
            nowPage: 1,
            remark:'',
            modalKey: 0,
            modalType: '',
        }
        
    }
    componentWillMount(){

    }
    componentDidMount() {
       let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    pid:"200"
                },
            }
                 store.dispatch(postExceptionParameterReminderData(creds));
   }
   editShowModal = (record) => {
    this.setState({
        visible: true,
        personInfo: record,
        modalType: 'edit',
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

    //确认生效按钮点击事件
    handleConfirmClick = (e) => {
         e.preventDefault();
        this.props.form.validateFields((err, values) => {
           console.log('values',values);
            let userItem = JSON.parse(sessionStorage.getItem('user'));
         if (!err) {
           
            values.id = this.state.personInfo.key;
            let creds={
                pd:{
                    name:values.label?values.label:this.state.personInfo.label,
                    iconUrl:values.iconUrl?values.iconUrl:this.state.personInfo.iconUrl,
                    id:values.id.toString()?values.id.toString():'',
                    optuser:userItem.user.idcard,
                    createuser:userItem.user.idcard,
                    remark:values.remark.toString(),
                    status:values.status?values.status:'1',
                    code:values.value?values.value:'',
                    level:'2',
                    pid:'200'
                }
               
            };
            store.dispatch(saveExceptionParameterReminderData(creds));
        }
        this.handleCancel();
        });
        // let phonecoutmin = this.state.phonecoutmin;
        // let phoneCountMax = this.state.phoneCountMax;
        // let callcountmin = this.state.callcountmin;
        // let callcountmax = this.state.callcountmax;
        // let messagecountmin = this.state.messagecountmin;
        // let messagecountmax = this.state.messagecountmax;
        // let creds = {
        //         messagecountmax: messagecountmax, messagecountmin: messagecountmin,
        //         callcountmax: callcountmax, callcountmin: callcountmin,
        //         phonecoutmin: phonecoutmin, phoneCountMax: phoneCountMax
        // }

        //store.dispatch(saveExceptionParameterReminderData(creds));

    }
   

    render(){
        
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 2 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 2 },
                sm: { span: 12 },
            },
        };
         let exceptionParameterReminder = store.getState().SystemManagement.data.exceptionParameterReminder.result.list;
         console.log('exceptionParameterReminder',exceptionParameterReminder);
         let nowPage = this.state.nowPage;
         const columns = [{
            title: '序号',
            dataIndex: 'serial',
        }, {
            title: '编码',
            dataIndex: 'value',
        },{
            title: '名称',
            dataIndex: 'label',
        }, {
            title: '最大值',
            dataIndex: 'remark',
        }, {
            title: '更新时间',
            dataIndex: 'updatetime',
            width:180,
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                        <span onClick={(e)=>this.editShowModal(record)} style={{cursor:'pointer'}}>修改</span>
                </span>
            ),
        }];
        const data = [];
        let recordNumber = parseInt((nowPage - 1) * 10);
        for (var i = 0; i < exceptionParameterReminder.length; i++) {
            var exceptionParameterReminderData = exceptionParameterReminder[i];
            let serial = recordNumber + i + 1;
            data.push({
               // key: i,
               serial: serial,
                label: exceptionParameterReminderData.label,
                iconUrl: exceptionParameterReminderData.iconUrl,
                key: exceptionParameterReminderData.key,
                status:exceptionParameterReminderData.status,
                optuser: exceptionParameterReminderData.optuser,
                updatetime: exceptionParameterReminderData.updatetime,
                value: exceptionParameterReminderData.value,
                remark: exceptionParameterReminderData.remark,
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
        //console.log('this.state.personInfo.remark',this.state.personInfo.remark);
        console.log('personIn',this.state.personInfo);
        return (
             <div className="sliderWrap" style={{}}>
                {/*表格*/}
                <div className="z_slderRightBody sys_overflow">
                    <p style={{margin:"20px",fontSize:"16px",color:"#fff"}}>异常比对规则</p>
                    <div style={{padding:"0 15px"}}>
                        <Table 
                            
                            columns={columns} 
                            dataSource={data} 
                            bordered  
                            pagination={false} 
                        />
                    </div>
                    <div className="clear"></div>
                    
                </div>
                <Modal
                    title="异常比对规则"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    key={this.state.modalKey}
                    >
                    <Form onSubmit={this.handleConfirmClick}>
                        <div className="formItemLeft">
                            <FormItem
                            {...formItemLayout}
                            label='编码'
                           // hasFeedback
                            >
                            {getFieldDecorator('value', {
                                rules: [{
                                required: true, message: '请输入编码!',
                                },{
                                    required: true, message: '请输入最大值!',
                                },{
                                    max:14,message:'最多输入十四个字符!',
                                }],
                                initialValue:this.state.modalType === 'edit' ?this.state.personInfo.value: '',
                                validateFirst:true
                            })(
                                <Input style={{width:282}}/>
                            )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                            {...formItemLayout}
                            label={this.state.personInfo?this.state.personInfo.label+"最大值":'最大值'}
                            //hasFeedback
                            >
                            {getFieldDecorator('remark', {
                                rules: [{
                                    required: true, message: '请输入最大值!',
                                },{
                                type: 'number', message: '只能添加数字!',
                                }],
                                initialValue:this.state.modalType === 'edit' ?parseInt(this.state.personInfo.remark)   : '',
                                validateFirst:true
                            })(
                                <InputNumber style={{width:282}}/>
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
 ExceptionParameterReminder = Form.create()(ExceptionParameterReminder);
export default connect(mainReducer)(ExceptionParameterReminder);