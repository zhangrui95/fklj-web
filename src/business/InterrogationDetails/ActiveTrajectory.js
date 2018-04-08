/**
 * Created by ycj on 2017/4/6.
 */
// 盘查详情页面活动轨迹
import React, {
    Component
} from 'react';
import {
    connect
} from "react-redux";
import {
    mainReducer
} from "../../reducers/reducers";
import {
    StylePage,
    ShallowBlueBtn,
    DeepRedBtn,
    DeepBlueBtn,
    PhotoItem,
    Pag,
    InterrogationDetailsItem,
    Tabs
} from "../generalPurposeModule";
import {
    postELECTOROActiveTrajectoryData
} from "../../actions/ElectronicArchives";
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
    message,
    Pagination
} from 'antd';
import reqwest from 'reqwest';
import {
    api
} from '../../actions/actions';
import {
    post,
    get,
    put
} from "../../actions/request";
import {
    Link
} from "react-router";

const font18 = {
    fontSize: "18px",
    color: "#fff",
    textAlign: "left",
    marginBottom: "35px",
    width: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    /*文字溢出的部分隐藏并用省略号代替*/
    whiteSpace: "nowrap"

}
const font16 = {
    fontSize: "16px",
    color: "#fff",
    textAlign: "left",
    width: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    /*文字溢出的部分隐藏并用省略号代替*/
    whiteSpace: "nowrap"
}
const font16two = {
    fontSize: "16px",
    color: "#fff",
    textAlign: "left",
    width: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
    /*文字溢出的部分隐藏并用省略号代替*/
    whiteSpace: "nowrap"
}
const bgDiv = {
    background: "rgba(25, 41, 85, 0.498039)",
    padding: "15px"
}


export class ActiveTrajectory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],

        }
    }
    fetch = (params = {
        "currentPage": 1,
        "entityOrField": true,
        pd: {
            idcard: this.props.idcard,
            jyxm: this.props.jyxm
        },
        "showCount": constants.recordPageSize
    }) => {
        post(api + '/data/getHotelTry', params).then((data) => {
            this.setState({
                loading: false,
                data: data.result.list,
            });

        }).catch((e) => {});
    }
    componentDidMount() {


        this.fetch();
    }
    render() {
        let data = this.state.data;
        //let activeTrajectoryList=this.props.activeTrajectoryList;
        return (
            <div>
                
               <TrajectoryModel activeTrajectoryList={data}/>
            </div>
        );
    }
}
//轨迹列表
const TrajectoryModel = React.createClass({
    render() {
        let activeTrajectory = this.props.activeTrajectoryList;
        let dates = [];
        let nowYearAndMonth = "";
        for (var i = 0; i < activeTrajectory.length; i++) {
            var dataList = activeTrajectory[i];
            var gj = dataList.beginDate;
            var dateSplit = gj.split('-');

            let YearAndMonth = dateSplit[0] + "年" + dateSplit[1] + "月";
            if (nowYearAndMonth != YearAndMonth) {
                dates.push(
                    <DateBox  key={gj}  date={YearAndMonth} />
                );
                nowYearAndMonth = YearAndMonth;
            }
            dates.push(
                <TrajectoryDiv key={i} dataList={dataList}/>
            );
            console.log('dates',dates);
        }



        return (
            <div  style={{border:"1px solid rgb(12, 95, 147)",padding:"20px",background:"rgba(40,51,99,0.8)",zIndex:"3"}}>
                <p style={{color:"#fff",fontSize:"16px",marginBottom:"10px"}}>活动轨迹</p>
                {dates.length>0?
                 <div>{dates}</div>:
                 <div style={{color:"#fff",fontSize:30,textAlign:"center",margin:"30px 0"}}>暂无数据</div>
                }
                {/*{dates}*/}
            </div>
        );
    }
});

//轨迹详情
const TrajectoryDiv = React.createClass({
    render(){
        let dataList = this.props.dataList;
        return (
            
            <div>
               
                <div style={{width:"1170px",margin:"0 auto",marginBottom:"20px"}}>
                    <div style={bgDiv}>
                        <div style={{float:"left",marginRight:"30px"}}>
                            {dataList.type==="plane"?<img src="/images/air.png" alt=""/>
                            :dataList.type==="netPlay"?<img src="/images/internet.png" alt=""/>
                            :dataList.type==="railway"?<img src="/images/tielu.png" alt=""/>
                            :dataList.type==="highway"?<img src="/images/gonglu.png" alt=""/>
                            :dataList.type==="hostel"?<img src="/images/hotel.png"/>:''}
                            </div>
                        <div style={{float:"left",marginRight:"10px",width:"300px"}}>
                            <p style={font18}>
                                {dataList.type==="plane"?"民航"
                                :dataList.type==="netPlay"?"上网"
                                :dataList.type==="railway"?"铁路"
                                :dataList.type==="highway"?"公路"
                                :dataList.type==="hostel"?"酒店":''}
                            </p>
                            <p style={font16two} title={dataList.type==="netPlay" ?dataList.address : dataList.fromCity + "---" + dataList.toCity && dataList.type==="hostel" ?dataList.address : dataList.fromCity + "---" + dataList.toCity}>
                                {dataList.type==="netPlay" ?dataList.address : dataList.fromCity + "---" + dataList.toCity && dataList.type==="hostel" ?dataList.address : dataList.fromCity + "---" + dataList.toCity}
                            </p>
                        </div>
                        <div style={{float:"left",marginRight:"10px",width:"300px"}}>
                            <p style={font18}>
                            {dataList.type==="plane"?"班次："+dataList.name
                            :dataList.type==="netPlay"?dataList.name
                            :dataList.type==="railway"?"车次："+dataList.name
                            :dataList.type==="highway"?"车次："+dataList.name:dataList.name}
                            </p>
                        </div>
                        <div style={{float:"left",width:"400px"}}>
                            <p style={font18}>
                                {dataList.type==="netPlay"?"主机号："+dataList.position:"座位："+dataList.position && dataList.type==="hostel"?"房间号："+dataList.position:"座位："+dataList.position}
                            </p>
                            <p style={font16}>{dataList.type==="netPlay" ? dataList.beginDate + "-" + dataList.endDate:dataList.beginDate}</p>
                        </div>
                        <div style={{clear:"both"}}></div>
                    </div>
                </div>
                
            </div>
        );
    }
    

});
//年月标题
const DateBox = React.createClass({
    render() {

        return (
            <div style={{fontSize:"18px",color:"#00acee",textAlign:"center",margin:"20px 0 20px 0"}}>{this.props.date}</div>
        );
    }
});