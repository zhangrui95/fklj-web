/**
 * 设置盘查管理-洛阳
 */
import * as InventoryManagementAction from "../actions/InventoryManagement";
import { lyInitialStateReturn } from "./initialState"
import {
    NVENTORYMANAGEMENT_MENU_HUSHI_INIT,
    INVENTORYMANAGEMENT_HUSHI_ZQRW,
    INVENTORYMANAGEMENT_HUSHI_OLDZQRW,
    INVENTORYMANAGEMENT_HUSHI_CURRENT,
} from "../actions/actions";
import { store } from '../index.js';
import { filterMenu } from '../utils/index';

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
                list: [],
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
                list: [
                    //     {
                    //     "id": "2132313123",
                    //     "checktime": "2017-06-12 08:45:12",
                    //     "police_name": "张三",
                    //     "police_idcard": "1232331321321321",
                    //     "police_code": "230001",
                    //     "police_area": "地区",
                    //     "police_unitcode": "单位",
                    //     "imei": "设备码",
                    //     "cid": "设备码",
                    //     "type": "盘查类型",
                    //     "idcard": "被盘查人身份号",
                    //     "zpurl": "http://iliulei.com/wp-content/uploads/2017/07/23212619910902101920170331160353486.png",
                    //     "sex": "性别",
                    //     "nation": "民族",
                    //     "address": "现住址",
                    //     "birth": "2017-07-28",
                    //     "idcard_issuing_authority": "身份证颁发机构",
                    //     "idcard_expiry_date": "身份证有效期",
                    //     "id_card_photo_path": "身份证照片地址",
                    //     "name": "zhangsan",
                    //     "phoneNumber": '131111111111',
                    //     "tags": "重点人员, 在逃人员, 其他"
                    // }
                ],
            },
            isFetching: false
        },
        personnelInventoryPointList: {//卡点-人员盘查
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                total: 0,
                list: [],
            },
            isFetching: false

        },
        carInventoryPointList: {//卡点-车辆盘查
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                total: 0,
                list: [],
            },
            isFetching: false
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
                page: 0,
                list: [],
            }
        },
        // 呼市反恐
        invenListHushi: {//盘查列表展示 按天
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                page: {},
                list: [],
            },
            isFetching: true
        },
        invenListHushiDetails: {//盘查详情
            reason: {
                "code": "",
                "text": ""
            },
            result: {
            }
        },
        // 呼市反恐 旧版反恐
        oldinvenListHushi: {//盘查列表展示
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                page: {},
                list: [],
            },
            isFetching: true
        },
        oldinvenListHushiDetails: {//盘查详情
            reason: {
                "code": "",
                "text": ""
            },
            result: {
            }
        },
        oldinvenLuoku: {//原版反恐利剑 数据落库  点击详情的时候展示
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
                id: '101',
                menuName: '周期任务',
                isOpen: true,
                search: 'type=pcgl',
                haveSon: true,
                isSelect: false,
                isShow: false,
                code: "",
                sonMenu: [
                    {
                        id: '1001',
                        menuName: '按天',
                        search: 'type=zqrw&state=1',
                        isSelect: true,
                        isShow: true,
                        code: ""
                    },
                    {
                        id: '1002',
                        menuName: '按周',
                        search: 'type=zqrw&state=2',
                        isSelect: false,
                        isShow: true,
                        code: ""
                    }
                ]
            },
            {
                id: '102',
                menuName: '其他',
                isOpen: false,
                search: 'type=pcgl',
                haveSon: false,
                isSelect: false,
                isShow: false,
                code: "",
                // sonMenu: [
                //     {
                //         id: '1021',
                //         menuName: '旧版按天',
                //         search: 'type=zqrw&state=1',
                //         isSelect: false,
                //         isShow: true,
                //         code: ""
                //     },
                // ]
            }
        ]
    }
}


const InventoryManagement = (state = initialState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case 'REQUEST_PERSONNEL_INVENTORY':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        //         //请求成功，调用这个数据
        //         case InventoryManagementAction.PERSONNELINVENTORY_DATA: //人员盘查
        //             newState.data.personnelInventoryList.result.list = action.data.result.list;
        //             newState.data.personnelInventoryList.result.total = action.data.result.page.totalResult;
        //             newState.isFetching = false;
        //             return newState;
        //         case 'REQUEST_CAR_INVENTORY':
        //             return {
        //                 ...state,
        //                 isFetching: true,
        //                 didInvalidate: false
        //             }
        //         case InventoryManagementAction.CARINVENTORY_DATA: //车辆盘查
        //             newState.data.CarInventoryList.result.list = action.data.result.list;//等号右侧的是接口的格式
        //             newState.data.CarInventoryList.result.total = action.data.result.page.totalResult;
        //             newState.isFetching = false;
        //             return newState;
        //         case InventoryManagementAction.BAYONETINVENTORY_DATA: //卡口盘查
        //             newState.data.BayonetInventoryList.result.list = action.data.result.list;
        //             newState.data.BayonetInventoryList.result.total = action.data.result.total;
        //             return newState;
        // //卡口管理
        //         //人盘查 REQUEST_PERSON_INVENTORY_POINT
        //         case 'REQUEST_PERSON_INVENTORY_POINT':
        //             return {
        //                 ...state,//原状态
        //                 isFetching: true,
        //                 didInvalidate: false
        //             }
        //         case InventoryManagementAction.PERSONNELINVENTORYPOIT_DATA: //人员盘查
        //             newState.data.personnelInventoryPointList.result.list = action.data.result.list;
        //             newState.data.personnelInventoryPointList.result.total = action.data.result.page.totalResult;
        //             newState.isFetching = false;
        //             return newState;
        //         case 'REQUEST_CAR_INVENTORY_POINT':
        //             return {
        //                 ...state,//原状态
        //                 isFetching: true,
        //                 didInvalidate: false
        //             }
        //         case InventoryManagementAction.CARINVENTORYPOINT_DATA: //车辆盘查
        //             newState.data.carInventoryPointList.result.list = action.data.result.list;//等号右侧的是接口的格式
        //             newState.data.carInventoryPointList.result.total = action.data.result.page.totalResult;
        //             newState.isFetching = false;
        //             return newState;
        //

        case NVENTORYMANAGEMENT_MENU_HUSHI_INIT://初始化菜单
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
        case INVENTORYMANAGEMENT_HUSHI_ZQRW: //呼市-周期任务
            if (newState.uiData.menus[0].isOpen === true) {
                newState.uiData.menus[0].isOpen = false;
            } else {
                newState.uiData.menus[0].isOpen = true;
            }
            return newState;
        case INVENTORYMANAGEMENT_HUSHI_OLDZQRW: //呼市-旧版周期任务
            if (newState.uiData.menus[1].isOpen === true) {
                newState.uiData.menus[1].isOpen = false;
            } else {
                newState.uiData.menus[1].isOpen = true;
            }
            return newState;
        case INVENTORYMANAGEMENT_HUSHI_CURRENT:
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
        case 'REQUEST_INVENTORY_LIST_HUSHI_DATA':
            // return {
            //     ...state,//原状态
            //     isFetching: true,
            //     didInvalidate: false
            // }
            newState.data.invenListHushi.isFetching = true;
            return newState;
        case 'InventoryListHushi-data': //列表
            newState.data.invenListHushi.result.list = action.data.result.list;
            newState.data.invenListHushi.result.page = action.data.result.page;//page?reason
            newState.data.invenListHushi.isFetching = false;
            return newState;
        case 'InventoryListHushiDetails-data': //详情
            newState.data.invenListHushiDetails.result = action.data.result.data;
            return newState;
        //旧版
        case 'REQUEST_OLD_INVENTORY_LIST_HUSHI_DATA':
            // return {
            //     ...state,//原状态
            //     isFetching: true,
            //     didInvalidate: false
            // }
            newState.data.oldinvenListHushi.isFetching = true;
            return newState;
        case 'old_InventoryListHushi-data': //列表 旧版反恐
            newState.data.oldinvenListHushi.result.list = action.data.result.list;
            newState.data.oldinvenListHushi.result.page = action.data.result.page;//page?reason
            newState.data.oldinvenListHushi.isFetching = false;
            return newState;
        case 'old_InventoryListHushiDetails-data': //详情
            newState.data.oldinvenListHushiDetails.result = action.data.result.data;
            return newState;
        case 'old_InventoryLuoku-data': //原版反恐利剑 数据落库 点击详情时展示
            newState.data.oldinvenLuoku.result = action.data.result.data; 
            return newState;
        default:
            if (store !== undefined) {
                return store.getState().InventoryManagement;
            } else {
                if (sessionStorage.getItem('allowMenus') !== undefined && sessionStorage.getItem('allowMenus') !== null && sessionStorage.getItem('allowMenus') !== '') {
                    //盘查管理菜单
                    let inventoryManagementMenus = state.uiData.menus;
                    console.log('inventoryManagementMenus', inventoryManagementMenus);
                    inventoryManagementMenus = filterMenu(inventoryManagementMenus);//权限判断菜单
                    state.uiData.menus = inventoryManagementMenus;
                }
                return state;
            }
    }
}
module.exports = { InventoryManagement }