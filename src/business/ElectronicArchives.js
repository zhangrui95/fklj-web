// 电子档案页面
/**
 * Created by zy on 2017/5/15.
 */
//盘查详情页面
import React, {Component} from 'react'
import {mainReducer} from "../reducers/reducers";
import {fetchUsersData,changeTab} from "../actions/actions";
import {connect} from "react-redux";
import {initElectroTab,
postElectronicArchivesData} from "../actions/ElectronicArchives";
import DynamicRightContent from "./DynamicRightContent";
import {StylePage,ShallowBlueBtn,DeepRedBtn,Input,DeepBlueBtn,PhotoItem,Pag,InterrogationDetailsItem,Tabs} from "./generalPurposeModule";
import {store} from '../index.js';
import  * as constants from "../utils/Constants";
import {BasicInformation} from "./InterrogationDetails/BasicInformation";
import {BgInformation} from "./InterrogationDetails/BgInformation";
import {SwordData} from "./InterrogationDetails/SwordData";
import {ActiveTrajectory} from "./InterrogationDetails/ActiveTrajectory";
import {Header} from "../components/Header";
import {
    EmptyData
} from "../components/EmptyData";

class ElectronicArchives extends Component{

    componentWillUnmount() { //销毁
        store.dispatch(initElectroTab());
        store.getState().ElectronicArchivesUsers.data.ElectronicArchives.personnelInformation = {
             reason: {
                        "code": "",
                        "text": ""
                        },
                        result: {
                          
                            list: [],
                    }
        }
    }
    //设置管理菜单点击-获取数据-开关事件
    handleTabClick = (tab,type) => {

        store.dispatch(changeTab(tab,type,constants.ELETRO_MODULE));

        switch(tab.tabName){
            case constants.INTERROGATIONDETAILS_TAB_BASIC:
            //     this.props.dispatch(fetchHorrorSoftwareData('/getHorrorSoftware'));
                 break;
            case constants.INTERROGATIONDETAILS_TAB_CONTEXT:
             //    this.props.dispatch(fetchInterrogationInformationData('/getInterrogationInformation'));
                 break;
            case constants.INTERROGATIONDETAILS_TAB_ACTIVE_TRAJECTORY:
              //   this.props.dispatch(fetchInterrogationInformationData('/getInterrogationInformation'));
                 break;
            case constants.INTERROGATIONDETAILS_TAB_NEW_LJ_DATA:
              //   this.props.dispatch(fetchInterrogationInformationData('/getInterrogationInformation'));
                 break;
            default:
                break
        }
    }

    componentDidMount() {
      let search = "idNumber="+this.props.params.personId;
      let creds = {
            currentPage:1,
            entityOrField:true,
            pd:{
            //    personId: this.props.params.personId,
            //    recordId: this.props.params.recordId,
               idcard: this.props.params.idcard,
            },
            showCount: constants.pageSize
        }
       this.props.dispatch(postElectronicArchivesData(creds));
   }
    render(){
        let ElectronicArchivesList =store.getState().ElectronicArchivesUsers.data.ElectronicArchives.personnelInformation.result.list;
        let interrogation = []
        var ElectronicArchives = null;
        for(var i = 0;i<ElectronicArchivesList.length;i++){
            ElectronicArchives = ElectronicArchivesList[i];
            interrogation.push(
                <InterrogationDetailsItem  interrogationDetailsUser = {ElectronicArchives}/>
            );
        }

        //标签
        let tabs =store.getState().ElectronicArchivesUsers.uiData.tabs;
        let isSelectTab,content;
        //查找被选中的标签
        tabs.forEach(function(tab){
            if(tab.isSelect===true){
                isSelectTab = tab;
            }
        });

        let recordId = (ElectronicArchives===null?0:ElectronicArchives.recordId);
        let personId = (ElectronicArchives===null?0:ElectronicArchives.personId);
        let user = JSON.parse(sessionStorage.getItem('user'));
        let jyxm = user.user.name;
        let idcard =  this.props.params.idcard;
        if(ElectronicArchives !== null){
            switch(isSelectTab.tabName){
                // case constants.INTERROGATIONDETAILS_TAB_BASIC:
                //     content = <BasicInformation idcard={idcard} />
                //     break
                // case constants.INTERROGATIONDETAILS_TAB_CONTEXT:
                //     content =<BgInformation idcard={idcard} recordId={recordId} personId={personId}/>
                //     break
                
                // case constants.INTERROGATIONDETAILS_TAB_ACTIVE_TRAJECTORY:
                //     content =<ActiveTrajectory idcard={idcard} jyxm={jyxm}/>
                //     break
                case constants.INTERROGATIONDETAILS_TAB_NEW_LJ_DATA:
                    content =<div>
                        <div style={{marginTop:"20px"}}>
                            <Tabs  tabs={tabs} handleTabClick={this.handleTabClick}/>
                            <div style={{clear:"both"}}></div>
                        </div>
                        <SwordData recordId={recordId} personId={personId} />
                        </div>
                    break
                default:
                    break
            }
        }else{
            content=<EmptyData />
        }

        return (
            
            <div>
                <Header homeType="hs_fklj_sys"/>
                <div>
                    <p style={{fontSize:"16px",color:"#fff",marginTop:"20px",paddingLeft:"18px"}}>电子档案</p>
                </div>
                <div style={{padding:"18px"}}>
                    {/*{interrogationDetailsUserItems}*/}
                      {interrogation}
                    {/*标签页*/}
                    <div>
                        
                         {content}
                    </div>
                </div>
                
            </div>
        );
    }
}


export default connect(mainReducer)(ElectronicArchives);
