// 管控人员
import {post} from "./request";
import {fetchRankUnitTreeData} from './actions';
import {serverUrls} from '../utils/index';
//获取列表
export function getControlPersonList(creds) {
    let path  = serverUrls + '/data/getControlPersonList';
    return dispatch => {
        post(path,creds).then((json) => {
            dispatch( {type: 'Control_Person_List',data: json} );
        }).catch((e)=>{
            dispatch({type: 'Control_Person_List_error',message: e.toString()} )
        });
    }
}
//详情
export function getControlDetail(creds) {
    let path  = serverUrls + '/data/getControlPersonListById';
    return dispatch => {
        post(path,creds).then((json) => {
            dispatch( {type: 'Control_PersonList_By_Id',data: json} );
        }).catch((e)=>{
            dispatch({type: 'Control_PersonList_By_Id_error',message: e.toString()} )
        });
    }
}
//导出
export function getControlExport(creds) {
    let path  = serverUrls + '/data/ControlPersonalExport';
    return dispatch => {
        post(path,creds).then((json) => {
            dispatch( {type: 'Export_Succeed',data: json} );
        }).catch((e)=>{
            dispatch({type: 'Export__error',message: e.toString()} )
        });
    }
}
//模板下载
export function getControlDownload(creds) {
    let path  = serverUrls + '/data/TemplateExport';
    return dispatch => {
        post(path,creds).then((json) => {
            dispatch( {type: 'Download_Succeed',data: json} );
        }).catch((e)=>{
            dispatch({type: 'Download_error',message: e.toString()} )
        });
    }
}
//自定义字段列表
export function getCustomFiledList(creds) {
    let path  = serverUrls + '/data/getCustomFiledList';
    return dispatch => {
        post(path,creds).then((json) => {
            dispatch( {type: 'get_Custom_Filed_List',data: json} );
        }).catch((e)=>{
            dispatch({type: 'get_Custom_Filed_List_error',message: e.toString()} )
        });
    }
}