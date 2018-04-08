/**
 * 研判报告左侧的研判历史
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mainReducer } from "../../reducers/reducers";
import { fetchJudgeHistoryData, postJudgeHistoryData, editAuditReportData } from "../../actions/AuditReport";
import { PagSmall } from "../../business/generalPurposeModule";
import { store } from '../../index.js';
import * as constants from "../../utils/Constants";
import { changeMenu } from "../../actions/actions";

export class JudgeHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nowPage: 1,
        };
        this.pageChange = this.pageChange.bind(this);
    }
    componentDidMount() {
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                idcard: this.props.idcard,
            },
        }
        store.dispatch(postJudgeHistoryData(creds));

    }
    // 分页改变
    pageChange(nowPage) {
        this.state = Object.assign({}, this.state, { nowPage: nowPage });
        let creds = {
            currentPage: nowPage,
            entityOrField: true,
            pd: {
                idcard: this.props.idcard,
            },
        }
        store.dispatch(postJudgeHistoryData(creds));
    }

    render() {
        let judgeHistoryList = store.getState().AuditReport.data.judgeHistory.result.list;
        let totalRecord = store.getState().AuditReport.data.judgeHistory.result.total;
        let li_s = [];
        for (var i = 0; i < judgeHistoryList.length; i++) {
            let judgeHistory = judgeHistoryList[i];
            li_s.push(
                <Item judgeHistory={judgeHistory} />
            )
        }
        return (
            <div>
                <div style={wrap}>
                    <div style={titlediv}>研判历史</div>
                    <div style={{ padding: "10px 0" }}>
                        <div style={{ fontSize: "14px", color: "#fff", fontWeight:"bold", padding: "10px 15px", cursor: "pointer" }}>
                            <span  style={{ float: "left", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: '40%' }}>研判人</span>
                            <span  style={{ float: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: '59%' }}>研判时间</span>
                            <div style={{ clear: "both" }}></div>
                        </div>
                        <ul>
                            {li_s}
                            {/*<li>*/}
                            {/*<span style={{fontSize:"14px",color:"#fff",float:"left"}}>张警官</span><span style={{fontSize:"14px",color:"#fff",float:"right"}}>2017/03/23 &nbsp; 11:40:00</span>*/}
                            {/*<div style={{clear:"both"}}></div>*/}
                            {/*</li>*/}

                        </ul>
                    </div>
                    <div style={titlediv}>
                        <div>
                            <PagSmall pageSize={10} nowPage={this.state.nowPage} totalRecord={totalRecord} pageChange={this.pageChange} padding="0 15px 10px 15px" />
                            <div style={{ clear: "both" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};


//研判历史项
class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: "transparent",
            color: "#D5D5D5"
        }
    }
    handleMouseOver = () => {
        this.setState({
            background: "#2A3E78",
            color: "#B56360"
        });
    }
    handleMouseout = () => {
        this.setState({
            background: "transparent",
            color: "#D5D5D5"
        });
    }
    //点击研判列表请求相应数据事假
    editJson = (judge_record_id) => {
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                judge_record_id: judge_record_id
            },
        }
        store.dispatch(editAuditReportData(creds));
    }
    render() {
        let judgeHistory = this.props.judgeHistory;
        let background = this.state.background;
        let color = this.state.color;
        return (
            <li onClick={editJson => this.editJson(judgeHistory.judge_record_id)} style={{ fontSize: "14px", color: color, background: background, padding: "10px 15px", cursor: "pointer" }} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseout}>
                <span title={judgeHistory.createuser} style={{ float: "left", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: '40%' }}>{judgeHistory.createuser}</span>
                <span title={judgeHistory.createtime} style={{ float: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: '59%' }}>{judgeHistory.createtime}</span>
                <div style={{ clear: "both" }}></div>
            </li>
        );
    }
};


const wrap = {
    width: "98%",
    border: "1px solid #0C5F93",
    background: "rgba(25,41,85,0.5)",
    //marginTop:"20px",

}
const titlediv = {
    background: "rgba(2, 24, 85, 0.5)",
    lineHeight: "40px",
    color: "#fff",
    padding: "0 15px",

}
const clear = {
    clear: "both"
}

export default connect(mainReducer)(JudgeHistory);