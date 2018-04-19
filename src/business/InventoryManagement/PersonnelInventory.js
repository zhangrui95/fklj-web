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
    fetchPersonnelInventoryData,
    fetchCarInventoryData,
    fetchRelevanceCarData,
    fetchExportPersonExcel
} from "../../actions/InventoryManagement";
import {
    FileInput
} from "../../components/fileInput";
import {
    changeShade,
    fetchPoliceUnitsData,
    fetchPersonTagsData,
    api
} from "../../actions/actions";
import {
    ShallowBlueBtn,
    Input,
    Pag,
    SelectModel,
    Shade,
    TextArea
} from "../generalPurposeModule";
import {
    store
} from '../../index.js';
import * as constants from "../../utils/Constants";
import {
    DatePicker,
    Checkbox,
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
} from '../../utils/index';
import {
    Spin
} from 'antd';
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


export class PersonnelInventory extends Component {
    constructor(props) { //初始化nowPage为1
        super(props);
        this.state = {
            nowPage: 1,
            ModalDialogueShow: 'none',
            ReactionModalDialogueShow: 'none',
            lineId: '',
            highRiskLine: null,
            sfzh: '',
            name: '',
            beginDate: '',
            endDate: '',
            gender: '',
            tags: [],
            police_name: '',
            police_unitcode: ''
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
            store.dispatch(fetchPersonnelInventoryData(creds)); //人员盘查   getPersonList  getPersonList
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
        store.dispatch(fetchPersonnelInventoryData(creds)); //人员盘查   getPersonList  getPersonList
        store.dispatch(fetchPersonTagsData()); //获取人员标签字典

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
        //关联车辆变更
    handleReactionLineIdChange = (value, RiskLine = null) => { // 关联车辆详情 
            this.setState({
                lineId: value, //id
                ReactionModalDialogueShow: 'block',
                RiskLine: RiskLine, //对象
            });
            //打开遮罩
            store.dispatch(changeShade("block"));
        }
        //查询变更
    serchChange = (sfzh, name, beginDate, endDate, police_unitcode, police_name, tags) => {
        this.setState({
            nowPage: 1,
            sfzh: sfzh,
            name: name,
            beginDate: beginDate,
            endDate: endDate,
            police_unitcode: police_unitcode,
            police_name: police_name,
            tags: tags
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
                name: this.state.name,
                idcard: this.state.sfzh,
                beginTime: this.state.beginDate,
                endTime: this.state.endDate,
                police_unitcode: this.state.police_unitcode,
                police_name: this.state.police_name,
                tags: this.state.tags
            },
            showCount: constants.pageSize
        }
        store.dispatch(fetchPersonnelInventoryData(creds)); //getPersonList_ly  getPersonList
    }

    render() {
        let isFetching = store.getState().InventoryManagement.isFetching;

        let personnelInventoryList = store.getState().InventoryManagement.data.personnelInventoryList.result.list;
        let nowPage = this.state.nowPage;
        let Table;
        Table = <PITable  personnelInventoryList={personnelInventoryList} nowPage={nowPage}  lineIdChange={this.handleLineIdChange} ReactionlineIdChange={this.handleReactionLineIdChange}/>
        let totalRecord = store.getState().InventoryManagement.data.personnelInventoryList.result.total;
        return (

            <div className="sliderWrap">
                <div className="sliderItemDiv">
                    {/*查询条件*/}
                    <div style={sliderdyHeader}>
                        <SearchArea   dispatch={this.props.dispatch} lineId={this.state.lineId} type={this.props.type}
                                      lineIdChange={this.handleLineIdChange}  createClick={this.handChangeModalDialogueShow} serchChange={this.serchChange} />

                        <div className="clear"></div>
                    </div>
                </div>

                {isFetching === true ?

                   <div style={{textAlign:"center",position:"absolute",left:"45%",top:"50%"}}>
                       <Spin size="large" />
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
                            <Pag
                                pageSize={constants.pageSize}
                                nowPage={nowPage}
                                totalRecord={totalRecord}
                                pageChange={this.pageChange}
                            />
                            {/*模态框*/}
                            <ModalDialogue
                                width="52%"
                                isShow={this.state.ModalDialogueShow}
                                lineId={this.state.lineId}
                                highRiskLine={this.state.highRiskLine}
                                lineIdChange={this.handleLineIdChange}
                                changeStatus={this.handChangeModalDialogueShow}

                            />
                            {/*关联车辆模态框*/}
                            <ReactionModalDialogue
                                width="52%"
                                isShow={this.state.ReactionModalDialogueShow}
                                lineId={this.state.lineId}
                                highRiskLine={this.state.RiskLine}
                                ReactionlineIdChange={this.handleReactionLineIdChange}
                                changeStatus={this.handChangeModalReactionShow}
                            />
                        </div>
                        :
                        <EmptyData />
                }


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
            this.state = {
                backgroundColor: "transparent",
            }
        }
        //查看详情事件
    look = () => {
            //毁掉函数表格行变更
            this.props.lineIdChange(this.props.trData.id, this.props.trData);
        }
        //关联车辆
    relevanceCar = () => {
        this.props.ReactionlineIdChange(this.props.trData.id, this.props.trData);
    }
    handleMouseOver = () => {
        this.setState({
            backgroundColor: "rgba(37, 51, 100, 0.8)"
        });
    }
    handleMouseOut = () => {
        this.setState({
            backgroundColor: "transparent"
        });
    }
    render() {
        let trData = this.props.trData;
        let backgroundColor = this.state.backgroundColor;

        let detailed;
        if (trData.related_car_id === '0') {
            detailed = <div style={{cursor:"pointer"}}><span onClick={this.look}>详情</span></div>;
        } else {
            detailed = <div style={{cursor:"pointer"}}><span onClick={this.look}>详情</span> &nbsp;|&nbsp;<span onClick={this.relevanceCar}>关联车辆</span></div>;
        }

        return (
            <tr style={{backgroundColor:backgroundColor}} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                <td style={tdStyle}>{this.props.serial}</td>
                {/* <td style={tdStyle}><img src={trData.zpurl} width='30px' height='30px'/></td>*/}
                <td style={tdStyle}>{trData.idcard}</td>
                <td style={tdStyle}>{trData.name}</td>
                <td style={tdStyle}>{trData.tags}</td>
                <td style={tdStyle}>{trData.checktime}</td>
                <td style={tdStyle}>{trData.police_name}</td>
                <td style={tdStyle}>{trData.police_unit}</td>
                {/* <td style={tdStyle}>{trData.nation}</td>
                 <td style={tdStyle}>{trData.birth}</td>
                 <td style={tdStyle}>{trData.examinetype}</td>*/}
                <td style={tdStyle}>{detailed} </td>
            </tr>
        );
    }
}
//涉恐软件表格
const PITable = React.createClass({
    render() {
        let personnelInventoryList = this.props.personnelInventoryList;

        let nowPage = this.props.nowPage;
        let recordNumber = parseInt((nowPage - 1) * constants.pageSize);

        let trs = [];
        for (var i = 0; i < personnelInventoryList.length; i++) {
            var trData = personnelInventoryList[i];
            let serial = recordNumber + i + 1;
            trs.push(
                <PITr trData={trData}  serial={serial} lineIdChange={this.props.lineIdChange} ReactionlineIdChange={this.props.ReactionlineIdChange}/>
            )
        }
        return (
            <table style={tableStyle}>
                <tr>
                    <td style={tdStyle}>序号</td>
                    {/*<td  style={tdStyle}>照片</td>*/}
                    <td  style={tdStyle}>身份证号</td>
                    <td  style={tdStyle}>姓名</td>
                    <td  style={tdStyle}>标签</td>
                    {/*<td  style={tdStyle}>类型</td>*/}
                    <td  style={tdStyle}>盘查时间</td>
                    <td  style={tdStyle}>警员</td>
                    <td  style={tdStyle}>单位</td>
                    {/* <td  style={tdStyle}>性别</td>
                     <td  style={tdStyle}>民族</td>
                     <td  style={tdStyle}>出生日期</td>
                     <td  style={tdStyle}>类型</td>*/}
                    <td  style={tdStyle}>操作</td>
                </tr>
                {trs}
            </table>
        )
    }
})

//姓名
let sfzh, name,
    beginDate, endDate, police_name, unitSelected, tagsSelect,
    gender;
//搜索区域内容组件
const SearchArea = React.createClass({
        getInitialState: function() {
            return {
                sfzh: '',
                name: '',
                beginDate: '',
                endDate: '',
                police_name: '',
                unitSelected: '',
                tagsSelect: []
            };
        },
        init: function() {
            this.setState({
                sfzh: '',
                name: '',
                beginDate: '',
                endDate: '',
                police_name: '',
                unitSelected: '',
                tagsSelect: []
            });
        },
        componentWillReceiveProps: function(nextProps) {
            if (this.props.type !== nextProps.type) {
                this.init();
            }
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
        handlePoliceNameClick: function(id, value) {
            this.setState({
                police_name: value,
            });
        },
        handleBeginDeteClick: function(date, dateString) {
            this.setState({
                beginDate: dateString,
            });

        },
        handleEndDeteClick: function(date, dateString) {
            this.setState({
                endDate: dateString,
            });
        },
        //下拉选择器的回调函数
        handleSelectChange: function(value) {
            this.setState({
                unitSelected: value
            });
        },
        ontagsChange: function(value) {
            this.setState({
                tagsSelect: value
            });
        },
        handleClick: function() { //点击查询
            let nowPage = this.props.nowPage;
            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    type: this.props.type,
                    name: this.state.name,
                    idcard: this.state.sfzh,
                    beginTime: this.state.beginDate,
                    endTime: this.state.endDate,
                    police_unitcode: this.state.unitSelected,
                    police_name: this.state.police_name,
                    tags: this.state.tagsSelect
                },
                showCount: constants.pageSize
            }

            store.dispatch(fetchPersonnelInventoryData(creds));

            this.props.serchChange(this.state.sfzh, this.state.name,
                this.state.beginDate, this.state.endDate, this.state.unitSelected,
                this.state.police_name, this.state.tagsSelect);

        },
        handleClickExport: function() { //点击导出
            this.handleClick();
            let url = api + '/data/exportPersonExcel';
            url += '?type=' + this.props.type;
            url += '&name=' + this.state.name;
            url += '&idcard=' + this.state.sfzh;
            url += '&beginTime=' + this.state.beginDate;
            url += '&endTime=' + this.state.endDate;
            url += '&police_unitcode=' + this.state.unitSelected;
            url += '&police_name=' + this.state.police_name;
            url += '&tags=' + this.state.tagsSelect;
            url += '&Authorization=' + sessionStorage.getItem('id_token') || '';
            //store.dispatch(fetchExportPersonExcel(url)); //getPersonList_ly  getPersonList
            window.open(url);
        },
        handleClickClear: function() { //点击清除
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
                    <Option key={key} value={policeUnit.code}>{policeUnit.text}</Option>
                )
            }
            //人员标签列表
            let personTagsList = store.getState().root.data.personTagsList;
            let personTagsOptions = [];
            for (var i = 0; i < personTagsList.length; i++) {
                var personTag = personTagsList[i];
                personTagsOptions.push(
                    <Option key={personTag.code}>{personTag.text}</Option>
                )
            }

            let sfzh = this.state.sfzh;
            let name = this.state.name;
            let police_name = this.state.police_name;
            let beginDate = this.state.beginDate;
            let endDate = this.state.endDate;
            let gender = this.state.gender;
            let unitSelected = this.state.unitSelected;
            let tagsSelect = this.state.tagsSelect;

            let beginDateValue = '';
            if (beginDate === '') {} else {
                beginDateValue = moment(beginDate, dateFormat);
            }
            let endDateValue = '';
            if (endDate === '') {} else {
                endDateValue = moment(endDate, dateFormat);
            }
            return (
                <div>
                <div className="marLeft40 z_searchDiv">
                    <label htmlFor="" className="font14">人员姓名：</label>
                    <Input width="121px" margin="0 10px 0 0"  type="text"  id='name' placeholder='请输入姓名'  value={name}  callbackParent={this.handleNameClick} />
                    <label htmlFor="" className="font14">身份证号：</label>
                    <Input width="157px" margin="0 10px 0 0"  type="text"  id='sfzh' placeholder='请输入身份证号'  value={sfzh}  callbackParent={this.handleSfzhClick} />
                    <label htmlFor="" className="font14">单位：</label>
                    <Select key='select'
                            style={{ width: 200 }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={this.handleSelectChange}
                            value={unitSelected}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option key="all" value="">全部</Option>
                        {policeUnitsOptions}
                    </Select>
                    <label htmlFor="" className="font14">起止时间：</label>
                    <DatePicker   format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={beginDateValue} defaultValue="" onChange={this.handleBeginDeteClick}/>
                    <span className="font14" style={{marginRight:"10px"}}>至</span>
                    <DatePicker  format={dateFormat} allowClear={false} style={{marginRight:"10px"}} value={endDateValue} defaultValue="" onChange={this.handleEndDeteClick}/>

                </div>
                <div style={{marginLeft:"2%",marginTop:"20px"}}>
                    <label htmlFor="" className="font14">警员姓名：</label>
                    <Input width="121px" margin="0 10px 0 0"  type="text"  id='police_name' placeholder='请输入警员姓名'  value={police_name}  callbackParent={this.handlePoliceNameClick} />
                    <label htmlFor="" className="font14">标签：</label>
                    {/*标签*/}
                    <Select key='tagselect'
                            mode="multiple"
                            style={{ width: 570 ,marginRight:"10px"}}
                            placeholder="请选择人员标签"
                        //defaultValue={['a10', 'c12']}
                            onChange={this.ontagsChange}
                            value={tagsSelect}
                    >
                        {personTagsOptions}
                    </Select>
                    <ShallowBlueBtn width="82" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                    <ShallowBlueBtn width="82" text="重置" margin="0 10px 0 0" onClick={this.init} />
                    {/*<ShallowBlueBtn width="82" text="导出" margin="0 10px 0 0" onClick={this.handleClickExport} />*/}
                    <Button style={{margin:'0 10px 0 0',width:"82px"}} onClick={this.handleClickExport} className="btn_ok">
                        <Icon type="download" /> 导出
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
                police_unit: highRiskLine.police_unit,
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
        let police_unit = this.state.police_unit;
        let imei = this.state.imei;
        let cid = this.state.cid;
        let type = this.state.type;
        let address = this.state.address;
        let idcard_issuing_authority = this.state.idcard_issuing_authority;
        let idcard_expiry_date = this.state.idcard_expiry_date;
        let id_card_photo_path = this.state.id_card_photo_path;
        let tags = this.state.tags;

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
                <span style={{fontSize:"14px",color:"#108ee9"}}>暂无标签</span>
            );

        }

        //线路ID

        return (
            <div style={{width:this.props.width,maxHeight:"726px",overflowY:"auto",border:"1px solid #0C5F93",position:"fixed",left:"25%",top:'10%',zIndex:"9999",display:mdisplay}}>
                {/*头部*/}
                <div style={{background:"rgba(2, 24, 85, 0.9)",padding:"5px"}}>
                    <span style={{float:"left",fontSize:"16px",color:"#fff"}}>详情</span><img src="/images/guanbi.png" style={{float:"right",marginTop:"5px",cursor:"pointer"}}  onClick={this.handleClose}/>
                    <div style={{clear:"both"}}></div>
                </div>
                {/*内容部分*/}
                <div style={{padding:"20px",background:"rgba(37, 51, 100, 0.9)"}}>
                    <div style={{}}>
                        <p style={{fontSize:"16px",color:"#fff",marginBottom:"20px"}}>人员信息</p>
                        <div>
                            <div style={{marginBottom:"10px",float:"left",width:"47%"}}>
                                <label style={mStyle} htmlFor="">照片:</label>
                                <img src={zpurl === ''?"/images/zanwu.png":zpurl} alt="" width='130px' height='160px'/>
                            </div>
                            <div style={{float:"right",width:"47%"}}>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">姓名:</label><Input width="60%"  value={name} readOnly="readOnly"/>
                                </div>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">性别:</label><Input width="60%"  value={sex} readOnly="readOnly"/>
                                </div>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">民族:</label><Input width="60%"  value={nation} readOnly="readOnly"/>
                                </div>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">生日:</label><Input width="60%"  value={birth} readOnly="readOnly"/>
                                </div>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">住址:</label><Input width="60%"  value={address} readOnly="readOnly"/>
                                </div>
                            </div>
                            <div style={{clear:"both"}}></div>
                        </div>
                        <div>
                            <div style={{float:"left",width:"47%"}}>
                                <div style={{marginBottom:"10px",marginTop:"10px"}}>
                                    <label style={mStyle} htmlFor="">标签</label>
                                    {/*<TextArea width="60%" height="111px"  value={tags} readOnly="readOnly"/>*/}
                                    <div style={{width:"60%",float:"left"}}>
                                        {tagsArr}
                                    </div>
                                </div>

                            </div>
                            <div style={{float:"right",width:"47%"}}>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">身份证号:</label><Input width="60%" value={idcard} readOnly="readOnly"/>
                                </div>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">盘查时间:</label><Input width="60%"  value={checktime} readOnly="readOnly"/>
                                </div>

                            </div>
                            <div style={{clear:"both"}}></div>
                        </div>
                    </div>
                    <div style={{borderTop:"2px solid #1e2a55",marginTop:"10px",paddingTop:"10px"}}>
                        <p style={{fontSize:"16px",color:"#fff",marginBottom:"20px"}}>警员信息</p>
                        <div style={{float:"left",width:"47%"}}>
                            <div style={{marginBottom:"10px"}}>
                                <label style={mStyle} htmlFor="">姓名:</label><Input width="60%" value={police_name} readOnly="readOnly"/>
                            </div>
                            <div style={{marginBottom:"10px"}}>
                                <label style={mStyle} htmlFor="">所在单位:</label><Input width="60%" value={police_unit} readOnly="readOnly"/>
                            </div>
                        </div>
                        <div style={{float:"right",width:"47%"}}>

                            <div style={{marginBottom:"10px"}}>
                                <label style={mStyle} htmlFor="">警号:</label><Input width="60%"  value={police_code} readOnly="readOnly"/>
                            </div>
                            <div style={{marginBottom:"10px"}}>
                                <label style={mStyle} htmlFor="">身份证号:</label><Input width="60%"  value={police_idcard} readOnly="readOnly"/>
                            </div>
                        </div>
                        <div style={{clear:"both"}}></div>


                    </div>
                    <div style={{clear:"both"}}></div>


                </div>
            </div>
        );
    }
}
//关联车辆信息组件
export class ReactionModalDialogue extends Component {
    constructor(props) { //初始化nowPage为1
        super(props);
        this.state = {
            idcard: '',
            tags: '',
            name: '',
            related_car_id: ''
        };
    }
    clear() {
        this.props.ReactionlineIdChange('');
        //关闭弹出框
        this.props.changeStatus("none");
        //关闭遮罩
        store.dispatch(changeShade("none"));
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.highRiskLine !== this.props.highRiskLine) {
            let highRiskLine = nextProps.highRiskLine;
            if (highRiskLine !== null) {
                this.setState({
                    idcard: highRiskLine.idcard,
                    tags: highRiskLine.tags,
                    name: highRiskLine.name,
                    related_car_id: highRiskLine.related_car_id
                })
                let related_car_id = highRiskLine.related_car_id;
                let creds = {
                    currentPage: 1,
                    entityOrField: true,
                    pd: {
                        related_car_id: related_car_id
                    },
                    showCount: 9999
                }
                store.dispatch(fetchRelevanceCarData(creds));
            }

        }
    }

    //关闭事件
    handleClose = () => {
        this.clear();
    }
    render() {
        let mdisplay = this.props.isShow;
        let idcard = this.state.idcard;
        let name = this.state.name;
        let tags = this.state.tags;
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
                <span style={{fontSize:"14px",color:"#108ee9"}}>暂无标签</span>
            );

        }


        let relevanceCarList = store.getState().InventoryManagement.data.relevanceCarList.result.list; //关联车辆列表
        let isLoadinging = store.getState().InventoryManagement.isLoadinging;

        let relevanceCar = {
            "car_model": "",
            "car_owner_tel": "",
            "police_code": "",
            "police_idcard": "",
            "license_plate_no": "",
            "police_unitcode": "",
            "police_unit": '',
            "checktime": "",
            "police_area": "",
            "examinetype": "",
            "latitude": 0,
            "car_color": "",
            "type": "",
            "tagscode": "",
            "tags": "",
            "car_owner": "",
            "abnormal_state": "",
            "vin_number": "",
            "car_brand": "",
            "imei": "",
            "id": "",
            "police_name": "",
            "license_plate_type": "",
            "cid": "",
            "longitude": 0
        }
        if (relevanceCarList.length > 0) {
            relevanceCar = relevanceCarList[0]; //关联的车辆
            let carTags = relevanceCar.tags;
            var carTagsArr = [];
            if (carTags !== '' && carTags !== null && carTags !== undefined) {
                let tagsList = carTags.split(",");
                for (var i = 0; i < tagsList.length; i++) {
                    var tagsItem = tagsList[i];
                    carTagsArr.push(
                        <Tag color="blue">{tagsItem}</Tag>
                    );
                }
            } else {
                carTagsArr.push(
                    <span style={{fontSize:"14px",color:"#108ee9"}}>暂无标签</span>
                );

            }
        } else {

        }



        return (
            <div style={{width:this.props.width,maxHheight:495,height:"495px",overflowY:"auto",border:"1px solid #0C5F93",background:"rgba(37, 51, 100, 0.9)",position:"fixed",left:"25%",top:'20%',zIndex:"9999",display:mdisplay}}>
                {/*头部*/}
                <div style={{background:"rgba(2, 24, 85, 0.9)",padding:"5px"}}>
                    <span style={{float:"left",fontSize:"16px",color:"#fff"}}>车辆详情</span><img src="/images/guanbi.png" style={{float:"right",marginTop:"5px",cursor:"pointer"}}  onClick={this.handleClose}/>
                    <div style={{clear:"both"}}></div>
                </div>
                {/*内容部分*/}
                <div style={{padding:"20px",}}>
                    <p style={{fontSize:"18px",color:"#fff",marginBottom:'10px'}}>
                        <span style={{marginRight:10}}>{name}</span><span style={{marginRight:10}}>{idcard}</span><span>{tagsArr}</span>
                    </p>
                    {isLoadinging === true ?
                        <div style={{textAlign:"center",marginTop:"200px"}}>
                            <Spin size="large" />
                        </div>
                    :
                    <div>
                        <div>
                            <p style={{fontSize:"16px",color:"#fff",marginBottom:"20px",borderTop:"2px solid #1e2a55"}}>车辆信息</p>
                            <div style={{float:"left",width:"47%"}}>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">车牌号</label><Input width="60%"  value={relevanceCar.license_plate_no} readOnly="readOnly"/>
                                </div>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">车身颜色</label><Input width="60%"  value={relevanceCar.car_color} readOnly="readOnly"/>
                                </div>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">车辆型号</label><Input width="60%"  value={relevanceCar.car_model} readOnly="readOnly"/>
                                </div>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">车辆品牌</label><Input width="60%"  value={relevanceCar.car_brand} readOnly="readOnly"/>
                                </div>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">VIN码</label><Input width="60%"  value={relevanceCar.vin_number} readOnly="readOnly"/>
                                </div>
                            </div>
                            <div style={{float:"right",width:"47%"}}>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">车辆所有人</label><Input width="60%" value={relevanceCar.car_owner} readOnly="readOnly"/>
                                </div>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">车辆所有人电话</label><Input width="60%"  value={relevanceCar.car_owner_tel} readOnly="readOnly"/>
                                </div>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">是否路边停靠</label><Input width="60%"  value={relevanceCar.is_road_side} readOnly="readOnly"/>
                                </div>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">标签</label>
                                    <div style={{float:"left"}}>
                                    {/*车辆标签*/}
                                    {carTagsArr}
                                    </div>
                                </div>
                            </div>
                            <div style={{clear:"both"}}></div>
                        </div>
                        <div style={{borderTop:"2px solid #1e2a55",marginTop:"10px",paddingTop:"10px"}}>
                            <p style={{fontSize:"16px",color:"#fff"}}>警员信息</p>
                            <div style={{float:"left",width:"47%"}}>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">姓名:</label><Input width="60%" value={relevanceCar.police_name} readOnly="readOnly"/>
                                </div>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">所在单位:</label><Input width="60%" value={relevanceCar.police_unit} readOnly="readOnly"/>
                                </div>
                            </div>
                            <div style={{float:"right",width:"47%"}}>

                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">警号:</label><Input width="60%"  value={relevanceCar.police_code} readOnly="readOnly"/>
                                </div>
                                <div style={{marginBottom:"10px"}}>
                                    <label style={mStyle} htmlFor="">身份证号:</label><Input width="60%"  value={relevanceCar.police_idcard} readOnly="readOnly"/>
                                </div>
                            </div>
                            <div style={{clear:"both"}}></div>
                        </div>
                    </div>  
                    }
                    
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

export default connect(mainReducer)(PersonnelInventory);