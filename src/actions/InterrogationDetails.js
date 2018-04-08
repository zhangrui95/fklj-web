import {api} from './actions';
import {post,get,put} from "./request";
//API接口前缀

export const INTERROGATIONDETAILS_DATA = 'interrogation-details-data';
export const INTERROGATIONDETAILS_ERROR = 'interrogation-details-error';

//盘查数据
export const INTERROGATIONDETAILS_SWORDDATA_ESSENTIALINFORMATION_DATA = 'interrogation-details-SwordData_essentialInformation-data';
export const INTERROGATIONDETAILS_SWORDDATA_ESSENTIALINFORMATION_ERROR = 'interrogation-details-SwordData_essentialInformation-error';
export const INTERROGATIONDETAILS_SWORDDATA_VEHICLEBASICINFORMATION_DATA = 'interrogation-details-SwordData_vehicleBasicInformation-data';
export const INTERROGATIONDETAILS_SWORDDATA_VEHICLEBASICINFORMATION_ERROR = 'interrogation-details-SwordData_vehicleBasicInformation-error';
export const INTERROGATIONDETAILS_SWORDDATA_INFLUXPLACE_DATA = 'interrogation-details-SwordData_influxPlace-data';
export const INTERROGATIONDETAILS_SWORDDATA_INFLUXPLACE_ERROR = 'interrogation-details-SwordData_influxPlace-error';
export const INTERROGATIONDETAILS_SWORDDATA_MOBILEBASICDATA_DATA = 'interrogation-details-SwordData_mobileBasicData-data';
export const INTERROGATIONDETAILS_SWORDDATA_MOBILEBASICDATA_ERROR = 'interrogation-details-SwordData_mobileBasicData-error';
export const INTERROGATIONDETAILS_SWORDDATA_INSTALLSOFTWARERECORDS_DATA = 'interrogation-details-SwordData_installSoftwareRecords-data';
export const INTERROGATIONDETAILS_SWORDDATA_INSTALLSOFTWARERECORDS_ERROR = 'interrogation-details-SwordData_installSoftwareRecords-error';
export const INTERROGATIONDETAILS_SWORDDATA_PHONERECORDS_DATA = 'interrogation-details-SwordData_phoneRecords-data';
export const INTERROGATIONDETAILS_SWORDDATA_PHONERECORDS_ERROR = 'interrogation-details-SwordData_phoneRecords-error';
export const INTERROGATIONDETAILS_SWORDDATA_PHOTORECORDS_DATA = 'interrogation-details-SwordData_photoRecords-data';
export const INTERROGATIONDETAILS_SWORDDATA_PHOTORECORDS_ERROR = 'interrogation-details-SwordData_photoRecords-error';
export const INTERROGATIONDETAILS_SWORDDATA_INTERNETRECORDS_DATA = 'interrogation-details-SwordData_internetRecords-data';
export const INTERROGATIONDETAILS_SWORDDATA_INTERNETRECORDS_ERROR = 'interrogation-details-SwordData_internetRecords-error';
export const INTERROGATIONDETAILS_SWORDDATA_FILERECORDS_DATA = 'interrogation-details-SwordData_fileRecords-data';
export const INTERROGATIONDETAILS_SWORDDATA_FILERECORDS_ERROR = 'interrogation-details-SwordData_fileRecords-error';

//设置盘查详情tab初始化
export const INTERROGATIONDETAILS_TAB_INIT = 'interrogationdetails_tab_init';
//设置盘查详情tab选中项变换
export const INTERROGATIONDETAILS_TAB_CHANGE_CURRENT = 'interrogationdetails_tab_change_current';


//初始化tab
export function  initInterrogationDetailsTab() {
    return {type:INTERROGATIONDETAILS_TAB_INIT};
}




//获取人员盘查详情
export function fetchInterrogationDetailsUsersData(path,search='') {
    return dispatch => {
        fetch(api+path+'?'+search)//请求
            .then((res)=>res.json())
            .then((json)=>{
                dispatch(receivedInterrogationDetailsUsersData(json));
                // dispatch(receivedInterrogationDetailsInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedInterrogationDetailsUsersError(e.toString()))
            });
    }
}

export function postInterrogationDetailsUsersData(creds) {
    let path ='/data/getRecordPersons';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedInterrogationDetailsUsersData(json));
                // dispatch(receivedInterrogationDetailsInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedInterrogationDetailsUsersError(e.toString()))
            });
    }
}

export function receivedInterrogationDetailsUsersData(data) {
    return {type: INTERROGATIONDETAILS_DATA, data: data}
}
export function receivedInterrogationDetailsUsersError(message) {
    return {type: INTERROGATIONDETAILS_ERROR, message: message}
}


//盘查数据获基础信息
export function postInterrogationDetailsEssentInformationData(creds) {
    let path = '';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedInterrogationDetailsEssentInformationData(json));
                // dispatch(receivedInterrogationDetailsInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedInterrogationDetailsEssentInformationError(e.toString()))
            });
    }
}
export function receivedInterrogationDetailsEssentInformationData(data) {

    return {type: INTERROGATIONDETAILS_SWORDDATA_ESSENTIALINFORMATION_DATA, data: data}
}
export function receivedInterrogationDetailsEssentInformationError(message) {
    return {type: INTERROGATIONDETAILS_SWORDDATA_ESSENTIALINFORMATION_ERROR, message: message}
}

//盘查数据的车辆基本信息
export function postInterrogationDetailsVehicleBasicInformationData(creds) {
    let path = '';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedInterrogationDetailsVehicleBasicInformationData(json));
                // dispatch(receivedInterrogationDetailsInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedInterrogationDetailsVehicleBasicInformationError(e.toString()))
            });
    }
}
export function receivedInterrogationDetailsVehicleBasicInformationData(data) {

    return {type: INTERROGATIONDETAILS_SWORDDATA_VEHICLEBASICINFORMATION_DATA, data: data}
}
export function receivedInterrogationDetailsVehicleBasicInformationError(message) {
    return {type: INTERROGATIONDETAILS_SWORDDATA_VEHICLEBASICINFORMATION_ERROR, message: message}
}
//盘查数据的流入地对接
export function postInterrogationDetailsInfluxPlaceData(creds) {
    let path = '';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedInterrogationDetailsInfluxPlaceData(json));
                // dispatch(receivedInterrogationDetailsInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedInterrogationDetailsInfluxPlaceError(e.toString()))
            });
    }
}
export function receivedInterrogationDetailsInfluxPlaceData(data) {

    return {type: INTERROGATIONDETAILS_SWORDDATA_INFLUXPLACE_DATA, data: data}
}
export function receivedInterrogationDetailsInfluxPlaceError(message) {
    return {type: INTERROGATIONDETAILS_SWORDDATA_INFLUXPLACE_ERROR, message: message}
}
//盘查数据的手机基本数据
export function postInterrogationDetailsMobileBasicData(creds) {
    let path = '/data/getArcPersonsPhone';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedInterrogationDetailsMobileBasicData(json));
                // dispatch(receivedInterrogationDetailsInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedInterrogationDetailsMobileBasicError(e.toString()))
            });
    }
}
export function receivedInterrogationDetailsMobileBasicData(data) {

    return {type: INTERROGATIONDETAILS_SWORDDATA_MOBILEBASICDATA_DATA, data: data}
}
export function receivedInterrogationDetailsMobileBasicError(message) {
    return {type: INTERROGATIONDETAILS_SWORDDATA_MOBILEBASICDATA_ERROR, message: message}
}

//盘查数据的通话记录
export function postInterrogationDetailsPhoneRecordsData(creds) {
    let path = '';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedInterrogationDetailsPhoneRecordsData(json));
                // dispatch(receivedInterrogationDetailsInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedInterrogationDetailsPhoneRecordsError(e.toString()))
            });
    }
}
export function receivedInterrogationDetailsPhoneRecordsData(data) {

    return {type: INTERROGATIONDETAILS_SWORDDATA_PHONERECORDS_DATA, data: data}
}
export function receivedInterrogationDetailsPhoneRecordsError(message) {
    return {type: INTERROGATIONDETAILS_SWORDDATA_PHONERECORDS_ERROR, message: message}
}
//盘查数据的安装软件数据
export function postInterrogationDetailsInstallSoftwareRecordsData(creds) {
    let path = '';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedInterrogationDetailsInstallSoftwareRecordsData(json));
                // dispatch(receivedInterrogationDetailsInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedInterrogationDetailsInstallSoftwareRecordsError(e.toString()))
            });
    }
}
export function receivedInterrogationDetailsInstallSoftwareRecordsData(data) {

    return {type: INTERROGATIONDETAILS_SWORDDATA_INSTALLSOFTWARERECORDS_DATA, data: data}
}
export function receivedInterrogationDetailsInstallSoftwareRecordsError(message) {
    return {type: INTERROGATIONDETAILS_SWORDDATA_INSTALLSOFTWARERECORDS_ERROR, message: message}
}
//盘查数据相片记录
export function postInterrogationDetailsPhotoRecordsData(creds) {
    let path = '';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedInterrogationDetailsPhotoRecordsData(json));
                // dispatch(receivedInterrogationDetailsInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedInterrogationDetailsPhotoRecordsError(e.toString()))
            });
    }
}
export function receivedInterrogationDetailsPhotoRecordsData(data) {

    return {type: INTERROGATIONDETAILS_SWORDDATA_PHOTORECORDS_DATA, data: data}
}
export function receivedInterrogationDetailsPhotoRecordsError(message) {
    return {type: INTERROGATIONDETAILS_SWORDDATA_PHOTORECORDS_ERROR, message: message}
}
//盘查数据上网记录
export function postInterrogationDetailsInternetRecordsData(creds) {
    let path = '';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedInterrogationDetailsInternetRecordsData(json));
                // dispatch(receivedInterrogationDetailsInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedInterrogationDetailsInternetRecordsError(e.toString()))
            });
    }
}
export function receivedInterrogationDetailsInternetRecordsData(data) {

    return {type: INTERROGATIONDETAILS_SWORDDATA_INTERNETRECORDS_DATA, data: data}
}
export function receivedInterrogationDetailsInternetRecordsError(message) {
    return {type: INTERROGATIONDETAILS_SWORDDATA_INTERNETRECORDS_ERROR, message: message} 
}
//盘查记录的文件记录
export function postInterrogationDetailsFileRecordsData(creds) {
    let path = '';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedInterrogationDetailsFileRecordsData(json));
                // dispatch(receivedInterrogationDetailsInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedInterrogationDetailsFileRecordsError(e.toString()))
            });
    }
}
export function receivedInterrogationDetailsFileRecordsData(data) {

    return {type: INTERROGATIONDETAILS_SWORDDATA_FILERECORDS_DATA, data: data}
}
export function receivedInterrogationDetailsFileRecordsError(message) {
    return {type: INTERROGATIONDETAILS_SWORDDATA_FILERECORDS_ERROR, message: message} 
}

//盘查记录的文件记录
export const INTERROGATIONDETAILS_SWORDDATA_MESSAGE_DATA = 'interrogation-details-SwordData_message-data';
export const INTERROGATIONDETAILS_SWORDDATA_MESSAGE_ERROR = 'interrogation-details-SwordData_message-error';
export function postInterrogationDetailsMessageData(creds) {
    let path = '';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedInterrogationDetailsMessageData(json));
                // dispatch(receivedInterrogationDetailsInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedInterrogationDetailsMessageError(e.toString()))
            });
    }
}
export function receivedInterrogationDetailsMessageData(data) {

    return {type: INTERROGATIONDETAILS_SWORDDATA_MESSAGE_DATA, data: data}
}
export function receivedInterrogationDetailsMessageError(message) {
    return {type: INTERROGATIONDETAILS_SWORDDATA_MESSAGE_ERROR, message: message} 
}

