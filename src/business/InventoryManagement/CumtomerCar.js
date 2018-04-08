/**
 * 盘查管理车辆盘查
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
    fetchCumtomerCarData
} from "../../actions/InventoryManagement";
import {
    changeShade
} from "../../actions/actions";
import {
    ShallowBlueBtn,
    Pag,
    Input,
    Shade
} from "../generalPurposeModule";
import {
    store
} from '../../index.js';
import * as constants from "../../utils/Constants";
import {
    DatePicker,
} from 'antd';

import {
    monthFormat,
    dateFormat
} from '../../utils/';

import moment from 'moment';
moment.locale('zh-cn');

const mStyle = {
        fontSize: "14px",
        color: "#fff",
        marginRight: "20px",
        width: "104px",
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
    padding: "18px 0"
}



export class CumtomerCar extends Component {
    constructor(props) { //初始化nowPage为1
        super(props);
        this.state = {
            nowPage: 1,
            ModalDialogueShow: 'none',
            lineId: '',
            highRiskLine: null,
            license_plate_no: '',
            police_idcard: '',
            beganDate: '',
            endDate: '',
            carState: ''
        };
        this.pageChange = this.pageChange.bind(this);
    }
    componentDidMount() {
            // this.props.dispatch(fetchHorrorSoftwareData('/getHorrorSoftware'));
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
        //查询更改
    searchChange = (license_plate_no, beganDate, endDate) => {
        this.setState({
            license_plate_no: license_plate_no,
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
                type: "904002",
                licensePlateNo: this.state.license_plate_no,
                beginTime: this.state.beganDate,
                endTime: this.state.endDate
            },
            showCount: constants.pageSize
        }

        store.dispatch(fetchCumtomerCarData('/getCarList', creds));
    }
    render() {
        let CumtomerCarList = store.getState().InventoryManagement.data.CumtomerCarList.result.list;
        let nowPage = this.state.nowPage;
        let Table;
        Table = <CITable  CumtomerCarList={CumtomerCarList} nowPage={nowPage}  lineIdChange={this.handleLineIdChange}/>
        let totalRecord = store.getState().InventoryManagement.data.CumtomerCarList.result.total;

        return (
            <div className="sliderWrap">
                <div className="sliderItemDiv">
                    {/*查询条件*/}
                    <div style={sliderdyHeader}>
                        <SearchArea   dispatch={this.props.dispatch} lineId={this.state.lineId} highRiskLine={this.state.highRiskLine} 
                        lineIdChange={this.handleLineIdChange}  createClick={this.handChangeModalDialogueShow} searchChange={this.searchChange}/>

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
class CITr extends Component {
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
                <td style={tdStyle}>{trData.license_plate_no}</td>
                <td style={tdStyle}>{trData.car_color}</td>
                <td style={tdStyle}>{trData.car_model}</td>
                <td style={tdStyle}>{trData.car_brand}</td>
                <td style={tdStyle}>{trData.vin_number}</td>
                <td style={tdStyle}>{trData.car_owner}</td>
                <td style={tdStyle}>{trData.car_owner_tel}</td>
                <td style={tdStyle}>{detailed}</td>
            </tr>
        );
    }
}
//表格
const CITable = React.createClass({
    render() {
        let CumtomerCarList = this.props.CumtomerCarList;

        let nowPage = this.props.nowPage;
        let recordNumber = parseInt((nowPage - 1) * constants.pageSize);

        let trs = [];
        for (var i = 0; i < CumtomerCarList.length; i++) {
            var trData = CumtomerCarList[i];
            let serial = recordNumber + i + 1;
            trs.push(
                <CITr trData={trData}  serial={serial} lineIdChange={this.props.lineIdChange}/>
            )
        }
        return (
            <table style={tableStyle}>
                <tr>
                    <td style={tdStyle}>序号</td>
                    <td  style={tdStyle}>车牌号</td>
                    <td  style={tdStyle}>车身颜色</td>
                    <td  style={tdStyle}>车辆型号</td>
                    <td  style={tdStyle}>车辆品牌</td>
                    <td  style={tdStyle}>VIN码</td>
                    <td  style={tdStyle}>车辆所有人</td>
                    <td  style={tdStyle}>车辆所有人电话</td>
                    <td  style={tdStyle}>操作</td>
                </tr>
                {trs}
            </table>
        )
    }
})

//姓名
let license_plate_no, police_idcard,
    beganDate, endDate, carState
let genderList = {
    data: [{
        text: "状态1",
        value: "1"
    }, {
        text: "状态2",
        value: "2"
    }]
};
//搜索区域内容组件
const SearchArea = React.createClass({
        getInitialState: function() {
            return {
                license_plate_no: '',
                beganDate: '',
                endDate: ''
            };
        },

        handleLicensePlateNoClick: function(id, value) {
            this.setState({
                license_plate_no: value,
            });
        },
        handleBeginDeteClick: function(date, dateString) {
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
                    type: "904002",
                    licensePlateNo: this.state.license_plate_no,
                    beginTime: this.state.beganDate,
                    endTime: this.state.endDate
                },
                showCount: constants.pageSize
            }

            store.dispatch(fetchCumtomerCarData('/getCarList', creds));
            this.props.searchChange(this.state.license_plate_no, this.state.beganDate, this.state.endDate);
        },
        handleClickClear: function() { //点击创建
            store.dispatch(changeShade('block'));
            this.props.createClick("block");

        },
        render() {
            let license_plate_no = this.state.license_plate_no;
            let beganDate = this.state.beganDate;
            let endDate = this.state.endDate;

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
                <label htmlFor="" className="font14">车牌号：</label>
                <Input width="131px" margin="0 10px 0 0"  type="text"  id='license_plate_no' placeholder='请输入车牌号'  value={license_plate_no}  callbackParent={this.handleLicensePlateNoClick} />
                <label htmlFor="" className="font14">开始时间：</label>
                <DatePicker  onChange={this.handleBeginDeteClick} format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={beginDateValue} />
                <label htmlFor="" className="font14">结束时间：</label>
                <DatePicker onChange={this.handleEndDeteClick}  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={endDateValue} />
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
            checktime: "",
            police_name: '',
            police_idcard: "",
            police_code: "",
            police_area: '',
            police_unitcode: '',
            imei: '',
            cid: "",
            type: "",
            license_plate_type: "",
            license_plate_no: "",
            car_color: "",
            car_model: "",
            car_brand: '',
            vin_number: '',
            car_owner: '',
            car_owner_tel: '',
            is_road_side: '',
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
            checktime: "",
            police_name: '',
            police_idcard: "",
            police_code: "",
            police_area: '',
            police_unitcode: '',
            imei: '',
            cid: "",
            type: "",
            license_plate_type: "",
            license_plate_no: "",
            car_color: "",
            car_model: "",
            car_brand: '',
            vin_number: '',
            car_owner: '',
            car_owner_tel: '',
            is_road_side: '',
            tags: ""
        });
    }
    componentWillReceiveProps(nextProps) {
        //获取白名单对象
        let highRiskLine = nextProps.highRiskLine;
        if (highRiskLine !== null) {
            this.setState({
                id: highRiskLine.id,
                checktime: highRiskLine.checktime,
                police_name: highRiskLine.police_name,
                police_idcard: highRiskLine.police_idcard,
                police_code: highRiskLine.police_code,
                police_area: highRiskLine.police_area,
                police_unitcode: highRiskLine.police_unitcode,
                imei: highRiskLine.imei,
                cid: highRiskLine.cid,
                type: highRiskLine.type,
                license_plate_type: highRiskLine.license_plate_type,
                license_plate_no: highRiskLine.license_plate_no,
                car_color: highRiskLine.car_color,
                car_model: highRiskLine.car_model,
                car_brand: highRiskLine.car_brand,
                vin_number: highRiskLine.vin_number,
                car_owner: highRiskLine.car_owner,
                car_owner_tel: highRiskLine.car_owner_tel,
                is_road_side: highRiskLine.is_road_side,
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
        let license_plate_type = this.state.license_plate_type;
        let license_plate_no = this.state.license_plate_no;
        let car_color = this.state.car_color;
        let car_model = this.state.car_model;
        let car_brand = this.state.car_brand;
        let vin_number = this.state.vin_number;
        let car_owner = this.state.car_owner;
        let car_owner_tel = this.state.car_owner_tel;
        let is_road_side = this.state.is_road_side;
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
                            <label style={mStyle} htmlFor="">号牌种类</label><Input width="272px"  value={license_plate_type} readOnly="readOnly"/>
                        </div>
                    </div>
                    <div style={{float:"left",width:"400px"}}>
                        
                        
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">车牌号</label><Input width="272px"  value={license_plate_no} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">车身颜色</label><Input width="272px"  value={car_color} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">车辆型号</label><Input width="272px"  value={car_model} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">车辆品牌</label><Input width="272px"  value={car_brand} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">VIN码</label><Input width="272px"  value={vin_number} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">车辆所有人</label><Input width="272px"  value={car_owner} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">车辆所有人电话</label><Input width="272px"  value={car_owner_tel} readOnly="readOnly"/>
                        </div>
                        <div style={{marginBottom:"10px"}}>
                            <label style={mStyle} htmlFor="">是否路边停靠</label><Input width="272px"  value={is_road_side} readOnly="readOnly"/>
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

export default connect(mainReducer)(CumtomerCar);