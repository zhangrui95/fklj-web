// 任务管理模块-action-洛阳
import { api, fetchRankUnitTreeData } from "./actions";
import { post, get, put } from "./request";
import * as constants from "../utils/Constants";
import { store } from '../index.js';
import { message } from 'antd';

//获取卡点任务
export function fetchPointTaskData(creds) {
    let path = '/data/getExamineTasklistPage';
    return dispatch => {
        dispatch({ type: "REQUEST_TASK_MANAGEMENT" });
        post(api + path, creds).then((json) => {
            dispatch({ type: 'TaskManagement-data', data: json });
        }).catch((e) => {
            dispatch({ type: 'TaskManagement-error', message: e.toString() })
        });
    }
}
//修改卡点任务
export function updatePointTaskData(creds, fun, clearUnit, initEntity, params, loadchange) {
    return dispatch => {
        post(api + "/data/updateExamineTask", creds).then((json) => {
            if (json.reason === null) {
                let creds = params
                store.dispatch(fetchPointTaskData(creds));
                fun();
                initEntity();
            } else {
                //message.error(json.reason.text);
                if (json.reason.code === '666') {
                    message.error("提示：" + json.reason.text + "!");
                    //dispatch(fetchRankUnitTreeData('112001'));//获取1级卡点与单位的树
                    // dispatch(fetchRankUnitTreeData('112002'));//获取2级卡点与单位的树
                    // dispatch(fetchRankUnitTreeData('112003'));//获取3级卡点与单位的树
                    clearUnit();
                }

                loadchange()
            }
        }).catch((e) => {
        });
    }
}
//添加卡点任务
export function addPointTaskData(creds, fun, clearUnit, initEntity, params, loadchange) {
    return dispatch => {
        // dispatch({type:"REQUEST_SAVE_Define_WAREHOUSE_PERSON"});
        post(api + "/data/saveExamineTask", creds).then((json) => {
            //dispatch( {type: 'Save_DefineWarehousePerson_data',data: json} );
            if (json.reason === null) {
                let creds = params
                store.dispatch(fetchPointTaskData(creds));
                fun();
                initEntity()
            } else {
                if (json.reason.code === '666') {
                    message.error("提示：" + json.reason.text + "!");
                    //dispatch(fetchRankUnitTreeData('112001'));//获取1级卡点与单位的树
                    //dispatch(fetchRankUnitTreeData('112002'));//获取2级卡点与单位的树
                    //dispatch(fetchRankUnitTreeData('112003'));//获取3级卡点与单位的树
                    clearUnit();
                }

                loadchange();
            }
        }).catch((e) => {
        });
    }
}
//终止卡点任务
export function endPointTaskData(creds, initEntity) {
    return dispatch => {
        post(api + "/data/endExamineTask", creds).then((json) => {
            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    task_type: '113002'  //下发任务
                },
                showCount: constants.pageSize
            }
            store.dispatch(fetchPointTaskData(creds));
            initEntity();
        }).catch((e) => {
        });
    }
}
//根据ID获取卡点任务详情
export function getPointTaskDetailsById(taskId) {
    let creds = {
        id: taskId
    }
    return dispatch => {
        post(api + "/data/getTaskDetailsById", creds).then((json) => {

            dispatch({ type: 'Task-Tree-data', data: json });

        }).catch((e) => {
        });
    }
}



//获取巡逻任务
export function fetchPatrolTaskData(creds) {
    let path = '/data/getExaminePatrolTasklistPage';
    return dispatch => {
        dispatch({ type: "REQUEST_TASK_MANAGEMENT" });
        post(api + path, creds).then((json) => {
            dispatch({ type: 'TaskManagement-data', data: json });
        }).catch((e) => {
            dispatch({ type: 'TaskManagement-error', message: e.toString() })
        });
    }
}
//修改巡逻任务
export function updatePatrolTaskData(creds, fun, clearUnit, initEntity, params, loadchange) {
    return dispatch => {
        post(api + "/data/updateExaminePatrolTask", creds).then((json) => {
            if (json.reason === null) {
                let creds = params
                store.dispatch(fetchPatrolTaskData(creds));
                fun();
                initEntity();
            } else {
                //message.error(json.reason.text);
                if (json.reason.code === '666') {
                    message.error("提示：" + json.reason.text + "!");
                    //dispatch(fetchRankUnitTreeData('112001'));//获取1级巡逻与单位的树
                    // dispatch(fetchRankUnitTreeData('112002'));//获取2级巡逻与单位的树
                    // dispatch(fetchRankUnitTreeData('112003'));//获取3级巡逻与单位的树
                }

                loadchange();
            }
        }).catch((e) => {
        });
    }
}

//添加巡逻任务
export function addPatrolTaskData(creds, fun, clearUnit, initEntity, params, loadchange) {
    // console.log('Loading',Loading);
    return dispatch => {
        // dispatch({type:"REQUEST_SAVE_Define_WAREHOUSE_PERSON"});
        post(api + "/data/saveExaminePatrolTask", creds).then((json) => {
            //dispatch( {type: 'Save_DefineWarehousePerson_data',data: json} );
            if (json.reason === null) {
                let creds = params
                store.dispatch(fetchPatrolTaskData(creds));
                fun();
                initEntity();
            } else {
                if (json.reason.code === '666') {
                    message.error("提示：" + json.reason.text + "!");
                    //dispatch(fetchRankUnitTreeData('112001'));//获取1级巡逻与单位的树
                    //dispatch(fetchRankUnitTreeData('112002'));//获取2级巡逻与单位的树
                    //dispatch(fetchRankUnitTreeData('112003'));//获取3级巡逻与单位的树
                    clearUnit();
                }

                loadchange();
                // console.log('错误提示Loading',this.state.Loading);
            }
        }).catch((e) => {
        });
    }
}


//终止巡逻任务
export function endPatrolTaskData(creds, initEntity) {
    return dispatch => {
        post(api + "/data/endExaminePatrolTask", creds).then((json) => {
            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {
                    task_type: '113003'
                },
                showCount: constants.pageSize
            }
            store.dispatch(fetchPatrolTaskData(creds));
            initEntity();
        }).catch((e) => {
        });
    }
}
//根据ID获取巡逻任务详情
export function getPatrolTaskDetailsById(taskId) {
    let creds = {
        id: taskId
    }
    return dispatch => {
        post(api + "/data/getPatrolTaskDetailsById", creds).then((json) => {

            dispatch({ type: 'Task-Tree-data', data: json });

        }).catch((e) => {
        });
    }
}

// 任务管理 - 呼市反恐利剑
// 查询任务
export function postTaskListHushiData(creds) {
    let path = '/data/getTaskModelList';
    return dispatch => {
        dispatch({ type: "REQUEST_TASK_LIST_HUSHI_DATA" });
        post(api + path, creds).then((json) => {
            dispatch({ type: 'TaskListHushi-data', data: json });
        }).catch((e) => {
            dispatch({ type: 'TaskListHushi-error', message: e.toString() })
        });
    }
}
// 根据id查询任务模板信息
export function postTaskListHushiByIdData(creds,goback) {
    let path = '/data/getTaskModelById';
    return dispatch => {
        // dispatch({ type: "REQUEST_TASK_LIST_HUSHI_BYID_DATA" });
        post(api + path, creds).then((json) => {
            dispatch({ type: 'TaskListHushi-data-byid', data: json });
            goback();
        }).catch((e) => {
            dispatch({ type: 'TaskListHushi-error-byid', message: e.toString() })
        });
    }
}
// 增加任务
export function addTaskHushiData(creds, params) {
    let path = "/data/savecodeall"
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = params
                message.success('操作成功！');
                store.dispatch(postTaskListHushiData(creds));

            } else {
                message.error(`提示：${json.reason.text}`);
            }
        }).catch((e) => {
        });
        ;
    }
}
// 编辑任务
export function editTaskHushiData(creds, params) {
    let path = "/data/updateTaskModel"
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let parma = params
                message.success('操作成功！');
                store.dispatch(postTaskListHushiData(parma));

            } else {
                message.error(`提示：${json.reason.text}`);
            }
        }).catch((e) => {
        });
        ;
    }
}
// 子任务列表
export function postChildrenTaskListHushiData(creds) {
    let path = '/data/getSubtaskByTakModelId';
    return dispatch => {
        dispatch({ type: "REQUEST_CHILDREN_TASK_LIST_HUSHI_DATA" });
        post(api + path, creds).then((json) => {
            dispatch({ type: 'Children_TaskListHushi-data', data: json });
        }).catch((e) => {
            dispatch({ type: 'Children_TaskListHushi-error', message: e.toString() })
        });
    }
}
//待办 超期 已完成的列表
export function postThreeTaskListHushiData(creds) {
    let path = '/data/getSubtaskList';
    return dispatch => {
        dispatch({ type: "REQUEST_THREE_TASK_LIST_HUSHI_DATA" });
        post(api + path, creds).then((json) => {
            dispatch({ type: 'Three_TaskListHushi-data', data: json });
        }).catch((e) => {
            dispatch({ type: 'Three_TaskListHushi-error', message: e.toString() })
        });
    }
}
// 根据待办 超期 已完成的id 获取信息
export function postThreeTaskListHushiByIdData(creds, goback) {
    let path = '/data/getSubtaskById';
    return dispatch => {
        dispatch({ type: "REQUEST_THREE_TASK_LIST_HUSHI_BYID_DATA" });
        post(api + path, creds).then((json) => {
            dispatch({ type: 'Three_TaskListHushi-data-byid', data: json });
            if (json.reason === null) {
                goback();
            } else {
                message.error(`提示：${json.reason.text}`,1);
            }
        }).catch((e) => {
            dispatch({ type: 'Three_TaskListHushi-error-byid', message: e.toString() })
        });
    }
}
// // 启动
// export function startUpTaskHushiData(creds, params) {
//     let path = "/data/savecodeall"
//     return dispatch => {
//         post(api + path, creds).then((json) => {
//             if (json.reason === null) {
//                 let creds = params
//                 message.success('启动成功！');
//                 store.dispatch(postTaskListHushiData(creds));

//             } else {
//                 message.error(json.reason.text);
//             }
//         }).catch((e) => {
//         });
//         ;
//     }
// }
// // 关闭
// export function closeTaskHushiData(creds, params) {
//     let path = "/data/savecodeall"
//     return dispatch => {
//         post(api + path, creds).then((json) => {
//             if (json.reason === null) {
//                 let creds = params
//                 message.success('关闭成功！');
//                 store.dispatch(postTaskListHushiData(creds));

//             } else {
//                 message.error(json.reason.text);
//             }
//         }).catch((e) => {
//         });
//         ;
//     }
// }
// 查询未管控作为盘查对象字典项  添加时可使用
export function postWeiguankongData(creds) {
    let path = '/data/getControlPersonList';
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch({ type: 'Task_weiguankongHushi-data', data: json });
        }).catch((e) => {
            dispatch({ type: 'Task_weiguankongHushi-error', message: e.toString() })
        });
    }
}

// 编辑查看时盘查对象字典项
export function postPersonListForTaskData(creds) {
    let path = '/data/getControlPersonListForTaskPersonal';
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch({ type: 'Task_PersonListForTaskHushi-data', data: json });
        }).catch((e) => {
            dispatch({ type: 'Task_PersonListForTaskHushi-error', message: e.toString() })
        });
    }
}

