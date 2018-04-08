/**
 * 研判报告
 */
import React, {Component} from 'react'
import {mainReducer} from "../reducers/reducers";
import {connect} from "react-redux";
import {store} from '../index.js';
import {
    StylePage,
    ShallowBlueBtn,
    DeepRedBtn,
    Input,
    DeepBlueBtn,
    PhotoItem,
    Pag,
    SliderMenuItem,
    Shade
} from "./generalPurposeModule";
import {Header} from "../components/Header";
import CommonResources from "./AuditReport/CommonResources";
import JudgeHistory from "./AuditReport/JudgeHistory";
import AuditReportRight from "./AuditReportRight";
import {postBasicInformationData
} from "../actions/AuditReport";
import {changeMenu,initAuditreportMenu} from "../actions/actions";


class AuditReport extends Component{
     componentWillUnmount() { //销毁
            store.dispatch(initAuditreportMenu(store.getState().AuditReport.uiData.menus))
        }
    componentDidMount(){
        // let userItem = JSON.parse(sessionStorage.getItem('user'));
        // let creds = {
        //     currentPage: 1,
        //     entityOrField: true,
        //     pd: {
        //         personId:this.props.params.personId,
        //         followerUserid: '' + userItem.body.idcard,
        //     },
            
        // }
        // store.dispatch(postBasicInformationData(creds));
    }
    
    render(){
        //遮罩状态
        // let basicInformation = store.getState().AuditReport.data.basicInformation.result.list;
        // let basic;
        // for(var i=0;i<basicInformation.length;i++){
        //     let basicData = basicInformation[i];
        //     basic = basicData;
        // }
        let isBlock = store.getState().root.uiData.ModalDialogueBg;
        return(
            <div style={{overflow:"hidden",width:"100%"}}>
                <Shade isBlock={isBlock}/>
                <Header />
                <div style={{padding:"1%"}}>
                    <div style={{float:"left",width:"17%"}}>
                        {/* <CommonResources />*/}
                        <JudgeHistory idcard={this.props.params.idcard}/> 
                    </div>
                    <div style={{float:"right",width:"82%"}}>
                        <AuditReportRight idcard={this.props.params.idcard} personId={this.props.params.personId}/>
                    </div>
                    <div style={{clear:"both"}}></div>
                </div>
            </div>
        );
    }
}
export default connect(mainReducer)(AuditReport);