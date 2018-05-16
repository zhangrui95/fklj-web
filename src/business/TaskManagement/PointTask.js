// 待办任务
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
    Popconfirm
} from 'antd';
import {
    postThreeTaskListHushiData,postThreeTaskListHushiByIdData
} from "../../actions/TaskManagement";
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
export class PointTask extends Component {
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
            personInfo: '',
            modalKey: 0,
            modalType: '',
            remark: "",
            zoomvisible: false,
            imgtext: '',
            text: null,
            unit_scope: '112001',
            oneStyle: "none",
            twoStyle: "none",
            threeStyle: "none",
            checkedList: [],
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
                createtime: '',
                endtime: '',
            },
            showCount: 10
        }
        store.dispatch(postThreeTaskListHushiData(params));
    }
    editShowModal = (record) => {
        this.setState({
            visible: true,
            personInfo: record,
            modalType: 'edit'
        });
        // this.onCheckChange(record.checkedList);
        let creds = {
            id: record.id
        }
        store.dispatch(postThreeTaskListHushiByIdData(creds));
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
    }
    pageChange(nowPage) {
        this.state = Object.assign({}, this.state, { nowPage: nowPage });
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
        let data = store.getState().TaskManagement.data.threetaskListHushi.result.list;
        let byidObj = store.getState().TaskManagement.data.threetaskListHushiById.result;
        console.log('byidObj',byidObj);
        let dataList = [];
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let serial = recordNumber + i + 1;
            dataList.push({
                serial: serial,
                name: item.name,
                category: item.category,
                cycle: item.cycle,
                createtime: getMyDate(item.createtime/1000),
                endtime: getMyDate(item.endtime/1000),
                createuser: item.createuser,
                type: item.type,
                count2: item.count2,
                count1:item.count1,
                id: item.id,

            });
        }
        const columns = [{
            title: '序号',
            dataIndex: 'serial',
            width: 80,
        }, {
            title: '任务名称',
            dataIndex: 'name',
        }, {
            title: '任务类别',
            dataIndex: 'category',
            render: (text, record) => (
                <span>{record.category === '0' ? '周期' : '一次性'}</span>
            ),
        }, {
            title: '盘查对象',
            dataIndex: 'checkObject',
            width: 180,
            render: (text, record) => (
                <span>{record.count2 +'/'+ record.count1}</span>
            ),
        }, {
            title: '任务周期',
            dataIndex: 'cycle',
            render: (text, record) => (
                <span>{record.cycle === '0' ? '每天' : record.cycle === '1' ? '每周' : '每月'}</span>
            ),
        }, {
            title: '任务开始时间',
            dataIndex: 'createtime',
            width: 180,
        }, {
            title: '任务结束时间',
            dataIndex: 'endtime',
            width: 180,
        }, {
            title: '任务创建者',
            dataIndex: 'createuser',
            width: 180,
        }, {
            title: '任务状态',
            dataIndex: 'type',

            render: (text, record) => (
                <span>{record.type === '0' ? '待办任务' : record.type === '1' ? '已完成任务' : '超期任务'}</span>
            ),
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <span onClick={(e) => this.editShowModal(record)} style={{ cursor: 'pointer' }}>查看</span>
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
        let { name, unit, endDate, beginDate, status, unit_scope } = this.state;
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
        const treeList = [{ "children": [{ "children": [{ "label": "(卡点)测试", "value": "ec02ed04ad6147b7a421ab912a7cf6b6", "key": "ec02ed04ad6147b7a421ab912a7cf6b6" }], "label": "洛阳市公安局", "value": "410300000000", "key": "410300000000" }, { "label": "(卡点)01018", "value": "9ec30a5f4e554bc78f13fea61a61452c", "key": "9ec30a5f4e554bc78f13fea61a61452c" }, { "label": "(卡点)1221卡点", "value": "713141c655624b86acae70b4a674d8a7", "key": "713141c655624b86acae70b4a674d8a7" }, { "label": "(卡点)001", "value": "8cd3a75ab7fa49979f67eef4d59a9cad", "key": "8cd3a75ab7fa49979f67eef4d59a9cad" }, { "label": "(卡点)M78卡点", "value": "f24c58a0aadb42ca826c02c26f74a461", "key": "f24c58a0aadb42ca826c02c26f74a461" }, { "label": "(卡点)002", "value": "aad06faa7acf49df9504a6e97ae7946f", "key": "aad06faa7acf49df9504a6e97ae7946f" }], "label": "河南省公安厅", "value": "410000000000", "key": "410000000000" }]
        const plainOptions = ['一级', '二级', '三级'];
        const checkObjOption = [];

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
                            <Table locale={{ emptyText: '暂无数据' }} columns={columns} dataSource={dataList} bordered pagination={false} />
                        </div>}
                    <div className="clear"></div>
                </div>
                {/*分页*/}
                <Pag pageSize={10} nowPage={nowPage} totalRecord={10} pageChange={this.pageChange} />
                <Modal width={800}
                    title="任务详情"
                    visible={this.state.visible}
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
                                    {getFieldDecorator('name', {
                                        initialValue: this.state.modalType === 'edit' ?byidObj.name : '',
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
                                    {getFieldDecorator('createtime', {
                                        initialValue: this.state.modalType === 'edit' ? moment(getMyDate(byidObj.createtime/1000), 'YYYY-MM-DD HH:mm:ss') : '',
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
                                        initialValue: this.state.modalType === 'edit' ? moment(getMyDate(byidObj.endtime/1000), 'YYYY-MM-DD HH:mm:ss') : '',
                                    })(
                                        <DatePicker showTime placeholder="" format="YYYY-MM-DD HH:mm:ss" allowClear={false} style={{ width: '220px' }} disabled />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="任务类别"
                                >
                                    {getFieldDecorator('category', {
                                        initialValue: this.state.modalType === 'edit' ? byidObj.category : '',
                                        validateFirst: true
                                    })(
                                        <Select onChange={this.onChange} disabled>
                                            <Option value="0">周期</Option>
                                            <Option value="1">一次性</Option>
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
                                        initialValue: this.state.modalType === 'edit' ? byidObj.cycle : '',
                                        validateFirst: true
                                    })(
                                        <Select onChange={this.onChange} disabled>
                                            <Option value="0">每天</Option>
                                            <Option value="1">每周</Option>
                                            <Option value="2">每月</Option>
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
                                        initialValue: this.state.modalType === 'edit' ? byidObj.createuser : '',
                                        validateFirst: true
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
                                    {getFieldDecorator('type', {
                                        initialValue: this.state.modalType === 'edit' ? byidObj.type : '',
                                        validateFirst: true
                                    })(
                                        <Select onChange={this.onChange} disabled>
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
                                    {getFieldDecorator('TaskPerson', {
                                        initialValue: this.state.modalType === 'edit' ? byidObj.TaskPerson : '',
                                        validateFirst: true
                                    })(
                                        // <TreeSelect
                                        //     style={{ marginRight: '10px' }}
                                        //     value={unit}
                                        //     dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        //     treeData={treeList}
                                        //     placeholder="盘查对象"
                                        //     onChange={this.unitChange}
                                        //     showSearch={false}
                                        //     treeCheckable={true}
                                        //     dropdownMatchSelectWidth={false}
                                        //     showCheckedStrategy="SHOW_PARENT"
                                        //     notFoundContent='暂无'
                                        //     disabled
                                        // />
                                        <Select
                                            mode="multiple"
                                            size='default'
                                            placeholder="Please select"
                                            defaultValue={['a10', 'c12']}
                                            onChange={this.handleChange}
                                            style={{ width: '100%' }}
                                        >
                                            {checkObjOption}
                                        </Select>
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
                {/*<Modal*/}
                {/*width={600}*/}
                {/*title="卡点任务"*/}
                {/*visible={this.state.visible}*/}
                {/*onCancel={this.handleCancel}*/}
                {/*footer={null}*/}
                {/*key={this.state.modalKey}*/}
                {/*>*/}
                {/*<Form onSubmit={this.saveModel}>*/}
                {/*<div className="formItemLeft">*/}
                {/*<FormItem*/}
                {/*{...formItemLayout}*/}
                {/*label="任务名称"*/}
                {/*>*/}
                {/*{getFieldDecorator('label', {*/}
                {/*rules: [{*/}
                {/*required: true, message: '请输入名称!',*/}

                {/*},{*/}
                {/*max:20,message:'最多输入二十个字符!',*/}
                {/*}],*/}
                {/*initialValue:this.state.modalType === 'edit' ? this.state.personInfo.label : '',*/}
                {/*validateFirst:true*/}
                {/*})(*/}
                {/*<Input />*/}
                {/*)}*/}
                {/*</FormItem>*/}
                {/*<FormItem*/}
                {/*{...formItemLayout}*/}
                {/*label="卡点级别"*/}
                {/*>*/}
                {/*{getFieldDecorator('unit_jb', {*/}
                {/*rules: [{*/}
                {/*required: true, message: '至少选择一个卡点级别!',*/}
                {/*}],*/}
                {/*initialValue:this.state.modalType === 'edit' ? this.state.personInfo.checkedList : this.state.checkedList,*/}
                {/*validateFirst:true*/}
                {/*})(*/}
                {/*<CheckboxGroup options={plainOptions} onChange={this.onCheckChange}/>*/}
                {/*)}*/}
                {/*</FormItem>*/}
                {/*<FormItem*/}
                {/*{...formItemLayout}*/}
                {/*label="一级卡点"*/}
                {/*style = {{display: this.state.oneStyle}}*/}
                {/*>*/}
                {/*{getFieldDecorator('unit1', {*/}
                {/*rules: [{*/}
                {/*required: this.state.oneStyle === 'block',*/}
                {/*message: '请选择一级卡点!'*/}
                {/*}],*/}
                {/*initialValue:this.state.modalType === 'edit' ? this.state.personInfo.evelOne : [],*/}
                {/*validateFirst:true*/}
                {/*})(*/}
                {/*<TreeSelect  treeData={treeList} placeholder="请选择派发卡点" treeCheckable={true} showCheckedStrategy={SHOW_PARENT} treeCheckStrictly={true}/>*/}
                {/*)}*/}
                {/*</FormItem>*/}
                {/*<FormItem*/}
                {/*{...formItemLayout}*/}
                {/*label="二级卡点"*/}
                {/*style = {{display: this.state.twoStyle}}*/}
                {/*>*/}
                {/*{getFieldDecorator('unit2', {*/}
                {/*rules: [{*/}
                {/*required: this.state.twoStyle === 'block',*/}
                {/*message: '请选择二级卡点!'*/}
                {/*}],*/}
                {/*initialValue:this.state.modalType === 'edit' ? this.state.personInfo.evelTwo : [],*/}
                {/*validateFirst:true*/}
                {/*})(*/}
                {/*<TreeSelect  treeData={treeList} placeholder="请选择派发卡点" treeCheckable={true} showCheckedStrategy={SHOW_PARENT} treeCheckStrictly={true}/>*/}
                {/*)}*/}
                {/*</FormItem>*/}
                {/*<FormItem*/}
                {/*{...formItemLayout}*/}
                {/*label="三级卡点"*/}
                {/*style = {{display: this.state.threeStyle}}*/}
                {/*>*/}
                {/*{getFieldDecorator('unit3', {*/}
                {/*rules: [{*/}
                {/*required: this.state.threeStyle === 'block',*/}
                {/*message: '请选择三级卡点!'*/}
                {/*}],*/}
                {/*initialValue:this.state.modalType === 'edit' ? this.state.personInfo.evelThree : [],*/}
                {/*validateFirst:true*/}
                {/*})(*/}
                {/*<TreeSelect  treeData={treeList} placeholder="请选择派发卡点" treeCheckable={true} showCheckedStrategy={SHOW_PARENT} treeCheckStrictly={true}/>*/}
                {/*)}*/}
                {/*</FormItem>*/}
                {/*<FormItem {...formItemLayout}*/}
                {/*label="任务时间">*/}
                {/*{getFieldDecorator('beginDate', {*/}
                {/*rules: [{required: true}],*/}
                {/*// initialValue:this.state.modalType === 'edit' ? moment(this.state.personInfo.startTime, 'YYYY-MM-DD HH:mm:ss') : '',*/}
                {/*validateFirst:true*/}
                {/*})(*/}
                {/*<div>*/}
                {/*<div>*/}
                {/*<DatePicker*/}
                {/*showTime*/}
                {/*allowClear={false}*/}
                {/*format="YYYY-MM-DD HH:mm:ss"*/}
                {/*placeholder="开始时间"*/}
                {/*value={this.state.modalType === 'edit' ? moment(this.state.personInfo.startTime, 'YYYY-MM-DD HH:mm:ss') : ''}*/}
                {/*/>*/}
                {/*<DatePicker*/}
                {/*showTime*/}
                {/*allowClear={false}*/}
                {/*format="YYYY-MM-DD HH:mm:ss"*/}
                {/*placeholder="结束时间"*/}
                {/*style={{marginLeft: '15px'}}*/}
                {/*value={this.state.modalType === 'edit' ? moment(this.state.personInfo.endTime, 'YYYY-MM-DD HH:mm:ss') : ''}*/}
                {/*/>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*)}*/}
                {/*</FormItem>*/}
                {/*<FormItem*/}
                {/*{...formItemLayout}*/}
                {/*label="任务描述"*/}
                {/*style={{clear: 'both'}}*/}
                {/*>*/}
                {/*{getFieldDecorator('content', {*/}
                {/*rules: [{*/}
                {/*required: false,*/}
                {/*}],*/}
                {/*initialValue:this.state.modalType === 'edit' ? this.state.personInfo.content : '',*/}
                {/*validateFirst:true*/}
                {/*})(*/}
                {/*<TextArea rows={3}/>*/}
                {/*)}*/}
                {/*</FormItem>*/}
                {/*</div>*/}
                {/*<Row>*/}
                {/*<Col span={16} style={{textAlign: 'right'}}>*/}
                {/*<Button htmlType="submit"  className="btn_ok">保存</Button>*/}
                {/*<Button style={{marginLeft: 30}} onClick={this.handleCancel} className="btn_delete">取消</Button>*/}
                {/*</Col>*/}
                {/*</Row>*/}

                {/*</Form>*/}
                {/*</Modal>*/}
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
            unit: '',
            status: '',
            cycle: '',
            questionName: '',
            treeList: [{ "children": [{ "children": [{ "label": "(卡点)测试", "value": "ec02ed04ad6147b7a421ab912a7cf6b6", "key": "ec02ed04ad6147b7a421ab912a7cf6b6" }], "label": "洛阳市公安局", "value": "410300000000", "key": "410300000000" }, { "label": "(卡点)01018", "value": "9ec30a5f4e554bc78f13fea61a61452c", "key": "9ec30a5f4e554bc78f13fea61a61452c" }, { "label": "(卡点)1221卡点", "value": "713141c655624b86acae70b4a674d8a7", "key": "713141c655624b86acae70b4a674d8a7" }, { "label": "(卡点)001", "value": "8cd3a75ab7fa49979f67eef4d59a9cad", "key": "8cd3a75ab7fa49979f67eef4d59a9cad" }, { "label": "(卡点)M78卡点", "value": "f24c58a0aadb42ca826c02c26f74a461", "key": "f24c58a0aadb42ca826c02c26f74a461" }, { "label": "(卡点)002", "value": "aad06faa7acf49df9504a6e97ae7946f", "key": "aad06faa7acf49df9504a6e97ae7946f" }], "label": "河南省公安厅", "value": "410000000000", "key": "410000000000" }],
        };
    },
    handleNameChange: function (e) {
        this.setState({
            name: e.target.value
        });
    },
    statusChange: function (value) {
        this.setState({
            status: value
        });
    },
    handleClick: function () { //点击查询
        let { name, begindate, enddate, status } = this.state;
        console.log('查询', name, begindate, enddate, status);
    },
    init: function () {
        this.setState({
            name: '',
            begindate: '',
            enddate: '',
            unit: '',
            status: '',
            cycle: '',
            questionName: '',
        });
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
    questionNameChange: function (e) {
        this.setState({
            questionName: e.target.value,
        });
    },
    render() {
        let { name, unit, enddate, begindate, status, cycle, questionName } = this.state;
        let beginDateValue = '';
        if (begindate === '') { } else {
            beginDateValue = moment(begindate, dateFormat);
        }
        let endDateValue = '';
        if (enddate === '') { } else {
            endDateValue = moment(enddate, dateFormat);
        }
        unit = (unit === '' ? '全部' : unit);
        return (
            <div className="marLeft40 fl z_searchDiv">
                <label htmlFor="" className="font14">任务名称：</label>
                <Input style={{ width: '121px', marginRight: "10px" }} type="text" id='name' placeholder='请输入任务名称' value={name} onChange={this.handleNameChange} />
                <label htmlFor="" className="font14">任务类别：</label>
                <Select value={status} style={{ width: 100, margin: "0 10px 0 0" }} onChange={this.statusChange} notFoundContent='暂无'>
                    <Option value="">全部</Option>
                    <Option value="循环任务">循环任务</Option>
                </Select>
                <label htmlFor="" className="font14">任务周期：</label>
                <Select value={cycle} style={{ width: 100, margin: "0 10px 0 0" }} onChange={this.cycleChange} notFoundContent='暂无'>
                    <Option value="按周">按周</Option>
                    <Option value="按天">按天</Option>
                </Select>
                <label htmlFor="" className="font14">盘查对象：</label>
                <Input style={{ width: '121px', marginRight: "10px" }} type="text" id='name' placeholder='请输入盘查对象' value={questionName} onChange={this.questionNameChange} />
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
PointTask = Form.create()(PointTask);
export default connect(mainReducer)(PointTask);