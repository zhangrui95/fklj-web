// 任务管理模块-action-洛阳
import {api,fetchRankUnitTreeData} from "../actions";
import {post,get,put} from "../request";
import  * as constants from "../utils/Constants";
import {store} from '../index.js';
import { message} from 'antd';

//获取卡点任务
export function fetchPointTaskData(creds) {
    let path = '/data/getExamineTasklistPage';
    return dispatch => {
        dispatch({type:"REQUEST_TASK_MANAGEMENT"});
        post(api + path,creds).then((json) => {
            dispatch( {type: 'TaskManagement-data',data: json} );
        }).catch((e)=>{
            dispatch({type: 'TaskManagement-error',message: e.toString()} )
        });;
    }
}
//修改卡点任务
export function updatePointTaskData(creds, fun, clearUnit,initEntity,params,loadchange) {
    return dispatch => {
        post(api + "/data/updateExamineTask",creds).then((json) => {
            if(json.reason === null){
                let creds = params
                store.dispatch(fetchPointTaskData(creds));
                fun();
                initEntity();
            }else{
                //message.error(json.reason.text);
                if(json.reason.code === '666'){
                    message.error("提示："+json.reason.text+"!");
                    //dispatch(fetchRankUnitTreeData('112001'));//获取1级卡点与单位的树
                   // dispatch(fetchRankUnitTreeData('112002'));//获取2级卡点与单位的树
                   // dispatch(fetchRankUnitTreeData('112003'));//获取3级卡点与单位的树
                   clearUnit();
                }
                
                loadchange()
            }
        }).catch((e)=>{
        });;
    }
}
//添加卡点任务
export function addPointTaskData(creds, fun, clearUnit,initEntity,params,loadchange) {
    return dispatch => {
       // dispatch({type:"REQUEST_SAVE_Define_WAREHOUSE_PERSON"});
        post(api + "/data/saveExamineTask",creds).then((json) => {
            //dispatch( {type: 'Save_DefineWarehousePerson_data',data: json} );
            if(json.reason === null){
                let creds = params
                store.dispatch(fetchPointTaskData(creds));
                fun();
                initEntity()
            }else{
                if(json.reason.code === '666'){
                    message.error("提示："+json.reason.text+"!");
                    //dispatch(fetchRankUnitTreeData('112001'));//获取1级卡点与单位的树
                    //dispatch(fetchRankUnitTreeData('112002'));//获取2级卡点与单位的树
                    //dispatch(fetchRankUnitTreeData('112003'));//获取3级卡点与单位的树
                    clearUnit();
                }
               
                loadchange();
            }
        }).catch((e)=>{
        });;
    }
}
//终止卡点任务
export function endPointTaskData(creds,initEntity) {
    return dispatch => {
        post(api + "/data/endExamineTask",creds).then((json) => {
            let creds = {
                currentPage:1,
                entityOrField:true,
                pd:{
                    task_type:'113002'  //下发任务
                },
                showCount: constants.pageSize
            }
            store.dispatch(fetchPointTaskData(creds));
            initEntity();
        }).catch((e)=>{
        });;
    }
}
//根据ID获取卡点任务详情
export function getPointTaskDetailsById(taskId) {
    let creds = {
        id:taskId
    }
    return dispatch => {
        post(api + "/data/getTaskDetailsById",creds).then((json) => {

            dispatch( {type: 'Task-Tree-data',data: json} );

        }).catch((e)=>{
        });;
    }
}



//获取巡逻任务
export function fetchPatrolTaskData(creds) {
    let path = '/data/getExaminePatrolTasklistPage';
    return dispatch => {
        dispatch({type:"REQUEST_TASK_MANAGEMENT"});
        post(api + path,creds).then((json) => {
            dispatch( {type: 'TaskManagement-data',data: json} );
        }).catch((e)=>{
            dispatch({type: 'TaskManagement-error',message: e.toString()} )
        });;
    }
}
//修改巡逻任务
export function updatePatrolTaskData(creds, fun, clearUnit,initEntity,params,loadchange) {
    return dispatch => {
        post(api + "/data/updateExaminePatrolTask",creds).then((json) => {
            if(json.reason === null){
                let creds = params
                store.dispatch(fetchPatrolTaskData(creds));
                fun();
                initEntity();
            }else{
                //message.error(json.reason.text);
                if(json.reason.code === '666'){
                    message.error("提示："+json.reason.text+"!");
                    //dispatch(fetchRankUnitTreeData('112001'));//获取1级巡逻与单位的树
                    // dispatch(fetchRankUnitTreeData('112002'));//获取2级巡逻与单位的树
                    // dispatch(fetchRankUnitTreeData('112003'));//获取3级巡逻与单位的树
                }
                
                loadchange();
            }
        }).catch((e)=>{
        });;
    }
}

//添加巡逻任务
export function addPatrolTaskData(creds, fun, clearUnit,initEntity,params,loadchange) {
    // console.log('Loading',Loading);
    return dispatch => {
        // dispatch({type:"REQUEST_SAVE_Define_WAREHOUSE_PERSON"});
        post(api + "/data/saveExaminePatrolTask",creds).then((json) => {
            //dispatch( {type: 'Save_DefineWarehousePerson_data',data: json} );
            if(json.reason === null){
                let creds = params
                store.dispatch(fetchPatrolTaskData(creds));
                fun();
                initEntity();
            }else{
                if(json.reason.code === '666'){
                    message.error("提示："+json.reason.text+"!");
                    //dispatch(fetchRankUnitTreeData('112001'));//获取1级巡逻与单位的树
                    //dispatch(fetchRankUnitTreeData('112002'));//获取2级巡逻与单位的树
                    //dispatch(fetchRankUnitTreeData('112003'));//获取3级巡逻与单位的树
                    clearUnit();
                }
                
                loadchange();
                // console.log('错误提示Loading',this.state.Loading);
            }
        }).catch((e)=>{
        });;
    }
}


//终止巡逻任务
export function endPatrolTaskData(creds,initEntity) {
    return dispatch => {
        post(api + "/data/endExaminePatrolTask",creds).then((json) => {
            let creds = {
                currentPage:1,
                entityOrField:true,
                pd:{
                    task_type:'113003'
                },
                showCount: constants.pageSize
            }
            store.dispatch(fetchPatrolTaskData(creds));
            initEntity();
        }).catch((e)=>{
        });;
    }
}
//根据ID获取巡逻任务详情
export function getPatrolTaskDetailsById(taskId) {
    let creds = {
        id:taskId
    }
    return dispatch => {
        post(api + "/data/getPatrolTaskDetailsById",creds).then((json) => {

            dispatch( {type: 'Task-Tree-data',data: json} );

        }).catch((e)=>{
        });;
    }
}


