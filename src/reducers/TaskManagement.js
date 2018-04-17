/**
 * 任务管理-洛阳
 */
import {lyInitialStateReturn} from "./initialState"
import {TASK_MENU__CHANGE_CURRENT, TASKMANAGEMENT_MENU_INIT,} from "../actions/actions";
import {store} from '../index.js';
import {filterMenu} from '../utils/index';

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
        }
    },
    uiData: {
        menus: [
            {
                id: '102',
                menuName: '巡逻任务',
                isOpen: false,
                search: 'type=rwgl',
                haveSon: false,
                isSelect: true,
                code: "jyydpt_rwgl_xlrw",
            },
            {
                id: '101',
                menuName: '卡点任务',
                isOpen: false,
                search: 'type=rwgl',
                haveSon: false,
                isSelect: false,
                code: "jyydpt_rwgl_kdrw",
            }
        ]
    }

}


const TaskManagement =(state = initialState, action) =>{
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
            }
            newState.uiData.menus[0].isSelect = true;
            return newState;
        case TASK_MENU__CHANGE_CURRENT:
            //遍历一级目录
            for (let x in newState.uiData.menus) {
                if (action.menu.id == newState.uiData.menus[x].id) { //根据ID相等判断，是否选中
                    newState.uiData.menus[x].isSelect = true;
                } else {
                    newState.uiData.menus[x].isSelect = false;
                }
            }
            return newState;
        
        default:
            if(store !== undefined){
                return store.getState().TaskManagement;
            }else{
                if(sessionStorage.getItem('allowMenus')!== undefined && sessionStorage.getItem('allowMenus')!== null && sessionStorage.getItem('allowMenus')!== ''){
                    let menus = state.uiData.menus;
                    menus = filterMenu(menus);//权限判断菜单
                    state.uiData.menus = menus;
                }
                return state;
            }
    }
}
module.exports = {TaskManagement}