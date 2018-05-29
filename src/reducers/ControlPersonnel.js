/**
 * 管控人员-呼市
 */
import {lyInitialStateReturn} from "./initialState"
import {CONTROL_PERSONNEL_CURRENT, CONTROLPERSONNEL_MENU_INIT, CONTROLPERSONNEL_TYPE,CONTROLPERSONNEL_Person,CONTROLPERSONNEL_AddOrOut} from "../actions/actions";
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
        },
        ControlPersonList: {
            reason: 1,
            result: {
                list: [],
                page: {}
            }
        },
        FiledList: {
            reason: 1,
            result: {
                list: [],
            }
        },
        CustomFiled:{
            reason: {
                code:'',
                text:''
            },
            result: {}
        },
        delCustomFiled:{
            reason: {
                code:'',
                text:''
            },
            result: {}
        },
        getControlPersonListById: {
            reason: 1,
            result: {
                list:[],
                data: {
                    custom_filed_value:[]
                }
            }
        },
        getExport:{
            reason:"",
            result:{
                path:""
            }
        },
        Download:{
            reason:"",
            result:{
                path:""
            }
        },
        TaskModelControlPerson:{
            reason: {
                "code": "",
                "text": ""
            },
            result: {

            }
        },
        getTaskModelList:{
            reason: {},
            result: {
                list: [],
            }
        }
    },
    uiData: {
        menus: [
            {
                id: '102',
                menuName: '管控人员',
                isOpen: true,
                search: 'type=rwgl',
                haveSon: true,
                isSelect: false,
                code: "",
                isShow: true,
                sonMenu: [
                    {
                        id: '1003',
                        menuName: '未管控',
                        search: 'type=gzry&state=1',
                        isSelect: true,
                        isShow: true,
                        code: ""
                    },
                    {
                        id: '1004',
                        menuName: '已管控',
                        search: 'type=gzry&state=2',
                        isSelect: false,
                        isShow: true,
                        code: ""
                    },
                    {
                        id: '1005',
                        menuName: '离开责任区',
                        search: 'type=gzry&state=1',
                        isSelect: false,
                        isShow: true,
                        code: ""
                    },
                    {
                        id: '1006',
                        menuName: '失控',
                        search: 'type=gzry&state=2',
                        isSelect: false,
                        isShow: true,
                        code: ""
                    }
                ]
            },
            {
                id: '103',
                menuName: '人员来源',
                isOpen: false,
                search: 'type=rwgl',
                haveSon: true,
                isSelect: false,
                code: "",
                isShow: true,
                sonMenu: [
                    {
                        id: '1007',
                        menuName: '后台导入',
                        search: 'type=gzry&state=1',
                        isSelect: false,
                        isShow: true,
                        code: ""
                    },
                    {
                        id: '1008',
                        menuName: '前端新增',
                        search: 'type=gzry&state=2',
                        isSelect: false,
                        isShow: true,
                        code: ""
                    }
                ]
            },
            {
                id: '101',
                menuName: '关注人员',
                haveSon: true,
                isOpen: false,
                search: 'type=rwgl',
                isSelect: false,
                code: "gkry_gzry_page",
                isShow: false,
                sonMenu: [
                    {
                        id: '1001',
                        menuName: '流入人员',
                        search: 'type=gzry&state=1',
                        isSelect: false,
                        isShow: false,
                        code: "gkry_gzry_nlhry_page"
                    },
                    {
                        id: '1002',
                        menuName: '治安来源',
                        search: 'type=gzry&state=2',
                        isSelect: false,
                        isShow: false,
                        code: "gkry_gzry_zaly_page"
                    }
                ]
            },
        ]
    },
    isFetching:false
}


const ControlPersonnel =(state = initialState, action) =>{
    let newState = Object.assign({}, state);
    switch (action.type) {
        case 'REQUEST_TASK_MANAGEMENT':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case 'ControlPersonnel-data': //任务
            newState.data.taskList.result.list = action.data.result.list;
            newState.data.taskList.result.total = action.data.result.page.totalResult;//page?reason
            newState.isFetching = false;
            return newState;
        case 'Task-Tree-data': //根据任务ID获取树
            newState.data.task = action.data.result;//page?
            return newState;

        case CONTROLPERSONNEL_MENU_INIT://初始化菜单
            for (let x in newState.uiData.menus) {
                newState.uiData.menus[x].isSelect = false;
                for(let i in  newState.uiData.menus[x].sonMenu){
                    newState.uiData.menus[x].sonMenu[i].isSelect = false;
                }
            }
            newState.uiData.menus[0].isOpen = true;
            newState.uiData.menus[1].isOpen = false;
            newState.uiData.menus[2].isOpen = false;
            newState.uiData.menus[0].sonMenu[0].isSelect = true;
            return newState;
        case CONTROLPERSONNEL_TYPE:
            if(newState.uiData.menus[2].isOpen===true){
                newState.uiData.menus[2].isOpen=false;
            }else{
                newState.uiData.menus[2].isOpen=true;
            }
            return newState;
        case CONTROLPERSONNEL_Person:
            if(newState.uiData.menus[0].isOpen===true){
                newState.uiData.menus[0].isOpen=false;
            }else{
                newState.uiData.menus[0].isOpen=true;
            }
            return newState;
        case CONTROLPERSONNEL_AddOrOut:
            if(newState.uiData.menus[1].isOpen===true){
                newState.uiData.menus[1].isOpen=false;
            }else{
                newState.uiData.menus[1].isOpen=true;
            }
            return newState;
        case CONTROL_PERSONNEL_CURRENT:
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
        case 'List_Loading':
            newState.isFetching = true;
            return newState;
        case 'Control_Person_List':
            newState.data.ControlPersonList = action.data;
            newState.isFetching = false;
            return newState;
        case 'Control_PersonList_By_Id':
            newState.data.getControlPersonListById = action.data;
            return newState;
        case 'Export_Succeed':
            newState.data.getExport = action.data;
            return newState;
        case 'Download_Succeed':
            newState.data.Download = action.data;
            return newState;
        case 'get_Custom_Filed_List':
            newState.data.FiledList = action.data;
            return newState;
        case 'insertOrUpdateCustomFiled_succeed':
            newState.data.CustomFiled = action.data;
            return newState;
        case 'delCustomFiled_succeed':
            newState.data.delCustomFiled = action.data;
            return newState;
        case 'updateTaskModelControlPerson_succeed':
            newState.data.TaskModelControlPerson = action.data;
            return newState;
        case 'getTaskModelList_succeed':
            newState.data.getTaskModelList = action.data;
            return newState;

        default:
            if(store !== undefined ){
                return store.getState().ControlPersonnel;
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
module.exports = {ControlPersonnel}