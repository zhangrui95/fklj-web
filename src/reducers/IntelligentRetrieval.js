//智能检索

import {INTELLIGENTRETRIEVAL_DATA,INTELLIGENTRETRIEVAL_INIT,INTELLIGENTRETRIEVAL_TRRORISM_DATA,INTELLIGENTRETRIEVAL_JUDGE_DATA} from  "../actions/IntelligentRetrieval";
import {INTELLIGENT_RETRIEVAL_MENU_CHANGE_CURRENT,INTELLIGENTRETRIEVA_MENU_INIT} from  "../actions/actions";
import {store} from '../index.js';


const initialState = { //智能检索
        success: true,
        data: {
            IntelligentRetrievalList: {
                 reason: {
                        "code": "",
                        "text": ""
                        },
                result: {
                        total:0,
                        list: [],
                }
            },
            IntelligentRetrievalTerrorismList: {
                reason: {
                       "code": "",
                       "text": ""
                       },
               result: {
                       total:0,
                       list: '',
               }
           },
           IntelligentRetrievalJudgeList: {
            reason: {
                   "code": "",
                   "text": ""
                   },
           result: {
                   total:0,
                   list: '',
           }
       }
        },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '全部',
                    isOpen: false,
                    search: 'type=mypc',
                    haveSon: false,
                    isSelect: true
                },
                {
                    id: '102',
                    menuName: '利剑数据',
                    isOpen: false,
                    search: 'type=mygz',
                    haveSon: false,
                    isSelect: false
                },
                {
                    id: '103',
                    menuName: '研判报告',
                    isOpen: false,
                    search: 'type=myzj',
                    haveSon: false,
                    isSelect: false
                },

            ]
        }
    }

const IntelligentRetrievalType = (state=initialState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type){
        case 'REQUEST_INTELLIGENT_RETRIEVAL':
            newState.isFetching = true;
            return newState;
        case INTELLIGENTRETRIEVAL_DATA://获取数据
            newState.data.IntelligentRetrievalList.result.list = action.data.result.list;
            newState.data.IntelligentRetrievalList.result.total = action.data.result.page.totalResult;
            newState.isFetching = false;
            //  return Object.assign({}, state, {data:{IntelligentRetrievalList: action.data.data.IntelligentRetrievalList,count:action.data.data.count}});
             return newState;
        case 'REQUEST_INTELLIGENT_TRRORISM_RETRIEVAL':
             newState.isFetching = true;
             return newState;
        case INTELLIGENTRETRIEVAL_TRRORISM_DATA://获取反恐数据
             newState.data.IntelligentRetrievalTerrorismList.result.list = action.data.result.list;
             newState.data.IntelligentRetrievalTerrorismList.result.total = action.data.result.page.totalResult;
             newState.isFetching = false;
             //  return Object.assign({}, state, {data:{IntelligentRetrievalList: action.data.data.IntelligentRetrievalList,count:action.data.data.count}});
              return newState;
        case 'REQUEST_INTELLIGENT_JUDGE_RETRIEVAL':
              newState.isFetching = true;
              return newState;
        case INTELLIGENTRETRIEVAL_JUDGE_DATA://获取研判数据
              newState.data.IntelligentRetrievalJudgeList.result.list = action.data.result.list;
              newState.data.IntelligentRetrievalJudgeList.result.total = action.data.result.page.totalResult;
              newState.isFetching = false;
              //  return Object.assign({}, state, {data:{IntelligentRetrievalList: action.data.data.IntelligentRetrievalList,count:action.data.data.count}});
               return newState;
        case INTELLIGENTRETRIEVAL_INIT://初始数据
             return Object.assign({}, state, {data:{IntelligentRetrievalList: [],count:0}});
        case INTELLIGENT_RETRIEVAL_MENU_CHANGE_CURRENT://更换TAB选中状态
            //遍历一级目录
            for(let x in newState.uiData.menus){
                if(action.menu.id==newState.uiData.menus[x].id){ //根据ID相等判断，是否选中
                    newState.uiData.menus[x].isSelect=true;
                }else{
                    newState.uiData.menus[x].isSelect=false;
                }
            }
            return newState;
        case INTELLIGENTRETRIEVA_MENU_INIT://菜单初始化
            for(let x in newState.uiData.menus){
                newState.uiData.menus[x].isSelect=false;
                newState.uiData.menus[x].isOpen=false;
                //遍历子目录
                for(let i in  newState.uiData.menus[x].sonMenu){
                    newState.uiData.menus[x].sonMenu[i].isSelect=false;
                }
            }
            newState.uiData.menus[0].isSelect=true;
        default:
            if(store !== undefined){
                return store.getState().IntelligentRetrievalType;
            }else{
                return state;
            }

    }
}

module.exports = {IntelligentRetrievalType}