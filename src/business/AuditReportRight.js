/**
 * 研判报告左侧的常用资源
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mainReducer} from "../reducers/reducers";
import BasicInformation from "./AuditReport/BasicInformation";
import JudgmentAnalysis from "./AuditReport/JudgmentAnalysis";
import TrajectoryInformation from "./AuditReport/TrajectoryInformation";
import BgInformation from "./AuditReport/BgInformation";
import OnlineInformation from "./AuditReport/OnlineInformation";
import BankInformation from "./AuditReport/BankInformation";
import RelatedPerson from "./AuditReport/RelatedPerson";

import  * as constants from "../utils/Constants";
import {store} from '../index.js';
import {changeMenu,initAuditreportMenu} from "../actions/actions";
import {postBasicInformationData,postJudgeCodeData
} from "../actions/AuditReport";
import  {initialStateReturn} from "../reducers/initialState";
import moment from 'moment';
import 'moment/locale/zh-cn';
import {Compare} from "../utils/Tools.js";
const wrap = {
    width:"100%",
    border: "1px solid #0C5F93",
    background: "rgba(25,41,85,0.5)",
   

}
const font20 = {
    fontSize:"20px",
    color:"#fff",
    marginBottom:"20px",
}
const titleBg = {
    background: "rgba(2, 24, 85, 0.5)",
    padding:"15px",
}
const clear = {
    clear:"both"
}
const flowItem = {
    float:"left",
    width:"142px",
    textAlign:"center",
    cursor:"pointer"
}
//默认选中样式
const flowDivDefault = {
    position:"relative",
    padding:"1px 0 2px 12px",
    color:"#fff",
    overflow:"visible",
    background:"#4F5C7F",
    float:"left",
    width:"115px",
    // height:"31px",
}
const triangeDefaultRight = {
    width:"0",
    height:0,
    borderTop:"12.5px solid transparent",
    borderLeft:"15px solid #4F5C7F",
    borderBottom:"12.5px solid transparent",
    float:"left"
}
//完成的
const flowDiv = {
    position:"relative",
    padding:"1px 0 2px 12px",
    color:"#fff",
    overflow:"visible",
    background:"#0A77AE",
    float:"left",
    width:"115px",
    // height:"31px",
}
const triangeRight = {
    width:"0",
    height:0,
    borderTop:"12.5px solid transparent",
    borderLeft:"15px solid #0A77AE",
    borderBottom:"12.5px solid transparent",
    float:"left"
}
//最后选中的
const flowDivLastSelect = {
    position:"relative",
    padding:"1px 0 2px 12px",
    color:"#fff",
    overflow:"visible",
    background:"#BE6557",
    float:"left",
    width:"115px",
    // height:"31px",
}
const triangeLastRight = {
    width:"0",
    height:0,
    borderTop:"12.5px solid transparent",
    borderLeft:"15px solid #BE6557",
    borderBottom:"12.5px solid transparent",
    float:"left"
}
const flowDivNowSelect = {
    position:"relative",
    padding:"1px 0 2px 12px",
    color:"#fff",
    overflow:"visible",
    background:"#2aae1d",
    float:"left",
    width:"115px",
    // height:"31px",
}
const triangeNowRight = {
    width:"0",
    height:0,
    borderTop:"12.5px solid transparent",
    borderLeft:"15px solid #2aae1d",
    borderBottom:"12.5px solid transparent",
    float:"left"
}

const triangeRightDise = {
    position:"absolute",
    top:"0",
    left:"0",
    width:"0",
    height:0,
    borderTop:"12.5px solid transparent",
    borderLeft:"15px solid #1E2C58",
    borderBottom:"12.5px solid transparent"
}

export class AuditReportRight extends Component{
    componentWillUnmount() { //销毁
        store.getState().AuditReport.uiData.menus =  [
            {
                id: '101',
                menuName: '基础信息',
                isSelect: true,  //当前选中
                lastSelect: true,  //最后选中
                stage: 1  //阶段
            },
            {
                id: '102',
                menuName: '背景信息',
                isSelect: false,
                lastSelect: false,
                stage: 2
            },
            {
                id: '103',
                menuName: '网上通联信息',
                isSelect: false,
                lastSelect: false,
                stage: 3
            },
            {
                id: '104',
                menuName: '银行信息',
                isSelect: false,
                lastSelect: false,
                stage: 4
            },
            {
                id: '105',
                menuName: '轨迹信息',
                isSelect: false,
                lastSelect: false,
                stage: 5
            },
            {
                id: '106',
                menuName: '关联人',
                isSelect: false,
                lastSelect: false,
                stage: 6
            },
            {
                id: '107',
                menuName: '研判分析',
                isSelect: false,
                lastSelect: false,
                stage: 7
            },
        ];
    }
        constructor(props){
            super(props);
            this.state={
                 head:store.getState().AuditReport.data.head,
                name:'',
                judgeCode:'',
                username:''
                
            }
        }
        componentDidMount(){
            let params = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                  idcard:this.props.idcard
                }, 
            }
            store.dispatch(postJudgeCodeData(params));
           
        }
        componentWillReceiveProps(nextProps){
            
             let judgeCode = store.getState().AuditReport.data.judgeCode.result;
             let toConfigure = nextProps.AuditReport.data.toConfigure;
            // let basicData
            // for(var i=0;i<basicInformation.length;i++){
            //      basicData = basicInformation[i];
            //     // basic = basicData;
            // }
            let  head  = nextProps.AuditReport.data.head;
            let username = nextProps.AuditReport.data.username;
            this.setState({
               // name :basicData.name,
               head: head,
                judgeCode:judgeCode,
                username:username,
                toConfigure:toConfigure,
            });
        }

        //刷新
        forceFun=()=>{
            this.forceUpdate();
        }
        
       
        render(){
           let userItem = JSON.parse(sessionStorage.getItem('user'));
           
            let isSelectMenu,content;
            let menus = this.props.AuditReport.uiData.menus;
            //查找被选中菜单-进度条
            menus.forEach(function(menu){
                if(menu.isSelect === true){//判断一级目录是否选中
                    isSelectMenu = menu;
                    return
                }
            });
            switch(isSelectMenu.menuName){
                case constants.AUDIT_REPORT_BASICIN_FORMATION: //基础信息
                    //basicInformation={basicInformation}
                    content = <BasicInformation idcard={this.props.idcard} personId={this.props.personId}  judgeCode={this.state.judgeCode}/>
                    break
                case constants.AUDIT_REPORT_JUDGMENT_ANALYSIS: //研判分析
                    content = <JudgmentAnalysis idcard={this.props.idcard} forceFun={this.forceFun}  judgeCode={this.state.judgeCode}/>
                    break
                case constants.AUDIT_REPORT_TRAJECTORY_INFORMATION: //轨迹信息
                    content = <TrajectoryInformation idcard={this.props.idcard}  judgeCode={this.state.judgeCode}/>
                    break
                case constants.AUDIT_REPORT_BG_INFORMATION://背景信息
                     content = <BgInformation idcard={this.props.idcard} judgeCode={this.state.judgeCode}/>
                    break  
                case constants.AUDIT_REPORT_ONLINE_INFORMATION://网上通联信息
                     content = <OnlineInformation idcard={this.props.idcard}  judgeCode={this.state.judgeCode}/>
                    break
                case constants.AUDIT_REPORT_BANK_INFORMATION://银行信息
                     content = <BankInformation idcard={this.props.idcard}  judgeCode={this.state.judgeCode}/>
                    break
               case constants.AUDIT_REPORT_RELATED_PERSON://网上关系人
                     content = <RelatedPerson idcard={this.props.idcard} judgeCode={this.state.judgeCode}/>
                    break
                default:
                    break
            }

            //获取头部信息
            let head = this.state.head;
            let toConfigure = this.state.toConfigure;

            return(
                <div>
                    <div style={wrap}>
                        {/*标题头*/}
                        <div style={titleBg}>
                            <div style={font20}>关于(<span style={{color:"#C1665E"}}>{head.name||""}</span>)研判报告</div>
                            <div>
                                <div style={{fontSize:"14px",color:"#fff",float:"left",width:"30%"}}>
                                    <p style={{marginBottom:"10px"}}>
                                        <span>编&nbsp;&nbsp;号：</span><spna>{this.state.judgeCode}</spna>
                                    </p>
                                    <p>
                                        <span>研判人员：</span><spna>{toConfigure==='' ?userItem.body.name: this.state.username}</spna>
                                    </p>
                                </div>
                                <div style={{fontSize:"14px",color:"#fff",float:"left",width:"20%"}}>
                                    <p style={{marginBottom:"10px"}}>
                                        <span>研判级别：</span><spna>{head.judgmentLevel||"未选择"}</spna>
                                    </p>
                                    <p>
                                        <span>研判时间：</span><spna>{head.judgmentTime||moment().format('YYYY-MM-DD HH:mm:ss')}</spna>
                                    </p>
                                </div>
                                <div style={{fontSize:"14px",color:"#fff",float:"left",width:"20%"}}>
                                    <p style={{marginBottom:"10px"}}>
                                        <span>涉恐类别：</span><spna>{head.terrorType||"未选择"}</spna>
                                    </p>
                                    <p>
                                        <span>线索来源：</span><spna>{head.source||"未填写"}</spna>
                                    </p>
                                </div>
                                <div style={{clear:"both"}}></div>
                            </div>
                        </div>
                        <div style={{padding:"15px 0"}}>
                            {/*进度*/}
                                <ProgressBar  menus={menus} isSelect={isSelectMenu}/>
                                <div style={clear}></div>
                            {/*内容*/}

                            {content}
                        </div>
                        
                    </div>
                </div>
            );
        }
};

/**
 * 进度条
 */
class ProgressBar extends Component {
    constructor(props){
        super(props);
        this.menus = this.props.menus;
    }
    componentWillReceiveProps(nextProps){
        //if(this.menus)
       if(Compare(this.menus,nextProps.menus) === false){
           this.menus = nextProps.menus;
       } 
       console.log('this.menus',this.menus);
       console.log('nextProps.menus',nextProps.menus);
    }

    handleClick(menu) {//选中事件
        //获取当前选中和最后选中项
        let isSelectMenu;
        let lastSelectMenu;
        for(let x in this.menus){
            if(this.menus[x].isSelect === true){
                isSelectMenu = this.menus[x];
            }
            if(this.menus[x].lastSelect === true){
                lastSelectMenu = this.menus[x];
            }
        }
        if(menu.stage <= lastSelectMenu.stage){
            store.dispatch(changeMenu(menu,'getData',constants.AUDIT_REPORT_MODULE)); //改变选中样式
        }
    }
    render() {
        let tabs=[];
        let judge = false;
        for(var i=0;i<this.menus.length;i++){
            let menu = this.menus[i];

            //默认DIV样式
            let defaultDiv =
                <div style={flowItem}>
                    <div style={flowDivDefault}  onClick={this.handleClick.bind(this,menu)}>
                        <span style={triangeRightDise}></span>
                        <span style={{fontSize:"14px"}}>{menu.menuName}</span>
                    </div>
                    <span style={triangeDefaultRight}></span>
                    <div style={clear}></div>
                </div>;
            //完成的DIV样式
            let  passDiv =
                <div style={flowItem}>
                    <div style={flowDiv}  onClick={this.handleClick.bind(this,menu)}>
                        <span style={triangeRightDise}></span>
                        <span style={{fontSize:"14px"}}>{menu.menuName}</span>
                    </div>
                    <span style={triangeRight}></span>
                    <div style={clear}></div>
                </div>;
            //最后选中DIV样式
            let lastSelectDiv =
                <div style={flowItem}>
                    <div style={flowDivLastSelect}  onClick={this.handleClick.bind(this,menu)}>
                        <span style={triangeRightDise}></span>
                        <span style={{fontSize:"14px"}}>{menu.menuName}</span>
                    </div>
                    <span style={triangeLastRight}></span>
                    <div style={clear}></div>
                </div>;
            //当前选中DIV样式
            let nowSelectDiv =
                <div style={flowItem}>
                    <div style={flowDivNowSelect}  onClick={this.handleClick.bind(this,menu)}>
                        <span style={triangeRightDise}></span>
                        <span style={{fontSize:"14px"}}>{menu.menuName}</span>
                    </div>
                    <span style={triangeNowRight}></span>
                    <div style={clear}></div>
                </div>;
            let div;

            if(judge === false){
                div = passDiv; //蓝色DIV，完成的
            }else{
                div = defaultDiv;//默认灰色DIV
            }
            if(menu.isSelect === true){//当前选中
                div = nowSelectDiv;
            }

            if(menu.lastSelect === true){//最后选中
                div = lastSelectDiv;
                judge = true;
            }

            if(menu.isSelect === true && menu.lastSelect === true){//当前选中和最后选中相同
                div = lastSelectDiv
            }

            tabs.push(
                div
            )
        }
        return (
            <div style={{margin: "0 auto",width:"1105px", minWidth: "1105px"}}>
                {tabs}
                <div style={{clear:"both"}}></div>
            </div>
        );
    }
};




export default connect(mainReducer)(AuditReportRight);