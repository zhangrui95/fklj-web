import {INTERROGATIONDETAILS_TAB_INIT,INTERROGATIONDETAILS_TAB_CHANGE_CURRENT,INTERROGATIONDETAILS_DATA,INTERROGATIONDETAILS_INFORMATION_TEMPORARY_DATA,INTERROGATIONDETAILS_INFORMATION_VEHICLE_DATA,INTERROGATIONDETAILS_INFORMATION_DRIVER_DATA
,INTERROGATIONDETAILS_BGINFORMATION_CRIMINALPERSONNEL_DATA,INTERROGATIONDETAILS_BGINFORMATION_DRUGRELATED_DATA,INTERROGATIONDETAILS_BGINFORMATION_TRAFFICVIOLATION_DATA
,INTERROGATIONDETAILS_BGINFORMATION_RELATEDJIANGZANGSTUDENT_DATA,INTERROGATIONDETAILS_BGINFORMATION_FUGITIVES_DATA,INTERROGATIONDETAILS_SWORDDATA_ESSENTIALINFORMATION_DATA,
INTERROGATIONDETAILS_SWORDDATA_VEHICLEBASICINFORMATION_DATA,INTERROGATIONDETAILS_SWORDDATA_INFLUXPLACE_DATA,INTERROGATIONDETAILS_SWORDDATA_MOBILEBASICDATA_DATA,INTERROGATIONDETAILS_SWORDDATA_INSTALLSOFTWARERECORDS_DATA
,INTERROGATIONDETAILS_SWORDDATA_PHONERECORDS_DATA,INTERROGATIONDETAILS_SWORDDATA_PHOTORECORDS_DATA,INTERROGATIONDETAILS_SWORDDATA_INTERNETRECORDS_DATA,INTERROGATIONDETAILS_SWORDDATA_FILERECORDS_DATA,
INTERROGATIONDETAILS_ACTIVETRAJECTORY_FUGITIVES_DATA,INTERROGATIONDETAILS_INFORMATION_MARRY_DATA,INTERROGATIONDETAILS_INFORMATION_RESIDENCEMEMBER_DATA,INTERROGATIONDETAILS_INFORMATION_RALETIONSHIP_DATA,
INTERROGATIONDETAILS_SWORDDATA_MESSAGE_DATA} from  "../actions/InterrogationDetails";
import {store} from '../index.js';

const initialState = {
        data: {
            interrogationDetails: {
                personnelInformation: {
                     reason: {
                        "code": "",
                        "text": ""
                        },
                        result: {
                          
                            list: [],
                    }
                },
               
                swordData: {
                    essentialInformation: [],
                    vehicleBasicInformation: [],
                    influxPlace: [],
                    mobileBasicData: {
                     reason: {
                        "code": "",
                        "text": ""
                        },
                        result: {
                          
                            list: [],
                    }
                },
                    installSoftwareRecords: [],
                    phoneRecords: [],
                    photoRecords: [],
                    internetRecords: [],
                    fileRecords: [],
                    message: [],
                },
            }
        },
        uiData: {
            tabs: [
                // {
                //     id: '101',
                //     tabName: '基础信息',
                //     isSelect: true
                // },
                // {
                //     id: '102',
                //     tabName: '背景信息',
                //     isSelect: false
                // },
                // {
                //     id: '103',
                //     tabName: '活动轨迹',
                //     isSelect: false
                // },
                {
                    id: '104',
                    tabName: '盘查数据',
                    isSelect: true
                }
            ]
        }
    }

const InterrogationDetailsUsers = (state=initialState, action) => {
     let newState = Object.assign({}, state);
    switch (action.type){
        case INTERROGATIONDETAILS_DATA:
            newState.data.interrogationDetails.personnelInformation.result.list= action.data.result.list;
            return newState;
       
        case INTERROGATIONDETAILS_TAB_CHANGE_CURRENT:

            for(let x in newState.uiData.tabs){
                if(action.tab.id==newState.uiData.tabs[x].id){ //根据ID相等判断，是否选中
                    newState.uiData.tabs[x].isSelect=true;
                }else{
                    newState.uiData.tabs[x].isSelect=false;
                }
            }
            return newState;
        case INTERROGATIONDETAILS_TAB_INIT:
            for(let x in newState.uiData.tabs){
                newState.uiData.tabs[x].isSelect=false;
            }
            newState.uiData.tabs[0].isSelect=true;
            return newState;
        
           //盘查数据（利剑数据）
        case INTERROGATIONDETAILS_SWORDDATA_ESSENTIALINFORMATION_DATA:
           newState.data.interrogationDetails.swordData.essentialInformation =  action.data.data.swordData.essentialInformation;
           return newState;
        case INTERROGATIONDETAILS_SWORDDATA_VEHICLEBASICINFORMATION_DATA:
           newState.data.interrogationDetails.swordData.vehicleBasicInformation =  action.data.data.swordData.vehicleBasicInformation;
           return newState;
        case INTERROGATIONDETAILS_SWORDDATA_INFLUXPLACE_DATA:
           newState.data.interrogationDetails.swordData.influxPlace =  action.data.data.swordData.influxPlace;
           return newState;
        case INTERROGATIONDETAILS_SWORDDATA_MOBILEBASICDATA_DATA:
           newState.data.interrogationDetails.swordData.mobileBasicData =  action.data.data.swordData.mobileBasicData;
           return newState;     
        case INTERROGATIONDETAILS_SWORDDATA_INSTALLSOFTWARERECORDS_DATA:
           newState.data.interrogationDetails.swordData.installSoftwareRecords =  action.data.data.swordData.installSoftwareRecords;
           return newState;
        case INTERROGATIONDETAILS_SWORDDATA_PHONERECORDS_DATA:
           newState.data.interrogationDetails.swordData.phoneRecords =  action.data.data.swordData.phoneRecords;
           return newState; 
        case INTERROGATIONDETAILS_SWORDDATA_PHOTORECORDS_DATA:
           newState.data.interrogationDetails.swordData.photoRecords =  action.data.data.swordData.photoRecords;
           return newState;  
        case INTERROGATIONDETAILS_SWORDDATA_INTERNETRECORDS_DATA:
           newState.data.interrogationDetails.swordData.internetRecords =  action.data.data.swordData.internetRecords;
           return newState;
        case INTERROGATIONDETAILS_SWORDDATA_FILERECORDS_DATA:
           newState.data.interrogationDetails.swordData.fileRecords =  action.data.data.swordData.fileRecords;
           return newState;
       case INTERROGATIONDETAILS_SWORDDATA_MESSAGE_DATA:
           newState.data.interrogationDetails.swordData.message =  action.data.data.swordData.message;
           return newState;
        default:
            if(store !== undefined){
                return store.getState().InterrogationDetailsUsers;
            }else{
                return state;
            }

    }
}

module.exports = {InterrogationDetailsUsers}