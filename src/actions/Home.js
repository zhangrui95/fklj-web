// 首页

import {api} from "./actions";
import {post,get,put} from "./request";

//获取动态管控人员统计-首页Statistics
export const TASK_STATISTICS_DATA = 'task_statistics_data';
export const TASK_STATISTICS_ERROR = 'task_statistics_error';
export function fetchTaskStatisticsData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_TASK_REPORT"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedTaskStatisticsData(json));
        }).catch((e)=>{
            dispatch(receivedTaskStatisticsError(e.toString()))
        });;
    }
}
export function postTaskStatisticsData(creds) {
    let path = '/data/IndexStatistics';
    return dispatch => {
        dispatch({type:"REQUEST_TASK_REPORT"});
        post(api + path,creds).then((json) => {
            dispatch(receivedTaskStatisticsData(json));
        }).catch((e)=>{
            dispatch(receivedTaskStatisticsError(e.toString()))
        });;
    }
}
export function receivedTaskStatisticsData(data) {
    return {type: TASK_STATISTICS_DATA, data: data}
}
export function receivedTaskStatisticsError(message) {
    return {type: TASK_STATISTICS_ERROR, message: message}
}
//获取盘查人数总和-首页-InventoryTotalData
export const INVENTORY_TOTAL_DATA = 'Inventory_Total_data';
export const INVENTORY_TOTAL_ERROR = 'Inventory_Total_error';
export function fetchInventoryTotalData(path,search='') {
    return dispatch => {
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedInventoryTotalData(json));
        }).catch((e)=>{
            dispatch(receivedInventoryTotalError(e.toString()))
        });;
    }
}
export function postInventoryTotalData(creds) {
    let path = '/data/RecordCount';
    return dispatch => {
        post(api + path ,creds).then((json) => {
            dispatch(receivedInventoryTotalData(json));
        }).catch((e)=>{
            dispatch(receivedInventoryTotalError(e.toString()))
        });;
    }
}
export function receivedInventoryTotalData(data) {
    return {type: INVENTORY_TOTAL_DATA, data: data}
}
export function receivedInventoryTotalError(message) {
    return {type: INVENTORY_TOTAL_ERROR, message: message}
}
//获取总体数据统计-首页-Population
export const POPULATION_DATA = 'Population_data';
export const POPULATION_ERROR = 'Population_error';
export function fetchPopulationData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_TOTAL_REPORT"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedPopulationData(json));
        }).catch((e)=>{
            dispatch(receivedPopulationError(e.toString()))
        });;
    }
}
export function postPopulationData(creds) {
    let path = '/data/getCHANGStatistics';
    return dispatch => {
        dispatch({type:"REQUEST_TOTAL_REPORT"});
        post(api + path ,creds).then((json) => {
            dispatch(receivedPopulationData(json));
        }).catch((e)=>{
            dispatch(receivedPopulationError(e.toString()))
        });;
    }
}
export function receivedPopulationData(data) {
    return {type: POPULATION_DATA, data: data}
}
export function receivedPopulationError(message) {
    return {type: POPULATION_ERROR, message: message}
}
//获取关注人员总数-首页-ConcernTotal
export const CONCERN_TOTAL_DATA = 'contern_total_data';
export const CONCERN_TOTAL_ERROR = 'contern_total_error';
export function fetchConcernTotalData(path,search='') {
    return dispatch => {
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedConcernTotalData(json));
        }).catch((e)=>{
            dispatch(receivedConcernTotalError(e.toString()))
        });;
    }
}
export function postConcernTotalData(creds) {
    let path = '/data/MessRecordCount';
    return dispatch => {
        post(api + path ,creds).then((json) => {
            dispatch(receivedConcernTotalData(json));
        }).catch((e)=>{
            dispatch(receivedConcernTotalError(e.toString()))
        });;
    }
}
export function receivedConcernTotalData(data) {
    return {type: CONCERN_TOTAL_DATA, data: data}
}
export function receivedConcernTotalError(message) {
    return {type: CONCERN_TOTAL_ERROR, message: message}
}
//获取活动统计人员-首页-ActivityStatistics
export const ACTIVITY_STATISTICS_DATA = 'activity_statistics_data';
export const ACTIVITY_STATISTICS_ERROR = 'activity_statistics_error';
export function fetchActivityStatisticsData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_ACTIVITY_REPORT"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedActivityStatisticsData(json));
        }).catch((e)=>{
            dispatch(receivedActivityStatisticsError(e.toString()))
        });;
    }
}
export function postActivityStatisticsData(creds) {
    let path = '/data/getTripStatisticsInTo';
    return dispatch => {
        dispatch({type:"REQUEST_ACTIVITY_REPORT"});
        post(api + path ,creds).then((json) => {
            dispatch(receivedActivityStatisticsData(json));
        }).catch((e)=>{
            dispatch(receivedActivityStatisticsError(e.toString()))
        });
    }
}
export function receivedActivityStatisticsData(data) {
    return {type: ACTIVITY_STATISTICS_DATA, data: data}
}
export function receivedActivityStatisticsError(message) {
    return {type: ACTIVITY_STATISTICS_ERROR, message: message}
}
//获取流入人员总数-首页-inflowTotalData
export const INFLOW_TOTAL_DATA = 'inflow_total_data';
export const INFLOW_TOTAL_ERROR = 'inflow_total_error';
export function fetchInflowTotalData(path,search='') {
    return dispatch => {
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedInflowTotalData(json));
        }).catch((e)=>{
            dispatch(receivedInflowTotalError(e.toString()))
        });;
    }
}
export function postInflowTotalData(creds) {
    let path = '/data/FromRecordCount'
    return dispatch => {
        post(api + path ,creds).then((json) => {
            dispatch(receivedInflowTotalData(json));
        }).catch((e)=>{
            dispatch(receivedInflowTotalError(e.toString()))
        });;
    }
}
export function receivedInflowTotalData(data) {
    return {type: INFLOW_TOTAL_DATA, data: data}
}
export function receivedInflowTotalError(message) {
    return {type: INFLOW_TOTAL_ERROR, message: message}
}
//获取流出人员总数-首页-
export const OUTFLOW_TOTAL_DATA = 'outflow_total_data';
export const OUTFLOW_TOTAL_ERROR = 'outflow_total_error';
export function fetchOutflowTotalData(path,search='') {
    return dispatch => {
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedOutflowTotalData(json));
        }).catch((e)=>{
            dispatch(receivedOutflowTotalError(e.toString()))
        });;
    }
}
export function postOutflowTotalData(creds) {
    let path = '/data/ToRecordCount';
    return dispatch => {
        post(api + path ,creds).then((json) => {
            dispatch(receivedOutflowTotalData(json));
        }).catch((e)=>{
            dispatch(receivedOutflowTotalError(e.toString()))
        });;
    }
}
export function receivedOutflowTotalData(data) {
    return {type: OUTFLOW_TOTAL_DATA, data: data}
}
export function receivedOutflowTotalError(message) {
    return {type: OUTFLOW_TOTAL_ERROR, message: message}
}
//获取人员-首页
export const KEY_ATTENTION_DATA = 'key_attention_data';
export const KEY_ATTENTION_ERROR = 'key_attention_error';
export const BE_MISSING_DATA = 'be_missing_data';
export const BE_MISSING_ERROR = 'be_missing_error';
export const NOT_LANDED_DATA = 'not_landed_data';
export const NOT_LANDED_ERROR = 'not_landed_error';

export function fetchPersonnelListData(path,search='',type) {
    return dispatch => {
        if(type === "zdgz"){
            
            dispatch({type:"REQUEST_KEY_PERSON_REPORT"});
             get(api + path + '?' + search).then((json) => {
                dispatch(receivedKeyAttentionData(json));
            }).catch((e)=>{
                dispatch(receivedKeyAttentionError(e.toString()))
            });;
        }else if(type==="wld"){
            dispatch({type:"REQUEST_NOT_PERSON_REPORT"});
            get(api + path + '?' + search).then((json) => {
               
                dispatch(receivedNotLandedData(json));
            }).catch((e)=>{
                dispatch(receivedNotLandedError(e.toString()))
            });;
           
        }else if(type==="szry"){
            dispatch({type:"REQUEST_BEMISS_PERSON_REPORT"});
            get(api + path + '?' + search).then((json) => {
                dispatch(receivedBeMissingData(json));
            }).catch((e)=>{
                dispatch(receivedBeMissingError(e.toString()))
            });;
        }
       
    }
}
export function postPersonnelListData(creds,type) {
    
    return dispatch => {
        if(type === "zdgz"){
            let path = '/data/getDArcPersonList';



            dispatch({type:"REQUEST_KEY_PERSON_REPORT"});
             post(api + path ,creds).then((json) => {
                dispatch(receivedKeyAttentionData(json));
            }).catch((e)=>{
                dispatch(receivedKeyAttentionError(e.toString()))
            });;
        }else if(type==="wld"){
            let path = '/data/getNoArrivelistPage';
            dispatch({type:"REQUEST_NOT_PERSON_REPORT"});
            post(api + path ,creds).then((json) => {
                dispatch(receivedNotLandedData(json));
            }).catch((e)=>{
                dispatch(receivedNotLandedError(e.toString()))
            });;
           
        }else if(type==="szry"){
            let path = '/data/getDisappearlistPage';
            dispatch({type:"REQUEST_BEMISS_PERSON_REPORT"});
            post(api + path ,creds).then((json) => {
                dispatch(receivedBeMissingData(json));
            }).catch((e)=>{
                dispatch(receivedBeMissingError(e.toString()))
            });;
        }
       
    }
}
export function receivedKeyAttentionData(data) {
    return {type: KEY_ATTENTION_DATA, data: data}
}
export function receivedKeyAttentionError(message) {
    return {type: KEY_ATTENTION_ERROR, message: message}
}
export function receivedNotLandedData(data) {
    return {type: NOT_LANDED_DATA, data: data}
}
export function receivedNotLandedError(message) {
    return {type: NOT_LANDED_ERROR, message: message}
}
export function receivedBeMissingData(data) {
    return {type: BE_MISSING_DATA, data: data}
}
export function receivedBeMissingError(message) {
    return {type: BE_MISSING_ERROR, message: message}
}


// export function receivedBeMissingData(data) {
//     return {type: BE_MISSING_DATA, data: data}
// }
// export function receivedBeMissingError(message) {
//     return {type: BE_MISSING_ERROR, message: message}
// }
//获取分布地图-首页DistributeMap
export const DISTRIBUTE_MAP_DATA = 'distribute_map_data';
export const DISTRIBUTE_MAP_ERROR = 'distribute_map_error';
export function fetchDistributeMapData(path,search='') {
    return dispatch => {
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedDistributeMapData(json));
        }).catch((e)=>{
            dispatch(receivedDistributeMapError(e.toString()))
        });;
    }
}
export function postDistributeMapData(creds) {
    let path = '/data/getgsStatistics';
    return dispatch => {
        post(api + path ,creds).then((json) => {
            dispatch(receivedDistributeMapData(json));
        }).catch((e)=>{
            dispatch(receivedDistributeMapError(e.toString()))
        });;
    }
}
export function receivedDistributeMapData(data) {
    return {type: DISTRIBUTE_MAP_DATA, data: data}
}
export function receivedDistributeMapError(message) {
    return {type: DISTRIBUTE_MAP_ERROR, message: message}
}
//获取迁徙地图-首页AirportCoordMap
export const AIRPORTCOOR_MAP_DATA = 'airportCoor_map_data';
export const AIRPORTCOOR_MAP_ERROR = 'airportCoor_map_error';
export function fetchAirportCoordMapData(path,search='') {
    return dispatch => {
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedAirportCoordMapData(json));
        }).catch((e)=>{
            dispatch(receivedAirportCoordMapError(e.toString()))
        });;
    }
}
export function postAirportCoordMapData(creds) {
    let path = '/data/getQianStatistics';
    return dispatch => {
        dispatch({type:"REQUEST_AIRPORTCOOR_MAP_REPORT"});
        post(api + path ,creds).then((json) => {
            dispatch(receivedAirportCoordMapData(json));
        }).catch((e)=>{
            dispatch(receivedAirportCoordMapError(e.toString()))
        });;
    }
}
export function receivedAirportCoordMapData(data) {
    return {type: AIRPORTCOOR_MAP_DATA, data: data}
}
export function receivedAirportCoordMapError(message) {
    return {type: AIRPORTCOOR_MAP_ERROR, message: message}
}