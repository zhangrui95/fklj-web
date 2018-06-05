import {ELECTRO_TAB_INIT,ELECTRO_TAB_CHANGE_CURRENT,ELECTORO_DATA,ELECTORO_INFORMATION_TEMPORARY_DATA,ELECTORO_INFORMATION_VEHICLE_DATA,ELECTORO_INFORMATION_DRIVER_DATA
,ELECTORO_BGINFORMATION_CRIMINALPERSONNEL_DATA,ELECTORO_BGINFORMATION_DRUGRELATED_DATA,ELECTORO_BGINFORMATION_TRAFFICVIOLATION_DATA
,ELECTORO_BGINFORMATION_RELATEDJIANGZANGSTUDENT_DATA,ELECTORO_BGINFORMATION_FUGITIVES_DATA,ELECTORO_SWORDDATA_ESSENTIALINFORMATION_DATA,
ELECTORO_SWORDDATA_VEHICLEBASICINFORMATION_DATA,ELECTORO_SWORDDATA_INFLUXPLACE_DATA,ELECTORO_SWORDDATA_MOBILEBASICDATA_DATA,ELECTORO_SWORDDATA_INSTALLSOFTWARERECORDS_DATA
,ELECTORO_SWORDDATA_PHONERECORDS_DATA,ELECTORO_SWORDDATA_PHOTORECORDS_DATA,ELECTORO_SWORDDATA_INTERNETRECORDS_DATA,ELECTORO_SWORDDATA_FILERECORDS_DATA,
ELECTORO_ACTIVETRAJECTORY_FUGITIVES_DATA,ELECTORO_INFORMATION_MARRY_DATA,ELECTORO_INFORMATION_RESIDENCEMEMBER_DATA,ELECTORO_INFORMATION_RALETIONSHIP_DATA} from  "../actions/ElectronicArchives";
import {store} from '../index.js';

const initialState = {
        data: {
            ElectronicArchives: {
                personnelInformation: {
                     reason: {
                        "code": "",
                        "text": ""
                        },
                        result: {
                          
                            list: [],
                    }
                },
                basicInformation: {
                    temporaryPopulation: {
                     reason: {
                        "code": "",
                        "text": ""
                        },
                        result: {
                            list: [],
                    }
                    },
                    marriageInf: {
                        reason: {
                            "code": "",
                            "text": ""
                            },
                            result: {
                            
                            list: [],
                        }
                    },
                    residenceMember: {
                        reason: {
                            "code": "",
                            "text": ""
                            },
                            result: {
                             list: [],
                        }
                    },
                    relationship: {
                        reason: {
                            "code": "",
                            "text": ""
                            },
                            result: {
                            
                                list: [],
                        }
                    },
                    temporaryInterrogation: {
                        reason: {
                            "code": "",
                            "text": ""
                            },
                            result: {
                            
                                list: [],
                        }
                    },
                    vehicle: {
                        reason: {
                            "code": "",
                            "text": ""
                            },
                            result: {
                            
                                list: [],
                        }
                    },
                    driver: {
                        reason: {
                            "code": "",
                            "text": ""
                            },
                            result: {
                            
                                list: [],
                        }
                    }
                    },
                bgInformationList: {
                    criminalPersonnel: [],
                    drugRelated: [],
                    trafficViolation: [],
                    relatedjiangzangStudent: [],
                    fugitives: []
                },
               
                activeTrajectoryList: {},
            }
        },
        uiData: {
            tabs: [
                {
                    id: '101',
                    tabName: '基础信息',
                    isSelect: true
                },
                {
                    id: '102',
                    tabName: '背景信息',
                    isSelect: false
                },
                {
                    id: '103',
                    tabName: '活动轨迹',
                    isSelect: false
                },
                {
                    id: '104',
                    tabName: '最新盘查数据',
                    isSelect: false
                },
                {
                    id: '105',
                    tabName: '关注度积分',
                    isSelect: false
                }
            ]
        }
    }

const ElectronicArchivesUsers = (state=initialState, action) => {
     let newState = Object.assign({}, state);
    switch (action.type){
        // case ELECTORO_DATA:
        //     newState.data.ElectronicArchives.personnelInformation.result.list= action.data.result.list;
        //     return newState;
        // case ELECTORO_INFORMATION_TEMPORARY_DATA:
        //     newState.data.ELECTORO.basicInformation.temporaryPopulation =  action.data.data.basicInformation.temporaryPopulation;
        //     return newState;
        //     //婚姻状况
        // case ELECTORO_INFORMATION_MARRY_DATA:
        //     newState.data.ElectronicArchives.basicInformation.marriageInf =  action.data.data.basicInformation.marriageInf;
        //     return newState;
        //     //户成员ELECTORO_INFORMATION_RESIDENCEMEMBER_DATA
        // case ELECTORO_INFORMATION_RESIDENCEMEMBER_DATA:
        //     newState.data.ElectronicArchives.basicInformation.residenceMember =  action.data.data.basicInformation.residenceMember;
        //     return newState;
        //     //关系人ELECTORO_INFORMATION_RALETIONSHIP_DATA
        // case ELECTORO_INFORMATION_RALETIONSHIP_DATA:
        //     newState.data.ElectronicArchives.basicInformation.relationship =  action.data.data.basicInformation.relationship;
        //     return newState;
        // case ELECTORO_INFORMATION_VEHICLE_DATA:
        //     newState.data.ElectronicArchives.basicInformation.vehicle =  action.data.data.basicInformation.vehicle;
        //     return newState;
        // case ELECTORO_INFORMATION_DRIVER_DATA:
        //     newState.data.ElectronicArchives.basicInformation.driver =  action.data.data.basicInformation.driver;
        //     return newState;
        case ELECTRO_TAB_CHANGE_CURRENT:

            for(let x in newState.uiData.tabs){
                if(action.tab.id==newState.uiData.tabs[x].id){ //根据ID相等判断，是否选中
                    newState.uiData.tabs[x].isSelect=true;
                }else{
                    newState.uiData.tabs[x].isSelect=false;
                }
            }
            return newState;
        case ELECTRO_TAB_INIT:
            for(let x in newState.uiData.tabs){
                newState.uiData.tabs[x].isSelect=false;
            }
            newState.uiData.tabs[0].isSelect=true;
            return newState;
        // case ELECTORO_BGINFORMATION_CRIMINALPERSONNEL_DATA:
        //    newState.data.ElectronicArchives.bgInformationList.criminalPersonnel =  action.data.data.bgInformationList.criminalPersonnel;
        //    return newState;
        // case ELECTORO_BGINFORMATION_DRUGRELATED_DATA:
        //    newState.data.ElectronicArchives.bgInformationList.drugRelated =  action.data.data.bgInformationList.drugRelated;
        //    return newState;  
        // case ELECTORO_BGINFORMATION_TRAFFICVIOLATION_DATA:
        //    newState.data.ElectronicArchives.bgInformationList.trafficViolation =  action.data.data.bgInformationList.trafficViolation;
        //    return newState;
        // case ELECTORO_BGINFORMATION_RELATEDJIANGZANGSTUDENT_DATA:
        //    newState.data.ElectronicArchives.bgInformationList.relatedjiangzangStudent =  action.data.data.bgInformationList.relatedjiangzangStudent;
        //    return newState;
        // case ELECTORO_BGINFORMATION_FUGITIVES_DATA:
        //    newState.data.ElectronicArchives.bgInformationList.fugitives =  action.data.data.bgInformationList.fugitives;
        //    return newState;
           //盘查数据（利剑数据）
       
        case ELECTORO_ACTIVETRAJECTORY_FUGITIVES_DATA:
         newState.data.ElectronicArchives.activeTrajectoryList =  action.data.data.activeTrajectoryList;
           return newState;
        default:
            if(store !== undefined){
                return store.getState().ElectronicArchivesUsers;
            }else{
                return state;
            }

    }
}

module.exports = {ElectronicArchivesUsers}