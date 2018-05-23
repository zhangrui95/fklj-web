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
    PostWhiteListData,
    addWhiteData,
    updateWhiteData,
    DeleteWhiteListData
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
    message,
    Input,
    Table,
    Button,
    Modal
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

export class WhiteList extends Component {
    constructor(props) { //初始化nowPage为1
        super(props);
        this.state = {
            nowPage: 1,
            ModalDialogueShow: 'none',
            lineId: '',
            highRiskLine: null,
            whiteList_softName: '',
            whiteList_idNumber: '',
            whiteList_dateBegin: '',
            whiteList_dateEnd: '',
            selectedRowsId: [],
            ModalDialogueType: 'add',
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
            store.dispatch(PostWhiteListData(creds));
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
        store.dispatch(DeleteWhiteListData(crads));


        this.setState({
            selectedRowsId: []
        });


    }
    serchChange = (whiteList_softName, whiteList_idNumber, whiteList_dateBegin, whiteList_dateEnd) => {
        this.setState({
            nowPage: 1,
            whiteList_softName: whiteList_softName,
            whiteList_idNumber: whiteList_idNumber,
            whiteList_dateBegin: whiteList_dateBegin,
            whiteList_dateEnd: whiteList_dateEnd,
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
                beginTime: this.state.whiteList_dateBegin,
                endTime: this.state.whiteList_dateEnd,
                whiteList_softName: this.state.whiteList_softName,
                whiteList_idNumber: this.state.whiteList_idNumber,
            },
            showCount: constants.pageSize
        }
        store.dispatch(PostWhiteListData(creds));
    }
    render() {
        let whiteList = store.getState().SystemManagement.data.whiteList.result.list;
        let nowPage = this.state.nowPage;
        // let Table;
        // Table= <WhiteListTable  whiteList={whiteList} nowPage={nowPage} lineIdChange={this.handleLineIdChange}/>
        let totalRecord = store.getState().SystemManagement.data.whiteList.result.total;
        let isFetching = store.getState().SystemManagement.isFetching;

        const columns = [{
            title: '序号',
            dataIndex: 'serial',
        }, {
            title: '名称',
            dataIndex: 'softName',
        }, {
            title: '照片',
            render: (text, record) => (
                <img src={text.imgsrc} style={{width:"30px",height:"30px"}}/>
            ),
        }, {
            title: '身份证',
            dataIndex: 'idNumber',
        }, {
            title: '描述',
            dataIndex: 'remarks',
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
        for (var i = 0; i < whiteList.length; i++) {
            var whiteData = whiteList[i];
            let serial = recordNumber + i + 1;
            data.push({
                key: i,
                serial: serial,
                softName: whiteData.softName,
                imgsrc: whiteData.imgsrc,
                idNumber: whiteData.idNumber,
                remarks: whiteData.remarks,
                id: whiteData.id,

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
                        <div>
                            <Table rowSelection={rowSelection} columns={columns} dataSource={data} bordered  pagination={pagination} />
                        </div>}
                    <div className="clear"></div>
                </div>
                {/*分页*/}
                {/*<Pag pageSize={constants.pageSize} nowPage={nowPage} totalRecord={totalRecord} pageChange={this.pageChange} />*/}
                {/*模态框*/}
                <ModalDialogue width="433px" 
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



export class WhiteListTr extends Component {
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
                <td style={tdStyle}>{trData.name}</td>
                <td style={tdStyle}><img src={trData.imgsrc} width="30px" height="30px"/></td>
                <td style={tdStyle}>{trData.idNumber}</td>
                <td style={tdStyle}>{trData.remarks}</td>
                <td style={tdStyle}>{detailed}</td>
            </tr>
        );
    }
}

const WhiteListTable = React.createClass({
    render() {
        let whiteList = this.props.whiteList.list;
        let trs = [];
        let nowPage = this.props.nowPage;
        let recordNumber = parseInt((nowPage - 1) * constants.pageSize);
        for (var i = 0; i < whiteList.length; i++) {
            var trData = whiteList[i];
            let serial = recordNumber + i + 1;
            trs.push(
                <WhiteListTr trData={trData} serial={serial} lineIdChange={this.props.lineIdChange}/> //把回调函数传到tr里
            )
        }
        return (
            <table style={tableStyle}>
                <tr>
                    {/*<th>序号</th>*/}
                    <td  style={tdStyle}>序号</td>
                    <td  style={tdStyle}>姓名</td>
                    <td  style={tdStyle}>照片</td>
                    <td  style={tdStyle}>身份证号</td>
                    <td  style={tdStyle}>描述</td>
                    <td  style={tdStyle}>操作</td>
                </tr>
                {trs}
            </table>
        )
    }
})

//姓名
let whiteList_softName, whiteList_idNumber,
    whiteList_dateBegin,
    whiteList_dateEnd;
//搜索区域内容组件
const SearchArea = React.createClass({
        getInitialState: function() {
            return {
                whiteList_softName: '',
                whiteList_idNumber: '',
                whiteList_dateBegin: '',
                whiteList_dateEnd: ''
            };
        },
        onChildChanged: function(id, value) {
            if (id === 'whiteList_softName') {
                whiteList_softName = value;
            } else if (id === 'whiteList_idNumber') {
                whiteList_idNumber = value;
            } else if (id === 'whiteList_dateBegin') {
                whiteList_dateBegin = value;
            } else if (id === 'whiteList_dateEnd') {
                whiteList_dateEnd = value;
            }
            this.setState({
                whiteList_softName: whiteList_softName,
                whiteList_idNumber: whiteList_idNumber,
                whiteList_dateBegin: whiteList_dateBegin,
                whiteList_dateEnd: whiteList_dateEnd
            });
        },
        handleNameChange: function(e) {
            this.setState({
                whiteList_softName: e.target.value
            });
        },
        handleIdNumberChange: function(e) {
            this.setState({
                whiteList_idNumber: e.target.value
            });
        },
        handleBeginDeteClick: function(date, dateString) {
            this.setState({
                whiteList_dateBegin: dateString,
            });
        },
        handleEndDeteClick: function(date, dateString) {
            this.setState({
                whiteList_dateEnd: dateString,
            });
        },
        handleClick: function() { //点击查询
            whiteList_softName = this.state.whiteList_softName;
            whiteList_idNumber = this.state.whiteList_idNumber;
            whiteList_dateBegin = this.state.whiteList_dateBegin;
            whiteList_dateEnd = this.state.whiteList_dateEnd;
            // var search='';
            // if(whiteList_softName!==''&&whiteList_softName!==undefined){
            //     search+='softName='+whiteList_softName+'&';
            // }
            // if(whiteList_idNumber!==''&&whiteList_idNumber!==undefined){
            //     search+='inNumber='+whiteList_idNumber+'&';
            // }
            // if(whiteList_dateBegin!==''&&whiteList_dateBegin!==undefined){
            //     search+='datebegin='+whiteList_dateBegin+'&';
            // }
            // if(whiteList_dateEnd!==''&&whiteList_dateEnd!==undefined){
            //     search+='deteend='+whiteList_dateEnd+'&';
            // }
            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    beginTime: this.state.whiteList_dateBegin,
                    endTime: this.state.whiteList_dateEnd,
                    whiteList_softName: this.state.whiteList_softName,
                    whiteList_idNumber: this.state.whiteList_idNumber,
                },
                showCount: constants.pageSize
            }
            store.dispatch(PostWhiteListData(creds));
            this.props.serchChange(
                this.state.whiteList_softName, this.state.whiteList_idNumber, this.state.whiteList_dateBegin, this.state.whiteList_dateEnd)
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
            let whiteList_softName = this.state.whiteList_softName;
            let whiteList_idNumber = this.state.whiteList_idNumber;
            let whiteList_dateBegin = this.state.whiteList_dateBegin;
            let whiteList_dateEnd = this.state.whiteList_dateEnd;

            let beginDateValue = '';
            if (whiteList_dateBegin === '') {} else {
                beginDateValue = moment(whiteList_dateBegin, dateFormat);
            }
            let endDateValue = '';
            if (whiteList_dateEnd === '') {} else {
                endDateValue = moment(whiteList_dateEnd, dateFormat);
            }
            return (
                <div className="marLeft40 fl z_searchDiv">
                <label htmlFor="" className="font14">姓名：</label>
                <Input style={{width:"111px" ,margin:"0 10px 0 0"}}  type="text"  id='whiteList_softName' placeholder=''  value={whiteList_softName}  onChange={this.handleNameChange} />
                <label htmlFor="" className="font14">身份证号</label>
                <Input style={{width:"202px" ,margin:"0 10px 0 0"}}  type="text" id='whiteList_idNumber' placeholder='' value={whiteList_idNumber} onChange={this.handleIdNumberChange} />
                <label htmlFor="" className="font14">创建时间：</label>
                <DatePicker placeholder='' format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={beginDateValue} defaultValue="" onChange={this.handleBeginDeteClick}/>
                <span className="font14" style={{margin:"0 10px 0 0"}}>至</span>
                <DatePicker placeholder='' format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={endDateValue} defaultValue="" onChange={this.handleEndDeteClick}/>
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
            name: '',
            idNumber: "",
            workUnit: "",
            post: "",
            remarks: '',
            img: null,
            id: ""
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
            idNumber: "",
            workUnit: "",
            post: "",
            remarks: '',
            img: null,
            id: ""
        });
    }

    componentWillReceiveProps(nextProps) {
        //获取白名单对象
        let highRiskLine = nextProps.highRiskLine;
        if (highRiskLine !== null) {
            this.setState({
                id: highRiskLine.id,
                name: highRiskLine.name,
                idNumber: highRiskLine.idNumber,
                remarks: highRiskLine.remarks,
                img: highRiskLine.imgsrc,
                imgPath: highRiskLine.imgsrc,
            })
        }
    }

    //创建事件
    handleCreate = () => {

            const name = this.state.name;
            const idNumber = this.state.idNumber;
            const workUnit = this.state.workUnit;
            const remarks = this.state.remarks;
            const img = this.state.img;
            const post = this.state.post;


            if (this.props.modalDialogueType === 'add') {
                console.log('add');
                const creds = {
                    name: name,
                    remarks: remarks,
                    img: img,
                    idNumber: idNumber,
                    workUnit: workUnit,
                    post: post,
                    source: '901002',
                    userName: sessionStorage.getItem('userName') || ''
                }
                store.dispatch(addWhiteData(creds, (e) => this.clear()));
            } else if (this.props.modalDialogueType === 'edit') {
                console.log('edit');
                const creds = {
                    id: this.state.id,
                    name: name,
                    remarks: remarks,
                    img: img,
                    idNumber: idNumber,
                    workUnit: workUnit,
                    post: post,
                    source: '901002',
                    userName: sessionStorage.getItem('userName') || ''
                }
                store.dispatch(updateWhiteData(creds, (e) => this.clear()));
            }
            //保存
            //store.dispatch(addWhiteData(creds));
            // if(this.props.lineId === ''){//创建
            //     //保存
            //     store.dispatch(addWhiteData(creds));
            // }else{
            //     //更新
            //     store.dispatch(updateWhiteData(creds));
            // }
            // //刷新页面
            // store.dispatch(PostWhiteListData('/getWhiteList'));
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
        //名称
    nameChange = (e) => {
            this.setState({
                name: e.target.value
            });
        }
        //身份证事件
    idNumberChange = (e) => {
            this.setState({
                idNumber: e.target.value
            });
        }
        //工作单位
    workUnitChange = (e) => {
            this.setState({
                workUnit: e.target.value
            });
        }
        //职务
    postChange = (e) => {
            this.setState({
                post: e.target.value
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
        let idNumber = this.state.idNumber;
        let workUnit = this.state.workUnit;
        let post = this.state.post;
        let remarks = this.state.remarks;
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
                        <label style={mStyle} htmlFor="">姓名</label><Input style={{width:"272px"}} onChange={this.nameChange}  value={name}/>
                    </div>
                    <div style={{marginBottom:"20px"}}>
                        <label style={mStyle} htmlFor="">身份证号</label><Input style={{width:"272px"}} onChange={this.idNumberChange}  value={idNumber}/>
                    </div>
                    <div style={{marginBottom:"20px",position:"relative"}}>
                        <span style={mStyle}>照片</span>
                        {/*<div style={{background: "rgba(37, 51, 100,0.8)",opacity: 0.8,border: "1px solid #0C5F93",color:"#fff",float:"left",width:"50px",height:"50px",textAlign:"center"}}>
                            <span style={{fontSize:"30px",color:"#0C5F93"}}>+</span>
                        </div>*/}
                         <img src={this.state.imgPath===''?'/images/addp.png':this.state.imgPath} alt=""  ref="img"   width={'60px'} height={'60px'}/>
                        <FileInput btnValue="上传" type = "image" maxFileSize={3} multiple={false} onChange={this.handleChangeImg} width="60px" height="60px" left="50px"/>
                        <div style={{clear:"both"}}></div>
                    </div>
                    <div style={{marginBottom:"20px"}}>
                        <label style={mStyle} htmlFor="">工作单位</label><Input style={{width:"272px"}}  onChange={this.workUnitChange}  value={workUnit}/>
                    </div>
                    <div style={{marginBottom:"20px"}}>
                        <label style={mStyle} htmlFor="">职务</label><Input style={{width:"272px"}}  onChange={this.postChange}  value={post}/>
                    </div>
                    <div style={{marginBottom:"20px"}}>
                        <label style={{fontSize:"14px",color:"#fff",marginRight:"20px",verticalAlign: "top",width:"56px",float:"left",textAlign:"right"}} htmlFor="">备注</label>
                        <TextArea width="272px" height="50px"  callbackParent={this.remarksChange} value={remarks}/>
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



export default connect(mainReducer)(WhiteList);