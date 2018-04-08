/**
 * 设置盘查管理-洛阳
 */
import * as InventoryManagementAction from "../actions/InventoryManagement";
import {lyInitialStateReturn} from "./initialState"
import {
    INVENTORYMANAGEMENT_MENU__CHANGE_CURRENT,
    INVENTORYMANAGEMENT_MENU_INIT,
    INVENTORY_MENU_KKPC_CHAGE,
    INVENTORY_MENU_LDPC_CHAGE
} from "../actions/actions";
import {store} from '../index.js';
const initialState = { //盘查管理
    success: true,
    data: {
        personnelInventoryList: {
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                total: 0,
                list: [{}],
            },
            isFetching: false

        },
        CarInventoryList: {
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                total: 0,
                list: [{
                    "id": "2132313123",
                    "checktime": "2017-06-12 08:45:12",
                    "police_name": "张三",
                    "police_idcard": "1232331321321321",
                    "police_code": "230001",
                    "police_area": "地区",
                    "police_unitcode": "单位",
                    "imei": "设备码",
                    "cid": "设备码",
                    "type": "盘查类型",
                    "idcard": "被盘查人身份号",
                    "zpurl": "http://iliulei.com/wp-content/uploads/2017/07/23212619910902101920170331160353486.png",
                    "sex": "性别",
                    "nation": "民族",
                    "address": "现住址",
                    "birth": "2017-07-28",
                    "idcard_issuing_authority": "身份证颁发机构",
                    "idcard_expiry_date": "身份证有效期",
                    "id_card_photo_path": "身份证照片地址",
                    "name": "zhangsan",
                    "phoneNumber": '131111111111',
                    "tags": "重点人员, 在逃人员, 其他"
                }],
            },
            isFetching: false
        },
        CumtomerpersonnelList: {
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                total: 0,
                list: [{
                }],
            }

        },
        CumtomerCarList: {
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                total: 0,
                list: [{
                }],
            }
        },
        relevancePersonList: {//关联人员
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                total: 0,
                list: [],
            }
        },
        relevanceCarList: {//关联车辆
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
                menuName: '巡逻盘查',
                isOpen: true,
                search: 'type=ldpc',
                haveSon: true,
                isSelect: false,
                sonMenu: [
                    {
                        id: '101001',
                        menuName: '人员盘查',
                        isOpen: false,
                        search: 'type=all',
                        haveSon: false,
                        isSelect: true
                    },
                    {
                        id: '101002',
                        menuName: '车辆盘查',
                        isOpen: false,
                        search: 'type=gzry',
                        haveSon: false,
                        isSelect: false
                    }
                ]
            }, {
                id: '102',
                menuName: '卡点盘查',
                isOpen: false,
                search: 'type=ldpc',
                haveSon: true,
                isSelect: false,
                sonMenu: [
                    {
                        id: '102001',
                        menuName: '人员盘查',
                        isOpen: false,
                        search: 'type=all',
                        haveSon: false,
                        isSelect: false
                    },
                    {
                        id: '102002',
                        menuName: '车辆盘查',
                        isOpen: false,
                        search: 'type=gzry',
                        haveSon: false,
                        isSelect: false
                    }
                ]
            }

        ]
    }
}

const fetchInventoryManagementUsers = (state=initialState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case 'REQUEST_PERSONNEL_INVENTORY':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        //请求成功，调用这个数据
        case InventoryManagementAction.PERSONNELINVENTORY_DATA: //人员盘查
            newState.data.personnelInventoryList.result.list = action.data.result.list;
            newState.data.personnelInventoryList.result.total = action.data.result.page.totalResult;
            newState.isFetching = false;
            return newState;
        case 'REQUEST_CAR_INVENTORY':
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case InventoryManagementAction.CARINVENTORY_DATA: //车辆盘查
            newState.data.CarInventoryList.result.list = action.data.result.list;//等号右侧的是接口的格式
            newState.data.CarInventoryList.result.total = action.data.result.page.totalResult;
            newState.isFetching = false;
            return newState;
        case InventoryManagementAction.BAYONETINVENTORY_DATA: //卡口盘查
            newState.data.BayonetInventoryList.result.list = action.data.result.list;
            newState.data.BayonetInventoryList.result.total = action.data.result.total;
            return newState;
//卡口管理
        //人盘查
        case InventoryManagementAction.CUMTOMERPERSONNEL_DATA: //人员盘查
            newState.data.CumtomerpersonnelList.result.list = action.data.result.list;
            newState.data.CumtomerpersonnelList.result.total = action.data.result.page.totalResult;
            return newState;
        case InventoryManagementAction.CUMTOMERCAR_DATA: //车辆盘查
            newState.data.CumtomerCarList.result.list = action.data.result.list;//等号右侧的是接口的格式
            newState.data.CumtomerCarList.result.total = action.data.result.page.totalResult;
            return newState;


        case INVENTORYMANAGEMENT_MENU_INIT://初始化菜单
            for (let x in newState.uiData.menus) {
                newState.uiData.menus[x].isSelect = false;
                if (newState.uiData.menus[x].haveSon === true) {
                    let haveSonmenus = newState.uiData.menus[x];
                    for (let x in haveSonmenus.sonMenu) {
                        haveSonmenus.sonMenu[x].isSelect = false;
                    }
                }
            }
            newState.uiData.menus[0].isSelect = false;
            newState.uiData.menus[0].isOpen = true;
            newState.uiData.menus[0].sonMenu[0].isSelect = true;
            return newState;

        case INVENTORY_MENU_LDPC_CHAGE: //巡逻盘查二级菜打开关闭
            if (newState.uiData.menus[0].isOpen === true) {
                newState.uiData.menus[0].isOpen = false;
            } else {
                newState.uiData.menus[0].isOpen = true;
            }
            return newState;
        case    INVENTORY_MENU_KKPC_CHAGE://卡口盘查二级菜打开关闭
            if (newState.uiData.menus[1].isOpen === true) {
                newState.uiData.menus[1].isOpen = false;
            } else {
                newState.uiData.menus[1].isOpen = true;
            }
            return newState;

        case INVENTORYMANAGEMENT_MENU__CHANGE_CURRENT:
            //遍历一级目录
            for (let x in newState.uiData.menus) {
                if (action.menu.id == newState.uiData.menus[x].id) { //根据ID相等判断，是否选中
                    newState.uiData.menus[x].isSelect = true;
                } else {
                    newState.uiData.menus[x].isSelect = false;
                }
                //遍历子目录
                for (let i in  newState.uiData.menus[x].sonMenu) {
                    if (action.menu.id == newState.uiData.menus[x].sonMenu[i].id) {
                        newState.uiData.menus[x].sonMenu[i].isSelect = true;
                    } else {
                        newState.uiData.menus[x].sonMenu[i].isSelect = false;
                    }
                }
            }
            return newState;

        case 'REQUEST_CAR_PERSON': //车关联人调用中
            return {
                ...state,//原状态
                isLoadinging: true,
                didInvalidate: false
            }
        case 'RelevancePerson-data': //关联人员
            newState.data.relevancePersonList.result.list = action.data.result.list;
            newState.data.relevancePersonList.result.total = action.data.result.page.totalResult;
            newState.isLoadinging = false;
            return newState;
        case 'REQUEST_PERSONNEL_CAR'://人关联车调用中
            return {
                ...state,//原状态
                isLoadinging: true,
                didInvalidate: false
            }
        case 'RelevanceCar-data': //关联车辆
            newState.data.relevanceCarList.result.list = action.data.result.list;
            newState.data.relevanceCarList.result.total = action.data.result.page.totalResult;
            newState.isLoadinging = false;
            return newState;
        default:
            if(store !== undefined){
                return store.getState().InventoryManagement;
            }else{
                return state;
            }
    }
}

module.exports = {fetchInventoryManagementUsers}