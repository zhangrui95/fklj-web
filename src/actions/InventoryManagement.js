// 盘查管理模块-action
import {api} from "./actions";
import {post,get,put} from "./request";


//人员盘查
export const PERSONNELINVENTORY_DATA = 'PersonnelInventory-data';
export const PERSONNELINVENTORY_ERROR = 'PersonnelInventory-error';
export function fetchPersonnelInventoryData(creds) {

     let path = '/data/getPersonList';
     return dispatch => {
         //先调取用,走reeducejs里面的内容
         dispatch({type: 'REQUEST_PERSONNEL_INVENTORY'});
         //发送请求
        post(api + path,creds).then((json) => {
            dispatch(receivedPersonnelInventoryData(json));
        }).catch((e)=>{
            dispatch(receivedPersonnelInventoryError(e.toString()))
        });
    }
}
export function receivedPersonnelInventoryData(data) {
    return {type: PERSONNELINVENTORY_DATA, data: data}
}
export function receivedPersonnelInventoryError(message) {
    return {type: PERSONNELINVENTORY_ERROR, message: message}
}
//导出人员到excel
export function fetchExportPersonExcel(search='') {
    let path = '/data/exportPersonExcel';
    return dispatch => {
        //先调取用,走reeducejs里面的内容
        dispatch({type: 'REQUEST_ExportPersonExcel'});
        //发送请求
        get(api + path + search).then((json) => {
            dispatch({type: 'ExportPersonExcel-Data', message: json});
        }).catch((e)=>{
            dispatch( {type: 'ExportPersonExcel-Error', message: e.toString()} )
        });
    }
}


//车辆关联人员查询
export function fetchRelevancePersonData(creds) {
    let path = '/data/getRelatedPersonByRecord';
    return dispatch => {
        dispatch({type:"REQUEST_CAR_PERSON"});
        post(api + path,creds).then((json) => {
            dispatch( {type: 'RelevancePerson-data',data: json} );
        }).catch((e)=>{
            dispatch({type: 'RelevancePerson-error',message: e.toString()} )
        });
    }
}


//人关联车查询
export function fetchRelevanceCarData(creds) {
    let path = '/data/getRelatedCarByRecord';
    return dispatch => {
        dispatch({type:"REQUEST_PERSONNEL_CAR"});
        post(api + path,creds).then((json) => {
            dispatch( {type: 'RelevanceCar-data',data: json} );
        }).catch((e)=>{
            dispatch({type: 'RelevanceCar-error',message: e.toString()} )
        });
    }
}

//车辆盘查
export const CARINVENTORY_DATA = 'CarInventory-data';
export const CARINVENTORY_ERROR = 'CarInventory-error';
export function fetchCarInventoryData(creds) {
    let path = '/data/getCarList';
    return dispatch => {
        dispatch({type: 'REQUEST_CAR_INVENTORY'});
        post(api + path,creds).then((json) => {
            dispatch(receivedCarInventoryData(json));
        }).catch((e)=>{
            dispatch(receivedCarInventoryError(e.toString()))
        });
    }
}
export function receivedCarInventoryData(data) {
    return {type: CARINVENTORY_DATA, data: data}
}
export function receivedCarInventoryError(message) {
    return {type: CARINVENTORY_ERROR, message: message}
}







//卡口盘查Bayonet
export const BAYONETINVENTORY_DATA = 'Bayonet-data';
export const BAYONETINVENTORY_ERROR = 'Bayonet-error';
export function fetchBayonetInventoryData(path,search='') {
    return dispatch => {
        fetch(api+path+'?'+search)//请求
            .then((res)=>res.json())
            .then((json)=>{
                dispatch(receivedBayonetInventoryData(json))
            })
            .catch((e)=>{
                dispatch(receivedBayonetInventoryError(e.toString()))
            });
    }
}
export function receivedBayonetInventoryData(data) {
    return {type: BAYONETINVENTORY_DATA, data: data}
}
export function receivedBayonetInventoryError(message) {
    return {type: BAYONETINVENTORY_ERROR, message: message}
}



//卡口人员盘查
export const CUMTOMERPERSONNEL_DATA = 'CumtomerPersonnel-data';
export const CUMTOMERPERSONNEL_ERROR = 'CumtomerPersonnel-error';
export function fetchCumtomerPersonnelData(path,creds) {
     return dispatch => {
        post(api + path,creds).then((json) => {
            dispatch(receivedCumtomerPersonnelData(json));
        }).catch((e)=>{
            dispatch(receivedCumtomerPersonnelError(e.toString()))
        });
    }
}
export function receivedCumtomerPersonnelData(data) {
    return {type: CUMTOMERPERSONNEL_DATA, data: data}
}
export function receivedCumtomerPersonnelError(message) {
    return {type: CUMTOMERPERSONNEL_ERROR, message: message}
}

//卡口车辆盘查
export const CUMTOMERCAR_DATA = 'CumtomerCar-data';
export const CUMTOMERCAR_ERROR = 'CumtomerCar-error';
export function fetchCumtomerCarData(path,creds) {
     return dispatch => {
        post(api + path,creds).then((json) => {
            dispatch(receivedCumtomerCarData(json));
        }).catch((e)=>{
            dispatch(receivedCumtomerCarError(e.toString()))
        });
    }
}
export function receivedCumtomerCarData(data) {
    return {type: CUMTOMERCAR_DATA, data: data}
}
export function receivedCumtomerCarError(message) {
    return {type: CUMTOMERCAR_ERROR, message: message}
}


// 呼市反恐利剑
// 列表展示
export function postInventoryListHushiData(creds) {
    let path = '/data/getExaminePatrolTasklistPage';
    return dispatch => {
        dispatch({ type: "REQUEST_INVENTORY_LIST_HUSHI_DATA" });
        post(api + path, creds).then((json) => {
            dispatch({ type: 'InventoryListHushi-data', data: json });
        }).catch((e) => {
            dispatch({ type: 'InventoryListHushi-error', message: e.toString() })
        });
    }
}

