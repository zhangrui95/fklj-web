/**
 * 卡口管理人员盘查
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
    fetchCumtomerPersonnelData
} from "../../actions/InventoryManagement";
import {
    changeShade,
    fetchPoliceUnitsData,
    fetchPersonTagsData
} from "../../actions/actions";
import {
    ShallowBlueBtn,
    Input,
    Pag,
    SelectModel,
    Shade
} from "../generalPurposeModule";
import {
    store
} from '../../index.js';
import * as constants from "../../utils/Constants";
import {
    DatePicker
} from 'antd';

import {
    monthFormat,
    dateFormat
} from '../../utils/index';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

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


export class CumtomerPerson extends Component {
    constructor(props) { //初始化nowPage为1
            super(props);
            this.state = {
                nowPage: 1,
                ModalDialogueShow: 'none',
                lineId: '',
                highRiskLine: null,
                sfzh: '',
                name: '',
                beganDate: '',
                endDate: '',
                gender: ''
            };
            this.pageChange = this.pageChange.bind(this);
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
                ModalDialogueShow: 'block',
                highRiskLine: highRiskLine, //对象
            });
            //打开遮罩
            store.dispatch(changeShade("block"));
        }
        //查询变更
    serchChange = (sfzh, name, beganDate, endDate) => {
        this.setState({
            sfzh: sfzh,
            name: name,
            beganDate: beganDate,
            endDate: endDate
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
                type: "904005",
                name: this.state.name,
                idcard: this.state.sfzh,
                beginTime: this.state.beganDate,
                endTime: this.state.endDate
            },
            showCount: constants.pageSize
        }
        store.dispatch(fetchCumtomerPersonnelData('/getPersonList', creds)); //getPersonList_ly  getPersonList
    }

    render() {
        let CumtomerpersonnelList = store.getState().InventoryManagement.data.CumtomerpersonnelList.result.list;
        let nowPage = this.state.nowPage;
        let Table;
        Table = <PITable  CumtomerpersonnelList={CumtomerpersonnelList} nowPage={nowPage}  lineIdChange={this.handleLineIdChange}/>
        let totalRecord = store.getState().InventoryManagement.data.CumtomerpersonnelList.result.total;
        return (
            <div className="sliderWrap">
                <div className="sliderItemDiv">
                    {/*查询条件*/}
                    <div style={sliderdyHeader}>
                        <SearchArea   dispatch={this.props.dispatch} lineId={this.state.lineId} highRiskLine={this.state.highRiskLine} 
                        lineIdChange={this.handleLineIdChange}  createClick={this.handChangeModalDialogueShow} serchChange={this.serchChange} />

                        <div className="clear"></div>
                    </div>
                </div>
                {/*表格*/}
                <div className="z_slderRightBody">
                    <div>
                        {Table}
                    </div>
                    <div className="clear"></div>
                </div>
                {/*分页*/}
                <Pag pageSize={constants.pageSize} nowPage={nowPage} totalRecord={totalRecord} pageChange={this.pageChange} />
                {/*模态框*/}
                <ModalDialogue width="853px" isShow={this.state.ModalDialogueShow} lineId={this.state.lineId} highRiskLine={this.state.highRiskLine} lineIdChange={this.handleLineIdChange} changeStatus={this.handChangeModalDialogueShow}/>
            </div>


        );

    }
};


//行
class PITr extends Component {
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
                <td style={tdStyle}><img src={trData.zpurl} width='30px' height='30px'/></td>
                <td style={tdStyle}>{trData.name}</td>
                <td style={tdStyle}>{trData.idcard}</td>
                <td style={tdStyle}>{trData.sex}</td>
                <td style={tdStyle}>{trData.nation}</td>
                <td style={tdStyle}>{trData.birth}</td>
                <td style={tdStyle}>{trData.examinetype}</td>
                <td style={tdStyle}>{trData.tags}</td>
                <td style={tdStyle}>{detailed}</td>
            </tr>
        );
    }
}
//涉恐软件表格
const PITable = React.createClass({
    render() {
        let CumtomerpersonnelList = this.props.CumtomerpersonnelList;

        let nowPage = this.props.nowPage;
        let recordNumber = parseInt((nowPage - 1) * constants.pageSize);

        let trs = [];
        for (var i = 0; i < CumtomerpersonnelList.length; i++) {
            var trData = CumtomerpersonnelList[i];
            let serial = recordNumber + i + 1;
            trs.push(
                <PITr trData={trData}  serial={serial} lineIdChange={this.props.lineIdChange}/>
            )
        }
        return (
            <table style={tableStyle}>
                <tr>
                    <td style={tdStyle}>序号</td>
                    <td  style={tdStyle}>照片</td>
                    <td  style={tdStyle}>姓名</td>
                    <td  style={tdStyle}>身份证号</td>
                    <td  style={tdStyle}>性别</td>
                    <td  style={tdStyle}>民族</td>
                    <td  style={tdStyle}>出生日期</td>
                    <td  style={tdStyle}>类型</td>
                    <td  style={tdStyle}>标签</td>
                    <td  style={tdStyle}>操作</td>
                </tr>
                {trs}
            </table>
        )
    }
})

//姓名
let sfzh, name,
    beganDate, endDate,
    gender;
let genderList = {
    data: [{
        text: "男",
        value: "1"
    }, {
        text: "女",
        value: "2"
    }]
};
//搜索区域内容组件
const SearchArea = React.createClass({
        getInitialState: function() {
            return {
                sfzh: '',
                name: '',
                beganDate: '',
                endDate: ''
            };
        },
        handleSfzhClick: function(id, value) {
            this.setState({
                sfzh: value,
            });
        },
        handleNameClick: function(id, value) {
            this.setState({
                name: value,
            });
        },
        handleBeginDeteClick: function(date, dateString) {
            console.log(date, dateString)
            this.setState({
                beganDate: dateString,
            });

        },
        handleEndDeteClick: function(date, dateString) {
            this.setState({
                endDate: dateString,
            });
        },
        handleClick: function() { //点击查询
            let nowPage = this.props.nowPage;
            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    type: "904005",
                    name: this.state.name,
                    idcard: this.state.sfzh,
                    beginTime: this.state.beganDate,
                    endTime: this.state.endDate
                },
                showCount: constants.pageSize
            }

            store.dispatch(fetchCumtomerPersonnelData('/getPersonList', creds));

            this.props.serchChange(this.state.sfzh, this.state.name, this.state.beganDate, this.state.endDate);
        },
        handleClickClear: function() { //点击创建
            store.dispatch(changeShade('block'));
            this.props.createClick("block");
        },
        render() {
            let sfzh = this.state.sfzh;
            let name = this.state.name;
            let beganDate = this.state.beganDate;
            let endDate = this.state.endDate;
            let gender = this.state.gender

            let beginDateValue = '';
            if (beganDate === '') {} else {
                beginDateValue = moment(beganDate, dateFormat);
            }
            let endDateValue = '';
            if (endDate === '') {} else {
                endDateValue = moment(endDate, dateFormat);
            }
            return (
                <div className="marLeft40 fl z_searchDiv">
                <label htmlFor="" className="font14">姓名：</label>
                <Input width="121px" margin="0 10px 0 0"  type="text"  id='name' placeholder='请输入姓名'  value={name}  callbackParent={this.handleNameClick} />
                <label htmlFor="" className="font14">身份证号：</label>
                <Input width="157px" margin="0 10px 0 0"  type="text"  id='sfzh' placeholder='请输入身份证号'  value={sfzh}  callbackParent={this.handleSfzhClick} />
                {/* <label htmlFor="" className="font14">性别：</label>
                 <SelectModel width="100px" list={genderList.data} defaultValue={gender} onChange={this.handleRankChange} margin="0 10px 0 0"/>*/}
                <label htmlFor="" className="font14">开始时间：</label>
                {/*<Input width="125px" margin="0 10px 0 0" type="date" id='beganDate' value={beganDate}  callbackParent={this.onChildChanged}/>*/}
                <DatePicker   format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={beginDateValue} defaultValue="" onChange={this.handleBeginDeteClick}/>
                <label htmlFor="" className="font14">结束时间：</label>
                {/*<Input width="125px" margin="0 10px 0 0" type="date" id='endDate' value={endDate} callbackParent={this.onChildChanged}/>*/}
                <DatePicker  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={endDateValue} defaultValue="" onChange={this.handleEndDeteClick}/>
                <ShallowBlueBtn width="82" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
            </div>
            );
        }
    })
    //模态框组件
export class ModalDialogue extends Component {
    constructor(props) { //初始化nowPage为1
        super(props);
        this.state = {
            zpurl: '',
            name: "",
            idcard: '',
            sex: "",
            nation: "",
            birth: '',
            phoneNumber: '',
            checktime: "",
            police_name: '',
            police_idcard: "",
            police_code: "",
            police_area: '',
            police_unitcode: '',
            imei: '',
            cid: "",
            type: "",
            address: "",
            idcard_issuing_authority: "",
            idcard_expiry_date: "",
            id_card_photo_path: "",
            tags: ""
        };
    }
    clear() {
        this.props.lineIdChange('');
        //关闭弹出框
        this.props.changeStatus("none");
        //关闭遮罩
        store.dispatch(changeShade("none"));
        this.setState({
            zpurl: '',
            name: "",
            idcard: '',
            sex: "",
            nation: "",
            birth: '',
            phoneNumber: '',
            checktime: "",
            police_name: '',
            police_idcard: "",
            police_code: "",
            police_area: '',
            police_unitcode: '',
            imei: '',
            cid: "",
            type: "",
            address: "",
            idcard_issuing_authority: "",
            idcard_expiry_date: "",
            id_card_photo_path: "",
            tags: ""
        });
    }
    componentWillReceiveProps(nextProps) {
        //获取白名单对象
        let highRiskLine = nextProps.highRiskLine;
        if (highRiskLine !== null) {
            this.setState({
                id: highRiskLine.id,
                zpurl: highRiskLine.zpurl,
                name: highRiskLine.name,
                idcard: highRiskLine.idcard,
                sex: highRiskLine.sex,
                nation: highRiskLine.nation,
                birth: highRiskLine.birth,
                phoneNumber: highRiskLine.phoneNumber,
                checktime: highRiskLine.checktime,
                police_name: highRiskLine.police_name,
                police_idcard: highRiskLine.police_idcard,
                police_code: highRiskLine.police_code,
                police_area: highRiskLine.police_area,
                police_unitcode: highRiskLine.police_unitcode,
                imei: highRiskLine.imei,
                cid: highRiskLine.cid,
                type: highRiskLine.type,
                address: highRiskLine.address,
                idcard_issuing_authority: highRiskLine.idcard_issuing_authority,
                idcard_expiry_date: highRiskLine.idcard_expiry_date,
                id_card_photo_path: highRiskLine.id_card_photo_path,
                tags: highRiskLine.tags,
            })
        }
    }

    //关闭事件
    handleClose = () => {
        this.clear();
    }


    render() {
        let mdisplay = this.props.isShow;
        let zpurl = this.state.zpurl;
        let name = this.state.name;
        let idcard = this.state.idcard;
        let sex = this.state.sex;
        let nation = this.state.nation;
        let birth = this.state.birth;
        let phoneNumber = this.state.phoneNumber;
        let checktime = this.state.checktime;
        let police_name = this.state.police_name;
        let police_idcard = this.state.police_idcard;
        let police_code = this.state.police_code;
        let police_area = this.state.police_area;
        let police_unitcode = this.state.police_unitcode;
        let imei = this.state.imei;
        let cid = this.state.cid;
        let type = this.state.type;
        let address = this.state.address;
        let idcard_issuing_authority = this.state.idcard_issuing_authority;
        let idcard_expiry_date = this.state.idcard_expiry_date;
        let id_card_photo_path = this.state.id_card_photo_path;
        let tags = this.state.tags;
        //线路ID

        return (
            <div style={{width:this.props.width,height:this.props.height,border:"1px solid #0C5F93",position:"fixed",left:"27%",top:'19%',zIndex:"9999",display:mdisplay}}>
                {/*头部*/}
                <div style={{background:"rgba(2, 24, 85, 0.9)",padding:"5px"}}>
                    <span style={{float:"left",fontSize:"16px",color:"#fff"}}>详情</span><img src="/images/guanbi.png" style={{float:"right",marginTop:"5px",cursor:"pointer"}}  onClick={this.handleClose}/>
                    <div style={{clear:"both"}}></div>
                </div>
                {/*内容部分*/}
                <div style={{padding:"20px",background:"rgba(37, 51, 100, 0.9)"}}>
                    <div style={{float:"left",width:"400px"}}>
                         <div style={{marginBottom:"10px",}}>
                            <label style={mStyle} htmlFor="">照片</label><img src={zpurl} alt="" width='60px' height='70px'/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                        <label style={mStyle} htmlFor="">姓名</label><Input width="272px"  value={name} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">身份证号</label><Input width="272px" value={idcard} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">性别</label><Input width="272px"  value={sex} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">民族</label><Input width="272px"  value={nation} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">出生日期</label><Input width="272px"  value={birth} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">电话</label><Input width="272px" value={phoneNumber} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">盘查时间</label><Input width="272px"  value={checktime} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">警员姓名</label><Input width="272px" value={police_name} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">警员身份证号</label><Input width="272px"  value={police_idcard} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">警员代码</label><Input width="272px"  value={police_code} readOnly="readOnly"/>
                        </div>
                        
                    </div>
                    <div style={{float:"left",width:"400px",marginTop:"80px"}}>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">警员所在地区</label><Input width="272px"  value={police_area} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">警员所在单位</label><Input width="272px" value={police_unitcode} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">设备码</label><Input width="272px"  value={imei} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">设备码</label><Input width="272px"  value={cid} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">盘查类型</label><Input width="272px"  value={type} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">住址</label><Input width="272px"  value={address} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">身份证颁发机构</label><Input width="272px"  value={idcard_issuing_authority} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">身份证有效期</label><Input width="272px"  value={idcard_expiry_date} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">身份证照片地址</label><Input width="272px"  value={id_card_photo_path} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">标签</label><Input width="272px"  value={tags} readOnly="readOnly"/>
                        </div>
                    </div>
                    <div style={{clear:"both"}}></div>
                     

                </div>
            </div>
        );
    }
}
const mStyle = {
    fontSize: "14px",
    color: "#fff",
    marginRight: "20px",
    width: "104px",
    float: "left",
    textAlign: "right"
}

export default connect(mainReducer)(CumtomerPerson);