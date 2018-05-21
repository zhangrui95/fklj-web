// 首页

import * as Homes from "../actions/Home";
import { store } from '../index.js';

const initialState = {
    success: true,
    data: {
        taskStatistics: {
            isFetching: true,
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list: []
            },
        },
        inventoryTotalData: {
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list: ''
            },
        },
        populationData: {
            isFetching: true,
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list: []
            },
        },
        concernTotalData: {
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list: []
            },
        },
        activityStatistics: {
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                in: {
                    mh: 0,
                    tl: 0,
                    gl: 0
                },
                out: {
                    mh: 0,
                    tl: 0,
                    gl: 0
                }
            },
            data: {

            },
            isFetching: true,

        },
        inflowTotalData: {
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list: []
            },
        },
        outflowTotalData: {
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list: []
            },
        },
        personnelNotList: {//未落地人员
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list: []
            },
            isFetching: true,
        },
        personnelKeyList: {//重点关注人员
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list: []
            },
            isFetching: true,
        },
        personnelMissingList: {//失踪人员
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list: []
            },
            isFetching: true,
        },
        distributeMapData: {
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list: []
            },
        },//分布地图-首页
        airportCoordMapData: {
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list: []
            },
            isFetching: true,
        },
        // 呼市反恐利剑
        nilaihurenyuanData: {//拟来呼人员
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list: []
            },
            isFetching: true,
        },
        homecontrolpersonhushiData: {//管控人员
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list: []
            },
            isFetching: true,
        },
        policeStationData: {//派出所任务统计
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list: [],
                page:{}
            },
            isFetching: true,
        },
        haveBeenCheckedData: {//已盘查任务
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                list: []
            },
            isFetching: true,
        }
    }
}

const Home = (state = initialState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        //动态管控数据加载
        case 'REQUEST_TASK_REPORT':
            newState.data.taskStatistics.isFetching = true;
            return newState;
        case Homes.TASK_STATISTICS_DATA: //获取任务数据-首页
            newState.data.taskStatistics.result.list = action.data.result.list;
            newState.data.taskStatistics.isFetching = false;
            return newState;
        case Homes.INVENTORY_TOTAL_DATA: //获取盘查人数总和-首页
            newState.data.inventoryTotalData.result.list = action.data.result.list;
            return newState;
        //总体统计加载
        case 'REQUEST_TOTAL_REPORT':
            newState.data.populationData.isFetching = true;
            return newState;
        case Homes.POPULATION_DATA: //获取总体数据统计-首页REQUEST_TOTAL_REPORT
            newState.data.populationData.result.list = action.data.result.list;
            newState.data.populationData.isFetching = false;
            return newState;
        case Homes.CONCERN_TOTAL_DATA: //获取关注人员数据-首页
            newState.data.concernTotalData.result.list = action.data.result.list;
            return newState;
        //活动数据统计加载
        case 'REQUEST_ACTIVITY_REPORT':
            newState.data.activityStatistics.isFetching = true;
            return newState;
        case Homes.ACTIVITY_STATISTICS_DATA: //获取活动统计数据-首页REQUEST_ACTIVITY_REPORT
            newState.data.activityStatistics.result.in = action.data.result.list.in;
            newState.data.activityStatistics.result.out = action.data.result.list.out;
            newState.data.activityStatistics.isFetching = false;
            return newState;
        case Homes.INFLOW_TOTAL_DATA: //获取流入人员数据总和-首页
            newState.data.inflowTotalData.result.list = action.data.result.list;
            return newState;
        case Homes.OUTFLOW_TOTAL_DATA: //获取流出人员数据总和-首页
            newState.data.outflowTotalData.result.list = action.data.result.list;
            return newState;
        case 'REQUEST_KEY_PERSON_REPORT':
            newState.data.personnelKeyList.isFetching = true;
            return newState;
        case Homes.KEY_ATTENTION_DATA: //获取重点关注人员-首页REQUEST_KEY_PERSON_REPORT
            newState.data.personnelKeyList.result.list = action.data.result.list;
            newState.data.personnelKeyList.isFetching = false;
            return newState;
        case 'REQUEST_NOT_PERSON_REPORT':
            newState.data.personnelNotList.isFetching = true;
            return newState;
        case Homes.NOT_LANDED_DATA: //获取未落地人员-首页
            newState.data.personnelNotList.result.list = action.data.result.list;
            newState.data.personnelNotList.isFetching = false;
            return newState;
        case 'REQUEST_BEMISS_PERSON_REPORT':
            newState.data.personnelMissingList.isFetching = true;
            return newState;
        case Homes.BE_MISSING_DATA: //获取失踪人员-首页
            newState.data.personnelMissingList.result.list = action.data.result.list;
            newState.data.personnelMissingList.isFetching = false;
            return newState;
        case Homes.DISTRIBUTE_MAP_DATA: //获取分布地图-首页
            newState.data.distributeMapData.result.list = action.data.result.list;
            return newState;
        case 'REQUEST_AIRPORTCOOR_MAP_REPORT':
            newState.data.airportCoordMapData.isFetching = true;
            return newState;
        case Homes.AIRPORTCOOR_MAP_DATA: //获取迁徙地图-首页
            newState.data.airportCoordMapData.result.list = action.data.result.list;
            newState.data.airportCoordMapData.isFetching = false;
            return newState;
        //    呼市反恐利剑
        case 'REQUEST_NILAIHURENYUAN_REPORT'://拟来呼人员
            newState.data.nilaihurenyuanData.isFetching = true;
            return newState;
        case Homes.NILAIHURENYUAN_DATA: //拟来呼人员
            newState.data.nilaihurenyuanData.result.list = action.data.result.list;
            newState.data.nilaihurenyuanData.isFetching = false;
            return newState;
        case 'REQUEST_HOME_CONTROLPERSON_REPORT'://首页管控人员
            newState.data.homecontrolpersonhushiData.isFetching = true;
            return newState;
        case Homes.HOMECONTROLPERSON_HUSHI_DATA: //首页管控人员
            newState.data.homecontrolpersonhushiData.result.list = action.data.result.list;
            newState.data.homecontrolpersonhushiData.isFetching = false;
            return newState;
        case 'REQUEST_POLICESTATION_HUSHI_REPORT'://派出所任务统计
            newState.data.policeStationData.isFetching = true;
            return newState;
        case Homes.POLICESTATION_HUSHI_DATA: //派出所任务统计
            newState.data.policeStationData.result.list = action.data.result.list;
            newState.data.policeStationData.result.page = action.data.result.page;
            newState.data.policeStationData.isFetching = false;
            return newState;
        case 'REQUEST_HAVEBEENCHECKED_HUSHI_REPORT'://已盘查任务
            newState.data.haveBeenCheckedData.isFetching = true;
            return newState;
        case Homes.HAVEBEENCHECKED_HUSHI_DATA: //已盘查任务
            newState.data.haveBeenCheckedData.result.list = action.data.result.list;
            newState.data.haveBeenCheckedData.isFetching = false;
            return newState;
        default:
            if (store !== undefined) {
                return store.getState().Home;
            } else {
                return state;
            }
    }
}
module.exports = { Home }