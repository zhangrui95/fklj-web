/**
 * 任务管理-洛阳
 */
import { lyInitialStateReturn } from "./initialState"
import { TASK_MENU__CHANGE_CURRENT, TASKMANAGEMENT_MENU_INIT, TASK_MENU__CHANGE_PUTONG, TASK_MENU__CHANGE_KADIAN } from "../actions/actions";
import { store } from '../index.js';
import { filterMenu } from '../utils/index';

const initialState = {
    success: true,
    data: {
        taskList: {
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                total: 0,
                list: [],
            }
        },
        // 呼市反恐利剑
        taskListHushi: {//获取任务列表
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                page: {},
                list: [],
            }
        },
        childrentaskListHushi: {//获取子任务列表
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                page: {},
                list: [],
            },
            childrenIsFetching: true
        },
        childrentaskListHushiById: {//子任务列表详情
            reason: {
                "code": "",
                "text": ""
            },
            result: {

            }
        },
        threetaskListHushi: {//待办 超期 已完成 列表
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                page: {},
                list: [],
            }
        },
        taskListHushiById: {//根据id获取任务模板信息
            reason: {
                "code": "",
                "text": ""
            },
            result: {

            }
        },
        threetaskListHushiById: {//根据待办 超期 已完成id获取 信息
            reason: {
                "code": "",
                "text": ""
            },
            result: {

            }
        },
        weiguankongList: {//查询未管控作为盘查对象
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list: [],
            }
        },
        personListForTask: {//编辑查看时 返回的盘查人员
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list: [],
            }
        },
        CardPointtaskWithListHushiList: {//卡点任务 待办任务 已办任务
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                page: {},
                list: []
            }
        },
        CardPointtaskWithListHushiById: {//卡点任务 待办任务 已办任务 根据id回显
            reason: {
                "code": "",
                "text": ""
            },
            result: {
            }
        },

    },
    uiData: {
        menus: [
            {
                id: '10',
                menuName: '普通任务',
                isOpen: true,
                search: 'type=rwgl',
                haveSon: true,
                isSelect: false,
                isShow: true,
                code: "jyydpt_rwgl_ptrw",
                sonMenu: [
                    {
                        id: '102',
                        menuName: '任务设置',
                        search: 'type=rwgl',
                        haveSon: false,
                        isSelect: true,
                        isShow: true,
                        code: "jyydpt_rwgl_xlrw",
                    },
                    {
                        id: '101',
                        menuName: '待办任务',
                        search: 'type=rwgl',
                        haveSon: false,
                        isSelect: false,
                        isShow: true,
                        code: "jyydpt_rwgl_kdrw",
                    },
                    {
                        id: '103',
                        menuName: '已办任务',
                        search: 'type=rwgl',
                        haveSon: false,
                        isSelect: false,
                        isShow: true,
                        code: "",
                    },
                    {
                        id: '104',
                        menuName: '超期任务',
                        search: 'type=rwgl',
                        haveSon: false,
                        isSelect: false,
                        isShow: true,
                        code: "",
                    }
                ]
            },
            {
                id: '11',
                menuName: '卡点任务',
                isOpen: false,
                search: 'type=rwgl',
                haveSon: true,
                isSelect: false,
                isShow: true,
                code: "jyydpt_rwgl_kdrw",
                sonMenu: [
                    {
                        id: '111',
                        menuName: '待办任务',
                        search: 'type=rwgl',
                        haveSon: false,
                        isSelect: false,
                        isShow: true,
                        code: "jyydpt_rwgl_kd_kdrw",
                    },
                    {
                        id: '112',
                        menuName: '已办任务',
                        search: 'type=rwgl',
                        haveSon: false,
                        isSelect: false,
                        isShow: true,
                        code: "jyydpt_rwgl_kd_ybrw",
                    },

                ]
            },
        ]
    }

}


const TaskManagement = (state = initialState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case 'REQUEST_TASK_MANAGEMENT':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case 'TaskManagement-data': //任务
            newState.data.taskList.result.list = action.data.result.list;
            newState.data.taskList.result.total = action.data.result.page.totalResult;//page?reason
            newState.isFetching = false;
            return newState;
        case 'Task-Tree-data': //根据任务ID获取树
            newState.data.task = action.data.result;//page?
            return newState;

        case TASKMANAGEMENT_MENU_INIT://初始化菜单
            for (let x in newState.uiData.menus) {
                newState.uiData.menus[x].isSelect = false;
                for (let i in newState.uiData.menus[x].sonMenu) {
                    newState.uiData.menus[x].sonMenu[i].isSelect = false;
                }
            }
            newState.uiData.menus[0].isOpen = true;
            newState.uiData.menus[1].isOpen = false;
            newState.uiData.menus[0].sonMenu[0].isSelect = true;
            return newState;
        case TASK_MENU__CHANGE_PUTONG:
            if (newState.uiData.menus[0].isOpen === true) {
                newState.uiData.menus[0].isOpen = false;
            } else {
                newState.uiData.menus[0].isOpen = true;
            }
            return newState;
        case TASK_MENU__CHANGE_KADIAN:
            if (newState.uiData.menus[1].isOpen === true) {
                newState.uiData.menus[1].isOpen = false;
            } else {
                newState.uiData.menus[1].isOpen = true;
            }
            return newState;
        case TASK_MENU__CHANGE_CURRENT:
            //遍历一级目录
            for (let x in newState.uiData.menus) {
                if (action.menu.id == newState.uiData.menus[x].id) { //根据ID相等判断，是否选中
                    newState.uiData.menus[x].isSelect = true;
                } else {
                    newState.uiData.menus[x].isSelect = false;
                }
                //遍历子目录
                for (let i in newState.uiData.menus[x].sonMenu) {
                    if (action.menu.id == newState.uiData.menus[x].sonMenu[i].id) {
                        newState.uiData.menus[x].sonMenu[i].isSelect = true;
                    } else {
                        newState.uiData.menus[x].sonMenu[i].isSelect = false;
                    }

                }
            }
            return newState;


        // 呼市反恐利剑
        case 'REQUEST_TASK_LIST_HUSHI_DATA':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case 'TaskListHushi-data': //任务列表
            newState.data.taskListHushi.result.list = action.data.result.list;
            newState.data.taskListHushi.result.page = action.data.result.page;//page?reason
            newState.isFetching = false;
            return newState;
        case 'REQUEST_CHILDREN_TASK_LIST_HUSHI_DATA'://子任务列表
            newState.data.childrentaskListHushi.childrenIsFetching = true;
            return newState;
        case 'Children_TaskListHushi-data': //子任务列表
            newState.data.childrentaskListHushi.result.list = action.data.result.pdList;
            newState.data.childrentaskListHushi.result.page = action.data.result.page;//page?reason
            newState.data.childrentaskListHushi.childrenIsFetching = false;
            return newState;
        case 'Children_TaskListHushi-data-byid'://子任务列表详情
            newState.data.childrentaskListHushiById.result = action.data.result.data;
            // newState.isFetching = false;
            return newState;
        case 'REQUEST_THREE_TASK_LIST_HUSHI_DATA'://待办 超期 已完成
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case 'Three_TaskListHushi-data':
            newState.data.threetaskListHushi.result.list = action.data.result.list;
            newState.data.threetaskListHushi.result.page = action.data.result.page;//page?reason
            newState.isFetching = false;
            return newState;
        // case 'REQUEST_TASK_LIST_HUSHI_BYID_DATA'://根据id获取任务模板信息
        //     return {
        //         ...state,//原状态
        //         isFetching: true,
        //         didInvalidate: false
        //     }
        case 'TaskListHushi-data-byid':
            newState.data.taskListHushiById.result = action.data.result.data;
            // newState.isFetching = false;
            return newState;
        // case 'REQUEST_THREE_TASK_LIST_HUSHI_BYID_DATA'://根据待办 超期 已完成id获取信息
        //     return {
        //         ...state,//原状态
        //         isFetching: true,
        //         didInvalidate: false
        //     }
        case 'Three_TaskListHushi-data-byid':
            newState.data.threetaskListHushiById.result = action.data.result.data;
            // newState.isFetching = false;
            return newState;
        case 'Task_weiguankongHushi-data'://查询未管控人员作为盘查对象 在添加任务时
            newState.data.weiguankongList.result.list = action.data.result.list;
            return newState;
        case 'Task_PersonListForTaskHushi-data'://编辑查看时 盘查对象项
            newState.data.personListForTask.result.list = action.data.result.list;
            return newState;
        case 'REQUEST_CARDPOINT_TASK_LIST_HUSHI_DATA'://卡点任务 查询列表
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case 'CardPoint_TaskListHushi-data'://卡点任务 查询列表
            newState.data.CardPointtaskWithListHushiList.result.list = action.data.result.list;
            newState.data.CardPointtaskWithListHushiList.result.page = action.data.result.page;//page?reason
            newState.isFetching = false;
            return newState;
        case 'CardPoint_TaskListHushi_Byid-data'://卡点任务 根据id回显
            newState.data.CardPointtaskWithListHushiById.result = action.data.result.data;
            return newState;

        default:
            if (store !== undefined) {
                return store.getState().TaskManagement;
            } else {
                if (sessionStorage.getItem('allowMenus') !== undefined && sessionStorage.getItem('allowMenus') !== null && sessionStorage.getItem('allowMenus') !== '') {
                    let menus = state.uiData.menus;
                    menus = filterMenu(menus);//权限判断菜单
                    state.uiData.menus = menus;
                }
                return state;
            }
    }
}
module.exports = { TaskManagement }