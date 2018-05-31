/**
 * Created by iliulei on 2017/5/18.
 */
import { store } from '../index.js';
// import {mainReducer} from "../reducers/reducers";
// import {createDevToolsStore} from "../configStore";
import {
    PERSONALCENTER_MODULE, DYNAMICCONTROL_MODULE, SYSTEMMANAGEMENT_MODULE, INTELLIGENTRETRIEVAL_MODULE,
    AUDIT_REPORT_MODULE, REPORTFORMS_MODULE, REPORTFORM_MODULE, INVENTORYMANAGEMENT_MODULE, CUSTOMMANAGEMENT_MODULE, REPORTLY_MODULE,
    DEFINEWARE_MODULE,
    TaskMANAGEMENT_MODULE, ELETRO_MODULE, AREAMANAGEMENT_MODULE, CONTROLPERSONNEL_MODULE, SYSREMSETUP_MODULE, INVENTORYMANAGEMENT_HUSHI_MODULE
} from "../utils/Constants";
import { fetchData } from "./request";
import { INTERROGATIONDETAILS_TAB_CHANGE_CURRENT, INTERROGATIONDETAILS_TAB_INIT } from "./InterrogationDetails";
import { ELECTRO_TAB_CHANGE_CURRENT } from "./ElectronicArchives";
ELECTRO_TAB_CHANGE_CURRENT
import * as constants from "../utils/Constants";
import { history } from '../index.js';
import { post, get, put } from "./request";
import { message } from 'antd';
import { developmentModeList, developmentMode, serverUrl, securityCenterUrls } from "../utils/index";

import { PostPersonCenterData, PostPersonCenterFollowData } from "./PersonalCenter";



//API接口前缀

const mockApi = "http://www.easy-mock.com/mock/591d5f109aba4141cf2736c6/fklj2";
//const standardApi = serverUrl+"/hylink-fklj";
const standardApi = serverUrl;
// let store = createDevToolsStore(mainReducer);

export let api;
if (developmentMode === developmentModeList.mock) {
    api = mockApi;
} else if (developmentMode === developmentModeList.standard) {
    api = standardApi;
}
export const USERS_DATA = 'recv-users-data';
export const USERS_TIMEOUT = 'recv-users-data-timeout';
export const USERS_ERROR = 'recv-users-data-error';
//'http://172.19.12.232:8081/api/user/login',


//获取人员列表
export function fetchUsersData(path, search = '') {
    return dispatch => {
        dispatch({ type: "REQUEST_USERLIST_DYNAMIC" });
        fetch(api + path + '?' + search)//请求
            .then((res) => {
                return res.json();
            })
            .then((json) => {

                dispatch(receivedUsersData(json))
            })
            .catch((e) => {
                dispatch(receiveUsersError(e.toString()))
            });
    }
}

export function PostUsersData(creds) {
    let path = '/data/getDArcPersonList';
    return dispatch => {
        dispatch({ type: "REQUEST_USERLIST_DYNAMIC" });
        post(api + path, creds).then((json) => {
            dispatch({ type: 'recv-users-data-test', data: json })
        }).catch((e) => {
            dispatch(receiveUsersError(e.toString()))
        });
    }
}
export function PostUsersAbnormalData(creds) {
    let path = '/data/getExceptionP';
    return dispatch => {
        dispatch({ type: "REQUEST_USERLIST_DYNAMIC" });
        post(api + path, creds).then((json) => {
            dispatch({ type: 'recv-users-data-test', data: json })
        }).catch((e) => {
            dispatch(receiveUsersError(e.toString()))
        });
    }
}
//未落地人员
export function PostUsersNotLandData(creds) {
    let path = '/data/getNoArrivelistPage';
    return dispatch => {
        dispatch({ type: "REQUEST_USERLIST_DYNAMIC" });
        post(api + path, creds).then((json) => {
            dispatch({ type: 'recv-users-data-test', data: json })
        }).catch((e) => {
            dispatch(receiveUsersError(e.toString()))
        });
    }
}
//流入人员
export function PostUsersInflowData(creds) {
    let path = '/data/getToPersonlistPage';
    return dispatch => {
        dispatch({ type: "REQUEST_USERLIST_DYNAMIC" });
        post(api + path, creds).then((json) => {
            dispatch({ type: 'recv-users-data-test', data: json })
        }).catch((e) => {
            dispatch(receiveUsersError(e.toString()))
        });
    }
}
//流出人员
export function PostUsersOutflowData(creds) {
    let path = '/data/getFromPersonlistPage';
    return dispatch => {
        dispatch({ type: "REQUEST_USERLIST_DYNAMIC" });
        post(api + path, creds).then((json) => {
            dispatch({ type: 'recv-users-data-test', data: json })
        }).catch((e) => {
            dispatch(receiveUsersError(e.toString()))
        });
    }
}
//失踪人员
export function PostUsersMissingData(creds) {
    let path = '/data/getDisappearlistPage';
    return dispatch => {
        dispatch({ type: "REQUEST_USERLIST_DYNAMIC" });
        post(api + path, creds).then((json) => {
            dispatch({ type: 'recv-users-data-test', data: json })
        }).catch((e) => {
            dispatch(receiveUsersError(e.toString()))
        });
    }
}
export function receivedUsersData(data) {
    return { type: 'recv-users-data-test', data: data }
}
export function receiveUsersError(message) {
    return { type: USERS_ERROR, message: message }
}

//保存人员列表的关注和未关注状态 /data/saveMessAttention
export function saveMessAttention(creds, queryCreds, pageType) {
    return dispatch => {
        post(api + "/data/saveMessAttention", creds).then((json) => {

            if (pageType === "动态管控") {
                store.dispatch(PostUsersData(queryCreds));
            } else if (pageType === '动态管控盘查异常') {
                store.dispatch(PostUsersAbnormalData(queryCreds));
            } else if (pageType === '动态管控失踪人员') {
                store.dispatch(PostUsersMissingData(queryCreds));
            } else if (pageType === '动态管控未落地人员') {
                store.dispatch(PostUsersNotLandData(queryCreds));
            } else if (pageType === '动态管控流出人员') {
                store.dispatch(PostUsersOutflowData(queryCreds));
            } else if (pageType === '动态管控流入人员') {
                store.dispatch(PostUsersInflowData(queryCreds));
            } else if (pageType === "我的盘查") {
                store.dispatch(PostPersonCenterData(queryCreds));
            } else if (pageType === "我的收藏") {
                store.dispatch(PostPersonCenterFollowData(queryCreds));
            }
            message.success('提示：收藏成功！');
        }).catch((e) => {
        });
    }
}
//取消关注人/data/DelMessAttention
export function DelMessAttention(creds, queryCreds, pageType) {
    return dispatch => {
        post(api + "/data/DelMessAttention", creds).then((json) => {

            if (pageType === "动态管控") {
                store.dispatch(PostUsersData(queryCreds));
            } else if (pageType === '动态管控盘查异常') {
                store.dispatch(PostUsersAbnormalData(queryCreds));
            } else if (pageType === '动态管控失踪人员') {
                store.dispatch(PostUsersMissingData(queryCreds));
            } else if (pageType === '动态管控未落地人员') {
                store.dispatch(PostUsersNotLandData(queryCreds));
            } else if (pageType === '动态管控流出人员') {
                store.dispatch(PostUsersOutflowData(queryCreds));
            } else if (pageType === '动态管控流入人员') {
                store.dispatch(PostUsersInflowData(queryCreds));
            } else if (pageType === "我的盘查") {
                store.dispatch(PostPersonCenterData(queryCreds));
            } else if (pageType === "我的收藏") {
                store.dispatch(PostPersonCenterFollowData(queryCreds));
            }
            message.success('提示：取消收藏成功！');
            //store.dispatch(PostUsersData(creds));
        }).catch((e) => {
        });
    }
}

//左侧菜单项
export const DTGK_MENU_ALL_CHANGE = 'recv-data';
export const DTGK_MENU_ZDGZ_CHAGE = 'recv-data-timeout';
export const DTGK_MENU_LDRY_CHAGE = 'recv-data-error';
export const DTGK_MENU_CHANGE_CURRENT = 'dtgk_menu_change_current';
export const PERSONALCENTER_MENU_CHANGE_CURRENT = 'personalcenter_menu_change_current';
export const SYSTEMMANAGEMENT_MENU_CHANGE_CURRENT = 'systemmanagement_menu_change_current';//更换选中菜单
export const AREAMANAGEMENT_MENU_CHANGE_CURRENT = 'areamanagement_menu_change_current';//更换选中菜单
export const INTELLIGENT_RETRIEVAL_MENU_CHANGE_CURRENT = 'intelligent_retrieval_menu_change_current';//智能检索更换选中菜单
export const SYSTEMMANAGEMENT_HIGHRISKAREA_CHAGE = 'systemmanagement_highriskarea_chage';//高危地区打开关闭
export const AUDIT_REPORT_MENU_CHANGE_CURRENT = 'audit_report_menu_change_current';//研判报告
export const REPORT_FORMS_MENU_CHANGE_CURRENT = 'report_forms_menu_change_current';//统计报表（呼市）
export const REPORT_FORM_MENU_CHANGE_CURRENT = 'report_form_menu_change_current';//统计报表（反恐利剑）

export const INVENTORYMANAGEMENT_MENU__CHANGE_CURRENT = 'Inventorymanagement_menu_change_current';//盘查管理-更换选
export const CUSTOMERMANAGEMENT_MENU__CHANGE_CURRENT = 'customermanagement_menu_change_current';//卡口管理-更换选
export const REPORT_MENU__CHANGE_CURRENT = 'Report_menu_change_current';//统计报表管理-更换选-洛阳
export const DEFINWARE_MENU__CHANGE_CURRENT = 'DefinWare_menu_change_current';//临控管理-更换选-洛阳
export const TASK_MENU__CHANGE_CURRENT = 'Task_menu_change_current';//任务管理-更换选-洛阳
export const CONTROL_PERSONNEL_CURRENT = 'Control_personnel_current';//管控人员-更选项-呼市
export const SYSTEM_SETUP_CURRENT = 'System_Setup_current';//系统设置-更选项-呼市
export const CONTROLPERSONNEL_TYPE = 'Control_personnel_type';//管控人员-更选项-呼市-关注人员
export const CONTROLPERSONNEL_Person = 'Control_personnel_person';//管控人员-更选项-呼市-管控人员
export const CONTROLPERSONNEL_AddOrOut = 'Control_personnel_addorout';//管控人员-更选项-呼市-管控人员
export const INVENTORYMANAGEMENT_HUSHI_ZQRW = 'Inventorymanagement_hushi_zqrw';//盘查管理-呼市-周期任务
export const INVENTORYMANAGEMENT_HUSHI_OLDZQRW = 'Inventorymanagement_hushi_old_zqrw';//盘查管理-呼市-旧版周期任务
export const INVENTORYMANAGEMENT_HUSHI_CURRENT = 'Inventorymanagement_hushi_current';//盘查管理-更选项-呼市

export const SYSTEMSETUP_ADD = 'System_Setup_add';//更选项-呼市-系统设置-添加到任务
// export const SYSTEMSETUP_CHOICE = 'System_Setup_choice';//更选项-呼市-系统设置-选择隶属任务

export const INVENTORY_MENU_LDPC_CHAGE = 'inventory-menu-change';//一级菜单流动盘查
export const INVENTORY_MENU_KKPC_CHAGE = 'customsPass-data-flow';//一级菜单卡口盘查



export function changeMenu(menu, type, moduleName) {//改变目录状态
    if (moduleName === DYNAMICCONTROL_MODULE) {//动态管控模块
        if (type === 'openAndClose') {//菜单打开关闭
            if (menu.menuName === '全部') {
                return { type: DTGK_MENU_ALL_CHANGE }
            } else if (menu.menuName === '关注人员') {
                return { type: DTGK_MENU_ZDGZ_CHAGE }
            } else if (menu.menuName === '流动人员') {
                return { type: DTGK_MENU_LDRY_CHAGE }
            }
        } else if (type === 'getData') {//点击目录
            // store.dispatch(fetchUsersData('/data/getDArcPersonList',menu.search));
            return { type: DTGK_MENU_CHANGE_CURRENT, menu: menu };
        }
    } else if (moduleName === INTELLIGENTRETRIEVAL_MODULE) {//智能检索模块
        if (type === 'openAndClose') {//菜单打开关闭
        } else if (type === 'getData') {//点击目录
            return { type: INTELLIGENT_RETRIEVAL_MENU_CHANGE_CURRENT, menu: menu };
        }
    } else if (moduleName === CONTROLPERSONNEL_MODULE) {//管控人员模块
        if (type === 'openAndClose') {//菜单打开关闭
            if (menu.id === '101') {
                return { type: CONTROLPERSONNEL_TYPE }
            } else if (menu.id === '102') {
                return { type: CONTROLPERSONNEL_Person }
            } else if (menu.id === '103') {
                return { type: CONTROLPERSONNEL_AddOrOut }
            }
        } else if (type === 'getData') {//点击目录
            // store.dispatch(fetchUsersData('/data/getDArcPersonList',menu.search));
            return { type: CONTROL_PERSONNEL_CURRENT, menu: menu };
        }
    } else if (moduleName === SYSREMSETUP_MODULE) {//系统设置模块
        if (type === 'openAndClose') {//菜单打开关闭
            if (menu.id === '101') {
                return { type: SYSTEMSETUP_ADD }
            }
        } else if (type === 'getData') {//点击目录
            return { type: SYSTEM_SETUP_CURRENT, menu: menu };
        }
    } else if (moduleName === PERSONALCENTER_MODULE) {//个人中心模块
        if (type === 'openAndClose') {//菜单打开关闭
        } else if (type === 'getData') {//点击目录
            //  store.dispatch(fetchUsersData('/data/getDArcPersonList',menu.search));
            // store.dispatch(PostPersonCenterData());
            return { type: PERSONALCENTER_MENU_CHANGE_CURRENT, menu: menu };
        }
    } else if (moduleName === SYSTEMMANAGEMENT_MODULE) {//系统管理模块
        if (type === 'openAndClose') {//菜单打开关闭
            if (menu.menuName === '高危地区') {
                return { type: SYSTEMMANAGEMENT_HIGHRISKAREA_CHAGE }
            }
        } else if (type === 'getData') {//点击目录
            return { type: SYSTEMMANAGEMENT_MENU_CHANGE_CURRENT, menu: menu };
        }
    } else if (moduleName === AREAMANAGEMENT_MODULE) {//卡点管理模块
        if (type === 'openAndClose') {//菜单打开关闭

        } else if (type === 'getData') {//点击目录
            return { type: AREAMANAGEMENT_MENU_CHANGE_CURRENT, menu: menu };
        }
    } else if (moduleName === AUDIT_REPORT_MODULE) {//研判报告-动态管控内
        if (type === 'openAndClose') {//菜单打开关闭
        } else if (type === 'getData') {//点击目录
            return { type: AUDIT_REPORT_MENU_CHANGE_CURRENT, menu: menu };
        }
    } else if (moduleName === REPORTFORMS_MODULE) {//统计报表模块（呼市）
        if (type === 'openAndClose') {//菜单打开关闭
        } else if (type === 'getData') {//点击目录
            // store.dispatch(fetchUsersData('/getUsers',menu.search));
            return { type: REPORT_FORMS_MENU_CHANGE_CURRENT, menu: menu };
        }
    } else if (moduleName === REPORTFORM_MODULE) {//统计报表模块（反恐利剑）
        if (type === 'openAndClose') {//菜单打开关闭
        } else if (type === 'getData') {//点击目录
            // store.dispatch(fetchUsersData('/getUsers',menu.search));
            return { type: REPORT_FORM_MENU_CHANGE_CURRENT, menu: menu };
        }
    } else if (moduleName === INVENTORYMANAGEMENT_MODULE) {//盘查管理模块
        if (type === 'openAndClose') {//菜单打开关闭
            if (menu.menuName === '巡逻盘查') {
                return { type: INVENTORY_MENU_LDPC_CHAGE };
            } else if (menu.menuName === '卡点盘查') {
                return { type: INVENTORY_MENU_KKPC_CHAGE };
            }
        } else if (type === 'getData') {//点击目录
            // store.dispatch(fetchUsersData('/getUsers',menu.search));
            return { type: INVENTORYMANAGEMENT_MENU__CHANGE_CURRENT, menu: menu };
        }
    } else if (moduleName === REPORTLY_MODULE) {//统计报表-洛阳
        if (type === 'openAndClose') {//菜单打开关闭

        } else if (type === 'getData') {//点击目录
            // store.dispatch(fetchUsersData('/getUsers',menu.search));
            return { type: REPORT_MENU__CHANGE_CURRENT, menu: menu };
        }
    } else if (moduleName === DEFINEWARE_MODULE) {//临控管理-洛阳
        if (type === 'openAndClose') {//菜单打开关闭

        } else if (type === 'getData') {//点击目录
            // store.dispatch(fetchUsersData('/getUsers',menu.search));
            return { type: DEFINWARE_MENU__CHANGE_CURRENT, menu: menu };
        }
    } else if (moduleName === TaskMANAGEMENT_MODULE) {//任务管理-洛阳
        if (type === 'openAndClose') {//菜单打开关闭

        } else if (type === 'getData') {//点击目录
            // store.dispatch(fetchUsersData('/getUsers',menu.search));
            return { type: TASK_MENU__CHANGE_CURRENT, menu: menu };
        }
    } else if (moduleName === INVENTORYMANAGEMENT_HUSHI_MODULE) {//盘查管理-呼市
        if (type === 'openAndClose') {
            if (menu.id === '101') {
                return { type: INVENTORYMANAGEMENT_HUSHI_ZQRW }
            }
            // else if (menu.id === '102') {
            //     return { type: INVENTORYMANAGEMENT_HUSHI_OLDZQRW }
            // } 
        } else if (type === 'getData') {//点击目录
            return { type: INVENTORYMANAGEMENT_HUSHI_CURRENT, menu: menu };
        }
    }
}
//初始化动态管控菜单
export function initDynamicControlMenu(menu) {
    return { type: DYNAMICCONTROL_MENU_INIT, menu: menu };
}
//初始研判报告
export function initAuditreportMenu(menu) {
    return { type: AUDITREPOT_MENU_INIT, menu: menu };
}

//初始化智能检索菜单
export function initIntelligentRetrievalMenu(menu) {
    return { type: INTELLIGENTRETRIEVAL_MENU_INIT, menu: menu };
}
//初始化动态管控菜单
export function initPersonalCenterMenu(menu) {
    return { type: PERSONALCENTER_MENU_INIT, menu: menu };
}
//初始卡点管理菜单
export function initAreaManagementCenterMenu(menu) {
    return { type: AREAMANAGEMENT_MENU_INIT, menu: menu };
}
//初始化系统管理菜单
export function initSystemManagementMenu(menu) {
    return { type: SYSTEMMANAGEMENT_MENU_INIT, menu: menu };
}
//初始化智能检索菜单
export function initIntelligentRetrievaMenu(menu) {
    return { type: INTELLIGENTRETRIEVA_MENU_INIT, menu: menu };
}
//初始化统计报表（呼市）
export function initReportFormsMenu(menu) {
    return { type: REPORTFORMS_MENU_INIT, menu: menu };
}
//初始化统计报表（反恐利剑）
export function initReportFormMenu(menu) {
    return { type: REPORTFORM_MENU_INIT, menu: menu };
}

// 洛阳
//初始化盘查管理菜单
export function initInventoryManagementMenu(menu) {
    return { type: INVENTORYMANAGEMENT_MENU_INIT, menu: menu };
}
//初始化统计报表菜单_洛阳
export function initReportLYMenu(menu) {
    return { type: REPORT_LY_MENU_INIT, menu: menu };
}
//初始化临控管理菜单_洛阳
export function initDefineWareLYMenu(menu) {
    return { type: DEFINEWARE_LY_MENU_INIT, menu: menu };
}
//初始化卡口管理菜单
export function initCustomManagementMenu(menu) {
    return { type: CUSTOMMANAGEMENT_MENU_INIT, menu: menu };
}
//初始化任务管理菜单
export function initTaskManagementMenu(menu) {
    return { type: TASKMANAGEMENT_MENU_INIT, menu: menu };
}
//管控人员菜单
export function initControlPersonnelMenu(menu) {
    return { type: CONTROLPERSONNEL_MENU_INIT, menu: menu };
}
//系统设置菜单
export function initSyetemSetupMenu(menu) {
    return { type: SYSREMSETUP_MENU_INIT, menu: menu };
}

//个人中心菜单初始化
export const PERSONALCENTER_MENU_INIT = 'personalcenter_menu_init';
//动态管控菜单初始化
export const DYNAMICCONTROL_MENU_INIT = 'dynamiccontrol_menu_init';
//智能检索菜单初始化
export const INTELLIGENTRETRIEVAL_MENU_INIT = 'intelligentretrieval_menu_init';
//设置管理菜单初始化
export const SYSTEMMANAGEMENT_MENU_INIT = 'systemmanagement_menu_init';
//设置卡点管理菜单初始化
export const AREAMANAGEMENT_MENU_INIT = 'areaManagement_menu_init';
//设置智能检索初始化
export const INTELLIGENTRETRIEVA_MENU_INIT = 'intelligentretrieva_menu_init';
//设置统计报表初始化（呼市）
export const REPORTFORMS_MENU_INIT = 'reportforms_menu_init';
//设置统计报表初始化(反恐利剑)
export const REPORTFORM_MENU_INIT = 'reportform_menu_init';
//研判报告初始化
export const AUDITREPOT_MENU_INIT = 'auditreport_menu_init';
//设置盘查管理初始化--洛阳
export const INVENTORYMANAGEMENT_MENU_INIT = 'InventoryManagement_menu_init';
//设置任务管理初始化--洛阳
export const TASKMANAGEMENT_MENU_INIT = 'TaskManagement_menu_init';
//设置任务管理初始化--管控人员-呼市
export const CONTROLPERSONNEL_MENU_INIT = 'Controlpersonnel_menu_init';
//设置任务管理初始化--管控人员-呼市
export const SYSREMSETUP_MENU_INIT = 'SystemSetup_menu_init';
//设置盘查管理初始化--盘查管理-呼市
export const NVENTORYMANAGEMENT_MENU_HUSHI_INIT = 'InventoryManagement_menu_hushi_init';
//设置卡口管理初始化--洛阳
export const CUSTOMMANAGEMENT_MENU_INIT = 'CustomManagement_menu_init';
//设置统计报表初始化--洛阳
export const REPORT_LY_MENU_INIT = 'Report_ly_menu_init';
//设置临控管理初始化--洛阳
export const DEFINEWARE_LY_MENU_INIT = 'DefineWare_ly_menu_init';
//tab标签切换
export function changeTab(tab, type, moduleName) {
    if (moduleName === constants.INTERROGATIONDETAILS_MODULE) {//动态管控模块
        if (type == 'openAndClose') {
        } else if (type == 'getData') {
            return { type: INTERROGATIONDETAILS_TAB_CHANGE_CURRENT, tab: tab };
        }
    } else if (moduleName === constants.ELETRO_MODULE) {//
        if (type == 'openAndClose') {
        } else if (type == 'getData') {
            return { type: ELECTRO_TAB_CHANGE_CURRENT, tab: tab };
        }
    }
}


//设置导航栏选中项变换常量
export const NAVIGATION_CHANGE = 'navigation_change';
//导航栏切换
export function changeNavigation(navigationPath) {
    return { type: NAVIGATION_CHANGE, navigationPath: navigationPath, navigations: store.getState().root.uiData.navigations };
}
//设置遮罩状态常量
export const SHADE_CHANGE = 'shade_change';
//导航栏切换
export function changeShade(isBlock) {
    return { type: SHADE_CHANGE, isBlock: isBlock };
}


//获取人省市级联信息
export const AREA_PROVINCE_DATA = 'area_province_data';
export const AREA_PROVINCE_ERROR = 'area_province_error';
//获取省份集合
export function fetchAreaProvinceData(path, search = '') {
    return dispatch => {
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedAreaProvinceData(json));
        }).catch((e) => {
            dispatch(receivedAreaProvinceError(e.toString()))
        });
    }
}
export function receivedAreaProvinceData(data) {
    return { type: AREA_PROVINCE_DATA, data: data }
}
export function receivedAreaProvinceError(message) {
    return { type: AREA_PROVINCE_ERROR, message: message }
}

export const AREA_CITY_DATA = 'area_city_data';
export const AREA_CITY_ERROR = 'area_city_error';
//获取城市集合
export function fetchAreaCityData(path, search = '', project = '') {
    return dispatch => {
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedAreaCityData(json, project));
        }).catch((e) => {
            dispatch(receivedAreaCityError(e.toString()))
        });
    }
}
export function receivedAreaCityData(data, project) {
    return { type: AREA_CITY_DATA, data: data, project: project }
}
export function receivedAreaCityError(message) {
    return { type: AREA_CITY_ERROR, message: message }
}


//获取字典集合
export function fetchDict(path, search = '', type = '') {
    if (type === constants.DICT_TERROR_TYPE) { //涉类别
        return dispatch => {
            get(api + path, search).then((json) => {
                dispatch(receivedTerrorTypeData(json));
            }).catch((e) => {
                dispatch(receivedTerrorTypeError(e.toString()))
            });
        }

    } else if (type === constants.DICT_JUDGMENT_LEVEL) { //研判级别
        return dispatch => {
            get(api + path, search).then((json) => {
                dispatch(receivedJudgmentLevelData(json));
            }).catch((e) => {
                dispatch(receivedJudgmentLevelError(e.toString()))
            });
        }
    } else if (type === constants.DICT_DISPOSITIONL) { //处置措施
        return dispatch => {
            get(api + path, search).then((json) => {
                dispatch(receivedDispositionlData(json));
            }).catch((e) => {
                dispatch(receivedDispositionlError(e.toString()))
            });
        }
    }
}

//研判级别字典
export const JUDGMENT_LEVEL_DATA = 'judgment_level_data';
export const JUDGMENT_LEVEL_ERROR = 'judgment_level_error';
export function postjudmentlevelData(creds) {
    let path = '/data/selectcodeall'
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch(receivedJudgmentLevelData(json));
        }).catch((e) => {
            dispatch(receivedJudgmentLevelError(e.toString()))
        });
    }
}
export function receivedJudgmentLevelData(data) {
    return { type: JUDGMENT_LEVEL_DATA, data: data }
}
export function receivedJudgmentLevelError(message) {
    return { type: JUDGMENT_LEVEL_ERROR, message: message }
}

//涉恐类别字典
export const TERROR_TYPE_DATA = 'terror_type_data';
export const TERROR_TYPE_ERROR = 'terror_type_error';
export function postTerrortypeData(creds) {
    let path = '/data/selectcodeall'
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch(receivedTerrorTypeData(json));
        }).catch((e) => {
            dispatch(receivedTerrorTypeError(e.toString()))
        });
    }
}
export function receivedTerrorTypeData(data) {
    return { type: TERROR_TYPE_DATA, data: data }
}
export function receivedTerrorTypeError(message) {
    return { type: TERROR_TYPE_ERROR, message: message }
}

//处置措施字典
export const DISPOSITIONL_DATA = 'dispositionl_data';
export const DISPOSITIONL_ERROR = 'dispositionl_error';
export function postDispositionlData(creds) {
    let path = '/data/selectcodeall'
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch(receivedDispositionlData(json));
        }).catch((e) => {
            dispatch(receivedDispositionlError(e.toString()))
        });
    }
}
export function receivedDispositionlData(data) {
    return { type: DISPOSITIONL_DATA, data: data }
}
export function receivedDispositionlError(message) {
    return { type: DISPOSITIONL_ERROR, message: message }
}


//获取警员单位集合
export const POLICE_UNITS_DATA = 'police_units_data';
export const POLICE_UNITS_ERROR = 'police_units_error';
export function fetchPoliceUnitsData(creds) {
    let path = '/data/getUnits';
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch(receivedPoliceUnitsData(json));
        }).catch((e) => {
            dispatch(receivedPoliceUnitsError(e.toString()))
        });
    }
}
export function receivedPoliceUnitsData(data) {
    return { type: POLICE_UNITS_DATA, data: data }
}
export function receivedPoliceUnitsError(message) {
    return { type: POLICE_UNITS_ERROR, message: message }
}

//获取人员标签集合
export const PERSON_TAGS_DATA = 'person_tags_data';
export const PERSON_TAGS_ERROR = 'person_tags_error';
export function fetchPersonTagsData() {
    let path = '/sys/getSysCodeList'
    let creds = {
        currentPage: 1,
        entityOrField: true,
        pd: {
            prefix: "101",
            level: "2",
            status: "1"
        },
        showCount: 9999
    }   ////http://172.19.12.147:8888/sys/getSysCodeList
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch(receivedPersonTagsData(json));
        }).catch((e) => {
            dispatch(receivedPersonTagsError(e.toString()))
        });
    }
}
export function receivedPersonTagsData(data) {
    return { type: PERSON_TAGS_DATA, data: data }
}
export function receivedPersonTagsError(message) {
    return { type: PERSON_TAGS_ERROR, message: message }
}

//获取车辆标签集合
export const CAR_TAGS_DATA = 'car_tags_data';
export const CAR_TAGS_ERROR = 'car_tags_error';
export function fetchCarTagsData() {
    let path = '/sys/getSysCodeList';
    let creds = {
        currentPage: 1,
        entityOrField: true,
        pd: {
            prefix: "106",
            level: "2",
            status: "1"
        },
        showCount: 9999
    }
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch(receivedCarTagsData(json));
        }).catch((e) => {
            dispatch(receivedCarTagsError(e.toString()))
        });
    }
}
export function receivedCarTagsData(data) {
    return { type: CAR_TAGS_DATA, data: data }
}
export function receivedCarTagsError(message) {
    return { type: CAR_TAGS_ERROR, message: message }
}




//路由变更
export const ROUTING_CHANGE = 'routing_change';
//路由变更方法
export function routingChange(routing) {

    return { type: ROUTING_CHANGE, data: routing };
}

// 修改密码
export const MODIFIY_PASSWORD = 'modifiy_password';
export const MODIFIY_PASSWORD_ERROR = 'modifiy_password_error';
export function postModifiypaddword(creds, statusFalse) {
    let path = '/login/updatePassword';
    return dispatch => {
        post(securityCenterUrls + path, creds).then((json) => {
            dispatch(receivedModifiyPassword(json));
            console.log(json);
            if (json.reason === null) {
                console.log(2222);
                statusFalse();
                sessionStorage.clear()
            } else {
                console.log(3333);
                message.error("提示：" + json.reason.text);

            }
        }).catch((e) => {
            dispatch(receivedModifiyPasswordError(e.toString()))
        });
    }
}
export function receivedModifiyPassword(data) {
    return { type: MODIFIY_PASSWORD, data: data }
}
export function receivedModifiyPasswordError(message) {
    return { type: MODIFIY_PASSWORD_ERROR, message: message }
}

// export function fetchUnitTreeData(id) {

//     let nr;
//     let random = '1001'+Math.round(Math.random()*10)+'';
//     if(id ==='0'){
//         nr = [{
//             label: '高一',
//             value: '1001',
//             key: '1001',
//         }, {
//             label: '高二',
//             value: '2001',
//             key: '2001',
//         }, {
//             label: '高三',
//             value: '3001',
//             key: '3001',
//         }];
//     }else{
//         nr =[{
//             label: 'test001',
//             value: random+id +'001',
//             key: random+id +'001',
//         }, {
//             label: 'test002',
//             value: random+id +'002',
//             key: random+id +'002',
//         }, {
//             label: 'test003',
//             value: random+id +'003',
//             key: random+id +'003',
//         }]
//     }

//     let path = '/getTreeDataTest';
//     let creds={
//         nr:nr,

//         currentPage:1,
//         entityOrField:true,
//         pd:{
//             id:id
//         },
//         showCount: 9999
//     }
//     return dispatch => {
//         post('http://www.easy-mock.com/mock/591d5f109aba4141cf2736c6/fklj2' + path,creds).then((json) => {

//             // store.getState().root.data.unitTreeList = json.result;
//             if(id === '0'){
//                 dispatch(receivedUnitTreeData(json));
//             }else{
//                 dispatch({type: 'unit_temp_tree_data', data: json});
//             }
//         }).catch((e)=>{
//             dispatch(receivedUnitTreeError(e.toString()))
//         });
//     }
// }
// export const UNIT_TREE_DATA = 'unit_tree_data';
// export const UNIT_TREE_ERROR = 'unit_tree_error';
// export function receivedUnitTreeData(data) {
//     return {
//         type: UNIT_TREE_DATA,
//         data: data
//     }
// }
// export function receivedUnitTreeError(message) {
//     return {
//         type: UNIT_TREE_ERROR,
//         message: message
//     }
// }