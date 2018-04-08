// 卡口管理模块-action
import {api} from "./actions";
import {post,get,put} from "./request";
import  * as constants from "../utils/Constants";
import {store} from '../index.js';
import { message} from 'antd';
//自定义
export function fetchCardPointData(creds) {
    let path = '/data/getCardPointManagement';
    return dispatch => {
        dispatch({type:"REQUEST_CARD_POINT"});
        post(api + path,creds).then((json) => {
            dispatch( {type: 'CardPoint-data',data: json} );
        }).catch((e)=>{
            dispatch({type: 'CardPoint-error',message: e.toString()} )
        });;
    }
}


//保存修改
export function saveCardPointData(creds,fun) {
    return dispatch => {
        post(api + "/saveDefineWare",creds).then((json) => {
            if(json.reason === null){
                let creds = {
                    currentPage:1,
                    entityOrField:true,
                    pd:{
                    },
                    showCount: constants.pageSize
                }
                store.dispatch(fetchCardPointData(creds));
                fun();
            }else{
                message.error("提示："+json.reason.text+"!");
            }
        }).catch((e)=>{
        });;
    }
}

//新增
export function addCardPointData(creds,fun) {
    return dispatch => {
       // dispatch({type:"REQUEST_SAVE_Define_WAREHOUSE_PERSON"});
        post(api + "/addDefineWare",creds).then((json) => {
            //dispatch( {type: 'Save_DefineWarehousePerson_data',data: json} );
            if(json.reason === null){
                let creds = {
                    currentPage:1,
                    entityOrField:true,
                    pd:{
                    },
                    showCount: constants.pageSize
                }
                store.dispatch(fetchCardPointData(creds));
                fun();
            }else{
                message.error(json.reason.text);
            }
        }).catch((e)=>{
        });;
    }
}

//删除
export function DeleteCardPointData(creds) {
    return dispatch => {
        post(api + "/deleteDefineWare",creds).then((json) => {
            let creds = {
                currentPage:1,
                entityOrField:true,
                pd:{
                },
                showCount: constants.pageSize
            }
            store.dispatch(fetchCardPointData(creds));
        }).catch((e)=>{
        });;
    }
}
