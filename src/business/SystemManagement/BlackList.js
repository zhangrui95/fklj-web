/**
 * 系统管理黑名单
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
    PostBlackListData,
    addBlackData,
    updateBlackData,
    DeleteBlackListData
} from "../../actions/SystemManagement";
import {
    changeShade
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
    TextArea
} from "../generalPurposeModule";
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
    monthFormat,
    dateFormat,
    serverUrl
} from '../../utils/';

import moment from 'moment';
moment.locale('zh-cn');

const mStyle = {
        fontSize: "14px",
        color: "#fff",
        marginRight: "20px",
        width: "156px",
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

export class BlackList extends Component {
    constructor(props) { //初始化nowPage为1
        super(props);
        this.state = {
            nowPage: 1,
            ModalDialogueShow: 'none',
            lineId: '',
            highRiskLine: null,
            blackList_softName: '',
            blackList_idNumber: '',
            blackList_dateBegin: '',
            blackList_dateEnd: '',
            ModalDialogueType: 'add',
            selectedRowsId: []

        };
        this.pageChange = this.pageChange.bind(this);
    }
    componentDidMount() {
            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {},
                showCount: constants.pageSize
            }
            store.dispatch(PostBlackListData(creds));
        }
        //修改弹出框展示状态
    handChangeModalDialogueShow = (value) => {
            this.setState({
                ModalDialogueShow: value,

            });
        }
        //选中表格行详情lineId变更方法
    handleLineIdChange = (value, highRiskLine = null) => { // 白名单ID    白名单对象
        this.setState({
            lineId: value, //id
            ModalDialogueType: 'edit',
            ModalDialogueShow: 'block',
            highRiskLine: highRiskLine, //对象
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
    handleDelete = () => {
        if (this.state.selectedRowsId.length === 0) {
            message.error('请选择要删除的项！');
            return;
        }
        let crads = {
            ids: this.state.selectedRowsId,
            userName: sessionStorage.getItem('userName') || ''
        };
        store.dispatch(DeleteBlackListData(crads));


        this.setState({
            selectedRowsId: []
        });


    }
    serchChange = (blackList_softName, blackList_idNumber, blackList_dateBegin, blackList_dateEnd) => {
        this.setState({
            nowPage: 1,
            blackList_softName: blackList_softName,
            blackList_idNumber: blackList_idNumber,
            blackList_dateBegin: blackList_dateBegin,
            blackList_dateEnd: blackList_dateEnd,
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
                beginTime: this.state.blackList_dateBegin,
                endTime: this.state.blackList_dateEnd,
                //根据接口修改相应的名称
                blackList_softName: this.state.blackList_softName,
                blackList_idNumber: this.state.blackList_idNumber,
            },
            showCount: constants.pageSize
        }
        store.dispatch(PostBlackListData(creds));
    }
    render() {
        let blackList = store.getState().SystemManagement.data.blackList.result.list;
        let isFetching = store.getState().SystemManagement.isFetching;
        let nowPage = this.state.nowPage;
        // let Table;
        // Table= <BlackListTable  blackList={blackList} nowPage={nowPage} lineIdChange={this.handleLineIdChange}/>
        let totalRecord = store.getState().SystemManagement.data.blackList.result.total;

        const columns = [{
            title: '序号',
            dataIndex: 'serial',
        }, {
            title: '名称',
            dataIndex: 'softName',
        }, {
            title: '图标',
            render: (text, record) => (
                <img src={text.imgsrc} style={{width:"30px",height:"30px"}}/>
            ),
        }, {
            title: '身份证',
            dataIndex: 'idNumber',
        }, {
            title: '布控时间',
            dataIndex: 'dispatchedDate',
        }, {
            title: '操作',
            key: 'action',
            // width: 30,
            render: (text, record) => (
                <span>
                        <span onClick={onClickEdit=>this.handleLineIdChange(record.id,record)} style={{cursor:'pointer'}}>编辑</span>
                </span>
            ),

        }];
        const data = [];
        let recordNumber = parseInt((nowPage - 1) * constants.pageSize);
        for (var i = 0; i < blackList.length; i++) {
            var blackData = blackList[i];
            let serial = recordNumber + i + 1;
            data.push({
                key: i,
                serial: serial,
                softName: blackData.softName,
                imgsrc: blackData.imgsrc,
                idNumber: blackData.idNumber,
                dispatchedDate: blackData.dispatchedDate,
                id: blackData.id,

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

        return (
            <div className="sliderWrap">
                <div className="sliderItemDiv">
                    {/*查询条件*/}
                    <div style={sliderdyHeader}>
                        <SearchArea   dispatch={this.props.dispatch}
                        lineId={this.state.lineId} highRiskLine={this.state.highRiskLine}
                        lineIdChange={this.handleLineIdChange}
                        createClick={this.handChangeModalDialogueShow}
                         handleClickAdd={this.handleClickAdd}
                        handleDelete={this.handleDelete}
                        serchChange={this.serchChange}
                        />

                        <div className="clear"></div>
                    </div>
                </div>
                {/*表格*/}
                <div className="z_slderRightBody">
                    {isFetching ===  true?
                        <div style={{textAlign:"center",position:"absolute",left:"45%",top:"50%"}}>
                            <Spin size="large" />
                        </div>:
                    <div style={{padding:"0 15px"}}>
                            <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered  pagination={false} />
                    </div>}
                    <div className="clear"></div>
                </div>
                {/*分页*/}
                <Pag pageSize={constants.pageSize} nowPage={nowPage} totalRecord={totalRecord} pageChange={this.pageChange} />
                <ModalDialogue width="720px" 
                isShow={this.state.ModalDialogueShow}  
                lineId={this.state.lineId} 
                highRiskLine={this.state.highRiskLine} 
                lineIdChange={this.handleLineIdChange} 
                changeStatus={this.handChangeModalDialogueShow}
                modalDialogueType={this.state.ModalDialogueType}
                />
            </div>


        );

    }
};


//涉恐软件行
class BlackListTr extends Component {
    constructor(props) {
            super(props);
            //绑定详情事件
            this.look = this.look.bind(this);
        }
        //查看详情事件
    look = () => {
        //毁掉函数表格行变更
        this.props.lineIdChange(this.props.trData.id, this.props.trData);
    }
    render() {
        let trData = this.props.trData;
        let detailed = <div style={{cursor:"pointer"}}   onClick={this.look}>详情</div>;
        return (
            <tr>
                <td style={tdStyle}>{this.props.serial}</td>
                <td style={tdStyle}>{trData.softName}</td>
                <td style={tdStyle}><img src={trData.imgsrc} width="30px" height="30px"/></td>
                <td style={tdStyle}>{trData.idNumber}</td>
                <td style={tdStyle}>{trData.dispatchedDate}</td>
                <td style={tdStyle}>{detailed}</td>
            </tr>
        );
    }
}


//姓名
let blackList_softName, blackList_idNumber,
    blackList_dateBegin,
    blackList_dateEnd;
//搜索区域内容组件
const SearchArea = React.createClass({
        getInitialState: function() {
            return {
                blackList_softName: '',
                blackList_idNumber: '',
                blackList_dateBegin: '',
                blackList_dateEnd: ''
            };
        },
        // onChildChanged: function (id,value) {
        //     if(id==='blackList_softName'){
        //         blackList_softName = value;
        //     }else  if(id==='blackList_idNumber'){
        //         blackList_idNumber = value;
        //     }else if(id==='blackList_dateBegin'){
        //         blackList_dateBegin =value;
        //     }else if(id==='blackList_dateEnd'){
        //         blackList_dateEnd =value;
        //     }
        //     this.setState({
        //         blackList_softName: blackList_softName,
        //         blackList_idNumber: blackList_idNumber,
        //         blackList_dateBegin:blackList_dateBegin,
        //         blackList_dateEnd:blackList_dateEnd
        //     });
        // },
        handleNameChange: function(e) {
            this.setState({
                blackList_softName: e.target.value
            });
        },
        handleIdNumberChange: function(e) {
            this.setState({
                blackList_idNumber: e.target.value
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
        handleClick: function() { //点击查询
            blackList_softName = this.state.blackList_softName;
            blackList_idNumber = this.state.blackList_idNumber;
            blackList_dateBegin = this.state.blackList_dateBegin;
            blackList_dateEnd = this.state.blackList_dateEnd;
            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    beginTime: this.state.blackList_dateBegin,
                    endTime: this.state.blackList_dateEnd,
                    //根据接口修改相应的名称
                    blackList_softName: this.state.blackList_softName,
                    blackList_idNumber: this.state.blackList_idNumber,
                },
                showCount: constants.pageSize
            }
            store.dispatch(PostBlackListData(creds));
            this.props.serchChange(
                this.state.blackList_softName, this.state.blackList_idNumber, this.state.blackList_dateBegin, this.state.blackList_dateEnd)
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
            let blackList_softName = this.state.blackList_softName;
            let blackList_idNumber = this.state.blackList_idNumber;
            let blackList_dateBegin = this.state.blackList_dateBegin;
            let blackList_dateEnd = this.state.blackList_dateEnd;
            let beginDateValue = '';
            if (blackList_dateBegin === '') {} else {
                beginDateValue = moment(blackList_dateBegin, dateFormat);
            }
            let endDateValue = '';
            if (blackList_dateEnd === '') {} else {
                endDateValue = moment(blackList_dateEnd, dateFormat);
            }
            return (
                <div className="marLeft40 fl z_searchDiv">
                <label htmlFor="" className="font14">姓名：</label>
                <Input  style={{width:"111px", margin:"0 10px 0 0"}} type="text"  id='blackList_softName' placeholder=''  value={blackList_softName}  onChange={this.handleNameChange} />
                <label htmlFor="" className="font14">身份证号</label>
                <Input style={{width:"202px", margin:"0 10px 0 0"}}  type="text" id='blackList_idNumber' placeholder='' value={blackList_idNumber} onChange={this.blackList_idNumber} />
                 <label htmlFor="" className="font14">创建时间：</label>
                {/*<Input width="125px" margin="0 10px 0 0" type="date" id='InterrogationInformation_dateBegin' value={InterrogationInformation_dateBegin}  callbackParent={this.onChildChanged}/>*/}
                <DatePicker  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={beginDateValue} placeholder='' onChange={this.handleBeginDeteClick}/>
                <span className="font14" style={{margin:"0 10px 0 0"}}>至</span>
                {/*<Input width="125px" margin="0 10px 0 0" type="date" id='InterrogationInformation_dateEnd' value={InterrogationInformation_dateEnd} callbackParent={this.onChildChanged}/>*/}
                <DatePicker  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={endDateValue} placeholder='' onChange={this.handleEndDeteClick}/>
                <ShallowBlueBtn width="82" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                <ShallowBlueBtn  width="82" text="创建" margin="0 10px 0 0" onClick={this.props.handleClickAdd} />
                <ShallowBlueBtn  width="82" text="导入"  />
                <Button style={{margin:'0 0 0 10px',width:"80px"}} onClick={this.showModal} className="btn_delete">
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
                imgPath: "",
                chineseName: '',
                englishName: '',
                idNumber: '',
                passportNo: '',
                anotherIdNumber: '',
                dateOfBirth: '',
                nationality: '',
                gender: '',
                imei: "",
                imsi: "",
                controlTime: "",
                dataSources: "",
                natureOfCase: "",
                img: null
            };
        }
        //关闭事件
    clear() {
        //清楚回调函数时间
        this.props.lineIdChange('');
        //关闭弹出框
        this.props.changeStatus("none");
        //关闭遮罩
        store.dispatch(changeShade("none"));
        this.setState({
            imgPath: "",
            chineseName: '',
            englishName: '',
            idNumber: '',
            passportNo: '',
            anotherIdNumber: '',
            dateOfBirth: '',
            nationality: '',
            gender: '',
            imei: "",
            imsi: "",
            controlTime: "",
            dataSources: "",
            natureOfCase: "",
            img: null
        });
    }
    componentWillReceiveProps(nextProps) {
            //获取白名单对象
            let highRiskLine = nextProps.highRiskLine;
            if (highRiskLine !== null) {
                this.setState({
                    id: highRiskLine.id,
                    chineseName: highRiskLine.softName,
                    idNumber: highRiskLine.idNumber,
                    remarks: highRiskLine.remarks,
                    img: highRiskLine.imgsrc,
                    dispatchedDate: highRiskLine.dispatchedDate,
                    imgPath: highRiskLine.imgsrc,
                })
            }
        }
        //创建事件
    handleCreate = () => {

            const chineseName = this.state.chineseName;
            const englishName = this.state.englishName;
            const idNumber = this.state.idNumber;
            const passportNo = this.state.passportNo;
            const anotherIdNumber = this.state.anotherIdNumber;
            const dateOfBirth = this.state.dateOfBirth;
            const nationality = this.state.nationality;
            const gender = this.state.gender;
            const imei = this.state.imei;
            const imsi = this.state.imsi;
            const controlTime = this.state.controlTime;
            const dataSources = this.state.dataSources;
            const natureOfCase = this.state.natureOfCase;
            const img = this.state.img;
            const id = this.state.id;
            if (this.props.modalDialogueType === 'add') {
                const creds = {
                    chineseName: chineseName,
                    englishName: englishName,
                    img: img,
                    idNumber: idNumber,
                    anotherIdNumber: anotherIdNumber,
                    passportNo: passportNo,
                    dateOfBirth: dateOfBirth,
                    nationality: nationality,
                    gender: gender,
                    imei: imei,
                    imsi: imsi,
                    controlTime: controlTime,
                    dataSources: dataSources,
                    natureOfCase: natureOfCase,
                    source: '901002',
                    userName: sessionStorage.getItem('userName') || ''

                }
                store.dispatch(addBlackData(creds, (e) => this.clear()));
            } else if (this.props.modalDialogueType === 'edit') {
                const creds = {
                    chineseName: chineseName,
                    englishName: englishName,
                    img: img,
                    idNumber: idNumber,
                    anotherIdNumber: anotherIdNumber,
                    passportNo: passportNo,
                    dateOfBirth: dateOfBirth,
                    nationality: nationality,
                    gender: gender,
                    imei: imei,
                    imsi: imsi,
                    controlTime: controlTime,
                    dataSources: dataSources,
                    natureOfCase: natureOfCase,
                    source: '901002',
                    userName: sessionStorage.getItem('userName') || '',
                    id: id
                }
                store.dispatch(updateBlackData(creds, (e) => this.clear()));
            }
            // if(this.props.lineId === ""){
            //     //保存
            //     store.dispatch(saveBlackData(creds));
            // }else{

            //     store.dispatch(updateBlackData(creds));
            // }

            //刷新页面
            store.dispatch(PostBlackListData('/getBlackList'));
            this.clear();
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
        //改变中文名称事件
    chineseNameChange = (e) => {
            this.setState({
                chineseName: e.target.value
            });
        }
        //改变英文名称事件
    englishNameChange = (e) => {
            this.setState({
                englishName: e.target.value
            });
        }
        //改变身份证事件
    idNumberChange = (e) => {
            this.setState({
                idNumber: e.target.value
            });
        }
        //改变其他护照号事件
    passportNoChange = (e) => {
            this.setState({
                passportNo: e.target.value
            });
        }
        //改变其他证件号事件
    anotherIdNumberChange = (e) => {
            this.setState({
                anotherIdNumber: e.target.value
            });
        }
        //改变出生日期事件
    dateOfBirthChange = (date, dateString) => {
            this.setState({
                dateOfBirth: dateString
            });
        }
        //改变国籍事件
    nationalityChange = (e) => {
            this.setState({
                nationality: e.target.value
            });
        }
        //改变性别事件
    genderChange = (id, value) => {
            this.setState({
                gender: value
            });
        }
        //改变IMEI事件
    imeiChange = (e) => {
            this.setState({
                imei: e.target.value
            });
        }
        //改变IMSI事件
    imsiChange = (e) => {
            this.setState({
                imsi: e.target.value
            });
        }
        //改变布控时间事件
    controlTimeChange = (date, dateString) => {
            this.setState({
                controlTime: dateString
            });
        }
        //改变数据来源事件
    dataSourcesChange = (e) => {
            this.setState({
                dataSources: e.target.value
            });
        }
        //改变案件性质事件
    natureOfCaseChange = (e) => {
        this.setState({
            natureOfCase: e.target.value
        });
    }
    render() {
        let mdisplay = this.props.isShow;
        let chineseName = this.state.chineseName;
        let englishName = this.state.englishName;
        let idNumber = this.state.idNumber;
        let passportNo = this.state.passportNo;
        let anotherIdNumber = this.state.anotherIdNumber;
        let dateOfBirth = this.state.dateOfBirth;
        let nationality = this.state.nationality;
        let imei = this.state.imei;
        let imsi = this.state.imsi;
        let gender = this.state.gender;
        let controlTime = this.state.controlTime;
        let dataSources = this.state.dataSources;
        let natureOfCase = this.state.natureOfCase;
        //线路ID
        let lineId = this.props.lineId;
        let buttonText;
        (lineId === "") ? buttonText = "创建": buttonText = "保存";
        let dateBirth = '';
        if (dateOfBirth === '') {} else {
            dateBirth = moment(dateOfBirth, dateFormat);
        }
        let controldate = '';
        if (controlTime === '') {} else {
            controldate = moment(controlTime, dateFormat);
        }
        return (

            <div style={{width:this.props.width,height:this.props.height,border:"1px solid #0C5F93",position:"fixed",left:"30%",top:'10%',zIndex:"9999",display:mdisplay}}>
                {/*头部*/}
                <div style={{background:"rgba(2, 24, 85, 0.9)",padding:"5px"}}>
                    <span style={{float:"left",fontSize:"16px",color:"#fff"}}>创建</span><img src="/images/guanbi.png" style={{float:"right",marginTop:"5px",cursor:"pointer"}}  onClick={this.handleClose}/>
                    <div style={{clear:"both"}}></div>
                </div>
                {/*内容部分*/}
                <div style={{padding:"20px",background:"rgba(37, 51, 100, 0.9)"}}>
                    <div style={{float:"left",position:"relative"}}>
                        <img src={this.state.imgPath===''?'/images/blackaddimg.png':this.state.imgPath} alt=""  ref="img" width="180px" height="213px"/>
                        <FileInput btnValue="上传"  type = "image" maxFileSize={3} multiple={false} onChange={this.handleChangeImg} width="180px" height="213px" left="0"/>
                    </div>
                    <div style={{width:"450px",float:"left"}}>
                        <div style={{marginBottom:"20px"}}>
                            <label style={mStyle} htmlFor="">中文名</label><Input style={{width:"272px"}} onChange={this.chineseNameChange}  value={chineseName}/>
                        </div>
                        <div style={{marginBottom:"20px"}}>
                            <label style={mStyle} htmlFor="">英文名</label><Input style={{width:"272px"}} onChange={this.englishNameChange} value={englishName}/>
                        </div>
                        <div style={{marginBottom:"20px"}}>
                            <label style={mStyle} htmlFor="">身份证号</label><Input style={{width:"272px"}} onChange={this.idNumberChange} value={idNumber}/>
                        </div>
                        <div style={{marginBottom:"20px"}}>
                            <label style={mStyle} htmlFor="">护照号</label><Input style={{width:"272px"}} onChange={this.passportNoChange} value={passportNo}/>
                        </div>
                        <div style={{marginBottom:"20px"}}>
                            <label style={mStyle} htmlFor="">其他证件号</label><Input style={{width:"272px"}} onChange={this.anotherIdNumberChange} value={anotherIdNumber}/>
                        </div>
                        <div style={{marginBottom:"20px"}}>
                            <label style={mStyle} htmlFor="">出生日期</label>
                            <DatePicker  format={dateFormat} allowClear={false} style={{width:"272px",marginRight:"10px"}} value={dateBirth} placeholder="" onChange={this.dateOfBirthChange}/>
                        </div>
                        <div style={{marginBottom:"20px"}}>
                            <label style={mStyle} htmlFor="">国籍</label><Input style={{width:"272px"}} onChange={this.nationalityChange} value={nationality}/>
                        </div>
                        <div style={{marginBottom:"20px"}}>
                            <label style={mStyle} htmlFor="">性别</label>
                            <Input style={{width:"272px"}} onChange={this.genderChange} value={gender}/>
                        </div>
                        <div style={{marginBottom:"20px"}}>
                            <label style={mStyle} htmlFor="">手机设备唯一识别(IMEI)</label><Input style={{width:"272px"}} onChange={this.imeiChange} value={imei}/>
                        </div>
                        <div style={{marginBottom:"20px"}}>
                            <label style={mStyle} htmlFor="">国际移动用户识别码(IMSI)</label><Input style={{width:"272px"}} onChange={this.imsiChange} value={imsi}/>
                        </div>
                        <div style={{marginBottom:"20px"}}>
                            <label style={mStyle} htmlFor="">布控时间</label>
                            <DatePicker  format={dateFormat} allowClear={false} style={{width:"272px",marginRight:"10px"}} value={controldate} placeholder="" onChange={this.controlTimeChange}/>
                        </div>
                        <div style={{marginBottom:"20px"}}>
                            <label style={mStyle} htmlFor="">数据来源</label><Input style={{width:"272px"}} onChange={this.dataSourcesChange} value={dataSources}/>
                        </div>
                        <div style={{marginBottom:"20px"}}>
                            <label style={mStyle} htmlFor="">案件性质</label><Input style={{width:"272px"}} onChange={this.natureOfCaseChange} value={natureOfCase}/>
                        </div>
                        <div>
                            <ShallowBlueBtn width="40px" text={buttonText} margin="0 80px 0 120px" onClick={this.handleCreate}/>
                            <DeepRedBtn width="40px" text="作废"  onClick={this.handleClose}/>
                        </div>
                    </div>
                    <div style={{clear:"both"}}></div>
                    
                </div>
            </div>
        );
    }
}


export default connect(mainReducer)(BlackList);