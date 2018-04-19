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
  fetchCarInventoryData,
  fetchRelevancePersonData
} from "../../actions/InventoryManagement";
import {
  changeShade,
  fetchPoliceUnitsData,
  fetchCarTagsData,
  api
} from "../../actions/actions";
import {
  ShallowBlueBtn,
  Pag,
  Input
} from "../generalPurposeModule";
import {
  store
} from '../../index.js';
import * as constants from "../../utils/Constants";
import {
  DatePicker,
  Select,
  Tag,
  Button,
  Icon
} from 'antd';

import {
  EmptyData
} from "../../components/EmptyData";
import {
  monthFormat,
  dateFormat,
  serverUrl
} from '../../utils/';
import {
  Spin
} from 'antd';
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
    padding: "18px 0",
    overflow: "hidden"
}


export class CarInventory extends Component {
  constructor(props) { //初始化nowPage为1
    super(props);
    this.state = {
      nowPage: 1,
      ModalDialogueShow: 'none',
      ReactionModalDialogueShow: 'none',
      RelationPersonModleShow: 'none',
      lineId: '',
      highRiskLine: null,
      license_plate_no: '',
      police_idcard: '',
      beginDate: '',
      endDate: '',
      carState: '',
      tags: [],
      police_name: '',
      police_unitcode: '',
      vin_number: ''
    };
    this.pageChange = this.pageChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      this.setState({
        nowPage: 1,
      });

      let creds = {
        currentPage: 1,
        entityOrField: true,
        pd: {
          type: nextProps.type //"904005"
        },
        showCount: constants.pageSize
      }
      store.dispatch(fetchCarInventoryData(creds));
    }
  }

  componentDidMount() {
    let creds = {
      currentPage: 1,
      entityOrField: true,
      pd: {
        type: this.props.type //"904005"
      },
      showCount: constants.pageSize
    }
    store.dispatch(fetchCarInventoryData(creds));
    store.dispatch(fetchCarTagsData()); //获取车辆标签字典


    let unitsCreds = {
      currentPage: 1,
      entityOrField: true,
      pd: {
        prefix: '' //前缀
      },
      showCount: 9999
    }
    store.dispatch(fetchPoliceUnitsData(unitsCreds));
  }

  //修改弹出框展示状态
  handChangeModalDialogueShow = (value) => {
    this.setState({
      ModalDialogueShow: value,
    });
  }
  handChangeModalReactionShow = (value) => {
    this.setState({
      ReactionModalDialogueShow: value,
    });
  }
  handleRelationPersonModleShow = (value) => {
    this.setState({
      RelationPersonModleShow: value,
    });
  }
  //选中表格行详情lineId变更方法
  handleLineIdChange = (value, highRiskLine = null) => {
    this.setState({
      lineId: value, //id
      ModalDialogueShow: 'block',
      highRiskLine: highRiskLine, //对象
    });
    //打开遮罩
    store.dispatch(changeShade("block"));
  }
  //选中表格行的人员变更方法
  handleReactionLineIdChange = (value, RiskLine = null) => { // 关联车辆详情
    this.setState({
      lineId: value, //id
      ReactionModalDialogueShow: 'block',
      RiskLine: RiskLine, //对象
    });
    //打开遮罩
    store.dispatch(changeShade("block"));
  }

  //查询更改
  searchChange = (license_plate_no, beginDate, endDate, vin_number, police_unitcode, police_name, tags) => {
    this.setState({
      nowPage: 1,
      license_plate_no: license_plate_no,
      beginDate: beginDate,
      endDate: endDate,
      tags: tags,
      police_name: police_name,
      police_unitcode: police_unitcode,
      vin_number: vin_number
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
        type: this.props.type,
        licensePlateNo: this.state.license_plate_no,
        beginTime: this.state.beginDate,
        endTime: this.state.endDate,
        tags: this.state.tags,
        police_name: this.state.police_name,
        police_unitcode: this.state.police_unitcode,
        vin_number: this.state.vin_number
      },
      showCount: constants.pageSize
    }

    store.dispatch(fetchCarInventoryData(creds));
  }

  render() {
    let isFetching = store.getState().InventoryManagement.isFetching;
    let CarInventoryList = store.getState().InventoryManagement.data.CarInventoryList.result.list;
    let nowPage = this.state.nowPage;
    let Table;
    Table = <CITable CarInventoryList={CarInventoryList} nowPage={nowPage} lineIdChange={this.handleLineIdChange}
                     ReactionlineIdChange={this.handleReactionLineIdChange}/>
    let totalRecord = store.getState().InventoryManagement.data.CarInventoryList.result.total;

    return (
      <div className="sliderWrap">
        <div className="sliderItemDiv">
          {/*查询条件*/}
          <div style={sliderdyHeader}>
            <SearchArea dispatch={this.props.dispatch} lineId={this.state.lineId} type={this.props.type}
                        lineIdChange={this.handleLineIdChange} createClick={this.handChangeModalDialogueShow}
                        searchChange={this.searchChange}/>

            <div className="clear"></div>
          </div>
        </div>


        {isFetching === true ?

          <div style={{textAlign: "center", position: "absolute", left: "47%", top: "50%"}}>
            <Spin size="large"/>
          </div>

          :
          parseInt(totalRecord) > 0 ?
            <div>
              {/*表格*/}
              <div className="z_slderRightBody">
                <div>
                  {Table}
                </div>
                <div className="clear"></div>
              </div>
              {/*分页*/}
              <Pag pageSize={constants.pageSize} nowPage={nowPage} totalRecord={totalRecord}
                   pageChange={this.pageChange}/>
              {/*模态框*/}
              <ModalDialogue width="52%" isShow={this.state.ModalDialogueShow} lineId={this.state.lineId}
                             highRiskLine={this.state.highRiskLine} lineIdChange={this.handleLineIdChange}
                             changeStatus={this.handChangeModalDialogueShow}/>
              {/*关联人员模态框*/}
              <RelationPersonModle width="52%" isShow={this.state.ReactionModalDialogueShow}
                                   lineId={this.state.lineId} riskLine={this.state.RiskLine}
                                   ReactionlineIdChange={this.handleReactionLineIdChange}
                                   changeStatus={this.handChangeModalReactionShow}/>

            </div>
            :
            <EmptyData/>
        }


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
  //关联人员
  relevancePerson = () => {
    this.props.ReactionlineIdChange(this.props.trData.id, this.props.trData);
  }

  render() {
    let trData = this.props.trData;

    let detailed;
    if (trData.related_car_id === '0') {
      detailed = <div style={{cursor: "pointer"}}><span onClick={this.look}>详情</span></div>;
    } else {
      detailed = <div style={{cursor: "pointer"}}><span onClick={this.look}>详情</span> &nbsp;|&nbsp;<span
        onClick={this.relevancePerson}>关联人员</span></div>;
    }


    //let detailed=<div style={{cursor:"pointer"}}><span onClick={this.look}>详情</span>&nbsp;|&nbsp;<span onClick={this.relevancePerson}>关联人员</span></div>;
    return (
      <tr>
        <td style={tdStyle}>{this.props.serial}</td>
        <td style={tdStyle}>{trData.license_plate_no}</td>
        <td style={tdStyle}>{trData.vin_number}</td>
        <td style={tdStyle}>{trData.tags}</td>
        <td style={tdStyle}>{trData.checktime}</td>
        <td style={tdStyle}>{trData.police_name}</td>
        <td style={tdStyle}>{trData.police_unit}</td>
        <td style={tdStyle}>{detailed}</td>
      </tr>
    );
  }
}

//表格
const CITable = React.createClass({
  render() {
    let CarInventoryList = this.props.CarInventoryList;

    let nowPage = this.props.nowPage;
    let recordNumber = parseInt((nowPage - 1) * constants.pageSize);

    let trs = [];
    for (var i = 0; i < CarInventoryList.length; i++) {
      var trData = CarInventoryList[i];
      let serial = recordNumber + i + 1;
      trs.push(
        <CITr trData={trData} serial={serial} lineIdChange={this.props.lineIdChange}
              ReactionlineIdChange={this.props.ReactionlineIdChange}
              relationPersonlineIdChange={this.props.relationPersonlineIdChange}/>
      )
    }
    return (
      <table style={tableStyle}>
        <tr>
          <td style={tdStyle}>序号</td>
          <td style={tdStyle}>车牌号</td>
          <td style={tdStyle}>VIN码</td>
          <td style={tdStyle}>标签</td>
          <td style={tdStyle}>盘查时间</td>
          <td style={tdStyle}>警员</td>
          <td style={tdStyle}>单位</td>
          {/*     <td  style={tdStyle}>车身颜色</td>
                     <td  style={tdStyle}>车辆型号</td>
                     <td  style={tdStyle}>车辆品牌</td>
                     <td  style={tdStyle}>车辆所有人</td>
                     <td  style={tdStyle}>车辆所有人电话</td>*/}
          <td style={tdStyle}>操作</td>
        </tr>
        {trs}
      </table>
    )
  }
})

//姓名
let license_plate_no, police_idcard, unitSelected,
  beginDate, endDate, carState, vin_number, police_name, tagsSelect
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
  getInitialState: function () {
    return {
      license_plate_no: '',
      beginDate: '',
      endDate: '',
      vin_number: '',
      police_name: '',
      unitSelected: '',
      tagsSelect: []
    };
  },
  init: function () {
    this.setState({
      license_plate_no: '',
      beginDate: '',
      endDate: '',
      vin_number: '',
      police_name: '',
      unitSelected: '',
      tagsSelect: []
    });
  },
  componentWillReceiveProps: function (nextProps) {
    if (this.props.type !== nextProps.type) {
      this.init();
    }
  },
  handleVINClick: function (id, value) {
    this.setState({
      vin_number: value,
    });
  },
  handleLicensePlateNoClick: function (id, value) {
    this.setState({
      license_plate_no: value,
    });
  },
  handleBeginDeteClick: function (date, dateString) {
    this.setState({
      beginDate: dateString,
    });

  },
  handlePoliceNameClick: function (date, dateString) {
    this.setState({
      police_name: dateString,
    });

  },

  handleEndDeteClick: function (date, dateString) {
    this.setState({
      endDate: dateString,
    });
  },
  //下拉选择器的回调函数
  handleSelectChange: function (value) {
    // console.log(`selected ${value}`);
    this.setState({
      unitSelected: value
    });
  },
  ontagsChange: function (value) {
    this.setState({
      tagsSelect: value
    });
  },
  handleClick: function () { //点击查询
    let nowPage = this.props.nowPage;
    let creds = {
      currentPage: 1,
      entityOrField: true,
      pd: {
        type: this.props.type,
        licensePlateNo: this.state.license_plate_no,
        beginTime: this.state.beginDate,
        endTime: this.state.endDate,
        police_name: this.state.police_name,
        tags: this.state.tagsSelect,
        police_unitcode: this.state.unitSelected,
        vin_number: this.state.vin_number
      },
      showCount: constants.pageSize
    }
    store.dispatch(fetchCarInventoryData(creds));
    this.props.searchChange(this.state.license_plate_no, this.state.beginDate, this.state.endDate, this.state.vin_number, this.state.unitSelected, this.state.police_name, this.state.tagsSelect);
  },
  handleClickExport: function () { //点击导出
    this.handleClick();
    let url = api + '/data/exportCarExcel';
    url += '?type=' + this.props.type;
    url += '&licensePlateNo=' + this.state.license_plate_no;
    url += '&vin_number=' + this.state.vin_number;
    url += '&beginTime=' + this.state.beginDate;
    url += '&endTime=' + this.state.endDate;
    url += '&police_unitcode=' + this.state.unitSelected;
    url += '&police_name=' + this.state.police_name;
    url += '&tags=' + this.state.tagsSelect;
    url += '&Authorization=' + sessionStorage.getItem('id_token') || '';
    window.open(url);
  },
  handleClickClear: function () { //点击创建
    store.dispatch(changeShade('block'));
    this.props.createClick("block");

  },

  render() {
    //警员单位列表
    let policeUnitsList = store.getState().root.data.policeUnitsList;
    let policeUnitsOptions = [];
    for (var i = 0; i < policeUnitsList.length; i++) {
      var policeUnit = policeUnitsList[i];
      let key = "policeUnitsList" + policeUnit.code + "_" + i;
      policeUnitsOptions.push(
        <Option key={key} valu={policeUnit.code}>{policeUnit.text}</Option>
      )
    }
    //车辆标签列表
    let carTagsList = store.getState().root.data.carTagsList;
    let carTagsOptions = [];
    for (var i = 0; i < carTagsList.length; i++) {
      var carTag = carTagsList[i];
      carTagsOptions.push(
        <Option key={carTag.code}>{carTag.text}</Option>
      )
    }

    let license_plate_no = this.state.license_plate_no;
    let beginDate = this.state.beginDate;
    let endDate = this.state.endDate;
    let endTime = this.state.endDate;
    let police_name = this.state.police_name;
    let vin_number = this.state.vin_number;
    let unitSelected = this.state.unitSelected;
    let tagsSelect = this.state.tagsSelect;

    let beginDateValue = '';
    if (beginDate === '') {
    } else {
      beginDateValue = moment(beginDate, dateFormat);
    }
    let endDateValue = '';
    if (endDate === '') {
    } else {
      endDateValue = moment(endDate, dateFormat);
    }

    return (
      <div>
        <div className="marLeft40 z_searchDiv">
          <label htmlFor="" className="font14">车牌号：</label>
          <Input
            width="131px"
            margin="0 10px 0 0"
            type="text"
            id='license_plate_no'
            placeholder='请输入车牌号'
            value={license_plate_no}
            callbackParent={this.handleLicensePlateNoClick}
          />
          <label htmlFor="" className="font14">V I N码：</label>
          <Input width="140px" margin="0 10px 0 0" type="text" id='vin_number' placeholder='请输入VIN码' value={vin_number}
                 callbackParent={this.handleVINClick}/>

          <label htmlFor="" className="font14">单位：</label>
          <Select
            showSearch
            style={{width: 200}}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.handleSelectChange}
            value={unitSelected}
            defaultValue=""
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="" key="all">全部</Option>
            {policeUnitsOptions}

          </Select>
          <label htmlFor="" className="font14">起止时间：</label>
          <DatePicker format={dateFormat} allowClear={false} style={{marginRight: "10px"}} value={beginDateValue}
                      defaultValue="" onChange={this.handleBeginDeteClick}/>
          <span className="font14" style={{marginRight: "10px"}}>至</span>
          <DatePicker format={dateFormat} allowClear={false} style={{marginRight: "10px"}} value={endDateValue}
                      defaultValue="" onChange={this.handleEndDeteClick}/>

        </div>
        <div style={{marginLeft: "2%", marginTop: "20px"}}>
          <label htmlFor="" className="font14">警员姓名：</label>
          <Input width="121px" margin="0 10px 0 0" type="text" id='police_name' placeholder='请输入警员姓名'
                 value={police_name} callbackParent={this.handlePoliceNameClick}/>
          <label htmlFor="" className="font14">标签：</label>
          {/*标签*/}
          <Select key='tagselect'
                  mode="multiple"
                  style={{width: 540, marginRight: "10px"}}
                  placeholder="请选择车辆标签"
            //defaultValue={['a10', 'c12']}
                  onChange={this.ontagsChange}
                  value={tagsSelect}
          >
            {carTagsOptions}
          </Select>
          <ShallowBlueBtn width="82" text="查询" margin="0 10px 0 0" onClick={this.handleClick}/>
          <ShallowBlueBtn width="82" text="重置" margin="0 10px 0 0" onClick={this.init}/>
          {/*<ShallowBlueBtn width="82" text="导出" margin="0 10px 0 0" onClick={this.handleClickExport} />*/}

          <Button style={{margin: '0 10px 0 0', width: "82px"}} onClick={this.handleClickExport} className="btn_ok">
            <Icon type="download"/> 导出
          </Button>

        </div>
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
      tags: "",
      police_unit: ''
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
      tags: "",
      police_unit: ''
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
        police_unit: highRiskLine.police_unit,
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
    let police_unit = this.state.police_unit;

    let tags = this.state.tags;
    //车辆标签
    let tagsArrCar = [];
    if (tags !== '' && tags !== null && tags !== undefined) {
      let tagsList = tags.split(",");
      for (var i = 0; i < tagsList.length; i++) {
        var tagsItem = tagsList[i];
        tagsArrCar.push(
          <Tag color="blue">{tagsItem}</Tag>
        );
      }
    } else {
      tagsArrCar.push(
        <span style={{fontSize: "14px", color: "#108ee9"}}>暂无标签</span>
      );

    }


    return (
      <div style={{
        width: this.props.width,
        height: this.props.height,
        border: "1px solid #0C5F93",
        position: "fixed",
        left: "25%",
        top: '10%',
        zIndex: "9999",
        display: mdisplay,
      }}>
        {/*头部*/}
        <div style={{background: "rgba(2, 24, 85, 0.9)", padding: "5px"}}>
          <span style={{float: "left", fontSize: "16px", color: "#fff"}}>详情</span><img src="/images/guanbi.png" style={{
          float: "right",
          marginTop: "5px",
          cursor: "pointer"
        }} onClick={this.handleClose}/>
          <div style={{clear: "both"}}></div>
        </div>
        {/*内容部分*/}
        <div style={{padding: "20px", background: "rgba(37, 51, 100, 0.9)"}}>
          <div>
            <p style={{fontSize: "16px", color: "#fff", marginBottom: "20px"}}>车辆信息</p>
            <div style={{float: "left", width: "47%"}}>
              <div style={{marginBottom: "10px"}}>
                <label style={mStyle} htmlFor="">车辆牌号:</label><Input width="60%" value={license_plate_no}
                                                                     readOnly="readOnly"/>
              </div>
              <div style={{marginBottom: "10px"}}>
                <label style={mStyle} htmlFor="">车辆品牌:</label><Input width="60%" value={car_brand} readOnly="readOnly"/>
              </div>
              <div style={{marginBottom: "10px"}}>
                <label style={mStyle} htmlFor="">车辆型号:</label><Input width="60%" value={car_model} readOnly="readOnly"/>
              </div>
              <div style={{marginBottom: "10px"}}>
                <label style={mStyle} htmlFor="">车身颜色:</label><Input width="60%" value={car_color} readOnly="readOnly"/>
              </div>
              <div style={{marginBottom: "10px"}}>
                <label style={mStyle} htmlFor="">VIN码:</label><Input width="60%" value={vin_number}
                                                                     readOnly="readOnly"/>
              </div>
            </div>
            <div style={{float: "right", width: "47%"}}>
              <div style={{marginBottom: "10px"}}>
                <label style={mStyle} htmlFor="">盘查时间:</label><Input width="60%" value={checktime} readOnly="readOnly"/>
              </div>
              <div style={{marginBottom: "10px"}}>
                <label style={mStyle} htmlFor="">车辆所有人姓名:</label><Input width="60%" value={car_owner}
                                                                        readOnly="readOnly"/>
              </div>
              <div style={{marginBottom: "10px"}}>
                <label style={mStyle} htmlFor="">车辆所有人电话:</label><Input width="60%" value={car_owner_tel}
                                                                        readOnly="readOnly"/>
              </div>
              <div style={{marginBottom: "10px"}}>
                <label style={mStyle} htmlFor="">是否路边停靠:</label><Input width="60%" value={is_road_side}
                                                                       readOnly="readOnly"/>
              </div>
              <div style={{marginBottom: "10px"}}>
                <label style={mStyle} htmlFor="">标签:</label>
                <div style={{float: "left"}}>
                  {tagsArrCar}
                </div>
              </div>
            </div>
            <div style={{clear: "both"}}></div>
          </div>
          <div style={{borderTop: "2px solid #1e2a55", marginTop: "10px", paddingTop: "10px"}}>
            <p style={{fontSize: "16px", color: "#fff"}}>警员信息</p>
            <div style={{float: "left", width: "47%"}}>
              <div style={{marginBottom: "10px"}}>
                <label style={mStyle} htmlFor="">姓名:</label><Input width="60%" value={police_name} readOnly="readOnly"/>
              </div>
              <div style={{marginBottom: "10px"}}>
                <label style={mStyle} htmlFor="">所在单位:</label><Input width="60%" value={police_unit}
                                                                     readOnly="readOnly"/>
              </div>
            </div>
            <div style={{float: "right", width: "47%"}}>

              <div style={{marginBottom: "10px"}}>
                <label style={mStyle} htmlFor="">警号:</label><Input width="60%" value={police_code} readOnly="readOnly"/>
              </div>
              <div style={{marginBottom: "10px"}}>
                <label style={mStyle} htmlFor="">身份证号:</label><Input width="60%" value={police_idcard}
                                                                     readOnly="readOnly"/>
              </div>
            </div>
            <div style={{clear: "both"}}></div>
          </div>
        </div>
      </div>
    );
  }
}

//关联人员模态框

class RelationPersonModle extends Component {
  constructor(props) { //初始化nowPage为1
    super(props);
    this.state = {
      relationPersonline: null,
      license_plate_no: "",
      car_color: "",
      tags: '',
      vin_number: '',
      car_model: '',
    };
  }

  clear() {
    this.props.ReactionlineIdChange('');
    //关闭弹出框
    this.props.changeStatus("none");
    //关闭遮罩
    store.dispatch(changeShade("none"));
  }

  relationPersonlineIdChange = (value, relationPersonline = null) => {
    this.setState({
      relationPersonline: relationPersonline
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.riskLine !== this.props.riskLine) {
      let riskLine = nextProps.riskLine;
      if (riskLine !== null) {

        this.setState({
          license_plate_no: riskLine.license_plate_no,
          car_color: riskLine.car_color,
          tags: riskLine.tags,
          vin_number: riskLine.vin_number,
          car_model: riskLine.car_model,
        })
        let related_car_id = riskLine.related_car_id;
        let creds = {
          currentPage: 1,
          entityOrField: true,
          pd: {
            related_car_id: related_car_id
          },
          showCount: 9999
        }
        store.dispatch(fetchRelevancePersonData(creds));
      }
    }
  }

  //关闭事件
  handleClose = () => {
    this.clear();
  }
  return = () => {
    this.setState({
      relationPersonline: null
    })
  }

  render() {
    let mdisplay = this.props.isShow;
    let relationPersonline = this.state.relationPersonline;
    let license_plate_no = this.state.license_plate_no;
    let car_color = this.state.car_color;
    let tags = this.state.tags;
    let vin_number = this.state.vin_number;
    let car_model = this.state.car_model;
    //车辆标签
    let tagsArrCar = [];
    if (tags !== '' && tags !== null && tags !== undefined) {
      let tagsList = tags.split(",");
      for (var i = 0; i < tagsList.length; i++) {
        var tagsItem = tagsList[i];
        tagsArrCar.push(
          <Tag color="blue">{tagsItem}</Tag>
        );
      }
    } else {
      tagsArrCar.push(
        <span style={{fontSize: "14px", color: "#108ee9"}}>暂无标签</span>
      );

    }
    let isLoadinging = store.getState().InventoryManagement.isLoadinging;

    return (
      <div>
        {this.state.relationPersonline === null ?
          <div style={{
            width: this.props.width,
            height: this.props.height,
            maxHeight: 725,
            overflowY: "auto",
            border: "1px solid #0C5F93",
            position: "fixed",
            left: "25%",
            top: '10%',
            zIndex: "9999",
            display: mdisplay
          }}>
            <div>
              {/*头部*/}
              <div style={{background: "rgba(2, 24, 85, 0.9)", padding: "5px"}}>
                <span style={{float: "left", fontSize: "16px", color: "#fff"}}>关联人员</span><img src="/images/guanbi.png"
                                                                                               style={{
                                                                                                 float: "right",
                                                                                                 marginTop: "5px",
                                                                                                 cursor: "pointer"
                                                                                               }}
                                                                                               onClick={this.handleClose}/>
                <div style={{clear: "both"}}></div>
              </div>
              {/*内容部分*/}
              <div style={{padding: "20px", background: "rgba(37, 51, 100, 0.9)"}}>
                <p style={{
                  color: "#fff",
                  fontSize: "16px",
                  marginBottom: 10,
                  borderBottom: "2px solid #1e2a55",
                  paddingBottom: 10
                }}>
                  <span style={{marginRight: "10px"}}>{license_plate_no}</span><span
                  style={{marginRight: "10px"}}>{car_color}</span>
                  <span style={{marginRight: "10px"}}>{vin_number}</span>
                  <span style={{marginRight: "10px"}}>{car_model}</span>
                  <span style={{marginRight: "10px"}}>{tagsArrCar}</span>
                </p>
                {isLoadinging === true ?
                  <div style={{textAlign: "center", marginTop: "200px"}}>
                    <Spin size="large"/>
                  </div>
                  :
                  <RelationPersonTable relationPersonlineIdChange={this.relationPersonlineIdChange}/>
                }
              </div>
            </div>

          </div> :
          <DetailsModule relationPersonline={relationPersonline} return={this.return} width="52%"/>}
      </div>
    );
  }
}

//关联人员的表格
class RelationPersonTr extends Component {
  constructor(props) {
    super(props);
    //绑定详情事件
    this.lookPerson = this.lookPerson.bind(this);
  }

  //查看详情事件
  lookPerson = () => {
    //毁掉函数表格行变更
    this.props.relationPersonlineIdChange(this.props.persontrData.id, this.props.persontrData);
  }

  render() {
    let persontrData = this.props.persontrData;
    let detailed = <div style={{cursor: "pointer"}}><span onClick={this.lookPerson}>详情</span></div>;
    return (
      <tr>
        <td style={tdStyle}>{this.props.serial}</td>
        <td style={tdStyle}>{persontrData.idcard}</td>
        <td style={tdStyle}>{persontrData.name}</td>
        <td style={tdStyle}>{persontrData.tags}</td>
        <td style={tdStyle}>{persontrData.checktime}</td>
        <td style={tdStyle}>{persontrData.police_name}</td>
        <td style={tdStyle}>{persontrData.police_unit}</td>
        <td style={tdStyle}>{detailed} </td>
      </tr>
    );
  }
}

class RelationPersonTable extends Component {
  render() {
    let personnelInventoryList = store.getState().InventoryManagement.data.relevancePersonList.result.list;
    let nowPage = this.props.nowPage;
    let persontrs = [];
    for (var i = 0; i < personnelInventoryList.length; i++) {
      var persontrData = personnelInventoryList[i];
      let serial = i + 1;
      persontrs.push(
        <RelationPersonTr persontrData={persontrData} serial={serial}
                          relationPersonlineIdChange={this.props.relationPersonlineIdChange}/>
      )
    }
    return (
      <table style={tableStyle}>
        <tr>
          <td style={tdStyle}>序号</td>
          <td style={tdStyle}>身份证号</td>
          <td style={tdStyle}>姓名</td>
          <td style={tdStyle}>标签</td>
          <td style={tdStyle}>盘查时间</td>
          <td style={tdStyle}>警员</td>
          <td style={tdStyle}>单位</td>
          <td style={tdStyle}>操作</td>
        </tr>
        {persontrs}
      </table>
    )
  }
}

//关联人员的详情模态框
class DetailsModule extends Component {
  constructor(props) { //初始化nowPage为1
    super(props);
    this.state = {};
  }

  //关闭事件
  handleClose = () => {
    this.clear();
  }

  render() {
    let mdisplay = this.props.isShow;
    let relationPersonline = this.props.relationPersonline;
    let tags = relationPersonline.tags;
    //人员标签
    var tagsArr = [];
    if (tags !== '' && tags !== null && tags !== undefined) {
      let tagsList = tags.split(",");
      for (var i = 0; i < tagsList.length; i++) {
        var tagsItem = tagsList[i];
        tagsArr.push(
          <Tag color="blue">{tagsItem}</Tag>
        );
      }
    } else {
      tagsArr.push(
        <span style={{fontSize: "14px", color: "#108ee9"}}>暂无标签</span>
      );

    }
    return (
      <div style={{
        width: this.props.width,
        maxHeight: 727,
        overflowY: "auto",
        border: "1px solid #0C5F93",
        background: "rgba(37, 51, 100, 0.9)",
        position: "fixed",
        left: "25%",
        top: '10%',
        zIndex: "9999",
        display: mdisplay
      }}>
        {/*头部*/}
        <div style={{background: "rgba(2, 24, 85, 0.9)", padding: "5px"}}>
          <span style={{float: "left", fontSize: "16px", color: "#fff"}}>详情</span><span
          style={{float: "right", marginTop: "5px", cursor: "pointer", color: "#fff", fontSize: "14px"}}
          onClick={this.props.return}>返回列表</span>
          <div style={{clear: "both"}}></div>
        </div>
        {/*内容部分*/}
        <div style={{padding: "20px",}}>
          <div style={{}}>
            <p style={{fontSize: "16px", color: "#fff", marginBottom: "20px"}}>人员信息</p>
            <div>
              <div style={{marginBottom: "10px", float: "left", width: "47%"}}>
                <label style={mStyle} htmlFor="">照片</label>
                <img src={relationPersonline.zpurl == '' ? '/images/zanwu.png' : relationPersonline.zpurl} alt=""
                     width='130px' height='160px'/>
              </div>
              <div style={{float: "right", width: "47%"}}>
                <div style={{marginBottom: "10px"}}>
                  <label style={mStyle} htmlFor="">姓名:</label><Input width="60%" value={relationPersonline.name}
                                                                     readOnly="readOnly"/>
                </div>
                <div style={{marginBottom: "10px"}}>
                  <label style={mStyle} htmlFor="">性别:</label><Input width="60%" value={relationPersonline.sex}
                                                                     readOnly="readOnly"/>
                </div>
                <div style={{marginBottom: "10px"}}>
                  <label style={mStyle} htmlFor="">民族:</label><Input width="60%" value={relationPersonline.nation}
                                                                     readOnly="readOnly"/>
                </div>
                <div style={{marginBottom: "10px"}}>
                  <label style={mStyle} htmlFor="">生日:</label><Input width="60%" value={relationPersonline.birth}
                                                                     readOnly="readOnly"/>
                </div>
                <div style={{marginBottom: "10px"}}>
                  <label style={mStyle} htmlFor="">住址:</label><Input width="60%" value={relationPersonline.address}
                                                                     readOnly="readOnly"/>
                </div>
              </div>
              <div style={{clear: "both"}}></div>
            </div>
            <div>
              <div style={{float: "left", width: "47%"}}>
                <div style={{marginBottom: "10px"}}>
                  <label style={mStyle} htmlFor="">标签</label>
                  <div style={{float: "left"}}>
                    {/*人员标签*/}
                    {tagsArr}
                  </div>
                </div>
              </div>
              <div style={{float: "right", width: "47%"}}>
                <div style={{marginBottom: "10px"}}>
                  <label style={mStyle} htmlFor="">身份证号:</label><Input width="60%" value={relationPersonline.idcard}
                                                                       readOnly="readOnly"/>
                </div>
                <div style={{marginBottom: "10px"}}>
                  <label style={mStyle} htmlFor="">盘查时间:</label><Input width="60%" value={relationPersonline.checktime}
                                                                       readOnly="readOnly"/>
                </div>
              </div>
              <div style={{clear: "both"}}></div>
            </div>
          </div>
          <div style={{borderTop: "2px solid #1e2a55", marginTop: "10px", paddingTop: "10px"}}>
            <p style={{fontSize: "16px", color: "#fff", marginBottom: "20px"}}>警员信息</p>
            <div style={{float: "left", width: "47%"}}>
              <div style={{marginBottom: "10px"}}>
                <label style={mStyle} htmlFor="">姓名:</label><Input width="60%" value={relationPersonline.police_name}
                                                                   readOnly="readOnly"/>
              </div>
              <div style={{marginBottom: "10px"}}>
                <label style={mStyle} htmlFor="">所在单位:</label><Input width="60%" value={relationPersonline.police_unit}
                                                                     readOnly="readOnly"/>
              </div>
            </div>
            <div style={{float: "right", width: "47%"}}>

              <div style={{marginBottom: "10px"}}>
                <label style={mStyle} htmlFor="">警号:</label><Input width="60%" value={relationPersonline.police_code}
                                                                   readOnly="readOnly"/>
              </div>
              <div style={{marginBottom: "10px"}}>
                <label style={mStyle} htmlFor="">身份证号:</label><Input width="60%"
                                                                     value={relationPersonline.police_idcard}
                                                                     readOnly="readOnly"/>
              </div>
            </div>
            <div style={{clear: "both"}}></div>
          </div>
          <div style={{clear: "both"}}></div>


        </div>
      </div>
    );
  }
}

export default connect(mainReducer)(CarInventory);