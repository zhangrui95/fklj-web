import {PERSONALCENTER_MENU_INIT,PERSONALCENTER_MENU_CHANGE_CURRENT,ACT_ADD, ACT_CHANGE_TEXT, ACT_DEC, RECV_DATA, RECV_ERROR, RECV_TIMEOUT,USERS_ERROR,USERS_TIMEOUT,USERS_DATA,DTGK_MENU_LDRY_CHAGE,DTGK_MENU_ZDGZ_CHAGE,DTGK_MENU_ALL_CHANGE,DTGK_MENU_CHANGE_CURRENT} from "../actions/actions";
import {store} from '../index.js';

//个人中心
const initialState = {
        success: true,
        data: {
            personCenterList: {
                reason: {
                "code": "",
                "text": ""
                },
                result: {
                    total: 0,
                    list: [],
                }
            },
            personCenterFollowList: {
                reason: {
                "code": "",
                "text": ""
                },
                result: {
                    total: 0,
                    list: [],
                }
            },
            personCenterJudgeList: {
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
                    menuName: '我的盘查',
                    isOpen: false,
                    search: 'type=mypc',
                    haveSon: false,
                    isSelect: true
                },
                {
                    id: '102',
                    menuName: '我的收藏',
                    isOpen: false,
                    search: 'type=mygz',
                    haveSon: false,
                    isSelect: false
                },
                // {
                //     id:'105',
                //     menuName: '我的接收',
                //     isOpen: false,
                //     search:'type=myjs',
                // {
                //     id:'103',
                //     menuName: '我的足迹',
                //     isOpen: false,
                //     search:'type=myzj',
                //     haveSon:false,
                //     isSelect:false
                // },
                // {
                //     id:'104',
                //     menuName: '我的推送',
                //     isOpen: false,
                //     search:'type=myts',
                //     haveSon:false,
                //     isSelect:false
                // },
                // {
                //     id:'106',
                //     menuName: '我的研判',
                //     isOpen: false,
                //     search:'type=myyp',
                //     haveSon:false,
                //     isSelect:false
                // }
                //     id:'105',
                //     menuName: '我的接收',
                //     isOpen: false,
                //     search:'type=myjs',
                //     haveSon:false,
                //     isSelect:false
                // },
                // {
                //     id: '106',
                //     menuName: '我的研判',
                //     isOpen: false,
                //     search: 'type=myyp',
                //     haveSon: false,
                //     isSelect: false
                // }
            ]
        }
    }

const PersonalCenter = (state=initialState, action) => {
    let newState = Object.assign({}, state);
    switch(action.type){
         case 'REQUEST_PERSONCENER':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
            //我的盘查
        case 'recv-person-center-data':
            newState.data.personCenterList.result.list = action.data.result.list;
             newState.data.personCenterList.result.total = action.data.result.page.totalResult;
             newState.isFetching = false;
             store.getState().AuditReport.data.toConfigure = 'personCenterJudge';//把研判变成我的研判，可以进行后续判断
            return newState;
            // return Object.assign({}, state, {data:{users:action.data.data.users,count:action.data.data.count}, success: false});
        case 'recv-person-center-error':
            return Object.assign({}, state, {error: action.message});
        case USERS_TIMEOUT:
            break;
            //我的收藏
        case 'REQUEST_PERSONCENER_FOLLOW':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case 'recv-person-center-follow-data':
            newState.data.personCenterFollowList.result.list = action.data.result.list;
             newState.data.personCenterFollowList.result.total = action.data.result.page.totalResult;
            newState.isFetching = false;
            store.getState().AuditReport.data.toConfigure = 'personCenterJudge';
            return newState;
        //我的研判
        case 'REQUEST_PERSONCENER_JUDGE':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case 'recv-person-center-judge-data':
            store.getState().AuditReport.data.toConfigure = 'personCenterJudge';
            newState.data.personCenterJudgeList.result.list = action.data.result.list;
            newState.data.personCenterJudgeList.result.total = action.data.result.page.totalResult;
            newState.isFetching = false;
            return newState;
        case PERSONALCENTER_MENU_CHANGE_CURRENT:
            //遍历一级目录
            for(let x in newState.uiData.menus){
                if(action.menu.id==newState.uiData.menus[x].id){ //根据ID相等判断，是否选中
                    newState.uiData.menus[x].isSelect=true;
                }else{
                    newState.uiData.menus[x].isSelect=false;
                }
            }
            return newState;
        case PERSONALCENTER_MENU_INIT:
            for(let x in newState.uiData.menus){
                newState.uiData.menus[x].isSelect=false;
            }
            newState.uiData.menus[0].isSelect=true;
            return newState;
        default:
            if(store !== undefined){
                return store.getState().PersonalCenter;
            }else{
                return state;
            }
    }

}

module.exports = {PersonalCenter}