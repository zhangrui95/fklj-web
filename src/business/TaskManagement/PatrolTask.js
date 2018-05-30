/**
 * 任务管理=>任务设置右侧组件
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
    serverUrl,
    getMyDate
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
    Radio,
    Tag,
    Pagination
} from 'antd';
import {
    postTaskListHushiData, postChildrenTaskListHushiData, postTaskListHushiByIdData, postWeiguankongData, editTaskHushiData, postPersonListForTaskData
} from "../../actions/TaskManagement";

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

export class PatrolTask extends Component {
    constructor(props) { //初始化nowPage为1
        super(props);
        this.state = {
            nowPage: 1,
            childrennowpage: 1,
            ModalDialogueShow: 'none',
            ModalDialogueType: 'add',
            lineId: '',
            highRiskLine: null,
            selectedRowsId: [],
            name: '',
            category: '',
            enddate: '',
            begindate: '',
            taskswitch: '',
            cycle: '',
            personname: '',
            childrenname: '',
            record: null,
            pagination: pagination,
            loading: false,
            personInfo: '',
            modalKey: 0,
            modalType: '',
            remark: "",
            zoomvisible: false,
            imgtext: '',
            text: null,
            unit_scope: '116001',
            treeValue: [],
            RadioValue: '',
            TaskNewShow: { display: 'none' },
            updateVisible: false,
            childrenModal: false,
            look: [],
            // data:[
            //     {key: 1, serial: 1, content:'', label: '我的任务001', startTime: '2018-01-10 01:32:12',endTime: '2018-03-12 12:10:29',status: '循环任务',treeValue: [{value: "ec02ed04ad6147b7a421ab912a7cf6b6"}],cycle:'按天',person:'系统创建',state: '0'},
            //     {key: 2, serial: 2, content:'hylink任务的描述', label: 'hylink任务', startTime: '2017-12-09 13:30:00',endTime: '2018-04-10 22:00:00',status: '循环任务',treeValue: [{value: "ec02ed04ad6147b7a421ab912a7cf6b6"}, {value: "f24c58a0aadb42ca826c02c26f74a461"}],cycle:'按周',person:'王二',state: '1'},
            //     {key: 3, serial: 3, content:'', label: '海邻科任务', startTime: '2018-02-18 14:50:32',endTime: '2018-02-07 18:12:59',status: '循环任务',treeValue: [{value: "ec02ed04ad6147b7a421ab912a7cf6b6"}],cycle:'按天',person:'系统创建',state: '0'},
            // ],
            lookIndex: -1,
            expandKeys: [],
            childrenid: '',
            disabled: false,

        };
        this.pageChange = this.pageChange.bind(this);
    }
    componentDidMount() {
        let params = {
            currentPage: this.state.nowPage,
            pd: {
                category: '',
                cycle: '',
                name: "",
                personname: '',
                starttime: '',
                endtime: '',
            },
            showCount: 10
        }
        store.dispatch(postTaskListHushiData(params));
    }
    componentWillReceiveProps(nextprops) {

    }
    // 根据id查询任务信息
    byidtaskquery = (id) => {
        let creds = {
            id: id,
        }
        store.dispatch(postTaskListHushiByIdData(creds));
    }
    // 未管控人员作为盘查对象在添加的时候使用
    weiguankongQuery = () => {
        let creds = {
            pd: {
                control_type: "0",
            }
        }
        store.dispatch(postWeiguankongData(creds));
    }
    editShowModal = (record) => {
        this.setState({
            updateVisible: true,
            personInfo: record,
            modalType: 'edit',
            RadioValue: '',
            disabl: false
        });
        // 盘查对象项

    }
    // 查看
    seeShowModal = (record) => {
        let creds = {
            id: record.id,
        }
        store.dispatch(postPersonListForTaskData(creds, this.goback));
        this.byidtaskquery(record.id);
        // this.weiguankongQuery();
    }
    // 等盘查对象数据调取成功后，再调取弹出模态框等方法
    goback = () => {
        this.setState({
            updateVisible: true,
            // personInfo: record,
            modalType: 'edit',
            RadioValue: '',
            disabled: true
        });
    }
    addShowModal = (record) => {
        this.setState({
            visible: true,
            modalType: 'add',
            disabl: false
        });
    }
    // 点击展示子任务列表
    showChildren = (id) => {
        console.log('id**', id);
        this.setState({
            childrenModal: true,
            childrenid: id
        });
        let creds = {
            currentPage: 1,
            pd: {
                id: id
            },
            showCount: 10

        }
        store.dispatch(postChildrenTaskListHushiData(creds));
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            updateVisible: false,
            childrenModal: false,
            modalKey: this.state.modalKey + 1,
            childrenid: ''
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
                beginTime: '',
                endTime: '',
                name: '',
                pid: "199"
            },
            showCount: 10
        }
        // store.dispatch(DeleteHorrorSoftwareData(crads,params));

        this.setState({
            selectedRowsId: [],
            // nowPage: 1
        });

    }
    saveModel = (e) => {
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
    serchChange = (name, category, enddate, begindate, cycle, personname, page) => {
        this.setState({
            name: name,
            category: category,
            enddate: enddate,
            begindate: begindate,
            cycle: cycle,
            personname: personname,
            nowPage: page
        });
    }
    pageChange(nowPage) {
        this.state = Object.assign({}, this.state, { nowPage: nowPage });
        let { name, category, enddate, begindate, cycle, personname } = this.state;
        let creds = {
            currentPage: nowPage,
            entityOrField: true,
            pd: {
                name: name,
                starttime: begindate,
                endtime: enddate,
                category: category,
                cycle: cycle,
                personname: personname,
            },
            showCount: 10
        }
        store.dispatch(postTaskListHushiData(creds));
        this.setState({
            selectedRowsId: [],
            selectedRowKeys: [],
        });
    }
    initEntity = () => {
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
    onRadioChange = (e) => {
        this.setState({
            RadioValue: e.target.value,
        });
        if (e.target.value === 0) {
            this.setState({
                TaskNewShow: { display: 'block' }
            });
        } else {
            this.setState({
                TaskNewShow: { display: 'none' }
            });
        }
    }
    RowsChange = (e) => {
        console.log('look', e);
        this.setState({
            look: e,
        });
    }
    getLook = (index) => {
        let indexExpand = []
        indexExpand.push(index + 1)
        if (index === this.state.lookIndex) {
            this.setState({
                expandKeys: []
            })
            this.setState({
                lookIndex: -1
            })
        } else {
            this.setState({
                expandKeys: indexExpand
            })
            this.setState({
                lookIndex: index
            })
        }
    }
    expandedRowRender = (record) => {
        console.log('record', record);
        const list = [];
        if (record.control_person) {
            let dataList = JSON.parse(record.control_person.value);
            console.log('dataList', dataList);
            for (let i = 0; i < dataList.length; i++) {
                let item = dataList[i];
                list.push(
                    <Tag color="#2db7f5" style={{ marginBottom: '8px' }}>{item.name + " " + item.idcard}</Tag>
                );
            }
        }
        return (
            <div style={{ padding: '8px', paddingBottom: '0px' }}>
                {list}
            </div>
        )
    }
    // 任务的启动或关闭
    isOpen = (record) => {
        let user = JSON.parse(sessionStorage.getItem('user'));
        if (record.taskswitch === 0) {//启动任务
            let creds = {
                id: record.id,
                taskswitch: "1",
                updateuser: user.user.name
            }
            let { name, category, enddate, begindate, cycle, personname } = this.state;
            let params = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    name: name,
                    starttime: begindate,
                    endtime: enddate,
                    category: category,
                    cycle: cycle,
                    personname: personname,
                },
                showCount: 10
            }
            store.dispatch(editTaskHushiData(creds, params))
        } else {
            let creds = {
                id: record.id,
                taskswitch: "0",
                updateuser: user.user.name
            }
            let {  name, category, enddate, begindate, cycle, personname } = this.state;
            let params = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    name: name,
                    starttime: begindate,
                    endtime: enddate,
                    category: category,
                    cycle: cycle,
                    personname: personname,
                },
                showCount: 10
            }
            store.dispatch(editTaskHushiData(creds, params))
        }
        this.setState({
            nowPage:1
        });
    }
    // 子任务名称查询变换函数
    childrennameChange = (e) => {
        this.setState({
            childrenname: e.target.value
        });
    }
    // 子任务列表点击查询按钮
    handleChidernQuery = () => {
        let creds = {
            currentPage: 1,
            pd: {
                id: this.state.childrenid,
                name: this.state.childrenname
            },
            showCount: 10

        }
        store.dispatch(postChildrenTaskListHushiData(creds));
    }
    // 子任务重置
    handleChidernClear = () => {
        this.setState({
            childrenname: ''
        });
        let creds = {
            currentPage: 1,
            pd: {
                id: this.state.childrenid,
                name: ''
            },
            showCount: 10

        }
        store.dispatch(postChildrenTaskListHushiData(creds));
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let nowPage = this.state.nowPage;
        let isFetching = store.getState().TaskManagement.isFetching;
        let childrenIsFetching = store.getState().TaskManagement.data.childrentaskListHushi.childrenIsFetching;
        console.log('childrenIsFetching', childrenIsFetching);
        //let data = this.state.date;
        let data = store.getState().TaskManagement.data.taskListHushi.result.list;
        let page = store.getState().TaskManagement.data.taskListHushi.result.page;
        let childrendata = store.getState().TaskManagement.data.childrentaskListHushi.result.list;
        let childrenpage = store.getState().TaskManagement.data.childrentaskListHushi.result.page;
        let look = this.state.look
        let recordNumber = parseInt((nowPage - 1) * 10);
        let dataList = [];
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let serial = recordNumber + i + 1;
            dataList.push({
                serial: serial,
                name: item.name,
                category: item.category,
                cycle: item.cycle,
                starttime: getMyDate(item.starttime / 1000),
                endtime: getMyDate(item.endtime / 1000),
                createuser: item.createuser,
                taskswitch: item.taskswitch,
                count: item.count,
                id: item.id,
            });
        }
        let childrenDataList = [];
        let recordNumberChildren = parseInt((this.state.childrennowpage - 1) * 10);
        if (childrendata) {
            for (let i = 0; i < childrendata.length; i++) {
                let item = childrendata[i];
                let childrenSerial = recordNumberChildren + i + 1;
                childrenDataList.push({
                    childrenSerial: childrenSerial,
                    name: item.name,
                    createtime: getMyDate(item.createtime / 1000),
                    type: item.type,
                    id: item.id,
                    control_person: item.control_person,
                });
            }
        }

        // 根据id查询任务信息
        let ogjByid = store.getState().TaskManagement.data.taskListHushiById.result;
        console.log('ogjByid', ogjByid);
        // 根据未管控人员作为盘查对象 在添加的时候使用
        let weiguankongList = store.getState().TaskManagement.data.weiguankongList.result.list;
        let personListForTask = store.getState().TaskManagement.data.personListForTask.result.list;
        console.log('personListForTask', personListForTask);
        const checkObjOption = [];
        if (personListForTask) {
            for (let i = 0; i < personListForTask.length; i++) {
                let item = personListForTask[i];
                checkObjOption.push(
                    <Option key={item.id} value={item.id} title={item.name + " " + item.idcard}>{item.name + " " + item.idcard}</Option>
                );
            }
        }
        const selectOption = [];
        if (ogjByid) {
            if (ogjByid.personList) {
                if (ogjByid.personList.length > 0) {
                    for (let i = 0; i < ogjByid.personList.length; i++) {
                        let item = ogjByid.personList[i];
                        selectOption.push(
                            item.id
                        );
                    }
                }

            }
        }
        console.log('selectOption', selectOption);

        // 子任务列表
        const colu = [{
            title: '序号',
            dataIndex: 'childrenSerial',
        }, {
            title: '任务名称',
            dataIndex: 'name',
        }, {
            title: '任务开始时间',
            dataIndex: 'createtime',
        }, {
            title: '任务状态',
            key: 'type',
            render: (text, record) => (
                <span>{record.type == 0 ? '待办任务' : record.type === 1 ? '已完成任务' : '超期任务'}</span>
            ),
        }]
        const columns = [{
            title: '序号',
            dataIndex: 'serial',
        }, {
            title: '任务名称',
            dataIndex: 'name',
        }, {
            title: '任务类别',
            dataIndex: 'category',
            render: (text, record) => (
                <span>{record.category == 0 ? '周期' : '一次性'}</span>
            ),
        }, {
            title: '任务周期',
            dataIndex: 'cycle',
            render: (text, record) => (
                <span>{record.cycle === 0 ? '按天' : record.cycle === 1 ? '按周' : '按月'}</span>
            ),
        }, {
            title: '任务开始时间',
            dataIndex: 'starttime',
        }, {
            title: '任务结束时间',
            dataIndex: 'endtime',
        }, {
            title: '任务创建者',
            dataIndex: 'createuser',
        }, {
            title: '任务状态',
            dataIndex: 'taskswitch',
            render: (text, record) => (
                <span>{record.taskswitch == 0 ? '关闭' : '启动'}</span>
            ),
        }, {
            title: '盘查数量',
            dataIndex: 'count',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm title={record.taskswitch === 0 ? '确定启动该任务？' : '确定关闭该任务？'} okText="确定" cancelText="取消" onConfirm={() => this.isOpen(record)}>
                        <span style={{ cursor: 'pointer' }}>{record.taskswitch === 1 ? '关闭' : '启动'}</span>
                    </Popconfirm>
                    <Divider type="vertical" />
                    <span onClick={(e) => this.seeShowModal(record)} style={{ cursor: 'pointer' }}>查看</span>
                    <Divider type="vertical" />
                    <span style={{ cursor: 'pointer' }} onClick={() => this.showChildren(record.id)}>子任务</span>
                </span>
            ),
        }];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                const ids = [];
                for (var i = 0; i < selectedRows.length; i++) {
                    var selectedRow = selectedRows[i];
                    ids.push(selectedRow.id);
                }
                this.setState({
                    selectedRowsId: ids
                });
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        };
        let { name, unit, endDate, beginDate, status } = this.state;
        let beginDateValue = '';
        if (beginDate === '') {
        } else {
            beginDateValue = moment(beginDate, 'YYYY-MM-DD HH:mm:ss');
        }
        let endDateValue = '';
        if (endDate === '') {
        } else {
            endDateValue = moment(endDate, dateFormat);
        }
        if (beginDateValue != "" && endDateValue != "" && beginDateValue > endDateValue) {
            message.error('提示：开始时间不能大于结束时间！');
            return;
        }
        const treeList = [{ "children": [{ "label": "张三", "value": "4103000000001", "key": "4103000000001" }, { "label": "李四", "value": "4103000000002", "key": "4103000000002" }, { "label": "王二", "value": "4103000000003", "key": "4103000000003" }], "label": "全部", "value": "410000000000", "key": "410000000000" }];
        // 任务 分页
        const pagination = {
            onChange: (page) => {
                this.setState({
                    nowPage: page,
                });
                let { name, category, enddate, begindate, cycle, personname } = this.state;
                let creds = {
                    currentPage: page,
                    entityOrField: true,
                    pd: {
                        name: name,
                        starttime: begindate,
                        endtime: enddate,
                        category: category,
                        cycle: cycle,
                        personname: personname,
                    },
                    showCount: 10
                }
                store.dispatch(postTaskListHushiData(creds));
            },
            current: page.currentPage,
            total: page.totalResult,
            pageSize: page.showCount,
            showQuickJumper: true,

        }
        // 子任务 分页
        const childrenpagination = {
            size: 'small',
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
            },
            onChange: (page) => {
                this.setState({
                    childrennowpage: page,
                });
                let { childrenid } = this.state;
                let creds = {
                    currentPage: page,
                    pd: {
                        id: childrenid
                    },
                    showCount: 10

                }
                store.dispatch(postChildrenTaskListHushiData(creds));
            },
            current: childrenpage.currentPage,
            total: childrenpage.childrenTotal,
            pageSize: childrenpage.showCount,

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
                            createClick={this.handChangeModalDialogueShow}
                            addShowModal={this.addShowModal}
                            handleDelete={this.handleDelete}
                            serchChange={this.serchChange}
                            checkObjOption={checkObjOption}
                            nowPage={this.state.nowPage}
                        />

                        <div className="clear"></div>
                    </div>
                </div>
                {/*表格*/}
                <div className="z_slderRightBody sys_overflow">
                    {isFetching === true ?
                        <div style={{ textAlign: "center", position: "absolute", left: "45%", top: "50%" }}>
                            <Spin size="large" />
                        </div> :
                        <div style={{ padding: "0 15px" }}>
                            <Table locale={{ emptyText: '暂无数据' }} columns={columns} dataSource={dataList} bordered pagination={pagination} />
                        </div>}
                    <div className="clear"></div>
                </div>
                {/*分页*/}
                {/* <Pag pageSize={10} nowPage={nowPage} totalRecord={total} pageChange={this.pageChange} /> */}
                <Modal width={800}
                    title="新增任务"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    key={this.state.modalKey}
                    maskClosable={false}
                >
                    <Form onSubmit={this.saveModel}>
                        <Row className="formItemLeft">
                            <Col span={24}>
                                <FormItem
                                    {...formItemLayouts}
                                    label="任务名称"
                                >
                                    {getFieldDecorator('name', {
                                        rules: [{
                                            required: true, message: '请输入名称!',

                                        }, {
                                            max: 20, message: '最多输入二十个字符!',
                                        }],
                                        initialValue: '',
                                        validateFirst: true
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
                                    {getFieldDecorator('starttime', {
                                        rules: [{
                                            required: true,
                                            message: '请选择任务开始时间!'
                                        }],
                                        initialValue: '',
                                    })(
                                        <DatePicker showTime placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '220px' }} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="任务结束时间"
                                >
                                    {getFieldDecorator('endtime', {
                                        rules: [{
                                            required: true,
                                            message: '请选择任务结束时间!'
                                        }],
                                        initialValue: '',
                                    })(
                                        <DatePicker showTime placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '220px' }} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="任务类别"
                                >
                                    {getFieldDecorator('category', {
                                        rules: [{
                                            required: true,
                                            message: '请选择任务类别!'
                                        }],
                                        initialValue: '',
                                        validateFirst: true
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
                                        initialValue: '',
                                        validateFirst: true
                                    })(
                                        <Select onChange={this.onChange} >
                                            <Option value="按周">按周</Option>
                                            <Option value="按天">按天</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24} style={{ padding: '0 55px 16px' }}>
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
                                    {getFieldDecorator('personList', {
                                        initialValue: '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayouts}
                                    label="隶属任务"
                                >
                                    {getFieldDecorator('TaskCom', {
                                        initialValue: '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayouts}
                                    label="执行地点"
                                >
                                    {getFieldDecorator('TaskAddress', {
                                        initialValue: '',
                                        validateFirst: true
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayouts}
                                    label="备注"
                                >
                                    {getFieldDecorator('TaskContent', {
                                        initialValue: '',
                                        validateFirst: true
                                    })(
                                        <TextArea rows={2} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={15} style={{ textAlign: 'right' }}>
                                <Button htmlType="submit" className="btn_ok">保存</Button>
                                <Button style={{ marginLeft: 30 }} onClick={this.handleCancel} className="btn_delete">取消</Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
                {this.state.updateVisible ?
                    <Modal width={800}
                        title="任务详情"
                        visible={this.state.updateVisible}
                        onCancel={this.handleCancel}
                        footer={null}
                        maskClosable={false}
                    // key={this.state.modalKey}
                    >
                        <Form onSubmit={this.saveModel}>
                            <Row className="formItemLeft">
                                <Col span={24}>
                                    <FormItem
                                        {...formItemLayouts}
                                        label="任务名称"
                                    >
                                        {getFieldDecorator('name', {
                                            rules: [{
                                                required: true, message: '请输入名称!',

                                            }, {
                                                max: 20, message: '最多输入二十个字符!',
                                            }],
                                            initialValue: this.state.modalType === 'edit' ? ogjByid ? ogjByid.name : '' : '',
                                            validateFirst: true
                                        })(
                                            this.state.disabled ?
                                                <Input disabled /> : <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="任务开始时间"
                                    >
                                        {getFieldDecorator('starttime', {
                                            rules: [{
                                                required: true,
                                                message: '请选择任务开始时间!'
                                            }],
                                            initialValue: this.state.modalType === 'edit' ? ogjByid ? moment(getMyDate(ogjByid.starttime / 1000), 'YYYY-MM-DD HH:mm:ss') : '' : '',
                                        })(
                                            this.state.disabled ?
                                                <DatePicker showTime placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '220px' }} disabled />
                                                :
                                                <DatePicker showTime placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '220px' }} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="任务结束时间"
                                    >
                                        {getFieldDecorator('endtime', {
                                            rules: [{
                                                required: true,
                                                message: '请选择任务结束时间!'
                                            }],
                                            initialValue: this.state.modalType === 'edit' ? ogjByid ? moment(getMyDate(ogjByid.endtime / 1000), 'YYYY-MM-DD HH:mm:ss') : '' : '',
                                        })(
                                            this.state.disabled ?
                                                <DatePicker showTime placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '220px' }} disabled /> :
                                                <DatePicker showTime placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '220px' }} />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="任务类别"
                                    >
                                        {getFieldDecorator('category', {
                                            rules: [{
                                                required: true,
                                                message: '请选择任务类别!'
                                            }],
                                            initialValue: this.state.modalType === 'edit' ? ogjByid ? ogjByid.category : '' : '',
                                            validateFirst: true
                                        })(
                                            this.state.disabled ?
                                                <Select onChange={this.onChange} disabled>
                                                    <Option value=''>全部</Option>
                                                    <Option value={0}>周期</Option>
                                                    <Option value={1}>一次性</Option>
                                                </Select> :
                                                <Select onChange={this.onChange} >
                                                    <Option value=''>全部</Option>
                                                    <Option value={0}>周期</Option>
                                                    <Option value={1}>一次性</Option>
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
                                            initialValue: this.state.modalType === 'edit' ? ogjByid ? ogjByid.cycle : '' : '',
                                            validateFirst: true
                                        })(
                                            this.state.disabled ?
                                                <Select onChange={this.onChange} disabled>
                                                    <Option value=''>全部</Option>
                                                    <Option value={0}>按天</Option>
                                                    <Option value={1}>按周</Option>
                                                    <Option value={2}>按月</Option>
                                                </Select> :
                                                <Select onChange={this.onChange}>
                                                    <Option value=''>全部</Option>
                                                    <Option value={0}>按天</Option>
                                                    <Option value={1}>按周</Option>
                                                    <Option value={2}>按月</Option>
                                                </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="任务创建者"
                                    >
                                        {getFieldDecorator('createuser', {
                                            rules: [{
                                                required: true,
                                                message: '请选择任务创建者!'
                                            }],
                                            initialValue: this.state.modalType === 'edit' ? ogjByid ? ogjByid.createuser : '' : '',
                                            validateFirst: true
                                        })(
                                            this.state.disabled ?
                                                <Input disabled /> :
                                                <Input />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="任务状态"
                                    >
                                        {getFieldDecorator('taskswitch', {
                                            rules: [{
                                                required: true,
                                                message: '请选择任务状态!'
                                            }],
                                            initialValue: this.state.modalType === 'edit' ? ogjByid ? ogjByid.taskswitch : '' : '',
                                            validateFirst: true
                                        })(
                                            this.state.disabled ?
                                                <Select disabled>
                                                    <Option value=''>全部</Option>
                                                    <Option value={0}>待办任务</Option>
                                                    <Option value={1}>已完成任务</Option>
                                                    <Option value={2}>超期任务</Option>
                                                </Select> :
                                                <Select >
                                                    <Option value=''>全部</Option>
                                                    <Option value={0}>待办任务</Option>
                                                    <Option value={1}>已完成任务</Option>
                                                    <Option value={2}>超期任务</Option>
                                                </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={24}>
                                    <FormItem
                                        {...formItemLayouts}
                                        label="盘查对象"
                                    >
                                        {getFieldDecorator('personList', {
                                            initialValue: this.state.modalType === 'edit' ? ogjByid ? selectOption : '' : '',
                                            validateFirst: true
                                        })(
                                            // <TreeSelect
                                            //     style={{ marginRight: '10px' }}
                                            //     value={unit}
                                            //     dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            //     treeData={treeList}
                                            //     placeholder="请选择派发单位"
                                            //     onChange={this.unitChange}
                                            //     showSearch={false}
                                            //     treeCheckable={true}
                                            //     dropdownMatchSelectWidth={false}
                                            //     showCheckedStrategy="SHOW_PARENT"
                                            //     notFoundContent='暂无'
                                            // />
                                            this.state.disabled ?
                                                <Select disabled
                                                    mode="multiple"
                                                    size='default'
                                                    placeholder="盘查对象"
                                                    // defaultValue={['a10', 'c12']}
                                                    style={{ width: '100%' }}
                                                    key="taskpersonsee"
                                                >
                                                    <Option value=''>全部</Option>
                                                    {checkObjOption}
                                                </Select> :
                                                <Select
                                                    mode="multiple"
                                                    size='default'
                                                    placeholder="盘查对象"
                                                    // defaultValue={['a10', 'c12']}
                                                    style={{ width: '100%' }}
                                                    key="taskpersonsee"
                                                >
                                                    <Option value=''>全部</Option>
                                                    {checkObjOption}
                                                </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={15} style={{ textAlign: 'right' }}>
                                    {this.state.disabled ? '' : <Button htmlType="submit" className="btn_ok">保存</Button>}
                                    {this.state.disabled ? '' : <Button style={{ marginLeft: 30 }} onClick={this.handleCancel} className="btn_delete">取消</Button>}
                                </Col>
                            </Row>
                        </Form>
                    </Modal> : ''}
                {this.state.childrenModal ?
                    <Modal
                        title="子任务列表"
                        visible={this.state.childrenModal}
                        footer={null}
                        onCancel={this.handleCancel}
                        width={750}
                        style={{ position: "relative" }}
                        maskClosable={false}
                    >
                        <div style={{ position: 'relative' }}>
                            <div style={{ margin: '0 0 16px 0' }}>
                                <Input style={{ width: '520px', marginRight: "10px" }} value={this.state.childrenname} onChange={this.childrennameChange} type="text" id='chirdenname' placeholder='请输入任务名称' />
                                <ShallowBlueBtn width="80px" text="查询" margin="0 10px 0 0" onClick={this.handleChidernQuery} />
                                <ShallowBlueBtn width="80px" text="重置" onClick={this.handleChidernClear} />
                            </div>
                            {childrenIsFetching === true ?
                                <div style={{ textAlign: "center", position: "absolute", left: "45%", top: "50%" }}>
                                    <Spin size="large" />
                                </div> :
                                <Table locale={{ emptyText: '暂无数据' }}
                                    columns={colu}
                                    // expandedRowKeys={this.state.expandKeys}
                                    dataSource={childrenDataList}
                                    bordered
                                    // onExpandedRowsChange={this.RowsChange}
                                    // expandRowByClick={true}
                                    // expandIconAsCell={false}
                                    rowKey={(record) => record.id}
                                    expandedRowRender={(record) => this.expandedRowRender(record)}
                                    pagination={childrenpagination}
                                />}
                            <div className="clear"></div>
                            {/* {childrenDataList.length > 0 ?
                            <Pagination size="small" total={childrenTotal} current={this.state.childrennowpage} pageSize={10} /> :
                            ''
                        } */}
                        </div>

                    </Modal> : ''
                }

            </div>
        )
    }
}

//搜索区域内容组件
const SearchArea = React.createClass({
    getInitialState: function () {
        return {
            name: '',
            begindate: '',
            enddate: '',
            category: '',
            cycle: '',
            personname: '',

        };
    },
    handleClick: function () { //点击查询
        let page = 1;
        let { name, category, enddate, begindate, cycle, personname } = this.state;
        let creds = {
            current: 1,
            pd: {
                name: name,
                starttime: begindate,
                endtime: enddate,
                category: category,
                cycle: cycle,
                personname: personname,
            },
            showCount: 10
        }
        store.dispatch(postTaskListHushiData(creds));
        this.props.serchChange(name, category, enddate, begindate, cycle, personname, page);
    },
    init: function () {
        let page = 1;
        let { name, category, enddate, begindate, cycle, personname } = this.state;
        this.setState({
            name: '',
            begindate: '',
            enddate: '',
            category: '',
            cycle: '',
            personname: '',
        });
        let params = {
            currentPage: 1,
            pd: {
                category: '',
                cycle: '',
                name: "",
                personname: '',
                starttime: '',
                endtime: '',
            },
            showCount: 10
        }
        store.dispatch(postTaskListHushiData(params));
        this.props.serchChange('', '', '', '', '', '', page);
    },
    showModal: function () {
        this.setState({
            visible: true,
        });
    },
    hideModalOk: function () {
        this.setState({
            visible: false,
        });
        this.props.handleDelete();
    },
    hideModal: function () {
        this.setState({
            visible: false,
            updateVisible: false,
            childrenModal: false
        });
    },
    unitChange: function (value, label) {
        this.setState({
            unit: value,
            unit_text: label[0],
        });
    },
    handleNameChange: function (e) {
        this.setState({
            name: e.target.value
        });
    },
    categoryChange: function (value) {
        this.setState({
            category: value
        });
    },
    handleBeginDeteClick: function (date, dateString) {
        this.setState({
            begindate: dateString,
        });
    },
    handleEndDeteClick: function (date, dateString) {
        this.setState({
            enddate: dateString,
        });
    },
    cycleChange: function (value) {
        this.setState({
            cycle: value,
        });
    },
    personnameChange: function (e) {
        this.setState({
            personname: e.target.value,
        });
    },
    // personnameOnselect: function () {
    //     this.props.weiguankongQuery();
    // },
    render() {
        let { name, category, enddate, begindate, taskswitch, cycle, personname } = this.state;
        let beginDateValue = '';

        if (begindate === '') { } else {
            beginDateValue = moment(begindate, dateFormat);
        }
        let endDateValue = '';
        if (enddate === '') { } else {
            endDateValue = moment(enddate, dateFormat);
        }
        if (beginDateValue != "" && endDateValue != "" && beginDateValue > endDateValue) {
            message.error('提示：开始时间不能大于结束时间！');
            return;
        }
        let weiguankongList = store.getState().TaskManagement.data.weiguankongList.result.list;
        // const Option = [];
        // if (weiguankongList) {
        //     for (let i = 0; i < weiguankongList.length; i++) {
        //         let item = weiguankongList[i];
        //         Option.push(
        //             <Option key={item.id} value={item.id} title={item.name + " " + item.idcard}>{item.name + " " + item.idcard}</Option>
        //         );
        //     }
        // }
        // unit = (unit === '' ? '全部' : unit);
        return (
            <div className="marLeft40 fl z_searchDiv" style={{ width: "97%" }}>
                {/* <Button style={{ width: "100px", marginRight: '10px' }}
                    onClick={this.props.addShowModal}
                    className="btn_ok"
                >
                    新增任务
                </Button> */}
                <label htmlFor="" className="font14">任务名称：</label>
                <Input style={{ width: '25%', marginRight: "10px" }} type="text" id='name' placeholder='请输入任务名称' value={name} onChange={this.handleNameChange} />
                <label htmlFor="" className="font14">任务类别：</label>
                <Select style={{ width: "10%", margin: "0 10px 0 0" }} value={this.state.category} onChange={this.categoryChange} notFoundContent='暂无'>
                    <Option value=''>全部</Option>
                    <Option value="0">周期</Option>
                    <Option value="1">一次性</Option>
                </Select>
                <label htmlFor="" className="font14">任务周期：</label>
                <Select style={{ width: "10%", margin: "0 10px 0 0" }} value={this.state.cycle} onChange={this.cycleChange} notFoundContent='暂无'>
                    <Option value=''>全部</Option>
                    <Option value="0">按天</Option>
                    <Option value="1">按周</Option>
                    <Option value="2">按月</Option>
                </Select>
                <label htmlFor="" className="font14">盘查对象：</label>
                {/* <Select style={{ width: "30%", margin: "0 10px 0 0" }} value={this.state.personname} notFoundContent='暂无' onChange={this.personnameChange} >
                    <Option value=''>全部</Option>
                    {this.props.checkObjOption}
                </Select> */}
                <Input style={{ width: '25%', marginRight: "10px" }} type="text" id='personname' placeholder='请输入盘查对象姓名' value={personname} onChange={this.personnameChange} />

                <div style={{ marginTop: '10px' }}>
                    <label htmlFor="" className="font14">任务时间：</label>
                    <DatePicker placeholder="请选择日期" format={dateFormat} allowClear={false} style={{ marginRight: "10px" }} value={beginDateValue} defaultValue="" onChange={this.handleBeginDeteClick} />
                    <span className="font14" style={{ margin: "0 10px 0 0" }}>至</span>
                    <DatePicker placeholder="请选择日期" format={dateFormat} allowClear={false} style={{ marginRight: "10px" }} value={endDateValue} defaultValue="" onChange={this.handleEndDeteClick} />
                    <ShallowBlueBtn width="80px" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                    <ShallowBlueBtn width="80px" text="重置" margin="0 10px 0 0" onClick={this.init} />
                </div>
            </div>
        );
    }
})
PatrolTask = Form.create()(PatrolTask);
export default connect(mainReducer)(PatrolTask);