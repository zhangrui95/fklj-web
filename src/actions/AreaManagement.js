// 卡点管理模块-action
import {api} from "./actions";
import {post,get,put} from "./request";
import  * as constants from "../utils/Constants";
import {store} from '../index.js';
import { message} from 'antd';
import {fetchRankUnitTreeData} from './actions';

export function findDeptTree(creds) {
    let path  = 'http://172.19.12.249:8100/dept/findDeptTree';
    return dispatch => {
        post(path,creds).then((json) => {
            dispatch( {type: 'Find_Dept_Tree',data: json} );
        }).catch((e)=>{
            dispatch({type: 'Find_Dept_Tree_error',message: e.toString()} )
        });
    }
}