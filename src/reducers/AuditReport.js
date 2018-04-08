/**
 * 设置管理
 */
import * as auditReport from "../actions/AuditReport";
import { AUDIT_REPORT_MENU_CHANGE_CURRENT } from "../actions/actions";

import { getNowFormatDate } from "../utils/Date";
import { store } from '../index.js';
// let userItem = JSON.parse(sessionStorage.getItem('user'));
const initialState = { //研判报告
    success: true,
    data: {
        commonResources: {//常用资源
            list: [],
            count: 0
        },
        judgeHistory: {//研判历史
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list: [],
                total: 0,
            }
        },
        head: {//头部信息
            name: null,//姓名
            judgmentLevel: null,//研判级别
            terrorType: null,//涉恐类别
            judgePeople: null,//研判人
            judgmentTime: null,//研判时间
            source: null,//线索来源,
        },
        basicInformation: null,//基础信息
        // basicInformation:{
        //         reason: {
        //             "code": "",
        //             "text": ""
        //             },
        //         result: {

        //         }
        //  },
        bgInformation: {//背景信息
            householdInformationList: [],//同户信息
            domicilePlaceList: null,//户籍地核查
            illegalCrimeList: [],//违法犯罪前科
            drugList: [],//吸毒
            trafviolateList: [],//交通违法
            criminalList: [],//刑事  
        },
        onlineInformationList: [],//网上通联信息
        bankInformationList: [],//银行信息
        relatedPersonList: [],//关联人
        trajectoryInformationList: {
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list: [],
                total: 0,
            }
        },//轨迹信息
        judgmentAnalysis: {//研判分析
            judgmentLevel: null,//研判级别
            terrorType: null,//涉恐类别
            dispositionl: null,//处置措施
            conclusion: null,//结论
            source: null,//线索来源
            uploadurl: null,
            uploadname: null,
        },
        judgeCode: {
            reason: {
                "code": "",
                "text": ""
            },
            result: '',
        },
        toConfigure: '',
        saveDisable: true,
        //   username:userItem.body.name,
        username: '',
        bgTrigger: false,
        trajectoryTrigger: false,
    },

    uiData: {
        menus: [
            {
                id: '101',
                menuName: '基础信息',
                isSelect: true,  //当前选中
                lastSelect: true,  //最后选中
                stage: 1  //阶段
            },
            {
                id: '102',
                menuName: '背景信息',
                isSelect: false,
                lastSelect: false,
                stage: 2
            },
            {
                id: '103',
                menuName: '网上通联信息',
                isSelect: false,
                lastSelect: false,
                stage: 3
            },
            {
                id: '104',
                menuName: '银行信息',
                isSelect: false,
                lastSelect: false,
                stage: 4
            },
            {
                id: '105',
                menuName: '轨迹信息',
                isSelect: false,
                lastSelect: false,
                stage: 5
            },
            {
                id: '106',
                menuName: '关联人',
                isSelect: false,
                lastSelect: false,
                stage: 6
            },
            {
                id: '107',
                menuName: '研判分析',
                isSelect: false,
                lastSelect: false,
                stage: 7
            },
        ]
    },
    isFetching: false,
}


//设置管理
const AuditReport = (state = initialState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case auditReport.EDIT_JDMENTLEVEL_DATA://研判分析-研判级别
            newState.data.judgmentAnalysis.judgmentLevel = action.data;
            let judgmentLevelList = store.getState().root.data.judgmentLevelList;
            let judgmentLevelData;
            for (let x in judgmentLevelList) {
                if (judgmentLevelList[x].value === action.data) {
                    judgmentLevelData = judgmentLevelList[x];
                    break;
                }
            }
            newState.data.head.judgmentLevel = judgmentLevelData.label;
            return newState;
        case auditReport.EDIT_TERRORTYPE_DATA://研判分析-涉恐类别 
            newState.data.judgmentAnalysis.terrorType = action.data;
            let terrorTypeList = store.getState().root.data.terrorTypeList;
            let terrorTypeData;
            for (let x in terrorTypeList) {
                if (terrorTypeList[x].value === action.data) {
                    terrorTypeData = terrorTypeList[x];
                    break;
                }
            }
            newState.data.head.terrorType = terrorTypeData.label;
            return newState;
        case auditReport.EDIT_DISPOSITIONL_DATA://研判分析-建议处置措施 
            newState.data.judgmentAnalysis.dispositionl = action.data;
            // let dispositionlList = store.getState().root.data.dispositionlList;
            // let dispositionlData;
            // for(let x in dispositionlList){
            //     if(dispositionlList[x].value === action.data){
            //         dispositionlData = dispositionlList[x];
            //         break;
            //     }
            // }
            return newState;
        case auditReport.EDIT_SOURCE_DATA://研判分析-数据来源
            newState.data.judgmentAnalysis.source = action.data;
            newState.data.head.source = action.data;
            return newState;
        case auditReport.EDIT_CONCLUSIONDATA_DATA://研判分析-研判结论
            newState.data.judgmentAnalysis.conclusion = action.data;
            return newState;
        case auditReport.EDIT_UPLOADURL_DATA://研判分析-上传附件
            newState.data.judgmentAnalysis.uploadurl = action.data;
            return newState;
        case auditReport.EDIT_UPLOADURLNAME_DATA://研判分析-上传附件
            newState.data.judgmentAnalysis.uploadname = action.data;
            return newState;
        case auditReport.COMMON_RESOURCES_DATA: //获取常用资源
            newState.data.commonResources.list = action.data.data.commonResourcesList;
            newState.data.commonResources.count = action.data.data.count;
            return newState;
        case auditReport.JUDGE_HISTORY_DATA: //获取研判历史
            newState.data.judgeHistory.result.list = action.data.result.list;
            newState.data.judgeHistory.result.total = action.data.result.page.totalResult;
            return newState;
        case auditReport.BASICINFORMATION_DATA: //获取基础信息
            newState.data.basicInformation = action.data.result;
            newState.data.head.name = newState.data.basicInformation.name;
            //newState.data.basicInformation = action.data.data.basicInformation;
            // newState.data.head.number = action.data.data.basicInformation.idNumber;
            // newState.data.head.name = action.data.data.basicInformation.name;
            // newState.data.head.judgePeople  = JSON.parse(sessionStorage.getItem('user')).body.name;
            // newState.data.head.judgmentTime  = getNowFormatDate();
            return newState;
        case auditReport.EDIT_BASICINFORMATION_DATA://基础信息-修改的时候
            newState.data.basicInformation = action.data;
            newState.data.head.name = action.data.name;//修改头部的名字
            return newState;
        case 'REQUEST_ONLINE_AUDITREPORT'://加载中 网上通联
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case auditReport.ONLINEINFORMATION_DATA://获取网上通联信息
            newState.data.onlineInformationList = action.data.data.onlineInformationList;
            newState.isFetching = false;
            return newState;
        case auditReport.ADD_ONLINEINFORMATION_DATA://添加网上通联
            newState.data.onlineInformationList.unshift(action.data);
            return newState;
        case auditReport.EDIT_ONLINEINFORMATION_DATA://修改网上通联
            let onlineList = newState.data.onlineInformationList;
            for (let i = 0; i < onlineList.length; i++) {
                let onlineData = onlineList[i];
                if (onlineData.id === action.data.id) {
                    onlineData.nickname = action.data.nickname;
                    onlineData.account_type = action.data.account_type;
                    onlineData.account_number = action.data.account_number;
                    onlineData.idcard = action.data.idcard;
                }
            }
            return newState;
        case auditReport.DELETE_ONLINEINFORMATION_DATA://删除网上信息
            let selectRows = action.data;
            let online = newState.data.onlineInformationList;
            for (let i = 0; i < online.length; i++) {
                let onlineData = online[i];
                if (onlineData.id === selectRows.id) {
                    online.remove(onlineData);
                }
            }
            return newState;
        case 'REQUEST_ONLINE_AUDITREPORT'://加载中 银行信息
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case auditReport.BANKINFORMATION_DATA://获取银行信息
            newState.data.bankInformationList = action.data.data.bankInformationList;
            return newState;
        case auditReport.ADD_BANKINFORMATION_DATA://添加银行信息
            newState.data.bankInformationList.unshift(action.data);
            return newState;
        case auditReport.EDIT_BANKINFORMATION_DATA://修改银行信息
            let bankList = newState.data.bankInformationList;
            for (let i = 0; i < bankList.length; i++) {
                let bankData = bankList[i];
                if (bankData.id === action.data.id) {
                    bankData.idcard = action.data.idcard;
                    bankData.trade_type = action.data.trade_type;
                    bankData.trade_amount = action.data.trade_amount;
                    bankData.opposite_unitname = action.data.opposite_unitname;
                    bankData.opposite_account = action.data.opposite_account;
                    bankData.opposite_personname = action.data.opposite_personname;
                    bankData.trade_time = action.data.trade_time;
                    bankData.bank_type = action.data.bank_type;
                    bankData.deposit_bank = action.data.deposit_bank;
                    bankData.deposit_time = action.data.deposit_time;
                    bankData.deposit_card = action.data.deposit_card;
                }
            }
            return newState;
        case auditReport.DELETE_BANKINFORMATION_DATA://删除银行信息
            let bankselectRows = action.data;
            let bank = newState.data.bankInformationList;

            for (let i = 0; i < bank.length; i++) {
                let bankData = bank[i];
                console.log('bankselectRows', bankselectRows);
                console.log('bankData.id', bankData.id);
                if (bankData.id === bankselectRows.id) {
                    bank.remove(bankData);
                }
            }
            return newState;
        case auditReport.RELATEDPERSON_DATA://获取关联人
            newState.data.relatedPersonList = action.data.data.relatedPersonList;
            return newState;
        case auditReport.ADD_RELATEDPERSON_DATA://添加关联人
            newState.data.relatedPersonList.unshift(action.data);
            return newState;
        case auditReport.EDIT_RELATEDPERSON_DATA://修改关联人
            let relatedPersonList = newState.data.relatedPersonList;
            for (let i = 0; i < relatedPersonList.length; i++) {
                let relatedPersonData = relatedPersonList[i];
                console.log('action.data', action.data)
                if (relatedPersonData.id === action.data.id) {
                    relatedPersonData.name = action.data.name;
                    relatedPersonData.idcard = action.data.idcard;
                    relatedPersonData.hh = action.data.hh;
                    relatedPersonData.relation = action.data.relation;
                    relatedPersonData.ishaveterrback = action.data.ishaveterrback;
                    relatedPersonData.incrimination = action.data.incrimination;
                }
            }
            return newState;
        case auditReport.DELETE_RELATEDPERSON_DATA://删除关联人
            let relatedselectRows = action.data;
            let relatedList = newState.data.relatedPersonList;
            for (let i = 0; i < relatedList.length; i++) {
                let relatedData = relatedList[i];
                if (relatedData.id === relatedselectRows.id) {
                    relatedList.remove(relatedData);
                }
            }
            return newState;
        case 'REQUEST_HOUSEHOLD_AUDITREPORT'://加载中 同户信息
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }

        case auditReport.HOUSEHILDINFORMATION_DATA://获取背景信息-同户信息
            newState.data.bgInformation.householdInformationList = action.data.result;
            newState.isFetching = false;
            return newState;
        case auditReport.ADD_HOUSEHOLINFORMATION_DATA://添加同户信息
            newState.data.bgInformation.householdInformationList.unshift(action.data);
            return newState;
        case auditReport.EDIT_HOUSEHOLINFORMATION_DATA://修改同户信息
            let houseList = newState.data.bgInformation.householdInformationList;
            for (let i = 0; i < houseList.length; i++) {
                let houseData = houseList[i];
                if (houseData.id === action.data.id) {
                    houseData.name = action.data.name;
                    houseData.idcard = action.data.idcard;
                    houseData.relation = action.data.relation;
                }
            }
            return newState;
        case auditReport.DELETE_HOUSEHOLINFORMATION_DATA://删除同户信息
            let houseselectRows = action.data;
            let householdList = newState.data.bgInformation.householdInformationList;
            for (let i = 0; i < householdList.length; i++) {
                let householdData = householdList[i];
                if (householdData.id === houseselectRows.id) {
                    householdList.remove(householdData);
                }
            }
            newState.data.bgTrigger = true;
            return newState;
        case auditReport.DOMICILEPLACE_DATA://获取背景信息-户籍地核查
            newState.data.bgInformation.domicilePlaceList = action.data.data.bgInformation.domicilePlaceList;
        case auditReport.ADD_DOMICILEPLACE_DATA://添加户籍地
            newState.data.bgInformation.illegalCrimeList.unshift(action.data);
            return newState;
        case auditReport.EDIT_DOMICILEPLACE_DATA://修改户籍地
            let domicilePlaceList = newState.data.bgInformation.domicilePlaceList;
            for (let i = 0; i < domicilePlaceList.length; i++) {
                let domicilePlaceData = domicilePlaceList[i];
                if (domicilePlaceData.id === action.data.id) {

                }
            }
            return newState;
        case auditReport.DELETE_DOMICILEPLACE_DATA://删除户籍地
            let domicileselectRows = action.data;
            let domicileList = newState.data.bgInformation.domicilePlaceList;
            for (let i = 0; i < domicileList.length; i++) {
                let domicileData = domicileList[i];
                if (domicileData.id === domicileselectRows.id) {
                    domicileList.remove(domicileData);
                }
            }
            return newState;
        case 'REQUEST_ILLEGACRIME_AUDITREPORT'://加载中 在逃人员
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case auditReport.ILLEGALCRIME_DATA://获取背景信息-在逃人员
            newState.data.bgInformation.illegalCrimeList = action.data.result;
            newState.isFetching = false;
            return newState;
        case auditReport.ADD_ILLEGALCRIME_DATA://添加在逃人员
            newState.data.bgInformation.illegalCrimeList.unshift(action.data);
            return newState;
        case auditReport.EDIT_ILLEGALCRIME_DATA://修改在逃人员
            let illeaglList = newState.data.bgInformation.illegalCrimeList;
            for (let i = 0; i < illeaglList.length; i++) {
                let illeaglData = illeaglList[i];
                console.log('illeaglData==', illeaglData);
                if (illeaglData.id === action.data.id) {
                    console.log('illeaglData', illeaglData);
                    illeaglData.bg_type = action.data.bg_type;
                    illeaglData.name = action.data.name;
                    illeaglData.sex = action.data.sex;
                    illeaglData.birth = action.data.birth;
                    illeaglData.idcard = action.data.idcard;
                    illeaglData.nation = action.data.nation;
                    illeaglData.cencusaddr = action.data.cencusaddr;
                    illeaglData.liveaddr = action.data.liveaddr;
                    illeaglData.fugitivetype = action.data.fugitivetype;
                    illeaglData.remark = action.data.remark;
                }
            }
            return newState;
        case auditReport.DELETE_ILLEGALCRIME_DATA://删除
            let illegalselectRows = action.data;
            let illegalCrimeList = newState.data.bgInformation.illegalCrimeList;
            for (let i = 0; i < illegalCrimeList.length; i++) {
                let illegalCrimeData = illegalCrimeList[i];
                if (illegalCrimeData.id === illegalselectRows.id) {
                    illegalCrimeList.remove(illegalCrimeData);
                }
            }
            newState.data.bgTrigger = true;
            return newState;
        case 'REQUEST_DRUG_AUDITREPORT'://加载中 吸毒
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case auditReport.DRUG_DATA://获取背景信息-吸毒
            newState.data.bgInformation.drugList = action.data.result;
            newState.isFetching = false;
            return newState;
        case auditReport.ADD_DRUG_DATA://添加吸毒
            newState.data.bgInformation.drugList.unshift(action.data);
            return newState;
        case auditReport.EDIT_DRUG_DATA://修改吸毒
            let drug = newState.data.bgInformation.drugList;
            for (let i = 0; i < drug.length; i++) {
                let drugData = drug[i];
                if (drugData.id === action.data.id) {
                    drugData.bg_type = action.data.bg_type;
                    drugData.name = action.data.name;
                    drugData.idcard = action.data.idcard;
                    drugData.checkinperson = action.data.checkinperson;
                    drugData.checkintime = action.data.checkintime;
                    drugData.cencusaddr = action.data.cencusaddr;
                }
            }
            return newState;
        case auditReport.DELETE_DRUG_DATA://删除吸毒
            let drugselectRows = action.data;
            let drugDataList = newState.data.bgInformation.drugList;
            for (let i = 0; i < drugDataList.length; i++) {
                let drugData = drugDataList[i];
                if (drugData.id === drugselectRows.id) {
                    drugDataList.remove(drugData);
                }
            }
            newState.data.bgTrigger = true;
            return newState;
        case auditReport.TRAFVIOLATE_DATA://获取背景信息-交通违法
            newState.data.bgInformation.trafviolateList = action.data.result;
            return newState;
        case auditReport.ADD_TRAFVIOLATE_DATA://添加交通违法
            newState.data.bgInformation.trafviolateList.unshift(action.data);
            return newState;
        case auditReport.EDIT_TRAFVIOLATE_DATA://修改交通违法
            let trafviolate = newState.data.bgInformation.trafviolateList;
            for (let i = 0; i < trafviolate.length; i++) {
                let trafviolateData = trafviolate[i];
                if (trafviolateData.id === action.data.id) {
                    trafviolateData.bg_type = action.data.bg_type;
                    trafviolateData.code = action.data.code;
                    trafviolateData.judgecode = action.data.judgecode;
                    trafviolateData.archivenum = action.data.archivenum;
                    trafviolateData.party = action.data.party;
                    trafviolateData.district = action.data.district;
                    trafviolateData.address = action.data.address;
                    trafviolateData.telno = action.data.telno;
                    trafviolateData.licenseplate = action.data.licenseplate;
                    trafviolateData.owner = action.data.owner;
                    trafviolateData.illegaltime = action.data.illegaltime;
                    trafviolateData.illegaladdr = action.data.illegaladdr;
                    trafviolateData.illegalevent = action.data.illegalevent;
                    trafviolateData.illegalscore = action.data.illegalscore;
                    trafviolateData.infact = action.data.infact;
                    trafviolateData.theory = action.data.theory;
                    trafviolateData.latefee = action.data.latefee;
                    trafviolateData.policeman = action.data.policeman;
                    trafviolateData.discoveorgan = action.data.discoveorgan;
                    trafviolateData.disposetime = action.data.disposetime;
                    trafviolateData.paytime = action.data.paytime;
                    trafviolateData.recordpeople = action.data.recordpeople;
                    trafviolateData.recordtime = action.data.recordtime;
                    trafviolateData.finemoney = action.data.finemoney;
                    trafviolateData.drvlicense = action.data.drvlicense;
                }
            }
            return newState;
        case auditReport.DELETE_TRAFVIOLATE_DATA://删除交通违法
            let trafviolateselectRows = action.data;
            let trafviolateList = newState.data.bgInformation.trafviolateList;
            for (let i = 0; i < trafviolateList.length; i++) {
                let trafviolateData = trafviolateList[i];
                if (trafviolateData.id === trafviolateselectRows.id) {
                    trafviolateList.remove(trafviolateData);
                }
            }
            return newState;
        case 'REQUEST_CRIME_AUDITREPORT'://加载中 违法犯罪
            return {
                ...state,//原状态
                isFetching: true,
                didInvalidate: false
            }
        case auditReport.CRIMINAL_DATA://获取背景信息-违法犯罪
            newState.data.bgInformation.criminalList = action.data.result;
            newState.isFetching = false;
            return newState;
        case auditReport.ADD_CRIMINAL_DATA://添加违法犯罪
            newState.data.bgInformation.criminalList.unshift(action.data);
            return newState;
        case auditReport.EDIT_CRIMINAL_DATA://修改违法犯罪
            let criminal = newState.data.bgInformation.criminalList;
            for (let i = 0; i < criminal.length; i++) {
                let criminalData = criminal[i];
                if (criminalData.id === action.data.id) {
                    criminalData.bg_type = action.data.bg_type;
                    criminalData.name = action.data.name;
                    criminalData.remarks = action.data.remarks;
                    criminalData.idcard = action.data.idcard;
                    criminalData.nation = action.data.nation;
                    criminalData.census = action.data.census;
                    criminalData.liveaddr = action.data.liveaddr;
                    criminalData.cencusdist = action.data.cencusdist;
                    criminalData.livedist = action.data.livedist;
                    criminalData.JYAQ = action.data.JYAQ;
                    criminalData.AJLB = action.data.AJLB;
                    criminalData.sex = action.data.sex;

                }
            }
            return newState;
        case auditReport.DELETE_CRIMINAL_DATA://删除刑事
            let criminalselectRows = action.data;
            let criminalList = newState.data.bgInformation.criminalList;
            for (let i = 0; i < criminalList.length; i++) {
                let criminalData = criminalList[i];
                if (criminalData.id === criminalselectRows.id) {
                    criminalList.remove(criminalData);
                }
            }
            newState.data.bgTrigger = true;
            return newState;
        case auditReport.TRAIECTORY_DATA://获取轨迹信息
            newState.data.trajectoryInformationList.result.list = action.data.result.list;
            newState.data.trajectoryInformationList.result.total = action.data.result.page.totalResult;
            return newState;
        case auditReport.ADD_TRAIECTORY_DATA://添加轨迹
            newState.data.trajectoryInformationList.result.list.unshift(action.data);
            return newState;
        case auditReport.EDIT_TRAIECTORY_DATA://修改轨迹
            let trajectoryInformation = newState.data.trajectoryInformationList.result.list;
            for (let i = 0; i < trajectoryInformation.length; i++) {
                let trajectoryInformationData = trajectoryInformation[i];
                console.log('轨迹信息', action.data);
                if (trajectoryInformationData.id === action.data.id) {
                    trajectoryInformationData.type = action.data.type;
                    trajectoryInformationData.name = action.data.name;
                    trajectoryInformationData.position = action.data.position;
                    trajectoryInformationData.beginDate = action.data.beginDate;
                    trajectoryInformationData.endDate = action.data.endDate;
                    trajectoryInformationData.address = action.data.address;
                    trajectoryInformationData.fromCity = action.data.fromCity;
                    trajectoryInformationData.toCity = action.data.toCity;
                }
            }
            return newState;
        case auditReport.DELETE_TRAIECTORY_DATA://删除轨迹
            newState.data.trajectoryInformationList.result.list.remove(action.data);
            newState.data.trajectoryTrigger = true;
            return newState;
        case auditReport.JUDGE_CODE_DATA://研判编码
            newState.data.judgeCode.result = action.data.result;
            return newState;
        //修改研判历史，把取到的数据放在状态树中
        case auditReport.EDIT_AUDITREPORT_DATA://把研判历史的数据到状态树中
            newState.data.judgeCode.result = action.data.result.JudgeId;//研判编号
            newState.data.basicInformation = action.data.result.JudgeBase;//基础信息
            newState.data.bgInformation.householdInformationList = action.data.result.JudgeBackInfo.JudgeSamedoor;//背景信息-同户人
            newState.data.bgInformation.criminalList = action.data.result.JudgeBackInfo.JudgeFugitive;//背景信息-犯罪
            newState.data.bgInformation.drugList = action.data.result.JudgeBackInfo.JudgeDrug;//背景信息-吸毒
            newState.data.bgInformation.illegalCrimeList = action.data.result.JudgeBackInfo.JudgeCriminal;//背景信息-在逃
            newState.data.onlineInformationList = action.data.result.JudgeNetInfo;//网上通联信息
            newState.data.bankInformationList = action.data.result.JudgeBank;//银行信息
            newState.data.trajectoryInformationList.result.list = action.data.result.JudgeTrack;//轨迹信息
            newState.data.relatedPersonList = action.data.result.JudgeTerristRelation;//关联人
            newState.data.judgmentAnalysis.judgmentLevel = action.data.result.JudgeResult.judge_level;//研判分析-研判级别
            newState.data.judgmentAnalysis.terrorType = action.data.result.JudgeResult.terris_type;//研判分析-涉恐类别
            newState.data.judgmentAnalysis.dispositionl = action.data.result.JudgeResult.dispose_code;//研判分析-建议处置措施
            newState.data.judgmentAnalysis.conclusion = action.data.result.JudgeResult.result_content;//研判分析-研判结论
            newState.data.judgmentAnalysis.source = action.data.result.JudgeResult.clue_source;//研判分析—数据来源
            newState.data.judgmentAnalysis.uploadurl = action.data.result.JudgeResult.uploadurl;//研判分析-上传附件
            newState.data.judgmentAnalysis.uploadname = action.data.result.JudgeResult.uploadname;//研判分析-上传附件姓名
            newState.data.head.judgmentLevel = action.data.result.Head.judge_level;//研判分析-头部信息研判级别
            newState.data.head.terrorType = action.data.result.Head.terris_type;//研判分析-头部涉恐类别
            newState.data.head.source = action.data.result.JudgeResult.clue_source;//研判分析-头部线索来源
            newState.data.head.judgmentTime = action.data.result.JudgeResult.createtime;//研判分析-头部研判时间
            newState.data.head.name = action.data.result.JudgeBase.name;//头部姓名
            newState.data.username = action.data.result.username;
            newState.data.toConfigure = 'JudgeHistory';
            newState.uiData.menus = [
                {
                    id: '101',
                    menuName: '基础信息',
                    isSelect: true,  //当前选中
                    lastSelect: true,  //最后选中
                    stage: 1  //阶段
                },
                {
                    id: '102',
                    menuName: '背景信息',
                    isSelect: false,
                    lastSelect: false,
                    stage: 2
                },
                {
                    id: '103',
                    menuName: '网上通联信息',
                    isSelect: false,
                    lastSelect: false,
                    stage: 3
                },
                {
                    id: '104',
                    menuName: '银行信息',
                    isSelect: false,
                    lastSelect: false,
                    stage: 4
                },
                {
                    id: '105',
                    menuName: '轨迹信息',
                    isSelect: false,
                    lastSelect: false,
                    stage: 5
                },
                {
                    id: '106',
                    menuName: '关联人',
                    isSelect: false,
                    lastSelect: false,
                    stage: 6
                },
                {
                    id: '107',
                    menuName: '研判分析',
                    isSelect: false,
                    lastSelect: false,
                    stage: 7
                },
            ];
            return newState;
        case auditReport.EDIT_SAVEDISABLE_DATA:
            newState.data.saveDisable = false;
            return newState;
        case auditReport.EDIT_PERSONAUDITREPORT_DATA://把个人中心我的研判的数据到状态树中
            newState.data.judgeCode.result = action.data.result.JudgeId;//研判编号
            newState.data.basicInformation = action.data.result.JudgeBase;//基础信息
            newState.data.bgInformation.householdInformationList = action.data.result.JudgeBackInfo.JudgeSamedoor;//背景信息-同户人
            newState.data.bgInformation.criminalList = action.data.result.JudgeBackInfo.JudgeFugitive;//背景信息-犯罪
            newState.data.bgInformation.drugList = action.data.result.JudgeBackInfo.JudgeDrug;//背景信息-吸毒
            newState.data.bgInformation.illegalCrimeList = action.data.result.JudgeBackInfo.JudgeCriminal;//背景信息-在逃
            newState.data.onlineInformationList = action.data.result.JudgeNetInfo;//网上通联信息
            newState.data.bankInformationList = action.data.result.JudgeBank;//银行信息
            newState.data.trajectoryInformationList.result.list = action.data.result.JudgeTrack;//轨迹信息
            newState.data.relatedPersonList = action.data.result.JudgeTerristRelation;//关联人
            newState.data.judgmentAnalysis.judgmentLevel = action.data.result.JudgeResult.judge_level;//研判分析-研判级别
            newState.data.judgmentAnalysis.terrorType = action.data.result.JudgeResult.terris_type;//研判分析-涉恐类别
            newState.data.judgmentAnalysis.dispositionl = action.data.result.JudgeResult.dispose_code;//研判分析-建议处置措施
            newState.data.judgmentAnalysis.conclusion = action.data.result.JudgeResult.result_content;//研判分析-研判结论
            newState.data.judgmentAnalysis.source = action.data.result.JudgeResult.clue_source;//研判分析—数据来源
            newState.data.judgmentAnalysis.uploadurl = action.data.result.JudgeResult.uploadurl;//研判分析-上传附件
            newState.data.judgmentAnalysis.uploadname = action.data.result.JudgeResult.uploadname;//研判分析-上传附件姓名
            newState.data.head.judgmentLevel = action.data.result.Head.judge_level;//研判分析-头部信息研判级别
            newState.data.head.terrorType = action.data.result.Head.terris_type;//研判分析-头部涉恐类别
            newState.data.head.source = action.data.result.JudgeResult.clue_source;//研判分析-头部线索来源
            newState.data.head.judgmentTime = action.data.result.JudgeResult.createtime;//研判分析-头部研判时间
            newState.data.head.name = action.data.result.JudgeBase.name;//头部姓名
            newState.data.username = action.data.result.username;//操作人姓名
            return newState;
        case auditReport.EDIT_REFRESHAUDITREPORT_DATA:
            newState.data = action.data;
            return newState;
        case AUDIT_REPORT_MENU_CHANGE_CURRENT: //改变选中进度条状态 
            //获取当前选中和最后选中项
            let isSelectMenu;
            let lastSelectMenu;
            for (let x in newState.uiData.menus) {
                if (newState.uiData.menus[x].isSelect === true) {
                    isSelectMenu = newState.uiData.menus[x];
                }
                if (newState.uiData.menus[x].lastSelect === true) {
                    lastSelectMenu = newState.uiData.menus[x];
                }
            }
            //遍历一级目录
            for (let x in newState.uiData.menus) {
                if (action.menu.id === newState.uiData.menus[x].id) { //根据ID相等判断，是否选中
                    if (action.menu.stage >= lastSelectMenu.stage) {//当前选中节点>最后选中节点
                        newState.uiData.menus[x].lastSelect = true;
                    }
                    newState.uiData.menus[x].isSelect = true;
                } else {
                    newState.uiData.menus[x].isSelect = false;
                    if (action.menu.stage >= lastSelectMenu.stage) {
                        newState.uiData.menus[x].lastSelect = false;
                    }
                }
            }
            return newState;
        default:
            if (store !== undefined) {
                return store.getState().AuditReport;
            } else {
                return state;
            }
    }
}

module.exports = { AuditReport }