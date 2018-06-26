/**
 * 设置管理右侧
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mainReducer} from "../reducers/reducers";
import {fetchPlaceOfInfluxPersonData,fetchPlaceOfOriginPersonData,
    fetchHighRiskAreaData,fetchWhiteListData,fetchBlackListData,
    fetchInterrogationInformationData,fetchHorrorSoftwareData,getHorrorSoftwareData,getExceptionParameterReminderData,
    postExceptionParameterReminderData,postCodeTableData
} from "../actions/SystemManagement";
import {StylePage,ShallowBlueBtn,DeepRedBtn,Input,DeepBlueBtn,PhotoItem,Pag} from "./generalPurposeModule";
import  {HorrorSoftware}  from "./SystemManagement/HorrorSoftware";
import  {InterrogationInformation}  from "./SystemManagement/InterrogationInformation";
import  {ExceptionParameterReminder}  from "./SystemManagement/ExceptionParameterReminder";
import  {BlackList}  from "./SystemManagement/BlackList";
import  {WhiteList}  from "./SystemManagement/WhiteList";
import  {HighRiskCities}  from "./SystemManagement/HighRiskCities";
import  {PlaceOfOriginPerson}  from "./SystemManagement/PlaceOfOriginPerson";
import  {PlaceOfInfluxPerson}  from "./SystemManagement/PlaceOfInfluxPerson";
import  {HighRiskLine}  from "./SystemManagement/HighRiskLine";
import  {RedList} from "./SystemManagement/RedList";
import  {CodingTable} from "./SystemManagement/CodingTable";
import {AddSystem}  from "./SystemManagement/AddSystem";
import {AreaManage}  from "./AreaManagement/AreaManage";

import {store} from '../index.js';
import  * as constants from "../utils/Constants";
let menus = [];
class SystemManagementRight extends Component{

    componentDidMount() {
        this.props.SystemManagement.uiData.menus.map((menu) =>  {
            if(menu.isShow){
                menus.push(menu);
            }
        })
        menus[0].isSelect = true;
        //this.props.dispatch(fetchHorrorSoftwareData('/getHorrorSoftware'));
        //this.props.dispatch(getHorrorSoftwareData('/getHorrorSoftware'));
        // this.props.dispatch(getExceptionParameterReminderData());
        // let creds ={
        //             showCount: 10,
        //             totalPage: 0,
        //             totalResult: 0,
        //             currentPage: 0,
        //             currentResult: 0,
        //             entityOrField: true,
        //             pageStr: "",
        //             pd: {
        //                 pid:"200"
        //             }
        //         }
        //          this.props.dispatch(postExceptionParameterReminderData(creds));
        let creds = {
            currentPage: 1,
            entityOrField: true,
            pd: {
                pid:""
            },
            showCount: 999
        }
        store.dispatch(postCodeTableData(creds));
    }
    render(){
        // let horrorSoftwareList = this.props.SystemManagement.data.horrorSoftwareList.result.list;
        // let interrogationInformationList = this.props.SystemManagement.data.interrogationInformationList;
        // let blackList = this.props.SystemManagement.data.blackList;
        // let whiteList = this.props.SystemManagement.data.whiteList;
        // let highRiskCitiesList = this.props.SystemManagement.data.highRiskCitiesList;
        // let highRiskLineList = this.props.SystemManagement.data.highRiskLineList;
         let redList = this.props.SystemManagement.data.redList;

        // let placeOfOriginPersonList = this.props.SystemManagement.data.placeOfOriginPersonList;
        // let placeOfInfluxPersonList = this.props.SystemManagement.data.placeOfInfluxPersonList;
        // let exceptionParameterReminderInfo_local = this.props.SystemManagement.data.exceptionParameterReminder;
        // let exceptionParameterReminder = this.props.SystemManagement.data.exceptionParameterReminder;
        let codeTable = this.props.SystemManagement.data.codeTableist.result.list

        let isSelectMenu;
        let content;
        //查找被选中菜单
        this.props.SystemManagement.uiData.menus.forEach(function(menu){
            if(menu.isSelect === true){//判断一级目录是否选中
                isSelectMenu = menu;
                return
            }
            if(menu.haveSon === true){ //判断二级目录是否选中
                menu.sonMenu.forEach(function (sonMenu) {
                    if(sonMenu.isSelect === true){
                        isSelectMenu = sonMenu;
                        return
                    }
                    }
                )
            }
        });
        switch(isSelectMenu.menuName){
            case constants.SYSTEMMANAGEMENT_MENU_HORRORSOFTWARE:
                content = <HorrorSoftware />
                break
            case constants.SYSTEMMANAGEMENT_MENU_INTERROGATIONINFORMATION:
                content = <InterrogationInformation />
                break
            case constants.SYSTEMMANAGEMENT_MENU_ABNORMALEMINDER:

                content = <ExceptionParameterReminder />
                //exceptionParameterReminderInfo={exceptionParameterReminderInfo_local}
                break
            // case constants.SYSTEMMANAGEMENT_MENU_BLACKLIST:
            //     content =<BlackList  blackList={blackList}/>
            //     break
            case constants.SYSTEMMANAGEMENT_MENU_WHITELIST:
                content = <WhiteList />
                break
            // case constants.SYSTEMMANAGEMENT_MENU_HIGHRISK_CITIES:
            //     content =<HighRiskCities highRiskCitiesList={highRiskCitiesList} />
            //     break
            case constants.SYSTEMMANAGEMENT_MENU_HIGHRISKAREA:
                content = <HighRiskLine />
                break

            case constants.SYSTEMMANAGEMENT_MENU_PLACEOFORIGINPERSON:
                content = <PlaceOfOriginPerson />
                break
            case constants.SYSTEMMANAGEMENT_MENU_PLACEOFINFLUXPERSON:
                content = <PlaceOfInfluxPerson />
                break
            case constants.SYSTEMMANAGEMENT_MENU_REDLIST:
              content = <RedList redList={redList} />
              break
              case constants.SYSTEMMANAGEMENT_MENU_CODE:
              content = <CodingTable codeTable={codeTable} />
              break
            case constants.SYSREMSETUP_MODULE_TIME:
                content = <AddSystem />
                break
            case constants.CUSTOMERMANAGEMENT_MENU_POINT:
                content = <AreaManage />
                break
            default:
                break
        }
        return (
    <div>
            {content}
    </div>

        );

    }
};


export default connect(mainReducer)(SystemManagementRight);
