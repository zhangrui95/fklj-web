/*
统计报表-action
 */
import {api} from "./actions";
import {post,get,put} from "./request";

//获取统计报表-分布情况数据DistributeCharts
export const DISTRIBUTE_CHARTS_DATA = 'distribute_charts_data';
export const DISTRIBUTE_CHARTS_ERROR = 'distribute_charts_error';
export function fetchDistributeChartsData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_DISTRIBUTE_REPORTFORM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedDistributeChartsData(json));
        }).catch((e)=>{
            dispatch(receivedDistributeChartsError(e.toString()))
        });;
    }
}
export function postDistributeChartsData(creds) {
    let path = '/data/getgsStatistics';
    return dispatch => {
        dispatch({type:"REQUEST_DISTRIBUTE_REPORTFORM"});
        post(api + path , creds).then((json) => {
            dispatch(receivedDistributeChartsData(json));
        }).catch((e)=>{
            dispatch(receivedDistributeChartsError(e.toString()))
        });;
    }
}
export function receivedDistributeChartsData(data) {
    return {type: DISTRIBUTE_CHARTS_DATA, data: data}
}
export function receivedDistributeChartsError(message) {
    return {type: DISTRIBUTE_CHARTS_ERROR, message: message}
}
//获取统计报表-原籍地情况数据
export const ORIGINAL_CHARTS_DATA = 'original_charts_data';
export const ORIGINAL_CHARTS_ERROR = 'original_charts_error';
export function fetchOriginalChartsData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_ORIGINAL_REPORTFORM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedOriginalChartsData(json));
        }).catch((e)=>{
            dispatch(receivedOriginalChartsError(e.toString()))
        });;
    }
}
export function postOriginalChartsData(creds) {
    let path = '/data/getDomicileCountStatistics';
    return dispatch => {
        dispatch({type:"REQUEST_ORIGINAL_REPORTFORM"});
        post(api + path, creds).then((json) => {
            dispatch(receivedOriginalChartsData(json));
        }).catch((e)=>{
            dispatch(receivedOriginalChartsError(e.toString()))
        });;
    }
}
export function receivedOriginalChartsData(data) {
    return {type: ORIGINAL_CHARTS_DATA, data: data}
}
export function receivedOriginalChartsError(message) {
    return {type: ORIGINAL_CHARTS_ERROR, message: message}
}
//获取统计报表-居住情况数据
export const LIVE_CHARTS_DATA = 'live_charts_data';
export const LIVE_CHARTS_ERROR = 'live_charts_error';
export function fetchLiveChartsData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_LIVE_REPORTFORM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedLiveChartsData(json));
        }).catch((e)=>{
            dispatch(receivedLiveChartsError(e.toString()))
        });;
    }
}
export function postLiveChartsData(creds) {
    let path = '/data/getCHANGStatistics';
    return dispatch => {
        dispatch({type:"REQUEST_LIVE_REPORTFORM"});
        post(api + path ,creds).then((json) => {
            dispatch(receivedLiveChartsData(json));
        }).catch((e)=>{
            dispatch(receivedLiveChartsError(e.toString()))
        });;
    }
}
export function receivedLiveChartsData(data) {
    return {type: LIVE_CHARTS_DATA, data: data}
}
export function receivedLiveChartsError(message) {
    return {type: LIVE_CHARTS_ERROR, message: message}
}
//获取统计报表-性别情况数据
export const SEX_CHARTS_DATA = 'sex_charts_data';
export const SEX_CHARTS_ERROR = 'sex_charts_error';
export function fetchSexChartsData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_SEX_REPORTFORM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedSexChartsData(json));
        }).catch((e)=>{
            dispatch(receivedSexChartsError(e.toString()))
        });;
    }
}
export function postSexChartsData(creds) {
    let path = '/data/getSexStatistics';
    return dispatch => {
        dispatch({type:"REQUEST_SEX_REPORTFORM"});
        post(api + path ,creds).then((json) => {
            dispatch(receivedSexChartsData(json));
        }).catch((e)=>{
            dispatch(receivedSexChartsError(e.toString()))
        });;
    }
}
export function receivedSexChartsData(data) {
    return {type: SEX_CHARTS_DATA, data: data}
}
export function receivedSexChartsError(message) {
    return {type: SEX_CHARTS_ERROR, message: message}
}
//获取统计报表-就业情况数据ObtainEmployment
export const OBTAINEMPLOYMENT_CHARTS_DATA = 'obtainEmployment_charts_data';
export const OBTAINEMPLOYMENT_CHARTS_ERROR = 'obtainEmployment_charts_error';
export function fetchObtainEmploymentChartsData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_OBTAINEMPLOYMENT_REPORTFORM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedObtainEmploymentChartsData(json));
        }).catch((e)=>{
            dispatch(receivedObtainEmploymentChartsError(e.toString()))
        });;
    }
}
export function postObtainEmploymentChartsData(creds) {
    let path = '/data/getISjobStatistics';
    return dispatch => {
        dispatch({type:"REQUEST_OBTAINEMPLOYMENT_REPORTFORM"});
        post(api + path ,creds).then((json) => {
            dispatch(receivedObtainEmploymentChartsData(json));
        }).catch((e)=>{
            dispatch(receivedObtainEmploymentChartsError(e.toString()))
        });;
    }
}
export function receivedObtainEmploymentChartsData(data) {
    return {type: OBTAINEMPLOYMENT_CHARTS_DATA, data: data}
}
export function receivedObtainEmploymentChartsError(message) {
    return {type: OBTAINEMPLOYMENT_CHARTS_ERROR, message: message}
}
//获取统计报表-年龄情况数据
export const AGE_CHARTS_DATA = 'age_charts_data';
export const AGE_CHARTS_ERROR = 'age_charts_error';
export function fetchAgeChartsData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_AGE_REPORTFORM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedAgeChartsData(json));
        }).catch((e)=>{
            dispatch(receivedAgeChartsError(e.toString()))
        });;
    }
}
export function postAgeChartsData(creds) {
    let path = '/data/getAgeStatistics';
    return dispatch => {
        dispatch({type:"REQUEST_AGE_REPORTFORM"});
        post(api + path , creds).then((json) => {
            dispatch(receivedAgeChartsData(json));
        }).catch((e)=>{
            dispatch(receivedAgeChartsError(e.toString()))
        });;
    }
}
export function receivedAgeChartsData(data) {
    return {type: AGE_CHARTS_DATA, data: data}
}
export function receivedAgeChartsError(message) {
    return {type: AGE_CHARTS_ERROR, message: message}
}
//获取统计报表-异常人员情况数据Abnormal
export const ABNORMAL_CHARTS_DATA = 'abnormal_charts_data';
export const ABNORMAL_CHARTS_ERROR = 'abnormal_charts_error';
export function fetchAbnormalChartsData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_ABNORMAL_REPORTFORM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedAbnormalChartsData(json));
        }).catch((e)=>{
            dispatch(receivedAbnormalChartsError(e.toString()))
        });;
    }
}
export function postAbnormalChartsData(creds) {
    let path = '/data/getCodePStatistics';
    return dispatch => {
        dispatch({type:"REQUEST_ABNORMAL_REPORTFORM"});
        post(api + path ,creds).then((json) => {
            dispatch(receivedAbnormalChartsData(json));
        }).catch((e)=>{
            dispatch(receivedAbnormalChartsError(e.toString()))
        });;
    }
}
export function receivedAbnormalChartsData(data) {
    return {type: ABNORMAL_CHARTS_DATA, data: data}
}
export function receivedAbnormalChartsError(message) {
    return {type: ABNORMAL_CHARTS_ERROR, message: message}
}
//获取统计报表-关注人员类别情况数据AttentionCategory
export const ATTENTIONCATEGORY_CHARTS_DATA = 'attentioncategory_charts_data';
export const ATTENTIONCATEGORY_CHARTS_ERROR = 'attentioncategory_charts_error';
export function fetchAttentionCategoryChartsData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_ATTENTIONCATEGORY_REPORTFORM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedAttentionCategoryChartsData(json));
        }).catch((e)=>{
            dispatch(receivedAttentionCategoryChartsError(e.toString()))
        });;
    }
}
export function postAttentionCategoryChartsData(creds) {
    let path = '/data/getPersonStatistics';
    return dispatch => {
        dispatch({type:"REQUEST_ATTENTIONCATEGORY_REPORTFORM"});
        post(api + path ,creds).then((json) => {
            dispatch(receivedAttentionCategoryChartsData(json));
        }).catch((e)=>{
            dispatch(receivedAttentionCategoryChartsError(e.toString()))
        });;
    }
}
export function receivedAttentionCategoryChartsData(data) {
    return {type: ATTENTIONCATEGORY_CHARTS_DATA, data: data}
}
export function receivedAttentionCategoryChartsError(message) {
    return {type: ATTENTIONCATEGORY_CHARTS_ERROR, message: message}
}

//获取统计报表-数据完整性情况数据Complete
export const COMPLETE_CHARTS_DATA = 'complete_charts_data';
export const COMPLETE_CHARTS_ERROR = 'complete_charts_error';
export function fetchCompleteChartsData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_COMPLETE_REPORTFORM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedCompleteChartsData(json));
        }).catch((e)=>{
            dispatch(receivedCompleteChartsError(e.toString()))
        });;
    }
}
export function postCompleteChartsData(creds) {
    let path = '/data/getDataIntegrity';
    return dispatch => {
        dispatch({type:"REQUEST_COMPLETE_REPORTFORM"});
        post(api + path ,creds).then((json) => {
            dispatch(receivedCompleteChartsData(json));
        }).catch((e)=>{
            dispatch(receivedCompleteChartsError(e.toString()))
        });;
    }
}
export function receivedCompleteChartsData(data) {
    return {type: COMPLETE_CHARTS_DATA, data: data}
}
export function receivedCompleteChartsError(message) {
    return {type: COMPLETE_CHARTS_ERROR, message: message}
}

//获取统计报表-流入方式情况数据Inflow
export const INFLOW_CHARTS_DATA = 'inflow_charts_data';
export const INFLOW_CHARTS_ERROR = 'inflow_charts_error';
export function fetchInflowChartsData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_INFLOW_REPORTFORM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedInflowChartsData(json));
        }).catch((e)=>{
            dispatch(receivedInflowChartsError(e.toString()))
        });;
    }
}
export function postInflowChartsData(creds) {
    let path = '/data/getTripStatistics';
    return dispatch => {
        dispatch({type:"REQUEST_INFLOW_REPORTFORM"});
        post(api + path ,creds).then((json) => {
            dispatch(receivedInflowChartsData(json));
        }).catch((e)=>{
            dispatch(receivedInflowChartsError(e.toString()))
        });;
    }
}
export function receivedInflowChartsData(data) {
    return {type: INFLOW_CHARTS_DATA, data: data}
}
export function receivedInflowChartsError(message) {
    return {type: INFLOW_CHARTS_ERROR, message: message}
}
//获取统计报表-数据来源情况数据DataSources
export const DATASOURCES_CHARTS_DATA = 'dataSources_charts_data';
export const DATASOURCES_CHARTS_ERROR = 'dataSources_charts_error';
export function fetchDataSourcesChartsData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_DATASOURCES_REPORTFORM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedDataSourcesChartsData(json));
        }).catch((e)=>{
            dispatch(receivedDataSourcesChartsError(e.toString()))
        });;
    }
}
export function postDataSourcesChartsData(creds) {
    let path = '';
    return dispatch => {
        dispatch({type:"REQUEST_DATASOURCES_REPORTFORM"});
        post(api + path , creds).then((json) => {
            dispatch(receivedDataSourcesChartsData(json));
        }).catch((e)=>{
            dispatch(receivedDataSourcesChartsError(e.toString()))
        });;
    }
}
export function receivedDataSourcesChartsData(data) {
    return {type: DATASOURCES_CHARTS_DATA, data: data}
}
export function receivedDataSourcesChartsError(message) {
    return {type: DATASOURCES_CHARTS_ERROR, message: message}
}

//获取统计报表-流出方式情况数据
export const FLOWOUT_CHARTS_DATA = 'flowout_charts_data';
export const FLOWOUT_CHARTS_ERROR = 'flowout_charts_error';
export function fetchFlowoutChartsData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_FLOWOUT_REPORTFORM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedFlowoutChartsData(json));
        }).catch((e)=>{
            dispatch(receivedFlowoutChartsError(e.toString()))
        });;
    }
}
export function postFlowoutChartsData(creds) {
    let path = '/data/getTripStatisticsF';
    return dispatch => {
        dispatch({type:"REQUEST_FLOWOUT_REPORTFORM"});
        post(api + path ,creds).then((json) => {
            dispatch(receivedFlowoutChartsData(json));
        }).catch((e)=>{
            dispatch(receivedFlowoutChartsError(e.toString()))
        });;
    }
}
export function receivedFlowoutChartsData(data) {
    return {type: FLOWOUT_CHARTS_DATA, data: data}
}
export function receivedFlowoutChartsError(message) {
    return {type: FLOWOUT_CHARTS_ERROR, message: message}
}

//获取统计报表-活动人员情况数据ActivePersonneL
export const ACTIVEPERSONNEL_CHARTS_DATA = 'activePersonnel_charts_data';
export const ACTIVEPERSONNEL_CHARTS_ERROR = 'activePersonnel_charts_error';
export function fetchActivePersonnelChartsData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_ACTIVEPERSONNEL_REPORTFORM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedActivePersonnelChartsData(json));
        }).catch((e)=>{
            dispatch(receivedActivePersonnelChartsError(e.toString()))
        });;
    }
}
export function postActivePersonnelChartsData(creds) {
    let path = '/data/getMessStatistics';
    return dispatch => {
        dispatch({type:"REQUEST_ACTIVEPERSONNEL_REPORTFORM"});
        post(api + path ,creds).then((json) => {
            dispatch(receivedActivePersonnelChartsData(json));
        }).catch((e)=>{
            dispatch(receivedActivePersonnelChartsError(e.toString()))
        });;
    }
}
export function receivedActivePersonnelChartsData(data) {
    return {type: ACTIVEPERSONNEL_CHARTS_DATA, data: data}
}
export function receivedActivePersonnelChartsError(message) {
    return {type: ACTIVEPERSONNEL_CHARTS_ERROR, message: message}
}

//获取统计报表-总体数据的关注人员总和数据TotalAttention
export const TOTALATTENTION_CHARTS_DATA = 'totalAttention_charts_data';
export const TOTALATTENTION_CHARTS_ERROR = 'totalAttention_charts_error';
export function fetchTotalAttentionData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_TOTALATTENTION_REPORTFORM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedTotalAttentionData(json));
        }).catch((e)=>{
            dispatch(receivedTotalAttentionError(e.toString()))
        });;
    }
}
export function postTotalAttentionData(creds) {
    return dispatch => {
        let path = '/data/MessRecordCount'
        dispatch({type:"REQUEST_TOTALATTENTION_REPORTFORM"});
        post(api + path , creds).then((json) => {
            dispatch(receivedTotalAttentionData(json));
        }).catch((e)=>{
            dispatch(receivedTotalAttentionError(e.toString()))
        });;
    }
}
export function receivedTotalAttentionData(data) {
    return {type: TOTALATTENTION_CHARTS_DATA, data: data}
}
export function receivedTotalAttentionError(message) {
    return {type: TOTALATTENTION_CHARTS_ERROR, message: message}
}
//获取统计报表-利剑数据的关注人员总和数据TaskTotalAttention
export const TASKTOTALATTENTION_CHARTS_DATA = 'tasktotalAttention_charts_data';
export const TASKTOTALATTENTION_CHARTS_ERROR = 'tasktotalAttention_charts_error';
export function fetchTaskTotalAttentionData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_TASKTOTALATTENTION_REPORTFORM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedTaskTotalAttentionData(json));
        }).catch((e)=>{
            dispatch(receivedTaskTotalAttentionError(e.toString()))
        });;
    }
}
export function postTaskTotalAttentionData(creds) {
    let path ='/data/MessRecordCount';
    return dispatch => {
        dispatch({type:"REQUEST_TASKTOTALATTENTION_REPORTFORM"});
        post(api + path ,creds).then((json) => {
            dispatch(receivedTaskTotalAttentionData(json));
        }).catch((e)=>{
            dispatch(receivedTaskTotalAttentionError(e.toString()))
        });;
    }
}
export function receivedTaskTotalAttentionData(data) {
    return {type: TASKTOTALATTENTION_CHARTS_DATA, data: data}
}
export function receivedTaskTotalAttentionError(message) {
    return {type: TASKTOTALATTENTION_CHARTS_ERROR, message: message}
}
//获取统计报表-活动-流入总和数据activityInflow
export const ACTIVITYINFLOW_CHARTS_DATA = 'activityInflow_charts_data';
export const ACTIVITYINFLOW_CHARTS_ERROR = 'activityInflow_charts_error';
export function fetchActivityInflowData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_ACTIVITYINFLOW_REPORTFORM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedActivityInflowData(json));
        }).catch((e)=>{
            dispatch(receivedActivityInflowError(e.toString()))
        });;
    }
}
export function postActivityInflowData(creds) {
    let path = '/data/FromRecordCount';
    return dispatch => {
        dispatch({type:"REQUEST_ACTIVITYINFLOW_REPORTFORM"});
        post(api + path ,creds).then((json) => {
            dispatch(receivedActivityInflowData(json));
        }).catch((e)=>{
            dispatch(receivedActivityInflowError(e.toString()))
        });;
    }
}
export function receivedActivityInflowData(data) {
    return {type: ACTIVITYINFLOW_CHARTS_DATA, data: data}
}
export function receivedActivityInflowError(message) {
    return {type: ACTIVITYINFLOW_CHARTS_ERROR, message: message}
}
//获取统计报表-活动-流出总和数据activityOutflow
export const ACTIVITYOUTFLOW_CHARTS_DATA = 'activityOutflow_charts_data';
export const ACTIVITYOUTFLOW_CHARTS_ERROR = 'activityOutflow_charts_error';
export function fetchActivityOutflowData(path,search='') {
    return dispatch => {
        dispatch({type:"REQUEST_ACTIVITYOUTFLOW_REPORTFORM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedActivityOutflowData(json));
        }).catch((e)=>{
            dispatch(receivedActivityOutflowError(e.toString()))
        });;
    }
}
export function postActivityOutflowData(creds) {
    let path = '/data/ToRecordCount';
    return dispatch => {
        dispatch({type:"REQUEST_ACTIVITYOUTFLOW_REPORTFORM"});
        post(api + path ,creds).then((json) => {
            dispatch(receivedActivityOutflowData(json));
        }).catch((e)=>{
            dispatch(receivedActivityOutflowError(e.toString()))
        });;
    }
}
export function receivedActivityOutflowData(data) {
    return {type: ACTIVITYOUTFLOW_CHARTS_DATA, data: data}
}
export function receivedActivityOutflowError(message) {
    return {type: ACTIVITYOUTFLOW_CHARTS_ERROR, message: message}
}