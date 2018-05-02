/**
 * 统计报表
 */
 import * as ReportForm from "../actions/ReportForm";
import {REPORT_FORMS_MENU_CHANGE_CURRENT,REPORTFORMS_MENU_INIT} from "../actions/actions";
import {store} from '../index.js';
// import {getNowFormatDate} from "../utils/Date";
const initialState = {
    success: true,
    data: {
        distributeChartsList: {//分布情况
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list:[]
            },
            isFetching:true,
        },
        originalChartsList: {
            reason: {
                "code": "",
                "text": ""
            },
             result: {
                list:[]
            },
            isFetching:true,
        },
        liveChartsList: {
            reason: {
                "code": "",
                "text": ""
            },
             result: {
                list:[]
            },
            isFetching:true,
        },
        sexChartsList: {
            reason: {
                "code": "",
                "text": ""
            },
             result: {
                list:[]
            },
            isFetching:true,
        },
        obtainEmploymentChartsList: {
            reason: {
                "code": "",
                "text": ""
            },
             result: {
                list:[]
            },
            isFetching:true,
        },
        ageChartsList: {
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list:[]
            },
            isFetching:true,
        },
        AbnormalList: {
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list:[]
            },
            isFetching:true,
        },
        AttentionCategoryList: {
            reason: {
                "code": "",
                "text": ""
            },
             result: {
                list:[]
            },
            isFetching:true,
        },
        completeList: {
            reason: {
                "code": "",
                "text": ""
            },
             result: {
                list:[]
            },
            isFetching:true,
        },
        inflowList: {
            reason: {
                "code": "",
                "text": ""
            },
             result: {
                list:[]
            },
            isFetching:true,
        },
        dataSourcesList: {
            reason: {
                "code": "",
                "text": ""
            },
             result: {
                list:[]
            },
            isFetching:true,
        },
        flowOutList: {
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list:[]
            },
            isFetching:true,
        },
        activePersonnelList: {
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list:[]
            },
            isFetching:true,
        },
        totalAttention: {//查询-关注人员总和
             reason: {
                "code": "",
                "text": ""
            },
            result: {
                list:''
            },
        },
        taskTotalAttention: {//查询-利剑数据的关注人员总和
            reason: {
                "code": "",
                "text": ""
            },
             result: {
                list:''
            },
        },
        activityInflow: {//查询-活动数据的流入人员总和
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list:''
            },
        },
        activityOutflow: {//查询-活动数据的流出人员总和
            reason: {
                "code": "",
                "text": ""
            },
             result: {
                list:''
            },
        },
    },
    uiData: {
        menus: [
            {
                id: '101',
                menuName: '总体数据统计',
                isOpen: false,
                search: 'type=ztsjtj',
                haveSon: false,
                isSelect: true
            },
            {
                id: '102',
                menuName: '盘查数据统计',
                isOpen: false,
                search: 'type=ljsjtj',
                haveSon: false,
                isSelect: false
            },
            {
                id: '103',
                menuName: '活动数据统计',
                isOpen: false,
                search: 'type=hdsjtj',
                haveSon: false,
                isSelect: false
            }
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
            //分布情况加载
        case 'REQUEST_DISTRIBUTE_REPORTFORM':

            newState.data.distributeChartsList.isFetching = true;
            return newState;

        case ReportForm.DISTRIBUTE_CHARTS_DATA: //获取统计报表-分布情况 REQUEST_DISTRIBUTE_REPORTFORM
            newState.data.distributeChartsList.result.list = action.data.result.list;
            newState.data.distributeChartsList.isFetching = false;
            return newState;
        //原籍地
        case 'REQUEST_ORIGINAL_REPORTFORM':
            newState.data.originalChartsList.isFetching = true;
            return newState;
        case ReportForm.ORIGINAL_CHARTS_DATA: //获取统计报表-原籍地情况 REQUEST_ORIGINAL_REPORTFORM
            newState.data.originalChartsList.result.list = action.data.result.list;
            newState.data.originalChartsList.isFetching = false;
            return newState;
        //居住
        case 'REQUEST_LIVE_REPORTFORM':
            newState.data.liveChartsList.isFetching = true;
            return newState;
        case ReportForm.LIVE_CHARTS_DATA: //获取统计报表-居住情况 REQUEST_LIVE_REPORTFORM
            newState.data.liveChartsList.result.list = action.data.result.list;
            newState.data.liveChartsList.isFetching = false;
            return newState;
        //性别
        case 'REQUEST_SEX_REPORTFORM':
            newState.data.sexChartsList.isFetching = true;
            return newState;
        case ReportForm.SEX_CHARTS_DATA: //获取统计报表-性别情况 REQUEST_SEX_REPORTFORM
            newState.data.sexChartsList.result.list= action.data.result.list;
            newState.data.sexChartsList.isFetching = false;
            return newState;
        //就业
        case 'REQUEST_OBTAINEMPLOYMENT_REPORTFORM':
            newState.data.obtainEmploymentChartsList.isFetching = true;
            return newState;
        case ReportForm.OBTAINEMPLOYMENT_CHARTS_DATA: //获取统计报表就业-情况 REQUEST_OBTAINEMPLOYMENT_REPORTFORM
            newState.data.obtainEmploymentChartsList.result.list = action.data.result.list;
            newState.data.obtainEmploymentChartsList.isFetching = false;
            return newState;
        //年龄
        case 'REQUEST_AGE_REPORTFORM':
           newState.data.ageChartsList.isFetching = true;
            return newState;
        case ReportForm.AGE_CHARTS_DATA: //获取统计报表-年龄情况 REQUEST_AGE_REPORTFORM
            newState.data.ageChartsList.result.list = action.data.result.list;
            newState.data.ageChartsList.isFetching = false;
            return newState;
        //异常人数
        case 'REQUEST_ABNORMAL_REPORTFORM':
            newState.data.AbnormalList.isFetching = true;
            return newState;
        case ReportForm.ABNORMAL_CHARTS_DATA: //获取统计报表-异常人员情况 REQUEST_ABNORMAL_REPORTFORM
            newState.data.AbnormalList.result.list = action.data.result.list;
            newState.data.AbnormalList.isFetching = false;
            return newState;
        //人员类别
        case 'REQUEST_ABNORMAL_REPORTFORM':
            newState.data.AttentionCategoryList.isFetching = true;
            return newState;
        //关注类别
        case 'REQUEST_ATTENTIONCATEGORY_REPORTFORM':
            newState.data.AttentionCategoryList.isFetching = true;
            return newState;
        case ReportForm.ATTENTIONCATEGORY_CHARTS_DATA: //获取统计报表关注人员-人员类别情况 REQUEST_ATTENTIONCATEGORY_REPORTFORM
            newState.data.AttentionCategoryList.result.list = action.data.result.list;
            newState.data.AttentionCategoryList.isFetching = false;
            return newState;
        //完整性
        case 'REQUEST_COMPLETE_REPORTFORM':
            newState.data.completeList.isFetching = true;
            return newState;
        case ReportForm.COMPLETE_CHARTS_DATA: //获取统计报表-数据完整性情况 REQUEST_COMPLETE_REPORTFORM
            newState.data.completeList.result.list = action.data.result.list;
            newState.data.completeList.isFetching = false;
            return newState;
        //流入方式
        case 'REQUEST_INFLOW_REPORTFORM':
            newState.data.inflowList.isFetching = true;
            return newState;
        case ReportForm.INFLOW_CHARTS_DATA: //获取统计报表-流入方式性情况 REQUEST_INFLOW_REPORTFORM
            newState.data.inflowList.result.list = action.data.result.list;
            newState.data.inflowList.isFetching = false;
            return newState;
         //数据来源
        case 'REQUEST_DATASOURCES_REPORTFORM':
            newState.data.dataSourcesList.isFetching = true;
            return newState;
        case ReportForm.DATASOURCES_CHARTS_DATA: //获取统计报表-数据来源 REQUEST_DATASOURCES_REPORTFORM
            newState.data.dataSourcesList.result.list = action.data.result.list;
            newState.data.dataSourcesList.isFetching = false;
            return newState;
         //流出方式
        case 'REQUEST_FLOWOUT_REPORTFORM':
            newState.data.flowOutList.isFetching = true;
            return newState;
        case ReportForm.FLOWOUT_CHARTS_DATA: //获取统计报表-流出方式 REQUEST_FLOWOUT_REPORTFORM
            newState.data.flowOutList.result.list = action.data.result.list;
            newState.data.flowOutList.isFetching = false;
            return newState;
        //活动人员
        case 'REQUEST_ACTIVEPERSONNEL_REPORTFORM':
            newState.data.activePersonnelList.isFetching = true;
            return newState;
        case ReportForm.ACTIVEPERSONNEL_CHARTS_DATA: //获取统计报表-活动人员 REQUEST_ACTIVEPERSONNEL_REPORTFORM
            newState.data.activePersonnelList.result.list = action.data.result.list;
            newState.data.activePersonnelList.isFetching = false;
            return newState;
        case ReportForm.TOTALATTENTION_CHARTS_DATA: //获取统计报表-查询-总体数据的关注人员总和
            newState.data.totalAttention.result.list = action.data.result.list;
            return newState;
        case ReportForm.TASKTOTALATTENTION_CHARTS_DATA: //获取统计报表-查询-利剑数据的关注人员总和
            newState.data.taskTotalAttention.result.list = action.data.result.list;
            return newState;
        case ReportForm.ACTIVITYINFLOW_CHARTS_DATA: //获取统计报表-查询-活动数据的流入人员总和
            newState.data.activityInflow.result.list = action.data.result.list;
            return newState;
        case ReportForm.ACTIVITYOUTFLOW_CHARTS_DATA: //获取统计报表-查询-活动数据的流出人员总和
            newState.data.activityOutflow.result.list = action.data.result.list;
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