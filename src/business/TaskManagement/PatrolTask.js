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
    DatePicker,
    TreeSelect,
    Select,
    Divider,
    Popconfirm,
    Radio
} from 'antd';

import moment from 'moment';
moment.locale('zh-cn');

// 样式
const sliderdyHeader = {
    borderBottom: "1px solid #0C5F93",
    padding: "18px 0",
    // overflow: "hidden"
}
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const { TextArea } = Input;

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
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const formItemLayouts = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 },
    },
};

export  class PatrolTask extends Component{
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
            data: [],
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
            unit_scope:'116001',
            treeValue:[],
            RadioValue:'',
            TaskNewShow:{display: 'none'},
            updateVisible: false,
            childrenModal: false,
            look:[]
        };
        this.pageChange = this.pageChange.bind(this);
    }
    editShowModal = (record) => {
        this.setState({
            updateVisible: true,
            personInfo: record,
            modalType: 'edit',
            RadioValue:'',
        });
    }
    addShowModal = (record) => {
        this.setState({
            visible: true,
            modalType: 'add',
        });
    }
    showChildren = (record) => {
        this.setState({
            childrenModal: true
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            updateVisible:false,
            childrenModal:false,
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
        this.handleCancel();
        // e.preventDefault();
        // this.props.form.validateFields((err, values) => {
        //     let userItem = JSON.parse(sessionStorage.getItem('user'));
        //     if(!err){
        //         if(this.state.modalType === "edit"){
        //             values.id = this.state.personInfo.key;//让表单数据带上id  后台好进行操作
        //             console.log('this.state.personInfo',this.state.personInfo);
        //             console.log('values.id',values.id);
        //             let creds = {
        //                 pd:{
        //                     name:values.label,
        //                     iconUrl:values.iconUrl?values.iconUrl:this.state.avatarSrc,
        //                     id:values.id.toString(),
        //                     optuser:userItem.user.idcard,
        //                     createuser:userItem.user.idcard,
        //                     remark:values.remark?values.remark:'',
        //                     status:values.status?values.status:'1',
        //                     code:values.value?values.value:'',
        //                     level:'2',
        //                     pid:'199'
        //                 },//传参 把后台需要的参数传过去
        //             }
        //             let params = {
        //                 currentPage: 1,
        //                 pd: {
        //                     beginTime: this.state.begindate,
        //                     endTime: this.state.enddate,
        //                     name: this.state.name,
        //                     pid:"199"
        //                 },
        //                 showCount: 10
        //             }
        //             // store.dispatch(updateHorrorSoftwareData(creds,params));
        //         }else if(this.state.modalType === "add"){
        //             let creds = {//表单域不一定写了所有的字段 所以要把空值通过赋值显示
        //                 pd:{
        //                     name:values.label?values.label:'',
        //                     iconUrl:values.iconUrl?values.iconUrl:'',
        //                     menuname:"304",
        //                     optuser:userItem.user.idcard,
        //                     createuser:userItem.user.idcard,
        //                     remark:values.remark?values.remark:'',
        //                     status:values.status?values.status:'1',
        //                     code:values.value?values.value:'',
        //                     level:'2',
        //                     pid:'199'
        //                 },
        //             }
        //             let params = {
        //                 currentPage: 1,
        //                 pd: {
        //                     beginTime: this.state.begindate,
        //                     endTime: this.state.enddate,
        //                     name: this.state.name,
        //                     pid:"199"
        //                 },
        //                 showCount: 10
        //             }
        //             // store.dispatch(addHorrorSoftwareData(creds,params))
        //
        //         }
        //         this.handleCancel();
        //         this.setState({
        //             nowPage: 1
        //         });
        //     }
        //
        //
        // })
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
    onChange = (e) => {
        this.setState({
            unit_scope: e,
        });
    }
    onSelectTreeChange = (e) => {
        this.setState({
            treeValue: e,
        });
    }
    onRadioChange= (e) => {
        this.setState({
            RadioValue: e.target.value,
        });
        if(e.target.value === 0){
            this.setState({
                TaskNewShow: {display:'block'}
            });
        }else{
            this.setState({
                TaskNewShow: {display:'none'}
            });
        }
    }
    RowsChagne=(e)=>{
        console.log(e)
        this.setState({
            look: e,
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let nowPage = this.state.nowPage;
        let isFetching = store.getState().TaskManagement.isFetching;
        const data = [
            {key: 1, serial: 1, content:'', label: '我的任务001', startTime: '2018-01-10 01:32:12',endTime: '2018-03-12 12:10:29',status: '循环任务',treeValue: [{value: "ec02ed04ad6147b7a421ab912a7cf6b6"}],cycle:'按天',person:'系统创建',state: '0'},
            {key: 2, serial: 2, content:'hylink任务的描述', label: 'hylink任务', startTime: '2017-12-09 13:30:00',endTime: '2018-04-10 22:00:00',status: '循环任务',treeValue: [{value: "ec02ed04ad6147b7a421ab912a7cf6b6"}, {value: "f24c58a0aadb42ca826c02c26f74a461"}],cycle:'按周',person:'王二',state: '1'},
            {key: 3, serial: 3, content:'', label: '海邻科任务', startTime: '2018-02-18 14:50:32',endTime: '2018-02-07 18:12:59',status: '循环任务',treeValue: [{value: "ec02ed04ad6147b7a421ab912a7cf6b6"}],cycle:'按天',person:'系统创建',state: '0'},
        ];
        const colu = [{
            title: '序号',
            dataIndex: 'serial',
            width:80,
        }, {
            title: '任务名称',
            dataIndex: 'label',
        }, {
            title: '任务开始时间',
            dataIndex: 'startTime',
            width:180,
        }, {
            title: '任务状态',
            key: 'state',
            render: (text, record) => (
                <span>{record.state === '0' ? '完成':'超期'}</span>
            ),
        }, {
            title: '查看对象',
            key: 'action',
            render: (text, record) => (
                <span style={{cursor:'pointer'}}>查看</span>
            ),
        }]
        const columns = [{
            title: '序号',
            dataIndex: 'serial',
            width:80,
        }, {
            title: '任务名称',
            dataIndex: 'label',
        }, {
            title: '任务类别',
            dataIndex: 'status',
        },{
            title: '任务周期',
            dataIndex: 'cycle',
        }, {
            title: '任务开始时间',
            dataIndex: 'startTime',
            width:180,
        },{
            title: '任务结束时间',
            dataIndex: 'endTime',
            width:180,
        },{
            title: '任务创造者',
            dataIndex: 'person',
            width:180,
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                    <span>
                        <Popconfirm title={record.state === '0' ? '确定启动该任务？':'确定关闭该任务？'} okText="确定" cancelText="取消">
                             <span style={{cursor:'pointer'}}>{record.state === '0' ? '启动':'关闭'}</span>
                        </Popconfirm>
                         <Divider type="vertical" />
                        <span onClick={(e)=>this.editShowModal(record)} style={{cursor:'pointer'}}>编辑</span>
                        <Divider type="vertical" />
                        <span style={{cursor:'pointer'}} onClick={this.showChildren}>子任务</span>
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
        let {name,unit,endDate,beginDate,status} = this.state;
        let beginDateValue='';
        if(beginDate === ''){
        }else{
            beginDateValue = moment(beginDate, 'YYYY-MM-DD HH:mm:ss');
        }
        let endDateValue='';
        if(endDate === ''){
        }else{
            endDateValue = moment(endDate, dateFormat);
        }
        if(beginDateValue!=""&&endDateValue!=""&&beginDateValue >endDateValue)
        {
            message.error('提示：开始时间不能大于结束时间！');
            return;
        }
        const treeList=[{"children":[{"label":"张三","value":"4103000000001","key":"4103000000001"},{"label":"李四","value":"4103000000002","key":"4103000000002"},{"label":"王二","value":"4103000000003","key":"4103000000003"}],"label":"全部","value":"410000000000","key":"410000000000"}]
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
                            <Table locale={{emptyText:'暂无数据'}} columns={columns} dataSource={data} bordered  pagination={false}/>
                        </div>}
                    <div className="clear"></div>
                </div>
                {/*分页*/}
                <Pag pageSize={10} nowPage={nowPage} totalRecord={10} pageChange={this.pageChange} />
                <Modal width={800}
                       title="新增任务"
                       visible={this.state.visible}
                       onCancel={this.handleCancel}
                       footer={null}
                       key={this.state.modalKey}
                >
                        <Form onSubmit={this.saveModel}>
                            <Row className="formItemLeft">
                                <Col span={24}>
                                    <FormItem
                                        {...formItemLayouts}
                                        label="任务名称"
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
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="任务开始时间"
                                    >
                                        {getFieldDecorator('startTime', {
                                            rules: [{
                                                required: true,
                                                message: '请选择任务开始时间!'
                                            }],
                                            initialValue:this.state.modalType === 'edit' ? moment(this.state.personInfo.startTime, 'YYYY-MM-DD HH:mm:ss') : '',
                                        })(
                                            <DatePicker showTime placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{width:'220px'}}/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="任务结束时间"
                                    >
                                        {getFieldDecorator('endTime', {
                                            rules: [{
                                                required: true,
                                                message: '请选择任务结束时间!'
                                            }],
                                            initialValue:this.state.modalType === 'edit' ? moment(this.state.personInfo.endTime, 'YYYY-MM-DD HH:mm:ss') : '',
                                        })(
                                            <DatePicker showTime placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{width:'220px'}}/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="任务类别"
                                    >
                                        {getFieldDecorator('status', {
                                            rules: [{
                                                required: true,
                                                message: '请选择任务类别!'
                                            }],
                                            initialValue:this.state.modalType === 'edit' ? this.state.personInfo.status : '',
                                            validateFirst:true
                                        })(
                                            <Select onChange={this.onChange} >
                                                <Option value="循环任务">循环任务</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="任务周期"
                                    >
                                        {getFieldDecorator('cycle', {
                                            rules: [{
                                                required: true,
                                                message: '请选择任务周期!'
                                            }],
                                            initialValue:this.state.modalType === 'edit' ? this.state.personInfo.cycle : '',
                                            validateFirst:true
                                        })(
                                            <Select onChange={this.onChange} >
                                                <Option value="按周">按周</Option>
                                                <Option value="按天">按天</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={24} style={{padding:'0 55px 16px'}}>
                                    <RadioGroup onChange={this.onRadioChange} value={this.state.RadioValue}>
                                        <Radio value={0}>有盘查对象</Radio>
                                        <Radio value={1}>全部盘查对象</Radio>
                                    </RadioGroup>
                                </Col>
                                <Col span={24} style={this.state.TaskNewShow}>
                                    <FormItem
                                        {...formItemLayouts}
                                        label="盘查对象"
                                    >
                                        {getFieldDecorator('TaskName', {
                                            initialValue:this.state.modalType === 'edit' ? this.state.personInfo.TaskName : '',
                                            validateFirst:true
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayouts}
                                        label="责任单位"
                                    >
                                        {getFieldDecorator('TaskCom', {
                                            initialValue:this.state.modalType === 'edit' ? this.state.personInfo.TaskCom : '',
                                            validateFirst:true
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayouts}
                                        label="执行地点"
                                    >
                                        {getFieldDecorator('TaskAddress', {
                                            initialValue:this.state.modalType === 'edit' ? this.state.personInfo.TaskAddress : '',
                                            validateFirst:true
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayouts}
                                        label="备注"
                                    >
                                        {getFieldDecorator('TaskContent', {
                                            initialValue:this.state.modalType === 'edit' ? this.state.personInfo.TaskContent : '',
                                            validateFirst:true
                                        })(
                                            <TextArea rows={2}/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={15} style={{textAlign: 'right'}}>
                                    <Button htmlType="submit"  className="btn_ok">保存</Button>
                                    <Button style={{marginLeft: 30}} onClick={this.handleCancel} className="btn_delete">取消</Button>
                                </Col>
                            </Row>
                        </Form>
                </Modal>
                <Modal width={800}
                       title="任务编辑"
                       visible={this.state.updateVisible}
                       onCancel={this.handleCancel}
                       footer={null}
                >
                    <Form onSubmit={this.saveModel}>
                        <Row className="formItemLeft">
                            <Col span={24}>
                                <FormItem
                                    {...formItemLayouts}
                                    label="任务名称"
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
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="任务开始时间"
                                >
                                    {getFieldDecorator('startTime', {
                                        rules: [{
                                            required: true,
                                            message: '请选择任务开始时间!'
                                        }],
                                        initialValue:this.state.modalType === 'edit' ? moment(this.state.personInfo.startTime, 'YYYY-MM-DD HH:mm:ss') : '',
                                    })(
                                        <DatePicker showTime placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{width:'220px'}}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="任务结束时间"
                                >
                                    {getFieldDecorator('endTime', {
                                        rules: [{
                                            required: true,
                                            message: '请选择任务结束时间!'
                                        }],
                                        initialValue:this.state.modalType === 'edit' ? moment(this.state.personInfo.endTime, 'YYYY-MM-DD HH:mm:ss') : '',
                                    })(
                                        <DatePicker showTime placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{width:'220px'}}/>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="任务类别"
                                >
                                    {getFieldDecorator('status', {
                                        rules: [{
                                            required: true,
                                            message: '请选择任务类别!'
                                        }],
                                        initialValue:this.state.modalType === 'edit' ? this.state.personInfo.status : '',
                                        validateFirst:true
                                    })(
                                        <Select onChange={this.onChange} >
                                            <Option value="循环任务">循环任务</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="任务周期"
                                >
                                    {getFieldDecorator('cycle', {
                                        rules: [{
                                            required: true,
                                            message: '请选择任务周期!'
                                        }],
                                        initialValue:this.state.modalType === 'edit' ? this.state.personInfo.cycle : '',
                                        validateFirst:true
                                    })(
                                        <Select onChange={this.onChange} >
                                            <Option value="按周">按周</Option>
                                            <Option value="按天">按天</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="任务创建者"
                                >
                                    {getFieldDecorator('person', {
                                        rules: [{
                                            required: true,
                                            message: '请选择任务创建者!'
                                        }],
                                        initialValue:this.state.modalType === 'edit' ? this.state.personInfo.person : '',
                                        validateFirst:true
                                    })(
                                        <Select onChange={this.onChange} >
                                            <Option value="循环任务">系统默认</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="任务状态"
                                >
                                    {getFieldDecorator('state', {
                                        rules: [{
                                            required: true,
                                            message: '请选择任务状态!'
                                        }],
                                        initialValue:this.state.modalType === 'edit' ? this.state.personInfo.state : '',
                                        validateFirst:true
                                    })(
                                        <Select onChange={this.onChange} >
                                            <Option value="0">启动</Option>
                                            <Option value="1">关闭</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem
                                    {...formItemLayouts}
                                    label="盘查对象"
                                >
                                    {getFieldDecorator('TaskPerson', {
                                        initialValue:this.state.modalType === 'edit' ? this.state.personInfo.TaskPerson : '',
                                        validateFirst:true
                                    })(
                                        <TreeSelect
                                            style={{ marginRight: '10px' }}
                                            value={unit}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            treeData={treeList}
                                            placeholder="请选择派发单位"
                                            onChange={this.unitChange}
                                            showSearch={false}
                                            treeCheckable={true}
                                            dropdownMatchSelectWidth={false}
                                            showCheckedStrategy="SHOW_PARENT"
                                            notFoundContent='暂无'
                                        />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={15} style={{textAlign: 'right'}}>
                                <Button htmlType="submit"  className="btn_ok">保存</Button>
                                <Button style={{marginLeft: 30}} onClick={this.handleCancel} className="btn_delete">取消</Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
                <Modal 
                       title="子任务列表"
                       visible={this.state.childrenModal}
                       footer={null}
                       onCancel={this.handleCancel}
                       width={750}
                >
                    <div style={{margin:'0 0 16px 0'}}>
                        <Input style={{width:'520px',marginRight:"10px"}} type="text"  id='name' placeholder='请输入任务名称'/>
                        <ShallowBlueBtn width="80px" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                        <ShallowBlueBtn width="80px" text="重置" onClick={this.init} />
                    </div>
                    <Table locale={{emptyText:'暂无数据'}} columns={colu} dataSource={data} bordered onExpandedRowsChange={this.RowsChagne} expandRowByClick={true} expandIconAsCell={false}  expandedRowRender={record => <div style={{ margin: 0 }}><span style={{padding:'2px 5px',background:'#2b6cc5',borderRadius:'2px',margin:'5px',float:'left'}}>张三</span></div>}/>
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
            unit: '',
            status:'',
            treeList:[{"children":[{"children":[{"label":"(卡点)测试","value":"ec02ed04ad6147b7a421ab912a7cf6b6","key":"ec02ed04ad6147b7a421ab912a7cf6b6"}],"label":"洛阳市公安局","value":"410300000000","key":"410300000000"},{"label":"(卡点)01018","value":"9ec30a5f4e554bc78f13fea61a61452c","key":"9ec30a5f4e554bc78f13fea61a61452c"},{"label":"(卡点)1221卡点","value":"713141c655624b86acae70b4a674d8a7","key":"713141c655624b86acae70b4a674d8a7"},{"label":"(卡点)001","value":"8cd3a75ab7fa49979f67eef4d59a9cad","key":"8cd3a75ab7fa49979f67eef4d59a9cad"},{"label":"(卡点)M78卡点","value":"f24c58a0aadb42ca826c02c26f74a461","key":"f24c58a0aadb42ca826c02c26f74a461"},{"label":"(卡点)002","value":"aad06faa7acf49df9504a6e97ae7946f","key":"aad06faa7acf49df9504a6e97ae7946f"}],"label":"河南省公安厅","value":"410000000000","key":"410000000000"}],
        };
    },
    handleNameChange: function(e) {
        this.setState({
            name: e.target.value
        });
    },
    statusChange:function(value){
        this.setState({
            status: value
        });
    },
    handleClick: function() { //点击查询
        let {name, begindate, enddate, status} = this.state;
        console.log('查询', name, begindate, enddate, status);
    },
    init:function () {
        this.setState({
            name: '',
            begindate: '',
            enddate: '',
            status:'',
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
            updateVisible: false,
            childrenModal:false
        });
    },
    unitChange:function(value,label) {
        this.setState({
            unit: value,
            unit_text:label[0],
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
    render() {
        let {name, unit, enddate, begindate, status} = this.state;
        let beginDateValue = '';
        if (begindate === '') {} else {
            beginDateValue = moment(begindate, dateFormat);
        }
        let endDateValue = '';
        if (enddate === '') {} else {
            endDateValue = moment(enddate, dateFormat);
        }
        unit = (unit === '' ? '全部' :unit );
        return (
            <div className="marLeft40 fl z_searchDiv">
                <Button style={{width:"100px",marginRight:'10px'}}
                        onClick={this.props.addShowModal}
                        className="btn_ok"
                >
                   新增任务
                </Button>
                <label htmlFor="" className="font14">任务名称：</label>
                <Input style={{width:'121px',marginRight:"10px"}} type="text"  id='name' placeholder='请输入任务名称'  value={name}  onChange={this.handleNameChange}/>
                <label htmlFor="" className="font14">任务类别：</label>
                <Select value={status} style={{ width: 100 ,margin:"0 10px 0 0" }} onChange={this.statusChange} notFoundContent='暂无'>
                    <Option value="">全部</Option>
                    <Option value="循环任务">循环任务</Option>
                </Select>
                <label htmlFor="" className="font14">任务时间：</label>
                <DatePicker  placeholder="请选择日期" format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={beginDateValue} defaultValue="" onChange={this.handleBeginDeteClick}/>
                <span className="font14" style={{margin:"0 10px 0 0"}}>至</span>
                <DatePicker  placeholder="请选择日期" format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={endDateValue} defaultValue="" onChange={this.handleEndDeteClick}/>
                <ShallowBlueBtn width="80px" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                <ShallowBlueBtn width="80px" text="重置" margin="0 10px 0 0" onClick={this.init} />
            </div>
        );
    }
})
PatrolTask = Form.create()(PatrolTask);
export default connect(mainReducer)(PatrolTask);