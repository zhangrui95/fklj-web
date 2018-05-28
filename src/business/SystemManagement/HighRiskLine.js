/**
 * 高危路线
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
    PostHighRiskLineData,
    saveHighRiskLineData,
    updateHighRiskLineData,
    DeleteHighRiskLineData
} from "../../actions/SystemManagement";
import {
    changeShade,
    fetchAreaCityData,
    fetchAreaProvinceData
} from "../../actions/actions";
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
} from 'antd';

import moment from 'moment';
moment.locale('zh-cn');

const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
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

export class HighRiskLine extends Component {
    constructor(props) { //初始化nowPage为1
        super(props);
        this.state = {
            nowPage: 1,
            ModalDialogueShow: 'none',
            lineId: '',
            highRiskLine: null,
            ModalDialogueType: 'add',
            selectedRowsId: [],
            highRiskAreaList_cityName: '',
            highRiskAreaList_dateBegin: '',
            highRiskAreaList_dateEnd: '',
            personInfo: '',
            modalKey: 0,
            modalType: '',
        };
        this.pageChange = this.pageChange.bind(this);
    }
    componentDidMount() {
            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {},
                showCount: 10
            }
            store.dispatch(PostHighRiskLineData(creds));
        }
        //修改弹出框展示状态
    handChangeModalDialogueShow = (value) => {
            this.setState({
                ModalDialogueShow: value,
            });
        }
        //选中表格行详情lineId变更方法
    handleLineIdChange = (value, highRiskLine = null) => { // 高危线路ID    高危线路对象
        this.setState({
            lineId: value,
            ModalDialogueType: 'edit',
            ModalDialogueShow: 'block',
            highRiskLine: highRiskLine,
        });
        //打开遮罩
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
    handleDelete = () => {
        if (this.state.selectedRowsId.length === 0) {
            message.error('请选择要删除的项！');
            return;
        }
        let crads = {
            ids: this.state.selectedRowsId,
            userName: sessionStorage.getItem('userName') || ''
        };
        store.dispatch(DeleteHighRiskLineData(crads));


        this.setState({
            selectedRowsId: []
        });


    }
    serchChange = (highRiskAreaList_cityName, highRiskAreaList_dateBegin, highRiskAreaList_dateEnd) => {
        this.setState({
            nowPage: 1,
            highRiskAreaList_cityName: highRiskAreaList_cityName,
            highRiskAreaList_dateBegin: highRiskAreaList_dateBegin,
            highRiskAreaList_dateEnd: highRiskAreaList_dateEnd,
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
                beginTime: this.state.highRiskAreaList_dateBegin,
                endTime: this.state.highRiskAreaList_dateEnd,
                highRiskAreaList_cityName: this.state.highRiskAreaList_cityName,
            },
            showCount: 10
        }
        store.dispatch(PostHighRiskLineData(creds));
    }
    editShowModal = (record) => {
            this.setState({
                visible: true,
                personInfo: record,
                modalType: 'edit',
                avatarSrc: record.zpurl
            });
        }
        addShowModal = (record) => {
            this.setState({
                visible: true,
                modalType: 'add',
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
        let highRiskLineList = store.getState().SystemManagement.data.highRiskLineList.result.list;
        let nowPage = this.state.nowPage;
        // let Table;
        // Table= <HighRiskLineTable  highRiskLineList={highRiskLineList} nowPage={nowPage} lineIdChange={this.handleLineIdChange}/>
        let totalRecord = store.getState().SystemManagement.data.highRiskLineList.result.total;
        let isFetching = store.getState().SystemManagement.isFetching;

        const columns = [{
            title: '序号',
            dataIndex: 'serial',
        }, {
            title: '线路名称',
            dataIndex: 'linename',
        }, {
            title: '途径城市',
            dataIndex: 'roadcity'
        }, {
            title: '身份证号',
            dataIndex: 'idNumber',
        }, {
            title: '创建时间',
            dataIndex: 'createtime',
        }, {
            title: '开始时间',
            dataIndex: 'begindate',
        }, {
            title: '结束时间',
            dataIndex: 'enddate',
        }, {
            title: '状态',
            dataIndex: 'visable',
        }, {
            title: '操作',
            key: 'action',
            // width: 30,
            render: (text, record) => (
                <span>
                        <span onClick={onClickEdit=>this.editShowModal(record)} style={{cursor:'pointer'}}>编辑</span>
                </span>
            ),
        }];
        const data = [];
        let recordNumber = parseInt((nowPage - 1) * 10);
        for (var i = 0; i < highRiskLineList.length; i++) {
            var highRishkLine = highRiskLineList[i];
            let serial = recordNumber + i + 1;
            data.push({
                key: i,
                serial: serial,
                linename: highRishkLine.linename,
                // roadcity: highRishkLine.roadcity,
                // idNumber: highRishkLine.idNumber,
                // duration: highRishkLine.duration,
                // beginDate: highRishkLine.beginDate,
                // endDate: highRishkLine.endDate,
                // state: highRishkLine.state,
                id: highRishkLine.id,

            });

        }
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
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
        };
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
                            createClick={this.handChangeModalDialogueShow} 
                            handleClickAdd={this.addShowModal}
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
                        <div>
                            <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered  pagination={pagination} />
                        </div>}
                    <div className="clear"></div>
                </div>
                {/*分页*/}
                {/*<Pag pageSize={10} nowPage={nowPage} totalRecord={totalRecord} pageChange={this.pageChange} />*/}
                {/*模态框*/}
                {/*<ModalDialogue 
                    width='533px' 
                    isShow={this.state.ModalDialogueShow} 
                    lineId={this.state.lineId} 
                    highRiskLine={this.state.highRiskLine} 
                    lineIdChange={this.handleLineIdChange} 
                    changeStatus={this.handChangeModalDialogueShow}
                    modalDialogueType={this.state.ModalDialogueType}
                />*/}
                <Modal
                    title="高危地区"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    >
                    <Form onSubmit={this.saveModel}>
                        <div className="formItemLeft">
                            <FormItem
                            {...formItemLayout}
                            label="线路名称"
                            hasFeedback
                            >
                            {getFieldDecorator('name', {
                                rules: [{
                                required: true, message: '请输入姓名!',
                                }],
                                initialValue:this.state.modalType === 'edit' ? this.state.personInfo.name : '',
                                validateFirst:true
                            })(
                                <Input />
                            )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                            {...formItemLayout}
                            label="起始城市"
                            hasFeedback
                            >
                            {getFieldDecorator('startcity', {
                                rules: [{
                                required: true, message: '请输入起始城市!',
                                }],
                                initialValue:this.state.modalType === 'edit' ? this.state.personInfo.startcity : '',
                                validateFirst:true
                            })(
                                <Input />
                            )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                            {...formItemLayout}
                            label="终止城市"
                            hasFeedback
                            >
                            {getFieldDecorator('endcity', {
                                rules: [{
                                required: true, message: '请输入终止城市!',
                                }],
                                initialValue:this.state.modalType === 'edit' ? this.state.personInfo.endcity : '',
                                validateFirst:true
                            })(
                                <Input />
                            )}
                            </FormItem>
                        </div>
                        <div className="formItemLeft">
                            <FormItem
                            {...formItemLayout}
                            label="途径城市"
                            hasFeedback
                            >
                            {getFieldDecorator('roadcity', {
                                rules: [{
                                required: true, message: '请输入途径城市!',
                                }],
                                initialValue:this.state.modalType === 'edit' ? this.state.personInfo.roadcity : '',
                                validateFirst:true
                            })(
                                <Input />
                            )}
                            </FormItem>
                        </div>
                       
                    </Form>
                </Modal>
            </div>


        );

    }
};

export class HighRiskLineTr extends Component {
    constructor(props) {
            super(props);
            this.state = {
                //imgPath: "",
                //name: '',
                //fixedPhoneNumber:"",
                //phoneNumber:"",
                //img:null
            };
            this.look = this.look.bind(this);
        }
        //查看详情
    look = () => {
        this.props.lineIdChange(this.props.trData.id, this.props.trData);
    }
    render() {
        let trData = this.props.trData;
        let detailed = <div style={{cursor:"pointer"}}  onClick={this.look}>详情</div>;
        return (
            <tr>
                <td style={tdStyle}>{this.props.serial}</td>
                <td style={tdStyle}>{trData.lineName}</td>
                <td style={tdStyle}>{trData.approachCity}</td>
                <td style={tdStyle}>{trData.idNumber}</td>
                <td style={tdStyle}>{trData.duration}</td>
                <td style={tdStyle}>{trData.beginDate}</td>
                <td style={tdStyle}>{trData.endDate}</td>
                <td style={tdStyle}>{trData.state}</td>
                <td style={tdStyle}>{detailed}</td>
            </tr>
        );

    }
}



const HighRiskLineTable = React.createClass({
    render() {
        let highRiskLineList = this.props.highRiskLineList.list;
        let nowPage = this.props.nowPage;
        let recordNumber = parseInt((nowPage - 1) * 10);
        let trs = [];
        for (var i = 0; i < highRiskLineList.length; i++) {
            var trData = highRiskLineList[i];
            let serial = recordNumber + i + 1;
            trs.push(
                <HighRiskLineTr trData={trData} serial={serial} lineIdChange={this.props.lineIdChange}/>
            )
        }
        return (
            <table style={tableStyle}>
                <tr>
                    {/*<th>序号</th>*/}
                    <td  style={tdStyle}>序号</td>
                    <td  style={tdStyle}>线路名称</td>
                    <td  style={tdStyle}>途径城市</td>
                    <td  style={tdStyle}>身份证号</td>
                    <td  style={tdStyle}>设定高危地区时长</td>
                    <td  style={tdStyle}>开始时间</td>
                    <td  style={tdStyle}>结束时间</td>
                    <td  style={tdStyle}>状态</td>
                    <td  style={tdStyle}>操作</td>
                </tr>
                {trs}
            </table>
        )
    }
})

//姓名
let highRiskAreaList_cityName,
    highRiskAreaList_dateBegin,
    highRiskAreaList_dateEnd;
//搜索区域内容组件
const SearchArea = React.createClass({
        getInitialState: function() {
            return {
                highRiskAreaList_cityName: '',
                highRiskAreaList_dateBegin: '',
                highRiskAreaList_dateEnd: ''
            };
        },
        onChildChanged: function(id, value) {
            if (id === 'highRiskAreaList_cityName') {
                highRiskAreaList_cityName = value;
            } else if (id === 'highRiskAreaList_dateBegin') {
                highRiskAreaList_dateBegin = value;
            } else if (id === 'highRiskAreaList_dateEnd') {
                highRiskAreaList_dateEnd = value;
            }
            this.setState({
                highRiskAreaList_cityName: highRiskAreaList_cityName,
                highRiskAreaList_dateBegin: highRiskAreaList_dateBegin,
                highRiskAreaList_dateEnd: highRiskAreaList_dateEnd
            });
        },
        handleNameChange: function(e) {
            this.setState({
                highRiskAreaList_cityName: e.target.value
            });
        },
        handleBeginDeteClick: function(date, dateString) {
            this.setState({
                highRiskAreaList_dateBegin: dateString,
            });
        },
        handleEndDeteClick: function(date, dateString) {
            this.setState({
                highRiskAreaList_dateEnd: dateString,
            });
        },
        handleClick: function() { //点击查询
            highRiskAreaList_cityName = this.state.highRiskAreaList_cityName;
            highRiskAreaList_dateBegin = this.state.highRiskAreaList_dateBegin;
            highRiskAreaList_dateEnd = this.state.highRiskAreaList_dateEnd;
            if ( this.state.highRiskAreaList_dateBegin!= "" && this.state.highRiskAreaList_dateEnd!= "" && this.state.highRiskAreaList_dateBegin > this.state.highRiskAreaList_dateEnd) {
                message.error('提示：开始时间不能大于结束时间！');
                return;
            } else {
                let creds = {
                    currentPage: 1,
                    entityOrField: true,
                    pd: {
                        beginTime: this.state.highRiskAreaList_dateBegin,
                        endTime: this.state.highRiskAreaList_dateEnd,
                        highRiskAreaList_cityName: this.state.highRiskAreaList_cityName,
                    },
                    showCount: 10
                }
                store.dispatch(PostHighRiskLineData(creds));
                this.props.serchChange(
                    this.state.highRiskAreaList_cityName, this.state.highRiskAreaList_dateBegin, this.state.highRiskAreaList_dateEnd, )
            }
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
            let highRiskAreaList_cityName = this.state.highRiskAreaList_cityName;
            let highRiskAreaList_dateBegin = this.state.highRiskAreaList_dateBegin;
            let highRiskAreaList_dateEnd = this.state.highRiskAreaList_dateEnd;

            let beginDateValue = '';
            if (highRiskAreaList_dateBegin === '') {} else {
                beginDateValue = moment(highRiskAreaList_dateBegin, dateFormat);
            }
            let endDateValue = '';
            if (highRiskAreaList_dateEnd === '') {} else {
                endDateValue = moment(highRiskAreaList_dateEnd, dateFormat);
            }
            if ( this.state.highRiskAreaList_dateBegin!= "" && this.state.highRiskAreaList_dateEnd!= "" && this.state.highRiskAreaList_dateBegin > this.state.highRiskAreaList_dateEnd) {
                message.error('提示：开始时间不能大于结束时间！');
                return;
            }
            return (
                <div className="marLeft40 fl z_searchDiv">
                <label htmlFor="" className="font14">城市：</label>
                <Input style={{width:"130px",margin:"0 10px 0 0"}}   type="text"  id='highRiskAreaList_cityName' placeholder=''  value={highRiskAreaList_cityName}  onChange={this.handleNameChange} />
                <label htmlFor="" className="font14">创建时间：</label>
               <DatePicker  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={beginDateValue} placeholder="" onChange={this.handleBeginDeteClick}/>
                <span className="font14" style={{margin:"0 10px 0 0"}}>至</span>
                <DatePicker  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={endDateValue} placeholder="" onChange={this.handleEndDeteClick}/>
                <ShallowBlueBtn width="82" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                <ShallowBlueBtn  width="82" text="创建" margin="0 10px 0 0" onClick={this.props.handleClickAdd} />
                <Button style={{margin:'0 0 0 0px',width:"80px"}} onClick={this.showModal} className="btn_delete">
                          删除
                </Button>
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
            id: '',
            name: '',
            beginProvince: '',
            beginCity: '',
            endProvince: '',
            endCity: '',
            tjCity: '',
            beginDate: '',
            endDate: '',

        }
    }
    clear() {
        this.props.lineIdChange('');
        //关闭弹出框
        this.props.changeStatus("none");
        //关闭遮罩
        store.dispatch(changeShade("none"));
        this.setState({
            id: '',
            name: '',
            beginProvince: '',
            beginCity: '',
            endProvince: '',
            endCity: '',
            tjCity: '',
            beginDate: '',
            endDate: ''
        });
    }

    componentWillReceiveProps(nextProps) {
        //获取高危路线对象
        let highRiskLine = nextProps.highRiskLine;
        if (highRiskLine !== null) {
            this.setState({
                id: highRiskLine.id,
                name: highRiskLine.lineName,
                tjCity: highRiskLine.approachCity,
            })
        }
    }


    componentDidMount() {
            store.dispatch(fetchAreaProvinceData('/getProvinceList'));
        }
        //开始省份下拉框变更方法
    handleBeginProvinceChange = (value) => {
            this.setState({
                beginProvince: value,
            });
            store.dispatch(fetchAreaCityData('/getCityList', '', 'first'));
        }
        //开始城市下拉框变更方法
    handleBeginCityChange = (value) => {
            this.setState({
                beginCity: value,
            });
        }
        //终止省份下拉框变更方法
    handleEndProvinceChange = (value) => {
            this.setState({
                endProvince: value,
            });
            store.dispatch(fetchAreaCityData('/getCityList', '', 'second'));
        }
        //终止城市下拉框变更方法
    handleEndCityChange = (value) => {
            this.setState({
                endCity: value,
            });
        }
        //名称变更
    handleNameChange = (e) => {
            this.setState({
                name: e.target.value
            });
        }
        //途径城市变更
    handlTjCityChange = (e) => {
            this.setState({
                tjCity: e.target.value
            });
        }
        //高危时长结束时间变更
    handlEndDateChange = (date, dateString) => {
            this.setState({
                endDate: dateString
            });
        }
        //高危时长开始时间变更
    handlBeginDateChange = (date, dateString) => {
            this.setState({
                beginDate: dateString
            });
        }
        //关闭事件
    handleClose = () => {
            this.clear();
        }
        //创建事件
    handleCreate = () => {


        if (this.props.modalDialogueType === 'add') {
            console.log('add');
            const creds = {
                id: this.state.id,
                name: this.state.name,
                beginProvince: this.state.beginProvince,
                beginCity: this.state.beginCity,
                endProvince: this.state.endProvince,
                endCity: this.state.endCity,
                tjCity: this.state.tjCity,
                beginDate: this.state.beginDate,
                endDate: this.state.endDate,
                source: '901002',
                userName: sessionStorage.getItem('userName') || ''
            }
            store.dispatch(saveHighRiskLineData(creds, (e) => this.clear()));
        } else if (this.props.modalDialogueType === 'edit') {
            console.log('edit');
            const creds = {
                name: this.state.name,
                beginProvince: this.state.beginProvince,
                beginCity: this.state.beginCity,
                endProvince: this.state.endProvince,
                endCity: this.state.endCity,
                tjCity: this.state.tjCity,
                beginDate: this.state.beginDate,
                endDate: this.state.endDate,
                source: '901002',
                userName: sessionStorage.getItem('userName') || ''
            }
            store.dispatch(updateHighRiskLineData(creds, (e) => this.clear()));
        }

        // if(this.props.lineId === ''){//创建
        //     //保存
        //     store.dispatch(saveHighRiskLineData(creds));
        // }else{
        //     //更新
        //     store.dispatch(updateHighRiskLineData(creds));
        // }
        // //刷新页面
        // store.dispatch(PostHighRiskLineData('/getHighRiskLine'));
        // this.clear();


    }
    render() {
        let provinceList = store.getState().root.data.provinceList;
        let cityList = store.getState().root.data.cityList;
        let cityListReserve = store.getState().root.data.cityListReserve;
        let mdisplay = this.props.isShow;

        let beginDate = '';
        if (beginDate === '') {} else {
            beginDate = moment(beginDate, dateFormat);
        }
        let endDate = '';
        if (endDate === '') {} else {
            endDate = moment(endDate, dateFormat);
        }

        //线路ID
        let lineId = this.props.lineId;
        let buttonText;
        (lineId === "") ? buttonText = "创建": buttonText = "保存";
        return (
            <div style={{width:this.props.width,height:this.props.height,border:"1px solid #0C5F93",position:"fixed",left:"34%",top:'35%',zIndex:"9999",display:mdisplay}}>
                {/*头部*/}
                <div style={{background:"rgba(2, 24, 85, 0.9)",padding:"5px"}}>
                    <span style={{float:"left",fontSize:"16px",color:"#fff"}}>{(lineId === "") ? "创建":"详情"}</span><img src="/images/guanbi.png" style={{float:"right",marginTop:"5px",cursor:"pointer"}}  onClick={this.handleClose}/>
                    <div style={{clear:"both"}}></div>
                </div>
                {/*内容部分*/}
                <div style={{padding:"20px",background:"rgba(37, 51, 100, 0.9)"}}>
                    <div style={{marginBottom:"20px"}}>
                        <label style={mStyle} htmlFor="">线路名称</label>

                        <Input style={{width:"370px"}} type="hidden"  value={this.state.id}/>

                        <Input style={{width:"370px"}} onChange={this.handleNameChange}  value={this.state.name}/>
                    </div>
                    <div style={{marginBottom:"20px"}}>
                        <label style={mStyle} htmlFor="">起始城市</label>

                        {/*<SelectModel width="180px" list={provinceList} defaultValue={this.state.beginProvince} onChange={this.handleBeginProvinceChange} margin="0 10px 0 0"/>
                        <SelectModel width="180px" list={cityList} defaultValue={this.state.beginCity} onChange={this.handleBeginCityChange} />*/}

                    </div>
                    <div style={{marginBottom:"20px"}}>
                        <label style={mStyle} htmlFor="">终止城市</label>
                        {/*<SelectModel width="180px" list={provinceList} defaultValue={this.state.endProvince} onChange={this.handleEndProvinceChange} margin="0 10px 0 0"/>
                        <SelectModel width="180px" list={cityListReserve} defaultValue={this.state.endCity} onChange={this.handleEndCityChange} />*/}
                    </div>
                    <div style={{marginBottom:"20px"}}>
                        <label style={mStyle} htmlFor="">途径城市</label>
                        <Input  style={{width:"370px"}} onChange={this.handlTjCityChange}  value={this.state.tjCity}/>
                        {/*<ApproachCityTable />*/}
                        {/*<p style={{textAlign:"center",paddingLeft:"28px",margin:"10px 0"}}><a style={{color:"#fff"}}>添加</a></p>*/}

                    </div>
                    <div style={{marginBottom:"20px"}}>
                        <label style={{fontSize:"14px",color:"#fff",marginRight:"20px",width:"127px",float:"left",textAlign:"right"}} htmlFor="">设定为高危城市时长</label>
                        {/*<Input width="130px" margin="0 10px 0 0" type="date" id='highRiskLine_dateBegin' value={this.state.beginDate}  callbackParent={this.handlBeginDateChange}/>
                        <span style={{fontSize:"14px",color:"#fff",margin:"0 5px"}}>
                            至</span>
                        <Input width="135px" margin="0 10px 0 0" type="date" id='highRiskLine_dateEnd' value={this.state.endDate} callbackParent={this.handlEndDateChange}/>*/}
                        <DatePicker  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={beginDate} placeholder="" onChange={this.handlBeginDateChange}/>
                        <span className="font14" style={{margin:"0 10px 0 0"}}>至</span>
                        <DatePicker  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={endDate} placeholder="" onChange={this.handlEndDateChange}/>
                        
                    </div>
                    <div>
                        <ShallowBlueBtn width="40px" text={buttonText} margin="0 115px 0 155px"  onClick={this.handleCreate}/>
                        <DeepRedBtn width="40px" text="取消"  onClick={this.handleClose}/>
                    </div>
                </div>
            </div>
        );
    }
}
const mStyle = {
        fontSize: "14px",
        color: "#fff",
        marginRight: "20px",
        width: "56px",
        float: "left",
        textAlign: "right"
    }
    //select



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
const tableStyle2 = {
    width: "370px",
    // margin:"0 auto",
    border: "1px solid rgb(12, 95, 147)",
    // background:"rgba(12, 95, 147,0.4)"
    textAlign: "center",
    borderCollapse: "collapse",
    fontSize: "14px",
    color: "#fff"
}
const tdStyle2 = {
    border: "1px solid rgb(12, 95, 147)",
    height: "31px",
    // borderRight:"1px solid rgb(12, 95, 147)",
    // borderBottom:"1px solid rgb(12, 95, 147)"
    // background:"rgba(37, 51, 100, 0.8)"
}



HighRiskLine = Form.create()(HighRiskLine);
export default connect(mainReducer)(HighRiskLine);