import {api} from './actions';
import {post,get,put} from "./request";

//API接口前缀
export const INTERROGATION_DATA = 'interrogation-record-data';
export const INTERROGATION_ERROR = 'interrogation-record-error';

//获取人员盘查记录
export function fetchInterrogationUsersData(path,search='') {

    return dispatch => {
        fetch(api+path+'?'+search)//请求
            .then((res)=>res.json())
            .then((json)=>{
                dispatch(receivedInterrogationUsersData(json))
            })
            .catch((e)=>{
                dispatch(receivedInterrogationUsersError(e.toString()))
            });
    }
}
export function postInterrogationUsersData(creds) {
    let path = '/data/getArcPersonlistPage';
    return dispatch => {
        dispatch({type:"REQUEST_INTERROGATIOM_RECORD"});
        post(api+path,creds)//请求
            .then((json)=>{
                dispatch(receivedInterrogationUsersData(json))
            })
            .catch((e)=>{
                dispatch(receivedInterrogationUsersError(e.toString()))
            });
    }
}

export function receivedInterrogationUsersData(data) {
    return {type: INTERROGATION_DATA, data: data}
}
export function receivedInterrogationUsersError(message) {
    return {type: INTERROGATION_ERROR, message: message}
}
