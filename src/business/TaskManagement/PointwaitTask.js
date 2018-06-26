// 卡点任务-待办任务
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
    Checkbox,
    Select,
    Divider,
    Popconfirm,
    Switch,
    Radio,
} from 'antd';
import {
    postCardPointTaskListHushiData, postCardPointTaskListHushiByidData, postWeiguankongData, saveaddPointTaskData, saveeditPointTaskData, DeletePointTaskData,
    cardPointIsOpenTaskData,
} from "../../actions/TaskManagement";
import { postCardPointManage_taskData } from "../../actions/actions";
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// 样式
const sliderdyHeader = {
    borderBottom: "1px solid #0C5F93",
    padding: "18px 0",
    overflow: "hidden"
}

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;
const SHOW_CHILD = TreeSelect.SHOW_CHILD;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const RadioGroup = Radio.Group;
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
export class PointwaitTask extends Component {
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
            category: '',
            enddate: '',
            begindate: '',
            taskswitch: '',
            cycle: '',
            personname: '',
            data: [],
            record: null,
            pagination: pagination,
            loading: false,
            personInfo: '',
            modalKey: 0,
            modalKeyTwo: 1,
            modalType: '',
            remark: "",
            text: null,
            unit_scope: '112001',
            oneStyle: "none",
            twoStyle: "none",
            threeStyle: "none",
            checkedList: [],
            visible: false,//任务详情
            handleVisible: false,//增加和修改任务
            Loading: false,
        };
        this.pageChange = this.pageChange.bind(this);
    }
    componentDidMount() {
        let params = {
            currentPage: this.state.nowPage,
            pd: {
                type: '0'
            },
            showCount: 10
        }
        store.dispatch(postCardPointTaskListHushiData(params));
        // 盘查卡点
        this.cardPointDataQuery();
    }
    // 盘查卡点的数据
    cardPointDataQuery = () => {
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
            },
            showCount: 9999
        }
        store.dispatch(postCardPointManage_taskData(creds));
    }
    ShowModal = (record) => {
        let creds = {
            id: record.id
        }
        store.dispatch(postCardPointTaskListHushiByidData(creds, this.goback()));

        // this.onCheckChange(record.checkedList);   
    }
    goback = () => {
        this.setState({
            visible: true,
            // personInfo: record,
            modalType: 'edit'
        });
    }
    // 增加打开模态框
    addShowModal = () => {
        this.setState({
            handleVisible: true,
            modalType: 'add'
        });

    }
    // 编辑打开模态框
    editShowModal = () => {
        this.setState({
            handleVisible: true,
            modalType: 'edit'
        });
    }
    handleChangeCancel = () => {
        this.setState({
            handleVisible: false,
            modalKey: this.state.modalKey + 1
        });
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
            let { name, enddate, begindate, } = this.state;
            let params = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    name: name,
                    starttime: begindate,
                    endtime: enddate,
                    type: '0'
                },
                showCount: 10
            }
            store.dispatch(cardPointIsOpenTaskData(creds, params))
        } else {
            let creds = {
                id: record.id,
                taskswitch: "0",
                updateuser: user.user.name
            }
            let { name, enddate, begindate, } = this.state;
            let params = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    name: name,
                    starttime: begindate,
                    endtime: enddate,
                    type: '0'
                },
                showCount: 10
            }
            store.dispatch(cardPointIsOpenTaskData(creds, params))
        }
        this.setState({
            nowPage: 1
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            modalKeyTwo: this.state.modalKeyTwo + 1
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
    loadchange = () => {
        this.setState({
            Loading: false
        });
    }
    saveModel = (e) => {
        this.setState({
            Loading: true
        });
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('values****', values);
            if (moment(values.endtime).format('YYYY-MM-DD HH:mm:ss') < moment(values.starttime).format('YYYY-MM-DD HH:mm:ss') && moment(values.endtime).format('YYYY-MM-DD HH:mm:ss') < moment(new Date()).format('YYYY-MM-DD HH:mm:ss')) {
                this.setState({
                    Loading: false
                });
                message.error('提示：结束时间不能小于开始时间或当前时间！');
                return false;
            }
            let userItem = JSON.parse(sessionStorage.getItem('user'));
            if (!err) {
                if (this.state.modalType === "edit") {
                    // values.id = this.state.personInfo.key;//让表单数据带上id  后台好进行操作
                    let creds = {
                        name: values.name,
                        lower_hair_type: values.lower_hair_type,
                        id: values.id.toString(),
                        checktype: '2',
                        category: '1',
                        reamrk: values.remark ? values.remark : '',
                        endtime: moment(values.endtime).format('YYYY-MM-DD HH:mm:ss'),
                        starttime: moment(values.starttime).format('YYYY-MM-DD HH:mm:ss'),
                        checknation_id: values.checknation_id,
                        police_unit_code_jsonb: values.police_unit_code_jsonb,
                        specialtype: '1',
                        updateuser: userItem.user.name
                    }
                    let params = {
                        currentPage: 1,
                        pd: {
                            name: this.state.name,
                            starttime: this.state.begindate,
                            endtime: this.state.enddate,
                            type: '0'
                        },
                        showCount: 10
                    }
                    store.dispatch(saveeditPointTaskData(creds, params, () => this.loadchange()));
                } else if (this.state.modalType === "add") {
                    let creds = {//表单域不一定写了所有的字段 所以要把空值通过赋值显示
                        name: values.name,
                        lower_hair_type: values.lower_hair_type,
                        checktype: '2',
                        category: '1',
                        reamrk: values.remark ? values.remark : '',
                        endtime: moment(values.endtime).format('YYYY-MM-DD HH:mm:ss'),
                        starttime: moment(values.starttime).format('YYYY-MM-DD HH:mm:ss'),
                        checknation_id: values.checknation_id,
                        police_unit_code_jsonb: values.police_unit_code_jsonb,
                        specialtype: '1',
                        updateuser: userItem.user.name
                    }
                    let params = {
                        currentPage: 1,
                        pd: {
                            name: this.state.name,
                            starttime: this.state.begindate,
                            endtime: this.state.enddate,
                            type: '0'
                        },
                        showCount: 10
                    }
                    store.dispatch(saveaddPointTaskData(creds, params, () => this.loadchange()))

                }
                this.handleChangeCancel();
                this.setState({
                    nowPage: 1
                });
            }


        })
    }
    serchChange = (name, enddate, begindate, page) => {
        this.setState({
            name: name,
            enddate: enddate,
            begindate: begindate,
            nowPage: page
        });
    }
    pageChange(nowPage) {
        this.state = Object.assign({}, this.state, { nowPage: nowPage });
        let { name, enddate, begindate, } = this.state;
        let creds = {
            currentPage: nowPage,
            entityOrField: true,
            pd: {
                name: name,
                starttime: begindate,
                endtime: enddate,
                type: '0'
            },
            showCount: 10
        }
        store.dispatch(postCardPointTaskListHushiData(creds));
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
    onCheckChange = (checkedList) => {
        this.setState({
            oneStyle: 'none',
            twoStyle: 'none',
            threeStyle: 'none'
        })
        for (let i in checkedList) {
            if (checkedList[i] === '一级') {
                this.setState({
                    oneStyle: 'block'
                })
            } else if (checkedList[i] === '二级') {
                this.setState({
                    twoStyle: 'block'
                })
            } else if (checkedList[i] === '三级') {
                this.setState({
                    threeStyle: 'block'
                })
            }
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let nowPage = this.state.nowPage;
        let isFetching = store.getState().TaskManagement.isFetching;
        let recordNumber = parseInt((nowPage - 1) * 10);
        let data = store.getState().TaskManagement.data.CardPointtaskWithListHushiList.result.list;
        let page = store.getState().TaskManagement.data.CardPointtaskWithListHushiList.result.page;
        let byidObj = store.getState().TaskManagement.data.CardPointtaskWithListHushiById.result;
        console.log('byidObj', byidObj);
        let dataList = [];
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let serial = recordNumber + i + 1;
            dataList.push({
                serial: serial,
                name: item.name,
                category: item.category,
                starttime: item.starttime,
                endtime: item.endtime,
                createuser: item.createuser,
                taskswitch: item.taskswitch,
                updateuser: item.updateuser,
                id: item.id,
                percount: item.percount,

            });
        }
        // 盘查卡点的展示数据
        let invetoryCardPointData = store.getState().root.data.invetoryCardPointData.result.list;
        // 盘查卡点的节点
        const loop = data => data.map((item) => {
            return <TreeNode key={item.id.toString()} title={item.checkpoint_name} value={item.id} />;
        })
        // 组织机构展示数据
        let organizationData = store.getState().root.data.organizationData.result.list;
        const organizationloop = data => data.map((item) => {
            if (item.childrenList) {
                return (
                    <TreeNode key={item.code.toString()} title={item.name} value={item.code}>
                        {organizationloop(item.childrenList)}
                    </TreeNode>)
            }
            return <TreeNode key={item.code.toString()} title={item.name} value={item.code} />;
        });
        const checkObjOption = [];
        const selectOption = [];

        // if (byidObj) {
        //     if (byidObj.personList) {
        //         if (byidObj.personList.length > 0) {
        //             for (let i = 0; i < byidObj.personList.length; i++) {
        //                 let item = byidObj.personList[i];
        //                 checkObjOption.push(
        //                     <Option key={item.id} value={item.id} title={item.name + " " + item.idcard}>{item.name + " " + item.idcard}</Option>
        //                 );
        //             }
        //             for (let i = 0; i < byidObj.personList.length; i++) {
        //                 let item = byidObj.personList[i];
        //                 if (item.Cflag) {
        //                     selectOption.push(
        //                         item.id
        //                     );
        //                 } else {
        //                     selectOptionNot.push(
        //                         item.id
        //                     );
        //                 }

        //             }
        //         }

        //     }
        // }
        const columns = [{
            title: '序号',
            dataIndex: 'serial',
        }, {
            title: '任务名称',
            dataIndex: 'name',
        }, {
            title: '盘查对象',
            dataIndex: 'checkedObj',
            render: () => (
                <span>全员盘查</span>
            ),
        }, {
            title: '盘查数量',
            dataIndex: 'percount',
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
                <span>{record.taskswitch === 0 ? '关闭' : '启动'}</span>
            ),
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm title={record.taskswitch === 0 ? '确定启动该任务？' : '确定关闭该任务？'} okText="确定" cancelText="取消" onConfirm={() => this.isOpen(record)}>
                        <span style={{ cursor: 'pointer' }}>{record.taskswitch === 1 ? '关闭' : '启动'}</span>
                    </Popconfirm>
                    <Divider type="vertical" />
                    <span onClick={(e) => this.ShowModal(record)} style={{ cursor: 'pointer' }}>详情</span>
                </span>
            ),
        }];
        // const data = [
        //     { key: 1, serial: 1, label: '卡点任务A', startTime: '2018-01-10 10:00:30', endTime: '2018-03-12 22:00:00', status: '循环任务', content: '卡点任务AAAAAAA', checkedList: ['二级'], evelTwo: [{ value: "ec02ed04ad6147b7a421ab912a7cf6b6" }], cycle: '按天', person: '系统创建', state: '1' },
        //     { key: 2, serial: 2, label: 'hylink卡点任务', startTime: '2017-12-09 18:55:59', endTime: '2018-04-10 20:15:00', status: '循环任务', content: 'hylink卡点任务的描述', checkedList: ['一级', '三级'], evelOne: [{ value: "ec02ed04ad6147b7a421ab912a7cf6b6" }], evelThree: [{ value: "ec02ed04ad6147b7a421ab912a7cf6b6" }, { value: "410300000000" }], cycle: '按周', person: '系统创建', state: '0' },
        // ];
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
        const treeList = [{ "children": [{ "children": [{ "label": "(卡点)测试", "value": "ec02ed04ad6147b7a421ab912a7cf6b6", "key": "ec02ed04ad6147b7a421ab912a7cf6b6" }], "label": "洛阳市公安局", "value": "410300000000", "key": "410300000000" }, { "label": "(卡点)01018", "value": "9ec30a5f4e554bc78f13fea61a61452c", "key": "9ec30a5f4e554bc78f13fea61a61452c" }, { "label": "(卡点)1221卡点", "value": "713141c655624b86acae70b4a674d8a7", "key": "713141c655624b86acae70b4a674d8a7" }, { "label": "(卡点)001", "value": "8cd3a75ab7fa49979f67eef4d59a9cad", "key": "8cd3a75ab7fa49979f67eef4d59a9cad" }, { "label": "(卡点)M78卡点", "value": "f24c58a0aadb42ca826c02c26f74a461", "key": "f24c58a0aadb42ca826c02c26f74a461" }, { "label": "(卡点)002", "value": "aad06faa7acf49df9504a6e97ae7946f", "key": "aad06faa7acf49df9504a6e97ae7946f" }], "label": "河南省公安厅", "value": "410000000000", "key": "410000000000" }]
        const plainOptions = ['一级', '二级', '三级'];
        const pagination = {
            onChange: (page) => {
                this.setState({
                    nowPage: page,
                });
                let { name, enddate, begindate, } = this.state;
                let creds = {
                    currentPage: page,
                    entityOrField: true,
                    pd: {
                        name: name,
                        starttime: begindate,
                        endtime: enddate,
                        type: '0'
                    },
                    showCount: 10
                }
                store.dispatch(postCardPointTaskListHushiData(creds));
            },
            current: page.currentPage,
            total: page.totalResult,
            pageSize: page.showCount,
            showQuickJumper: true,

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
                            handleDelete={this.handleDelete}
                            serchChange={this.serchChange}
                            checkObjOption={checkObjOption}
                            addShowModal={this.addShowModal}
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
                <Modal width={800}
                    title={this.state.modalType === 'edit' ? "编辑任务" : "新增任务"}
                    visible={this.state.handleVisible}
                    onCancel={this.handleChangeCancel}
                    footer={null}
                    key={this.state.modalKey}
                    maskClosable={false}
                    wrapClassName="taskaddeditModalClass"
                >
                    <Form onSubmit={this.saveModel}>
                        <Row className="formItemLeft">
                            <Col span={24} style={{ display: 'none' }}>
                                <FormItem
                                    {...formItemLayouts}
                                    label="id"
                                >
                                    {getFieldDecorator('id', {
                                        initialValue: this.state.modalType === 'edit' ? byidObj ? byidObj.id : '' : '',

                                    })(
                                        <Input type="hidden" />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <FormItem
                                    {...formItemLayouts}
                                    label="任务名称"
                                    hasFeedback={false}
                                >
                                    {getFieldDecorator('name', {
                                        rules: [{
                                            required: true, message: '请输入任务名称!',

                                        }, {
                                            max: 50, message: '最多输入五十个字符!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? byidObj ? byidObj.name : '' : '',
                                    })(
                                        <Input placeholder="请输入任务名称" />
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
                                            required: true, message: '请输入开始时间!',

                                        }],
                                        initialValue: this.state.modalType === 'edit' ? byidObj ? moment(byidObj.starttime, 'YYYY-MM-DD HH:mm:ss') : '' : '',
                                    })(
                                        <DatePicker showTime placeholder="请选择" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '220px' }} />
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
                                            required: true, message: '请输入结束时间!',
                                        }],
                                        initialValue: this.state.modalType === 'edit' ? byidObj ? moment(byidObj.endtime, 'YYYY-MM-DD HH:mm:ss') : '' : '',
                                    })(
                                        <DatePicker showTime placeholder="请选择" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '220px' }} />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24}>
                                <Row style={{ marginBottom: '24px' }}>
                                    <Col xs={24} sm={4} style={{ textAlign: 'right', paddingRight: '10px' }}>
                                        <Switch disabled={true} defaultChecked />
                                    </Col>
                                    <Col style={{ color: '#fff' }} xs={24} sm={19}>全员盘查</Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <FormItem
                                    {...formItemLayouts}
                                    label="责任单位范围"
                                >
                                    {getFieldDecorator('lower_hair_type', {
                                        rules: [{
                                            required: true, message: '请选择责任单位范围!',

                                        }],
                                        initialValue: this.state.modalType === 'edit' ? byidObj ? byidObj.lower_hair_type : '0' : '0',
                                    })(
                                        <RadioGroup onChange={this.onRadioChange} >
                                            <Radio value={'0'}>仅自身节点</Radio>
                                            <Radio value={'1'}>仅子节点</Radio>
                                            <Radio value={'2'}>自身及子节点</Radio>
                                        </RadioGroup>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24} className="selectHeight">
                                <FormItem
                                    {...formItemLayouts}
                                    label="责任单位"
                                >
                                    {getFieldDecorator('police_unit_code_jsonb', {
                                        rules: [{
                                            required: true, message: '请选择责任单位时间!',

                                        }],
                                        initialValue: this.state.modalType === 'edit' ? byidObj ? byidObj.police_unit_code_jsonb : [] : [],
                                        validateFirst: true
                                    })(
                                        <TreeSelect
                                            style={{ fontSize: '14px' }}
                                            // value={this.state.inventoryValue}
                                            dropdownStyle={{ maxHeight: 300, overflow: 'auto', }}
                                            treeCheckable={true}
                                            showCheckedStrategy={SHOW_PARENT}
                                            // treeData={treeData}
                                            treeCheckable={true}
                                            placeholder="请选择责任单位"
                                            onChange={this.inventoryChange}
                                            showSearch={false}
                                            dropdownMatchSelectWidth={false}
                                            treeCheckStrictly={true}
                                            size='default'
                                            notFoundContent='暂无'
                                        >
                                            {organizationData.length > 0 ? organizationloop(organizationData) : []}
                                        </TreeSelect>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24} className="selectHeight">
                                <FormItem
                                    {...formItemLayouts}
                                    label="盘查卡点"
                                >
                                    {getFieldDecorator('checknation_id', {
                                        rules: [{
                                            required: true, message: '请选择盘查卡点!',

                                        }],
                                        initialValue: this.state.modalType === 'edit' ? byidObj ? byidObj.checknation_id : [] : [],
                                        validateFirst: true
                                    })(
                                        <TreeSelect
                                            style={{ fontSize: '14px' }}
                                            // value={this.state.inventoryValue}
                                            dropdownStyle={{ maxHeight: 300, overflow: 'auto', }}
                                            treeCheckable={true}
                                            showCheckedStrategy={SHOW_CHILD}
                                            // treeData={treeData}
                                            treeCheckable={true}
                                            placeholder="请选择盘查卡点"
                                            onChange={this.inventoryChange}
                                            showSearch={false}
                                            dropdownMatchSelectWidth={false}
                                            size='default'
                                            notFoundContent='暂无'
                                        >
                                            {invetoryCardPointData.length > 0 ? loop(invetoryCardPointData) : []}
                                        </TreeSelect>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={24} className="selectHeight">
                                <FormItem
                                    {...formItemLayouts}
                                    label="备注"
                                >
                                    {getFieldDecorator('remark', {
                                        initialValue: this.state.modalType === 'edit' ? byidObj ? byidObj.remark : '' : '',
                                        validateFirst: true
                                    })(
                                        <TextArea rows={4} style={{ resize: 'none' }} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={15} style={{ textAlign: 'right' }}>
                                <Button htmlType="submit" className="btn_ok" loading={this.state.Loading}>保存</Button>
                                <Button style={{ marginLeft: 30 }} onClick={this.handleChangeCancel} className="btn_delete">取消</Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
                {this.state.visible ?

                    <Modal width={800}
                        title="任务详情"
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        footer={null}
                        key={this.state.modalKeyTwo + 1}
                        maskClosable={false}
                        wrapClassName="taskModalClass"
                    >
                        <Form>
                            <Row className="formItemLeft">
                                <Col span={24}>
                                    <FormItem
                                        {...formItemLayouts}
                                        label="任务名称"
                                    >
                                        {getFieldDecorator('name', {
                                            initialValue: byidObj ? byidObj.name : '',
                                            validateFirst: true
                                        })(
                                            <Input disabled />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="任务开始时间"
                                    >
                                        {getFieldDecorator('starttime', {
                                            initialValue: byidObj ? moment(byidObj.starttime, 'YYYY-MM-DD HH:mm:ss') : '',
                                        })(
                                            <DatePicker showTime placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '220px' }} disabled />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="任务结束时间"
                                    >
                                        {getFieldDecorator('endtime', {
                                            initialValue: byidObj ? moment(byidObj.endtime, 'YYYY-MM-DD HH:mm:ss') : '',
                                        })(
                                            <DatePicker showTime placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '220px' }} disabled />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="任务创建者"
                                    >
                                        {getFieldDecorator('createuser', {
                                            initialValue: byidObj ? byidObj.createuser : '',
                                        })(
                                            <Input disabled />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="任务状态"
                                    >
                                        {getFieldDecorator('taskswitch', {
                                            initialValue: byidObj ? byidObj.taskswitch == 1 ? '启动' : '关闭' : '',
                                        })(
                                            <Input disabled />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={24}>
                                    <Row style={{ marginBottom: '24px' }}>
                                        <Col xs={24} sm={4} style={{ textAlign: 'right', paddingRight: '10px' }}>
                                            <Switch disabled={true} defaultChecked />
                                        </Col>
                                        <Col style={{ color: '#fff' }} xs={24} sm={19}>全员盘查</Col>
                                    </Row>
                                </Col>
                                <Col span={24}>
                                    <FormItem
                                        {...formItemLayouts}
                                        label="盘查数量"
                                    >
                                        {getFieldDecorator('percount', {
                                            initialValue: byidObj ? byidObj.percount : '',
                                        })(
                                            <Input disabled />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={24}>
                                    <FormItem
                                        {...formItemLayouts}
                                        label="责任单位范围"
                                    >
                                        {getFieldDecorator('lower_hair_type', {
                                            rules: [{
                                                required: true, message: '请选择责任单位范围!',

                                            }],
                                            initialValue: byidObj ? byidObj.lower_hair_type : '0',
                                        })(
                                            <RadioGroup onChange={this.onRadioChange} disabled className='pointtaskRadioGroup'>
                                                <Radio value={'0'}>仅自身节点</Radio>
                                                <Radio value={'1'}>仅子节点</Radio>
                                                <Radio value={'2'}>自身及子节点</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={24} className="selectHeight">
                                    <FormItem
                                        {...formItemLayouts}
                                        label="责任单位"
                                    >
                                        {getFieldDecorator('police_unit_code_jsonb', {
                                            rules: [{
                                                required: true, message: '请选择责任单位时间!',

                                            }],
                                            initialValue: byidObj ? byidObj.police_unit_code_jsonb ? byidObj.police_unit_code_jsonb : [] : [],
                                            validateFirst: true
                                        })(
                                            <TreeSelect
                                                style={{ fontSize: '14px' }}
                                                // value={this.state.inventoryValue}
                                                dropdownStyle={{ maxHeight: 300, overflow: 'auto', }}
                                                treeCheckable={true}
                                                showCheckedStrategy={SHOW_PARENT}
                                                // treeData={treeData}
                                                treeCheckable={true}
                                                placeholder="请选择责任单位"
                                                onChange={this.inventoryChange}
                                                showSearch={false}
                                                dropdownMatchSelectWidth={false}
                                                treeCheckStrictly={true}
                                                size='default'
                                                notFoundContent='暂无'
                                                disabled
                                            >
                                                {organizationData.length > 0 ? organizationloop(organizationData) : []}
                                            </TreeSelect>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={24} className="selectHeight">
                                    <FormItem
                                        {...formItemLayouts}
                                        label="盘查卡点"
                                    >
                                        {getFieldDecorator('checknation_id', {
                                            rules: [{
                                                required: true, message: '请选择盘查卡点!',

                                            }],
                                            initialValue: byidObj ? byidObj.checknation_id ? byidObj.checknation_id : [] : [],
                                            validateFirst: true
                                        })(
                                            <TreeSelect
                                                style={{ fontSize: '14px' }}
                                                // value={this.state.inventoryValue}
                                                dropdownStyle={{ maxHeight: 300, overflow: 'auto', }}
                                                treeCheckable={true}
                                                showCheckedStrategy={SHOW_CHILD}
                                                // treeData={treeData}
                                                treeCheckable={true}
                                                placeholder="请选择盘查卡点"
                                                onChange={this.inventoryChange}
                                                showSearch={false}
                                                dropdownMatchSelectWidth={false}
                                                size='default'
                                                notFoundContent='暂无'
                                                disabled
                                            >
                                                {invetoryCardPointData.length > 0 ? loop(invetoryCardPointData) : []}
                                            </TreeSelect>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={24} className="selectHeight">
                                    <FormItem
                                        {...formItemLayouts}
                                        label="备注"
                                    >
                                        {getFieldDecorator('remark', {
                                            initialValue: byidObj ? byidObj.remark : '',
                                            validateFirst: true
                                        })(
                                            <TextArea rows={4} style={{ resize: 'none' }} disabled />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>

                            </Row>
                        </Form>
                    </Modal> : ''}

            </div >
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
                type: '0'
            },
            showCount: 10
        }
        store.dispatch(postCardPointTaskListHushiData(creds));
        this.props.serchChange(name, enddate, begindate, page);
    },
    init: function () {
        let page = 1;
        this.setState({
            name: '',
            begindate: '',
            enddate: '',
        });
        let params = {
            currentPage: 1,
            pd: {
                type: '0'
            },
            showCount: 10
        }
        store.dispatch(postCardPointTaskListHushiData(params));
        this.props.serchChange('', '', '', page);
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
                <ShallowBlueBtn width="100px" text="新增任务" margin="0 10px 0 0" onClick={this.props.addShowModal} />
                <label htmlFor="" className="font14">任务名称：</label>
                <Input style={{ width: '15%', marginRight: "10px" }} type="text" id='name' placeholder='请输入任务名称' value={name} onChange={this.handleNameChange} />
                <label htmlFor="" className="font14">任务时间：</label>
                <DatePicker placeholder="请选择日期" format={dateFormat} allowClear={false} style={{ marginRight: "10px" }} value={beginDateValue} defaultValue="" onChange={this.handleBeginDeteClick} />
                <span className="font14" style={{ margin: "0 10px 0 0" }}>至</span>
                <DatePicker placeholder="请选择日期" format={dateFormat} allowClear={false} style={{ marginRight: "10px" }} value={endDateValue} defaultValue="" onChange={this.handleEndDeteClick} />
                <ShallowBlueBtn width="80px" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                <ShallowBlueBtn width="80px" text="重置" margin="0 10px 0 0" onClick={this.init} />

            </div>
        );
    }
})
PointwaitTask = Form.create()(PointwaitTask);
export default connect(mainReducer)(PointwaitTask);