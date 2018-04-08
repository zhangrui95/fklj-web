/**
 * Created by zy on 2017/5/15.
 */
//盘查详情页面
import React, {Component} from 'react'
import {mainReducer} from "../reducers/reducers";
import {fetchUsersData,changeTab} from "../actions/actions";
import {connect} from "react-redux";
import {initInterrogationDetailsTab,postInterrogationDetailsUsersData} from "../actions/InterrogationDetails";
import DynamicRightContent from "./DynamicRightContent";
import {StylePage,ShallowBlueBtn,DeepRedBtn,Input,DeepBlueBtn,PhotoItem,Pag,InterrogationDetailsItem,Tabs} from "./generalPurposeModule";
import {store} from '../index.js';
import  * as constants from "../utils/Constants";
import {BasicInformation} from "./InterrogationDetails/BasicInformation";
import {BgInformation} from "./InterrogationDetails/BgInformation";
import {SwordData} from "./InterrogationDetails/SwordData";
import {ActiveTrajectory} from "./InterrogationDetails/ActiveTrajectory";
import {Header} from "../components/Header";

class InterrogationDetails extends Component{
    constructor(props){
        super(props);
        this.state={
             isShow:"none",
            backgroundTop:"rgba(14, 33, 86, 0.8)",
        }
    }

    componentWillUnmount() { //销毁
        store.dispatch(initInterrogationDetailsTab());
        //回到顶部
        window.removeEventListener('scroll', this.handleScroll.bind(this));
        store.getState().InterrogationDetailsUsers.data.interrogationDetails.personnelInformation = {
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
        store.dispatch(changeTab(tab,type,constants.INTERROGATIONDETAILS_MODULE));

        switch(tab.tabName){
           
            case constants.INTERROGATIONDETAILS_TAB_LJ_DATA:
              //   this.props.dispatch(fetchInterrogationInformationData('/getInterrogationInformation'));
                 break;
            default:
                break
        }
    }

    componentDidMount() {
        //回到顶部
        window.addEventListener('scroll', this.handleScroll.bind(this));
        let search = this.props.params.idNumber;
      let creds = {
            currentPage:1,
            entityOrField:true,
            pd:{
               recordId: this.props.params.recordId,
               personId:this.props.params.personId,
            },
            showCount: constants.pageSize
        }
       this.props.dispatch(postInterrogationDetailsUsersData(creds));

    //   this.props.dispatch(fetchInterrogationDetailsTemporaryPpulationData('/getDetailsBasicInformation',search));
    //   this.props.dispatch(fetchInterrogationDetailsMarryData('/getDetailsBasicInformation',search));
    //   this.props.dispatch(fetchInterrogationDetailsResidenceMemberData('/getDetailsBasicInformation',search));
    //   this.props.dispatch(fetchInterrogationDetailsVehicleData('/getDetailsBasicInformation',search));
    //   this.props.dispatch(fetchInterrogationDetailsDriverData('/getDetailsBasicInformation',search));
    //   this.props.dispatch(fetchInterrogationDetailsRaletionshipData('/getDetailsBasicInformation',search));
    //   //背景信息
    //   this.props.dispatch(fetchInterrogationDetailSCriminalPersonnelData('/getDetailsBgInformation',search));
    //   this.props.dispatch(fetchInterrogationDetailsDrugRelatedData('/getDetailsBgInformation',search));
    //   this.props.dispatch(fetchInterrogationDetailsTrafficViolationData('/getDetailsBgInformation',search));
    //   this.props.dispatch(fetchInterrogationDetailsRelatedjiangzangStudentData('/getDetailsBgInformation',search));
    //   this.props.dispatch(fetchInterrogationDetailsFugitivesData('/getDetailsBgInformation',search));
    //   //活动轨迹
    //   this.props.dispatch(fetchInterrogationDetailsActiveTrajectoryData('/getDetailsActiveTrajectory_fixed',search)); 
    //   //利剑数据 
    //   this.props.dispatch(fetchInterrogationDetailsEssentInformationData('/getDetailsSwordData',search));
    //   this.props.dispatch(fetchInterrogationDetailsVehicleBasicInformationData('/getDetailsSwordData',search));
    //   this.props.dispatch(fetchInterrogationDetailsInfluxPlaceData('/getDetailsSwordData',search));
    //   this.props.dispatch(fetchInterrogationDetailsMobileBasicData('/getDetailsSwordData',search));
    //   this.props.dispatch(fetchInterrogationDetailsInstallSoftwareRecordsData('/getDetailsSwordData',search));
    //   this.props.dispatch(fetchInterrogationDetailsPhoneRecordsData('/getDetailsSwordData',search)); 
    //   this.props.dispatch(fetchInterrogationDetailsPhotoRecordsData('/getDetailsSwordData',search));
    //   this.props.dispatch(fetchInterrogationDetailsInternetRecordsData('/getDetailsSwordData',search));
    //   this.props.dispatch(fetchInterrogationDetailsFileRecordsData('/getDetailsSwordData',search));
   }  
     handleScroll() {
        let scrollTop  = document.body.scrollTop;
        if(scrollTop>10){
                this.setState({
                    isShow:"block"
                });
            
        }else if(scrollTop < 10){
                this.setState({
                    isShow:"none"
                });
        }
    }
     handleTop =()=>{
        window.scrollTo(0,0);   
       
    }
    
    handleTopMouseOver=()=>{
         this.setState({
            backgroundTop:"rgba(12, 95, 147,0.8)"
        });
    }
    handleTopMouseOut=()=>{
        this.setState({
            backgroundTop:"rgba(14, 33, 86, 0.8)"
        });
    }
    render(){
        //标签
        let tabs = this.props.InterrogationDetailsUsers.uiData.tabs;
        let basicInformation=this.props.InterrogationDetailsUsers.data.interrogationDetails.basicInformation;
        let bgInformationList=this.props.InterrogationDetailsUsers.data.interrogationDetails.bgInformationList;
        let swordData=this.props.InterrogationDetailsUsers.data.interrogationDetails.swordData;
        let activeTrajectoryList=this.props.InterrogationDetailsUsers.data.interrogationDetails.activeTrajectoryList;

        let isSelectTab,content;
        //查找被选中的标签
        tabs.forEach(function(tab){
            if(tab.isSelect===true){
                isSelectTab = tab;
            }
        });
        let  recordId= this.props.params.recordId;
        let personId =  this.props.params.personId;

        switch(isSelectTab.tabName){
            case constants.INTERROGATIONDETAILS_TAB_LJ_DATA:
                content =<SwordData recordId={recordId} personId={personId} />
                break
            default:
                break
        }

        let isShow = this.state.isShow;
        let backgroundTop = this.state.backgroundTop;
        let interrogationDetailsList =store.getState().InterrogationDetailsUsers.data.interrogationDetails.personnelInformation.result.list;
    let interrogation = []
        for(var i = 0;i<interrogationDetailsList.length;i++){
            var interrogationDetails = interrogationDetailsList[i];
            interrogation.push(
                <InterrogationDetailsItem  interrogationDetailsUser = {interrogationDetails}/>
            );
        }
        
        return (
            <div>
                <Header />
                <div>
                    <p style={{fontSize:"16px",color:"#fff",marginTop:"20px",paddingLeft:"18px"}}>盘查详情</p>
                </div>
                <div style={{padding:"18px"}}>
                    {/*{interrogationDetailsUserItems}*/}
                      {/*<InterrogationDetailsItem  interrogationDetailsUser = {interrogationDetailsList }/>*/}
                      {interrogation}
                    {/*标签页*/}
                    <div>
                        <div style={{marginTop:"20px"}}>
                            <Tabs  tabs={tabs} handleTabClick={this.handleTabClick}/>
                            <div style={{clear:"both"}}></div>
                        </div>
                         {content}
                    </div>
                </div>
                 <div style={{position:"fixed",bottom:"0",right:"0",width:"60px",height:"60px",background:backgroundTop,textAlign:"center",borderRadius:"60px",display:isShow}}
                  onMouseOver={this.handleTopMouseOver} onMouseOut={this.handleTopMouseOut} onClick={this.handleTop}>
                    {/*<button>回到顶部</button>*/}
                    <img src="/images/top.png" alt="" style={{marginTop:"17px"}}  />
                </div>
            </div>
        );
    }
}


export default connect(mainReducer)(InterrogationDetails);
