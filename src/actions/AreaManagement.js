// 片区管理模块-action
import {api} from "./actions";
import {post,get,put} from "./request";
import  * as constants from "../utils/Constants";
import {store} from '../index.js';
import { message} from 'antd';
import {fetchRankUnitTreeData} from './actions';

//自定义
export function fetchCardPointData(creds) {
    let path = '/data/getCheckPointlistPage';
    return dispatch => {
        dispatch({type:"REQUEST_CARD_POINT"});
        post(api + path,creds).then((json) => {
            dispatch( {type: 'CardPoint-data',data: json} );
        }).catch((e)=>{
            dispatch({type: 'CardPoint-error',message: e.toString()} )
        });;
    }
}

