/**
 * 设置卡口管理-洛阳
 */
import * as CustomsPassManagementAction from "../actions/CustomsPassManagement";
import {lyInitialStateReturn} from "./initialState"
import {CUSTOMERMANAGEMENT_MENU__CHANGE_CURRENT,CUSTOMMANAGEMENT_MENU_INIT,} from "../actions/actions";
import {store} from '../index.js';
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
                menuName: '卡点管理',
                isOpen: false,
                search: 'type=ryxx',
                haveSon: false,
                isSelect: true,
            }

        ]
    }

}

const fetchCustomsPass = (state = initialState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case 'REQUEST_CARD_POINT':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
         case 'CardPoint-data': //卡点管理
            newState.data.customsPassList.result.list = action.data.result.list;
            newState.data.customsPassList.result.total = action.data.result.page.totalResult;//page?
            newState.isFetching = false;
            return newState;

        case CUSTOMMANAGEMENT_MENU_INIT://初始化菜单
            for (let x in newState.uiData.menus) {
                newState.uiData.menus[x].isSelect = false;
            }
            newState.uiData.menus[0].isSelect = true;
            return newState;
        case CUSTOMERMANAGEMENT_MENU__CHANGE_CURRENT:
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
                return store.getState().CustomsPassManagement;
            }else{
                return state;
            }
    }
}

module.exports = {fetchCustomsPass}