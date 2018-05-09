/**
 * 系统设置-呼市
 */
import {lyInitialStateReturn} from "./initialState"
import {SYSTEM_SETUP_CURRENT, SYSREMSETUP_MENU_INIT, SYSTEMSETUP_ADD} from "../actions/actions";
import {store} from '../index.js';
import {isAllowMenu} from '../utils/index';

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
                id: '101',
                menuName: '失控时间设置',
                haveSon: false,
                isOpen: true,
                search: 'type=rwgl',
                isSelect: true,
                code: "",
                isShow: true,
                // sonMenu: [
                //     {
                //         id: '1001',
                //         menuName: '添加到任务',
                //         search: 'type=gzry&state=1',
                //         isSelect: true,
                //         isShow: true,
                //         code: ""
                //     },
                //     {
                //         id: '1002',
                //         menuName: '选择责任单位',
                //         search: 'type=gzry&state=2',
                //         isSelect: false,
                //         isShow: true,
                //         code: ""
                //     }
                // ]
            }
        ]
    }

}


const SystemSetup =(state = initialState, action) =>{
    let newState = Object.assign({}, state);
    switch (action.type) {
        case 'REQUEST_TASK_MANAGEMENT':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case 'SystemSetup-data': //任务
            newState.data.taskList.result.list = action.data.result.list;
            newState.data.taskList.result.total = action.data.result.page.totalResult;//page?reason
            newState.isFetching = false;
            return newState;
        case 'Task-Tree-data': //根据任务ID获取树
            newState.data.task = action.data.result;//page?
            return newState;

        case SYSREMSETUP_MENU_INIT://初始化菜单
            for (let x in newState.uiData.menus) {
                newState.uiData.menus[x].isSelect = false;
                for(let i in  newState.uiData.menus[x].sonMenu){
                    newState.uiData.menus[x].sonMenu[i].isSelect = false;
                }
            }
            newState.uiData.menus[0].isSelect = true;
            return newState;
        case SYSTEMSETUP_ADD:
            if(newState.uiData.menus[0].isOpen===true){
                newState.uiData.menus[0].isOpen=false;
            }else{
                newState.uiData.menus[0].isOpen=true;
            }
            return newState;
        case SYSTEM_SETUP_CURRENT:
            //遍历一级目录
            for(let x in newState.uiData.menus){
                if(action.menu.id==newState.uiData.menus[x].id){ //根据ID相等判断，是否选中
                    newState.uiData.menus[x].isSelect=true;
                }else{
                    newState.uiData.menus[x].isSelect=false;
                }
                //遍历子目录
                for(let i in  newState.uiData.menus[x].sonMenu){
                    if(action.menu.id==newState.uiData.menus[x].sonMenu[i].id){
                        newState.uiData.menus[x].sonMenu[i].isSelect=true;
                    }else{
                        newState.uiData.menus[x].sonMenu[i].isSelect=false;
                    }
                }
            }
            return newState;
        default:
            if(store !== undefined ){
                return store.getState().SystemSetup;
            }else{
                if(sessionStorage.getItem('user')!== null && sessionStorage.getItem('id_token')!== null ){
                    let menus = state.uiData.menus;
                    isAllowMenu(menus);
                    // state.uiData.menus = menus;
                }
                return state;
            }
    }
}
module.exports = {SystemSetup}