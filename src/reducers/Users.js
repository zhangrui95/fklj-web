// users
import {DYNAMICCONTROL_MENU_INIT,USERS_ERROR,USERS_TIMEOUT,USERS_DATA,DTGK_MENU_LDRY_CHAGE,DTGK_MENU_ZDGZ_CHAGE,DTGK_MENU_ALL_CHANGE,DTGK_MENU_CHANGE_CURRENT,
    NAVIGATION_CHANGE,SHADE_CHANGE,AREA_CITY_DATA,AREA_PROVINCE_DATA,AREA_CITY_ERROR,AREA_PROVINCE_ERROR,TERROR_TYPE_DATA,JUDGMENT_LEVEL_DATA,DISPOSITIONL_DATA,
    POLICE_UNITS_DATA,PERSON_TAGS_DATA,CAR_TAGS_DATA} from "../actions/actions";
import * as Home from "../actions/Home";
import {store} from '../index.js';
import {isAllowMenu} from '../utils/index';

const initialState = {
        success: true,
        data: {
            users: {
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
                    menuName: '全部',
                    isOpen: false,
                    search: 'type=all',
                    haveSon: false,
                    isSelect: true,
                    isShow: true,
                    code:'dtgk_qb_page',
                },
                {
                    id: '102',
                    menuName: '关注人员',
                    isOpen: false,
                    search: 'type=gzry',
                    haveSon: true,
                    isSelect: false,
                    code:'dtgk_gzry_page',
                    isShow: false,
                    sonMenu: [
                        {
                            id: '1021',
                            menuName: '盘查异常',
                            search: 'type=gzry&state=1',
                            isSelect: false,
                            isShow: true
                        },
                        {
                            id: '1022',
                            menuName: '重点人员',
                            search: 'type=gzry&state=2',
                            isSelect: false,
                            isShow: true
                        },
                        {
                            id: '1023',
                            menuName: '临控对象',
                            search: 'type=gzry&state=3',
                            isSelect: false,
                            isShow: true
                        },
                        {
                            id: '1024',
                            menuName: '在侦在控',
                            search: 'type=gzry&state=4',
                            isSelect: false,
                            isShow: true
                        }
                    ]
                },
                {
                    id: '103',
                    menuName: '流动人员',
                    isOpen: false,
                    search: 'type=ldry',
                    haveSon: true,
                    isSelect: false,
                    code:'dtgk_ldry_page',
                    isShow: false,
                    sonMenu: [
                        {
                            id: '1031',
                            menuName: '未落地人员',
                            search: 'type=ldry&state=1',
                            isSelect: false,
                            isShow: true
                        },
                        {
                            id: '1032',
                            menuName: '流入人员',
                            search: 'type=ldry&state=2',
                            isSelect: false,
                            isShow: true
                        },
                        {
                            id: '1033',
                            menuName: '流出人员',
                            search: 'type=ldry&state=3',
                            isSelect: false,
                            isShow: true
                        },
                        {
                            id: '1034',
                            menuName: '失踪人员',
                            search: 'type=ldry&state=4',
                            isSelect: false,
                            isShow: true
                        }
                    ]
                }
            ]
        }
    }

const DynamicControl = (state=initialState, action) => {
    let newState = Object.assign({}, state);

    switch(action.type){
        case 'REQUEST_USERLIST_DYNAMIC':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case 'recv-users-data-test':
             newState.data.users.result.list = action.data.result.list;
            newState.data.users.result.total = action.data.result.page.totalResult;
             newState.isFetching = false;
           // return Object.assign({}, state, {data:{users:action.data.data.users,count:action.data.data.count}, success: false});
            return newState;
        case USERS_ERROR:

            return Object.assign({}, state, {error: action.message});
        case USERS_TIMEOUT:
        return;

        case DTGK_MENU_LDRY_CHAGE:
            if(newState.uiData.menus[2].isOpen===true){
                newState.uiData.menus[2].isOpen=false;
            }else{
                newState.uiData.menus[2].isOpen=true;
            }
            return newState;
        case DTGK_MENU_ZDGZ_CHAGE:
            if(newState.uiData.menus[1].isOpen===true){
                newState.uiData.menus[1].isOpen=false;
            }else{
                newState.uiData.menus[1].isOpen=true;
            }
            console.log(newState.uiData.menus)
            return newState;
        case DTGK_MENU_ALL_CHANGE:
            if(newState.uiData.menus[0].isOpen===true){
                newState.uiData.menus[0].isOpen=false;
            }else{
                newState.uiData.menus[0].isOpen=true;
            }
            return newState;
        case DTGK_MENU_CHANGE_CURRENT:
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
        case DYNAMICCONTROL_MENU_INIT:  //动态管控菜单初始化

            for(let x in newState.uiData.menus){
                newState.uiData.menus[x].isSelect=false;
                newState.uiData.menus[x].isOpen=false;
                //遍历子目录
                for(let i in  newState.uiData.menus[x].sonMenu){
                    newState.uiData.menus[x].sonMenu[i].isSelect=false;
                }
            }
            newState.uiData.menus[0].isSelect=true;

            return newState;
        default:
            if(store !== undefined ){
                return store.getState().DynamicControl;
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

module.exports = {DynamicControl}