/**
 * 片区管理
 */
import * as AreaManagementAction from "../actions/AreaManagement";
import {AREAMANAGEMENT_MENU_INIT} from "../actions/actions";
import {store} from '../index.js';
import {filterMenu} from '../utils/index';
const initialState = {
    success: true,
    data: {
        customsPassList: {
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
                menuName: '片区管理',
                isOpen: false,
                search: 'type=pqgl',
                haveSon: false,
                isSelect: true,
            }

        ]
    }

}

const AreaManagement =(state = initialState, action)=>{
    let newState = Object.assign({}, state);
    switch (action.type) {
        case 'AREA_MANAGAMENT':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case AREAMANAGEMENT_MENU_INIT://初始化菜单
            for (let x in newState.uiData.menus) {
            newState.uiData.menus[x].isSelect = false;
        }
            newState.uiData.menus[0].isSelect = true;
            return newState;
        default:
            if(store !== undefined){
                return store.getState().AreaManagement;
            }else{
                return state;
            }
    }
}
module.exports = {AreaManagement}