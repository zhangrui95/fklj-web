/**
 * 智能检索action
 * Created by iliulei on 2017/6/7.
 */
import {api} from './actions';
import {post,get,put} from "./request";
//API接口前缀
export const INTELLIGENTRETRIEVAL_DATA = 'intelligentretrieval-data';
export const INTELLIGENTRETRIEVAL_ERROR = 'intelligentretrieval-error';
export const INTELLIGENTRETRIEVAL_INIT = 'intelligentretrieval_init';

//获取智能检索记录
export function fetchIntelligentRetrievalData(path,creds) {
    return dispatch => {
        dispatch({type:"REQUEST_INTELLIGENT_RETRIEVAL"});
        post(api + path,creds).then((json) => {
            dispatch(receivedIntelligentRetrievalData(json));
        }).catch((e)=>{
            dispatch(receivedIntelligentRetrievalError(e.toString()))
        });;
    }
}
export function postIntelligentRetrievalData(creds) {
    return dispatch => {
        let path = '/postIntellgent';
        dispatch({type:"REQUEST_INTELLIGENT_RETRIEVAL"});
        post(api + path,creds).then((json) => {
            dispatch(receivedIntelligentRetrievalData(json));
        }).catch((e)=>{
            dispatch(receivedIntelligentRetrievalError(e.toString()))
        });;
    }
}
//初始化记录
export function initIntelligentRetrievalData() {
    return {type: INTELLIGENTRETRIEVAL_INIT}
}


export function receivedIntelligentRetrievalData(data) {
    return {type: INTELLIGENTRETRIEVAL_DATA, data: data}
}
export function receivedIntelligentRetrievalError(message) {
    return {type: INTELLIGENTRETRIEVAL_ERROR, message: message}
}
//反恐数据
export const INTELLIGENTRETRIEVAL_TRRORISM_DATA = 'intelligentretrieval-terrorism-data';
export const INTELLIGENTRETRIEVAL_TRRORISM_ERROR = 'intelligentretrieval-terrorism-error';
export function postIntelligentRetrievalTrrorismData(creds) {
    return dispatch => {
        let path = '/postIntellgent';
        dispatch({type:"REQUEST_INTELLIGENT_TRRORISM_RETRIEVAL"});
        post(api + path,creds).then((json) => {
            dispatch(receivedIntelligentRetrievalTrrorismData(json));
        }).catch((e)=>{
            dispatch(receivedIntelligentRetrievalTrrorismError(e.toString()))
        });;
    }
}
export function receivedIntelligentRetrievalTrrorismData(data) {
    return {type: INTELLIGENTRETRIEVAL_TRRORISM_DATA, data: data}
}
export function receivedIntelligentRetrievalTrrorismError(message) {
    return {type: INTELLIGENTRETRIEVAL_TRRORISM_ERROR, message: message}
}

//研判数据
export const INTELLIGENTRETRIEVAL_JUDGE_DATA = 'intelligentretrieval-judge-data';
export const INTELLIGENTRETRIEVAL_JUDGE_ERROR = 'intelligentretrieval-judge-error';
export function postIntelligentRetrievalJudgeData(creds) {
    return dispatch => {
        let path = '/postIntellgent';
        dispatch({type:"REQUEST_INTELLIGENT_JUDGE_RETRIEVAL"});
        post(api + path,creds).then((json) => {
            dispatch(receivedIntelligentRetrievalJudgeData(json));
        }).catch((e)=>{
            dispatch(receivedIntelligentRetrievalJudgeError(e.toString()))
        });;
    }
}
export function receivedIntelligentRetrievalJudgeData(data) {
    return {type: INTELLIGENTRETRIEVAL_JUDGE_DATA, data: data}
}
export function receivedIntelligentRetrievalJudgeError(message) {
    return {type: INTELLIGENTRETRIEVAL_JUDGE_ERROR, message: message}
}