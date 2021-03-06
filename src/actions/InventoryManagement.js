// 盘查管理模块-action
import { api } from "./actions";
import { post, get, put } from "./request";


//人员盘查
export const PERSONNELINVENTORY_DATA = 'PersonnelInventory-data';
export const PERSONNELINVENTORY_ERROR = 'PersonnelInventory-error';
export function fetchPersonnelInventoryData(creds) {

    let path = '/data/getPersonList';
    return dispatch => {
        //先调取用,走reeducejs里面的内容
        dispatch({ type: 'REQUEST_PERSONNEL_INVENTORY' });
        //发送请求
        post(api + path, creds).then((json) => {
            dispatch(receivedPersonnelInventoryData(json));
        }).catch((e) => {
            dispatch(receivedPersonnelInventoryError(e.toString()))
        });
    }
}
export function receivedPersonnelInventoryData(data) {
    return { type: PERSONNELINVENTORY_DATA, data: data }
}
export function receivedPersonnelInventoryError(message) {
    return { type: PERSONNELINVENTORY_ERROR, message: message }
}
//导出人员到excel
export function fetchExportPersonExcel(search = '') {
    let path = '/data/exportPersonExcel';
    return dispatch => {
        //先调取用,走reeducejs里面的内容
        dispatch({ type: 'REQUEST_ExportPersonExcel' });
        //发送请求
        get(api + path + search).then((json) => {
            dispatch({ type: 'ExportPersonExcel-Data', message: json });
        }).catch((e) => {
            dispatch({ type: 'ExportPersonExcel-Error', message: e.toString() })
        });
    }
}


//车辆关联人员查询
export function fetchRelevancePersonData(creds) {
    let path = '/data/getRelatedPersonByRecord';
    return dispatch => {
        dispatch({ type: "REQUEST_CAR_PERSON" });
        post(api + path, creds).then((json) => {
            dispatch({ type: 'RelevancePerson-data', data: json });
        }).catch((e) => {
            dispatch({ type: 'RelevancePerson-error', message: e.toString() })
        });
    }
}


//人关联车查询
export function fetchRelevanceCarData(creds) {
    let path = '/data/getRelatedCarByRecord';
    return dispatch => {
        dispatch({ type: "REQUEST_PERSONNEL_CAR" });
        post(api + path, creds).then((json) => {
            dispatch({ type: 'RelevanceCar-data', data: json });
        }).catch((e) => {
            dispatch({ type: 'RelevanceCar-error', message: e.toString() })
        });
    }
}

//车辆盘查
export const CARINVENTORY_DATA = 'CarInventory-data';
export const CARINVENTORY_ERROR = 'CarInventory-error';
export function fetchCarInventoryData(creds) {
    let path = '/data/getCarList';
    return dispatch => {
        dispatch({ type: 'REQUEST_CAR_INVENTORY' });
        post(api + path, creds).then((json) => {
            dispatch(receivedCarInventoryData(json));
        }).catch((e) => {
            dispatch(receivedCarInventoryError(e.toString()))
        });
    }
}
export function receivedCarInventoryData(data) {
    return { type: CARINVENTORY_DATA, data: data }
}
export function receivedCarInventoryError(message) {
    return { type: CARINVENTORY_ERROR, message: message }
}







//卡口盘查Bayonet
export const BAYONETINVENTORY_DATA = 'Bayonet-data';
export const BAYONETINVENTORY_ERROR = 'Bayonet-error';
export function fetchBayonetInventoryData(path, search = '') {
    return dispatch => {
        fetch(api + path + '?' + search)//请求
            .then((res) => res.json())
            .then((json) => {
                dispatch(receivedBayonetInventoryData(json))
            })
            .catch((e) => {
                dispatch(receivedBayonetInventoryError(e.toString()))
            });
    }
}
export function receivedBayonetInventoryData(data) {
    return { type: BAYONETINVENTORY_DATA, data: data }
}
export function receivedBayonetInventoryError(message) {
    return { type: BAYONETINVENTORY_ERROR, message: message }
}



//卡口人员盘查 查询列表
export const CUMTOMERPERSONNEL_DATA = 'CumtomerPersonnel-data';
export const CUMTOMERPERSONNEL_ERROR = 'CumtomerPersonnel-error';
export function fetchCumtomerPersonnelData(creds) {
    let path = '/data/getCheckPointPersonlistPage';
    return dispatch => {
        dispatch({ type: "REQUEST_PERSON_INVENTORY_POINT" });
        post(api + path, creds).then((json) => {
            dispatch(receivedCumtomerPersonnelData(json));
        }).catch((e) => {
            dispatch(receivedCumtomerPersonnelError(e.toString()))
        });
    }
}
export function receivedCumtomerPersonnelData(data) {
    return { type: CUMTOMERPERSONNEL_DATA, data: data }
}
export function receivedCumtomerPersonnelError(message) {
    return { type: CUMTOMERPERSONNEL_ERROR, message: message }
}
// 卡点人员详情
export function postpersonpointInventoryHushiDetailsData(creds) {
    let path = '/data/getCheckPointPersonDetails';
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch({ type: 'personpointInventoryHushiDetails-data', data: json });
        }).catch((e) => {
            dispatch({ type: 'personpointInventoryHushiDetails-error', message: e.toString() })
        });
    }
}
//卡口车辆盘查
export const CUMTOMERCAR_DATA = 'CumtomerCar-data';
export const CUMTOMERCAR_ERROR = 'CumtomerCar-error';
export function fetchCumtomerCarData(creds) {
    let path = '/data/getCheckPointCarlistPage';
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch(receivedCumtomerCarData(json));
        }).catch((e) => {
            dispatch(receivedCumtomerCarError(e.toString()))
        });
    }
}
export function receivedCumtomerCarData(data) {
    return { type: CUMTOMERCAR_DATA, data: data }
}
export function receivedCumtomerCarError(message) {
    return { type: CUMTOMERCAR_ERROR, message: message }
}
// 卡点车辆详情
export function postcarpointInventoryHushiDetailsData(creds) {
    let path = '/data/getCheckPointCarDetails';
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch({ type: 'carpointInventoryHushiDetails-data', data: json });
        }).catch((e) => {
            dispatch({ type: 'carpointInventoryHushiDetails-error', message: e.toString() })
        });
    }
}

// 呼市反恐利剑
// 列表展示
export function postInventoryListHushiData(creds) {
    let path = '/data/getExamineManage';
    return dispatch => {
        dispatch({ type: "REQUEST_INVENTORY_LIST_HUSHI_DATA" });
        post(api + path, creds).then((json) => {
            dispatch({ type: 'InventoryListHushi-data', data: json });
        }).catch((e) => {
            dispatch({ type: 'InventoryListHushi-error', message: e.toString() })
        });
    }
}
// 详情展示
export function postInventoryListHushiDetailsData(creds) {
    let path = '/data/getExamineManageDetails';
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch({ type: 'InventoryListHushiDetails-data', data: json });
        }).catch((e) => {
            dispatch({ type: 'InventoryListHushiDetails-error', message: e.toString() })
        });
    }
}
// 旧版反恐利剑 列表展示
export function postOldInventoryListHushiData(creds) {
    let path = '/data/getOldExamineManage';
    return dispatch => {
        dispatch({ type: "REQUEST_OLD_INVENTORY_LIST_HUSHI_DATA" });
        post(api + path, creds).then((json) => {
            dispatch({ type: 'old_InventoryListHushi-data', data: json });
        }).catch((e) => {
            dispatch({ type: 'old_InventoryListHushi-error', message: e.toString() })
        });
    }
}
// 详情展示
export function postOldInventoryListHushiDetailsData(creds) {
    let path = '/data/getExamineManageDetails';
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch({ type: 'old_InventoryListHushiDetails-data', data: json });
        }).catch((e) => {
            dispatch({ type: 'old_InventoryListHushiDetails-error', message: e.toString() })
        });
    }
}
// 原版反恐利剑 数据落库  点击详情需要展示的数据
export function postOldInventoryLuokuData(creds) {
    let path = '/data/getOldExamineManageDetails';
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch({ type: 'old_InventoryLuoku-data', data: json });
        }).catch((e) => {
            dispatch({ type: 'old_InventoryLuoku-error', message: e.toString() })
        });
    }
}

