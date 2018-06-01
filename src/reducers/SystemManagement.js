/**
 * 设置管理
 */
import * as systemManagementAction from "../actions/SystemManagement";
import {SYSTEMMANAGEMENT_MENU_CHANGE_CURRENT,SYSTEMMANAGEMENT_MENU_INIT,SYSTEMMANAGEMENT_HIGHRISKAREA_CHAGE} from "../actions/actions";
import {store} from '../index.js';
import {isAllowMenu} from '../utils/index';
const initialState = { //系统管理
        success: true,
        data: {
            placeOfInfluxPersonList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                result: {
                    total: 0,
                    list: [],
                }
            },
            placeOfOriginPersonList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                result: {
                    total: 0,
                    list: [],
                }
            },
            exceptionParameterReminder: {
                 reason: {
                    "code": "",
                    "text": ""
                },
                result: {
                     total: 0,
                    list: [],
                }
            },
            highRiskCitiesList: {
                 reason: {
                "code": "",
                "text": ""
                },
                result: {
                    total: 0,
                    list: [],
                }
            },
            highRiskLineList: {
                 reason: {
                "code": "",
                "text": ""
                },
                result: {
                    total: 0,
                    list: [],
                }
            },


            whiteList: {
                reason: {
                "code": "",
                "text": ""
                },
                result: {
                    total: 0,
                    list: [],
                }
            },
            blackList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                result: {
                    total: 0,
                    list: [],
                }
            },
            interrogationInformationList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                result: {
                    total: 0,
                    list: [],
                }
            },
            horrorSoftwareList: {
                reason: {
                  "code": "",
                  "text": ""
                },
                result: {
                  total: 0,
                  list: [],
                }
            },
            province:{
                reason: {
                "code": "",
                "text": ""
                },
                result: {
                    list: [],
                }
            },
            city:{
                reason: {
                "code": "",
                "text": ""
                },
                result: {
                    list: [],
                },
            },
           redList: {
              reason: {
                "code": "",
                "text": ""
              },
              result: {
                total: 0,
                list: [],
              }
          },
          provinceTreeList: {
              reason: {
                "code": "",
                "text": ""
              },
              result: {
                total: 0,
                list: [],
              }
          },
          provinceTempTreeList: {
              reason: {
                "code": "",
                "text": ""
              },
              result: {
                total: 0,
                list: [],
              }
          },
          codeTreeList: {
            reason: {
              "code": "",
              "text": ""
            },
            result: {
              total: 0,
              list: [],
            }
        },
        codeTempTreeList: {
            reason: {
              "code": "",
              "text": ""
            },
            result: {
              total: 0,
              list: [],
            }
        },
        codeTableist: {//编码展示出来的
            reason: {
              "code": "",
              "text": ""
            },
            result: {
              total: 0,
              list: [],
            }
        },
        getControlTimeCycle:{
            reason: {
            },
            result: {
                defaulttaskcycle: '',
                outofcontroltime: '',
            },
            loading:false
        },
        UpdateControlTimeCycle:{
            reason: {
            },
            result:true
        }
    },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '涉恐软件',
                    isOpen: false,
                    search: 'type=all',
                    haveSon: false,
                    isSelect: true,
                    code:'xtsz_skrj_page',
                    isShow: false
                },
                {
                    id: '102',
                    menuName: '特征设置',
                    isOpen: false,
                    search: 'type=gzry',
                    haveSon: false,
                    isSelect: false,
                    code:'xtsz_tzsz_page',
                    isShow: false
                },
                {
                    id: '103',
                    menuName: '异常比对规则',
                    isOpen: false,
                    search: 'type=ldry',
                    haveSon: false,
                    isSelect: false,
                    code:'xtsz_ycbdgz_page',
                    isShow: false
                },
                // {
                //     id: '104',
                //     menuName: '黑名单',
                //     isOpen: false,
                //     search: 'type=ldry',
                //     haveSon: false,
                //     isSelect: false
                // },
                // {
                //     id: '105',
                //     menuName: '白名单',
                //     isOpen: false,
                //     search: 'type=ldry',
                //     haveSon: false,
                //     isSelect: false
                // },
                // {
                //     id: '106',
                //     menuName: '高危地区',
                //     isOpen: false,
                //     search: 'type=ldry',
                //     haveSon: false,
                //     isSelect: false
                //     // sonMenu: [
                //     //     {id:'1061',
                //     //         menuName: '高危城市',
                //     //         search:'type=ldry&state=1',
                //     //         isSelect:false
                //     //     },
                //     //     {id:'1062',
                //     //         menuName: '高危线路',
                //     //         search:'type=ldry&state=2',
                //     //         isSelect:false
                //     //     },
                //     //
                //     // ]
                // },
                {
                    id: '107',
                    menuName: '原籍地联系人',
                    isOpen: false,
                    search: 'type=ldry',
                    haveSon: false,
                    isSelect: false,
                    code:'xtsz_yjdlxr_page',
                    isShow: false
                },
                {
                    id: '108',
                    menuName: '流入地联系人',
                    isOpen: false,
                    search: 'type=ldry',
                    haveSon: false,
                    isSelect: false,
                    code:'xtsz_lrdlxr_page',
                    isShow: false
                },
                // {
                //   id: '109',
                //   menuName: '红名单',
                //   isOpen: false,
                //   search: 'type=ldry',
                //   haveSon: false,
                //   isSelect: false
                // },
                {
                    id: '110',
                    menuName: '数据字典',
                    isOpen: false,
                    search: 'type=ldry',
                    haveSon: false,
                    isSelect: false,
                    code: 'xtsz_sjzd_page',
                    isShow: false
                  },
                {
                    id: '111',
                    menuName: '动态管控设置',
                    haveSon: false,
                    isOpen: true,
                    search: 'type=rwgl',
                    isSelect: false,
                    code: "xtsz_dtgksz_page",
                    isShow: false,
                }
                
            ]
        }
    }

//设置管理
const SystemManagement = (state=initialState, action) => {
    let newState = Object.assign({}, state);
    switch(action.type){
        //黑名单
        case 'REQUEST_BLACKLIST_SYSTEM':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case systemManagementAction.BLACKLIST_DATA: //获取黑名单 REQUEST_BLACKLIST_SYSTEM
            newState.data.blackList.result.list = action.data.result.list;
            newState.data.blackList.result.total = action.data.result.page.totalResult;
            newState.isFetching = false;
            return newState;
        //白名单
        case 'REQUEST_WHITELIST_SYSTEM':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case systemManagementAction.WHITELIST_DATA: //获取白名单 REQUEST_WHITELIST_SYSTEM
            newState.data.whiteList.result.list = action.data.result.list;
            newState.data.whiteList.result.total = action.data.result.page.totalResult;
            newState.isFetching = false;
            return newState;
        //高危城市
        case 'REQUEST_HIGHRISKCITIES_SYSTEM':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case systemManagementAction.HIGHRISKCITIES_DATA: //获取高危地区(城市) REQUEST_HIGHRISKCITIES_SYSTEM
            newState.data.highRiskCitiesList.result.list = action.data.result.list;
            newState.data.highRiskCitiesList.total = action.data.result.page.totalResult;
            newState.isFetching = false;
            return newState;
        //高危线路
        case 'REQUEST_HIGHRISKLINE_SYSTEM':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case systemManagementAction.HIGHRISKLINE_DATA: //获取高危地区(线路) REQUEST_HIGHRISKLINE_SYSTEM
            newState.data.highRiskLineList.result.list = action.data.result.list;
            newState.data.highRiskLineList.total = action.data.result.page.totalResult;
            newState.isFetching = false;
            return newState; 
        //原籍地
        case 'REQUEST_PLACEOFORIGINPERSON_SYSTEM':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case systemManagementAction.PLACEOFORIGINPERSON_DATA: //原籍地联系人 REQUEST_PLACEOFORIGINPERSON_SYSTEM

            newState.data.placeOfOriginPersonList.result.list = action.data.result.list;

            newState.data.placeOfOriginPersonList.result.total = action.data.result.page.totalResult;
            
            newState.isFetching = false;
            return newState;
        //流入地
        case 'REQUEST_PLACEOFINFLUXPERSON_SYSTEM':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case systemManagementAction.PLACEOFINFLUXPERSON_DATA: //流入地联系人 REQUEST_PLACEOFINFLUXPERSON_SYSTEM
            newState.data.placeOfInfluxPersonList.result.list = action.data.result.list;
            newState.data.placeOfInfluxPersonList.result.total = action.data.result.page.totalResult;
            newState.isFetching = false;
            return newState;
        //涉恐软件
        case 'REQUEST_HORRORSOFTWARE_SYSTEM':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case systemManagementAction.HORRORSOFTWARE_DATA://涉恐软件 REQUEST_HORRORSOFTWARE_SYSTEM
            newState.data.horrorSoftwareList.result.list = action.data.result.list;
            newState.data.horrorSoftwareList.result.total = action.data.result.page.totalResult;
            newState.isFetching = false;
            return newState;
         //人工盘查
        case 'REQUEST_INTERROGATIONINFORMATION_SYSTEM':
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case systemManagementAction.INTERROGATIONINFORMATION_DATA://人员盘查信息 REQUEST_INTERROGATIONINFORMATION_SYSTEM
            newState.data.interrogationInformationList.result.list = action.data.result.list;
            newState.data.interrogationInformationList.result.total = action.data.result.page.totalResult;
            newState.isFetching = false;
            return newState;
        case systemManagementAction.EXCEPTIONPARAMETERREMINDER_DATA://异常提醒参数
            newState.data.exceptionParameterReminder.result.list = action.data.result.list;
            return newState;
        case systemManagementAction.PLACEOFINFLUXPERSON_DATA://
            newState.data.placeOfInfluxPersonList.list = action.data.data.placeOfInfluxPersonList;
            newState.data.placeOfInfluxPersonList.count = action.data.data.count;
            return newState;
        case systemManagementAction.PLACEOFORIGINPERSON_DATA:
            newState.data.placeOfOriginPersonList.list = action.data.data.placeOfOriginPersonList;
            newState.data.placeOfOriginPersonList.count = action.data.data.count;
            return newState;
            //省市级联
        case systemManagementAction.PLACE_PROVINCE_DATA: //省
            newState.data.provinceTreeList.result.list = action.data.result.list;
            return newState;
        case 'province_temp_tree_data'://省市级联临时树
            newState.data.provinceTempTreeList.result.list = action.data.result.list;
            return newState;

            //编码树状
        case systemManagementAction.CODE_DATA: 
            newState.data.codeTreeList.result.list = action.data.result.list;
            return newState;
        case 'code_temp_tree_data'://省市编码临时树
            newState.data.codeTempTreeList.result.list = action.data.result.list;
            return newState;
        //编码展示出来的REQUEST_CODELIST_SYSTEM
        case 'REQUEST_CODELIST_SYSTEM':
        return {
            ...state,//原状态
            isFetching: true,
            didInvalidate: false
        }
        case systemManagementAction.CODE_TABLE_DATA: 
            newState.data.codeTableist.result.list = action.data.result.list;
            newState.data.codeTableist.result.total = action.data.result.page.totalResult;
            newState.isFetching = false;
            return newState;

        case SYSTEMMANAGEMENT_MENU_CHANGE_CURRENT:
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
        case SYSTEMMANAGEMENT_MENU_INIT:  //初始化菜单
            for(let x in newState.uiData.menus){
                newState.uiData.menus[x].isSelect=false;
            }
            newState.uiData.menus[0].isSelect=true;
            return newState;
        // case SYSTEMMANAGEMENT_HIGHRISKAREA_CHAGE: //高危地区二级菜单打开关闭
        //     if(newState.uiData.menus[5].isOpen===true){
        //         newState.uiData.menus[5].isOpen=false;
        //     }else{
        //         newState.uiData.menus[5].isOpen=true;
        //     }
        //     return newState;

        case 'REQUEST_REDLIST_SYSTEM':
          return {
            ...state,//原状态redList
            isFetching: true,
            didInvalidate: false
          }
        case 'GetRedLIst_DATA': //获取红名单
            newState.data.redList.result.list = action.data.result.list;
            newState.data.redList.result.total = action.data.result.page.totalResult;
            newState.isFetching = false;
            return newState;
        case 'TimeCycle_Loading':
            newState.data.getControlTimeCycle.loading = true;
            return newState;
        case 'getControlTimeCycle_succeed':
            newState.data.getControlTimeCycle.result = action.data.result;
            newState.data.getControlTimeCycle.loading = false;
            return newState;
        case 'UpdateControlTimeCycle_succeed':
            newState.data.UpdateControlTimeCycle.result = action.data.result;
            return newState;
        default:
            if(store !== undefined ){
                return store.getState().SystemManagement;
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

module.exports = {SystemManagement}