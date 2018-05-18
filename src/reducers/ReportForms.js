/**
 * 统计报表
 */
import * as ReportForm from "../actions/ReportForms";
import {REPORT_FORMS_MENU_CHANGE_CURRENT,REPORTFORMS_MENU_INIT} from "../actions/actions";
import {store} from '../index.js';
// import {getNowFormatDate} from "../utils/Date";
const initialState = {
    success: true,
    data: {
        ControlType:{
            result:{
                list:[]
            },
            isFetching:false
        },
        LiveType:{
            result:{
                list:[]
            },
            isFetching:false
        },
        ListGroupBySource:{
            result:{
                list:[]
            },
            isFetching:false
        },
        PersonCount:{
            result:{
                count:''
            },
        },
        ToskCount:{
            result:{
                count:''
            },
        },
        getSubtaskListGroup:{
            result:{
                list:[]
            },
            isFetching:false
        },
        getSubtaskListGroupByCycle:{
            result:{
                list:[]
            },
            isFetching:false
        }
    },
    uiData: {
        menus: [
            {
                id: '101',
                menuName: '管控人员统计',
                isOpen: false,
                search: 'type=ztsjtj',
                haveSon: false,
                isSelect: true
            },
            {
                id: '102',
                menuName: '任务统计',
                isOpen: false,
                search: 'type=ljsjtj',
                haveSon: false,
                isSelect: false
            },
            // {
            //     id: '103',
            //     menuName: '盘查统计',
            //     isOpen: false,
            //     search: 'type=hdsjtj',
            //     haveSon: false,
            //     isSelect: false
            // }
        ]
    }
}


//设置管理
const ReportForms = (state=initialState, action) =>{
    let newState = Object.assign({}, state);
    switch(action.type){
        case REPORT_FORMS_MENU_CHANGE_CURRENT://更换TAB选中状态
            //遍历一级目录
            for(let x in newState.uiData.menus){
                if(action.menu.id==newState.uiData.menus[x].id){ //根据ID相等判断，是否选中
                    newState.uiData.menus[x].isSelect=true;
                }else{
                    newState.uiData.menus[x].isSelect=false;
                }
            }
            return newState;
        //管控情况
        case 'REQUEST_DISTRIBUTE_REPORTFORM':
            newState.data.ControlType.isFetching = true;
            return newState;
        case 'getControlPersonalListGroupByControlType_succeed': //管控情况
            newState.data.ControlType.result.list = action.data.result.list;
            newState.data.ControlType.isFetching = false;
            return newState;
        //居住情况
        case 'Live_Type':
            newState.data.LiveType.isFetching = true;
            return newState;
        case 'getControlPersonalListGroupByAddressType_succeed':
            newState.data.LiveType.result.list = action.data.result.list;
            newState.data.LiveType.isFetching = false;
            return newState;
        //人员来源
        case 'ListGroupBySource_Type':
            newState.data.ListGroupBySource.isFetching = true;
            return newState;
        case 'getControlPersonalListGroupBySource_succeed':
            newState.data.ListGroupBySource.result.list = action.data.result.list;
            newState.data.ListGroupBySource.isFetching = false;
            return newState;
        //在呼管控人员人数
        case 'getControlPersonCountForX3_succeed':
            newState.data.PersonCount.result.count = action.data.result.count;
            return newState;
        //任务数量
        case 'getSubtaskCount_succeed':
            newState.data.ToskCount.result.count = action.data.result.count;
            return newState;
        //人员来源
        case 'getSubtaskListGroup_Type':
            newState.data.getSubtaskListGroup.isFetching = true;
            return newState;
        case 'getSubtaskListGroupByType_succeed':
            newState.data.getSubtaskListGroup.result.list = action.data.result.list;
            newState.data.getSubtaskListGroup.isFetching = false;
            return newState;
        //任务周期
        case 'getSubtaskListGroupByCycle_Type':
            newState.data.getSubtaskListGroupByCycle.isFetching = true;
            return newState;
        case 'getSubtaskListGroupByCycle_succeed':
            newState.data.getSubtaskListGroupByCycle.result.list = action.data.result.list;
            newState.data.getSubtaskListGroupByCycle.isFetching = false;
            return newState;
        case REPORTFORMS_MENU_INIT://初始化菜单
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
            if(store !== undefined){
                return store.getState().ReportForms;
            }else{
                return state;
            }
    }
}

module.exports = {ReportForms}