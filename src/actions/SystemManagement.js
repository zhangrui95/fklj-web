// 系统管理模块-action
import {api} from "./actions";
import {post, get, put} from "./request";
import * as constants from "../utils/Constants";
import {store} from '../index.js';
import {message} from 'antd';

//获取涉恐软件
export const HORRORSOFTWARE_DATA = 'horrorsoftware-data';
export const HORRORSOFTWARE_ERROR = 'horrorsoftware-error';

export function fetchHorrorSoftwareData(path, search = '') {
    return dispatch => {
        dispatch({type: "REQUEST_HORRORSOFTWARE_SYSTEM"});
        fetch(api + path + '?' + search)//请求
            .then((res) => res.json())
            .then((json) => {
                dispatch(receivedHorrorSoftwareData(json))
            })
            .catch((e) => {
                dispatch(receivedHorrorSoftwareError(e.toString()))
            });
    }
}

export function getHorrorSoftwareData(path, search = '') {
    return dispatch => {
        dispatch({type: "REQUEST_HORRORSOFTWARE_SYSTEM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedHorrorSoftwareData(json));
        }).catch((e) => {
            dispatch(receivedHorrorSoftwareError(e.toString()))
        });
        ;
    }
}

export function PostHorrorSoftwareData(creds) {
    let path  = '/data/selectcodeall';
    return dispatch => {
        dispatch({type: "REQUEST_HORRORSOFTWARE_SYSTEM"});
        post(api + path, creds).then((json) => {
            dispatch(receivedHorrorSoftwareData(json));
        }).catch((e) => {
            dispatch(receivedHorrorSoftwareError(e.toString()))
        });
        ;
    }
}

export function receivedHorrorSoftwareData(data) {
    return {type: HORRORSOFTWARE_DATA, data: data}
}

export function receivedHorrorSoftwareError(message) {
    return {type: HORRORSOFTWARE_ERROR, message: message}
}

//保存涉恐软件  增加
export function addHorrorSoftwareData(creds,params) {
    let path = "/data/savecodeall"
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = params
                message.success('保存成功！');
                store.dispatch(PostHorrorSoftwareData(creds));
                
            }else{
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });
        ;
    }
}
export function updateHorrorSoftwareData(creds,params) {
    let path = "/data/updatecodeall"
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = params
                store.dispatch(PostHorrorSoftwareData(creds));
                
            }else{
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });
        ;
    }
}

//删除涉恐软件
export function DeleteHorrorSoftwareData(creds,params) {
    return dispatch => {
        post(api + "/data/delecodeall",creds).then((json) => {
           let creds = params;
            store.dispatch(PostHorrorSoftwareData(creds));
        }).catch((e) => {
        });
        ;
    }
}
//获取人工盘查信息-特征盘查设置
export const INTERROGATIONINFORMATION_DATA = 'interrogationinformation-data';
export const INTERROGATIONINFORMATION_ERROR = 'interrogationinformation-error';

export function fetchInterrogationInformationData(path) {
    return dispatch => {
        dispatch({type: "REQUEST_INTERROGATIONINFORMATION_SYSTEM"});
        post(api + path).then((json) => {
            dispatch(receivedInterrogationInformationData(json));
        }).catch((e) => {
            dispatch(receivedInterrogationInformationError(e.toString()))
        });
        ;
    }
}

export function PostInterrogationInformationData(creds) {
    let path  = '/data/selectcodeall';
    return dispatch => {
        dispatch({type: "REQUEST_INTERROGATIONINFORMATION_SYSTEM"});
        post(api + path, creds).then((json) => {
            dispatch(receivedInterrogationInformationData(json));
        }).catch((e) => {
            dispatch(receivedInterrogationInformationError(e.toString()))
        });
        ;
    }
}

export function receivedInterrogationInformationData(data) {
    return {type: INTERROGATIONINFORMATION_DATA, data: data}
}

export function receivedInterrogationInformationError(message) {
    return {type: INTERROGATIONINFORMATION_ERROR, message: message}
}

//添加人工盘查
export function addInterrogationInformationData(creds,params) {
    let path = "/data/savecodeall";
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = params
                message.success('保存成功！');
                store.dispatch(PostInterrogationInformationData(creds));
               
            }else{
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });
        ;
    }
}

//修改人工盘查
export function saveIntrrrogationList(creds,params) {
    let path = "/data/updatecodeall";
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = params
                message.success('保存成功！');
                store.dispatch(PostInterrogationInformationData(creds));
                
            }else{
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });
        ;
    }
}

//删除
export function DeleteInterrogationInformationData(creds,params) {

    return dispatch => {
        post(api + "/data/delecodeall",creds).then((json) => {
           let creds = params
            message.success('删除成功！');
             store.dispatch(PostInterrogationInformationData(creds));
        }).catch((e)=>{
        });
    }
}

//获取盘异常提醒参数-系统管理
export const EXCEPTIONPARAMETERREMINDER_DATA = 'exceptionparameterreminder-data';
export const EXCEPTIONPARAMETERREMINDER_ERROR = 'exceptionparameterreminder-error';

export function fetchExceptionParameterReminderData(path, search = '') {
    return dispatch => {
        dispatch({type: "REQUEST_EXCEPTIONPARAMETERREMINDER_SYSTEM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedExceptionParameterReminderData(json));
        }).catch((e) => {
            dispatch(receivedExceptionParameterReminderError(e.toString()))
        });
        ;
    }

}

export function getExceptionParameterReminderData(path, search = '') {
    return dispatch => {
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedExceptionParameterReminderData(json));
        }).catch((e) => {
            dispatch(receivedExceptionParameterReminderError(e.toString()))
        });
        ;
    }
}

export function postExceptionParameterReminderData(creds) {
    let path = '/data/selectcodeall'
    return dispatch => {
        post(api + path , creds).then((json) => {
            dispatch(receivedExceptionParameterReminderData(json));
        }).catch((e)=>{
            dispatch(receivedExceptionParameterReminderError(e.toString()))
        });
    }
}

export function receivedExceptionParameterReminderData(data) {
    return {type: EXCEPTIONPARAMETERREMINDER_DATA, data: data}
}

export function receivedExceptionParameterReminderError(message) {
    return {type: EXCEPTIONPARAMETERREMINDER_ERROR, message: message}
}

//保存异常提醒参数
export function saveExceptionParameterReminderData(creds) {
    let path = "/data/updatecodeall";
    return dispatch => {
        post(api + path,creds).then((json) => {
            if(json.reason === null){
                let creds = {
                    currentPage: 1,
                    entityOrField: true,
                    pd: {
                        pid:"200"
                    },
                    showCount: 10,
                }
                message.success('保存成功');
                 store.dispatch(postExceptionParameterReminderData(creds));
                
                // fun();
            }else{
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });
        ;
    }
}

//获取黑名单信息
export const BLACKLIST_DATA = 'blacklist-data';
export const BLACKLIST_ERROR = 'blacklist-error';

export function fetchBlackListData(path, search = '') {

    return dispatch => {
        dispatch({type: "REQUEST_BLACKLIST_SYSTEM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedBlackListData(json));
        }).catch((e) => {
            dispatch(receivedBlackListError(e.toString()))
        });
        ;
    }
}

export function PostBlackListData(creds) {
    let path = '';
    return dispatch => {
        dispatch({type: "REQUEST_BALCKLIST_SYSTEM"});
        post(api + path, creds).then((json) => {
            dispatch(receivedBlackListData(json));
        }).catch((e) => {
            dispatch(receivedBlackListError(e.toString()))
        });
        ;
    }
}

export function receivedBlackListData(data) {
    return {type: BLACKLIST_DATA, data: data}
}

export function receivedBlackListError(message) {
    return {type: BLACKLIST_ERROR, message: message}
}

//保存黑名单(增加)
export function addBlackData(creds, fun) {
    let path = "/";
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = {
                    currentPage: 1,
                    entityOrField: true,
                    pd: {},
                    showCount: constants.pageSize
                }
                store.dispatch(PostBlackListData(creds));
                fun();
            } else {
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });
        ;
    }
}

//修改更新
export function updateBlackData(creds, fun) {
    let path = "/";
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = {
                    currentPage: 1,
                    entityOrField: true,
                    pd: {},
                    showCount: constants.pageSize
                }
                store.dispatch(PostBlackListData(creds));
                fun();
            } else {
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });
        ;
    }
}

//删除 黑名单
export function DeleteBlackListData(creds, fun) {

    return dispatch => {
        post(api + "/", creds).then((json) => {
            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {},
                showCount: constants.pageSize
            }
            store.dispatch(PostBlackListData(creds));
        }).catch((e) => {
        });
        ;
    }
}

//获取白名单信息
export const WHITELIST_DATA = 'whitelist-data';
export const WHITELIST_ERROR = 'whitelist-error';

export function fetchWhiteListData(path, search = '') {
    return dispatch => {
        dispatch({type: "REQUEST_WHITELIST_SYSTEM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedWhiteListData(json));
        }).catch((e) => {
            dispatch(receivedWhiteListError(e.toString()))
        });
        ;
    }
}

export function PostWhiteListData(creds) {
    let path = '';
    return dispatch => {
        dispatch({type: "REQUEST_WHITELIST_SYSTEM"});
        post(api + path, creds).then((json) => {
            dispatch(receivedWhiteListData(json));
        }).catch((e) => {
            dispatch(receivedWhiteListError(e.toString()))
        });
        ;
    }
}

export function receivedWhiteListData(data) {
    return {type: WHITELIST_DATA, data: data}
}

export function receivedWhiteListError(message) {
    return {type: WHITELIST_ERROR, message: message}
}

//保存白名单
export function addWhiteData(creds, fun) {
    let path = "/";
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = {
                    currentPage: 1,
                    entityOrField: true,
                    pd: {},
                    showCount: constants.pageSize
                }
                store.dispatch(PostWhiteListData(creds));
                fun();
            } else {
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });
        ;
    }
}

export function updateWhiteData(creds, fun) {
    let path = "/";
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = {
                    currentPage: 1,
                    entityOrField: true,
                    pd: {},
                    showCount: constants.pageSize
                }
                store.dispatch(PostWhiteListData(creds));
                fun();
            } else {
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });
        ;
    }
}

//删除 白名单
export function DeleteWhiteListData(creds, fun) {

    return dispatch => {
        post(api + "/", creds).then((json) => {
            let creds = {
                currentPage: 1,
                entityOrField: true,
                pd: {},
                showCount: constants.pageSize
            }
            store.dispatch(PostWhiteListData(creds));
        }).catch((e) => {
        });
        ;
    }
}

//获取高危城市信息
//高危城市
export const HIGHRISKCITIES_DATA = 'highriskcities-data';
export const HIGHRISKCITIES_ERROR = 'highriskcities-error';

export function fetchHighRiskCitiesData(path, search = '') {
    return dispatch => {
        dispatch({type: "REQUEST_HIGHRISKCITIES_SYSTEM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedHighRiskCitiesData(json));
        }).catch((e) => {
            dispatch(receivedHighRiskCitiesError(e.toString()))
        });
        ;
    }
}

export function PostHighRiskCityData(creds) {
    let path = '';
    return dispatch => {
        dispatch({type: "REQUEST_HIGHRISKCITIES_SYSTEM"});
        post(api + path, creds).then((json) => {
            dispatch(receivedHighRiskCitiesData(json));
        }).catch((e) => {
            dispatch(receivedHighRiskCitiesError(e.toString()))
        });
        ;
    }
}

//保存高危城市
export function saveHighRiskCitiesData(creds, fun) {
    let path = '';
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = {
                    currentPage: 1,
                    entityOrField: true,
                    pd: {},
                    showCount: constants.pageSize
                }
                store.dispatch(PostHighRiskCityData(creds));
                fun();
            } else {
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });
        ;
    }
}

export function updateHighRiskCitiesData(creds, fun) {
    let path = '';
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = {
                    currentPage: 1,
                    entityOrField: true,
                    pd: {},
                    showCount: constants.pageSize
                }
                store.dispatch(PostHighRiskCityData(creds));
                fun();
            } else {
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });
        ;
    }
}

export function receivedHighRiskCitiesData(data) {
    return {type: HIGHRISKCITIES_DATA, data: data}
}

export function receivedHighRiskCitiesError(message) {
    return {type: HIGHRISKCITIES_ERROR, message: message}
}

//高危线路
export const HIGHRISKLINE_DATA = 'highriskline-data';
export const HIGHRISKLINE_ERROR = 'highriskline-error';

export function fetchHighRiskLineData(path, search = '') {
    return dispatch => {
        dispatch({type: "REQUEST_HIGHRISKLINE_SYSTEM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedHighRiskLineData(json));
        }).catch((e) => {
            dispatch(receivedHighRiskLineError(e.toString()))
        });
        ;
    }
}

export function PostHighRiskLineData(creds) {
    let path  = '/data/getHighRistlistPage';
    return dispatch => {
        dispatch({type: "REQUEST_HIGHRISKLINE_SYSTEM"});
        post(api + path, creds).then((json) => {
            dispatch(receivedHighRiskLineData(json));
        }).catch((e) => {
            dispatch(receivedHighRiskLineError(e.toString()))
        });
        ;
    }
}

export function receivedHighRiskLineData(data) {
    return {type: HIGHRISKLINE_DATA, data: data}
}

export function receivedHighRiskLineError(message) {
    return {type: HIGHRISKLINE_ERROR, message: message}
}

//保存高危线路

export function saveHighRiskLineData(creds,fun) {
    let path = '/data/saveHighRist';
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = {
                    currentPage: 1,
                    entityOrField: true,
                    pd: {},
                    showCount: constants.pageSize
                }
                store.dispatch(PostHighRiskLineData(creds));
                fun();
            } else {
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });
        ;
    }
}

export function updateHighRiskLineData(creds,fun) {
    let path = '/data/updateHighRist';
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = {
                    currentPage: 1,
                    entityOrField: true,
                    pd: {},
                    showCount: constants.pageSize
                }
                store.dispatch(PostHighRiskLineData(creds));
                fun();
            } else {
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });
        ;
    }
}

export function DeleteHighRiskLineData(creds, fun) {

    return dispatch => {
        post(api + "/data/DelBatchHighRist",creds).then((json) => {
           let creds = {
                currentPage:1,
                entityOrField:true,
                pd:{
                },
                showCount: constants.pageSize
            }
            store.dispatch(PostHighRiskLineData(creds));
        }).catch((e) => {
        });
        ;
    }
}


//获取原籍地联系人信息
export const PLACEOFORIGINPERSON_DATA = 'placeoforiginperson-data';
export const PLACEOFORIGINPERSON_ERROR = 'placeoforiginperson-error';

export function fetchPlaceOfOriginPersonData(path, search = '') {
    return dispatch => {
        dispatch({type: "REQUEST_PLACEOFORIGINPERSON_SYSTEM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedPlaceOfOriginPersonData(json));
        }).catch((e) => {
            dispatch(receivedPlaceOfOriginPersonError(e.toString()))
        });
        ;
    }
}

export function PostPlaceOfOriginPersonData(creds) {

    let path  = '/data/getdomicilepolicelistPage';
    return dispatch => {
        dispatch({type: "REQUEST_PLACEOFORIGINPERSON_SYSTEM"});
        post(api + path, creds).then((json) => {
            dispatch(receivedPlaceOfOriginPersonData(json));
        }).catch((e) => {
            dispatch(receivedPlaceOfOriginPersonError(e.toString()))
        });
        ;
    }
}

export function receivedPlaceOfOriginPersonData(data) {
    return {type: PLACEOFORIGINPERSON_DATA, data: data}
}

export function receivedPlaceOfOriginPersonError(message) {
    return {type: PLACEOFORIGINPERSON_ERROR, message: message}
}

//保存原籍地
export function addPlaceOfOriginPersonData(creds,params) {
     let path = '/data/savedomicilepolice';
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = params
                store.dispatch(PostPlaceOfOriginPersonData(creds));
                
            }else{
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });
        ;
    }
}
export function updatePlaceOfOriginPersonData(creds,params) {
    let path = '/data/updatedomicilepolice';
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = params
                store.dispatch(PostPlaceOfOriginPersonData(creds));
               
            }else{
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });
        ;
    }
}

//删除
export function DeletePlaceOfOriginPersonData(creds,params) {

    return dispatch => {
        post(api + "/data/DelBatchdomicilepolice",creds).then((json) => {
           let creds = params
            store.dispatch(PostPlaceOfOriginPersonData(creds));
        }).catch((e) => {
        });
        ;
    }
}

//获取流入地联系人信息
export const PLACEOFINFLUXPERSON_DATA = 'placeofinfluxperson-data';
export const PLACEOFINFLUXPERSON_ERROR = 'placeofinfluxperson-error';

export function fetchPlaceOfInfluxPersonData(path, search = '') {
    return dispatch => {
        dispatch({type: "REQUEST_PLACEOFINFLUXPERSON_SYSTEM"});
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedPlaceOfInfluxPersonData(json));
        }).catch((e) => {
            dispatch(receivedPlaceOfInfluxPersonError(e.toString()))
        });
        ;
    }
}

export function PostPlaceOfInfluxPersonData(creds) {
    let path  = '/data/getdomicilepolicelistPage';
    return dispatch => {
        dispatch({type: "REQUEST_PLACEOFINFLUXPERSON_SYSTEM"});
        post(api + path, creds).then((json) => {
            dispatch(receivedPlaceOfInfluxPersonData(json));
        }).catch((e) => {
            dispatch(receivedPlaceOfInfluxPersonError(e.toString()))
        });
        ;
    }
}

export function receivedPlaceOfInfluxPersonData(data) {
    return {type: PLACEOFINFLUXPERSON_DATA, data: data}
}

export function receivedPlaceOfInfluxPersonError(message) {
    return {type: PLACEOFINFLUXPERSON_ERROR, message: message}
}

//保存流入地
export function addPlaceOfInfluxPersonData(creds,params) {
    let path = '/data/savedomicilepolice';
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = params
                store.dispatch(PostPlaceOfInfluxPersonData(creds));
                
            }else{
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });
        ;
    }
}
export function updatePlaceOfInfluxPersonData(creds,params) {
    let path = '/data/updatedomicilepolice';
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = params
                store.dispatch(PostPlaceOfInfluxPersonData(creds));
                
            }else{
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });
        ;
    }
}

//删除
export function DeletePlaceOfInfluxPersonData(creds,params) {

    return dispatch => {
        post(api + "/data/DelBatchdomicilepolice",creds).then((json) => {
           let creds = params
            store.dispatch(PostPlaceOfInfluxPersonData(creds));
        }).catch((e) => {
        });
        ;
    }
}

//获取红名单
export function receiveRedList(data) {
    return {type: 'GetRedLIst_DATA', data: data}
}


export function receiveRedListError(message) {
    return {type: 'GetRedLIst_DATA_ERROR', message: message}
}

export function GetRedList(creds) {
    const path = '/data/selectcodeall'
    return dispatch => {
        dispatch({type: "REQUEST_REDLIST_SYSTEM"});
        post(api + path, creds).then((json) => {
            dispatch(receiveRedList(json));
        }).catch((e) => {
            dispatch(receiveRedListError(e.toString()))
        });
        ;
    }
}

//添加红名单
export function  addRedList(creds) {
    let path = '/data/saveRedList';
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let param = {
                    currentPage: 1,
                    pd: {},
                    showCount: 10
                }
                store.dispatch(GetRedList( param));
            } else {
                message.error(json.reason.text);
            }
        }).catch((e) => {
            dispatch(receiveRedListError(e.toString()))
        });
        ;
    }
}

export function saveRedList(creds, nowPage) {
    let path = '/data/updateRedList';
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = {
                    currentPage: nowPage,
                    pd: {},
                    showCount: 10
                }
                store.dispatch(GetRedList( creds));
            } else {
                message.error(json.reason.text);
            }
        }).catch((e) => {
            dispatch(receiveRedListError(e.toString()))
        });
        ;
    }
}


//获取人省市级联信息
export const DEFAULT_PROVICE_DATA = 'default_provice_data'
export const PLACE_PROVINCE_DATA = 'place_province_data';
export const PLACE_PROVINCE_ERROR = 'place_province_error';
//获取省份集合
export function postPlaceProvinceData(id) {
    let path = '/data/getprovince';
    let creds={
        currentPage:1,
        entityOrField:true,
        pd:{
            pid:id
        },
    }
    return dispatch => {
        post(api + path , creds).then((json) => {
            if(id === '0'){
                dispatch(receivedPlaceProvinceData(json));
            }else{
                dispatch({type: 'province_temp_tree_data', data: json});
            }
            
        }).catch((e) => {
            dispatch(receivedPlaceProvinceError(e.toString()))
        });
    }
}
export function receivedPlaceProvinceData(data) {
    return {
        type: PLACE_PROVINCE_DATA,
        data: data
    }
}
export function receivedPlaceProvinceError(message) {
    return {
        type: PLACE_PROVINCE_ERROR,
        message: message
    }
}

export function delRedList(creds) {
    console.log(creds);
    let path = '/data/DelBatchRedList';
    return dispatch => {
        post(api + path, creds).then((json) => {

                let creds = {
                    currentPage: 1,
                    pd: {},
                    showCount: 10
                }
                store.dispatch(GetRedList( creds));

        }).catch((e) => {
            dispatch(receiveRedListError(e.toString()))
        });
    }
}

// export function fetchUnitTreeData(id) {
    
//         let nr;
//         let random = '1001'+Math.round(Math.random()*10)+'';
//         if(id ==='0'){
//             nr = [{
//                 label: '高一',
//                 value: '1001',
//                 key: '1001',
//             }, {
//                 label: '高二',
//                 value: '2001',
//                 key: '2001',
//             }, {
//                 label: '高三',
//                 value: '3001',
//                 key: '3001',
//             }];
//         }else{
//             nr =[{
//                 label: 'test001',
//                 value: random+id +'001',
//                 key: random+id +'001',
//             }, {
//                 label: 'test002',
//                 value: random+id +'002',
//                 key: random+id +'002',
//             }, {
//                 label: 'test003',
//                 value: random+id +'003',
//                 key: random+id +'003',
//             }]
//         }
    
//         let path = '/data/getprovince';
//         console.log('id',id);
//         let creds={
//            // nr:nr,
    
//             currentPage:1,
//             entityOrField:true,
//             pd:{
//                 pid:id
//             },
//            // showCount: 9999
//         }
//         return dispatch => {
//             post(api + path,creds).then((json) => {
    
//                 // store.getState().root.data.unitTreeList = json.result;
//                 //http://www.easy-mock.com/mock/591d5f109aba4141cf2736c6/fklj2/getTreeDataTest
//                 if(id === '0'){
                   
//                     dispatch(receivedUnitTreeData(json));
//                 }else{
                    
//                     dispatch({type: 'province_temp_tree_data', data: json});
//                 }
//             }).catch((e)=>{
//                 dispatch(receivedUnitTreeError(e.toString()))
//             });
//         }
//     }
//     export const UNIT_TREE_DATA = 'unit_tree_data';
//     export const UNIT_TREE_ERROR = 'unit_tree_error';
//     export function receivedUnitTreeData(data) {
//         return {
//             type: UNIT_TREE_DATA,
//             data: data
//         }
//     }
//     export function receivedUnitTreeError(message) {
//         return {
//             type: UNIT_TREE_ERROR,
//             message: message
//         }
//     }

//获取编码表树状信息
export const DEFAULT_CODE_DATA = 'default_code_data'
export const CODE_DATA = 'code_data';
export const CODE_ERROR = 'code_error';
//获取编码
export function postCodeData(id) {
    let path = '/data/selectcodeall';
    let creds={
        currentPage:1,
        entityOrField:true,
        pd:{
            pid:id
        },
        showCount: 999
    }
    return dispatch => {
        
        post(api + path , creds).then((json) => {
            if(id === '0'){
                dispatch(receivedCodeData(json));
            }else{
                dispatch({type: 'code_temp_tree_data', data: json});
            }
            
        }).catch((e) => {
            dispatch(receivedCodeError(e.toString()))
        });
    }
}
export function receivedCodeData(data) {
    return {
        type: CODE_DATA,
        data: data
    }
}
export function receivedCodeError(message) {
    return {
        type: CODE_ERROR,
        message: message
    }
}

//获取编码表返回的字段信息
export const DEFAULT_CODE_TABLE_DATA = 'default_code_table_data'
export const CODE_TABLE_DATA = 'code_table_data';
export const CODE_TABLE_ERROR = 'code_table_error';
//获取编码
export function postCodeTableData(creds) {
    let path = '/data/selectcodeall';
    
    return dispatch => {
        dispatch({type: "REQUEST_CODELIST_SYSTEM"});
        post(api + path , creds).then((json) => {
            
                dispatch(receivedCodeTableData(json));
                        
        }).catch((e) => {
            dispatch(receivedCodeTableError(e.toString()))
        });
    }
}
export function receivedCodeTableData(data) {
    return {
        type: CODE_TABLE_DATA,
        data: data
    }
}
export function receivedCodeTableError(message) {
    return {
        type: CODE_TABLE_ERROR,
        message: message
    }
}

//保存
export function addpostCodeTableData(creds,params) {
    let path = '/data/savecodeall';
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = params
                store.dispatch(postCodeTableData(creds));
                store.dispatch(postCodeData('0'));
            }else{
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });
        ;
    }
}
export function updatepostCodeTableData(creds,params) {
    let path = '/data/updatecodeall';
    return dispatch => {
        post(api + path, creds).then((json) => {
            if (json.reason === null) {
                let creds = params;
                store.dispatch(postCodeTableData(creds));
                
            }else{
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });
        ;
    }
}

//删除
export function DeletepostCodeTableData(creds) {

    return dispatch => {
        post(api + "/data/delecodeall",creds).then((json) => {
           let creds = {
                currentPage:1,
                entityOrField:true,
                pd:{
                },
                showCount: 10
            }
            store.dispatch(postCodeTableData(creds));
            store.dispatch(postCodeData('0'));
            message.success('删除成功！'); 
        }).catch((e) => {
        });
        ;
    }
}

