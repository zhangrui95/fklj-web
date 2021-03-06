// 管控人员
import {post} from "./request";
import {fetchRankUnitTreeData} from './actions';
import {serverUrls} from '../utils/index';
// import { ADDRGETNETWORKPARAMS } from "dns";
import { store } from '../index.js';
import { message } from 'antd';
//获取列表
export function getControlPersonList(creds) {
    let path  = serverUrls + '/data/getControlPersonList';
    return dispatch => {
        dispatch({type:"List_Loading"});
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
//未管控导出
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
//已管控，离开责任区，失控导出
export function getControlExport2(creds) {
    let path  = serverUrls + '/data/ControlPersonalExport2';
    return dispatch => {
        post(path,creds).then((json) => {
            dispatch( {type: 'Export2_Succeed',data: json} );
        }).catch((e)=>{
            dispatch({type: 'Export2_error',message: e.toString()} )
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
        dispatch( {type: 'get_Custom_Filed_Loading'} );
        post(path,creds).then((json) => {
            dispatch( {type: 'get_Custom_Filed_List',data: json} );
        }).catch((e)=>{
            dispatch({type: 'get_Custom_Filed_List_error',message: e.toString()} )
        });
    }
}
//自定义字段列表调用
export function getCustom(creds) {
    let path  = serverUrls + '/data/getCustomFiledList';
    return dispatch => {
        dispatch( {type: 'get_Custom_Loading'} );
        post(path,creds).then((json) => {
            dispatch( {type: 'get_Custom_List',data: json} );
        }).catch((e)=>{
            dispatch({type: 'get_Custom_List_error',message: e.toString()} )
        });
    }
}
//自定义字段新增（修改）
export function insertOrUpdateCustomFiled(creds,zdyType,getNewWords,hideModals) {
    let path  = serverUrls + '/data/insertOrUpdateCustomFiled';
    return dispatch => {
        post(path,creds).then((json) => {
            dispatch( {type: 'insertOrUpdateCustomFiled_succeed',data: json} );
            if(json.reason === null){
                hideModals();
                message.success(`提示：自定义字段${zdyType === 'add' ? '新增':'修改'}成功`);
                store.dispatch(getCustom({showtype:1}));
                getNewWords();
            }else{
                message.error(`提示：${json.reason.text}`);
            }
        }).catch((e)=>{
            dispatch({type: 'insertOrUpdateCustomFiled_error',message: e.toString()} )
        });
    }
}
//删除自定义字段
export function delCustomFiled(creds) {
    let path  = serverUrls + '/data/delCustomFiled';
    return dispatch => {
        post(path,creds).then((json) => {
            dispatch( {type: 'delCustomFiled_succeed',data: json} );
            if (json.reason === null) {
                message.success(`提示：字段删除成功`);
                store.dispatch(getCustom({showtype:1}));
                store.dispatch(getCustomFiledList({}));
            } else {
                message.error(`提示：${json.reason.text}`);
            }
        }).catch((e)=>{
            dispatch({type: 'delCustomFiled_error',message: e.toString()} )
        });
    }
}
//添加到任务
export function updateTaskModelControlPerson(creds,getNewsList,changeSelection,ModalTitle) {
    let path  = serverUrls + '/data/updateTaskModelControlPerson';
    return dispatch => {
        post(path,creds).then((json) => {
            dispatch( {type: 'updateTaskModelControlPerson_succeed',data: json} );
            if(json.reason === null){
                message.success(`提示：${ModalTitle}成功`);
                getNewsList();
                changeSelection();
            }else{
                message.error(`提示：${json.reason.text}`);
            }
        }).catch((e)=>{
            dispatch({type: 'updateTaskModelControlPerson_error',message: e.toString()} )
        });
    }
}
//任务列表
export function getTaskModelList(creds) {
    let path  = serverUrls + '/data/getTaskModelList';
    return dispatch => {
        post(path,creds).then((json) => {
            dispatch( {type: 'getTaskModelList_succeed',data: json} );
        }).catch((e)=>{
            dispatch({type: 'getTaskModelList_error',message: e.toString()} )
        });
    }
}
