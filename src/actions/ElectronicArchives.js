import {api} from './actions';
import {post,get,put} from "./request";
//API接口前缀

export const ELECTORO_DATA = 'ElectronicArchives-details-data';
export const ELECTRO_ERROR = 'ElectronicArchives-details-error';
// 基础信息
export const ELECTORO_INFORMATION_TEMPORARY_DATA = 'electro-information-TemporaryPpulation-data';
export const ELECTORO_INFORMATION_TEMPORARY_ERROR = 'electro-information-TemporaryPpulation-erro';
export const ELECTORO_INFORMATION_VEHICLE_DATA = 'electro-information-vehicle-data';
export const ELECTORO_INFORMATION_VEHICLE_ERROR = 'electro-information-vehicle-error';
export const ELECTORO_INFORMATION_DRIVER_DATA = 'electro-information-driver-data';
export const ELECTORO_INFORMATION_DRIVER_ERROR = 'electro-information-driver-error';
export const ELECTORO_INFORMATION_MARRY_DATA = 'electro-information-marry-data';//婚姻状况
export const ELECTORO_INFORMATION_MARRY_ERROR = 'electro-information-marry-error';
export const ELECTORO_INFORMATION_RESIDENCEMEMBER_DATA = 'electro-information-residenceMember-data';//户成员
export const ELECTORO_INFORMATION_RESIDENCEMEMBER_ERROR = 'electro-information-residenceMember-error';
export const ELECTORO_INFORMATION_RALETIONSHIP_DATA = 'electro-information-raletionship-data';//关系人
export const ELECTORO_INFORMATION_RALETIONSHIP_ERROR = 'electro-information-raletionship-error';
export const ELECTORO_INFORMATION_TEMPORARYINTER_DATA = 'electro-information-temporaryInterrogation-data';//暂住人员temporaryInterrogation
export const ELECTORO_INFORMATION_TEMPORARYINTER_ERROR = 'electro-information-temporaryInterrogation-error';
//背景信息
export const ELECTORO_BGINFORMATION_CRIMINALPERSONNEL_DATA = 'electro-bginformation-criminalPersonnel-data';
export const ELECTORO_BGINFORMATION_CRIMINALPERSONNEL_ERROR = 'electro-bginformation-criminalPersonnel-error';
export const ELECTORO_BGINFORMATION_DRUGRELATED_DATA = 'electro-bginformation-DrugRelated-data';
export const ELECTORO_BGINFORMATION_DRUGRELATED_ERROR = 'electro-bginformation-DrugRelated-error';
export const ELECTORO_BGINFORMATION_TRAFFICVIOLATION_DATA = 'electro-bginformation-trafficViolation-data';
export const ELECTORO_BGINFORMATION_TRAFFICVIOLATION_ERROR = 'electro-bginformation-trafficViolation-error';
export const ELECTORO_BGINFORMATION_RELATEDJIANGZANGSTUDENT_DATA = 'electro-bginformation-relatedjiangzangStudent-data';
export const ELECTORO_BGINFORMATION_RELATEDJIANGZANGSTUDENT_ERROR = 'electro-bginformation-relatedjiangzangStudent-error';
export const ELECTORO_BGINFORMATION_FUGITIVES_DATA = 'electro-bginformation-fugitives-data';
export const ELECTORO_BGINFORMATION_FUGITIVES_ERROR = 'electro-bginformation-fugitives-error';
//活动轨迹
export const ELECTORO_ACTIVETRAJECTORY_FUGITIVES_DATA = 'electro-activeTrajectory-data';
export const ELECTORO_ACTIVETRAJECTORY_FUGITIVES_ERROR = 'electro-activeTrajectory-error';


//设置盘查详情tab初始化
export const ELECTRO_TAB_INIT = 'ElectronicArchives_tab_init';
//设置盘查详情tab选中项变换
export const ELECTRO_TAB_CHANGE_CURRENT = 'ElectronicArchives_tab_change_current';


//初始化tab
export function  initElectroTab() {
    return {type:ELECTRO_TAB_INIT};
}




//获取电子档案


export function postElectronicArchivesData(creds) {
    let path ='/data/getArcPersons';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedElectronicArchivesData(json));
                // dispatch(receivedELECTOROInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedElectronicArchivesError(e.toString()))
            });
    }
}

export function receivedElectronicArchivesData(data) {
    return {type: ELECTORO_DATA, data: data}
}
export function receivedElectronicArchivesError(message) {
    return {type: ELECTORO_DATA, message: message}
}

//获取盘查详情基础信息的基本信息
export function postELECTOROTemporaryPpulationData(creds) {
    let path = '';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedELECTOROTemporaryPpulationData(json));
                // dispatch(receivedELECTOROInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedELECTOROTemporaryPpulationError(e.toString()))
            });
    }
}
export function receivedELECTOROTemporaryPpulationData(data) {
    return {type: ELECTORO_INFORMATION_TEMPORARY_DATA, data: data}
}
export function receivedELECTOROTemporaryPpulationError(message) {
    return {type: ELECTORO_INFORMATION_TEMPORARY_ERROR, message: message}
}

//婚姻状况
export function postELECTOROMarryData(creds) {
    let path ='';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedELECTOROMarryData(json));
                // dispatch(receivedELECTOROInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedELECTOROMarryError(e.toString()))
            });
    }
}
export function receivedELECTOROMarryData(data) {
    return {type: ELECTORO_INFORMATION_MARRY_DATA, data: data}
}
export function receivedELECTOROMarryError(message) {
    return {type: ELECTORO_INFORMATION_MARRY_ERROR, message: message}
}
//户成员
export function postELECTOROResidenceMemberData(creds) {
    let path = '';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedELECTOROResidenceMemberData(json));
                // dispatch(receivedELECTOROInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedELECTOROResidenceMemberError(e.toString()))
            });
    }
}
export function receivedELECTOROResidenceMemberData(data) {
    return {type: ELECTORO_INFORMATION_RESIDENCEMEMBER_DATA, data: data}
}
export function receivedELECTOROResidenceMemberError(message) {
    return {type: ELECTORO_INFORMATION_RESIDENCEMEMBER_ERROR, message: message}
}
//关系人
export function postELECTORORaletionshipData(creds) {
    let path = '';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedELECTORORaletionshipData(json));
                // dispatch(receivedELECTOROInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedELECTORORaletionshipError(e.toString()))
            });
    }
}
export function receivedELECTORORaletionshipData(data) {
    return {type: ELECTORO_INFORMATION_RALETIONSHIP_DATA, data: data}
}
export function receivedELECTORORaletionshipError(message) {
    return {type: ELECTORO_INFORMATION_RALETIONSHIP_ERROR, message: message}
}
//暂住人员ELECTORO_INFORMATION_TEMPORARYINTER_DATA
export function postELECTOROTemporaryInterrogationData(creds) {
    let path ='';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedELECTOROTemporaryInterrogationData(json));
                // dispatch(receivedELECTOROInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedELECTOROTemporaryInterrogationError(e.toString()))
            });
    }
}
export function receivedELECTOROTemporaryInterrogationData(data) {
    return {type: ELECTORO_INFORMATION_TEMPORARYINTER_DATA, data: data}
}
export function receivedELECTOROTemporaryInterrogationError(message) {
    return {type: ELECTORO_INFORMATION_TEMPORARYINTER_ERROR, message: message}
}

//获取盘查详情基础新的机动车信息
export function postELECTOROVehicleData(creds) {
    let path = '';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedELECTOROVehicleData(json));
                // dispatch(receivedELECTOROInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedELECTOROVehicleError(e.toString()))
            });
    }
}
export function receivedELECTOROVehicleData(data) {
    return {type: ELECTORO_INFORMATION_VEHICLE_DATA, data: data}
}
export function receivedELECTOROVehicleError(message) {
    return {type: ELECTORO_INFORMATION_VEHICLE_ERROR, message: message}
}

//获取盘查详情基础新的驾驶员信息
export function postELECTORODriverData(creds) {
    let path = '';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedELECTORODriverData(json));
                // dispatch(receivedELECTOROInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedELECTORODriverError(e.toString()))
            });
    }
}
export function receivedELECTORODriverData(data) {

    return {type: ELECTORO_INFORMATION_DRIVER_DATA, data: data}
}
export function receivedELECTORODriverError(message) {
    return {type: ELECTORO_INFORMATION_DRIVER_ERROR, message: message}
}

//获取背景信息违法犯罪人员
export function postELECTOROCriminalPersonnelData(creds) {
    let path = ''
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedELECTOROScriminalPersonnelData(json));
                // dispatch(receivedELECTOROInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedELECTOROScriminalPersonnelError(e.toString()))
            });
    }
}
export function receivedELECTOROScriminalPersonnelData(data) {

    return {type: ELECTORO_BGINFORMATION_CRIMINALPERSONNEL_DATA, data: data}
}
export function receivedELECTOROScriminalPersonnelError(message) {
    return {type: ELECTORO_BGINFORMATION_CRIMINALPERSONNEL_ERROR, message: message}
}
//获取背景信息涉毒人员信息
export function postELECTORODrugRelatedData(creds) {
    let path ='';
    return dispatch => {
        post(api+path,creds)//请
            .then((json)=>{
                dispatch(receivedELECTORODrugRelatedData(json));
                // dispatch(receivedELECTOROInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedELECTORODrugRelatedError(e.toString()))
            });
    }
}
export function receivedELECTORODrugRelatedData(data) {

    return {type: ELECTORO_BGINFORMATION_DRUGRELATED_DATA, data: data}
}
export function receivedELECTORODrugRelatedError(message) {
    return {type: ELECTORO_BGINFORMATION_DRUGRELATED_ERROR, message: message}
}
//获取背景信息交通违章
export function postELECTOROTrafficViolationData(creds) {
    let path = '';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedELECTOROTrafficViolationData(json));
                // dispatch(receivedELECTOROInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedELECTOROTrafficViolationData(e.toString()))
            });
    }
}
export function receivedELECTOROTrafficViolationData(data) {

    return {type: ELECTORO_BGINFORMATION_TRAFFICVIOLATION_DATA, data: data}
}
export function receivedELECTOROTrafficViolationError(message) {
    return {type: ELECTORO_BGINFORMATION_TRAFFICVIOLATION_DATA, message: message}
}
//获取涉疆涉藏学生
export function postELECTORORelatedjiangzangStudentData(creds) {
    let path = '';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedELECTORORelatedjiangzangStudentData(json));
                // dispatch(receivedELECTOROInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedELECTORORelatedjiangzangStudentError(e.toString()))
            });
    }
}
export function receivedELECTORORelatedjiangzangStudentData(data) {

    return {type: ELECTORO_BGINFORMATION_RELATEDJIANGZANGSTUDENT_DATA, data: data}
}
export function receivedELECTORORelatedjiangzangStudentError(message) {
    return {type: ELECTORO_BGINFORMATION_RELATEDJIANGZANGSTUDENT_DATA, message: message}
}
//获取在逃人员
export function postELECTOROFugitivesData(creds) {
    let path = '';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedELECTOROFugitivesData(json));
                // dispatch(receivedELECTOROInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedELECTOROFugitivesError(e.toString()))
            });
    }
}
export function receivedELECTOROFugitivesData(data) {

    return {type: ELECTORO_BGINFORMATION_FUGITIVES_DATA, data: data}
}
export function receivedELECTOROFugitivesError(message) {
    return {type: ELECTORO_BGINFORMATION_FUGITIVES_ERROR, message: message}
}

//活动轨迹
export function postELECTOROActiveTrajectoryData(creds) {
    let path  = '';
    return dispatch => {
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedELECTOROActiveTrajectoryData(json));
                // dispatch(receivedELECTOROInformationData(json));
            })
            .catch((e)=>{
                dispatch(receivedELECTOROActiveTrajectoryError(e.toString()))
            });
    }
}
export function receivedELECTOROActiveTrajectoryData(data) {

    return {type: ELECTORO_ACTIVETRAJECTORY_FUGITIVES_DATA, data: data}
}
export function receivedELECTOROActiveTrajectoryError(message) {
    return {type: ELECTORO_ACTIVETRAJECTORY_FUGITIVES_ERROR, message: message} 
}
