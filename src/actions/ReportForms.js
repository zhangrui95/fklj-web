/*
统计报表-action
 */
import {post} from "./request";
import {serverUrls} from '../utils/index';
//管控情况
export function getControlPersonList(creds) {
    let path  = serverUrls + '/data/getControlPersonalListGroupByControlType';
    return dispatch => {
        dispatch({type:"REQUEST_DISTRIBUTE_REPORTFORM"});
        post(path,creds).then((json) => {
            dispatch( {type: 'getControlPersonalListGroupByControlType_succeed',data: json} );
        }).catch((e)=>{
            dispatch({type: 'getControlPersonalListGroupByControlType_error',message: e.toString()} )
        });
    }
}
//居住情况
export function getControlPersonalListGroupByAddressType(creds) {
    let path  = serverUrls + '/data/getControlPersonalListGroupByAddressType';
    return dispatch => {
        dispatch({type:"Live_Type"});
        post(path,creds).then((json) => {
            dispatch( {type: 'getControlPersonalListGroupByAddressType_succeed',data: json} );
        }).catch((e)=>{
            dispatch({type: 'getControlPersonalListGroupByAddressType_error',message: e.toString()} )
        });
    }
}
//人员来源
export function getControlPersonalListGroupBySource(creds) {
    let path  = serverUrls + '/data/getControlPersonalListGroupBySource';
    return dispatch => {
        dispatch({type:"ListGroupBySource_Type"});
        post(path,creds).then((json) => {
            dispatch( {type: 'getControlPersonalListGroupBySource_succeed',data: json} );
        }).catch((e)=>{
            dispatch({type: 'getControlPersonalListGroupBySource_error',message: e.toString()} )
        });
    }
}
//人员总数
export function getControlPersonCountForX3(creds) {
    let path  = serverUrls + '/data/getControlPersonCountForX3';
    return dispatch => {
        post(path,creds).then((json) => {
            dispatch( {type: 'getControlPersonCountForX3_succeed',data: json} );
        }).catch((e)=>{
            dispatch({type: 'getControlPersonCountForX3_error',message: e.toString()} )
        });
    }
}
//任务完成情况统计
export function getSubtaskListGroupByType(creds) {
    let path  = serverUrls + '/data/getSubtaskListGroupByType';
    return dispatch => {
        dispatch({type:"getSubtaskListGroup_Type"});
        post(path,creds).then((json) => {
            dispatch( {type: 'getSubtaskListGroupByType_succeed',data: json} );
        }).catch((e)=>{
            dispatch({type: 'getSubtaskListGroupByType_error',message: e.toString()} )
        });
    }
}
//任务周期
export function getSubtaskListGroupByCycle(creds) {
    let path  = serverUrls + '/data/getSubtaskListGroupByCycle';
    return dispatch => {
        dispatch({type:"getSubtaskListGroupByCycle_Type"});
        post(path,creds).then((json) => {
            dispatch( {type: 'getSubtaskListGroupByCycle_succeed',data: json} );
        }).catch((e)=>{
            dispatch({type: 'getSubtaskListGroupByCycle_error',message: e.toString()} )
        });
    }
}
