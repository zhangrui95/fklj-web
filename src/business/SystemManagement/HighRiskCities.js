/**
 * 高危城市
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
    fetchPlaceOfInfluxPersonData,
    fetchPlaceOfOriginPersonData,
    fetchHighRiskCitiesData,
    fetchInterrogationInformationData,
    fetchHorrorSoftwareData,
} from "../../actions/SystemManagement";
import {
    changeShade
} from "../../actions/actions";
import {
    StylePage,
    ShallowBlueBtn,
    DeepRedBtn,
    Input,
    DeepBlueBtn,
    PhotoItem,
    Pag
} from "../generalPurposeModule";
import {
    store
} from '../../index.js';
import * as constants from "../../utils/Constants";
import {
    DatePicker,
    Spin
} from 'antd';


export class HighRiskCities extends Component {
    constructor(props) { //初始化nowPage为1
        super(props);
        this.state = {
            nowPage: 1,
            ModalDialogueShow: 'none'
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
    pageChange(nowPage) {
        this.state = Object.assign({}, this.state, {
            nowPage: nowPage
        });
        var search = 'nowPage';
        store.dispatch(fetchHighRiskCitiesData('/getHighRiskCities', search));
    }
    render() {
        let highRiskCitiesList = this.props.highRiskCitiesList;
        let nowPage = this.state.nowPage;
        let Table;
        Table = <HighRiskCitiesTable  highRiskCitiesList={highRiskCitiesList} nowPage={nowPage} />
        let totalRecord = highRiskCitiesList.count;
        let isFetching = store.getState().SystemManagement.isFetching;

        return (
            <div className="sliderWrap">
                <div className="sliderItemDiv">
                    {/*查询条件*/}
                    <div style={sliderdyHeader}>
                        <SearchCities   dispatch={this.props.dispatch}  createClick={this.handChangeModalDialogueShow}/>
                        
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
                            {Table}
                        </div>}
                    <div className="clear"></div>
                </div>
                {/*分页*/}
                <Pag pageSize={constants.pageSize} nowPage={nowPage} totalRecord={totalRecord} pageChange={this.pageChange} />
                {/*模态框*/}
                <ModalDialogue width='533px' isShow={this.state.ModalDialogueShow} changeStatus={this.handChangeModalDialogueShow}/>
            </div>


        );

    }
};



const HighRiskCitiesTr = React.createClass({
    render() {
        let trData = this.props.trData;
        return (
            <tr>
                <td style={tdStyle}>{this.props.serial}</td>
                <td style={tdStyle}>{trData.cityName}</td>
                <td style={tdStyle}>{trData.provinceName}</td>
                <td style={tdStyle}>{trData.idNumber}</td>
                <td style={tdStyle}>{trData.duration}</td>
                <td style={tdStyle}>{trData.beginDate}</td>
                <td style={tdStyle}>{trData.endDate}</td>
                <td style={tdStyle}>详情</td>
            </tr>
        );
    }
})

const HighRiskCitiesTable = React.createClass({
    render() {
        let highRiskCitiesList = this.props.highRiskCitiesList.list;
        let nowPage = this.props.nowPage;
        let recordNumber = parseInt((nowPage - 1) * constants.pageSize);
        let trs = [];
        for (var i = 0; i < highRiskCitiesList.length; i++) {
            var trData = highRiskCitiesList[i];
            let serial = recordNumber + i + 1;
            trs.push(
                <HighRiskCitiesTr trData={trData} serial={serial}/>
            )
        }
        return (
            <table style={tableStyle}>
                <tr>
                    {/*<th>序号</th>*/}
                    <td  style={tdStyle}>序号</td>
                    <td  style={tdStyle}>城市名</td>
                    <td  style={tdStyle}>所属省份</td>
                    <td  style={tdStyle}>身份证号</td>
                    <td  style={tdStyle}>设定高危地区时长</td>
                    <td  style={tdStyle}>开始时间</td>
                    <td  style={tdStyle}>结束时间</td>
                    <td  style={tdStyle}>操作</td>
                </tr>
                {trs}
            </table>
        )
    }
})

//姓名
let highRiskCitiesList_cityName,
    highRiskCitiesList_dateBegin,
    highRiskCitiesList_dateEnd;
//搜索区域内容组件
const SearchCities = React.createClass({
        getInitialState: function() {
            return {
                highRiskCitiesList_cityName: '',
                highRiskCitiesList_dateBegin: '',
                highRiskCitiesList_dateEnd: ''
            };
        },
        onChildChanged: function(id, value) {
            if (id === 'highRiskCitiesList_cityName') {
                highRiskCitiesList_cityName = value;
            } else if (id === 'highRiskCitiesList_dateBegin') {
                highRiskCitiesList_dateBegin = value;
            } else if (id === 'highRiskCitiesList_dateEnd') {
                highRiskCitiesList_dateEnd = value;
            }
            this.setState({
                highRiskCitiesList_cityName: highRiskCitiesList_cityName,
                highRiskCitiesList_dateBegin: highRiskCitiesList_dateBegin,
                highRiskCitiesList_dateEnd: highRiskCitiesList_dateEnd
            });
        },
        handleClick: function() { //点击查询
            highRiskCitiesList_cityName = this.state.highRiskCitiesList_cityName;
            highRiskCitiesList_dateBegin = this.state.highRiskCitiesList_dateBegin;
            highRiskCitiesList_dateEnd = this.state.highRiskCitiesList_dateEnd;
            var search = '';
            if (highRiskCitiesList_cityName !== '' && highRiskCitiesList_cityName !== undefined) {
                search += 'cityName=' + highRiskCitiesList_cityName + '&';
            }
            if (highRiskCitiesList_dateBegin !== '' && highRiskCitiesList_dateBegin !== undefined) {
                search += 'datebegin=' + highRiskCitiesList_dateBegin + '&';
            }
            if (highRiskCitiesList_dateEnd !== '' && highRiskCitiesList_dateEnd !== undefined) {
                search += 'deteend=' + highRiskCitiesList_dateEnd + '&';
            }
            // store.dispatch(fetchhighRiskCitiesListData('/gethighRiskCitiesList',search));
            store.dispatch(fetchHighRiskCitiesData('/getHighRiskCities', search));
        },
        handleClickClear: function() { //点击创建
            store.dispatch(changeShade('block'));
            this.props.createClick("block");

        },
        render() {
            let highRiskCitiesList_cityName = this.state.highRiskCitiesList_cityName;
            let highRiskCitiesList_dateBegin = this.state.highRiskCitiesList_dateBegin;
            let highRiskCitiesList_dateEnd = this.state.highRiskCitiesList_dateEnd;
            return (
                <div className="marLeft40 fl z_searchDiv">
                <label htmlFor="" className="font14">城市：</label>
                <Input width="111px" margin="0 10px 0 0"  type="text"  id='highRiskCitiesList_cityName' placeholder=''  value={highRiskCitiesList_cityName}  callbackParent={this.onChildChanged} />
                <label htmlFor="" className="font14">创建时间：</label>
                <Input width="125px" margin="0 10px 0 0" type="date" id='highRiskCitiesList_dateBegin' value={highRiskCitiesList_dateBegin}  callbackParent={this.onChildChanged}/>
                <span className="font14" style={{margin:"0 10px 0 0"}}>至</span>
                <Input width="125px" margin="0 10px 0 0" type="date" id='highRiskCitiesList_dateEnd' value={highRiskCitiesList_dateEnd} callbackParent={this.onChildChanged}/>
                <ShallowBlueBtn width="82" text="查询" margin="0 10px 0 0" onClick={this.handleClick} />
                <ShallowBlueBtn  width="82" text="创建" margin="0 10px 0 0" onClick={this.handleClickClear} />
                
            </div>
            );
        }
    })
    //模态框组件
export class ModalDialogue extends Component {
    //关闭事件
    handleClose = () => {
        //关闭弹出框
        this.props.changeStatus("none");
        //关闭遮罩
        store.dispatch(changeShade("none"));
    }
    render() {
        let mdisplay = this.props.isShow;
        return (
            <div style={{width:this.props.width,height:this.props.height,border:"1px solid #0C5F93",position:"fixed",left:"34%",top:'35%',zIndex:"9999",display:mdisplay}}>
                {/*头部*/}
                <div style={{background:"rgba(2, 24, 85, 0.9)",padding:"5px"}}>
                    <span style={{float:"left",fontSize:"16px",color:"#fff"}}>创建</span><img src="/images/guanbi.png" style={{float:"right",marginTop:"5px",cursor:"pointer"}}  onClick={this.handleClose}/>
                    <div style={{clear:"both"}}></div>
                </div>
                {/*内容部分*/}
                <div style={{padding:"20px",background:"rgba(37, 51, 100, 0.9)"}}>
                    <div style={{marginBottom:"20px"}}>
                        <div style={{float:"left"}}>
                            <label style={mStyle} htmlFor="">省份</label>
                            <Select width="180px"  text="省份" margin="0 10px 0 0"/>
                        </div>
                        <div style={{float:"left"}}>
                            <label style={mStyle} htmlFor="">城市</label>
                            <Select width="180px" text="城市"/>
                        </div>
                        <div style={{clear:"both"}}></div>
                        
                    </div>
                    
                    
                    <div>
                        <ShallowBlueBtn width="40px" text="创建" margin="0 115px 0 155px"/>
                        <DeepRedBtn width="40px" text="删除"  onClick={this.handleClose}/>
                    </div>
                </div>
            </div>
        );
    }
}
const mStyle = {
        fontSize: "14px",
        color: "#fff",
        marginRight: "10px",
        width: "46px",
        float: "left",
        textAlign: "center"
    }
    //select
const Select = React.createClass({
    render() {
        return ( < select style = {
                {
                    width: this.props.width,
                    margin: this.props.margin,
                    height: 31,
                    background: "rgba(37, 51, 100,0.8)",
                    opacity: 0.8,
                    border: "1px solid #0C5F93",
                    color: "#fff"
                }
            }
            onChange = {
                this.handleChange
            } >
            <option value ="">{this.props.text}</option>

            </select>
        );
    }
});
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
    //按钮
const quitBtn = {
    width: "46%",
    height: 31,
    // lineHeight:"31px",
    background: "#01175F",
    color: "#fff",
    border: "none",
    borderBottom: "2px solid #0025B4",
    fontSize: "0.8rem",
    // padding:"0 6px ",

}
const quitBtnRed = {
    width: 82,
    height: 31,
    // lineHeight:"31px",
    background: "#8C3535",
    color: "#fff",
    border: "none",
    borderBottom: "2px solid #EE3C3C",
    fontSize: "14px",
    // marginLeft:"20px"
    // padding:"0 6px ",

}
const quitBtnBlue = {
    width: 82,
    height: 31,
    // lineHeight:"31px",
    background: "#2B6CC5",
    color: "#fff",
    border: "none",
    borderBottom: "2px solid #0C1CD8",
    fontSize: "14px",
    marginRight: "10px"
        // marginLeft:"20px"
        // padding:"0 6px ",

}

export default connect(mainReducer)(HighRiskCities);