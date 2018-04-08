/*
研判报告-action
 */
import { api } from "./actions";
import { post, get, put } from "./request";
import { browserHistory } from "react-router";
import { message } from 'antd';

//获取常用资源-研判报告
export const COMMON_RESOURCES_DATA = 'common_resources_data';
export const COMMON_RESOURCES_ERROR = 'common_resources_error';
export function fetchCommonResourcesData(path, search = '') {
    return dispatch => {
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedCommonResourcesData(json));
        }).catch((e) => {
            dispatch(receivedCommonResourcesError(e.toString()))
        });;
    }
}
export function postCommonResourcesData(creds) {
    let path = '';
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch(receivedCommonResourcesData(json));
        }).catch((e) => {
            dispatch(receivedCommonResourcesError(e.toString()))
        });;
    }
}
export function receivedCommonResourcesData(data) {
    return { type: COMMON_RESOURCES_DATA, data: data }
}
export function receivedCommonResourcesError(message) {
    return { type: COMMON_RESOURCES_ERROR, message: message }
}
//获取研判历史-研判报告
export const JUDGE_HISTORY_DATA = 'judge_history_data';
export const JUDGE_HISTORY_ERROR = 'judge_history_error';
export function fetchJudgeHistoryData(path, search = '') {
    return dispatch => {
        get(api + path + '?' + search).then((json) => {
            dispatch(receivedJudgeHistoryData(json));
        }).catch((e) => {
            dispatch(receivedJudgeHistoryError(e.toString()))
        });;
    }
}
export function postJudgeHistoryData(creds) {
    let path = '/data/JudgeRecList'
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch(receivedJudgeHistoryData(json));
        }).catch((e) => {
            dispatch(receivedJudgeHistoryError(e.toString()))
        });;
    }
}
export function receivedJudgeHistoryData(data) {
    return { type: JUDGE_HISTORY_DATA, data: data }
}
export function receivedJudgeHistoryError(message) {
    return { type: JUDGE_HISTORY_ERROR, message: message }
}
// 编码
export const JUDGE_CODE_DATA = 'judge_code_data';
export const JUDGE_CODE_ERROR = 'judge_code_error';
export function postJudgeCodeData(creds) {
    let path = '/data/getJudgeId'
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch(receivedJudgeCodeData(json));
        }).catch((e) => {
            dispatch(receivedJudgeCodeError(e.toString()))
        });;
    }
}
export function receivedJudgeCodeData(data) {
    return { type: JUDGE_CODE_DATA, data: data }
}
export function receivedJudgeCodeError(message) {
    return { type: JUDGE_CODE_ERROR, message: message }
}
//获取基础信息
export const BASICINFORMATION_DATA = 'basicinformation_data';
export const BASICINFORMATION_ERROR = 'basicinformation_error';
export function postBasicInformationData(cread) {
    let path = '/data/getjuGXRKList';
    //let path ='';
    return dispatch => {
        post(api + path, cread).then((json) => {
            dispatch(receivedBasicInformationData(json));
        }).catch((e) => {
            dispatch(receivedBasicInformationError(e.toString()))
        });;
    }
}
export function receivedBasicInformationData(data) {
    return { type: BASICINFORMATION_DATA, data: data }
}
export function receivedBasicInformationError(message) {
    return { type: BASICINFORMATION_ERROR, message: message }
}
//修改基础信息的名字
export const EDIT_BASICNAME_DATA = 'edit_basicName_data';
export function editBasicNameData(creds) {
    return dispatch => {
        dispatch(receivedEditBasicNameData(creds));
    }

}
export function receivedEditBasicNameData(data) {
    return { type: EDIT_BASICNAME_DATA, data: data }
}
//基础信息-修改的时候
export const EDIT_BASICINFORMATION_DATA = 'edit_basicinformation_data';
export function editBasicInformationData(creds) {
    return dispatch => {
        dispatch(receivedEditBasicInformationData(creds));
    }

}
export function receivedEditBasicInformationData(data) {
    return { type: EDIT_BASICINFORMATION_DATA, data: data }
}

//获取网上通联信息
export const ONLINEINFORMATION_DATA = 'onlineinformation_data';
export const ONLINEINFORMATION_ERROR = 'onlineinformation_error';
export function fetchOnlineInformationData(search = '') {
    return dispatch => {
        get(api + "/getOnlineInformationList" + '?' + search).then((json) => {
            dispatch(receivedOnlineInformationData(json));
        }).catch((e) => {
            dispatch(receivedOnlineInformationError(e.toString()))
        });;
    }
}
export function postOnlineInformationData(creds) {
    let path = ''
    return dispatch => {
        dispatch({ type: "REQUEST_ONLINE_AUDITREPORT" });
        post(api + path, creds).then((json) => {
            dispatch(receivedOnlineInformationData(json));
        }).catch((e) => {
            dispatch(receivedOnlineInformationError(e.toString()))
        });;
    }
}
export function receivedOnlineInformationData(data) {
    return { type: ONLINEINFORMATION_DATA, data: data }
}
export function receivedOnlineInformationError(message) {
    return { type: ONLINEINFORMATION_ERROR, message: message }
}
//修改网上通联
export const EDIT_ONLINEINFORMATION_DATA = 'edit_onlineinformation_data';
export function editOnlineInformationData(creds) {
    return dispatch => {
        dispatch(receivedEditOnlineInformationData(creds));
    }

}
export function receivedEditOnlineInformationData(data) {
    return { type: EDIT_ONLINEINFORMATION_DATA, data: data }
}
//添加网上通联信息
export const ADD_ONLINEINFORMATION_DATA = 'add_onlineinformation_data';
export function addOnlineInformationData(creds) {
    return dispatch => {
        dispatch(receivedAddOnlineInformationData(creds));
    }

}
export function receivedAddOnlineInformationData(data) {
    return { type: ADD_ONLINEINFORMATION_DATA, data: data }
}
//删除网上通联
export const DELETE_ONLINEINFORMATION_DATA = 'delete_onlineinformation_data';
export function deleteOnlineInformationData(creds) {
    return dispatch => {
        dispatch(receivedDeleteOnlineInformationData(creds));
    }

}
export function receivedDeleteOnlineInformationData(data) {
    return { type: DELETE_ONLINEINFORMATION_DATA, data: data }
}
//获取银行信息
export const BANKINFORMATION_DATA = 'bankinformation_data';
export const BANKINFORMATION_ERROR = 'bankinformation_error';
export function fetchBankInformationData(search = '') {
    return dispatch => {
        get(api + "/getBankInformationList" + '?' + search).then((json) => {
            dispatch(receivedBankInformationData(json));
        }).catch((e) => {
            dispatch(receivedBankInformationError(e.toString()))
        });;
    }
}
export function postBankInformationData(creds) {
    let path = ''
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch(receivedBankInformationData(json));
        }).catch((e) => {
            dispatch(receivedBankInformationError(e.toString()))
        });;
    }
}
export function receivedBankInformationData(data) {
    return { type: BANKINFORMATION_DATA, data: data }
}
export function receivedBankInformationError(message) {
    return { type: BANKINFORMATION_ERROR, message: message }
}
//修改银行信息
export const EDIT_BANKINFORMATION_DATA = 'edit_bankinformation_data';
export function editBankInformationData(creds) {
    return dispatch => {
        dispatch(receivedEditBankInformationData(creds));
    }

}
export function receivedEditBankInformationData(data) {
    return { type: EDIT_BANKINFORMATION_DATA, data: data }
}
//添加银行信息
export const ADD_BANKINFORMATION_DATA = 'add_bankinformation_data';
export function addbankInformationData(creds) {
    return dispatch => {
        dispatch(receivedAddBankInformationData(creds));
    }

}
export function receivedAddBankInformationData(data) {
    return { type: ADD_BANKINFORMATION_DATA, data: data }
}
//删除银行信息
export const DELETE_BANKINFORMATION_DATA = 'delete_bankinformation_data';
export function deleteBankInformationData(creds) {
    return dispatch => {
        dispatch(receivedDeleteBankInformationData(creds));
    }

}
export function receivedDeleteBankInformationData(data) {
    return { type: DELETE_BANKINFORMATION_DATA, data: data }
}
//获取关联人信息
export const RELATEDPERSON_DATA = 'relatedPerson_data';
export const RELATEDPERSON_ERROR = 'relatedPerson_error';
export function fetchRelatedPersonData(search = '') {
    return dispatch => {
        get(api + "/getRelatedPersonList" + '?' + search).then((json) => {
            dispatch(receivedRelatedPersonData(json));
        }).catch((e) => {
            dispatch(receivedRelatedPersonError(e.toString()))
        });;
    }
}
export function postRelatedPersonData(creds) {
    let path = ''
    return dispatch => {
        dispatch({ type: "REQUEST_RELATED_AUDITREPORT" });
        post(api + path, creds).then((json) => {
            dispatch(receivedRelatedPersonData(json));
        }).catch((e) => {
            dispatch(receivedRelatedPersonError(e.toString()))
        });;
    }
}
export function receivedRelatedPersonData(data) {
    return { type: RELATEDPERSON_DATA, data: data }
}
export function receivedRelatedPersonError(message) {
    return { type: RELATEDPERSON_ERROR, message: message }
}
//修改关联人
export const EDIT_RELATEDPERSON_DATA = 'edit_RelatedPerson_data';
export function editRelatedPersonData(creds) {
    return dispatch => {
        dispatch(receivedEditRelatedPersonData(creds));
    }

}
export function receivedEditRelatedPersonData(data) {
    return { type: EDIT_RELATEDPERSON_DATA, data: data }
}
//添加关联人
export const ADD_RELATEDPERSON_DATA = 'add_RelatedPerson_data';
export function addRelatedPersonData(creds) {
    return dispatch => {
        dispatch(receivedAddRelatedPersonData(creds));
    }

}
export function receivedAddRelatedPersonData(data) {
    return { type: ADD_RELATEDPERSON_DATA, data: data }
}
//删除关联人
export const DELETE_RELATEDPERSON_DATA = 'delete_RelatedPerson_data';
export function deleteRelatedPersonData(creds) {
    return dispatch => {
        dispatch(receivedDeleteRelatedPersonData(creds));
    }

}
export function receivedDeleteRelatedPersonData(data) {
    return { type: DELETE_RELATEDPERSON_DATA, data: data }
}
//获取背景信息-同户信息
export const HOUSEHILDINFORMATION_DATA = 'householdInformation_data';
export const HOUSEHILDINFORMATION_ERROR = 'householdInformation_error';
export function fetchHouseholdInformationData(search = '') {
    return dispatch => {
        get(api + "/getBgInformationList" + '?' + search).then((json) => {
            dispatch(receivedHouseholdInformationData(json));
        }).catch((e) => {
            dispatch(receivedHouseholdInformationError(e.toString()))
        });;
    }
}
export function postHouseholdInformationData(creds) {
    let path = '/data/getjuTHList'
    return dispatch => {
        dispatch({ type: "REQUEST_HOUSEHOLD_AUDITREPORT" });
        post(api + path, creds).then((json) => {
            dispatch(receivedHouseholdInformationData(json));
        }).catch((e) => {
            dispatch(receivedHouseholdInformationError(e.toString()))
        });;
    }
}
export function receivedHouseholdInformationData(data) {
    return { type: HOUSEHILDINFORMATION_DATA, data: data }
}
export function receivedHouseholdInformationError(message) {
    return { type: HOUSEHILDINFORMATION_ERROR, message: message }
}
// 添加同户信息
export const ADD_HOUSEHOLINFORMATION_DATA = 'add_Householdinformation_data';
export function addHouseholdInformationData(creds) {
    return dispatch => {
        dispatch(receivedAddHouseholdInformationData(creds));
    }

}
export function receivedAddHouseholdInformationData(data) {
    return { type: ADD_HOUSEHOLINFORMATION_DATA, data: data }
}
//修改同户信息
export const EDIT_HOUSEHOLINFORMATION_DATA = 'edit_Householdinformation_data';
export function editHouseholdInformationData(creds) {
    return dispatch => {
        dispatch(receivedEditHouseholdInformationData(creds));
    }

}
export function receivedEditHouseholdInformationData(data) {
    return { type: EDIT_HOUSEHOLINFORMATION_DATA, data: data }
}
//删除同户信息
export const DELETE_HOUSEHOLINFORMATION_DATA = 'delete_Householdinformation_data';
export function deleteHouseholdInformationData(creds) {
    return dispatch => {
        dispatch(receivedDeleteHouseholdInformationData(creds));
    }

}
export function receivedDeleteHouseholdInformationData(data) {
    return { type: DELETE_HOUSEHOLINFORMATION_DATA, data: data }
}
//获取背景信息-户籍地核查domicilePlaceList
export const DOMICILEPLACE_DATA = 'domicilePlace_data';
export const DOMICILEPLACE_ERROR = 'domicilePlace_error';
export function fetchDomicilePlaceData(search = '') {
    return dispatch => {
        get(api + "/getBgInformationList" + '?' + search).then((json) => {
            dispatch(receivedDomicilePlaceData(json));
        }).catch((e) => {
            dispatch(receivedDomicilePlaceError(e.toString()))
        });;
    }
}
export function postDomicilePlaceData(creds) {
    let path = ''
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch(receivedDomicilePlaceData(json));
        }).catch((e) => {
            dispatch(receivedDomicilePlaceError(e.toString()))
        });;
    }
}
export function receivedDomicilePlaceData(data) {
    return { type: DOMICILEPLACE_DATA, data: data }
}
export function receivedDomicilePlaceError(message) {
    return { type: DOMICILEPLACE_ERROR, message: message }
}
// 添加户籍地
export const ADD_DOMICILEPLACE_DATA = 'add_DomicilePlace_data';
export function addDomicilePlaceData(creds) {
    return dispatch => {
        dispatch(receivedAddDomicilePlaceData(creds));
    }

}
export function receivedAddDomicilePlaceData(data) {
    return { type: ADD_DOMICILEPLACE_DATA, data: data }
}
//修改户籍地
export const EDIT_DOMICILEPLACE_DATA = 'edit_DomicilePlace_data';
export function editDomicilePlaceData(creds) {
    return dispatch => {
        dispatch(receivedEditDomicilePlaceData(creds));
    }

}
export function receivedEditDomicilePlaceData(data) {
    return { type: EDIT_DOMICILEPLACE_DATA, data: data }
}
//删除户籍地
export const DELETE_DOMICILEPLACE_DATA = 'delete_DomicilePlace_data';
export function deleteDomicilePlaceData(creds) {
    return dispatch => {
        dispatch(receivedDeleteDomicilePlaceData(creds));
    }

}
export function receivedDeleteDomicilePlaceData(data) {
    return { type: DELETE_DOMICILEPLACE_DATA, data: data }
}
//获取背景信息-在逃人员
export const ILLEGALCRIME_DATA = 'illegalCrime_data';
export const ILLEGALCRIME_ERROR = 'illegalCrime_error';
export function fetchIllegalCrimeData(search = '') {
    return dispatch => {

        get(api + "/getBgInformationList" + '?' + search).then((json) => {
            dispatch(receivedIllegalCrimeData(json));
        }).catch((e) => {
            dispatch(receivedIllegalCrimeError(e.toString()))
        });;
    }
}
export function postIllegalCrimeData(creds) {
    let path = '/data/getGXZTList'
    return dispatch => {
        dispatch({ type: "REQUEST_ILLEGACRIME_AUDITREPORT" });
        post(api + path, creds).then((json) => {
            dispatch(receivedIllegalCrimeData(json));
        }).catch((e) => {
            dispatch(receivedIllegalCrimeError(e.toString()))
        });;
    }
}
export function receivedIllegalCrimeData(data) {
    return { type: ILLEGALCRIME_DATA, data: data }
}
export function receivedIllegalCrimeError(message) {
    return { type: ILLEGALCRIME_ERROR, message: message }
}
// 添加违法在逃
export const ADD_ILLEGALCRIME_DATA = 'add_IllegalCrime_data';
export function addIllegalCrimeData(creds) {
    return dispatch => {
        dispatch(receivedAddIllegalCrimeData(creds));
    }

}
export function receivedAddIllegalCrimeData(data) {
    return { type: ADD_ILLEGALCRIME_DATA, data: data }
}
//修改违法在逃
export const EDIT_ILLEGALCRIME_DATA = 'edit_IllegalCrime_data';
export function editIllegalCrimeData(creds) {
    return dispatch => {
        dispatch(receivedEditIllegalCrimeData(creds));
    }

}
export function receivedEditIllegalCrimeData(data) {
    return { type: EDIT_ILLEGALCRIME_DATA, data: data }
}
//删除违法在逃
export const DELETE_ILLEGALCRIME_DATA = 'delete_IllegalCrime_data';
export function deleteIllegalCrimeData(creds) {
    return dispatch => {
        dispatch(receivedDeleteIllegalCrimeData(creds));
    }

}
export function receivedDeleteIllegalCrimeData(data) {
    return { type: DELETE_ILLEGALCRIME_DATA, data: data }
}
//背景信息-获取吸毒
export const DRUG_DATA = 'drug_data';
export const DRUG_ERROR = 'drug_error';
export function postDrugData(creds) {
    let path = '/data/getGXSDList'
    return dispatch => {
        dispatch({ type: "REQUEST_DRUG_AUDITREPORT" });
        post(api + path, creds).then((json) => {
            dispatch(receivedDrugData(json));
        }).catch((e) => {
            dispatch(receivedDrugError(e.toString()))
        });;
    }
}
export function receivedDrugData(data) {
    return { type: DRUG_DATA, data: data }
}
export function receivedDrugError(message) {
    return { type: DRUG_ERROR, message: message }
}
// 添加吸毒
export const ADD_DRUG_DATA = 'add_drug_data';
export function addDrugData(creds) {
    return dispatch => {
        dispatch(receivedAddDrugData(creds));
    }

}
export function receivedAddDrugData(data) {
    return { type: ADD_DRUG_DATA, data: data }
}
//修改吸毒
export const EDIT_DRUG_DATA = 'edit_drug_data';
export function editDrugData(creds) {
    return dispatch => {
        dispatch(receivedEditDrugData(creds));
    }

}
export function receivedEditDrugData(data) {
    return { type: EDIT_DRUG_DATA, data: data }
}
//删除吸毒
export const DELETE_DRUG_DATA = 'delete_drug_data';
export function deleteDrugData(creds) {
    return dispatch => {
        dispatch(receivedDeleteDrugData(creds));
    }

}
export function receivedDeleteDrugData(data) {
    return { type: DELETE_DRUG_DATA, data: data }
}
//背景信息-获取交通违法
export const TRAFVIOLATE_DATA = 'trafviolate_data';
export const TRAFVIOLATE_ERROR = 'trafviolate_error';
export function postTrafviolateData(creds) {
    let path = '/data/getJDCWZList'
    return dispatch => {
        post(api + path, creds).then((json) => {
            dispatch(receivedTrafviolateData(json));
        }).catch((e) => {
            dispatch(receivedTrafviolateError(e.toString()))
        });;
    }
}
export function receivedTrafviolateData(data) {
    return { type: TRAFVIOLATE_DATA, data: data }
}
export function receivedTrafviolateError(message) {
    return { type: TRAFVIOLATE_ERROR, message: message }
}
// 添加吸毒
export const ADD_TRAFVIOLATE_DATA = 'add_trafviolate_data';
export function addTrafviolateData(creds) {
    return dispatch => {
        dispatch(receivedAddTrafviolateData(creds));
    }

}
export function receivedAddTrafviolateData(data) {
    return { type: ADD_TRAFVIOLATE_DATA, data: data }
}
//修改吸毒
export const EDIT_TRAFVIOLATE_DATA = 'edit_trafviolate_data';
export function editTrafviolateData(creds) {
    return dispatch => {
        dispatch(receivedEditTrafviolateData(creds));
    }

}
export function receivedEditTrafviolateData(data) {
    return { type: EDIT_TRAFVIOLATE_DATA, data: data }
}
//删除吸毒
export const DELETE_TRAFVIOLATE_DATA = 'delete_trafviolate_data';
export function deleteTrafviolateData(creds) {
    return dispatch => {
        dispatch(receivedDeleteTrafviolateData(creds));
    }

}
export function receivedDeleteTrafviolateData(data) {
    return { type: DELETE_TRAFVIOLATE_DATA, data: data }
}
//背景信息-获取违法
export const CRIMINAL_DATA = 'Criminal_data';
export const CRIMINAL_ERROR = 'Criminal_error';
export function postCriminalData(creds) {
    let path = '/data/getGXWFFZList'
    return dispatch => {
        dispatch({ type: "REQUEST_CRIME_AUDITREPORT" });
        post(api + path, creds).then((json) => {
            dispatch(receivedCriminalData(json));
        }).catch((e) => {
            dispatch(receivedCriminalError(e.toString()))
        });;
    }
}
export function receivedCriminalData(data) {
    return { type: CRIMINAL_DATA, data: data }
}
export function receivedCriminalError(message) {
    return { type: CRIMINAL_ERROR, message: message }
}
//添加违法
export const ADD_CRIMINAL_DATA = 'add_Criminal_data';
export function addCriminalData(creds) {
    return dispatch => {
        dispatch(receivedAddCriminalData(creds));
    }

}
export function receivedAddCriminalData(data) {
    return { type: ADD_CRIMINAL_DATA, data: data }
}
//修改违法
export const EDIT_CRIMINAL_DATA = 'edit_Criminal_data';
export function editCriminalData(creds) {
    return dispatch => {
        dispatch(receivedEditCriminalData(creds));
    }

}
export function receivedEditCriminalData(data) {
    return { type: EDIT_CRIMINAL_DATA, data: data }
}
//删除违法
export const DELETE_CRIMINAL_DATA = 'delete_Criminal_data';
export function deleteCriminalData(creds) {
    return dispatch => {
        dispatch(receivedDeleteCriminalData(creds));
    }

}
export function receivedDeleteCriminalData(data) {
    return { type: DELETE_CRIMINAL_DATA, data: data }
}
//获取轨迹信息trajectory
export const TRAIECTORY_DATA = 'trajectory_data';
export const TRAIECTORY_ERROR = 'trajectory_error';
export function fetchTrajectoryInformationData(search = '') {
    return dispatch => {
        get(api + "/getTrajectoryInformationList" + '?' + search).then((json) => {
            dispatch(receivedTrajectoryInformationData(json));
        }).catch((e) => {
            dispatch(receivedTrajectoryInformationError(e.toString()))
        });;
    }
}
export function postTrajectoryInformationData(creds) {
    let path = '/data/getHotelTry'
    return dispatch => {
        dispatch({ type: "REQUEST_TRAJECTORY_AUDITREPORT" });
        post(api + path, creds).then((json) => {
            dispatch(receivedTrajectoryInformationData(json));
        }).catch((e) => {
            dispatch(receivedTrajectoryInformationError(e.toString()))
        });;
    }
}
export function receivedTrajectoryInformationData(data) {
    return { type: TRAIECTORY_DATA, data: data }
}
export function receivedTrajectoryInformationError(message) {
    return { type: TRAIECTORY_ERROR, message: message }
}
// 添加轨迹
export const ADD_TRAIECTORY_DATA = 'add_trajectory_data';
export function addTrajectoryData(creds) {
    return dispatch => {
        dispatch(receivedAddTrajectoryData(creds));
    }

}
export function receivedAddTrajectoryData(data) {
    return { type: ADD_TRAIECTORY_DATA, data: data }
}
//修改轨迹
export const EDIT_TRAIECTORY_DATA = 'edit_trajectory_data';
export function editTrajectoryData(creds) {
    return dispatch => {
        dispatch(receivedEditTrajectoryData(creds));
    }

}
export function receivedEditTrajectoryData(data) {
    return { type: EDIT_TRAIECTORY_DATA, data: data }
}
//删除轨迹
export const DELETE_TRAIECTORY_DATA = 'delete_trajectory_data';
export function deleteTrajectoryData(creds) {
    return dispatch => {
        dispatch(receivedDeleteTrajectoryData(creds));
    }

}
export function receivedDeleteTrajectoryData(data) {
    return { type: DELETE_TRAIECTORY_DATA, data: data }
}

// //保存网上通联信息
// export function saveOnlineInformationData(creds) {
//     return dispatch => {
//         post(api + "/saveOnlineInformation",creds).then((json) => {
//             if(json.success===true){
//                 alert('保存成功!');
//             }
//         }).catch((e)=>{
//         });;
//     }
// }
// //保存银行信息
// export function saveBankInformationData(creds) {
//     return dispatch => {
//         post(api + "/saveBankInformation",creds).then((json) => {
//             if(json.success===true){
//                 alert('保存成功!');
//             }
//         }).catch((e)=>{
//         });;
//     }
// }
//研判分析-研判级别改变
export const EDIT_JDMENTLEVEL_DATA = 'edit_judgmentLevel_data';
export function editJudgmentLevelData(creds) {
    return dispatch => {
        dispatch(receivedEdiJudgmentLevelData(creds));
    }

}
export function receivedEdiJudgmentLevelData(data) {
    return { type: EDIT_JDMENTLEVEL_DATA, data: data }
}
//研判分析-涉恐类别改变
export const EDIT_TERRORTYPE_DATA = 'edit_terrorType_data';
export function editTerrorTypeData(creds) {
    return dispatch => {
        dispatch(receivedEdiTerrorTypeData(creds));
    }

}
export function receivedEdiTerrorTypeData(data) {
    return { type: EDIT_TERRORTYPE_DATA, data: data }
}
//研判分析-建议处置措施
export const EDIT_DISPOSITIONL_DATA = 'edit_dispositionl_data';
export function editDispositionlData(creds) {
    return dispatch => {
        dispatch(receivedEdiDispositionlData(creds));
    }

}
export function receivedEdiDispositionlData(data) {
    return { type: EDIT_DISPOSITIONL_DATA, data: data }
}
//研判分析-消息来源
export const EDIT_SOURCE_DATA = 'edit_source_data';
export function editSourceData(creds) {
    return dispatch => {
        dispatch(receivedEdiSourceData(creds));
    }

}
export function receivedEdiSourceData(data) {
    return { type: EDIT_SOURCE_DATA, data: data }
}
//研判分析-研判结论
export const EDIT_CONCLUSIONDATA_DATA = 'edit_conclusion_data';
export function editConclusionData(creds) {
    return dispatch => {
        dispatch(receivedEditConclusionData(creds));
    }

}
export function receivedEditConclusionData(data) {
    return { type: EDIT_CONCLUSIONDATA_DATA, data: data }
}
//研判分析-上传附件utl
export const EDIT_UPLOADURL_DATA = 'edit_uploadurl_data';
export function editUploadurlData(creds) {
    return dispatch => {
        dispatch(receivedEditUploadurlData(creds));
    }

}
export function receivedEditUploadurlData(data) {
    return { type: EDIT_UPLOADURL_DATA, data: data }
}
//研判分析-上传附件name
export const EDIT_UPLOADURLNAME_DATA = 'edit_uploadname_data';
export function editUploadnameData(creds) {
    return dispatch => {
        dispatch(receivedEditUploadnameData(creds));
    }

}
export function receivedEditUploadnameData(data) {
    return { type: EDIT_UPLOADURLNAME_DATA, data: data }
}
//最后保存报告Audit report
export function saveAuditReportData(creds, disabledChange) {
    return dispatch => {
        post(api + "/data/saveJudgeAllJson", creds).then((json) => {
            if (json.reason === null) {

                message.success('保存成功！');

                disabledChange();
            } else {
                message.error(json.reason.text);
            }
        }).catch((e) => {
        });;
    }
}
// 修改保存和预览的按钮状态
export const EDIT_SAVEDISABLE_DATA = 'edit_savedisable_data';
export function edisaveDisableData(creds) {
    return dispatch => {
        dispatch(receivedEditDisableData(creds));
    }

}
export function receivedEditDisableData(data) {
    return { type: EDIT_SAVEDISABLE_DATA, data: data }
}
//最后修改的接口
export const EDIT_AUDITREPORT_DATA = 'edit_auditreport_data';
export const EDIT_AUDITREPORT_ERROR = 'edit_auditreport_error';
export function editAuditReportData(creds) {
    return dispatch => {
        post(api + "/data/selectJudgeAllJson", creds).then((json) => {
            dispatch(receivEdeditAuditReportData(json));
        }).catch((e) => {
            dispatch(receivedEditAuditReportError(e.toString()))
        });;
    }
}
export function receivEdeditAuditReportData(data) {
    return { type: EDIT_AUDITREPORT_DATA, data: data }
}
export function receivedEditAuditReportError(message) {
    return { type: EDIT_AUDITREPORT_ERROR, message: message }
}
//个人中心的我的研判修改接口 editPersonAuditReportData
export const EDIT_PERSONAUDITREPORT_DATA = 'edit_Personauditreport_data';
export const EDIT_PERSONAUDITREPORT_ERROR = 'edit_Personauditreport_error';
export function editPersonAuditReportData(creds) {
    return dispatch => {
        post(api + "/data/selectJudgeAllJson", creds).then((json) => {
            dispatch(receivEdeditPersonAuditReportData(json));
        }).catch((e) => {
            dispatch(receivedEditPersonAuditReportError(e.toString()))
        });;
    }
}
export function receivEdeditPersonAuditReportData(data) {
    return { type: EDIT_PERSONAUDITREPORT_DATA, data: data }
}
export function receivedEditPersonAuditReportError(message) {
    return { type: EDIT_PERSONAUDITREPORT_ERROR, message: message }
}
export const EDIT_REFRESHAUDITREPORT_DATA = 'edit_refreshAuditreport_data';
export const EDIT_REFRESHAUDITREPORT_ERROR = 'edit_refreshAuditreport_error';
export function editRefreshAuditReportData(creds) {
    return dispatch => {

        dispatch(receivEdeditRefreshAuditReportData(creds));
    }
}
export function receivEdeditRefreshAuditReportData(data) {
    return { type: EDIT_REFRESHAUDITREPORT_DATA, data: data }
}