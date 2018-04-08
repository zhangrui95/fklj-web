import {store} from '../index.js';
import {api} from "./actions";
import {post,get,put} from "./request";
import  * as constants from "../utils/Constants";

//个人中心-左侧菜单项
export const DTGK_MENU_ALL_CHANGE = 'recv-data';
export const DTGK_MENU_ZDGZ_CHAGE = 'recv-data-timeout';
export const DTGK_MENU_LDRY_CHAGE = 'recv-data-error';
export const PERSONCENETR_MENU_CHANGE_CURRENT = 'personcenter_menu_change_current';

export function PostPersonCenterData(creds) {
    let path = '/data/getOptPersonList';
    return dispatch => {
        dispatch({type:"REQUEST_PERSONCENER"});
        post(api+path,creds).then((json)=>{
            dispatch({type: 'recv-person-center-data', data: json})
        }).catch((e)=>{
            dispatch({type: 'recv-person-center-error', message: e.toString()})
        });
    }
}

export function PostPersonCenterFollowData(creds) {
    let path = '/data/getmesslistPage';
    return dispatch => {
        dispatch({type:"REQUEST_PERSONCENER_FOLLOW"});
        post(api+path,creds).then((json)=>{
            dispatch({type: 'recv-person-center-follow-data', data: json})
        }).catch((e)=>{
            dispatch({type: 'recv-person-center-follow-error', message: e.toString()})
        });
    }
}
export function PostPersonCenterJudgeData(creds) {
    let path = '/data/JudgeRecList';
    return dispatch => {
        dispatch({type:"REQUEST_PERSONCENER_JUDGE"});
        post(api+path,creds).then((json)=>{
            dispatch({type: 'recv-person-center-judge-data', data: json})
        }).catch((e)=>{
            dispatch({type: 'recv-person-center-judge-error', message: e.toString()})
        });
    }
}

// export function personalCenterChangeMenu(menu,type) {
//     if(type=='openAndClose'){//菜单打开关闭
        
//     }else if(type=='getData'){//点击目录
//          store.dispatch(PostPersonCenterData());
//         return {type:PERSONCENETR_MENU_CHANGE_CURRENT,menu:menu};
//     }
// }